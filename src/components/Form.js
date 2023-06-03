import React from "react";

function Form(props) {
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  return (
    <div className="authentication">
      <form
        className="authentication__form"
        name={props.name}
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 className="authentication__title">{props.title}</h2>
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
          {props.buttonText}
        </button>
        {props.children}
      </form>
    </div>
  );
}

export default Form;