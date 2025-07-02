function Sidebar({ isOpen, onClose }) {
  return (
    <div className={`fixed inset-0 z-50 transition-all duration-300 ${isOpen ? '' : 'pointer-events-none'}`}>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`absolute inset-y-0 left-0 w-64 bg-black shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className={`opacity-0 transition-opacity duration-300 ${isOpen ? 'opacity-100 delay-100' : ''}`}>
          <ul className="p-4 space-y-2">
            <button
              onClick={onClose}
              className="hover:bg-[#1a1a1a] p-2 py-0.5 rounded-full transition-colors duration-200"
            >
              &#x2715;
            </button>
            <li className="hover:font-semibold hover:bg-[#1a1a1a] p-2 rounded-lg transition-all duration-200">
              <a href="/dashboard">Dashboard</a>
            </li>
            <li className="hover:font-semibold hover:bg-[#1a1a1a] p-2 rounded-lg transition-all duration-200">
              <a href="/challenge">Challenge</a>
            </li>
            <li className="hover:font-semibold hover:bg-[#1a1a1a] p-2 rounded-lg transition-all duration-200">
              <a href="/leaderboard">Leaderboard</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
