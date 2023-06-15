import Popup from "./Popup";

function PopupWithForm(props) {
  return (
    <Popup
      name={props.name}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <form
        className="popup__form"
        name={props.name}
        onSubmit={props.onSubmit}
        noValidate
      >
        <h3 className={`popup__title popup__title_type_${props.name}`}>
          {props.title}
        </h3>
        {props.children}
        <button
          className={`popup__submit-button ${
            !props.isValid && "popup__submit-button_disabled"
          }`}
          type="submit"
          aria-label="кнопка-сохранить"
          disabled={!props.isValid}
        >
          {props.buttonText}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
