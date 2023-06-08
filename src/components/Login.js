import useForm from "../hooks/useForm";

function Login(props) {
  const {values, handleChange, reset} = useForm({
    email: "",
    password: ""
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onLogin(values.email, values.password);
    reset();
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
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
