const XLSX = require('xlsx');

const cruzarDatos = () => {
  // Leer el archivo Excel
  const excelRoute = "./excelData.xlsx"
  const workbook = XLSX.readFile(excelRoute);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // Obtener datos del archivo Excel
  const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  // Obtener datos del archivo JSON
  const jsonRoute = "./data.json"
  const jsonData = require(jsonRoute);

  const combinedData = [];

  jsonData.EMPRESAS.forEach((company) => {
    company.AREAS.forEach((area) => {
      const trabajadores = [];

      excelData.slice(1).forEach((row) => {
        const idEmpresaExcel = row[0].toString();
        const idAreaExcel = row[1].toString();

        if (company.ID_EMPRESA.toString() === idEmpresaExcel && area.ID_AREA === idAreaExcel) {
          trabajadores.push({
            RUT_TRABAJADOR: row[2],
            NOMBRE_TRABAJADOR: row[3],
            EDAD: row[4],
            PROFESION: row[5],
            CARGO: row[6],
          });
        }
      });

      combinedData.push({
        ID_EMPRESA: company.ID_EMPRESA,
        NOMBRE_EMPRESA: company.NOMBRE_EMPRESA,
        ID_AREA: area.ID_AREA,
        NOMBRE_AREA: area.NOMBRE_AREA,
        TRABAJADORES: trabajadores,
      });
    });
  });

  return { EMPRESAS_COMBINADAS: combinedData };
};

module.exports = cruzarDatos;
