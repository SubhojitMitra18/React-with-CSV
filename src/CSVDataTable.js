import React, { useState } from "react";

const CSVDataTable = ({ data }) => {
  const [grades, setGrades] = useState({}); // State to store grades
  const [searchText, setSearchText] = useState(""); // State to store search text

  const headers = ["student_id", "final_grade"]; // Include only these two columns

  const getMarkColor = (mark) => {
    mark = parseFloat(mark);
    if (mark >= 90) return "#008000"; // Green
    if (mark >= 70) return "#0000FF"; // Blue
    if (mark >= 50) return "#FFA500"; // Orange
    return "#FF0000"; // Red
  };

  const handleGradeChange = (rowIndex, newValue) => {
    // Update the grades state when a slider changes
    setGrades({
      ...grades,
      [rowIndex]: newValue,
    });
  };

  const filteredData = data.filter((row) =>
    row["student_id"].toLowerCase().includes(searchText.toLowerCase())
  );

  const searchBoxStyle = {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "10px",
    width: "100%",
    fontSize: "16px",
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search student_id"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={searchBoxStyle}
      />
      {data.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index} style={tableHeaderStyle}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {headers.map((header, columnIndex) => (
                  <td
                    key={columnIndex}
                    style={{
                      ...tableCellStyle,
                      backgroundColor:
                        header === "final_grade"
                          ? getMarkColor(grades[rowIndex] || row[header])
                          : "#fff",
                    }}
                  >
                    {header === "final_grade" ? (
                      <div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="1"
                          value={grades[rowIndex] || row[header]}
                          onChange={(e) =>
                            handleGradeChange(rowIndex, e.target.value)
                          }
                        />
                        <span style={{ marginLeft: "10px" }}>
                          {grades[rowIndex] || row[header]}
                        </span>
                      </div>
                    ) : (
                      row[header]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

const tableStyle = {
  borderCollapse: "collapse",
  width: "100%",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "40px 90px 55px -20px rgba(155, 184, 243, 0.2)",
};

const tableHeaderStyle = {
  fontSize: "14px",
  fontWeight: 500,
  color: "#ffffff",
  backgroundColor: "#6D95E0",
  borderBottom: "1px solid #ddd",
  padding: "15px",
  textAlign: "left",
};

const tableCellStyle = {
  fontSize: "14px",
  fontWeight: 500,
  borderBottom: "1px solid #ddd",
  padding: "15px",
  backgroundColor: "#fff",
};

export default CSVDataTable;
