import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import videos from "../data/videos";
import VideoCard from "../components/VideoCard";

function Explore() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [searchTerm, setSearchTerm] = useState(
        searchParams.get("search") || ""
    );

    const [selectedCategory, setSelectedCategory] =
        useState(
            searchParams.get("category") || "All"
        );

    const [sortBy, setSortBy] = useState(
        searchParams.get("sort") || "newest"
    );

    useEffect(() => {
        const params = {};

        if (searchTerm) {
            params.search = searchTerm;
        }

        if (selectedCategory !== "All") {
            params.category = selectedCategory;
        }

        if (sortBy !== "newest") {
            params.sort = sortBy;
        }

        setSearchParams(params);
    }, [
        searchTerm,
        selectedCategory,
        sortBy,
        setSearchParams
    ]);


    const categories = [
        "All",
        "Education",
        "Music",
        "Comedy",
        "Sports",
        "Travel",
    ];

    const filteredVideos = videos.filter((video) => {
        const matchesSearch =
            video.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

        const matchesCategory =
            selectedCategory === "All" ||
            video.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    const sortedVideos = [...filteredVideos].sort((a, b) => {
        switch (sortBy) {
            case "mostViewed":
                return parseViews(b.views) - parseViews(a.views);

            case "titleAZ":
                return a.title.localeCompare(b.title);

            case "titleZA":
                return b.title.localeCompare(a.title);

            case "newest":
            default:
                return b.id - a.id;
        }
    });

    function parseViews(views) {
        const value = parseFloat(views);

        if (views.includes("M")) {
            return value * 1000000;
        }

        if (views.includes("K")) {
            return value * 1000;
        }

        return value;
    }

    return (
        <main className="page-content">

            {/* Header */}

            <div className="explore-header">

                <p className="section-label">
                    DISCOVER
                </p>

                <h1>
                    Explore Videos
                </h1>

                <p className="explore-description">
                    Find videos, creators and topics you enjoy.
                </p>

            </div>


            {/* Search */}

            <div className="explore-search">

                <input
                    type="text"
                    placeholder="Search videos..."
                    value={searchTerm}
                    onChange={(event) =>
                        setSearchTerm(event.target.value)
                    }
                />

                <button>
                    🔍
                </button>

            </div>


            {/* Categories */}

            <div className="explore-filters">

                <div className="category-list">

                    {categories.map((category) => (

                        <button
                            key={category}
                            className={
                                selectedCategory === category
                                    ? "category-button active"
                                    : "category-button"
                            }
                            onClick={() =>
                                setSelectedCategory(category)
                            }
                        >
                            {category}
                        </button>

                    ))}

                </div>
                <div className="sort-container">

                    <label htmlFor="sort">
                        Sort by
                    </label>

                    <select
                        id="sort"
                        value={sortBy}
                        onChange={(event) =>
                            setSortBy(event.target.value)
                        }
                    >
                        <option value="newest">
                            Newest
                        </option>

                        <option value="mostViewed">
                            Most Viewed
                        </option>

                        <option value="titleAZ">
                            Title A-Z
                        </option>

                        <option value="titleZA">
                            Title Z-A
                        </option>
                    </select>

                </div>

                <button
                    className="clear-filters-button"
                    onClick={() => {
                        setSearchTerm("");
                        setSelectedCategory("All");
                        setSortBy("newest");
                    }}
                >
                    Clear Filters
                </button>

            </div>


            {/* Results Header */}

            <div className="explore-results-header">

                <div>

                    <h2>
                        {selectedCategory === "All"
                            ? "All Videos"
                            : selectedCategory}
                    </h2>

                    {searchTerm && (
                        <p className="results-search-text">
                            Results for "{searchTerm}"
                        </p>
                    )}

                </div>

                <span>
                    {filteredVideos.length} videos
                </span>

            </div>


            {/* Results */}

            {sortedVideos.length > 0 ? (

                <div className="video-grid">

                    {sortedVideos.map((video) => (

                        <VideoCard
                            key={video.id}
                            video={video}
                        />

                    ))}

                </div>

            ) : (

                <div className="empty-state">

                    <div className="empty-icon">
                        🔎
                    </div>

                    <h3>
                        No videos found
                    </h3>

                    <p>
                        Try changing your search or category.
                    </p>

                </div>

            )}

        </main>
    );
}

export default Explore;