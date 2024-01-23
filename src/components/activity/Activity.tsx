import { Row, Col, Statistic, Button, Space } from "antd";
import { invoke } from "@tauri-apps/api/tauri";
import Title from "antd/es/typography/Title";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { authorizationContext } from "../../hooks/authorization/AuthProvider";
import { activateSession, downloadGame, purchaseGame } from "../../api";

type ActivitySTate =
  | "isInstalled"
  | "isInstalling"
  | "isPlaying"
  | "isStarting"
  | "isPurchased"
  | "notPurchased";

export const Activity = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { data, updateUserAuthorizationData } =
    useContext(authorizationContext);
  const { gameId, gameName, isPurchased, price } = useParams();
  const [isInstalledOnSystem, setIsInstalledOnSystem] = useState(false);

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
    setIsLoading(true);
    switch (acitivityState) {
      case "isPlaying":
        console.log("t");
        break;
      case "isInstalled":
        setActivityState("isStarting");
        const { secret } = await activateSession(
          { gameId, userId: data.user?._id, jwt: data.jwt },
          data.jwt
        );
        try {
          await invoke("run_script", {
            zipPath: `../game_manager_games/${gameId}.zip`,
            targetDir: `../game_manager_games/${gameId}`,
            args: [
              "--key1",
              data.user._id,
              "--key2",
              gameId,
              "--key3",
              data.jwt,
            ],
          });
        } catch (error) {
          console.log(error);
        }

        setActivityState("isPlaying");
        break;
      case "isPurchased":
        setActivityState("isInstalling");
        await downloadGame({ gameId, userId: data.user?._id }, data.jwt);
        await checkIfTheGameIsInstalled();
        setActivityState("isInstalled");
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
            {acitivityState === "isPlaying"
              ? "Cancel"
              : acitivityState === "isInstalled"
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
    </Row>
  );
};
