import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

export default function CartItem({
  item,
  increase,
  decrease,
  remove,
}) {
  return (
    <div className="bg-white rounded-2xl p-5 flex gap-5">
      <img
        src={item.image}
        alt={item.name}
        className="w-28 h-28 rounded-xl object-cover"
      />

      <div className="flex-1">
        <h3 className="font-bold text-lg">{item.name}</h3>

        <p className="text-orange-500 font-bold mt-2">₹{item.price}</p>

        <div className="flex items-center gap-4 mt-5">
          <button onClick={() => decrease(item.product, item.quantity)}>
            <FiMinus />
          </button>

          <span>{item.quantity}</span>

          <button onClick={() => increase(item.product, item.quantity)}>
            <FiPlus />
          </button>

          <button
            className="ml-auto text-red-500"
            onClick={() => remove(item.product)}
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  );
}
