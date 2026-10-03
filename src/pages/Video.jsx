import { useParams, Link } from "react-router-dom";

import videos from "../data/videos";
import VideoCard from "../components/VideoCard";
import { useVideos } from "../context/VideoContext";

function Video() {
    const {
        isFavourite,
        toggleFavourite,
        isWatchLater,
        toggleWatchLater,
    } = useVideos();

    const { id } = useParams();

    const video = videos.find(
        (video) => video.id === Number(id)
    );

    if (!video) {
        return (
            <main className="page-content">

                <div className="empty-state">

                    <div className="empty-icon">
                        🎬
                    </div>

                    <h2>
                        Video not found
                    </h2>

                    <p>
                        The video you're looking for doesn't exist.
                    </p>

                    <Link
                        to="/explore"
                        className="back-button"
                    >
                        Back to Explore
                    </Link>

                </div>

            </main>
        );
    }

    const relatedVideos = videos.filter(
        (item) =>
            item.category === video.category &&
            item.id !== video.id
    );

    return (
        <main className="page-content">

            {/* Video Player */}

            <section className="video-player-container">

                <iframe
                    src={video.videoUrl}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />

            </section>


            {/* Video Information */}

            <section className="video-page-info">

                <h1 className="video-page-title">
                    {video.title}
                </h1>


                <div className="video-page-meta">

                    <div>

                        <strong>
                            {video.creator}
                        </strong>

                        <p>
                            {video.views} views • {video.uploaded}
                        </p>

                    </div>


                    <div className="video-actions">

                        <button className="video-action-button">
                            👍 Like
                        </button>

                        <button
                            className={
                                isFavourite(video.id)
                                    ? "video-action-button active"
                                    : "video-action-button"
                            }
                            onClick={() =>
                                toggleFavourite(video.id)
                            }
                        >
                            {isFavourite(video.id)
                                ? "❤️ Favourited"
                                : "♡ Favourite"}
                        </button>

                        <button
                            className={
                                isWatchLater(video.id)
                                    ? "video-action-button active"
                                    : "video-action-button"
                            }
                            onClick={() =>
                                toggleWatchLater(video.id)
                            }
                        >
                            {isWatchLater(video.id)
                                ? "✓ Saved"
                                : "🕒 Watch Later"}
                        </button>

                        <button className="video-action-button">
                            ↗ Share
                        </button>

                    </div>

                </div>


                {/* Description */}

                <div className="video-description">

                    <p>
                        {video.description}
                    </p>

                </div>

            </section>


            {/* Related Videos */}

            {relatedVideos.length > 0 && (

                <section className="video-section">

                    <div className="section-header">

                        <div>

                            <p className="section-label">
                                KEEP WATCHING
                            </p>

                            <h2>
                                Related Videos
                            </h2>

                        </div>

                    </div>


                    <div className="video-grid">

                        {relatedVideos.map((relatedVideo) => (

                            <VideoCard
                                key={relatedVideo.id}
                                video={relatedVideo}
                            />

                        ))}

                    </div>

                </section>

            )}

        </main>
    );
}

export default Video;