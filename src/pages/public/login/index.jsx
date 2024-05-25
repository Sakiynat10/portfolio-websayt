import { Button, Flex, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { controlLoading, setAuth } from "../../../redux/slice/auth";
import request from "../../../server/request";

import "./index.scss";

const LoginPage = () => {
  const {loading} = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const onFinish = async (values) => {
    try{
      dispatch(controlLoading())
      const {data} = await request.post('auth/login' , values)
      dispatch(setAuth({...data, navigate}));
    }finally{
      dispatch(controlLoading())
    }
  }
  return (
    <Flex justify="center" align="center" style={{height:"100vh"}}>
      <Form
        name="basic"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 0,
            span: 24,
          }}
        >
          <Button  loading={loading} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};
export default LoginPage;
