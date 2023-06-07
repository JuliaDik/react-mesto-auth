import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import logo from "../images/logo.svg";
import MobileMenu from "./MobileMenu";
import menuButton from "../images/menu-icon.svg";
import closeButton from "../images/close-button.svg";

function Header(props) {
  return (
    <>
      <MobileMenu
        currentUserEmail={props.currentUserEmail}
        loggedIn={props.isLoggedIn}
        onLogout={props.onLogout}
        isOpen={props.isOpen}
      />
      <header className="header">
        <img className="header__logo" src={logo} alt="Логотип Mesto" />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <p className="header__email">{props.currentUserEmail}</p>
                <Link
                  className="header__link header__link_type_exit"
                  onClick={props.onLogout}
                >
                  Выйти
                </Link>
              </>
            }
          />
          <Route
            exact
            path="/sign-in"
            element={
              <Link className="header__link" to="/sign-up">
                Регистрация
              </Link>
            }
          />
          <Route
            exact
            path="/sign-up"
            element={
              <Link className="header__link" to="/sign-in">
                Войти
              </Link>
            }
          />
        </Routes>
        <div
          className="header__menu-button"
          style={{
            backgroundImage: props.isOpen ? `url(${closeButton})` : `url(${menuButton})`,
            display: !props.loggedIn ? "none" : "block",
          }}
          onClick={props.onMenuClick}
        ></div>
      </header>
    </>
  );
}

export default Header;