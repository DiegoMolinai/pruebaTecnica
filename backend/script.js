// server.js

const express = require('express');
const cors = require('cors');
const dataProcessing = require('./dataProcessing.js');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Obtener datos de empresas y áreas

let combinedData = dataProcessing.processFiles();

app.get('/api/data', (req, res) => {
    res.json(combinedData);
});

// Rutas para empresas
// Crea una nueva empresa

app.post('/api/companies', (req, res) => {
    const newCompany = req.body;
    const createdCompany = dataProcessing.createCompany(newCompany);
    combinedData = dataProcessing.processFiles();
    res.status(201).json(createdCompany);
});

// Actualiza una empresa existente

app.put('/api/companies/:companyId', (req, res) => {
    const companyId = req.params.companyId;
    const updatedCompany = req.body;
    const result = dataProcessing.updateCompany(companyId, updatedCompany);
    combinedData = dataProcessing.processFiles();
    if (result) {
        res.json(result);
    } else {
        res.status(404).send('Empresa no encontrada');
    }
});

// Elimina una empresa


app.delete('/api/companies/:companyId', (req, res) => {
    const companyId = req.params.companyId;
    dataProcessing.deleteCompany(companyId);
    combinedData = dataProcessing.processFiles();
    res.status(204).end();
});

// Rutas para áreas
// Crea una nueva área para una empresa específica

app.post('/api/companies/:companyId/areas', (req, res) => {
    const companyId = req.params.companyId;
    const newArea = req.body;
    const createdArea = dataProcessing.createArea(companyId, newArea);
    combinedData = dataProcessing.processFiles();
    res.status(201).json(createdArea);
});

// Crea un nuevo trabajador en un área específica de una empresa

app.post('/api/companies/:companyId/areas/:areaId/workers', (req, res) => {
    const companyId = req.params.companyId;
    const areaId = req.params.areaId;
    const newWorker = req.body;
    const createdWorker = dataProcessing.createWorker(companyId, areaId, newWorker);
    combinedData = dataProcessing.processFiles();
    res.status(201).json(createdWorker);
});

// Actualiza los detalles de un trabajador específico

app.put('/api/companies/:companyId/areas/:areaId/workers/:workerId', (req, res) => {
    const companyId = req.params.companyId;
    const areaId = req.params.areaId;
    const workerId = req.params.workerId;
    const updatedWorker = req.body;
    const result = dataProcessing.updateWorker(companyId, areaId, workerId, updatedWorker);
    combinedData = dataProcessing.processFiles();
    if (result) {
        res.json(result);
    } else {
        res.status(404).send('Trabajador no encontrado');
    }
});

// Elimina un trabajador específico de un área de una empresa

app.delete('/api/companies/:companyId/areas/:areaId/workers/:workerId', (req, res) => {
    const companyId = req.params.companyId;
    const areaId = req.params.areaId;
    const workerId = req.params.workerId;
    dataProcessing.deleteWorker(companyId, areaId, workerId);
    combinedData = dataProcessing.processFiles();
    res.status(204).end();
});
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
