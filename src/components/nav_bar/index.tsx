import React, { useState } from "react";
import styles from "./nav_bar.module.css";
import { dimensionsIcons } from "../../config";
import { useAppDispatch } from "../../redux/hooks";
import { setShowCompleted } from "../../redux/todoSlice";

const NavBar = () => {
  const dispatch = useAppDispatch();
  // State to track the active menu button
  const [menuActive, setMenuActive] = useState(true);
  // Handler for button clicks
  const handleButtonClick = (iconType: string) => {
    //If 'All' button is clicked, set the 'MenuActive' true and don't display the completed todos
    if (iconType === "menu") {
      dispatch(setShowCompleted(false));
      setMenuActive(true);
    } else {
      //If the'Completed' button is clicked, set 'MenuActive' to false and show the completed todos
      dispatch(setShowCompleted(true));
      setMenuActive(false);
    }
  };

  return (
    <div className={styles.nav_bar__container}>
      {/* Applies styles dynamically based on the active  button */}
      <button
        type="button"
        className={`${styles.nav_button} ${menuActive ? styles.active : ""}`}
        onClick={() => handleButtonClick("menu")}
      >
        {/* Render icon dynamically based on the active button */}
        <img
          src={menuActive ? "/images/menu-purple.png" : "/images/menu-gray.png"}
          alt="menu-icon"
          width={dimensionsIcons.small}
          height={dimensionsIcons.small}
          className={styles.menu_icon}
        />
        All
      </button>
      {/* Applies styles dynamically based on the active button*/}
      <button
        type="button"
        className={`${styles.nav_button} ${!menuActive ? styles.active : ""}`}
        onClick={() => handleButtonClick("complete")}
      >
        {/* Render icon dynamically based on the active button */}
        <img
          src={
            !menuActive
              ? "/images/complete-purple.png"
              : "/images/complete-gray.png"
          }
          alt="complete-icon"
          width={dimensionsIcons.small}
          height={dimensionsIcons.small}
          className={styles.complete_icon}
        />
        Completed
      </button>
    </div>
  );
};

export default NavBar;
