import { Space, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

export const Register = () => {
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

      <Input
        type="password"
        size="large"
        placeholder="Enter the password again..."
        prefix={<LockOutlined />}
      />

      <Button
        onClick={() => {
          console.log("");
        }}
      >
        Register
      </Button>
    </Space>
  );
};
