import { Space, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { login } from "../../api";
import { useCallback, useContext, useState } from "react";
import { authorizationContext } from "../../hooks/authorization/AuthProvider";

export const Login = () => {
  const { updateUserAuthorizationData = () => {} } =
    useContext(authorizationContext);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    password: "",
    username: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const onRegister = useCallback(async () => {
    setIsLoading(true);
    try {
      const { isAuthorized, token, authorizedUser } = await login(userData);
      updateUserAuthorizationData({
        isAuthorized,
        jwt: token,
        user: authorizedUser,
      });
      setIsLoading(false);
      navigate("/list");
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, [userData]);

  return (
    <Space direction="vertical">
      <Input
        size="large"
        disabled={isLoading}
        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
        value={userData.username}
        placeholder="Enter a username..."
        prefix={<UserOutlined />}
      />

      <Input
        type="password"
        size="large"
        disabled={isLoading}
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        value={userData.password}
        placeholder="Enter a password..."
        prefix={<LockOutlined />}
      />

      <Button onClick={onRegister}>Login</Button>
    </Space>
  );
};
