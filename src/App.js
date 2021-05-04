import "./App.css";

// import axios
import axios from "axios";

// import hook react
import { useState, useEffect } from "react";

//import Composants
import logo from "./assets/img/Deliveroo-Logo.png";
import Topbar from "./components/TopBar";
import Restaurant from "./components/Restaurant";
import Content from "./components/Content";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [cartLines, setcartLines] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://deliveroo-backend-giovanni.herokuapp.com/"
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const handleAddMeal = (id, title, price) => {
    const newCartLines = [...cartLines];

    //Vérification si id déjà présent
    let lineFind = false;
    for (let i = 0; i < newCartLines.length; i++) {
      if (newCartLines[i].id === id) {
        newCartLines[i].quantity++;
        lineFind = true;
        break;
      }
    }
    if (!lineFind) {
      newCartLines.push({
        id: id,
        quantity: 1,
        price: price,
        title: title,
      });
    }
    setcartLines(newCartLines);
    updTotals(newCartLines);
  };

  const handleButtonsQty = (searchId, action) => {
    const newCartQty = [...cartLines];
    // recherche de la ligne dans le table de ligne
    for (let i = 0; i < newCartQty.length; i++) {
      if (newCartQty[i].id === searchId) {
        action === "+" ? newCartQty[i].quantity++ : newCartQty[i].quantity--;
        if (newCartQty[i].quantity === 0) {
          newCartQty.splice(i, 1);
        }
        break;
      }
    }
    setcartLines(newCartQty);
    updTotals(newCartQty);
  };

  const updTotals = (tab) => {
    let subTotalVar = 0;
    for (let i = 0; i < tab.length; i++) {
      subTotalVar += tab[i].price * tab[i].quantity;
      // console.log(subTotalVar);
    }
    setSubTotal(subTotalVar);
    setTotal(subTotalVar + 2.5);
  };

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <>
      <Topbar logo={logo} />
      <Restaurant restaurant={data.restaurant} />
      <div className="body">
        <Content
          categories={data.categories}
          handleAddMeal={handleAddMeal}
          cartLines={cartLines}
          handleButtonsQty={handleButtonsQty}
          subTotal={subTotal}
          total={total}
        />
      </div>
    </>
  );
}

export default App;
