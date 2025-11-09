import { useState, useEffect } from "react";
import VideoForm from "./VideoForm";
import VideoCard from "./VideoCard";
import HelmateData from "../../utils/HelmetData";
import axiosInstance from "../../utils/axiosInstance"; // <- use interceptor axios

export default function Video() {
  const [showModal, setShowModal] = useState(false);
  const [videos, setVideos] = useState([]);
  const [limitWarning, setLimitWarning] = useState(false);
  const [editVideo, setEditVideo] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axiosInstance.get("/videos");
        const formatted = res.data.map((v) => ({
          id: v.id,
          link: v.video_url,
          title: v.description,
        }));
        setVideos(formatted);
      } catch (err) {
        console.error("Fetch failed", err);
      }
    };

    fetchVideos();
  }, []);
  // Upload new video handler
  const handleUpload = async (videoData) => {
    try {
      const res = await axiosInstance.post("/videos", {
        video_url: videoData.link,
        description: videoData.title,
      });

      setVideos([
        {
          id: res.data.id,
          link: res.data.video_url,
          title: res.data.description,
        },
        ...videos,
      ]);
      setShowModal(false);
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  // Update existing video handler
  const handleUpdate = async (videoData) => {
    try {
      // Laravel expects _method = PUT for update
      const res = await axiosInstance.post(`/videos/${editVideo.id}`, {
        video_url: videoData.link,
        description: videoData.title,
        _method: "PUT",
      });

      // Update videos list with the updated video
      setVideos((prevVideos) =>
        prevVideos.map((v) =>
          v.id === editVideo.id
            ? {
                id: res.data.id,
                link: res.data.video_url,
                title: res.data.description,
              }
            : v
        )
      );
      setEditVideo(null);
      setShowModal(false);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  // Delete handler remains same
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/videos/${id}`);
      setVideos(videos.filter((video) => video.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // Open modal for adding or editing
  const openAddModal = () => {
    if (videos.length >= 10) {
      setLimitWarning(true);
      return;
    }
    setEditVideo(null); // reset edit state for new video
    setShowModal(true);
  };

  const openEditModal = (video) => {
    setEditVideo(video);
    setShowModal(true);
  };

  return (
    <>
      <HelmateData title={"Video Management"} />
      <div className="min-h-screen bg-white p-4">
        <div className="flex justify-end sm:justify-between items-center mb-6">
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            onClick={openAddModal}
          >
            + Upload Video
          </button>
        </div>

        {showModal && (
          <VideoForm
            onClose={() => {
              setShowModal(false);
              setEditVideo(null);
            }}
            onUpload={editVideo ? handleUpdate : handleUpload}
            initialData={editVideo} // pass initial data for editing
          />
        )}

        {limitWarning && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center rounded-2xl justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md max-w-sm text-center">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl mb-4 mx-auto">
                !
              </div>
              <h2 className="text-lg font-semibold">
                Only 10 items can be added
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                If you need to add another, remove one first
              </p>
              <button
                onClick={() => setLimitWarning(false)}
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
              >
                OK
              </button>
            </div>
          </div>
        )}

        {/* Video Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {videos.map((video) => (
            <div
              key={video.id}
              className="flex flex-col h-56 sm:h-auto" // Fixed height for mobile
            >
              <div className="flex-1">
                <VideoCard video={video} onDelete={handleDelete} />
              </div>
              <button
                onClick={() => openEditModal(video)}
                className="mt-1 w-full bg-blue-500 text-white rounded px-2 py-1 hover:bg-blue-600"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
