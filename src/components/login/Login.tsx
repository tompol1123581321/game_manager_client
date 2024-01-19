import { Space, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { login } from "../../api";

export const Login = () => {
  const navigate = useNavigate();
  return (
    <Space direction="vertical">
      <Input
        size="large"
        placeholder="Enter a username..."
        prefix={<UserOutlined />}
      />

      <Input
        type="password"
        size="large"
        placeholder="Enter a password..."
        prefix={<LockOutlined />}
      />
      <Button
        onClick={() => {
          navigate("/list");
        }}
      >
        Login
      </Button>
    </Space>
  );
};
