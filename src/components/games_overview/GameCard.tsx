import React from "react";
import { Button, Card, Space, Tag } from "antd";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

type Props = {
  gameName?: string;
  gameId?: string;
  gameImageUrl?: string;
  gameDescribtion?: string;
  isInstalled?: boolean;
};

export const GameCard: React.FC<Props> = ({
  gameImageUrl = "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
  gameDescribtion = "This is the description",
  gameId = 0,
  gameName = "defaultGame",
  isInstalled,
}) => {
  const navigate = useNavigate();

  return (
    <Card
      style={{ width: 300 }}
      cover={<img alt={gameName} src={gameImageUrl} />}
      actions={[
        <Button
          type="primary"
          onClick={() => navigate(`/activity/${gameId}`)}
          children={"Go to detail!"}
        />,
      ]}
    >
      <Meta
        title={gameName}
        style={{ paddingBottom: "1rem" }}
        description={
          isInstalled ? (
            <Tag color="green">Installed</Tag>
          ) : (
            <Tag color="yellow-inverse">Not installed</Tag>
          )
        }
      />
      <Meta description={gameDescribtion} />
    </Card>
  );
};
