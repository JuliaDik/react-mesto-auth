import successIcon from "../images/succes-icon.svg";
// import failIcon from '../images/fail-icon.svg';

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
        <img className="popup__info-image" src={successIcon} alt="" />
        <p className="popup__message">Вы успешно зарегистрировались!</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
