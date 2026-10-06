import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      >
        ☰
      </button>


      {/* Logo */}

      <div className="navbar-logo">
        <span className="logo-icon">▶</span>

        <span className="logo-text">
          UTube
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

        <button type="submit">🔍</button>
      </form>


      {/* Actions */}

      <div className="navbar-actions">

        <div className="notification-wrapper">
          <button
            type="button"
            className="icon-button notification-button"
            onClick={() => setNotificationsOpen((prev) => !prev)}
          >
            🔔
            <span className="notification-badge">3</span>
          </button>

          {notificationsOpen && (
            <div className="notification-menu">
              <div className="notification-header">
                <strong>Notifications</strong>
                <span>3 new</span>
              </div>

              <div className="notification-item">
                <div className="notification-icon">🔥</div>
                <div>
                  <strong>Trending now</strong>
                  <p>React tutorials are trending today.</p>
                  <span>5 min ago</span>
                </div>
              </div>

              <div className="notification-item">
                <div className="notification-icon">🎵</div>
                <div>
                  <strong>New music</strong>
                  <p>Check out the latest music videos.</p>
                  <span>1 hour ago</span>
                </div>
              </div>

              <div className="notification-item">
                <div className="notification-icon">⭐</div>
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
            <div className="profile-avatar">M</div>
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
                👤 My Profile
              </button>

              <button className="profile-menu-item">
                ⚙️ Settings
              </button>

              <button className="profile-menu-item">
                🚪 Sign Out
              </button>
            </div>
          )}
        </div>

      </div>

    </header>
  );
}

export default Navbar;