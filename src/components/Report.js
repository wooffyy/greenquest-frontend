
function getReport({ onClick }) {
    alert(`Thanks for your report`);
}

export default function Report({ onClose }) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
           <div className="bg-[#2a2929] rounded-xl p-8 max-w-md w-full mx-4 relative">
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-2 right-2 py-0 px-2 text-white hover:bg-gray-900 text-2xl rounded-full"
            >
              ×
            </button>

            <div className="flex flex-col items-center gap-6 text-white">
              <h2 className="text-xl font-semibold">Why are you report this post?</h2>
              <button onClick={getReport} className="w-full px-4 py-2 rounded-lg hover:bg-[#121111] transition">This post is not an eco-activities</button>
              <button onClick={getReport} className="w-full px-4 py-2 rounded-lg hover:bg-[#121111] transition">This post contains hate speech</button>
              <button onClick={getReport} className="w-full px-4 py-2 rounded-lg hover:bg-[#121111] transition">This post contains misinformation </button>
              <button onClick={getReport} className="w-full px-4 py-2 rounded-lg hover:bg-[#121111] transition">This post contains nudity</button>
              <button onClick={getReport} className="w-full px-4 py-2 rounded-lg hover:bg-[#121111] transition">This post contains illegal activities</button>              
            </div>
          </div>
        </div>
    );
}
