export default function StatsCard({ ecoPoints, isMobile = false }) {
    if (isMobile) {
        return (
            <div className="px-4 pr-10 text-center border-r-4 border-slate-700">
                <div className="text-xs font-semibold text-white mb-1">STATS</div>
                <div className="text-3xl font-bold text-[#89F336] leading-none">{ecoPoints}</div>
                <div className="text-xs text-slate-400 mt-1">Eco Points</div>
            </div>
        );
    }

    return (
        <div className="bg-[#2a2a2a] rounded-xl p-6">
            <div className="text-6xl font-bold text-[#89F336]">{ecoPoints}</div>
            <div className="text-sm font-semibold mt-2">Eco Points</div>
        </div>
    );
}