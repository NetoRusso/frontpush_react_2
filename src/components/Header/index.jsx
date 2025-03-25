import logo from "../../assets/tdal_logo.svg"

const Header = () => {
  return (
    <header className="header">
      <div className="menu-desk">
        <img src={logo} alt="logo" />
        <nav className="menu">
          <ul className="menu-list">
            <li className="menu-list-item"><a href="/" >TDL Aula</a></li>
            <li className="menu-list-item"><a href="/tdlpersona" >TDL Persona</a></li>
            <li className="menu-list-item"><a href="/tdlplus" >TDL Plus</a></li>
          </ul>
        </nav>
      </div>
      <div className="menu-mobile">
        
      </div>
    </header >
  )
};

export default Header;
