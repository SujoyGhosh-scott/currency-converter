import React, { useState, useEffect } from "react";
import axios from "./axios";
import {
  Button,
  Grid,
  Paper,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    minHeight: "100vh",
  },
  nav: {
    height: "4rem",
  },
  paper: {
    padding: "1rem",
    minHeight: "250px",
    boxShadow: "0 0 20px #00000040",
  },
}));

function App() {
  const classes = useStyles();
  const [inputCurr, setInputCurr] = useState("USD");
  const [outputCurr, setOutputCurr] = useState("INR");
  const [currencies, setCurrencies] = useState([]);
  const [inputSymbol, setIS] = useState("$");
  const [outputSymbol, setOS] = useState("₹");
  const [inputName, setInputName] = useState("U.S. Dollar");
  const [outputName, setOutputName] = useState("Indian rupee");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(1);

  useEffect(() => {
    axios.get("/api/v7/countries?apiKey=26ecc25bbf96165524d3").then((res) => {
      console.log("usd->inr", res.data.results);
      //getting all currencies for selecting
      //currencies.map((c) => console.log(c[1].currencyId))
      setCurrencies(
        Object.entries(res.data.results).map((c) =>
          currencies.concat({
            currencyId: c[1].currencyId,
            currencyName: c[1].currencyName,
            currencySymbol: c[1].currencySymbol,
          })
        )
      );
    });
    convert();

    axios
      .get("/api/v7/currencies?apiKey=26ecc25bbf96165524d3")
      .then((res) => console.log("countries: ", res.data));
  }, []);

  useEffect(() => {
    const getSymbol = (s) => {
      for (let i = 0; i < currencies.length; i++) {
        //console.log("from loop: ", currencies[i][0].currencyId);
        if (currencies[i][0].currencyId === s) {
          return currencies[i][0].currencySymbol;
        }
      }
    };
    const getName = (n) => {
      for (let i = 0; i < currencies.length; i++) {
        //console.log("from loop: ", currencies[i][0].currencyId);
        if (currencies[i][0].currencyId === n) {
          return currencies[i][0].currencyName;
        }
      }
    };

    setIS(getSymbol(inputCurr));
    setOS(getSymbol(outputCurr));
    setInputName(getName(inputCurr));
    setOutputName(getName(outputCurr));
  }, [inputCurr, outputCurr]);

  const convert = () => {
    axios
      .get(
        `/api/v7/convert?q=${inputCurr}_${outputCurr}&compact=ultra&apiKey=26ecc25bbf96165524d3`
      )
      .then((res) => {
        console.log("converter: ", Object.entries(res.data)[0][1]);
        //setResult(Math.round(amount * Object.entries(res.data)[0][1], 4));
        setResult(Number(amount * Object.entries(res.data)[0][1]).toFixed(4));
      });
  };

  const handleInpCurr = (e) => {
    setInputCurr(e.target.value);
  };
  const handleOutCurr = (e) => {
    setOutputCurr(e.target.value);
  };

  return (
    <Paper className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense" className={classes.nav}>
          <Typography
            variant="h5"
            color="inherit"
            style={{ fontWeight: "600" }}
          >
            Currency Converter
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container style={{ paddingTop: "2rem", padding: "1rem" }}>
        <Grid item sm={1} xs={1}></Grid>
        <Grid container item sm={10} xs={10} spacing={2}>
          <Grid item sm={6} xs={12}>
            <Paper className={classes.paper}>chart</Paper>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Paper className={classes.paper}>
              <Typography
                variant="body1"
                gutterBottom
                style={{ color: "gray" }}
              >
                {amount} {inputName} equals
              </Typography>
              <Typography variant="h4" gutterBottom>
                {result} {outputName}
              </Typography>
              <Typography
                variant="subtitle2"
                gutterBottom
                style={{ color: "gray" }}
              >
                {new Date().toLocaleString()}
              </Typography>
              <Grid container spacing={2} style={{ marginTop: "1rem" }}>
                <Grid item sm={1} xs={2} style={{ textAlign: "center" }}>
                  <Typography variant="h5" gutterBottom>
                    {inputSymbol}
                  </Typography>
                </Grid>
                <Grid item sm={3} xs={10}>
                  <TextField
                    label="input value"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item sm={6} xs={8}>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    className={classes.margin}
                  >
                    <InputLabel id="input-curr">Currency</InputLabel>
                    <Select
                      labelId="input-curr"
                      id="demo-customized-select"
                      onChange={handleInpCurr}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {currencies.map((c) => (
                        <MenuItem key={Date.now()} value={c[0].currencyId}>
                          {c[0].currencyName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  sm={2}
                  xs={4}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => convert()}
                  >
                    convert
                  </Button>
                </Grid>
              </Grid>
              <Grid container spacing={2} style={{ marginTop: "1rem" }}>
                <Grid item sm={1} xs={1}>
                  <Typography variant="h5" gutterBottom>
                    {outputSymbol}
                  </Typography>
                </Grid>
                <Grid item sm={3} xs={4}>
                  <TextField
                    label="output"
                    value={result}
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid item sm={8} xs={7}>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    className={classes.margin}
                  >
                    <InputLabel id="input-curr">Currency</InputLabel>
                    <Select
                      labelId="input-curr"
                      id="demo-customized-select"
                      onChange={handleOutCurr}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {currencies.map((c) => (
                        <MenuItem key={Date.now()} value={c[0].currencyId}>
                          {c[0].currencyName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Grid item sm={1} xs={1}></Grid>
      </Grid>
      <Grid item style={{ padding: ".5rem" }}>
        <Typography variant="subtitle1" gutterBottom color="primary">
          made by Sujoy
        </Typography>
      </Grid>
    </Paper>
  );
}

export default App;
