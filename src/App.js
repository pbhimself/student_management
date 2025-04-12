import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";
import MarksheetPage from "./MarksheetPage";
import Sidebar from "./Sidebar";

const App = () => {
  const [uploadedData, setUploadedData] = useState({});

  // ✅ Function to update uploaded marks
  const handleUpload = (className, division, subject, marks) => {
    const classKey = `${className} ${division}`;
    setUploadedData((prevData) => ({
      ...prevData,
      [classKey]: { ...prevData[classKey], [subject]: marks },
    }));
  };

  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar uploadedData={uploadedData} />
        <div style={{ flexGrow: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<LandingPage onUpload={handleUpload} />} />
            <Route path="/marksheet/:classDivision/:subject" element={<MarksheetPage uploadedData={uploadedData} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
