import { Flex } from "antd";
import { Link } from "react-router-dom";
import "./index.scss";

const Header = () => {
  return (
    <div className="header" >
      <Flex className="container nav" justify="space-between" align="center">
        <a href="3" className="logo" >
          My Portfolio
        </a>
        <Flex gap={10} className="auth-group">
          <Link className="login" to="/login">Login</Link>
          <Link className="login" to="/register">Register</Link>
        </Flex>
      </Flex>
    </div>
  );
};

export default Header;
