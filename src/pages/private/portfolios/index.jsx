import { Button, Input, Modal, Pagination, Table , Form, Flex, Upload, Image } from "antd";
import { Fragment , useState } from "react";
import { LIMIT } from "../../../components/cosnt";
import { useCreatePortfolioMutation, useDeletePortfolioMutation, useGetPortfolioMutation, useGetPortfoliosQuery, useUpdatePortfolioMutation } from "../../../redux/query/portfolio";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import getImageURL from "../../../utils/get-image-url";
import request from "../../../server/request";
import { useSelector } from "react-redux";



const PortfoliosPage = () => {
  const {user} = useSelector(state => state.auth)
  const [page , setPage] = useState(1)
  // const portfolio = user?.role === 'client' ?  user: user?._id : data?.data;
  const {data , isFetching , refetch} = useGetPortfoliosQuery( user?.role === "client" ? {user: user?._id, page} : null)
  const [deletePortfolio] = useDeletePortfolioMutation();
  const [createPortfolio] = useCreatePortfolioMutation();
  const [updatePortfolio] = useUpdatePortfolioMutation();
  const [getPortfolio] = useGetPortfolioMutation();
  console.log(user?.role === "client");
  const total = data?.pagination?.total;
  const [selected , setSelected] = useState(null);
  const [isOpen , setIsOpen] = useState(false);
  const [btnLoading , setBtnLoading] = useState(false);
  const [photo ,setPhoto] = useState(null);


  const [form] = Form.useForm()

  const getPage = (page) => {
    setPage(page);
    refetch();
  }

  const showModal = () => {
    setIsOpen(true)
    form.resetFields()
  }

  const closeModal = () => {
    setIsOpen(false)
    setSelected(null)
    setPhoto(null)
  }

  const submit = async () => {
    try{
      setBtnLoading(true)
      const values = await form.validateFields();
      const portfolioPhoto = {...values , photo: photo._id}
      if(selected === null) {
        await createPortfolio(portfolioPhoto)
      }else{
        // await request.put(`education/${selected}` , education)
        await updatePortfolio({id:selected , data:portfolioPhoto})
        console.log(selected);
      }
      refetch()
      setIsOpen(false)
    }finally{
      setBtnLoading(false)
    }
  }


  const editPortfolio = async (id) => {
    try{
      setSelected(id)
      setIsOpen(true)
      setBtnLoading(true)
      const {data} = await getPortfolio(id)
      form.setFieldsValue(data)
    }finally{
      setBtnLoading(false)
    }
  }

  const handleSearch =(e) => {
    console.log(e.target.value);
  }

  const handlePhoto = async (e) => {
    try {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      setBtnLoading(true)
      const { data } = await request.post("upload", formData);
      setPhoto(data)
    } finally {
      setBtnLoading(false)
    }
  };

  const deletePhoto = async () => {
    try {
      setBtnLoading(true)
      await request.delete(`upload/${photo._id}`);
      setPhoto(null)
    } finally {
      setBtnLoading(false)
    }
  };


  const columns = [
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (photo) => (
        <Image width={50} height={50} src={getImageURL(photo)} alt="" />
      ),
    },
    {
      title:'Name',      dataIndex:"name",
      key:"name"
    },
    {
      title:'Link',
      dataIndex:"url",
      key:"url",
      render: (url) => (
        <a href={url}>{url}</a>
      )
      ,
    },
    {
      title:'Description',
      dataIndex:"description",
      key:"description",
    },
    {
      title:'Action' ,
      dataIndex:'_id',  
      key:'_id',
      render:(_id) => (
        <Flex>
          <Button type="primary" style={{marginRight:'16px'}} onClick={()=> editPortfolio(_id)} >Edit</Button>
          <Button type="primary"  onClick={() => deletePortfolio( _id )} >Delete</Button>
        </Flex>
      )
    }
  ]
  return (<Fragment>
    <Input placeholder="Searching portfolios ..." type="text" onChange={handleSearch} />
    <Table pagination={false} title={() => <Flex justify='space-between' align='center'><h1>Portfolio {total}</h1> <Button type='dashed' onClick={showModal}>Add</Button></Flex>} loading={isFetching} columns={columns} dataSource={data?.data} />
    <Pagination total={total} showSizeChanger={false} pageSize={LIMIT}  onChange={getPage}/>
    <Modal title="Experiences data" open={isOpen} onOk={submit} okText={selected === null ?  "Add"  : "Save"} onCancel={closeModal} confirmLoading={btnLoading}>
      <Form
        form={form}
        name="portfolio"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please fill!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Link"
          name="url"
          rules={[
            {
              required: true,
              message: 'Please fill!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: 'Please fill!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        {photo ? (
              <Flex vertical="column" gap={"small"}>
                <Upload 
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                fileList={photo ? [{status: 'done' ,url: getImageURL(photo)}] : null}
                onChange={handlePhoto}
                onRemove={deletePhoto}
                 src={getImageURL(photo)} />
                 {photo ? (null) : (
                  <button 
                    style={{
                      border:0 ,
                      background:'none' ,
                    }}
                    type="button"
                   >
                    {btnLoading ? <LoadingOutlined/> : <PlusOutlined/>}
                    <div style={{
                      marginTop:8,
                    }}>Upload</div>
                   </button>
                 )}
                <Button
                  loading={btnLoading}
                  onClick={deletePhoto}
                  type="primary"
                  danger
                >
                  Delete photo
                </Button>
              </Flex>
            ) : (
              <Input
                disabled={btnLoading}
                type="file"
                accept="image/jpeg, image/png, image/JPG"
                onChange={handlePhoto}
              />
            )}
      </Form>
    </Modal>
  </Fragment >
  )
}

export default PortfoliosPage