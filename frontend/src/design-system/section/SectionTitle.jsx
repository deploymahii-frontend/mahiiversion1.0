export default function SectionTitle({
    title,
    subtitle,
    action,
}) {
    return (
        <div className="flex justify-between items-center mb-4">
            <div>
                <h2 className="text-xl font-bold">
                    {title}
                </h2>
                {
                    subtitle &&
                    <p className="text-gray-500 mt-1">
                        {subtitle}
                    </p>
                }
            </div>
            {action}
        </div>
    );
}
