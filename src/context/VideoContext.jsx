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

    return (
        <VideoContext.Provider
            value={{
                favourites,
                watchLater,
                toggleFavourite,
                toggleWatchLater,
                isFavourite,
                isWatchLater,
            }}
        >
            {children}
        </VideoContext.Provider>
    );
}

export function useVideos() {
    return useContext(VideoContext);
}