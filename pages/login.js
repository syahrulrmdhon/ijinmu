import React, { useState } from "react";
import Image from "next/image";
import cookies from "next-cookies";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Layout from "../components/Layouts";
import { postLogin } from "../utils/apiData";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const CheckboxCustom = styled(Checkbox)`
  width: 35vw;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    postLogin(email, password)
      .then((resp) => {
        console.log(resp.data);
        document.cookie = `attributes=${resp.data.attributes}; token = ${resp.data.attributes.token}`;
        setIsLoading(false);
      })
      .catch((err) => {
        const { response } = err;
        message.error(`${response.status} ${response.statusText}`);
        setIsLoading(false);
      });
  };

  return (
    <Layout>
      <LoginContainer>
        <Form onFinish={handleSubmit} className="login-form">
          <Form.Item>
            <ImageWrapper>
              <Image alt="logo" src="/logo.png" width="150" height="150" />
            </ImageWrapper>
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={isLoading}
            >
              Log in
            </Button>
          </Form.Item>
          <Form.Item>
            <CheckboxCustom>Remember me</CheckboxCustom>
          </Form.Item>
          <Form.Item>
            <a className="login-form-forgot" href="">
              Forgot password{" "}
            </a>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </LoginContainer>
    </Layout>
  );
};

export default Login;
