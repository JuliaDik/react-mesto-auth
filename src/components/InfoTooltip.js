import successIcon from "../images/succes-icon.svg";
import failIcon from "../images/fail-icon.svg";

function InfoTooltip(props) {
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
      </div>
    </div>
  );
}

export default InfoTooltip;
