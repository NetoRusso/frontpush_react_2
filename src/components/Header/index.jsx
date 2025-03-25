import { useState } from "react";
import logo from "../../assets/tdal_logo.svg"

const Header = () => {

  const [modal, setModal] = useState(false);

  return (
    <header className="header">
      <div className="menu-desk">
        <img src={logo} alt="logo" />
        <nav className="menu">
          <ul className="menu-list">
            <li className="menu-list-item"><a href="/" >TDL Aula</a></li>
            <li className="menu-list-item"><a href="/tdlpersona" >TDL Persona</a></li>
            <li className="menu-list-item"><a href="/tdlplus" >TDL Plus</a></li>
            <li className="menu-list-item"><a href="/contextapi" >Context API</a></li>
          </ul>
        </nav>
      </div>


      <div className="mobile">
        <div className={`${modal ? "modal" : ""}`}></div>
        <img src={logo} className="logo-btn" alt="logo" onClick={() => setModal(true)} />

        <nav className={`${modal ? "menu" : "menu-close"}`}>
          <div className="reference">
            <span
              onClick={() => setModal(false)}
            >&times;</span>
            <ul className="menu-list">
              <li className="menu-list-item"><a href="/" >TDL Aula</a></li>
              <li className="menu-list-item"><a href="/tdlpersona" >TDL Persona</a></li>
              <li className="menu-list-item"><a href="/tdlplus" >TDL Plus</a></li>
              <li className="menu-list-item"><a href="/contextapi" >Context API</a></li>
            </ul>
          </div>
        </nav>
      </div>
    </header >
  )
};

export default Header;
