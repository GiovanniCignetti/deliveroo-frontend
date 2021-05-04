import "./index.css";
const Meal = ({ meals, handleAddMeal }) => {
  return (
    <div className="meals">
      {meals.map((meal, index) => {
        return (
          <div
            onClick={() => {
              handleAddMeal(meal.id, meal.title, meal.price);
            }}
            className="meal"
            key={meal.id}
          >
            <div className="leftMeal">
              <h3>{meal.title}</h3>
              <p>{meal.description}</p>
              <div>
                <span>{meal.price}</span>
                {meal.popular && <span>"Popular"</span>}
              </div>
            </div>
            <div className="rightMeal">
              {meal.picture && <img src={meal.picture} alt="mealPicture" />}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Meal;
