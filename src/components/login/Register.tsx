import { Space, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useCallback, useContext, useState } from "react";
import { authorizationContext } from "../../hooks/authorization/AuthProvider";
import { register } from "../../api";
import { LoginAndRegisterRequest } from "../../models";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const { updateUserAuthorizationData = () => {} } =
    useContext(authorizationContext);
  const navigate = useNavigate();

  const [userData, setUserData] = useState<LoginAndRegisterRequest>({
    password: "",
    username: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const onRegister = useCallback(async () => {
    setIsLoading(true);
    try {
      const { isAuthorized, token, user } = await register(userData);
      updateUserAuthorizationData({ isAuthorized, jwt: token, user });
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
        onChange={(e) => {
          setUserData({ ...userData, username: e.target.value });
        }}
        value={userData.username}
        disabled={isLoading}
        size="large"
        placeholder="Enter a username..."
        prefix={<UserOutlined />}
      />

      <Input
        onChange={(e) => {
          setUserData({ ...userData, password: e.target.value });
        }}
        value={userData.password}
        disabled={isLoading}
        type="password"
        size="large"
        placeholder="Enter a password..."
        prefix={<LockOutlined />}
      />

      <Input
        onChange={(e) => {
          setUserData({ ...userData, password: e.target.value });
        }}
        value={userData.password}
        disabled={isLoading}
        type="password"
        size="large"
        placeholder="Enter the password again..."
        prefix={<LockOutlined />}
      />

      <Button disabled={isLoading} onClick={onRegister}>
        Register
      </Button>
    </Space>
  );
};
