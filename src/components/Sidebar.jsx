import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <aside className="sidebar">

            {/* Main Navigation */}

            <nav className="sidebar-section">

                <NavLink to="/" className="sidebar-link">
                    <span>🏠</span>
                    <span>Home</span>
                </NavLink>

                <NavLink to="/explore" className="sidebar-link">
                    <span>🔎</span>
                    <span>Explore</span>
                </NavLink>

                <NavLink to="/trending" className="sidebar-link">
                    <span>🔥</span>
                    <span>Trending</span>
                </NavLink>

            </nav>


            {/* Library */}

            <div className="sidebar-section">

                <h3 className="sidebar-title">
                    LIBRARY
                </h3>

                <NavLink to="/favorites" className="sidebar-link">
                    <span>❤️</span>
                    <span>Favorites</span>
                </NavLink>

                <NavLink to="/watch-later" className="sidebar-link">
                    <span>🕒</span>
                    <span>Watch Later</span>
                </NavLink>

                <NavLink to="/playlists" className="sidebar-link">
                    <span>📁</span>
                    <span>Playlists</span>
                </NavLink>

            </div>


            {/* Categories */}

            <div className="sidebar-section">

                <h3 className="sidebar-title">
                    CATEGORIES
                </h3>

                <NavLink to="/category/education" className="sidebar-link">
                    <span>🎓</span>
                    <span>Education</span>
                </NavLink>

                <NavLink to="/category/music" className="sidebar-link">
                    <span>🎵</span>
                    <span>Music</span>
                </NavLink>

                <NavLink to="/category/comedy" className="sidebar-link">
                    <span>😂</span>
                    <span>Comedy</span>
                </NavLink>

                <NavLink to="/category/sports" className="sidebar-link">
                    <span>⚽</span>
                    <span>Sports</span>
                </NavLink>

            </div>

        </aside>
    );
}

export default Sidebar;