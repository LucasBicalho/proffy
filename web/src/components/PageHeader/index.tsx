import React from "react";
import { Link } from "react-router-dom";

import { LogoImage, BackIcon } from "../../assets/images";

import "./styles.css";

interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  children,
  title,
  description,
}) => {
  return (
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/">
          <img src={BackIcon} alt="Voltar" />
        </Link>
        <img src={LogoImage} alt="Proffy" />
      </div>

      <div className="header-content">
        <strong>{title}</strong>
        {description && <p>{description}</p>}

        {children}
      </div>
    </header>
  );
};

export default PageHeader;
