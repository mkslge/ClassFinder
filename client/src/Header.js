import './Header.css'




function Header() {
  

  return (
    <div className="Header">
      <nav class="menu">
        <ul>
            <li><a class="active" href="/" id="home">HOME</a></li>

            <li><a href="" id="projects">COURSES</a></li>

            <li><a href="https://github.com/mkslge/ClassFinder" id="experience">GITHUB</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
