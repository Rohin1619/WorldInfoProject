import React, { useCallback, useEffect, useState } from "react";
import { REST_COUNTRIES_URL } from "../helpers/constants";
import useAxiosFetch from "../shared/useAxiosFetch";
import { Link, Route, useNavigate } from "react-router-dom";
import Country from "./Country";

const Countries = () => {
  const navigate = useNavigate();
  const [nameFilter, setNameFilter] = useState("");

  const { data, loading, error } = useAxiosFetch(
    REST_COUNTRIES_URL,
    {},
    0,
    false,
    true
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleNameFilter = useCallback((e) => {
    setNameFilter(e.target.value);
  }, []);

  const handleRowClick = useCallback((e, country) => {
    e.preventDefault();
    console.log(e.target, country);
    return navigate(`/${country.name.common}` , {state: country});
  });

  return (
    <div className="countries-main">
       
            <input type="text" placeholder="Search for a country" className="form-control mb-3 w-50" />
        

        <div className="row">
          <div className="col-12 border p-3">
            <table className=" table table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>Name</th>
                  <th>Capital</th>
                  <th>Continents</th>
                </tr>
                <tr>
                  <th>
                    <input
                      type="text"
                      placeholder="Name"
                      onChange={handleNameFilter}
                    />
                  </th>
                  <th />

                  <th />
                </tr>
              </thead>
              <tbody>
                {data &&
                  !loading &&
                  data
                    .filter((country) =>
                      country.name.common
                        .toLowerCase()
                        .includes(nameFilter.toLowerCase())
                    )
                    .map((country, index) => {
                      return (
                        <tr
                          key={index}
                          onClick={(e) => handleRowClick(e, country)}
                        >
                          <td>{country.name.common}</td>
                          <td>{country.capital}</td>
                          <td>{country.continents}</td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

  );
};

export default Countries;
