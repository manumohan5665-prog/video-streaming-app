function Navbar() {
  return (
    <header className="navbar">

      {/* Logo */}
      <div className="navbar-logo">
        <span className="logo-icon">▶</span>
        <span className="logo-text">Streamly</span>
      </div>

      {/* Search */}
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search videos..."
        />

        <button>
          🔍
        </button>
      </div>

      {/* Actions */}
      <div className="navbar-actions">

        <button className="icon-button">
          🔔
        </button>

        <div className="profile">
          <div className="profile-avatar">
            M
          </div>
        </div>

        <button className="menu-button">
          ☰
        </button>

      </div>

    </header>
  );
}

export default Navbar;