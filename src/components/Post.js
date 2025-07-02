import { useState } from "react";

function Post({ isOpen, onClose }) {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  }

  function handleCaptionChange(e) {
    setCaption(e.target.value);
  }

  function handlePost() {
    if (!image || !caption.trim()) {
      alert("Please upload an image and write a caption.");
      return;
    }

    console.log("Uploading post:", { image, caption });
    setImage(null);
    setCaption("");
    alert("Post uploaded successfully!");
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[#2a2929] rounded-xl p-8 max-w-md w-full mx-4 relative">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl"
        >
          ×
        </button>

        <div className="flex flex-col items-center gap-6">
          <h2 className="text-2xl font-bold text-white">Post</h2>

          {/* Upload Area */}
          <label className="w-full h-64 bg-[#1a1a1a] rounded-2xl border-2 border-dashed border-[#89F336] flex flex-col items-center justify-center cursor-pointer relative overflow-hidden">
            {image ? (
              <img src={image} alt="preview" className="w-full h-full object-cover rounded-2xl" />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-white rounded flex items-center justify-center">
                  <img src="/photo.svg" alt="icon" className="w-6 h-6" />
                </div>
                <span className="text-white text-sm">Upload your eco-activity photo</span>
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>

          {/* Caption Input */}
          <input
            type="text"
            placeholder="Add some captions"
            value={caption}
            onChange={handleCaptionChange}
            className="w-full p-3 rounded-lg bg-gray-600 text-white placeholder-gray-300 border-none outline-none"
          />

          {/* Upload Button */}
          <button
            onClick={handlePost}
            className="bg-[#89F336] px-8 py-2 rounded-full text-black font-semibold hover:scale-105 transition duration-300 ease-in-out"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default Post;