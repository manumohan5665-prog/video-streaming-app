import { createContext, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const VideoContext = createContext();

export function VideoProvider({ children }) {

    // -------------------------
    // FAVOURITES
    // -------------------------

    const [favourites, setFavourites] = useLocalStorage(
        "streamly-favourites",
        []
    );

    const toggleFavourite = (videoId) => {
        const id = Number(videoId);

        if (favourites.includes(id)) {
            setFavourites(favourites.filter((item) => item !== id));
        } else {
            setFavourites([...favourites, id]);
        }
    };

    const isFavourite = (videoId) => {
        return favourites.includes(Number(videoId));
    };

    // -------------------------
    // WATCH LATER
    // -------------------------

    const [watchLater, setWatchLater] = useLocalStorage(
        "streamly-watch-later",
        []
    );

    const toggleWatchLater = (videoId) => {
        const id = Number(videoId);

        if (watchLater.includes(id)) {
            setWatchLater(watchLater.filter((item) => item !== id));
        } else {
            setWatchLater([...watchLater, id]);
        }
    };

    const isWatchLater = (videoId) => {
        return watchLater.includes(Number(videoId));
    };

    // -------------------------
    // PLAYLISTS
    // -------------------------

    const [playlists, setPlaylists] = useLocalStorage(
        "streamly-playlists",
        []
    );

    const createPlaylist = (name, description = "") => {
        const newPlaylist = {
            id: Date.now(),
            name,
            description,
            videoIds: [],
            createdAt: new Date().toISOString(),
        };

        setPlaylists([...playlists, newPlaylist]);

        return newPlaylist;
    };

    const deletePlaylist = (playlistId) => {
        setPlaylists(
            playlists.filter((playlist) => playlist.id !== playlistId)
        );
    };

    const addToPlaylist = (playlistId, videoId) => {
        const id = Number(videoId);

        setPlaylists(
            playlists.map((playlist) => {
                if (playlist.id !== playlistId) {
                    return playlist;
                }

                if (playlist.videoIds.includes(id)) {
                    return playlist;
                }

                return {
                    ...playlist,
                    videoIds: [...playlist.videoIds, id],
                };
            })
        );
    };

    const removeFromPlaylist = (playlistId, videoId) => {
        const id = Number(videoId);

        setPlaylists(
            playlists.map((playlist) => {
                if (playlist.id !== playlistId) {
                    return playlist;
                }

                return {
                    ...playlist,
                    videoIds: playlist.videoIds.filter(
                        (videoId) => videoId !== id
                    ),
                };
            })
        );
    };

    // -------------------------
    // LIKED VIDEOS
    // -------------------------

    const [likedVideos, setLikedVideos] = useLocalStorage(
        "streamly-liked-videos",
        []
    );

    const toggleLike = (videoId) => {
        const id = Number(videoId);

        if (likedVideos.includes(id)) {
            setLikedVideos(
                likedVideos.filter((item) => item !== id)
            );
        } else {
            setLikedVideos([...likedVideos, id]);
        }
    };

    const isLiked = (videoId) => {
        return likedVideos.includes(Number(videoId));
    };

    // -------------------------
    // RECENT WATCH HISTORY
    // -------------------------
    const [recentlyWatched, setRecentlyWatched] = useLocalStorage(
        "streamly-recently-watched",
        []
    );

    const addToRecentlyWatched = (videoId) => {
        const id = Number(videoId);

        const updated = [
            id,
            ...recentlyWatched.filter((item) => item !== id),
        ].slice(0, 6);

        setRecentlyWatched(updated);
    };

    // -------------------------
    // CLEAR WATCH HISTORY
    // -------------------------
    const clearRecentlyWatched = () => {
        setRecentlyWatched([]);
    };

    return (
        <VideoContext.Provider
            value={{
                favourites,
                watchLater,
                playlists,
                likedVideos,

                toggleFavourite,
                toggleWatchLater,
                isFavourite,
                isWatchLater,

                createPlaylist,
                deletePlaylist,
                addToPlaylist,
                removeFromPlaylist,

                toggleLike,
                isLiked,

                recentlyWatched,
                addToRecentlyWatched,
                clearRecentlyWatched,
            }}
        >
            {children}
        </VideoContext.Provider>
    );
}

export const useVideos = () => {
    return useContext(VideoContext);
};