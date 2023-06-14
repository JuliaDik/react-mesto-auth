import AuthForm from "./AuthForm";

function Login(props) {
  return (
    <div className="authentication">
      <AuthForm
        name="login"
        title="Вход"
        buttonText="Войти"
        isOpen={props.props}
        onAuthClick={props.onLogin}
      />
    </div>
  );
}

export default Login;
