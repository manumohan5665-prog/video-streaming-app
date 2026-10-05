import { useState, useEffect } from "react";
import {
    Link,
    useParams,
    useSearchParams, useNavigate
} from "react-router-dom";

import videos from "../data/videos";
import VideoCard from "../components/VideoCard";
import { useVideos } from "../context/VideoContext";

function Video() {
    const { id } = useParams();

    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const playlistId = searchParams.get("playlist");

    const video = videos.find(
        (video) => video.id === Number(id)
    );

    useEffect(() => {
        if (video) {
            addToRecentlyWatched(video.id);
        }
    }, [video]);

    const {
        toggleFavourite,
        toggleWatchLater,
        isFavourite,
        isWatchLater,
        playlists,
        addToPlaylist,
        removeFromPlaylist,
        toggleLike,
        isLiked,
        addToRecentlyWatched,
    } = useVideos();

    const currentPlaylist = playlists.find(
        (playlist) => String(playlist.id) === playlistId
    );

    const playlistVideos = currentPlaylist
        ? currentPlaylist.videoIds
            .map((videoId) =>
                videos.find(
                    (item) => Number(item.id) === Number(videoId)
                )
            )
            .filter(Boolean)
        : [];

    const currentIndex = playlistVideos.findIndex(
        (item) => item.id === video?.id
    );

    const previousVideo =
        currentIndex > 0
            ? playlistVideos[currentIndex - 1]
            : null;

    const nextVideo =
        currentIndex >= 0 &&
            currentIndex < playlistVideos.length - 1
            ? playlistVideos[currentIndex + 1]
            : null;

    const handleShare = async () => {
        const shareUrl = window.location.href;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: video.title,
                    text: `Watch "${video.title}" on Streamly`,
                    url: shareUrl,
                });
            } else {
                await navigator.clipboard.writeText(shareUrl);

                alert("Video link copied to clipboard!");
            }
        } catch (error) {
            if (error.name !== "AbortError") {
                console.error("Share failed:", error);
            }
        }
    };

    const [playerLoading, setPlayerLoading] = useState(true);
    const [playerError, setPlayerError] = useState(false);

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

    const recommendedVideos = videos.filter(
        (item) => item.id !== video.id
    );

    const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);

    return (
        <main className="page-content">



            {/* Video Player */}

            {currentPlaylist && playlistVideos.length > 0 && (
                <div className="playlist-player-bar">
                    <div className="playlist-player-info">
                        <span>PLAYING FROM</span>
                        <strong>{currentPlaylist.name}</strong>
                    </div>

                    <div className="playlist-player-controls">
                        <button
                            type="button"
                            className="playlist-nav-button"
                            disabled={!previousVideo}
                            onClick={() => {
                                if (previousVideo) {
                                    navigate(
                                        `/video/${previousVideo.id}?playlist=${playlistId}`
                                    );
                                }
                            }}
                        >
                            ← Previous
                        </button>

                        <span>
                            {currentIndex + 1} / {playlistVideos.length}
                        </span>

                        <button
                            type="button"
                            className="playlist-nav-button"
                            disabled={!nextVideo}
                            onClick={() => {
                                if (nextVideo) {
                                    navigate(
                                        `/video/${nextVideo.id}?playlist=${playlistId}`
                                    );
                                }
                            }}
                        >
                            Next →
                        </button>
                    </div>
                </div>
            )}

            <section className="video-player-container">

                {playerLoading && !playerError && (
                    <div className="player-loading">
                        <div className="player-spinner"></div>
                        <p>Loading video...</p>
                    </div>
                )}

                {playerError ? (
                    <div className="player-error">
                        <div className="player-error-icon">⚠️</div>

                        <h3>Unable to load video</h3>

                        <p>
                            Something went wrong while loading this video.
                        </p>

                        <button
                            type="button"
                            className="player-retry-button"
                            onClick={() => {
                                setPlayerError(false);
                                setPlayerLoading(true);
                            }}
                        >
                            Try Again
                        </button>
                    </div>
                ) : (
                    <iframe
                        src={video.videoUrl}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        onLoad={() => setPlayerLoading(false)}
                        onError={() => {
                            setPlayerLoading(false);
                            setPlayerError(true);
                        }}
                    />
                )}

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

                        <button
                            type="button"
                            className={
                                isLiked(video.id)
                                    ? "video-action-button active"
                                    : "video-action-button"
                            }
                            onClick={() => toggleLike(video.id)}
                        >
                            {isLiked(video.id) ? "❤️ Liked" : "♡ Like"}
                        </button>

                        <button
                            className={
                                isFavourite(video.id)
                                    ? "video-action-button active"
                                    : "video-action-button"
                            }
                            onClick={() => toggleFavourite(video.id)}
                        >
                            {isFavourite(video.id) ? "❤️ Favourited" : "♡ Favourite"}
                        </button>

                        <button
                            className={
                                isWatchLater(video.id)
                                    ? "video-action-button active"
                                    : "video-action-button"
                            }
                            onClick={() => toggleWatchLater(video.id)}
                        >
                            {isWatchLater(video.id) ? "✓ Saved" : "🕒 Watch Later"}
                        </button>

                        {/* PLAYLIST */}
                        <div className="playlist-action">
                            <button
                                type="button"
                                className="video-action-button"
                                onClick={() => setShowPlaylistMenu((prev) => !prev)}
                            >
                                ＋ Add to Playlist
                            </button>

                            {showPlaylistMenu && (
                                <div className="playlist-menu">
                                    <div className="playlist-menu-title">
                                        Add to Playlist
                                    </div>

                                    {playlists.length === 0 ? (
                                        <div className="playlist-menu-empty">
                                            <p>No playlists yet.</p>

                                            <Link to="/playlists">
                                                Create Playlist
                                            </Link>
                                        </div>
                                    ) : (
                                        playlists.map((playlist) => {
                                            const alreadyAdded =
                                                playlist.videoIds.includes(Number(video.id));

                                            return (
                                                <button
                                                    type="button"
                                                    key={playlist.id}
                                                    className={
                                                        alreadyAdded
                                                            ? "playlist-menu-item added"
                                                            : "playlist-menu-item"
                                                    }
                                                    onClick={() => {
                                                        if (alreadyAdded) {
                                                            removeFromPlaylist(
                                                                playlist.id,
                                                                video.id
                                                            );
                                                        } else {
                                                            addToPlaylist(
                                                                playlist.id,
                                                                video.id
                                                            );
                                                        }
                                                    }}
                                                >
                                                    <span>
                                                        {alreadyAdded ? "✓" : "▶"}
                                                    </span>

                                                    <span>{playlist.name}</span>

                                                    {alreadyAdded && (
                                                        <small>Added</small>
                                                    )}
                                                </button>
                                            );
                                        })
                                    )}
                                </div>
                            )}
                        </div>

                        <button
                            type="button"
                            className="video-action-button"
                            onClick={handleShare}
                        >
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


            {/* Recommended Videos */}

            {recommendedVideos.length > 0 && (

                <section className="related-videos-section">
                    <h2>Recommended for You</h2>

                    <div className="video-grid">
                        {recommendedVideos.map((item) => (
                            <VideoCard
                                key={item.id}
                                video={item}
                            />
                        ))}
                    </div>
                </section>

            )}

        </main>
    );
}

export default Video;