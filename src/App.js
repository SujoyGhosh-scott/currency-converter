import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Line } from "react-chartjs-2";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
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
  chartHeader: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    color: "gray",
  },
  chartButtons: {
    width: "80%",
    display: "flex",
    justifyContent: "space-around",
  },
  chartButton: {
    background: "transparent",
    color: "gray",
    border: "1px solid gray",
    borderRadius: "5px",
  },
  selectedButton: {
    color: "#2a9dfa",
    border: "1px solid #2a9dfa",
  },
}));

function App() {
  const classes = useStyles();
  const [inputCurr, setInputCurr] = useState("");
  const [outputCurr, setOutputCurr] = useState("");
  const [currencies, setCurrencies] = useState([]);
  const [inputSymbol, setIS] = useState("");
  const [outputSymbol, setOS] = useState("");
  const [inputName, setInputName] = useState("");
  const [outputName, setOutputName] = useState("");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(1);
  const [chart1label, setChart1Label] = useState([]);
  const [chart1data, setChart1data] = useState([]);
  const [chart2label, setChart2Label] = useState([]);
  const [chart2data, setChart2data] = useState([]);
  const [chartType, setChartType] = useState("1wk");

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
    //api to get the value to convert
    axios
      .get(
        `/api/v7/convert?q=${inputCurr}_${outputCurr}&compact=ultra&apiKey=26ecc25bbf96165524d3`
      )
      .then((res) => {
        console.log("converter: ", Object.entries(res.data)[0][1]);
        //setResult(Math.round(amount * Object.entries(res.data)[0][1], 4));
        setResult(Number(amount * Object.entries(res.data)[0][1]).toFixed(4));
      });

    //api to get the chart data
    //for 1 week
    let today = new Date();
    let lastWeek = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);
    let startDate =
      lastWeek.getFullYear() +
      "-" +
      (lastWeek.getMonth() + 1) +
      "-" +
      lastWeek.getDate();
    let endDate =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    axios
      .get(
        `/api/v7/convert?q=${inputCurr}_${outputCurr},${outputCurr}_${inputCurr}&compact=ultra&date=${startDate}&endDate=${endDate}&apiKey=26ecc25bbf96165524d3
`
      )
      .then((res) => {
        console.log(
          "chart data: ",
          Object.values(Object.entries(res.data)[0][1])
        );
        setChart1Label(Object.keys(Object.entries(res.data)[0][1]));
        setChart1data(Object.values(Object.entries(res.data)[0][1]));
        setChart2Label(Object.keys(Object.entries(res.data)[1][1]));
        setChart2data(Object.values(Object.entries(res.data)[1][1]));
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
            <Paper className={classes.paper}>
              <div className={classes.chartHeader}>
                <div className={classes.chartButtons}>
                  <button
                    onClick={() => setChartType("1wk")}
                    className={`${classes.chartButton} ${
                      chartType === "1wk" && classes.selectedButton
                    }`}
                  >
                    1wk
                  </button>
                  <button
                    onClick={() => setChartType("1mo")}
                    className={`${classes.chartButton} ${
                      chartType === "1mo" && classes.selectedButton
                    }`}
                  >
                    1mo
                  </button>
                </div>
                <span>(select any ont to get more detailed view)</span>
              </div>
              <Grid>
                <Line
                  data={{
                    labels: chart1label,
                    datasets: [
                      {
                        label: `${inputCurr}-${outputCurr}`,
                        data: chart1data,
                        borderWidth: 1,
                        backgroundColor: "#2a9dfa",
                        borderColor: "#3d8ccc",
                      },
                      {
                        label: `${outputCurr}-${inputCurr}`,
                        data: chart2data,
                        borderWidth: 1,
                        backgroundColor: "#2a9dfa",
                        borderColor: "#3d8ccc",
                      },
                    ],
                  }}
                  height={250}
                  width={350}
                  options={{
                    maintainAspectRatio: false,
                  }}
                />
              </Grid>
            </Paper>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Paper className={classes.paper}>
              {outputCurr ? (
                <>
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
                </>
              ) : (
                <Typography variant="h4" gutterBottom>
                  select output and input currencies
                </Typography>
              )}
              <Grid container spacing={2} style={{ marginTop: "1rem" }}>
                <Grid item sm={1} xs={1} style={{ textAlign: "center" }}>
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
                    <Select labelId="input-curr" onChange={handleInpCurr}>
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
