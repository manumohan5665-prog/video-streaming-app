import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Video from "./pages/Video";
import WatchLater from "./pages/WatchLater";
import Favourites from "./pages/Favourites";
import Playlists from "./pages/Playlists";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>

    <Navbar />

    <Sidebar />
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/explore" element={<Explore />} />

        <Route path="/video/:id" element={<Video />} />

        <Route path="/watch-later" element={<WatchLater />} />

        <Route path="/favourites" element={<Favourites />} />

        <Route path="/playlists" element={<Playlists />} />

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;