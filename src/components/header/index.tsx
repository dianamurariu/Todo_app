import React from "react";
import styles from "./header.module.css";
import Title from "../title";
import Calendar from "./calendar";

const Header = () => {
  return (
    <div className={styles.header__container} data-testid="header-component">
      <Title level="h1">Todo App</Title>
      <Calendar />
    </div>
  );
};

export default Header;
