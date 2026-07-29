// src/modules/customer/components/SearchBar.jsx

import { useEffect, useRef, useState } from "react";
import {
    FaSearch,
    FaTimes,
    FaMicrophone,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import * as searchService from "../services/search.service";

const STORAGE_KEY = "mahii_recent_searches";

export default function SearchBar() {

    const navigate = useNavigate();

    const inputRef = useRef(null);

    const [query, setQuery] = useState("");

    const [loading, setLoading] = useState(false);

    const [results, setResults] = useState([]);

    const [selected, setSelected] = useState(-1);

    const [showDropdown, setShowDropdown] =
        useState(false);

    const [recent, setRecent] = useState([]);

    useEffect(() => {

        const saved = JSON.parse(

            localStorage.getItem(STORAGE_KEY) || "[]"

        );

        setRecent(saved);

    }, []);

    useEffect(() => {

        if (!query.trim()) {

            setResults([]);

            return;

        }

        const timer = setTimeout(() => {

            search();

        }, 400);

        return () => clearTimeout(timer);

    }, [query]);

    async function search() {

        try {

            setLoading(true);

            const { data } =
                await searchService.search(query);

            setResults(data.data);

        } finally {

            setLoading(false);

        }

    }

    function saveRecent(value) {

        if (!value.trim()) return;

        const updated = [

            value,

            ...recent.filter(item => item !== value),

        ].slice(0, 5);

        localStorage.setItem(

            STORAGE_KEY,

            JSON.stringify(updated)

        );

        setRecent(updated);

    }

    function submit(value = query) {

        if (!value.trim()) return;

        saveRecent(value);

        navigate(

            `/explore?search=${encodeURIComponent(value)}`

        );

        setShowDropdown(false);

    }

    function handleKeyDown(e) {

        if (e.key === "ArrowDown") {

            e.preventDefault();

            setSelected(previous =>

                Math.min(previous + 1, results.length - 1)

            );

        }

        if (e.key === "ArrowUp") {

            e.preventDefault();

            setSelected(previous =>

                Math.max(previous - 1, 0)

            );

        }

        if (

            e.key === "Enter" &&

            selected >= 0

        ) {

            submit(results[selected].name);

        } else if (e.key === "Enter") {

            submit();

        }

    }

    return (

        <div className="relative w-full">

            <div className="flex items-center rounded-2xl border bg-white shadow-sm">

                <FaSearch className="ml-4 text-gray-500" />

                <input

                    ref={inputRef}

                    value={query}

                    onChange={e => {

                        setQuery(e.target.value);

                        setShowDropdown(true);

                    }}

                    onKeyDown={handleKeyDown}

                    placeholder="Search shops, restaurants, cafés..."

                    className="flex-1 bg-transparent px-4 py-4 outline-none"

                />

                {loading && (

                    <div className="mr-4 h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />

                )}

                {!!query && (

                    <button

                        onClick={() => {

                            setQuery("");

                            inputRef.current?.focus();

                        }}

                        className="mr-3"

                    >

                        <FaTimes />

                    </button>

                )}

                <button

                    type="button"

                    className="mr-4 text-blue-600"

                    title="Voice search"

                >

                    <FaMicrophone />

                </button>

            </div>

            {showDropdown && (

                <div className="absolute z-50 mt-2 w-full rounded-2xl border bg-white shadow-xl">

                    {query && results.length > 0 ? (

                        results.map((item, index) => (

                            <button

                                key={item._id || index}

                                onClick={() => submit(item.name)}

                                className={`block w-full px-5 py-3 text-left hover:bg-gray-100 ${
                                    selected === index
                                        ? "bg-gray-100"
                                        : ""
                                }`}

                            >

                                {item.name}

                            </button>

                        ))

                    ) : (

                        <div className="p-4">

                            <p className="mb-2 text-sm font-semibold text-gray-500">

                                Recent Searches

                            </p>

                            {recent.length === 0 && (

                                <p className="text-sm text-gray-400">

                                    No recent searches
                                </p>

                            )}

                            {recent.map(item => (

                                <button

                                    key={item}

                                    onClick={() => submit(item)}

                                    className="block py-2 text-left text-sm hover:text-blue-600"

                                >

                                    {item}

                                </button>

                            ))}

                        </div>

                    )}

                </div>

            )}

        </div>

    );

}
