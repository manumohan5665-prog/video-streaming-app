import { Link } from "react-router-dom";

import videos from "../data/videos";
import VideoCard from "../components/VideoCard";
import { useVideos } from "../context/VideoContext";

function Favourites() {
  const { favourites } = useVideos();

  const favouriteVideos = videos.filter((video) =>
  favourites.includes(Number(video.id))
);

  return (
    <main className="page-content">

      <div className="collection-header">

        <p className="section-label">
          YOUR LIBRARY
        </p>

        <h1>
          Favourites
        </h1>

        <p>
          Videos you've marked as favorites.
        </p>

      </div>


      {favouriteVideos.length > 0 ? (

        <div className="video-grid">

          {favouriteVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
            />
          ))}

        </div>

      ) : (

        <div className="empty-state">

          <div className="empty-icon">
            ❤️
          </div>

          <h3>
            No favourites yet
          </h3>

          <p>
            Videos you favourite will appear here.
          </p>

          <Link
            to="/explore"
            className="back-button"
          >
            Explore Videos
          </Link>

        </div>

      )}

    </main>
  );
}

export default Favourites;