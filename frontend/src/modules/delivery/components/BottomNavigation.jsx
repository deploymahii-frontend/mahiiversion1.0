import {
    FaHome,
    FaMap,
    FaWallet,
    FaUser,
} from "react-icons/fa";

export default function BottomNavigation() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 flex justify-around border-t bg-white p-4">
            <FaHome />
            <FaMap />
            <FaWallet />
            <FaUser />
        </nav>
    );
}
