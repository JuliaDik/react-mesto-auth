import { Routes, Route, Link } from "react-router-dom";
import logo from "../images/logo.svg";

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Mesto" />
      <Routes>
        <Route
          path="/sign-in"
          element={
            <Link className="header__link" to="/sign-up">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link className="header__link" to="/sign-in">
              Войти
            </Link>
          }
        />
        <Route
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
      </Routes>
    </header>
  );
}

export default Header;