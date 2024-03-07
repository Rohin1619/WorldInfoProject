import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import "./App.css"
import Countries from "./components/Countries";
import Breadcrumbs from "./shared/Breadcrumbs";
import Header from "./shared/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import Country from "./components/Country";

function App() {
  const location = useLocation();
  const [header, setHeader] = useState("");

  useEffect(() => {
    if (location.pathname === "/") {
      setHeader(<Breadcrumbs crumbs={[{ path: "/", title: "Countries" }]} />);
    }
  }, [location]);

  return (
    <div className="App">
      <div className="container-fluid p-3 border-bottom">
        <div className="row">
          <div className="col d-flex align-items-center">
            <FontAwesomeIcon icon={faGlobe} size="2x" className="mr-2" />
            <h5>World Info</h5>
          </div>
        </div>
      </div>
      <div className="container p-3">
        <div className="row">
          <Header title={header} />
        </div>
        <Routes>
          <Route path="/" element={<Countries />} />
          <Route path="/:name" element={<Country updateHeader={setHeader} />} />
        </Routes>
      </div>
     
    </div>
  );
}

export default App;
