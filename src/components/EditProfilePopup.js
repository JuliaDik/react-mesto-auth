import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useForm from "../hooks/useForm";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const {values, handleChange, setValues} = useForm({
    name: "",
    about: ""
  });

  React.useEffect(() => {
    setValues({
      name: currentUser.name,
      about: currentUser.about,
    });
  }, [currentUser, props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser(values.name, values.about);
  }

  return (
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      buttonText={props.isLoading ? "Сохранение..." : "Сохранить"}
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
        value={values.name || ""}
        onChange={handleChange}
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
        value={values.about || ""}
        onChange={handleChange}
      />
      <span className="popup__error about-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
