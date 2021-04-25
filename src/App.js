import React, { useState, useEffect } from "react";
import axios from "./axios";
import {
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
  },
  nav: {
    height: "4rem",
  },
  paper: {
    padding: "1rem",
    minHeight: "250px",
    boxShadow: "0 0 20px #00000040",
  },
  margin: {
    //width: "90%",
    //minWidth: "120px",
  },
}));

function App() {
  const classes = useStyles();
  const [currencies, setCurrencies] = useState([]);
  /*
  useEffect(() => {
    axios.get("/api/v7/countries?apiKey=26ecc25bbf96165524d3").then((res) => {
      console.log("usd->inr", res.data.results);
      //getting all currencies for selecting
      setCurrencies(Object.entries(res.data.results));
    });
  }, []);*/

  const handleChange = (event) => {
    //setAge(event.target.value);
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
                1 Indian Rupee equials
              </Typography>
              <Typography variant="h4" gutterBottom>
                0.013 United State Dollar
              </Typography>
              <Typography
                variant="subtitle2"
                gutterBottom
                style={{ color: "gray" }}
              >
                {new Date().toLocaleString()}
              </Typography>
              <Grid container spacing={2} style={{ marginTop: "1rem" }}>
                <Grid item sm={6} xs={5}>
                  <TextField
                    label="input value"
                    type="number"
                    variant="outlined"
                  />
                </Grid>
                <Grid item sm={6} xs={7}>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    className={classes.margin}
                  >
                    <InputLabel id="input-curr">Currency</InputLabel>
                    <Select
                      labelId="input-curr"
                      id="demo-customized-select"
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item sm={6} xs={5}>
                  <TextField label="output" variant="outlined" disabled />
                </Grid>
                <Grid item sm={6} xs={7}>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    className={classes.margin}
                  >
                    <InputLabel id="input-curr">Currency</InputLabel>
                    <Select
                      labelId="input-curr"
                      id="demo-customized-select"
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
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
      {/*currencies.map((c) => console.log(c[1]))*/}
    </Paper>
  );
}

export default App;
