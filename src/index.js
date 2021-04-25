import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: blue,
    type: "dark",
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

//26ecc25bbf96165524d3
//https://free.currconv.com/api/v7/currencies?apiKey=26ecc25bbf96165524d3
//https://free.currconv.com/api/v7/convert?q=USD_INR&compact=ultra&apiKey=26ecc25bbf96165524d3
//https://free.currconv.com/api/v7/countries?apiKey=26ecc25bbf96165524d3
//https://free.currconv.com/api/v7/convert?q=USD_PHP,PHP_USD&compact=ultra&date=2021/01/01&endDate=2021/04/01&apiKey=26ecc25bbf96165524d3
//https://free.currconv.com/others/usage?apiKey=26ecc25bbf96165524d3
