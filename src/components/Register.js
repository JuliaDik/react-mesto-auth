import React from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

function Register() {
  return (
    <Form
      name="register"
      title="Регистрация"
      buttonText="Зарегистрироваться"
    >
      <p className="authentication__question">
        Уже зарегистрированы? {""}
        <Link className="authentication__login-link" to="/sign-in">
          Войти
        </Link>
      </p>
    </Form>

  );
}

export default Register;