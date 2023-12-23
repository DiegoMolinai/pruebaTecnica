// dataProcessing.js

const XLSX = require('xlsx');
const jsonData = require('./data.json');

function processFiles() {
  // Ruta al archivo Excel
  const excelRoute = './excelData.xlsx';
  const workbook = XLSX.readFile(excelRoute);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  // Función para combinar datos y eliminar duplicados basados en el nombre del trabajador
  const combinedData = [];

  jsonData.EMPRESAS.forEach((company) => {
    const uniqueWorkers = new Map();
    const trabajadores = [];

    excelData.slice(1).forEach((row) => {
      const idEmpresaExcel = row[0].toString();
      const idAreaExcel = row[1].toString();

      if (company.ID_EMPRESA.toString() === idEmpresaExcel && company.AREAS.find(area => area.ID_AREA === idAreaExcel)) {
        const workerName = row[3];

        if (!uniqueWorkers.has(workerName)) {
          uniqueWorkers.set(workerName, {
            RUT_TRABAJADOR: row[2],
            NOMBRE_TRABAJADOR: workerName,
            EDAD: row[4],
            PROFESION: row[5],
            CARGO: row[6]
            // ... otros campos del trabajador
          });
        }
      }
    });

    uniqueWorkers.forEach((value) => {
      trabajadores.push(value);
    });

    combinedData.push({
      ID_EMPRESA: company.ID_EMPRESA,
      NOMBRE_EMPRESA: company.NOMBRE_EMPRESA,
      AREAS: company.AREAS.map(area => ({
        ID_AREA: area.ID_AREA,
        NOMBRE_AREA: area.NOMBRE_AREA,
        TRABAJADORES: trabajadores.filter(trabajador => {
          return excelData.some(row => {
            return (
              row[0].toString() === company.ID_EMPRESA.toString() &&
              row[1].toString() === area.ID_AREA &&
              row[3] === trabajador.NOMBRE_TRABAJADOR
            );
          });
        })
      }))
    });
  });

  return combinedData;
}
function createCompany(newCompanyData) {
  const newCompany = {
    ID_EMPRESA: generateUniqueId(), // Generar un ID único para la nueva empresa
    ...newCompanyData,
    AREAS: [] // Inicializar sin áreas
  };
  combinedData.push(newCompany);
  return newCompany;
}

function updateCompany(companyId, updatedCompanyData) {
  const index = combinedData.findIndex(company => company.ID_EMPRESA === companyId);
  if (index !== -1) {
    combinedData[index] = {
      ...combinedData[index],
      ...updatedCompanyData
    };
    return combinedData[index];
  }
  return null; // Empresa no encontrada
}

function deleteCompany(companyId) {
  combinedData = combinedData.filter(company => company.ID_EMPRESA !== companyId);
}

function createArea(companyId, newAreaData) {
  const company = combinedData.find(company => company.ID_EMPRESA === companyId);
  if (company) {
    const newArea = {
      ID_AREA: generateUniqueId(), // Generar un ID único para el área
      ...newAreaData,
      TRABAJADORES: [] // Inicializar sin trabajadores
    };
    company.AREAS.push(newArea);
    return newArea;
  }
  return null; // Empresa no encontrada
}

function updateArea(companyId, areaId, updatedAreaData) {
  const company = combinedData.find(company => company.ID_EMPRESA === companyId);
  if (company) {
    const area = company.AREAS.find(area => area.ID_AREA === areaId);
    if (area) {
      Object.assign(area, updatedAreaData);
      return area;
    }
  }
  return null; // Empresa o área no encontrada
}

function deleteArea(companyId, areaId) {
  const company = combinedData.find(company => company.ID_EMPRESA === companyId);
  if (company) {
    company.AREAS = company.AREAS.filter(area => area.ID_AREA !== areaId);
  }
}

function createWorker(companyId, areaId, newWorkerData) {
  const company = combinedData.find(company => company.ID_EMPRESA === companyId);
  if (company) {
    const area = company.AREAS.find(area => area.ID_AREA === areaId);
    if (area) {
      const newWorker = {
        RUT_TRABAJADOR: generateUniqueId(), // Generar un ID único para el trabajador
        ...newWorkerData
      };
      area.TRABAJADORES.push(newWorker);
      return newWorker;
    }
  }
  return null; // Empresa o área no encontrada
}

function updateWorker(companyId, areaId, workerId, updatedWorkerData) {
  const company = combinedData.find(company => company.ID_EMPRESA === companyId);
  if (company) {
    const area = company.AREAS.find(area => area.ID_AREA === areaId);
    if (area) {
      const worker = area.TRABAJADORES.find(worker => worker.RUT_TRABAJADOR === workerId);
      if (worker) {
        Object.assign(worker, updatedWorkerData);
        return worker;
      }
    }
  }
  return null; // Empresa, área o trabajador no encontrado
}

function deleteWorker(companyId, areaId, workerId) {
  const company = combinedData.find(company => company.ID_EMPRESA === companyId);
  if (company) {
    const area = company.AREAS.find(area => area.ID_AREA === areaId);
    if (area) {
      area.TRABAJADORES = area.TRABAJADORES.filter(worker => worker.RUT_TRABAJADOR !== workerId);
    }
  }
}

module.exports = {
  processFiles,
  createCompany,
  updateCompany,
  deleteCompany,
  createArea,
  updateArea,
  deleteArea,
  createWorker,
  updateWorker,
  deleteWorker,
};