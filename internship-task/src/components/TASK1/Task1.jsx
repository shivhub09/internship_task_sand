// Task1.jsx
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import FileUpload from './FileUpload';
import SheetSelector from './SheetSelector';
import DataTable from './DataTable';
import './Task1.css';

const Task1 = () => {
  const [workbook, setWorkbook] = useState(null);
  const [sheets, setSheets] = useState([]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState('');
  const [parameters, setParameters] = useState([]);
  const [selectedParameter, setSelectedParameter] = useState('');
  const [selectedPlotType, setSelectedPlotType] = useState('');
  const [plotTypes, setPlotTypes] = useState([]);
  const [selectedWeeks, setSelectedWeeks] = useState([]);

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const wb = XLSX.read(binaryStr, { type: 'binary' });
      setWorkbook(wb);
      setSheets(wb.SheetNames);
      if (wb.SheetNames.length > 0) {
        handleSheetSelect(wb, wb.SheetNames[0]);
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleSheetSelect = (workbook, sheetName) => {
    setSelectedSheet(sheetName);
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    setData(jsonData);
    setFilteredData(jsonData);

    const uniqueParameters = [...new Set(jsonData.map(row => row.Parameters))];
    const uniquePlotTypes = [...new Set(jsonData.map(row => row.Week))];

    setParameters(uniqueParameters);
    setPlotTypes(uniquePlotTypes);
  };

  const applyFilters = (parameter, plotType, weeks) => {
    let filtered = data;
    if (parameter) {
      filtered = filtered.filter(row => row.Parameters === parameter);
    }
    if (plotType) {
      filtered = filtered.filter(row => row.Week === plotType);
    }
    if (weeks.length > 0) {
      filtered = filtered.filter(row => weeks.includes(row.Week));
    }
    setFilteredData(filtered);
  };

  const handleParameterSelect = (parameter) => {
    setSelectedParameter(parameter);
    applyFilters(parameter, selectedPlotType, selectedWeeks);
  };

  const handlePlotTypeSelect = (plotType) => {
    setSelectedPlotType(plotType);
    applyFilters(selectedParameter, plotType, selectedWeeks);
  };

  const handleWeekSelect = (week) => {
    let newSelectedWeeks = [...selectedWeeks];
    if (newSelectedWeeks.includes(week)) {
      newSelectedWeeks = newSelectedWeeks.filter(selectedWeek => selectedWeek !== week);
    } else {
      if (newSelectedWeeks.length < 2) {
        newSelectedWeeks.push(week);
      }
    }
    setSelectedWeeks(newSelectedWeeks);
    applyFilters(selectedParameter, selectedPlotType, newSelectedWeeks);
  };

  const handleReset = () => {
    setSelectedParameter('');
    setSelectedPlotType('');
    setSelectedWeeks([]);
    setFilteredData(data);
  };

  return (
    <div className="app-container">
      <h1 className="header">Excel Data Viewer</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      {sheets.length > 0 && (
        <div className="selector-container">
          <SheetSelector sheets={sheets} onSheetSelect={(sheetName) => handleSheetSelect(workbook, sheetName)} />
          {parameters.length > 0 && (
            <>
              <select
                className="select"
                value={selectedParameter}
                onChange={(e) => handleParameterSelect(e.target.value)}
              >
                <option value="">Select Parameter</option>
                {parameters.map((parameter, index) => (
                  <option key={index} value={parameter}>
                    {parameter}
                  </option>
                ))}
              </select>

              <select
                className="select"
                value={selectedPlotType}
                onChange={(e) => handlePlotTypeSelect(e.target.value)}
              >
                <option value="">Select Plot</option>
                {plotTypes.map((plotType, index) => (
                  <option key={index} value={plotType}>
                    {plotType}
                  </option>
                ))}
              </select>

              <select
                className="select"
                multiple
                value={selectedWeeks}
                onChange={(e) => handleWeekSelect(e.target.value)}
              >
                <option value="">Select Plot</option>
                {plotTypes.map((week, index) => (
                  <option key={index} value={week}>
                    {week}
                  </option>
                ))}
              </select>

              <button className="reset-button" onClick={handleReset}>Reset Filters</button>
            </>
          )}
        </div>
      )}
      <DataTable data={filteredData} />
    </div>
  );
};

export default Task1;
