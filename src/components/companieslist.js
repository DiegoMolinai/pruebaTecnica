import React from 'react';
import Company from './company';
import companiesData from '../data/combinedData.json';

const CompaniesLists = () => {
  return (
    <div className="accordion" id="companiesAccordion">
      {companiesData.EMPRESAS.map((company) => (
        <Company key={company.ID_EMPRESA} company={company} />
      ))}
    </div>
  );
};

export default CompaniesLists;
