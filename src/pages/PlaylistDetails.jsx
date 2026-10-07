import { Link, useNavigate, useParams } from "react-router-dom";

import videos from "../data/videos";
import VideoCard from "../components/VideoCard";
import { useVideos } from "../context/VideoContext";
import EmptyState from "../components/EmptyState";
import { Clapperboard, Play, Folder } from "lucide-react";

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
                    <div className="empty-icon"><Folder size={20} strokeWidth={2}/></div>

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
                    <Play size={20} strokeWidth={2}/> Play All
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
                <EmptyState
                    icon=<Clapperboard size={20} strokeWidth={2}/>
                    title="No videos in this playlist"
                    message="Add videos to this playlist from a video page."
                    buttonText="Explore Videos"
                    buttonTo="/explore"
                />

            )}
        </main>
    );
}

export default PlaylistDetails;