import { useEffect } from "react";

function Popup(props) {
  // закрытие Escape
  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        props.onClose();
      }
    }
    // обработчик висит только при открытом попапе
    if (props.isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => document.removeEventListener("keydown", closeByEscape);
    }
  }, [props.isOpen, props.onClose]);

  // закрытие overlay
  const handleOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      props.onClose();
    }
  };

  return (
    <div
      className={`popup ${props.isOpen && "popup_opened"} popup_type_${props.name}`}
      onClick={handleOverlay}
    >
      <div className="popup__container">
        {props.children}
        <button
          className="popup__close-button"
          type="button"
          aria-label="кнопка-закрыть"
          onClick={props.onClose}
        />
      </div>
    </div>
  );
}

export default Popup;
