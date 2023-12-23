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
          <div className="flex flex-col mb-3">
            <button className="btn btn-primary mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Agregar Área
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Formulario Área</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="mb-3">
                        <label htmlFor="ID_EMPRESA" className="form-label">ID Empresa</label>
                        <input
                          type="text"
                          className="form-control"
                          name="ID_EMPRESA"
                          placeholder="ID Empresa"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="ID_AREA" className="form-label">ID Área</label>
                        <input
                          type="text"
                          className="form-control"
                          name="ID_AREA"
                          placeholder="ID Área"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="NOMBRE_AREA" className="form-label">Nombre Área</label>
                        <input
                          type="text"
                          className="form-control"
                          name="NOMBRE_AREA"
                          placeholder="Nombre Área"
                        />
                      </div>
                      {/* Otros campos del área */}
                      <button type="submit" className="btn btn-primary">Agregar Área</button>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" className="btn btn-primary">Guardar Cambios</button>
                  </div>
                </div>
              </div>
            </div>
            <button className="btn btn-success mx-2">
              Editar Área
            </button>
            <button className="btn btn-danger mx-2">
              Borrar Área
            </button>
          </div>
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
                    <div>
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
                      <div className="flex flex-col">
                        <button className="btn btn-primary mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                          Agregar Trabajador
                        </button>

                        <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Formulario Trabajador</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body">
                                <form>
                                  <div className="mb-3">
                                    <label htmlFor="ID_EMPRESA" className="form-label">ID Empresa</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="ID_EMPRESA"
                                      placeholder="ID Empresa"
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label htmlFor="ID_AREA" className="form-label">ID Área</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="ID_AREA"
                                      placeholder="ID Área"
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label htmlFor="RUT_TRABAJADOR" className="form-label">RUT Trabajador</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="RUT_TRABAJADOR"
                                      placeholder="RUT Trabajador"
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label htmlFor="NOMBRE_TRABAJADOR" className="form-label">Nombre Trabajador</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="NOMBRE_TRABAJADOR"
                                      placeholder="Nombre Trabajador"
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label htmlFor="EDAD" className="form-label">Edad</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="EDAD"
                                      placeholder="Edad"
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label htmlFor="PROFESION" className="form-label">Profesión</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="PROFESION"
                                      placeholder="Profesión"
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label htmlFor="CARGO" className="form-label">Cargo</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="CARGO"
                                      placeholder="Cargo"
                                    />
                                  </div>
                                  {/* Otros campos del trabajador */}
                                  <button type="button" className="btn btn-primary">Agregar Trabajador</button>
                                </form>
                              </div>
                              <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" className="btn btn-primary">Guardar Cambios</button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button className="btn btn-success mx-2">
                          Editar Trabajador
                        </button>
                        <button className="btn btn-danger mx-2">
                          Borrar Trabajador
                        </button>
                      </div>
                    </div>

                  ) : (
                    // Mensaje si no hay trabajadores en esta área
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
