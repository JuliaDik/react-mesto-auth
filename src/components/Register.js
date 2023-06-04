import { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: ""
  });

  function handleChange(evt) {
    const {name, value} = evt.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegister(formValue.email, formValue.password);
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
          className="authentication__input"
          type="email"
          name="email"
          id="email-input"
          placeholder="Email"
          value={formValue.email}
          onChange={handleChange}
        ></input>
        <input
          className="authentication__input"
          type="password"
          name="password"
          id="password-input"
          placeholder="Пароль"
          value={formValue.password}
          onChange={handleChange}
        ></input>
        <button
          className="authentication__submit-button"
          type="submit"
          aria-label="кнопка-сохранить"
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