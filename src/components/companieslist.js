import React, { useState, useEffect } from 'react';
import Company from './company.js';

const CompaniesLists = () => {
  const [companiesData, setCompaniesData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/data")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCompaniesData(data);
      })
      .catch(error => console.error('Error al obtener datos:', error));
  }, []);

  return (
    <div>
      <div className="accordion" id="companiesAccordion">
        {companiesData && companiesData.map((company) => (
          <Company
            key={company.ID_EMPRESA}
            company={company}
          />
        ))}
      </div>
    </div>
  );
};

export default CompaniesLists;
