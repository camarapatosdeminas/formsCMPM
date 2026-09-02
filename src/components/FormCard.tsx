// src/components/FormCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import "./FormCard.css";

interface FormCardProps {
  title: string;
  description: string;
  linkTo: string;
  icon: React.ReactNode;
}

const FormCard: React.FC<FormCardProps> = ({
  title,
  description,
  linkTo,
  icon,
}) => {
  return (
    <Link to={linkTo} className="card-link">
           {" "}
      <div className="card">
                <div className="card-icon">{icon}</div>        <h3>{title}</h3> 
              <p>{description}</p>     {" "}
      </div>
         {" "}
    </Link>
  );
};

export default FormCard;
