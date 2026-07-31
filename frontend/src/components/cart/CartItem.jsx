import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

export default function CartItem({
  item,
  updateQuantity,
  removeFromCart,
}) {
  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.product, item.quantity - 1);
    }
  };
  const handleIncrease = () => {
    updateQuantity(item.product, item.quantity + 1);
  };
  return (
    <div className="bg-white rounded-2xl p-5 flex flex-col sm:flex-row gap-5 items-center">
      <img
        src={item.image}
        alt={item.name}
        className="w-28 h-28 rounded-xl object-cover"
      />

      <div className="flex-1 w-full">
        <h3 className="font-bold text-lg truncate">{item.name}</h3>
        <p className="text-orange-500 font-bold mt-2">₹{item.price}</p>
        <div className="flex items-center gap-4 mt-5">
          <button onClick={handleDecrease} className="p-1 rounded-full bg-gray-100 hover:bg-gray-200">
            <FiMinus size={20} />
          </button>
          <span className="font-medium">{item.quantity}</span>
          <button onClick={handleIncrease} className="p-1 rounded-full bg-gray-100 hover:bg-gray-200">
            <FiPlus size={20} />
          </button>
          <button
            className="ml-auto text-red-500 p-1 rounded-full bg-gray-100 hover:bg-gray-200"
            onClick={() => removeFromCart(item.product)}
          >
            <FiTrash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
