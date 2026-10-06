import { Link } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import videos from "../data/videos";

function Trending() {
    const trendingVideos = videos.filter(
        (video) => video.trending
    );

    return (
        <main className="page-content">

            <section className="collection-header">
                <p className="section-label">
                    WHAT'S HOT
                </p>

                <h1>Trending</h1>

                <p>
                    Discover the videos everyone is watching right now.
                </p>
            </section>

            <section className="trending-page-section">

                <div className="trending-page-header">
                    <div>
                        <span className="section-label">
                            TRENDING NOW
                        </span>

                        <h2>
                            Popular Videos
                        </h2>
                    </div>

                    <span className="trending-count">
                        {trendingVideos.length} videos
                    </span>
                </div>

                {trendingVideos.length > 0 ? (
                    <div className="trending-grid">
                        {trendingVideos.map((video, index) => (
                            <article
                                key={video.id}
                                className={`trending-card ${index === 0 ? "trending-card-featured" : ""
                                    }`}
                            >
                                <Link
                                    to={`/video/${video.id}`}
                                    className="trending-thumbnail"
                                >
                                    <span className="trending-rank">
                                        #{index + 1}
                                    </span>

                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        loading="lazy"
                                        decoding="async"
                                    />

                                    <span className="video-duration">
                                        {video.duration}
                                    </span>

                                    <span className="trending-play">
                                        ▶
                                    </span>
                                </Link>

                                <div className="trending-card-info">
                                    <span className="trending-position">
                                        TRENDING #{index + 1}
                                    </span>

                                    <Link
                                        to={`/video/${video.id}`}
                                        className="trending-title"
                                    >
                                        {video.title}
                                    </Link>

                                    <p className="trending-creator">
                                        {video.creator}
                                    </p>

                                    <p className="trending-meta">
                                        {video.views} views • {video.uploaded}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon">
                            🔥
                        </div>

                        <h3>
                            No trending videos
                        </h3>

                        <p>
                            There are no trending videos right now.
                        </p>

                        <Link
                            to="/explore"
                            className="empty-state-button"
                        >
                            Explore Videos
                        </Link>
                    </div>
                )}

            </section>

        </main>
    );
}

export default Trending;