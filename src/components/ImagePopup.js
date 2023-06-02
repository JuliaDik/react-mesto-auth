function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image ${props.card && "popup_opened"}`}>
      <figure className="popup__image-container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="кнопка-закрыть"
          onClick={props.onClose}
        ></button>
        <img
          className="popup__image"
          src={props.card ? props.card.link : "#"}
          alt={props.card ? props.card.name : "#"}
        />
        <figcaption className="popup__caption">
          {props.card ? props.card.name : ""}
        </figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
