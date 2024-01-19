import List from "antd/es/list";
import { GameCard } from "./GameCard";
import { useCallback, useContext, useEffect, useState } from "react";
import { Game } from "../../models";
import { getGameList } from "../../api";
import { authorizationContext } from "../../hooks/authorization/AuthProvider";

export const GameList = () => {
  const {
    data: { jwt, user },
  } = useContext(authorizationContext);

  console.log(jwt, user);

  if (!user || !jwt) {
    return;
  }

  const [games, setGames] = useState<Array<Game>>([]);

  const loadGames = useCallback(async () => {
    console.log("gotten here");
    const gameList = await getGameList(jwt);
    setGames(gameList);
  }, []);

  useEffect(() => {
    loadGames();
  }, [loadGames]);

  useEffect(() => {
    console.log(games);
  }, [games]);

  if (!games.length) {
    return null;
  }

  return (
    <List
      grid={{
        gutter: 10,
        column: 3,
      }}
      dataSource={games}
      renderItem={(item) => (
        <List.Item>
          <GameCard gameInfo={item} />
        </List.Item>
      )}
    />
  );
};
