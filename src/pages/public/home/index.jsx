import { Fragment } from "react";

import "./index.scss";
import { Flex } from "antd";

const HomePage = () => {
  return (
    <Fragment>
      <Flex className="container hero"  >
      <img className="hero-img" src="/my-image.png" alt="" />
      <Flex className="hero-container ">
        <h2>Hello , Mrs</h2>
        <h1>Asilbek Xoliyorov</h1>
        <h2>And I`m a Frontend Developer</h2>
        <h2>
          You may use this website to make your private portfolio.It is so easy
          with us.If you want to start now, you can get 20% discount price for
          your portfolio
        </h2>
        <div className="hero-btn-group">
          <a href="#contact">Contact with me</a>
          <a href="resume">My resume</a>
        </div>
      </Flex>
      </Flex>
    </Fragment>
  );
};

export default HomePage;
