import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import useAuth from "../../../hooks/useAuth";
import * as Yup from "yup";
import { createAddressApi, updateAddressApi } from "../../../api/address";
import { toast } from "react-toastify";

export default function AddressForm(props) {
  const { setShowModal, setReloadAddreses, newAddress, address } = props;
  const [loading, setLoading] = useState(false);
  const { auth, logout } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(address),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      //createAddress(formData);
      newAddress ? createAddress(formData) : updateAddress(formData);
    },
  });

  const createAddress = async (formData) => {
    setLoading(true);
    const formDataTemp = {
      ...formData,
      user: auth.idUser,
    };
    const response = await createAddressApi(formDataTemp, logout);
    if (!response) {
      toast.warning("Error al crear la dirección");
      setLoading(false);
    } else {
      formik.resetForm();
      toast.success("Dirección guardada");
      setReloadAddreses(true);
      setLoading(false);
      setShowModal(false);
    }
  };

  const updateAddress = async (formData) => {
    setLoading(true);
    const formDataTemp = {
      ...formData,
      user: auth.idUser,
    };
    const response = await updateAddressApi(address._id, formDataTemp, logout);
    if (!response) {
      toast.warning("Error al crear la dirección");
      setLoading(false);
    } else {
      formik.resetForm();
      toast.success("Dirección guardada");
      setReloadAddreses(true);
      setLoading(false);
      setShowModal(false);
    }
  };

  return (
    <div>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Input
          name="title"
          type="next"
          label="Titulo de la dirección"
          placeholder="Titulo de dirección"
          onChange={formik.handleChange}
          error={formik.errors.title}
          value={formik.values.title}
        />
        <Form.Group widths="equal">
          <Form.Input
            name="name"
            type="text"
            label="Nombre y apellidos"
            placeholder="Nombre y apellidos"
            onChange={formik.handleChange}
            error={formik.errors.name}
            value={formik.values.name}
          />
          <Form.Input
            name="street"
            type="text"
            label="Calle"
            placeholder="Calle"
            onChange={formik.handleChange}
            error={formik.errors.street}
            value={formik.values.street}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            name="city"
            type="text"
            label="Ciudad"
            placeholder="Ciudad"
            onChange={formik.handleChange}
            error={formik.errors.city}
            value={formik.values.city}
          />
          <Form.Input
            name="state"
            type="text"
            label="Estado"
            placeholder="Estado"
            onChange={formik.handleChange}
            error={formik.errors.state}
            value={formik.values.state}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            name="postalCode"
            type="text"
            label="Código Postal"
            placeholder="Código Postal"
            onChange={formik.handleChange}
            error={formik.errors.postalCode}
            value={formik.values.postalCode}
          />
          <Form.Input
            name="phone"
            type="text"
            label="Número de Teléfono"
            placeholder="Número de Teléfono"
            onChange={formik.handleChange}
            error={formik.errors.phone}
            value={formik.values.phone}
          />
        </Form.Group>
        <div className="actions">
          <Button className="submit" type="submit" loading={loading}>
            {newAddress ? "Crear dirección" : "Actualizar dirección"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

function initialValues(address) {
  return {
    title: address?.title || "",
    name: address?.name || "",
    street: address?.street || "",
    state: address?.state || "",
    city: address?.city || "",
    postalCode: address?.postalCode || "",
    phone: address?.phone || "",
  };
}

function validationSchema() {
  return {
    title: Yup.string().required(true),
    name: Yup.string().required(true),
    street: Yup.string().required(true),
    state: Yup.string().required(true),
    city: Yup.string().required(true),
    postalCode: Yup.string().required(true),
    phone: Yup.string().required(true),
  };
}
