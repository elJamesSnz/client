import React, { useState, useEffect } from "react";
import { size, map } from "lodash";
import { Grid, Button } from "semantic-ui-react";
import { getAddressesApi, deleteAddressApi } from "../../../api/address";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";

export default function ListAddress(props) {
  const { reloadAddreses, setReloadAddreses, openModal } = props;
  const [addresses, setAddresses] = useState(null);
  const { auth, logout } = useAuth();
  useEffect(() => {
    (async () => {
      const response = await getAddressesApi(auth.idUser, auth.logout);
      setAddresses(response || []);
      setReloadAddreses(false);
    })();
  }, [reloadAddreses]);

  if (!addresses) {
    return null;
  }

  return (
    <div className="list-address">
      {size(addresses) === 0 ? (
        <h3>No hay ninguna dirección guardada</h3>
      ) : (
        <Grid>
          {map(addresses, (address) => (
            <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
              <Address
                address={address}
                logout={logout}
                setReloadAddreses={setReloadAddreses}
                openModal={openModal}
              />
            </Grid.Column>
          ))}
        </Grid>
      )}
    </div>
  );
}

function Address(props) {
  const { address, logout, setReloadAddreses, openModal } = props;
  const [loadingDelete, setLoadingDelete] = useState(false);
  const deleteAddress = async () => {
    setLoadingDelete(true);
    const response = await deleteAddressApi(address._id, logout);
    if (response) {
      toast.info("Se ha eliminado la dirección");
      setReloadAddreses(true);
    } else toast.error("No fue posible eliminar la dirección");
    setLoadingDelete(false);
  };

  return (
    <div className="address">
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.street}</p>
      <p>
        {address.state}, {address.city}, {address.postalCode}
      </p>
      <p>{address.phone}</p>

      <div className="actions">
        <Button
          primary
          onClick={() => openModal(`Editar: ${address.title}`, address)}
        >
          Editar
        </Button>
        <Button onClick={deleteAddress} loading={loadingDelete}>
          Eliminar
        </Button>
      </div>
    </div>
  );
}
