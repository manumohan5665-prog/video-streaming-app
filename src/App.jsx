import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Trending from "./pages/Trending";
import Video from "./pages/Video";
import WatchLater from "./pages/WatchLater";
import Favourites from "./pages/Favourites";
import Playlists from "./pages/Playlists";
import NotFound from "./pages/NotFound";
import PlaylistDetails from "./pages/PlaylistDetails";
import Category from "./pages/Category";

function App() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>

      <Navbar
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
      />

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/explore"
          element={<Explore />}
        />

        <Route
          path="/trending"
          element={<Trending />} />

        <Route
          path="/video/:id"
          element={<Video />}
        />

        <Route
          path="/watch-later"
          element={<WatchLater />}
        />

        <Route
          path="/favourites"
          element={<Favourites />}
        />

        <Route
          path="/playlists/:id"
          element={<PlaylistDetails />}
        />

        <Route
          path="/playlists"
          element={<Playlists />}
        />

        <Route
          path="/category/:category"
          element={<Category />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;