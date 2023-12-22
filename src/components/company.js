import React from 'react';

const Company = ({ company }) => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={`headingEmpresa${company.ID_EMPRESA}`}>
        <button
          className="accordion-button bg-success bg-opacity-75"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapseEmpresa${company.ID_EMPRESA}`}
          aria-expanded="true"
          aria-controls={`collapseEmpresa${company.ID_EMPRESA}`}
        >
          {`Empresa: ${company.NOMBRE_EMPRESA} (ID: ${company.ID_EMPRESA})`}
        </button>
      </h2>
      <div
        id={`collapseEmpresa${company.ID_EMPRESA}`}
        className="accordion-collapse collapse"
        aria-labelledby={`headingEmpresa${company.ID_EMPRESA}`}
      >
        <div className="accordion-body">
          {/* Mostrar las áreas de la empresa */}
          {company.AREAS.map((area) => (
            <div key={area.ID_AREA} className="accordion-item">
              <h2 className="accordion-header" id={`headingArea${area.ID_AREA}`}>
                <button
                  className="accordion-button bg-success bg-opacity-50"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapseArea${area.ID_AREA}`}
                  aria-expanded="false"
                  aria-controls={`collapseArea${area.ID_AREA}`}
                >
                  {`Área: ${area.NOMBRE_AREA} (ID: ${area.ID_AREA})`}
                </button>
              </h2>
              <div
                id={`collapseArea${area.ID_AREA}`}
                className="accordion-collapse collapse"
                aria-labelledby={`headingArea${area.ID_AREA}`}
              >
                <div className="accordion-body">
                  Más información sobre el área aquí...
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Company;
