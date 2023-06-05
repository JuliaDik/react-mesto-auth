import { useState } from "react";

function Login(props) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onLogin(formValue.email, formValue.password);
  }

  return (
    <div className="authentication">
      <form
        className="authentication__form"
        name="login"
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 className="authentication__title">Вход</h2>
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
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
