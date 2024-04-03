import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { login } from "./requests";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const data = await login(values);
      if (data.token) {
        navigate("/portal");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ width: 300, padding: "20px", background: "gray" }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
          CHATIVO
        </Title>
        <Form
          onFinish={onFinish}
          initialValues={{
            username: "aga1",
            password: "123123123",
          }}
        >
          <Form.Item name="username">
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item name="password">
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sign in
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: "center", marginTop: 16 }}>
          Copyright © 2024 Chativo
        </div>
      </div>
    </div>
  );
};

export default Login;
