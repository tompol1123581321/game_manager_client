import React, { useMemo } from "react";
import { Layout, Space, Typography } from "antd";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/authorization/useAuth";

const { Content, Footer, Header } = Layout;

type Props = { children: React.ReactNode };

const getTitleBasedOnUrl = (url: string) => {
  switch (url) {
    case "/":
      return "Login-page";
    case "/list":
      return "Game-list-overview";
    case "/activity":
      return "Game-activity-detail";
    default:
      return "";
  }
};

export const AppLayout: React.FC<Props> = ({ children }) => {
  const location = useLocation();

  const { authorizedUsername } = useAuth();

  const subTitleBasedOnUrl = useMemo(
    () => getTitleBasedOnUrl(location.pathname),
    [location.pathname]
  );

  return (
    <Layout>
      <Header
        style={{
          backgroundColor: "ActiveBorder",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Space direction="horizontal">
          <Typography.Text>
            Game-manager-app <b> {subTitleBasedOnUrl}</b>
          </Typography.Text>
          {authorizedUsername && (
            <Typography.Text>
              ( Logged in as: <b>{authorizedUsername}</b> )
            </Typography.Text>
          )}
        </Space>
      </Header>
      <Content
        style={{
          padding: "30px 48px",
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};
