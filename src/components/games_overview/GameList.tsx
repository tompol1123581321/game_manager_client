import List from "antd/es/list";
import { GameCard } from "./GameCard";

const data = [
  {
    title: "Title 1",
  },
  {
    title: "Title 2",
  },
  {
    title: "Title 3",
  },
  {
    title: "Title 4",
  },
  {
    title: "Title 5",
  },
  {
    title: "Title 6",
  },
];

export const GameList = () => {
  return (
    <List
      grid={{
        gutter: 10,
        column: 3,
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <GameCard />
        </List.Item>
      )}
    />
  );
};
