import React from 'react';
import './SheetSelector.css'; 

const SheetSelector = ({ sheets, onSheetSelect }) => (
  <select className="select" onChange={(e) => onSheetSelect(e.target.value)}>
    {sheets.map((sheet, index) => (
      <option key={index} value={sheet}>
        {sheet}
      </option>
    ))}
  </select>
);

export default SheetSelector;
