import {useEffect} from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

function EditAvatarPopup(props) {
  const {values, handleChange, reset} = useForm({
    avatar: ""
  });

  useEffect(() => {
    reset();
  }, [props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar(values.avatar);
  }

  return (
    <PopupWithForm
      name="avatar-edit"
      title="Обновить аватар"
      buttonText={props.isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_link"
        type="url"
        id="avatar-input"
        name="avatar"
        placeholder="Ссылка на картинку"
        required
        value={values.avatar}
        onChange={handleChange}
      />
      <span className="popup__error avatar-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
