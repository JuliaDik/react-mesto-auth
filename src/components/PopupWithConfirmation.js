import PopupWithForm from "./PopupWithForm";

function PopupWithConfirmation(props) {

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onConfirm(props.card);
  }

  return (
    <PopupWithForm
      name="card-delete"
      title="Вы уверены?"
      buttonText={props.isLoading ? "Удаление..." : "Да"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
    </PopupWithForm>
  );
}

export default PopupWithConfirmation;