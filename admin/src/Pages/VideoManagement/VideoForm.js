import { useState, useEffect } from "react";

export default function VideoForm({ onClose, onUpload, initialData }) {
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");

  // On mount or when initialData changes, set form fields for editing
  useEffect(() => {
    if (initialData) {
      setLink(initialData.link);
      setDescription(initialData.title);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!link) return;
    onUpload({
      link,
      title: description || "Untitled",
    });
    setLink("");
    setDescription("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Edit Video" : "Add Video"}
        </h2>
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-medium">Link</label>
          <input
            type="text"
            placeholder="ex: https://www.youtube.com/"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full border px-3 py-2 mb-4 rounded"
            required
          />

          <label className="block mb-2 font-medium">Description</label>
          <input
            type="text"
            placeholder="Optional"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-3 py-2 mb-4 rounded"
          />

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => {
                setLink("");
                setDescription("");
              }}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Clear
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              {initialData ? "Update" : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
