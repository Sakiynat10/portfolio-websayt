import {
  Button,
  Input,
  Modal,
  Pagination,
  Table,
  Form,
  Flex,
  Image,
  Select,
  DatePicker,
  Space,
} from "antd";
import { Fragment, useEffect } from "react";
import { BASE, LIMIT } from "../../../components/cosnt";
import useUsers from "../../../zustand/users";
import { RiDeleteBin6Line } from "react-icons/ri";

import "react-tabs/style/react-tabs.css";

import "./index.scss"

const onChange = (date, dateString) => {
  console.log(date, dateString);
};

const { useForm } = Form;

const UsersPage = () => {
  const {
    isOpen,
    users,
    total,
    btnLoading,
    loading,
    selected,
    getUsers,
    getPage,
    deleteUser,
    controlModal,
    editUser,
    showModal,
    submit,
    photo,
    handlePhoto,
    deleteUserPhoto,
    checkPhoto,
  } = useUsers();

  const [form] = useForm();
  console.log(checkPhoto);
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  console.log(users);

  const columns = [
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (photo) => (
        <Image width={50} height={50} src={`${BASE}upload/${photo}`} alt="" />
      ),
    },
    {
      title: "Firstname",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Lastname",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "PhoneNumber",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (text) => {
        return text ? text : "Unknown";
      },
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (_id) => (
        <Flex>
          <Button
            type="primary"
            style={{ marginRight: "16px" }}
            onClick={() => editUser(form, _id)}
          >
            Edit
          </Button>
          <Button type="primary" onClick={() => deleteUser(_id)}>
            Delete
          </Button>
        </Flex>
      ),
    },
  ];
  return (
    <Fragment>
      <Table
        pagination={false}
        title={() => (
          <Flex justify="space-between" align="center">
            <h1>
              {users?.map((user) => user.role)[0] === "client"
                ? "Clients"
                : "Only Users"}{" "}
              {total}
            </h1>{" "}
            <Button type="dashed" onClick={() => showModal(form)}>
              Add
            </Button>
          </Flex>
        )}
        loading={loading}
        columns={columns}
        dataSource={users}
      />
      <Pagination
        total={total}
        showSizeChanger={false}
        pageSize={LIMIT}
        onChange={getPage}
      />
      <Modal
        title="Experiences data"
        open={isOpen}
        onOk={() => submit(form)}
        okText={selected === null ? "Add" : "Save"}
        onCancel={controlModal}
        confirmLoading={btnLoading}
      >
        <Form
          form={form}
          name="user"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Firstname"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Lastname"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Select
              options={[
                {
                  value: "client",
                  label: "Client",
                },
                {
                  value: "user",
                  label: "No client",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Birthday"
            name="birthday"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Space direction="vertical">
              <DatePicker onChange={onChange} />
            </Space>
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input defaultValue="+998" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: false,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Fields"
            name="fields"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Info"
            name="info"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Github username"
            name="github"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Linkedin username"
            name="linkedin"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Telegram username"
            name="telegram"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Instagram username"
            name="instagram"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          {photo ? (
            checkPhoto ? (
              <div className="photo" width={"100%"} style={{position:"relative"}}>
                <Image  width={"100%"} height={"60%"} src={`${BASE}upload/${photo}`} />
                <Button
                  style={{position:"absolute"}}
                  loading={btnLoading}
                  type="primary"
                  className="delete-photo"
                  onClick={() => deleteUserPhoto(photo)}
                >
                  <RiDeleteBin6Line style={{fontSize:"24px"}} />
                </Button>
              </div>
            ) : (
              <input disabled={btnLoading} type="file" onChange={handlePhoto} />
            )
          ) : (
            <input disabled={btnLoading} type="file" onChange={handlePhoto} />
          )}
        </Form>
      </Modal>
    </Fragment>
  );
};

export default UsersPage;
