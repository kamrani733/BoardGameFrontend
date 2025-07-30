import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { io } from "socket.io-client";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/fonts.css";
import "./css/special_occasions.css";
import "./css/style.css";

import Page from "./components/pages/page";

const socket = io();

const themes = {
  light: {
    "--bg": "white",
    "--color": "#333333",
    "--dark_color": "#666666",
    "--light_color": "#f0f0f0",
    "--red": "red",
    "--darkred": "darkred",
    "--green": "#90EE90",
    "--darkgreen": "darkgreen",
    "--green_transparent_3": "rgba(0, 128, 0, 0.3)",
    "--red_transparent_3": "rgba(255, 0, 0, 0.3)",
    "--orange": "orange",
    "--padding": "10px",
    "--padding_small": "5px",
    "--padding_big": "20px",
    "--radius": "10px",
    "--radius_small": "5px",
    "--radius_big": "25px",
    "--transparent_2": "rgba(255, 255, 255, 0.2)",
    "--transparent_5": "rgba(255, 255, 255, 0.5)",
    "--transparent_8": "rgba(255, 255, 255, 0.8)",
    "--transparent_color_1": "rgba(51, 51, 51, 0.1)",
    "--transparent_color": "rgba(51, 51, 51, 0.2)",
    "--firework_color": "blue",
  },
  dark: {
    "--bg": "black",
    "--color": "gold",
    "--dark_color": "#b39800",
    "--light_color": "yellow",
    "--red": "red",
    "--darkred": "darkred",
    "--green": "green",
    "--darkgreen": "darkgreen",
    "--green_transparent_3": "rgba(0, 128, 0, 0.3)",
    "--red_transparent_3": "rgba(255, 0, 0, 0.3)",
    "--orange": "orange",
    "--padding": "10px",
    "--padding_small": "5px",
    "--padding_big": "20px",
    "--radius": "10px",
    "--radius_small": "5px",
    "--radius_big": "25px",
    "--transparent_2": "rgba(0, 0, 0, 0.2)",
    "--transparent_5": "rgba(0, 0, 0, 0.5)",
    "--transparent_8": "rgba(0, 0, 0, 0.8)",
    "--transparent_color_1": "rgba(255, 215, 0, 0.1)",
    "--transparent_color": "rgba(255, 215, 0, 0.2)",
    "--firework_color": "red",
  },
};

function App() {
  const theme = useSelector((state) => state.theme);

  let my_console = (function () {
    let oldConsole = null;
    function enable() {
      if (oldConsole == null) return;
      window["console"]["log"] = oldConsole;
      window["console"]["warn"] = oldConsole;
      window["console"]["error"] = oldConsole;
    }
    function disable() {
      oldConsole = console.log;
      window["console"]["log"] = function () {};
      window["console"]["warn"] = function () {};
      window["console"]["error"] = function () {};
    }
    return { enable, disable };
  })();

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const currentTheme = themes[theme] || themes.dark;

    Object.entries(currentTheme).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  }, [theme]);

  return <Page socket={socket} />;
}

export default App;
