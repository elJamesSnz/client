import React, { useState, useEffect } from "react";
import { useRouter as routerthis } from "next/router";
import BasicLayout from "../../layouts/BasicLayout";
import { useRouter } from "next/dist/client/router";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import { getMeApi } from "../../api/user";
import { toast } from "react-toastify";
import ResetPassswordForm from "../../components/Account/ResetPassswordForm/";
import { removeToken } from "../../api/token";
import Seo from "../../components/Seo";

export default function Token() {
  const [user, setUser] = useState(undefined);
  const { auth, logout, setReloadUser } = useAuth();
  const { removeAllProductsCart, getProductsCart } = useCart();
  const router = routerthis();
  const { token } = router.query;
  const cart = getProductsCart();

  if (auth) {
    removeToken();
  }

  if (cart) {
    removeAllProductsCart();
  }

  return (
    <BasicLayout className="account">
      <Seo title="Cambio de contraseña" />;
      <Configuration user={user} logout={logout} token={token} />
    </BasicLayout>
  );
}

function Configuration(props) {
  const { user, logout, token } = props;
  return (
    <div className="account__configuration">
      <div className="title"> Cambio de contraseña</div>
      <div className="data">
        <ResetPassswordForm user={user} logout={logout} token={token} />
      </div>
    </div>
  );
}
