import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Play,
  Search,
  Bell,
  User,
  Flame,
  Music,
  Star,
  Settings,
  LogOut,
} from "lucide-react";

function Navbar({ onMenuClick }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const query = searchTerm.trim();

    if (!query) {
      navigate("/explore");
      return;
    }

    navigate(`/explore?search=${encodeURIComponent(query)}`);
  };

  return (
    <header className="navbar">

      {/* Mobile Menu */}

      <button
        className="menu-button"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <Menu size={22} strokeWidth={2} />
      </button>


      {/* Logo */}

      <div className="navbar-logo">
        <span className="logo-icon"><Play /></span>

        <span className="logo-text">
          VidTube
        </span>
      </div>


      {/* Search */}

      <form className="navbar-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search videos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button type="submit" aria-label="Search">
          <Search size={20} strokeWidth={2} />
        </button>
      </form>


      {/* Actions */}

      <div className="navbar-actions">

        <div className="notification-wrapper">
          <button
            className="icon-button notification-button"
            onClick={() => setNotificationsOpen((prev) => !prev)}
            aria-label="Notifications"
          >
            <Bell size={20} strokeWidth={2} />
            <span className="notification-badge">3</span>
          </button>

          {notificationsOpen && (
            <div className="notification-menu">
              <div className="notification-header">
                <strong>Notifications</strong>
                <span>3 new</span>
              </div>

              <div className="notification-item">
                <div className="notification-icon"><Flame size={20} strokeWidth={3} /></div>
                <div>
                  <strong>Trending now</strong>
                  <p>React tutorials are trending today.</p>
                  <span>5 min ago</span>
                </div>
              </div>

              <div className="notification-item">
                <div className="notification-icon"><Music size={20} strokeWidth={2} /></div>
                <div>
                  <strong>New music</strong>
                  <p>Check out the latest music videos.</p>
                  <span>1 hour ago</span>
                </div>
              </div>

              <div className="notification-item">
                <div className="notification-icon"><Star size={20} strokeWidth={2} /></div>
                <div>
                  <strong>Recommended for you</strong>
                  <p>We found some videos you may like.</p>
                  <span>3 hours ago</span>
                </div>
              </div>

              <button className="notification-view-all">
                View all notifications
              </button>
            </div>
          )}
        </div>

        <div className="profile">
          <button
            type="button"
            className="profile-button"
            onClick={() => setProfileOpen((prev) => !prev)}
          >
            <div className="profile-avatar">
              <User size={18} strokeWidth={2} />
            </div>
          </button>

          {profileOpen && (
            <div className="profile-menu">
              <div className="profile-menu-header">
                <div className="profile-menu-avatar">
                  M
                </div>

                <div>
                  <strong>Manu</strong>
                  <span>User</span>
                </div>
              </div>

              <div className="profile-menu-divider"></div>

              <button className="profile-menu-item">
                <User size={18} strokeWidth={2} /> My Profile
              </button>

              <button className="profile-menu-item">
                <Settings size={17} /> Settings
              </button>

              <button className="profile-menu-item">
                <LogOut size={17} /> Sign Out
              </button>
            </div>
          )}
        </div>

      </div>

    </header>
  );
}

export default Navbar;