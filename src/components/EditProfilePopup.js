import { useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useFormAndValidation from "../hooks/useFormAndValidation";
import Input from "./Input";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, errors, isValid, handleChange, setValues } = useFormAndValidation({
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
  }, [currentUser, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isValid) {
      onUpdateUser(values.name, values.about);
    }
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="profile-edit"
      title="Редактировать профиль"
      isValid={isValid}
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <Input
          type="text"
          name="name"
          value={values.name || ""}
          handleChange={handleChange}
          minLength="2"
          maxLength="40"
          placeholder="Имя"
          location="popup"
          errorMessage={errors.name}
        />
        <Input
          type="text"
          name="about"
          value={values.about || ""}
          handleChange={handleChange}
          minLength="2"
          maxLength="200"
          placeholder="О себе"
          location="popup"
          errorMessage={errors.name}
        />
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
