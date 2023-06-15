import Popup from "./Popup";

function ImagePopup(props) {
  return (
    <Popup
      name={props.name}
      isOpen={props.card}
      onClose={props.onClose}
    >
      <img
        className="popup__image"
        src={props.card ? props.card.link : "#"}
        alt={props.card ? props.card.name : "#"}
      />
      <p className="popup__caption">
        {props.card ? props.card.name : ""}
      </p>
    </Popup>
  );
}

export default ImagePopup;
