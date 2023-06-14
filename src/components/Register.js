import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

function Register(props) {
  return (
    <div className="authentication">
      <AuthForm
        name="register"
        title="Регистрация"
        buttonText="Зарегистрироваться"
        isOpen={props.props}
        onAuthClick={props.onRegister}
      >
      <p className="authentication__question">
        Уже зарегистрированы? {""}
        <Link className="authentication__login-link" to="/sign-in">
          Войти
        </Link>
      </p>
      </AuthForm>
    </div>
  );
}

export default Register;