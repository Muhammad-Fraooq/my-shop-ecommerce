import { ButtonProps } from '@/types/componentsTypes';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react"


const Button:React.FC<ButtonProps> = ({ className, onClick, props }) =>{
    return (
        <div className="container">
          <button
            onClick={onClick}
            className={`btn ${className} text-center`}
          >
            {props}
          </button>
        </div>
      );
}
export default Button;
