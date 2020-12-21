import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Layout from "../components/Layouts";
import { postLogin } from "../utils/apiData";
import StaticData from "../utils/staticData";
var encryptor = require("simple-encryptor")(StaticData.API_CRYPT);

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
  const router = useRouter();

  const handleSubmit = () => {
    setIsLoading(true);
    postLogin(email, password)
      .then((resp) => {
        cookie.set("loginData", encryptor.encrypt(JSON.stringify(resp.data)), {
          expires: 1,
        });
        setIsLoading(false);
        router.push("/");
      })
      .catch((err) => {
        const { response } = err;
        message.error(`${response.status} ${response.statusText}`);
        setIsLoading(false);
      });
  };

  // example how to decrypt cookie
  // let dataCookies = cookie.get("loginData")
  // dataCookies = JSON.parse(encryptor.decrypt(dataCookies));

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
