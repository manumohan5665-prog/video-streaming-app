import { Link } from "react-router-dom";

import videos from "../data/videos";
import VideoCard from "../components/VideoCard";
import { useVideos } from "../context/VideoContext";

function WatchLater() {
    const { watchLater } = useVideos();

    const savedVideos = videos.filter((video) =>
        watchLater.includes(video.id)
    );

    return (
        <main className="page-content">

            <div className="collection-header">

                <p className="section-label">
                    YOUR LIBRARY
                </p>

                <h1>
                    Watch Later
                </h1>

                <p>
                    Videos you've saved to watch later.
                </p>

            </div>


            {savedVideos.length > 0 ? (

                <div className="video-grid">

                    {savedVideos.map((video) => (
                        <VideoCard
                            key={video.id}
                            video={video}
                        />
                    ))}

                </div>

            ) : (

                <div className="empty-state">

                    <div className="empty-icon">
                        🕒
                    </div>

                    <h3>
                        Your watch later list is empty
                    </h3>

                    <p>
                        Save videos and come back to them later.
                    </p>

                    <Link
                        to="/explore"
                        className="back-button"
                    >
                        Find Videos
                    </Link>

                </div>

            )}

        </main>
    );
}

export default WatchLater;