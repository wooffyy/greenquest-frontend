export default function StatsCard({ ecoPoints, isMobile = false }) {
    if (isMobile) {
        return (
            <div className="bg-[#2a2a2a] rounded-2xl p-6 flex flex-col justify-center items-center text-center">
                <div className="text-4xl font-bold text-[#89F336] leading-none">{ecoPoints ?? 0}</div>
                <div className="text-xs text-slate-400 mt-1">Eco Points</div>
            </div>
        );
    }

    return (
        <div className="bg-[#2a2a2a] items-center text-center rounded-xl p-6">
            <div className="text-4xl font-bold text-[#89F336]">{ecoPoints}</div>
            <div className="text-sm font-semibold mt-2">Eco Points</div>
        </div>
    );
}