import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Auth(props) {
  const { onCloseModal, setTitleModel } = props;
  const [showLogin, setShowLogin] = useState(true);
  const showLoginForm = () => {
    setTitleModel("Iniciar sesión");
    setShowLogin(true);
  };
  const showRegisterForm = () => {
    setTitleModel("Registrarse");
    setShowLogin(false);
  };

  return showLogin ? (
    <LoginForm
      showRegisterForm={showRegisterForm}
      onCloseModal={onCloseModal}
    />
  ) : (
    <RegisterForm showLoginForm={showLoginForm} />
  );
}
