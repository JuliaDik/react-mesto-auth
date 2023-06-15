import Popup from "./Popup";
import successIcon from "../images/succes-icon.svg";
import failIcon from "../images/fail-icon.svg";

function InfoTooltip(props) {
  return (
    <Popup
      name={props.name}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <img
        className="popup__info-image"
        src={props.isSucceeded ? successIcon : failIcon}
        alt={props.isSucceeded ? "Успешно" : "Ошибка"}
      />
      <p className="popup__message">
        {props.isSucceeded
          ? "Вы успешно зарегистрировались!"
          : "Что-то пошло не так! Попробуйте еще раз."}
      </p>
    </Popup>
  );
}

export default InfoTooltip;
