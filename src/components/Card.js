import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like-button ${
    isLiked && "card__like-button_active"
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="card">
      {isOwn && (
        <button
          className="card__delete-button"
          type="button"
          aria-label="кнопка-удалить"
          onClick={handleDeleteClick}
        />
      )}
      <img
        className="card__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className="card__info">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like-wrapper">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="кнопка-нравится"
            onClick={handleLikeClick}
          ></button>
          <span className="card__like-counter">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
