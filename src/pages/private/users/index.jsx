import { Button, Input, Modal, Pagination, Table, Form, Flex } from "antd";
import { Fragment, useEffect } from "react";
import { LIMIT } from "../../../components/cosnt";
import useUsers from "../../../zustand/users";

import "react-tabs/style/react-tabs.css";

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

  } = useUsers();

  const [form] = useForm();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  console.log(users);


  // let clients = users.filter((client) => client.role === "client")

  const columns = [
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
        return text ? text : "Unknown"
      }
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
      render: (text) => {
        return (text?.split("T")[0] ? <p>{text?.split("T")[0]}</p> : "Unknown")
      }
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
                <h1>{users?.map((user) => user.role)[0] === "client" ? "Clients" : "Only Users"} {total}</h1>{" "}
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
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
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
            label="Fields"
            name="dsd"
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
            label="Birthday"
            name="birthday"
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
        </Form>
      </Modal>
    </Fragment>
  );
};

export default UsersPage;
