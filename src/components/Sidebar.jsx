import { NavLink } from "react-router-dom";
import { useVideos } from "../context/VideoContext";
import {
    Home,
    Compass,
    Flame,
    Heart,
    Clock,
    ListVideo,
    GraduationCap,
    Music,
    Laugh,
    Trophy,
    Plane,
} from "lucide-react";

function Sidebar({ isOpen, onClose }) {
    const {
        favourites,
        watchLater
    } = useVideos();

    return (
        <>
            {isOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={onClose}
                />
            )}

            <aside
                className={`sidebar ${isOpen ? "sidebar-open" : ""}`}
            >

                <nav className="sidebar-section">

                    <NavLink
                        to="/"
                        className="sidebar-link"
                        onClick={onClose}
                    >
                        <span><Home size={19} strokeWidth={2} /></span>
                        <span>Home</span>
                    </NavLink>

                    <NavLink
                        to="/explore"
                        className="sidebar-link"
                        onClick={onClose}
                    >
                        <span><Compass size={19} strokeWidth={2} /></span>
                        <span>Explore</span>
                    </NavLink>

                    <NavLink
                        to="/trending"
                        className="sidebar-link"
                        onClick={onClose}
                    >
                        <span><Flame size={19} strokeWidth={2} /></span>
                        <span>Trending</span>
                    </NavLink>

                </nav>


                <div className="sidebar-section">

                    <h3 className="sidebar-title">
                        LIBRARY
                    </h3>

                    <NavLink
                        to="/favourites"
                        className="sidebar-link"
                        onClick={onClose}
                    >
                        <span><Heart size={19} strokeWidth={2} /></span>
                        <span>Favourites</span>

                        {favourites.length > 0 && (
                            <span className="sidebar-count">
                                {favourites.length}
                            </span>
                        )}
                    </NavLink>

                    <NavLink
                        to="/watch-later"
                        className="sidebar-link"
                        onClick={onClose}
                    >
                        <span><Clock size={19} strokeWidth={2} /></span>
                        <span>Watch Later</span>

                        {watchLater.length > 0 && (
                            <span className="sidebar-count">
                                {watchLater.length}
                            </span>
                        )}
                    </NavLink>

                    <NavLink
                        to="/playlists"
                        className="sidebar-link"
                        onClick={onClose}
                    >
                        <span><ListVideo size={19} strokeWidth={2} /></span>
                        <span>Playlists</span>
                    </NavLink>

                </div>


                <div className="sidebar-section">

                    <h3 className="sidebar-title">
                        CATEGORIES
                    </h3>

                    <NavLink
                        to="/category/education"
                        className={({ isActive }) =>
                            isActive ? "sidebar-link active" : "sidebar-link"
                        }
                        onClick={onClose}
                    >
                        <span className="sidebar-icon"><GraduationCap size={19} strokeWidth={2} /></span>
                        <span>Education</span>
                    </NavLink>

                    <NavLink
                        to="/category/music"
                        className={({ isActive }) =>
                            isActive ? "sidebar-link active" : "sidebar-link"
                        }
                        onClick={onClose}
                    >
                        <span className="sidebar-icon"><Music size={19} strokeWidth={2} /></span>
                        <span>Music</span>
                    </NavLink>

                    <NavLink
                        to="/category/comedy"
                        className={({ isActive }) =>
                            isActive ? "sidebar-link active" : "sidebar-link"
                        }
                        onClick={onClose}
                    >
                        <span className="sidebar-icon"><Laugh size={19} strokeWidth={2} /></span>
                        <span>Comedy</span>
                    </NavLink>

                    <NavLink
                        to="/category/sports"
                        className={({ isActive }) =>
                            isActive ? "sidebar-link active" : "sidebar-link"
                        }
                        onClick={onClose}
                    >
                        <span className="sidebar-icon"><Trophy size={19} strokeWidth={2} /></span>
                        <span>Sports</span>
                    </NavLink>

                    <NavLink
                        to="/category/travel"
                        className={({ isActive }) =>
                            isActive ? "sidebar-link active" : "sidebar-link"
                        }
                        onClick={onClose}
                    >
                        <span className="sidebar-icon"><Plane size={19} strokeWidth={2} /></span>
                        <span>Travel</span>
                    </NavLink>

                </div>

            </aside>
        </>
    );
}

export default Sidebar;