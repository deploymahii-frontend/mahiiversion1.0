export default function RememberMe({ register }) {
    return (
        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input
                type="checkbox"
                {...register("remember")}
                className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
            />
            Remember me
        </label>
    );
}
