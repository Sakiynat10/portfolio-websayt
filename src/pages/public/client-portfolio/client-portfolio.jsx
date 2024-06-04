import FileSaver from "file-saver";
import Typewriter from "typewriter-effect";

import {
  FaDownload,
  FaGithub,
  FaLinkedinIn,
  FaTelegram,
  FaYoutube,
} from "react-icons/fa";
const { process } = FileSaver;

import "./client-portfolio.scss";
import { Statistic } from "antd";
import CountUp from "react-countup";

const saveFile = () => {
  FileSaver.saveAs(
    process.env.REACT_APP_CLIENT_URL + "/resources/cv.pdf",
    "MyCV.pdf"
  );
};

const ClientPortfolioPage = () => {
  const formatter = (value) => <CountUp end={value} separator="," />;

  return (
    <section style={{ paddingTop: 120, color: "white" }} id="hero">
      <div className="container hero-content">
        <div className="main-content">
          <div className="main-content-infos">
            <h3>Software Developer</h3>
            <h1>Hello I`m</h1>
            <h1 className="name">
              <Typewriter
                options={{
                  strings: ["Asilbek Xoliyorov", "Junior Frontend Developer"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h1>
            <p>Infos</p>
            <div className="sends">
              <button className="cv" onClick={saveFile}>
                Download CV
                <FaDownload />
              </button>
              <div className="medias">
                <a href="#">
                  <FaGithub className="media-img" />
                </a>
                <a href="#">
                  <FaLinkedinIn className="media-img" />
                </a>
                <a href="#">
                  <FaYoutube className="media-img" />
                </a>
                <a href="#">
                  <FaTelegram className="media-img" />
                </a>
              </div>
            </div>
          </div>
          <div className="main-content-img">
            <img src="/my-image.png" alt="" />
          </div>
        </div>
        <div className="statistics">
          <div className="statistics-title">
            <Statistic value={12} formatter={formatter}/>
            <p>Years of experience</p>
          </div>
          <div className="statistics-title">
            <Statistic value={26} formatter={formatter}/>
            <p>Projects completed</p>
          </div>
          <div className="statistics-title">
            <Statistic value={8} formatter={formatter} />
            <p>Technologies mastered</p>
          </div>
          <div className="statistics-title">
            <Statistic value={499}formatter={formatter} />
            <p>Code commits</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientPortfolioPage;
