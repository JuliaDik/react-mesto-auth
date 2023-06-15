import { useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useFormAndValidation from "../hooks/useFormAndValidation";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);

  const { values, errors, isValid, handleChange, setValues } =
    useFormAndValidation({
      name: "",
      about: "",
    });

  useEffect(() => {
    if (currentUser.name && currentUser.about) {
      setValues({
        name: currentUser.name,
        about: currentUser.about,
      });
    }
  }, [currentUser, props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isValid) {
      props.onUpdateUser(values.name, values.about);
    }
  }

  return (
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      buttonText={props.isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <div className="popup__input-container">
        <input
          className={`popup__input ${errors.name && "popup__input_type_error"}`}
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
        <span
          className={`popup__error ${errors.name && "popup__error_visible"}`}
        >
          {errors.name}
        </span>
        <input
          className={`popup__input ${
            errors.about && "popup__input_type_error"
          }`}
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
        <span
          className={`popup__error ${errors.about && "popup__error_visible"}`}
        >
          {errors.about}
        </span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
