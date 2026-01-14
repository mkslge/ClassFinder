import './Header.css';

function Header() {
  return (
    <header className="Header">
      <nav className="menu" aria-label="Primary navigation">
        <a className="brand" href="/" aria-label="Go to homepage">
          TerpCS Hub
        </a>

        <ul className="menuList">
          <li className="menuItem">
            <a className="menuLink active" href="/" id="home">
              Home
            </a>
          </li>

          <li className="menuItem">
            <a className="menuLink" href="/" id="projects">
              Courses
            </a>
          </li>

          <li className="menuItem">
            <a
              className="menuLink"
              href="https://github.com/mkslge/ClassFinder"
              id="experience"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
