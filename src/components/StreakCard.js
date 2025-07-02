"use client"

export default function StreakCard({ streak, isMobile = false }) {
    if (isMobile) {
        return (
            <div className="col-span-2 bg-[#89F336] rounded-2xl p-6 flex flex-col justify-center items-center text-center">
                <div className="text-6xl font-bold text-black mb-1">{streak}</div>
                <div className="text-normal font-semibold text-black">DAYS</div>
            </div>
        );
    }

    return (
        <div className="bg-[#89F336] font-bold text-black rounded-xl flex items-center justify-center">
            <div className="p-4 text-7xl">{streak}</div>  
            <div className="p-4 text-xl">DAYS STREAK!</div>  
        </div>
    );
}