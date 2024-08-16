import React, { useState } from "react";
import "./App.css";
import SystemPpal from "./SystemPpal";
import AboutUs from "./AboutUs";

function App() {
  const [showVenue, setShowVenue] = useState(false);

  const handleGetStarted = () => {
    setShowVenue(true);
  };

  return (
    <>
      <header className="first_page">
        <div className="main_plants">
          <div className="first_page_name_btn">
            <h1 className="budget_heading">
              ¡Listo para comprar para tu jardín!
            </h1>
            <p className="budget_sentence">
              {" "}
              ¡Inicia la creación de tu hermoso jardín!
            </p>
            <div className="getstarted_btn">
              <button
                onClick={() => handleGetStarted()}
                className="get-started-btn"
              >
                Empezar mi compra
              </button>
            </div>
          </div>
          <div className="aboutus_main">
            <AboutUs />
          </div>
        </div>
      </header>

      <div className={`product-list-container ${showVenue ? "visible" : ""}`}>
        <SystemPpal />
      </div>
    </>
  );
}

export default App;
