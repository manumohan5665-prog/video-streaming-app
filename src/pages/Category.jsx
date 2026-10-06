import { Link, useParams } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import videos from "../data/videos";

const categoryInfo = {
    education: {
        name: "Education",
        icon: "🎓",
        description: "Learn something new with tutorials, courses, and educational videos.",
    },

    music: {
        name: "Music",
        icon: "🎵",
        description: "Listen to music, performances, and relaxing sounds.",
    },

    comedy: {
        name: "Comedy",
        icon: "😂",
        description: "Laugh out loud with comedy clips and funny moments.",
    },

    sports: {
        name: "Sports",
        icon: "⚽",
        description: "Watch highlights, skills, and the latest sports moments.",
    },

    travel: {
        name: "Travel",
        icon: "✈️",
        description: "Explore beautiful destinations and travel experiences.",
    },
};

function Category() {
    const { category } = useParams();

    const categoryKey = category?.toLowerCase();

    const currentCategory = categoryInfo[categoryKey];

    const categoryVideos = videos.filter(
        (video) =>
            video.category.toLowerCase() === categoryKey
    );

    if (!currentCategory) {
        return (
            <main className="page-content">
                <div className="empty-state">
                    <div className="empty-icon">📂</div>

                    <h3>Category not found</h3>

                    <p>
                        We couldn't find the category you're looking for.
                    </p>

                    <Link
                        to="/explore"
                        className="empty-state-button"
                    >
                        Explore Videos
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="page-content">

            {/* Category Header */}

            <section className="category-page-hero">

                <div className="category-page-icon">
                    {currentCategory.icon}
                </div>

                <div>
                    <span className="section-label">
                        CATEGORY
                    </span>

                    <h1>
                        {currentCategory.name}
                    </h1>

                    <p>
                        {currentCategory.description}
                    </p>

                    <Link
                        to="/explore"
                        className="category-back-button"
                    >
                        ← Explore all videos
                    </Link>
                </div>

            </section>


            {/* Videos */}

            <section className="category-page-section">

                <div className="category-page-header">

                    <div>
                        <span className="section-label">
                            {currentCategory.name.toUpperCase()}
                        </span>

                        <h2>
                            Videos
                        </h2>
                    </div>

                    <span className="category-video-count">
                        {categoryVideos.length} videos
                    </span>

                </div>


                {categoryVideos.length > 0 ? (

                    <div className="video-grid">

                        {categoryVideos.map((video) => (
                            <VideoCard
                                key={video.id}
                                video={video}
                            />
                        ))}

                    </div>

                ) : (

                    <div className="empty-state">

                        <div className="empty-icon">
                            {currentCategory.icon}
                        </div>

                        <h3>
                            No videos yet
                        </h3>

                        <p>
                            There aren't any videos in this category yet.
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

export default Category;