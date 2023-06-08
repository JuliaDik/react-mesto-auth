import {useEffect} from "react";
import useForm from "../hooks/useForm";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const {values, handleChange, reset} = useForm({
    name: "",
    link: ""
  });

  useEffect(() => {
    reset();
  }, [props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace(values.name, values.link);
}

  return (
    <PopupWithForm
      name="card-add"
      title="Новое место"
      buttonText={props.isLoading ? "Сохранение..." : "Создать"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_title"
        type="text"
        id="title-input"
        name="name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={values.name}
        onChange={handleChange}
      />
      <span className="popup__error title-input-error"></span>
      <input
        className="popup__input popup__input_type_link"
        type="url"
        id="link-input"
        name="link"
        placeholder="Ссылка на картинку"
        required
        value={values.link}
        onChange={handleChange}
      />
      <span className="popup__error link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
