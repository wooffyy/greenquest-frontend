"use client"
import PostCards from "./PostCards";

export default function PostSection({ isMobile = false }) {
    if (isMobile) {
        return (
            <div className="px-4">
                <div className="bg-[#2a2a2a] rounded-2xl p-4">
                    <PostCards />
                </div>
            </div>
        );
    }

    return (
        <div className="col-span-4 bg-[#2a2929] rounded-xl p-4 flex flex-col gap-4 hover:bg-[#323232] hover:shadow-lg hover:shadow-white/5 transition-all duration-300">
            <PostCards/>
        </div>
    );
}