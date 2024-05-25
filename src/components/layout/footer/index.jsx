import { Flex } from "antd";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { BsTelegram } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";

import "./index.scss";

const Footer = () => {
  return (
    <footer>
      <Flex className="container footer-content" justify="space-between" align="center">
        {/* <a href="#hero" className="logo">
          My Portfolio
        </a>
        <Flex gap={5} className="media-contact">
          <a href="https://www.facebook.com/people/Asilbek-Xoliyarovv/pfbid0WVA1iZ9y7qzrKj5wL2EiGYUznoAbmyTodLmZ4cSFTQkPieWGSuUCkxfLnj3e62C5l/">
            <FaFacebook />
          </a>
          <a href="https://www.instagram.com/asilbekxoliyorov/">
            <FaSquareInstagram />
          </a>
          <a href="https://t.me/Asilbek_Xoliyorov_2002">
            <BsTelegram />
          </a>
          <a href="https://www.linkedin.com/in/asilbek-xoliyorov-58127a2aa/">
            <BsLinkedin />
          </a>
        </Flex> */}
      </Flex>
    </footer>
  );
};

export default Footer;
