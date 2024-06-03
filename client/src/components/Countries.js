import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import "motion-ui/dist/motion-ui.min.css";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMAGES } from "../helpers/constants";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "20px",
  },
  searchBox: {
    marginBottom: "20px",
  },
  filterButtons: {
    marginBottom: "20px",
    display: "flex",
    justifyContent: "center",
  },
  button: {
    margin: "0 10px",
  },
  countryCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "250px",
    width: "100%",
    transition: "transform 0.2s",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  flag: {
    width: "100%",
    height: "140px",
    objectFit: "contain",
  },
}));

const Countries = ({ data, loading }) => {
  const navigate = useNavigate();
  const [nameFilter, setNameFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState("All");
  const [countriesData, setCountriesData] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    if (data && !loading) {
      setCountriesData(
        data.sort((a, b) => a.name.common.localeCompare(b.name.common))
      );
    }
  }, [data, loading]);

  useEffect(() => {
    if (data && !loading) {
      setCountriesData((prevData) =>
        prevData.map((country, index) => ({
          ...country,
          images: IMAGES[index],
        }))
      );
    }
  }, [data, loading]);

  const handleNameFilter = useCallback((e) => {
    setNameFilter(e.target.value);
  }, []);

  const handleRowClick = useCallback(
    (e, country) => {
      e.preventDefault();
      return navigate(`/${country.name.common}`, { state: country });
    },
    [navigate]
  );

  const region = useMemo(
    () => [
      "Africa",
      "Americas",
      "Asia",
      "Europe",
      "Oceania",
      "Antarctic",
      "All",
    ],
    []
  );
  return (
    <Box className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} display="flex" justifyContent="space-between">
          <TextField
            variant="outlined"
            placeholder="Search for a country"
            fullWidth
            className={classes.searchBox}
            onChange={handleNameFilter}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" className="font-weight-bold">
            Filter by
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.filterButtons}>
          {region.map((region, index) => (
            <Button
              key={index}
              variant={regionFilter === region ? "contained" : "outlined"}
              color="primary"
              className={classes.button}
              onClick={() => setRegionFilter(region)}
            >
              {region}
            </Button>
          ))}
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {!loading &&
              countriesData.length > 0 &&
              countriesData
                .filter((country) =>
                  country.name.common
                    .toLowerCase()
                    .includes(nameFilter.toLowerCase())
                )
                .filter(
                  (country) =>
                    regionFilter === "All" || country.region === regionFilter
                )
                .sort((a, b) => a.name.common.localeCompare(b.name.common))
                .map((country, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <Card
                      className={classes.countryCard}
                      onClick={(e) => handleRowClick(e, country)}
                    >
                      <CardMedia
                        component="img"
                        image={country.flags.png}
                        alt={`Flag of ${country.name.common}`}
                        className={classes.flag}
                      />
                      <CardContent>
                        <Typography variant="h6" component="div">
                          {country.name.common}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Population: {country.population.toLocaleString()}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Countries;
