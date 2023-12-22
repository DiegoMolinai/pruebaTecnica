import React, { useState } from 'react';

const Company = ({ company }) => {
  const [activeArea, setActiveArea] = useState(null);

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
        className={`accordion-collapse collapse ${activeArea ? 'show' : ''}`}
        aria-labelledby={`headingEmpresa${company.ID_EMPRESA}`}
      >
        <div className="accordion-body">
          {company.AREAS.map((area) => (
            <div key={area.ID_AREA} className="accordion-item">
              <h2 className="accordion-header" id={`headingArea${area.ID_AREA}`}>
                <button
                  className={`accordion-button bg-success bg-opacity-50 ${activeArea === area.ID_AREA ? 'active' : ''}`}
                  type="button"
                  onClick={() => setActiveArea(activeArea === area.ID_AREA ? null : area.ID_AREA)}
                  aria-expanded={activeArea === area.ID_AREA ? 'true' : 'false'}
                  aria-controls={`collapseArea${area.ID_AREA}`}
                >
                  {`Área: ${area.NOMBRE_AREA} (ID: ${area.ID_AREA})`}
                </button>
              </h2>
              <div
                id={`collapseArea${area.ID_AREA}`}
                className={`accordion-collapse collapse ${activeArea === area.ID_AREA ? 'show' : ''}`}
                aria-labelledby={`headingArea${area.ID_AREA}`}
              >
                <div className="accordion-body">
                  {area.TRABAJADORES.length > 0 ? (
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>RUT</th>
                          <th>Nombre</th>
                          <th>Edad</th>
                          <th>Profesión</th>
                          <th>Cargo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {area.TRABAJADORES.map((trabajador) => (
                          <tr key={trabajador.RUT_TRABAJADOR}>
                            <td>{trabajador.RUT_TRABAJADOR}</td>
                            <td>{trabajador.NOMBRE_TRABAJADOR}</td>
                            <td>{trabajador.EDAD}</td>
                            <td>{trabajador.PROFESIÓN || 'N/A'}</td>
                            <td>{trabajador.CARGO}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No hay trabajadores en esta área</p>
                  )}
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
