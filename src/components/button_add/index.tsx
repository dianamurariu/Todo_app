import React, { FC, MouseEventHandler, useState } from "react";
import styles from "./button_add.module.css";
import { dimensionsIcons } from "../../config";

interface ButtonAddProps {
  handleClick: MouseEventHandler<HTMLButtonElement>;
}

const ButtonAdd: FC<ButtonAddProps> = ({ handleClick }) => {
  // State to track whether the button is being hovered
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type="button"
      className={`${styles.btn_add} ${isHovered ? styles.hovered : ""}`}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <img
        src="images/plus.svg"
        alt="plus-icon"
        width={dimensionsIcons.medium}
        height={dimensionsIcons.medium}
      />
    </button>
  );
};

export default ButtonAdd;
