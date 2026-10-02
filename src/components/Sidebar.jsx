import { NavLink } from "react-router-dom";

function Sidebar({ isOpen, onClose }) {
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
                        <span>🏠</span>
                        <span>Home</span>
                    </NavLink>

                    <NavLink
                        to="/explore"
                        className="sidebar-link"
                        onClick={onClose}
                    >
                        <span>🔎</span>
                        <span>Explore</span>
                    </NavLink>

                    <NavLink
                        to="/trending"
                        className="sidebar-link"
                        onClick={onClose}
                    >
                        <span>🔥</span>
                        <span>Trending</span>
                    </NavLink>

                </nav>


                <div className="sidebar-section">

                    <h3 className="sidebar-title">
                        LIBRARY
                    </h3>

                    <NavLink
                        to="/favorites"
                        className="sidebar-link"
                        onClick={onClose}
                    >
                        <span>❤️</span>
                        <span>Favorites</span>
                    </NavLink>

                    <NavLink
                        to="/watch-later"
                        className="sidebar-link"
                        onClick={onClose}
                    >
                        <span>🕒</span>
                        <span>Watch Later</span>
                    </NavLink>

                    <NavLink
                        to="/playlists"
                        className="sidebar-link"
                        onClick={onClose}
                    >
                        <span>📁</span>
                        <span>Playlists</span>
                    </NavLink>

                </div>


                <div className="sidebar-section">

                    <h3 className="sidebar-title">
                        CATEGORIES
                    </h3>

                    <NavLink
                        to="/category/education"
                        className="sidebar-link"
                        onClick={onClose}
                    >
                        <span>🎓</span>
                        <span>Education</span>
                    </NavLink>

                    <NavLink
                        to="/category/music"
                        className="sidebar-link"
                        onClick={onClose}
                    >
                        <span>🎵</span>
                        <span>Music</span>
                    </NavLink>

                    <NavLink
                        to="/category/comedy"
                        className="sidebar-link"
                        onClick={onClose}
                    >
                        <span>😂</span>
                        <span>Comedy</span>
                    </NavLink>

                    <NavLink
                        to="/category/sports"
                        className="sidebar-link"
                        onClick={onClose}
                    >
                        <span>⚽</span>
                        <span>Sports</span>
                    </NavLink>

                </div>

            </aside>
        </>
    );
}

export default Sidebar;