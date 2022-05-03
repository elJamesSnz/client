import React from "react";
import { Tab } from "semantic-ui-react";
import InfoGame from "../InfoGame";

export default function TabsGame(props) {
  const { game } = props;

  return (
    <div className="tabs-game">
      <InfoGame game={game} />
    </div>
  );
}
