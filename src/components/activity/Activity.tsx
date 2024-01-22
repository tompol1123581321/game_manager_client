import { Row, Col, Statistic, Button, Space, Progress, Layout } from "antd";
import Descriptions, { DescriptionsProps } from "antd/es/descriptions";
import { Header, Content, Footer } from "antd/es/layout/layout";
import { existsSync } from "fs";
import { invoke } from "@tauri-apps/api/tauri";
import Title from "antd/es/typography/Title";
import { AxiosResponse } from "axios";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { authorizationContext } from "../../hooks/authorization/AuthProvider";
import { purchaseGame } from "../../api";

const twoColors = { "0%": "#108ee9", "100%": "#87d068" };

type ActivitySTate = "isInstalled" | "isPurchased" | "notPurchased";

export const Activity = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { data, updateUserAuthorizationData } =
    useContext(authorizationContext);
  const { gameId, gameName, isPurchased, price } = useParams();
  const [isInstalledOnSystem, setIsInstalledOnSystem] = useState(false);
  const [progress, setProgress] = useState(0);

  const checkIfTheGameIsInstalled = async () => {
    const path = `/home/tomas/game_manager_games/${gameName}`;
    setIsInstalledOnSystem(await invoke("check_folder_exists", { path }));
  };

  useEffect(() => {
    checkIfTheGameIsInstalled();
  }, []);

  const isInstalled = useMemo(
    () => isPurchased === "true" && isInstalledOnSystem,
    [isPurchased, isInstalledOnSystem]
  );
  const [acitivityState, setActivityState] = useState<ActivitySTate>(
    isInstalled
      ? "isInstalled"
      : isPurchased === "true"
      ? "isPurchased"
      : "notPurchased"
  );

  const onButtonClick = useCallback(async () => {
    if (
      !gameId ||
      !data.user?._id ||
      !data.jwt ||
      !updateUserAuthorizationData ||
      isLoading
    ) {
      return;
    }
    console.log(acitivityState, isPurchased);
    setIsLoading(true);
    switch (acitivityState) {
      case "isInstalled":
        break;
      case "isPurchased":
        break;
      case "notPurchased":
      default:
        const updatedUser = await purchaseGame(
          { gameId, userId: data.user?._id },
          data.jwt
        );
        updateUserAuthorizationData({ user: updatedUser });
        break;
    }
    setIsLoading(false);
  }, [acitivityState]);

  return (
    <Row gutter={24}>
      <Col span={12}>
        <Space size={"large"} direction="vertical">
          <Statistic title="Name: " value={gameName} />
          <Statistic title="Price: " value={price} />

          <Button
            onClick={onButtonClick}
            disabled={isLoading}
            shape="default"
            type="primary"
            size="large"
          >
            {acitivityState === "isInstalled"
              ? "Play"
              : acitivityState === "isPurchased"
              ? " Install"
              : "Purchase"}{" "}
            {gameName}
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
        State: ({acitivityState})
      </Title>

      <Progress
        strokeWidth={30}
        showInfo
        size={"small"}
        strokeColor={twoColors}
        percent={progress}
      />
    </Row>
  );
};
