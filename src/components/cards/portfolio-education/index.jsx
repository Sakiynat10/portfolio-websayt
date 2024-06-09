
const Education = ({description , endDate , startDate , level , name}) => {
  return (
    <div className="experience-card">
      <h3 style={{display:"flex" , justifyContent:"space-between"}}><span>{startDate.split("T")[0]}</span><span>{endDate.split("T")[0]}</span></h3>
      <h1>{name}</h1>
      <div className="work-place">
        <span></span>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Education;
