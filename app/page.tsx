import Link from "next/link";
import React from "react";

const page = () => {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
            <p className="text-4xl font-bold text-gray-600">
                Our main website coming Soon..
            </p>
            <p className="text-lg text-gray-500">Stay tuned for updates!</p>
            <p className="text-lg text-gray-500">
                You can access our quiz{" "}
                <Link href="/quiz" className="text-blue-500">
                    here
                </Link>
                .
            </p>
        </div>
    );
};

export default page;
