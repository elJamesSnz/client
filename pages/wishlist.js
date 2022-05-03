import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size, forEach } from "lodash";
import BasicLayout from "../layouts/BasicLayout";
import { getFavoriteApi } from "../api/favorite";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import ListGames from "../components/ListGames";
import Seo from "../components/Seo";

export default function Wishlist() {
  const [games, setGames] = useState(null);
  const { auth, logout } = useAuth();
  console.log(useCart());

  useEffect(() => {
    (async () => {
      const response = await getFavoriteApi(auth.idUser, logout);
      if (size(response) > 0) {
        const gamesList = [];
        forEach(response, (data) => {
          gamesList.push(data.game);
        });
        setGames(gamesList);
      } else {
        setGames([]);
      }
    })();
  }, []);

  return (
    <BasicLayout className="wishlist">
      <Seo title="Lista de deseos" />;
      <div className="wishlist__block">
        <div className="title">Lista de deseos</div>
        <div className="data">
          {!games && <Loader active> Cargando juegos</Loader>}
          {games && size(games) === 0 && (
            <div className="data_not-found">
              <h3>No hay juegos en favoritos</h3>
            </div>
          )}
          {size(games) > 0 && <ListGames games={games} />}
        </div>
      </div>
    </BasicLayout>
  );
}
