import PopupWithForm from "./PopupWithForm";
import useFormAndValidation from "../hooks/useFormAndValidation";

function PopupWithConfirmation(props) {
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onConfirm(props.card);
  }

  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      buttonText={props.isLoading ? "Удаление..." : "Да"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={true}
    >
    </PopupWithForm>
  );
}

export default PopupWithConfirmation;