import React from "react";
import { Button, Card, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { Game } from "../../models";

const { Meta } = Card;

type Props = {
  gameInfo: Game;
};

export const GameCard: React.FC<Props> = ({
  gameInfo: {
    imageUrl = "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    description = "This is the description",
    _id = "0",
    name = "defaultGame",
  },
}) => {
  const navigate = useNavigate();
  const isInstalled = true;

  return (
    <Card
      bordered
      cover={<img style={{ height: 150 }} alt={name} src={imageUrl} />}
      actions={[
        <Button
          type="primary"
          onClick={() => navigate(`/activity/${_id}`)}
          children={"Go to detail!"}
        />,
      ]}
    >
      <Meta
        title={name}
        style={{ paddingBottom: "1rem" }}
        description={
          isInstalled ? (
            <Tag color="green">Installed</Tag>
          ) : (
            <Tag color="yellow-inverse">Not installed</Tag>
          )
        }
      />
      <Meta description={description} />
    </Card>
  );
};
