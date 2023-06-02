import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_name"
        type="text"
        id="name-input"
        name="name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
        value={name || ""}
        onChange={handleNameChange}
      />
      <span className="popup__error name-input-error"></span>
      <input
        className="popup__input popup__input_type_about"
        type="text"
        id="about-input"
        name="about"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
        value={description || ""}
        onChange={handleDescriptionChange}
      />
      <span className="popup__error about-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
