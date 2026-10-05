import { Link } from "react-router-dom";

import videos from "../data/videos";
import VideoCard from "../components/VideoCard";
import { useVideos } from "../context/VideoContext";
import EmptyState from "../components/EmptyState";

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

        <EmptyState
          icon="❤️"
          title="No favorites yet"
          message="Videos you favorite will appear here."
          buttonText="Explore Videos"
          buttonTo="/explore"
        />

      )}

    </main>
  );
}

export default Favourites;