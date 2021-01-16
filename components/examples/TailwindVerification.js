export default function TailwindVerification() {
    return (
        <div className="p-4 border-dotted border-4 border-light-blue-500 w-1/4">
            <h2>TailwindCSS Verification</h2>
            <div className="mt-4 p-4 rounded bg-blue-300 text-center">
                <p className="text-blue-600">
                    If this is dark blue text on a light blue background,
                    tailwind is working.
                </p>
            </div>
        </div>
    );
}
