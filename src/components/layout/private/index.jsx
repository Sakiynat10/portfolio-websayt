import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';

import "./index.scss"
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/slice/auth';
import useRolePages from '../../../hooks/usePages';
// import useRolePages from '../../../hooks/useRolePages';


const { Header, Sider, Content } = Layout;

const PrivateLayout = () => {
  const [ collapsed, setCollapsed ] = useState( false );
  const [ key, setKey ] = useState( '/admin/dashboard' )
  const { pathname } = useLocation()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rolePages = useRolePages();
  const {user: {role}} = useSelector(state => state.auth)

  useEffect( () => {
    setKey( pathname )
  }, [ pathname ] )

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const exit = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="admin-logo">
          {role === "admin" ? "Admin" : "Client"}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[ key ]}
          items={
            rolePages.filter( page => page.isMenuVisible ).map( ( { name, url, icon: Icon } ) => ( {
              key: '/' + url,
              icon: <Icon />,
              label: <Link to={'/' + url}>{name}</Link>,
            } ) ).concat({
              key: '/logout',
              icon: <UploadOutlined onClick={exit} />,
              label: <Button onClick={exit} >Logout</Button>,              
          })
          }
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            borderBottom: '1px solid black',
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed( !collapsed )}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Link to='/account'>Account</Link>
        </Header>
        <Content
          style={{
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default PrivateLayout;