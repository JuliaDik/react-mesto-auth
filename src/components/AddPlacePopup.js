import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      name="card-add"
      title="Новое место"
      buttonText="Создать"
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
        value={name}
        onChange={handleNameChange}
      />
      <span className="popup__error title-input-error"></span>
      <input
        className="popup__input popup__input_type_link"
        type="url"
        id="link-input"
        name="link"
        placeholder="Ссылка на картинку"
        required
        value={link}
        onChange={handleLinkChange}
      />
      <span className="popup__error link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
