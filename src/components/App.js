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
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
    }
  }, [loggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.data.email);
            // перенаправляем в профиль
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, []);

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
      });
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
      });
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

  function handleAddPlaceSubmit({ name, link }) {
    api
      .postCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        if (res) {
          // перенаправляем на авторизацию (вход в систему)
          navigate("/sign-in", { replace: true });
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleAuthorize(email, password) {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          localStorage.setItem("jwt", res.token);
          // перенаправляем в профиль
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    navigate("/sign-in", { replace: true });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          userEmail={userEmail}
          onSignOut={handleSignOut}
        />
        <Routes>
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route
            path="/sign-in"
            element={<Login onAuthorize={handleAuthorize} />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
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
        </Routes>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
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
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
