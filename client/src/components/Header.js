import '../style/Header.css';
import * as Constant from '../utility/constants'
function Header(activePage) {
  return (
    <header className="Header">
      <nav className="menu" aria-label="Primary navigation">
        <a className="brand" href="/" aria-label="Go to homepage">
          TerpCS Atlas
        </a>

        <ul className="menuList">
          <li className="menuItem">
            <a className= {activePage === "home" ? "menuLink active" : "menuLink"}href="/" id="home">
            
              Home
            </a>
          </li>

          <li className="menuItem">
            <a className={activePage === "about" ? "menuLink active" : "menuLink"} href="/about" id="about">
              About
            </a>
          </li>


          <li className="menuItem">
            <a
              className={activePage === "github" ? "menuLink active" : "menuLink"} 
              href={Constant.GITHUB_LINK}
              id="github"
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
