import React from "react";
import CompaniesList from "./components/companieslist.js";

function App() {
  return (
    <div className="container mt-5">
      <header>
        <h1>Lista De Empresas:</h1>
      </header>
      <CompaniesList />
    </div>
  );
}

export default App;
