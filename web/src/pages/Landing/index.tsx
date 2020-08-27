import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { logoImage, landingImage } from "../../assets/images";

import {
  studyIcon,
  giveClassesIcon,
  purpleHeartIcon,
} from "../../assets/images/icons";

import api from "../../services/api";

import "./styles.css";

function Landing() {
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api.get("/connections").then((response) => {
      const { total } = response.data;
      setTotalConnections(total);
    });
  }, []);

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logoImage} alt="Proffy" />
          <h2>Sua plataforma de estudos online.</h2>
        </div>

        <img
          src={landingImage}
          alt="Plataforma de estudos"
          className="hero-image"
        />

        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={studyIcon} alt="Estudar" />
            Estudar
          </Link>
          <Link to="/give-classes" className="give-classes">
            <img src={giveClassesIcon} alt="Dar aulas" />
            Dar aulas
          </Link>
        </div>

        <span className="total-connections">
          Total de {totalConnections} conexões já realizadas{" "}
          <img src={purpleHeartIcon} alt="Coração roxo" />
        </span>
      </div>
    </div>
  );
}

export default Landing;
