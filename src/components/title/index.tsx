import React, { ReactNode } from "react";

interface TitleProps {
  children: ReactNode;
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Title: React.FC<TitleProps> = ({ children, level = "h2" }) => {
  // Render the appropriate heading element based on the specified level
  switch (level) {
    case "h1":
      return <h1>{children}</h1>;
    case "h2":
      return <h2>{children}</h2>;
    case "h3":
      return <h3>{children}</h3>;
    case "h4":
      return <h4>{children}</h4>;
    case "h5":
      return <h5>{children}</h5>;
    case "h6":
      return <h6>{children}</h6>;
    default:
      return <h2>{children}</h2>;
  }
};

export default Title;
