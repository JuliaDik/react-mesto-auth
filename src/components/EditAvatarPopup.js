import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useFormAndValidation from "../hooks/useFormAndValidation";

function EditAvatarPopup(props) {
  const { values, errors, isValid, handleChange, resetForm } =
    useFormAndValidation({
      avatar: ""
    });

  useEffect(() => {
    if (!props.isOpen) {
      resetForm();
    }
  }, [props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isValid) {
      props.onUpdateAvatar(values.avatar);
    }
  }

  return (
    <PopupWithForm
      name="avatar-edit"
      title="Обновить аватар"
      buttonText={props.isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        className={`popup__input ${errors.avatar && "popup__input_type_error"}`}
        type="url"
        id="avatar-input"
        name="avatar"
        placeholder="Ссылка на картинку"
        required
        value={values.avatar || ""}
        onChange={handleChange}
      />
      <span
        className={`popup__error ${errors.avatar && "popup__error_visible"}`}
      >
        {errors.avatar}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
