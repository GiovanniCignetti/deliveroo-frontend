import "./App.css";

// import axios
import axios from "axios";

// import hook react
import { useState, useEffect } from "react";

//import du logo
import logo from "./assets/img/Deliveroo-Logo.png";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://deliveroo-backend-giovanni.herokuapp.com/"
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <>
      <header>
        <div className="headerDiv">
          <img src={logo} alt="logo" />
        </div>
      </header>
      <div className="restaurantInfo">
        <div>
          <h1>{data.restaurant.name}</h1>
          <p>{data.restaurant.description}</p>
        </div>
        <img src={data.restaurant.picture} alt="" />
      </div>

      <div className="container">
        <div className="categories">
          {data.categories &&
            data.categories.map((category, index) => {
              return (
                category.meals.length > 0 && (
                  <>
                    <h2>{category.name}</h2>
                    <div className="meals">
                      {category.meals.map((meal, index) => {
                        return (
                          <>
                            <div className="meal" key={meal.id}>
                              <div className="leftMeal">
                                <h3>{meal.title}</h3>
                                <p>{meal.description}</p>
                                <div>
                                  <span>{meal.price}</span>
                                  {meal.popular && <span>"Popular"</span>}
                                </div>
                              </div>
                              <div className="rightMeal">
                                {meal.picture && (
                                  <img src={meal.picture} alt="mealPicture" />
                                )}
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </>
                )
              );
            })}
        </div>
        {/* <div>PANIER</div> */}
      </div>
    </>
  );
}

export default App;
