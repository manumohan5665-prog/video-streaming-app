import { useState } from "react";
import { Link } from "react-router-dom";
import { useVideos } from "../context/VideoContext";

function Playlists() {
    const {
        playlists,
        createPlaylist,
        deletePlaylist,
    } = useVideos();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleCreatePlaylist = (e) => {
        e.preventDefault();

        if (!name.trim()) {
            return;
        }

        createPlaylist(name.trim(), description.trim());

        setName("");
        setDescription("");
    };

    return (
        <main className="page-content">
            <div className="collection-header">
                <p className="section-label">YOUR LIBRARY</p>

                <h1>Playlists</h1>

                <p>
                    Create and organize your favourite videos.
                </p>
            </div>

            {/* Create Playlist */}
            <section className="playlist-create-section">
                <h2>Create a Playlist</h2>

                <form
                    className="playlist-form"
                    onSubmit={handleCreatePlaylist}
                >
                    <input
                        type="text"
                        placeholder="Playlist name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Description (optional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <button type="submit">
                        + Create Playlist
                    </button>
                </form>
            </section>

            {/* Playlist List */}
            <section className="playlist-list-section">
                <div className="section-heading">
                    <h2>Your Playlists</h2>

                    <span>
                        {playlists.length} playlist
                        {playlists.length !== 1 ? "s" : ""}
                    </span>
                </div>

                {playlists.length > 0 ? (
                    <div className="playlist-grid">
                        {playlists.map((playlist) => (
                            <article
                                className="playlist-card"
                                key={playlist.id}
                            >
                                <div className="playlist-card-icon">
                                    ▶
                                </div>

                                <div className="playlist-card-content">
                                    <h3>{playlist.name}</h3>

                                    <p>
                                        {playlist.description ||
                                            "No description"}
                                    </p>

                                    <span>
                                        {playlist.videoIds.length} video
                                        {playlist.videoIds.length !== 1
                                            ? "s"
                                            : ""}
                                    </span>
                                </div>

                                <div className="playlist-card-actions">
                                    <Link
                                        to={`/playlists/${playlist.id}`}
                                        className="playlist-open-button"
                                    >
                                        Open
                                    </Link>

                                    <button
                                        className="playlist-delete-button"
                                        onClick={() =>
                                            deletePlaylist(playlist.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon">📁</div>

                        <h3>No playlists yet</h3>

                        <p>
                            Create your first playlist to organize
                            your videos.
                        </p>
                    </div>
                )}
            </section>
        </main>
    );
}

export default Playlists;