import React, { FC, MouseEventHandler, useState } from "react";
import styles from "./button_task.module.css";
import { dimensionsIcons } from "../../../config";

interface ButtonTaskProps {
  imgSrc: string;
  imgAlt: string;
  handleClick: MouseEventHandler<HTMLButtonElement>;
}

const ButtonTask: FC<ButtonTaskProps> = ({ imgSrc, imgAlt, handleClick }) => {
  // State to track whether the button is being hovered
  const [isHovered, setIsHovered] = useState(false);

  return (
    // Button element with dynamic styles based on hover state
    <button
      type="button"
      className={`${styles.task_button} ${isHovered ? styles.hovered : ""}`}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <img
        src={imgSrc}
        alt={imgAlt}
        width={dimensionsIcons.xsmall}
        height={dimensionsIcons.xsmall}
      />
    </button>
  );
};

export default ButtonTask;
