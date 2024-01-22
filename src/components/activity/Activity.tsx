import { Row, Col, Statistic, Button, Space, Progress, Layout } from "antd";
import Descriptions, { DescriptionsProps } from "antd/es/descriptions";
import { Header, Content, Footer } from "antd/es/layout/layout";
import { existsSync } from "fs";
import Title from "antd/es/typography/Title";
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

const twoColors = { "0%": "#108ee9", "100%": "#87d068" };

type ActivitySTate = "isInstalled" | "isPurchased" | "notPurchased";

export const Activity = () => {
  const { gameId, gameName, isPurchased, price } = useParams();
  const [isInstalledOnSystem, setIsInstalledOnSystem] = useState(false);

  const checkIfTheGameIsInstalled = () => {
    const path = `/home/tomas/game_manager_games/${gameName}`;
    setIsInstalledOnSystem(existsSync(path));
  };

  useEffect(() => {
    checkIfTheGameIsInstalled();
  }, []);

  const isInstalled = useMemo(
    () => isPurchased === "true" && isInstalledOnSystem,
    [isPurchased, isInstalledOnSystem]
  );
  const [acitivityState, setActivityState] = useState<ActivitySTate>(
    isInstalled ? "isInstalled" : isPurchased ? "isPurchased" : "notPurchased"
  );

  const onButtonClick = useCallback(async () => {
    switch (acitivityState) {
      case "isInstalled":
        break;
      case "isPurchased":
        break;
      case "notPurchased":
      default:
        break;
    }
  }, [acitivityState]);

  return (
    <Row gutter={24}>
      <Col span={12}>
        <Space size={"large"} direction="vertical">
          <Statistic title="Name: " value={gameName} />
          <Statistic title="Price: " value={price} />

          <Button
            onClick={onButtonClick}
            disabled={false}
            shape="default"
            type="primary"
            size="large"
          >
            ActionB
          </Button>
        </Space>
      </Col>
      <Col span={12}>
        <Space size={"large"} direction="vertical">
          <Statistic title="Purchased: " value={isPurchased} precision={2} />

          <Statistic title="Installed: " value={isPurchased} precision={2} />
        </Space>
      </Col>
      <Title style={{ marginTop: "6rem" }} level={2}>
        State: (Installing)
      </Title>

      <Progress
        strokeWidth={30}
        showInfo
        size={"small"}
        strokeColor={twoColors}
        percent={50}
      />
    </Row>
  );
};
