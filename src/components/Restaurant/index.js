import "./index.css";
const Restaurant = ({ restaurant }) => {
  return (
    <div className="restaurantInfo">
      <div>
        <h1>{restaurant.name}</h1>
        <p>{restaurant.description}</p>
      </div>
      <img src={restaurant.picture} alt="" />
    </div>
  );
};

export default Restaurant;
