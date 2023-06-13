import { useEffect } from "react";
import { Link } from "react-router-dom";
import useFormAndValidation from "../hooks/useFormAndValidation";

function Register(props) {
  const { values, errors, isValid, handleChange, resetForm } =
  useFormAndValidation({
    email: "",
    password: ""
  });

  useEffect(() => {
    if (!props.isOpen) {
      resetForm();
    }
  }, [props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isValid) {
      props.onRegister(values.email, values.password);
    }
  }

  return (
    <div className="authentication">
      <form
        className="authentication__form"
        name="register"
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 className="authentication__title">Регистрация</h2>
        <input
          className={`authentication__input ${errors.email && "popup__input_type_error"}`}
          type="email"
          name="email"
          id="email-input"
          placeholder="Email"
          value={values.email || ""}
          onChange={handleChange}
        />
        <span
          className={`popup__error ${errors.email && "popup__error_visible"}`}
        >
          {errors.email}
        </span>
        <input
          className={`authentication__input ${errors.password && "popup__input_type_error"}`}
          type="password"
          name="password"
          id="password-input"
          placeholder="Пароль"
          value={values.password || ""}
          onChange={handleChange}
        />
        <span
          className={`popup__error ${errors.password && "popup__error_visible"}`}
        >
          {errors.password}
        </span>
        <button
          className={`authentication__submit-button ${
            !props.isValid && "popup__submit-button_disabled"
          }`}
          type="submit"
          aria-label="кнопка-сохранить"
          disabled={!props.isValid}
        >
          Зарегистрироваться
        </button>
        <p className="authentication__question">
          Уже зарегистрированы? {""}
          <Link className="authentication__login-link" to="/sign-in">
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;