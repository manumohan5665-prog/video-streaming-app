import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const VideoContext = createContext();

export function VideoProvider({ children }) {
    const [favourites, setFavourites] = useLocalStorage(
        "streamly-favourites",
        []
    );

    const [watchLater, setWatchLater] = useLocalStorage(
        "streamly-watch-later",
        []
    );

    // -------------------------
    // FAVOURITES
    // -------------------------

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


    return (
        <VideoContext.Provider
            value={{
                favourites,
                watchLater,

                toggleFavourite,
                toggleWatchLater,

                isFavourite,
                isWatchLater,

                playlists,
                createPlaylist,
                deletePlaylist,
                addToPlaylist,
                removeFromPlaylist,
            }}
        >
            {children}
        </VideoContext.Provider>
    );
}

export function useVideos() {
    return useContext(VideoContext);
}