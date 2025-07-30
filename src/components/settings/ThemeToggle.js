import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { toggleTheme } from "../../reducers/theme";

function ThemeToggle(props) {
  let dispatch = useDispatch();
  
  const theme = useSelector((state) => {
    return state.theme;
  });
  
  let themeOptions = [
    { id: "light", text: "Light", icon: "" },
    { id: "dark", text: "Dark", icon: "" },
  ];
  
  let title = theme === "light" ? "Light" : "Dark";

  function handleSelect(choice) {
    
    try {
      dispatch(toggleTheme(choice));
    } catch (error) {
      console.error('Dispatch failed:', error);
    }
  }

  return (
    <div className="theme-toggle">
      <DropdownButton
        title={title}
        id="theme_button"
        className="shadow_convex"
        onSelect={handleSelect}
      >
        {themeOptions.map((item, i) => (
          <Dropdown.Item key={i} eventKey={item.id}>
            <span>{item.text}</span>
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </div>
  );
}

export default ThemeToggle;