import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BreadCrumbs from "../shared/Breadcrumbs";

const useStyles = makeStyles((theme) => ({
  countryContainer: {
    marginTop: theme.spacing(3),
  },
  cardMedia: {
    height: 200,
  },
  flag:{
    width: "100%",
    height: "250px",
    objectFit: "contain",
    objectPosition: "center",
  },
  cardTitle: {
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
  },
  mapImage: {
    cursor: "pointer",
  },
  foodCard: {
    marginTop: theme.spacing(3),
  },
}));

const Country = ({ updateHeader }) => {
  const location = useLocation();
  const {
    name,
    area,
    population,
    region,
    capital,
    flags,
    currencies,
    languages,
    images,
    coatOfArms,
    latlng,
    maps,
  } = location.state;
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [unsplashImages, setUnsplashImages] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    updateHeader(
      <BreadCrumbs
        crumbs={[{ path: "/", title: "Countries" }, { title: name.common }]}
      />
    );
  }, [name.common, updateHeader]);

  useEffect(() => {
    const fetchImages = async () => {
      const ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
      setLoading(true);
      setError(false);

      try {
        const response = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              query: name.common,
              per_page: 3,
            },
            headers: {
              Authorization: `Client-ID ${ACCESS_KEY}`,
            },
          }
        );

        setUnsplashImages(response.data.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (!name.common) return;
    fetchImages();
  }, [name.common]);

  const { googleMaps } = maps;
  const { foods } = images;

  return (
    <Box className={classes.countryContainer}>
      <Typography variant="h3">{name.common}</Typography>
      <Typography variant="h5" gutterBottom>
        An introduction to the country of {name.common}
      </Typography>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography variant="body1">Error</Typography>
        ) : (
          unsplashImages.map((image, index) => (
            <Grid item key={index} xs={12} md={4}>
              <Card>
                <CardMedia
                  className={classes.cardMedia}
                  image={image.urls.small}
                  title={image.alt_description}
                  onClick={() => window.open(image.urls.full, "_blank")}
                />
              </Card>
            </Grid>
          ))
        )}
      </Grid>
      <Typography variant="body2">
        Source:{" "}
        <Link
          href="https://unsplash.com/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Unsplash
        </Link>
      </Typography>
      <hr />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h4" className={classes.cardTitle}>
                Flag
              </Typography>
              <CardMedia
                className={classes.flag}
                image={flags.png}
                title={`${name.common} Flag`}
              />
            </CardContent>
          </Card>
        </Grid>
        {coatOfArms.png && (
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h4" className={classes.cardTitle}>
                  Coat of Arms
                </Typography>
                <CardMedia
                  className={classes.flag}
                  image={coatOfArms.png}
                  title={`${name.common} Coat of Arms`}
                />
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
      <hr />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h4" className={classes.cardTitle}>
                Details
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <ul>
                    <li>
                      <strong>Region:</strong> {region}
                    </li>
                    <li>
                      <strong>Capital:</strong> {capital}
                    </li>
                    <li>
                      <strong>Area:</strong> {area}
                    </li>
                    <li>
                      <strong>Population:</strong> {population}
                    </li>
                  </ul>
                </Grid>
                <Grid item xs={12} md={6}>
                  <ul>
                    <li>
                      <strong>Languages:</strong>{" "}
                      {languages ? Object.values(languages).join(", ") : "N/A"}
                    </li>
                    <li>
                      <strong>Currencies:</strong>{" "}
                      {currencies
                        ? Object.values(currencies).map(
                            (currency) => currency.name
                          )
                        : "N/A"}
                    </li>
                  </ul>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <hr />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h4" className={classes.cardTitle}>
                Map of {name.common}
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                Click on the image to open Google Maps
              </Typography>
              <img
                src={`https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/geojson(%7B%22type%22%3A%22Point%22%2C%22coordinates%22%3A%5B${latlng[1]}%2C${latlng[0]}%5D%7D)/${latlng[1]},${latlng[0]},4,0/600x400?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                alt="Map of the country"
                className={classes.mapImage}
                onClick={() => {
                  window.open(googleMaps);
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.foodCard}>
            <CardContent>
              <Typography variant="h4" className={classes.cardTitle}>
                Popular Food
              </Typography>
              <Grid container spacing={2}>
                {foods.map((food, index) => (
                  <Grid item key={index} xs={12} md={4}>
                    <Card>
                      <CardMedia
                        component="img"
                        image={food}
                        title={name.common}
                      />
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Typography variant="body2" color="textSecondary">
                Source:{" "}
                <Link
                  href="https://www.chefspencil.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chefspencil
                </Link>
                ,{" "}
                <Link
                  href="https://unsplash.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Unsplash
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Country;
