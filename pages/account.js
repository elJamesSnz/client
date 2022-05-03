import React, { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";
import BasicLayout from "../layouts/BasicLayout";
import { useRouter } from "next/dist/client/router";
import useAuth from "../hooks/useAuth";
import { getMeApi } from "../api/user";
import { toast } from "react-toastify";
import ChangeNameForm from "../components/Account/ChangeNameForm";
import ChangeEmailForm from "../components/Account/ChangeEmailForm";
import ChangePasswordForm from "../components/Account/ChangePasswordForm/";
import AddressForm from "../components/Account/AddressForm/";
import BasicModal from "../components/Modal/BasicModal";
import ListAddress from "../components/Account/ListAddress";
import Seo from "../components/Seo";

export default function Account() {
  const [user, setUser] = useState(undefined);
  const { auth, logout, setReloadUser } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getMeApi();
      setUser(response || null);
    })();
  }, [auth]);

  const router = useRouter();

  if (user === undefined) return null;

  if (!auth && !user) {
    router.replace("/");
    return null;
  }

  return (
    <BasicLayout className="account">
      <Seo title="Mi cuenta" />;
      <Configuration
        user={user}
        logout={logout}
        setReloadUser={setReloadUser}
      />
      <Addresses />
    </BasicLayout>
  );
}

function Configuration(props) {
  const { user, logout, setReloadUser } = props;
  return (
    <div className="account__configuration">
      <div className="title"> Configuración</div>
      <div className="data">
        <ChangeNameForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser}
        />

        <ChangeEmailForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser}
        />

        <ChangePasswordForm user={user} logout={logout} />
      </div>
    </div>
  );
}

function Addresses() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [formModal, setFormModal] = useState(undefined);
  const [reloadAddreses, setReloadAddreses] = useState(false);

  const openModal = (title, address) => {
    setTitleModal(title);
    setFormModal(
      <AddressForm
        setShowModal={setShowModal}
        setReloadAddreses={setReloadAddreses}
        newAddress={address ? false : true}
        address={address || null}
      />
    );
    setShowModal(true);
  };

  return (
    <div className="account__addresses">
      <div className="title">
        Direcciones
        <Icon name="plus" link onClick={() => openModal("Nueva Dirección")} />
      </div>
      <div className="data">
        <ListAddress
          reloadAddreses={reloadAddreses}
          setReloadAddreses={setReloadAddreses}
          openModal={openModal}
        />
      </div>

      <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
        {formModal}
      </BasicModal>
    </div>
  );
}
