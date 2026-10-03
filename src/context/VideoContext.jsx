import {
    createContext,
    useContext,
} from "react";

import useLocalStorage
    from "../hooks/useLocalStorage";

const VideoContext = createContext();


export function VideoProvider({ children }) {

    const [
        favorites,
        setFavorites
    ] = useLocalStorage(
        "streamly-favorites",
        []
    );


    const [
        watchLater,
        setWatchLater
    ] = useLocalStorage(
        "streamly-watch-later",
        []
    );


    const toggleFavorite = (videoId) => {

        if (favorites.includes(videoId)) {

            setFavorites(
                favorites.filter(
                    (id) => id !== videoId
                )
            );

        } else {

            setFavorites([
                ...favorites,
                videoId
            ]);

        }

    };


    const toggleWatchLater = (videoId) => {

        if (watchLater.includes(videoId)) {

            setWatchLater(
                watchLater.filter(
                    (id) => id !== videoId
                )
            );

        } else {

            setWatchLater([
                ...watchLater,
                videoId
            ]);

        }

    };


    const isFavorite = (videoId) =>
        favorites.includes(videoId);


    const isWatchLater = (videoId) =>
        watchLater.includes(videoId);


    return (
        <VideoContext.Provider
            value={{
                favorites,
                watchLater,

                toggleFavorite,
                toggleWatchLater,

                isFavorite,
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