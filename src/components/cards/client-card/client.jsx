import "./client.scss";
import { Link, useNavigate } from 'react-router-dom';

const ClientCard = ({ photo, firstName, lastName, username, info , _id }) => {
  const navigate = useNavigate();
  console.log(navigate);
  return (
    <div className="client-content container">
      <div className="client-card">
        <div className="client-img">
            <img src={"/public/my-image.png"} alt={photo} />
        </div>
        <div className="client-infos">
          <h2 style={{ color: "white" }}>{firstName}</h2>
          <h1>{lastName}</h1>
          <h3>{username ? username : "unknown"}</h3>
          <p>{info ? info: "lorem100"}</p>
          <Link to={`portfolios?user=${_id}`} className="portfolio-btn">See portfolio</Link>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;
