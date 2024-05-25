import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMAGES, REST_COUNTRIES_URL } from "../helpers/constants";
import useAxiosFetch from "../shared/useAxiosFetch";

const Countries = () => {
  const navigate = useNavigate();
  const [nameFilter, setNameFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState("All");
  const [countriesData, setCountriesData] = useState([]);

  const { data, loading } = useAxiosFetch(
    REST_COUNTRIES_URL,
    {}, 
    0,
    false,
    true
  );

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

  useEffect(() => {
    console.log(countriesData);
  }, [countriesData]);

  const handleNameFilter = useCallback((e) => {
    setNameFilter(e.target.value);
  }, []);

  const handleRowClick = useCallback((e, country) => {
    e.preventDefault();
    return navigate(`/${country.name.common}`, { state: country });
  }, [navigate]);

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
    <div className="countries-main">
      <div className="row">
        <input
          type="text"
          placeholder="Search for a country"
          className="form-control mb-3 w-50"
          onChange={handleNameFilter}
        />
      </div>
      <div className="row">
        <h5 className="font-weight-bold">Filter by</h5>
      </div>
      <div className="row">
        {region.map((region, index) => {
          return (
            <button
              key={index}
              className="btn m-2"
              onClick={() => setRegionFilter(region)}
            >
              {region}
            </button>
          );
        })}
      </div>
      <div className="row">
        <ul>
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
              .map((country, index) => {
                return (
                  <li
                    key={index}
                    className="list-group-item"
                    onClick={(e) => handleRowClick(e, country)}
                  >
                    <div className="d-flex flex-row align-items-center  m-2">
                      <img
                        src={country.flags.png}
                        alt="flag"
                        className="flag mr-2"
                        height={50}
                        width={50}
                      />
                      <p>
                        <span className="font-weight-bold">
                          {country.name.common} {index + 1}
                        </span>{" "}
                        <br />
                        <span>Population: {country.population}</span>
                      </p>
                    </div>
                  </li>
                );
              })}
        </ul>
      </div>
    </div>
  );
};

export default Countries;
