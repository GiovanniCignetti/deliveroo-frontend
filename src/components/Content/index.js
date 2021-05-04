// import { useState } from "react";

import Meal from "../Meal";
import "./index.css";
const Content = ({
  categories,
  handleAddMeal,
  cartLines,
  subTotal,
  total,
  handleButtonsQty,
}) => {
  return (
    <div className="content">
      <div className="contentMeals">
        {categories &&
          categories.map((category, index) => {
            return (
              category.meals.length > 0 && (
                <div>
                  <h2>{category.name}</h2>
                  <Meal meals={category.meals} handleAddMeal={handleAddMeal} />
                </div>
              )
            );
          })}
      </div>
      <div className="cart">
        <button className="cartButton cartDisabled">Valider mon panier</button>

        {cartLines.length <= 0 ? (
          <div class="cartEmpty">Votre panier est vide</div>
        ) : (
          cartLines.map((cartLine, index) => {
            return (
              <>
                <div className="cartLine">
                  <div className="counterItem" key={cartLine.id}>
                    <button
                      onClick={() => {
                        handleButtonsQty(cartLine.id, "-");
                      }}
                    >
                      -
                    </button>
                    {cartLine.quantity}
                    <button
                      onClick={() => {
                        handleButtonsQty(cartLine.id, "+");
                      }}
                    >
                      +
                    </button>
                  </div>
                  <span>{cartLine.title}</span>
                  <span>{cartLine.price * cartLine.quantity}</span>
                </div>
              </>
            );
          })
        )}
        {cartLines.length > 0 && (
          <>
            <div className="cartResult">
              <p className="subTotal">
                Sous total <span>{subTotal}</span>
              </p>
              <p className="subTotal">
                Frais de livraison<span>2.50€</span>
              </p>
            </div>
            <div className="carTotal">
              <p>
                Total <span>{total}</span>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Content;
