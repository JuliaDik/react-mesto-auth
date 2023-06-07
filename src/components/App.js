import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import api from "../utils/Api";
import auth from "../utils/Auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  // аутентификация
  const [isSucceeded, setIsSucceeded] = useState(false);
  // авторизация
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // попапы
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  // пользователь
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  // карточки
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  // меню (мобильная версия)
  const [isMenuMobileOpen, setIsMenuMobileOpen] = useState(false);
  // загрузка
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getCards()])
        .then(([userData, cards]) => {
          setCurrentUser(userData);
          setCards(cards);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            // при повторном визите на сайт
            // пользователь не должен вновь авторизовываться
            setIsLoggedIn(true);
            setCurrentUserEmail(res.data.email);
            // сразу перенаправляется в пользовательский профиль
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, []);

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        if (res) {
          setIsInfoTooltipOpen(true);
          setIsSucceeded(true);
          // перенаправляем на авторизацию (вход в систему)
          navigate("/sign-in", { replace: true });
        }
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setIsSucceeded(false);
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleLogin(email, password) {
    auth
      .login(email, password)
      .then((res) => {
        if (res) {
          // сохраняем токен
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          // перенаправляем в пользовательский профиль
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setIsSucceeded(false);
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleLogout() {
    // удаляем токен
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    // перенаправляем на авторизацию (вход в систему)
    navigate("/sign-in", { replace: true });
    handleMenuMobileOpen();
  }

  function handleMenuMobileOpen() {
    setIsMenuMobileOpen(!isMenuMobileOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser({ name, about }) {
    api
      .patchUserInfo({ name, about })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
    setIsLoading(true);
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .patchAvatar({ avatar })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
    setIsLoading(true);
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .postCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
    setIsLoading(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .toggleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          currentUserEmail={currentUserEmail}
          onLogout={handleLogout}
          loggedIn={isLoggedIn}
          isOpen={isMenuMobileOpen}
          onMenuClick={handleMenuMobileOpen}
        />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <>
                  <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    cards={cards}
                  />
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route
            exact
            path="/sign-in"
            element={<Login onLogin={handleLogin} />}
          />
        </Routes>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <PopupWithForm
          name="card-delete"
          title="Вы уверены?"
          buttonText="Да"
          onClose={closeAllPopups}
        />
        <ImagePopup 
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          name="info"
          isSucceeded={isSucceeded}
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
