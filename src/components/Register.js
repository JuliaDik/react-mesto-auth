import { Link } from "react-router-dom";
import useForm from "../hooks/useForm";

function Register(props) {
  const {values, handleChange, reset} = useForm({
    email: "",
    password: ""
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegister(values.email, values.password);
    reset();
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
          value={values.email}
          onChange={handleChange}
        ></input>
        <input
          className="authentication__input"
          type="password"
          name="password"
          id="password-input"
          placeholder="Пароль"
          value={values.password}
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