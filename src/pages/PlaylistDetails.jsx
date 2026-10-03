import { Link, useNavigate, useParams } from "react-router-dom";

import videos from "../data/videos";
import VideoCard from "../components/VideoCard";
import { useVideos } from "../context/VideoContext";

function PlaylistDetails() {
    const { id } = useParams();

    const {
        playlists,
        removeFromPlaylist,
    } = useVideos();

    const playlist = playlists.find(
        (item) => String(item.id) === id
    );

    const navigate = useNavigate();

    if (!playlist) {
        return (
            <main className="page-content">
                <div className="empty-state">
                    <div className="empty-icon">📁</div>

                    <h3>Playlist not found</h3>

                    <p>
                        This playlist may have been deleted.
                    </p>

                    <Link
                        to="/playlists"
                        className="back-button"
                    >
                        Back to Playlists
                    </Link>
                </div>
            </main>
        );
    }

    const playlistVideos = playlist.videoIds
        .map((videoId) =>
            videos.find(
                (video) => Number(video.id) === Number(videoId)
            )
        )
        .filter(Boolean);

    return (
        <main className="page-content">

            <Link
                to="/playlists"
                className="playlist-back-link"
            >
                ← Back to Playlists
            </Link>

            <div className="playlist-details-header">
                <p className="section-label">
                    PLAYLIST
                </p>

                <h1>{playlist.name}</h1>

                <p>
                    {playlist.description || "No description"}
                </p>

                <span>
                    {playlistVideos.length} video
                    {playlistVideos.length !== 1 ? "s" : ""}
                </span>
            </div>

            {playlistVideos.length > 0 && (
                <button
                    className="play-playlist-button"
                    onClick={() => {
                        navigate(
                            `/video/${playlistVideos[0].id}?playlist=${playlist.id}`
                        );
                    }}
                >
                    ▶ Play All
                </button>
            )}

            {playlistVideos.length > 0 ? (
                <div className="video-grid">
                    {playlistVideos.map((video) => (
                        <div
                            className="playlist-video-item"
                            key={video.id}
                        >
                            <VideoCard video={video} />

                            <button
                                className="remove-playlist-video"
                                onClick={() =>
                                    removeFromPlaylist(
                                        playlist.id,
                                        video.id
                                    )
                                }
                            >
                                Remove from Playlist
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <div className="empty-icon">🎬</div>

                    <h3>No videos in this playlist</h3>

                    <p>
                        Add videos to this playlist from a
                        video page.
                    </p>

                    <Link
                        to="/explore"
                        className="back-button"
                    >
                        Explore Videos
                    </Link>
                </div>
            )}
        </main>
    );
}

export default PlaylistDetails;