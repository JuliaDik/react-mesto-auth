import { useEffect } from "react";
import useFormAndValidation from "../hooks/useFormAndValidation";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const { values, errors, isValid, handleChange, resetForm } =
    useFormAndValidation({
      name: "",
      link: "",
    });

  useEffect(() => {
    if (!props.isOpen) {
      resetForm();
    }
  }, [props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isValid) {
      props.onAddPlace(values.name, values.link);
    }
  }

  return (
    <PopupWithForm
      name="card-add"
      title="Новое место"
      buttonText={props.isLoading ? "Сохранение..." : "Создать"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        className={`popup__input ${errors.name && "popup__input_type_error"}`}
        type="text"
        id="title-input"
        name="name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={values.name || ""}
        onChange={handleChange}
      />
      <span className={`popup__error ${errors.name && "popup__error_visible"}`}>
        {errors.name}
      </span>
      <input
        className={`popup__input ${errors.link && "popup__input_type_error"}`}
        type="url"
        id="link-input"
        name="link"
        placeholder="Ссылка на картинку"
        required
        value={values.link || ""}
        onChange={handleChange}
      />
      <span className={`popup__error ${errors.link && "popup__error_visible"}`}>
        {errors.link}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
