"use client"

export default function StreakCard({ streak, isMobile = false }) {
    if (isMobile) {
        return (
            <div className="bg-[#89F336] rounded-2xl p-4 flex gap-4 justify-center items-center text-center">
                <div className="text-6xl font-bold text-black mb-1">{streak?? 0}</div>
                <div className="text-xl font-semibold text-black">DAYS</div>
            </div>
        );
    }

    return (
        <div className="bg-[#89F336] font-bold text-black rounded-xl flex items-center justify-center">
            <div className="p-4 text-7xl">{streak?? 0}</div>  
            <div className="p-4 text-xl">DAYS STREAK!</div>  
        </div>
    );
}