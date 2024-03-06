import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../shared/Header";
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

  const { name, population, region, capital, flags, currencies, languages } =
    location.state;
  return (
    <div className="country">
      <h1>{name.common}</h1>
      <p>population: {population}</p>
      <p>region: {region}</p>
      <p>capital: {capital}</p>
      <img src={flags.png} alt="flag" />
    </div>
  );
};
export default Country;
