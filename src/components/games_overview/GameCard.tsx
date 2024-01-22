import React, { useContext } from "react";
import { Button, Card, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { Game } from "../../models";
import { authorizationContext } from "../../hooks/authorization/AuthProvider";

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
    price = Infinity,
  },
}) => {
  const {
    data: { user },
  } = useContext(authorizationContext);
  const navigate = useNavigate();
  const isPurchased = user?.purchasedGames.includes(_id);

  return (
    <Card
      bordered
      cover={<img style={{ height: 150 }} alt={name} src={imageUrl} />}
      actions={[
        <Button
          type="primary"
          onClick={() =>
            navigate(`/activity/${_id}/${name}/${isPurchased}/${price}`)
          }
          children={"Go to detail!"}
        />,
      ]}
    >
      <Meta
        title={name}
        style={{ paddingBottom: "1rem" }}
        description={
          <>
            {isPurchased ? (
              <Tag color="green">Purchased</Tag>
            ) : (
              <Tag color="yellow-inverse">Not purchased</Tag>
            )}
            <b>Price :{price}</b>
          </>
        }
      />
      <Meta description={description} />
    </Card>
  );
};
