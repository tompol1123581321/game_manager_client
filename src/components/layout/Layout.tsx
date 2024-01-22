import React, { useMemo } from "react";
import { Layout, Space, Typography } from "antd";
import { useLocation } from "react-router-dom";
import {
  AuthorizationHandlerComponent,
  authorizationContext,
} from "../../hooks/authorization/AuthProvider";

const { Content, Footer, Header } = Layout;

type Props = { children: React.ReactNode };

const getTitleBasedOnUrl = (url: string) => {
  const cleanedPathName = "/" + url.split("/")[1];
  switch (cleanedPathName) {
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
  const { pathname } = useLocation();

  const subTitleBasedOnUrl = useMemo(
    () => getTitleBasedOnUrl(pathname),
    [pathname]
  );

  return (
    <AuthorizationHandlerComponent currentPath={pathname ?? ""}>
      <Layout>
        <Header
          style={{
            backgroundColor: "ActiveBorder",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <authorizationContext.Consumer>
            {(context) => (
              <Space direction="horizontal">
                <Typography.Text>
                  Game-manager-app <b> {subTitleBasedOnUrl}</b>
                </Typography.Text>
                {context.data.user?.username && (
                  <Typography.Text>
                    ( Logged in as: <b>{context.data.user?.username}</b> )
                  </Typography.Text>
                )}
                {context.data.user?.credit !== undefined && (
                  <Typography.Text>
                    <b> Credit: {context.data.user?.credit}</b>
                  </Typography.Text>
                )}
              </Space>
            )}
          </authorizationContext.Consumer>
        </Header>
        <Content
          style={{
            padding: "30px 48px",
          }}
        >
          {children}
        </Content>
      </Layout>
    </AuthorizationHandlerComponent>
  );
};
