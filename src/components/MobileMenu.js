import { Routes, Route, Link } from "react-router-dom";

function MobileMenu(props) {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <div
            className={`menu-mobile ${props.isOpen && "menu-mobile_opened"}`}
          >
            <p className="menu-mobile__email">{props.currentUserEmail}</p>
            <Link
              className="menu-mobile__link"
              onClick={props.onLogout}
            >
              Выйти
            </Link>
          </div>
        }
      />
    </Routes>
  )
}

export default MobileMenu;