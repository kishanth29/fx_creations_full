import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./Components/Sidebar";
import Gallery from "./Pages/GalleryManagement/GalleryAlbums";
import Video from "./Pages/VideoManagement/VideoAlbum";
import AlbumPage from "./Pages/GalleryManagement/Album";
import ContactMessages from "./Pages/ContactMessage/ ContactMessages";
import BookingAlbum from "./Pages/Booking Management/BookingAlbum";
import { Toaster } from "react-hot-toast";
import Form from "./Pages/Login/Form";

function Page({ name }) {
  return <div className="p-4 text-xl">{name}</div>;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      {isLoggedIn ? (
        <div className="flex">
          <Sidebar onLogout={() => setIsLoggedIn(false)} />

          <div className="flex-1 ml-0 md:ml-4 p-4">
            <Routes>
              <Route path="/" element={<Page name="Dashboard" />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/video" element={<Video />} />
              <Route path="/booking" element={<BookingAlbum />} />
              <Route path="/contact" element={<ContactMessages />} />
              <Route path="/album/:id" element={<AlbumPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route
            path="/*"
            element={<Form onLoginSuccess={() => setIsLoggedIn(true)} />}
          />
        </Routes>
      )}
    </Router>
  );
}

export default App;
