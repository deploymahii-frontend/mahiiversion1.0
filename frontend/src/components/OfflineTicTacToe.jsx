import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "mahii-ttt-stats";
const MODE_KEY = "mahii-ttt-mode";
const DIFFICULTY_KEY = "mahii-ttt-difficulty";

const createInitialBoard = () => Array(9).fill(null);

const getWinner = (board) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }

  if (board.every(Boolean)) {
    return { winner: "draw", line: null };
  }

  return null;
};

const getEmptySquares = (board) => board.reduce((acc, cell, idx) => {
  if (!cell) acc.push(idx);
  return acc;
}, []);

const getRandomMove = (moves) => moves[Math.floor(Math.random() * moves.length)];

const minimax = (board, player, aiSymbol, humanSymbol) => {
  const result = getWinner(board);
  if (result?.winner === aiSymbol) return { score: 10 };
  if (result?.winner === humanSymbol) return { score: -10 };
  if (result?.winner === "draw") return { score: 0 };

  const moves = [];
  for (const index of getEmptySquares(board)) {
    const nextBoard = [...board];
    nextBoard[index] = player;
    const score = minimax(nextBoard, player === aiSymbol ? humanSymbol : aiSymbol, aiSymbol, humanSymbol);
    moves.push({ index, score: score.score });
  }

  if (player === aiSymbol) {
    return moves.reduce((best, move) => (move.score > best.score ? move : best), moves[0]);
  }

  return moves.reduce((best, move) => (move.score < best.score ? move : best), moves[0]);
};

const pickAIMove = (board, difficulty) => {
  const emptySquares = getEmptySquares(board);
  if (!emptySquares.length) return null;

  if (difficulty === "easy") return getRandomMove(emptySquares);

  const humanSymbol = "X";
  const aiSymbol = "O";

  const winMove = emptySquares.find((idx) => {
    const nextBoard = [...board];
    nextBoard[idx] = aiSymbol;
    return getWinner(nextBoard)?.winner === aiSymbol;
  });

  if (winMove !== undefined) return winMove;

  const blockMove = emptySquares.find((idx) => {
    const nextBoard = [...board];
    nextBoard[idx] = humanSymbol;
    return getWinner(nextBoard)?.winner === humanSymbol;
  });

  if (blockMove !== undefined) return blockMove;

  if (difficulty === "medium") {
    if (board[4] === null) return 4;
    return getRandomMove(emptySquares);
  }

  if (difficulty === "hard") {
    if (board[4] === null) return 4;
    return getRandomMove(emptySquares);
  }

  if (difficulty === "impossible") {
    if (board[4] === null) return 4;
    const move = minimax(board, aiSymbol, aiSymbol, humanSymbol);
    return move?.index ?? getRandomMove(emptySquares);
  }

  return getRandomMove(emptySquares);
};

export default function OfflineTicTacToe() {
  const [board, setBoard] = useState(createInitialBoard());
  const [isXTurn, setIsXTurn] = useState(true);
  const [mode, setMode] = useState(() => {
    if (typeof window === "undefined") return "ai";
    return window.localStorage.getItem(MODE_KEY) || "ai";
  });
  const [difficulty, setDifficulty] = useState(() => {
    if (typeof window === "undefined") return "impossible";
    return window.localStorage.getItem(DIFFICULTY_KEY) || "impossible";
  });
  const [stats, setStats] = useState(() => {
    if (typeof window === "undefined") {
      return { wins: 0, losses: 0, draws: 0 };
    }

    try {
      return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{\"wins\":0,\"losses\":0,\"draws\":0}");
    } catch {
      return { wins: 0, losses: 0, draws: 0 };
    }
  });
  const [gameState, setGameState] = useState(null);
  const [isOnline, setIsOnline] = useState(() => (typeof navigator !== "undefined" ? navigator.onLine : true));
  const [showReconnectBanner, setShowReconnectBanner] = useState(false);

  useEffect(() => {
    const syncStats = () => {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    };
    syncStats();
  }, [stats]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowReconnectBanner(true);
      window.setTimeout(() => setShowReconnectBanner(false), 2800);
    };
    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(MODE_KEY, mode);
      window.localStorage.setItem(DIFFICULTY_KEY, difficulty);
    }
  }, [mode, difficulty]);

  useEffect(() => {
    if (mode !== "ai" || isXTurn || gameState) return;

    const timer = window.setTimeout(() => {
      const move = pickAIMove(board, difficulty);
      if (move === null) return;
      const nextBoard = [...board];
      nextBoard[move] = "O";
      setBoard(nextBoard);
      const result = getWinner(nextBoard);
      if (result?.winner) {
        setGameState(result.winner === "draw" ? "draw" : result.winner === "O" ? "lost" : "won");
        setStats((prev) => ({
          ...prev,
          ...(result.winner === "draw" ? { draws: prev.draws + 1 } : { losses: prev.losses + 1 }),
        }));
      } else {
        setIsXTurn(true);
      }
    }, 350);

    return () => window.clearTimeout(timer);
  }, [board, mode, difficulty, isXTurn, gameState]);

  const handleSquareClick = (index) => {
    if (board[index] || gameState) return;

    if (mode === "ai" && !isXTurn) return;

    const nextBoard = [...board];
    nextBoard[index] = isXTurn ? "X" : "O";
    setBoard(nextBoard);

    const result = getWinner(nextBoard);
    if (result?.winner) {
      const outcome = result.winner === "draw" ? "draw" : result.winner === "X" ? "won" : "lost";
      setGameState(outcome);
      setStats((prev) => ({
        ...prev,
        ...(result.winner === "draw" ? { draws: prev.draws + 1 } : result.winner === "X" ? { wins: prev.wins + 1 } : { losses: prev.losses + 1 }),
      }));
      return;
    }

    setIsXTurn((prev) => !prev);
  };

  const resetGame = () => {
    setBoard(createInitialBoard());
    setIsXTurn(true);
    setGameState(null);
  };

  const statusMessage = useMemo(() => {
    if (gameState === "won") return "🏆 You win!";
    if (gameState === "lost") return "😅 You lost this round";
    if (gameState === "draw") return "🤝 Match draw";
    return isXTurn ? "Your turn • X" : "AI is thinking…";
  }, [gameState, isXTurn]);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-800">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row">
        <div className="flex-1 rounded-[28px] border border-slate-200 bg-white/80 p-6 shadow-[0_22px_60px_rgba(37,99,235,0.12)] backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">Mahii Offline Mode</p>
              <h1 className="mt-2 text-3xl font-black text-slate-900">You’re offline, but the fun still goes on</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">This playful 404 experience keeps the Mahii vibe alive with a quick O/X game, local score tracking, and a reconnect banner when the network returns.</p>
            </div>
            <div className={`rounded-full px-3 py-1 text-sm font-semibold ${isOnline ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
              {isOnline ? "🟢 Online" : "🟡 Offline"}
            </div>
          </div>

          {showReconnectBanner && (
            <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              🟢 Internet connected. You can continue shopping or jump back into the app.
            </div>
          )}

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[24px] border border-slate-200 bg-slate-950 p-5 text-white shadow-inner">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-300">Scoreboard</p>
                  <p className="text-xl font-black">{stats.wins} - {stats.losses} - {stats.draws}</p>
                </div>
                <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                  localStorage
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                {board.map((cell, index) => (
                  <button
                    key={index}
                    onClick={() => handleSquareClick(index)}
                    className="flex aspect-square items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 text-4xl font-black transition hover:-translate-y-0.5 hover:border-blue-400"
                  >
                    {cell}
                  </button>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3">
                <p className="text-sm font-semibold text-slate-200">{statusMessage}</p>
                <button onClick={resetGame} className="rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20">
                  New Game
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Game Mode</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button onClick={() => setMode("ai")} className={`rounded-full px-4 py-2 text-sm font-semibold ${mode === "ai" ? "bg-blue-600 text-white" : "bg-white text-slate-700"}`}>
                    🤖 Play with AI
                  </button>
                  <button onClick={() => setMode("two-player")} className={`rounded-full px-4 py-2 text-sm font-semibold ${mode === "two-player" ? "bg-emerald-600 text-white" : "bg-white text-slate-700"}`}>
                    👥 Two Players
                  </button>
                </div>

                {mode === "ai" && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Difficulty</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {[
                        { key: "easy", label: "Easy" },
                        { key: "medium", label: "Medium" },
                        { key: "hard", label: "Hard" },
                        { key: "impossible", label: "Impossible" },
                      ].map((item) => (
                        <button key={item.key} onClick={() => setDifficulty(item.key)} className={`rounded-full px-3 py-2 text-sm font-semibold ${difficulty === item.key ? "bg-slate-900 text-white" : "bg-white text-slate-700"}`}>
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-gradient-to-br from-blue-600 to-emerald-500 p-5 text-white">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-100">Offline support</p>
                <ul className="mt-3 space-y-2 text-sm text-blue-50">
                  <li>• Works without internet</li>
                  <li>• Saves your wins, losses, and draws locally</li>
                  <li>• Remembers your preferred game mode</li>
                  <li>• Pops a reconnect banner when the network returns</li>
                </ul>
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-white p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Quick actions</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button onClick={resetGame} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Play Again</button>
                  <a href="/" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">Back to Home</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
