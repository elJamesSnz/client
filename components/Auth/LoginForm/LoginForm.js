import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { loginApi, resetPasswordApi } from "../../../api/user";
import useAuth from "../../../hooks/useAuth";
import { useRouter } from "next/router";

export default function LoginForm(props) {
  const { showRegisterForm, onCloseModal } = props;
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const formik = useFormik({
    initialValues: initualValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await loginApi(formData);
      if (response?.jwt) {
        toast.success("Inicio de sesión exitoso");
        login(response.jwt);
        onCloseModal(true);
      } else {
        toast.error("El email o la contraseña son incorrectos");
      }

      setLoading(false);
    },
  });

  const resetPassword = () => {
    formik.setErrors({});
    const validateEmail = Yup.string().email().required();

    if (!validateEmail.isValidSync(formik.values.identifier)) {
      formik.setErrors({
        identifier: true,
      });
    } else {
      resetPasswordApi(formik.values.identifier);
      router.replace("/account");
      toast.info("Correo para cambiar contraseña enviado");
    }
  };

  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="identifier"
        type="text"
        placeholder="E-mail"
        onChange={formik.handleChange}
        error={formik.errors.identifier}
      ></Form.Input>
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={formik.handleChange}
        error={formik.errors.password}
      ></Form.Input>

      <div className="actions">
        <Button type="button" basic onClick={showRegisterForm}>
          Registrarse
        </Button>
        <div>
          <Button className="submit" type="submit" loading={loading}>
            Entrar
          </Button>
          <Button type="button" className="btnpass" onClick={resetPassword}>
            ¿Has olvidado la contraseña?
          </Button>
        </div>
      </div>
    </Form>
  );
}

function initualValues() {
  return {
    identifier: "",
    password: "",
  };
}

function validationSchema() {
  return {
    identifier: Yup.string().email(true).required(true),
    password: Yup.string().required(true),
  };
}
