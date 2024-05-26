import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BreadCrumbs from "../shared/Breadcrumbs";

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
    <div className="country container p-3 mt-3">
      <div className="row d-flex flex-column align-items-center text-dark">
        <h1>{name.common}</h1>
        <h4>An introduction to the country of {name.common}</h4>
        <div className="row img-div mt-3 p-3">
          {loading && <FontAwesomeIcon icon="spinner" spin />}
          {error && "Error"}
          {unsplashImages &&
            unsplashImages.map((image, index) => (
              <div
                className="col-lg-3 col-md-6 col-sm-12 text-center"
                key={image.id}
              >
                <img
                  src={image.urls.small}
                  alt={image.alt_description}
                  className="img-fluid mb-3"
                  onClick={() => window.open(image, "_blank")}
                />
              </div>
            ))}
        </div>
        <small>
          Source:{" "}
          <a
            href="https://unsplash.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            {" "}
            Unsplash{" "}
          </a>
        </small>
        <hr />
        <div className="row w-100 mt-3">
          <div
            className={`${
              coatOfArms.png ? "col-lg-6" : "col-lg-12"
            } col-md-6 col-sm-12`}
          >
            <div className="card">
              <div className="card-body text-center">
                <h4 className="card-title">Flag</h4>
                <img
                  src={flags.png}
                  alt=""
                  style={{ height: "180px" }}
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
          {coatOfArms.png && (
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="card">
                <div className="card-body text-center">
                  <h4 className="card-title">Coat of Arms</h4>
                  <img
                    src={coatOfArms.png}
                    alt="Not Found"
                    style={{ height: "180px" }}
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <hr />
        <div className="row w-100 mt-3 d-flex flew-row justify-content-center align-items-center h-100">
          <div className="col-md-12 col-lg-12 col-sm-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Details</h4>
                <div className="row">
                  <div className="col-lg-6 col-sm-12 col-md-12 col-xs-12">
                    <ul className="list-group">
                      <li className="list-group-item d-flex align-items-center">
                        <i className="bi bi-globe mr-2"></i>
                        <strong>Region:&nbsp;</strong> {region}
                      </li>
                      <li className="list-group-item d-flex align-items-center">
                        <i className="bi bi-building mr-2"></i>
                        <strong>Capital:&nbsp;</strong> {capital}
                      </li>
                      <li className="list-group-item d-flex align-items-center">
                        <i className="bi bi-geo-alt mr-2"></i>
                        <strong>Area:&nbsp;</strong> {area}
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-6 col-sm-12 col-md-12 col-xs-12">
                    <ul className="list-group">
                      <li className="list-group-item d-flex align-items-center">
                        <i className="bi bi-people mr-2"></i>
                        <strong>Population:&nbsp;</strong> {population}
                      </li>
                      <li className="list-group-item d-flex align-items-center">
                        <i className="bi bi-translate mr-2"></i>
                        <strong>Languages:&nbsp;</strong>{" "}
                        {languages
                          ? Object.values(languages)
                              .map((language) => language)
                              .join(", ")
                          : "N/A"}
                      </li>
                      <li className="list-group-item d-flex align-items-center">
                        <i className="bi bi-currency-dollar mr-2"></i>
                        <strong>Currencies:&nbsp;</strong>
                        {currencies
                          ? Object.values(currencies)
                              .map((currency) => currency.name)
                              .join(", ")
                          : "N/A"}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row w-100 d-flex align-items-center justify-content-center mt-3">
          <div className="col-md-6 col-lg-6 col-sm-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Map of {name.common}</h4>
                <p className="alert alert-info">
                  Click on the image to open Google Maps
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-sm-6">
            <div className="card p-3">
              <img
                src={`https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/geojson(%7B%22type%22%3A%22Point%22%2C%22coordinates%22%3A%5B${latlng[1]}%2C${latlng[0]}%5D%7D)/${latlng[1]},${latlng[0]},4,0/600x400?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                alt="N/A"
                onClick={() => {
                  window.open(googleMaps);
                }}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="card p-3">
            <div className="card-title">
              <h3 className="text-center">Popular Food</h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                  {foods.map((food, index) => (
                    <div className="col" key={index}>
                      <div className="card h-100" style={{ border: "none" }}>
                        <img src={food} className="card-img-top" alt="food" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <small className="float-right">
                Source:{" "}
                <a
                  href="https://www.chefspencil.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Chefspencil
                </a>
                ,{" "}
                <a
                  href="https://unsplash.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Unsplash
                </a>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Country;
