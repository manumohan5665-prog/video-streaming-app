import videos from "../data/videos";
import VideoCard from "../components/VideoCard";

function Home() {
    const trendingVideos = videos.filter(
        (video) => video.trending
    );

    return (
        <main className="page-content">

            {/* Hero */}

            <section className="hero-section">

                <div>
                    <p className="hero-label">
                        WELCOME TO STREAMLY
                    </p>

                    <h1>
                        Discover your next
                        <span> favorite video.</span>
                    </h1>

                    <p className="hero-description">
                        Watch, discover and save videos from
                        creators around the world.
                    </p>
                </div>

            </section>


            {/* Trending */}

            <section className="video-section">

                <div className="section-header">

                    <div>
                        <p className="section-label">
                            WHAT'S HOT
                        </p>

                        <h2>
                            Trending Now
                        </h2>
                    </div>

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

        </main>
    );
}

export default Home;