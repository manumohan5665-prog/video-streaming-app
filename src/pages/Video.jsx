import { useState } from "react";
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

    const {
        toggleFavourite,
        toggleWatchLater,
        isFavourite,
        isWatchLater,
        playlists,
        addToPlaylist,
        removeFromPlaylist,
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