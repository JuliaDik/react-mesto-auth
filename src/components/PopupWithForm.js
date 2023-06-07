function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen && "popup_opened"
      }`}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="кнопка-закрыть"
          onClick={props.onClose}
        ></button>
        <form
          className="popup__form"
          name={props.name}
          onSubmit={props.onSubmit}
          noValidate
        >
          <h3 className={`popup__title popup__title_type_${props.name}`}>{props.title}</h3>
          {props.children}
          <button
            className="popup__submit-button"
            type="submit"
            aria-label="кнопка-сохранить"
          >
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
