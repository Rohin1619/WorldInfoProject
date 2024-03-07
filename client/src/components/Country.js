import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import BreadCrumbs from "../shared/Breadcrumbs";

const Country = ({ updateHeader }) => {
  const location = useLocation();

  useEffect(() => {
    updateHeader(
      <BreadCrumbs
        crumbs={[{ path: "/", title: "Countries" }, { title: name.common }]}
      />
    );
  }, []);

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

  const { googleMaps } = maps;
  const { bgImg, otherImg } = images;

  return (
    <div className="country container p-3 mt-3">
      <div className="row d-flex flex-column align-items-center text-dark">
        <h1>{name.common}</h1>
        <h4>An introduction to the country of {name.common}</h4>
        <div className="row img-div mt-3 p-3">
          {otherImg &&
            otherImg.map((image, index) => (
              <div
                className="col-lg-3 col-md-6 col-sm-12 text-center"
                key={index}
              >
                <img src={image} alt="" className="img-fluid mb-3" />
              </div>
            ))}
        </div>
        <hr />
        <div className="row w-100 mt-3">
          <div className="col-lg-6 col-md-6 col-sm-12">
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
                        {Object.values(languages)
                          .map((language) => language)
                          .join(", ")}
                      </li>
                      <li className="list-group-item d-flex align-items-center">
                        <i className="bi bi-currency-dollar mr-2"></i>
                        <strong>Currencies:&nbsp;</strong>
                        {Object.values(currencies)
                          .map((currency) => currency.name)
                          .join(", ")}
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
                alt=""
                onClick={() => {
                  window.open(googleMaps);
                }}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Country;
