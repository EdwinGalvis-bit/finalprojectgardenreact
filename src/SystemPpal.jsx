import React, { useState } from "react";
import "./SystemPpal.css";
import TotalCost from "./TotalCost";
import { toggleMealSelection } from "./menuC";
import { incrementAvQuantity, decrementAvQuantity } from "./menuB";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "./menuA";

const SystemPpal = () => {
  const [showItems, setShowItems] = useState(false);
  const [numberOfUnit, setNumberOfUnit] = useState(1);
  const venueItems = useSelector((state) => state.venue);
  const avItems = useSelector((state) => state.av);
  const mealsItems = useSelector((state) => state.meals);
  const dispatch = useDispatch();
  const remainingAuditoriumQuantity =
    3 -
    venueItems.find((item) => item.name === "Plantas Florales (Anturios)")
      .quantity;

  const handleToggleItems = () => {
    console.log("handleToggleItems called");
    setShowItems(!showItems);
  };
  const handleAddToCart = (index) => {
    if (
      venueItems[index].name === "Plantas Florales (Anturios)" &&
      venueItems[index].quantity >= 3
    ) {
      return;
    }
    dispatch(incrementQuantity(index));
  };

  const handleRemoveFromCart = (index) => {
    if (venueItems[index].quantity > 0) {
      dispatch(decrementQuantity(index));
    }
  };
  const handleIncrementAvQuantity = (index) => {
    dispatch(incrementAvQuantity(index));
  };
  const handleDecrementAvQuantity = (index) => {
    dispatch(decrementAvQuantity(index));
  };
  const handleMealSelection = (index) => {
    const item = mealsItems[index];
    if (item.selected && item.type === "mealForUnit") {
      const newNumberOfUnit = item.selected ? numberOfUnit : 0;
      dispatch(toggleMealSelection(index, newNumberOfUnit));
    } else {
      dispatch(toggleMealSelection(index));
    }
  };
  const getItemsFromTotalCost = () => {
    const items = [];
    venueItems.forEach((item) => {
      if (item.quantity > 0) {
        items.push({ ...item, type: "planters" });
      }
    });
    avItems.forEach((item) => {
      if (
        item.quantity > 0 &&
        !items.some((i) => i.name === item.name && i.type === "exteriors")
      ) {
        items.push({ ...item, type: "exteriors" });
      }
    });
    mealsItems.forEach((item) => {
      if (item.selected) {
        const itemForDisplay = { ...item, type: "flowerpots" };
        if (item.numberOfUnit) {
          itemForDisplay.numberOfUnit = numberOfUnit;
        }
        items.push(itemForDisplay);
      }
    });
    return items;
  };
  const items = getItemsFromTotalCost();
  const ItemsDisplay = ({ items }) => {
    console.log(items);
    return (
      <>
        <div className="display_box1">
          {items.length === 0 && <p>No ha seleccionado plantas o materas</p>}
          <table className="table_item_data">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Costo por Unidad</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>${item.cost}</td>
                  <td>
                    {item.type === "flowerpots" || item.numberOfUnit
                      ? ` For ${numberOfUnit} unit`
                      : item.quantity}
                  </td>
                  <td>
                    {item.type === "flowerpots" || item.numberOfUnit
                      ? `${item.cost * numberOfUnit}`
                      : `${item.cost * item.quantity}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };
  const calculateTotalCost = (section) => {
    let totalCost = 0;
    if (section === "planters") {
      venueItems.forEach((item) => {
        totalCost += item.cost * item.quantity;
      });
    } else if (section === "exteriors") {
      avItems.forEach((item) => {
        totalCost += item.cost * item.quantity;
      });
    } else if (section === "flowerpots") {
      mealsItems.forEach((item) => {
        if (item.selected) {
          totalCost += item.cost * numberOfUnit;
        }
      });
    }
    return totalCost;
  };
  const venueTotalCost = calculateTotalCost("planters");
  const avTotalCost = calculateTotalCost("exteriors");
  const mealsTotalCost = calculateTotalCost("flowerpots");
  const navigateToProducts = (idType) => {
    if (idType == "#planters" || idType == "#trees" || idType == "#flowerpots") {
      if (showItems) {
        setShowItems(!showItems);
      }
    }
  };
  const totalCosts = {
    venue: venueTotalCost,
    av: avTotalCost,
    meals: mealsTotalCost,
  };
  return (
    <>
      <navbar className="navbar_event_conference">
        <div className="company_logo">The Garden Of Eden</div>
        <div className="left_navbar">
          <div className="nav_links">
            <a href="#planters" onClick={() => navigateToProducts("#planters")}>
              Plantas Tipo A
            </a>
            <a href="#trees" onClick={() => navigateToProducts("#trees")}>
              Plantas Tipo B
            </a>
            <a href="#flowerpots" onClick={() => navigateToProducts("#flowerpots")}>
              Materas
            </a>
          </div>
          <button
            className="pay_button"
            onClick={() => alert("Pago realizado con éxito, recibira su pedido proximamente")}
          >
            Pagar
          </button>
          <button
            className="details_button"
            onClick={() => setShowItems(!showItems)}
          >
            Ver Carrito
          </button>
        </div>
      </navbar>
      <div className="main_container">
        {!showItems ? (
          <div className="items-information">
            <div id="planters" className="venue_container container_main">
              <div className="text">
                <h1>Primer Grupo de Plantas</h1>
              </div>
              <div className="venue_selection">
                {venueItems.map((item, index) => (
                  <div className="venue_main" key={index}>
                    <div className="img">
                      <img src={item.img} alt={item.name} />
                    </div>
                    <div className="text">{item.name}</div>
                    <div>${item.cost}</div>
                    <div className="button_container">
                      {venueItems[index].name ===
                      "Auditorium Hall (Capacity:200)" ? (
                        <>
                          <button
                            className={
                              venueItems[index].quantity === 0
                                ? "btn-warning btn-disabled"
                                : "btn-minus btn-warning"
                            }
                            onClick={() => handleRemoveFromCart(index)}
                          >
                            &#8211;
                          </button>
                          <span className="selected_count">
                            {venueItems[index].quantity > 0
                              ? ` ${venueItems[index].quantity}`
                              : "0"}
                          </span>
                          <button
                            className={
                              remainingAuditoriumQuantity === 0
                                ? "btn-success btn-disabled"
                                : "btn-success btn-plus"
                            }
                            onClick={() => handleAddToCart(index)}
                          >
                            &#43;
                          </button>
                        </>
                      ) : (
                        <div className="button_container">
                          <button
                            className={
                              venueItems[index].quantity === 0
                                ? " btn-warning btn-disabled"
                                : "btn-warning btn-plus"
                            }
                            onClick={() => handleRemoveFromCart(index)}
                          >
                            &#8211;
                          </button>
                          <span className="selected_count">
                            {venueItems[index].quantity > 0
                              ? ` ${venueItems[index].quantity}`
                              : "0"}
                          </span>
                          <button
                            className={
                              venueItems[index].quantity === 10
                                ? " btn-success btn-disabled"
                                : "btn-success btn-plus"
                            }
                            onClick={() => handleAddToCart(index)}
                          >
                            &#43;
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="total_cost">COSTO TOTAL A: ${venueTotalCost}</div>
            </div>
            {/*Necessary Add-ons*/}
            <div id="trees" className="venue_container container_main">
              <div className="text">
                <h1>Segundo Grupo de Plantas</h1>
              </div>
              <div className="addons_selection">
                {avItems.map((item, index) => (
                  <div className="av_data venue_main" key={index}>
                    <div className="img">
                      <img src={item.img} alt={item.name} />
                    </div>
                    <div className="text"> {item.name} </div>
                    <div> ${item.cost} </div>
                    <div className="addons_btn">
                      <button
                        className="btn-warning"
                        onClick={() => handleDecrementAvQuantity(index)}
                      >
                        {" "}
                        &ndash;{" "}
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        className=" btn-success"
                        onClick={() => handleIncrementAvQuantity(index)}
                      >
                        {" "}
                        &#43;{" "}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="total_cost">COSTO TOTAL B: ${avTotalCost}</div>
            </div>
            {/* Meal Section */}
            <div id="flowerpots" className="venue_container container_main">
              <div className="text">
                <h1>Seleccion de Materas</h1>
              </div>
              <div className="input-container venue_selection">
                <div className="input-container venue_selection">
                  <label htmlFor="numberOfUnit">
                    <h3>Grupos de Materas:</h3>
                  </label>
                  <input
                    type="number"
                    className="input_box5"
                    id="numberOfUnit"
                    value={numberOfUnit}
                    onChange={(e) =>
                      setNumberOfUnit(parseInt(e.target.value))
                    }
                    min="1"
                  />
                </div>
              </div>
              <div className="meal_selection">
                {mealsItems.map((item, index) => (
                  <div
                    className="meal_item"
                    key={index}
                    style={{ padding: 15 }}
                  >
                    <div className="inner">
                      <input
                        type="checkbox"
                        id={`meal_${index}`}
                        checked={item.selected}
                        onChange={() => handleMealSelection(index)}
                      />
                      <label htmlFor={`meal_${index}`}> {item.name} </label>
                    </div>
                    <div className="meal_cost">${item.cost}</div>
                  </div>
                ))}
              </div>
              <div className="total_cost">COSTO TOTAL C: ${mealsTotalCost}</div>
            </div>
          </div>
        ) : (
          <div className="total_amount_detail">
            <TotalCost
              totalCosts={totalCosts}
              ItemsDisplay={() => <ItemsDisplay items={items} />}
            />
          </div>
        )}
      </div>
    </>
  );
};
export default SystemPpal;
