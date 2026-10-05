import { Link } from "react-router-dom";

import videos from "../data/videos";
import VideoCard from "../components/VideoCard";
import { useVideos } from "../context/VideoContext";
import EmptyState from "../components/EmptyState";

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

                <EmptyState
                    icon="🕒"
                    title="Nothing saved yet"
                    message="Videos you save for later will appear here."
                    buttonText="Find Videos"
                    buttonTo="/explore"
                />

            )}

        </main>
    );
}

export default WatchLater;