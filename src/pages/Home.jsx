import { useState } from "react";
import { Link } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import { useVideos } from "../context/VideoContext";
import videos from "../data/videos";

function Home() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const {
    recentlyWatched,
} = useVideos();

    const recentlyWatchedVideos = recentlyWatched
        .map((id) =>
            videos.find(
                (video) => Number(video.id) === Number(id)
            )
        )
        .filter(Boolean);

    const categories = [
        "All",
        "Education",
        "Music",
        "Comedy",
        "Sports",
        "Travel",
    ];

    const trendingVideos = videos.filter(
        (video) => video.trending
    );

    const filteredVideos =
        selectedCategory === "All"
            ? videos
            : videos.filter(
                (video) =>
                    video.category === selectedCategory
            );

    const recommendedVideos = videos.filter(
        (video) => !video.trending
    );

    const featuredVideo = videos.find(
        (video) => video.featured
    );

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);

        setTimeout(() => {
            document
                .querySelector(".home-section")
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
        }, 50);
    };

    return (
        <main className="page-content">

            {/* =========================
          HERO
      ========================= */}

            <section
                className="home-hero"
                style={{
                    backgroundImage: `url(${featuredVideo.thumbnail})`,
                }}
            >
                <div className="home-hero-overlay"></div>

                <div className="home-hero-content">
                    <span className="home-hero-label">
                        FEATURED VIDEO
                    </span>

                    <h1>{featuredVideo.title}</h1>

                    <p>{featuredVideo.description}</p>

                    <div className="home-hero-meta">
                        <span>{featuredVideo.category}</span>
                        <span>•</span>
                        <span>{featuredVideo.views} views</span>
                        <span>•</span>
                        <span>{featuredVideo.duration}</span>
                    </div>

                    <Link
                        to={`/video/${featuredVideo.id}`}
                        className="home-hero-button"
                    >
                        ▶ Watch Now
                    </Link>
                </div>
            </section>


            {/* =========================
          CATEGORIES
      ========================= */}

            <section className="category-section">

                <div className="section-header">

                    <div>
                        <p className="section-label">
                            EXPLORE
                        </p>

                        <h2>
                            Browse Categories
                        </h2>
                    </div>

                </div>


                <div className="category-list">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`category-button ${selectedCategory === category ? "active" : ""
                                }`}
                            onClick={() => handleCategoryChange(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

            </section>

            {/* =========================
          CATEGORY RESULTS
      ========================= */}

            {selectedCategory !== "All" && (

                <section className="video-section">

                    <div className="section-header">

                        <div>

                            <p className="section-label">
                                {selectedCategory === "All"
                                    ? "EXPLORE"
                                    : "CATEGORY"}
                            </p>

                            <h2>
                                {selectedCategory === "All"
                                    ? "All Videos"
                                    : selectedCategory}
                            </h2>

                        </div>

                    </div>

                    {filteredVideos.length > 0 ? (

                        <div className="video-grid">

                            {filteredVideos.map((video) => (
                                <VideoCard
                                    key={video.id}
                                    video={video}
                                />
                            ))}

                        </div>

                    ) : (

                        <div className="empty-state">

                            <div className="empty-icon">
                                🎬
                            </div>

                            <h3>
                                No videos found
                            </h3>

                            <p>
                                We couldn't find any videos in this category yet.
                            </p>

                        </div>

                    )}

                </section>

            )}

            {recentlyWatchedVideos.length > 0 && (
                <section className="home-section">
                    <div className="home-section-header">
                        <div>
                            <span className="section-label">YOUR HISTORY</span>
                            <h2>Continue Watching</h2>
                        </div>

                        <span className="section-count">
                            {recentlyWatchedVideos.length} videos
                        </span>
                    </div>

                    <div className="video-grid">
                        {recentlyWatchedVideos.map((video) => (
                            <VideoCard
                                key={video.id}
                                video={video}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* =========================
          TRENDING
      ========================= */}

            {selectedCategory === "All" && (

                <section className="home-section">
                    <div className="home-section-header">
                        <h2>Trending Now</h2>

                        <Link to="/explore">
                            See All →
                        </Link>
                    </div>

                    <div className="video-grid">

                        {trendingVideos.map((video) => (
                            <VideoCard
                                key={video.id}
                                video={video}
                            />
                        ))}

                    </div>
                </section>

            )}

            {/* =========================
          RECOMMENDED
      ========================= */}

            <section className="home-section">
                <div className="home-section-header">
                    <h2>Recommended</h2>

                    <Link to="/explore">
                        See All →
                    </Link>
                </div>

                <div className="video-grid">

                    {recommendedVideos.map((video) => (

                        <VideoCard
                            key={video.id}
                            video={video}
                        />

                    ))}

                </div>
            </section>

        </main>
    );
}

export default Home;