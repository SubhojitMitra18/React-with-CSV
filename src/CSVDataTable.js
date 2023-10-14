import React from "react";

const CSVDataTable = ({ data }) => {
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  const getMarkColor = (mark) => {
    mark = parseFloat(mark);
    if (mark >= 90) return "#008000"; // Green
    if (mark >= 70) return "#0000FF"; // Blue
    if (mark >= 50) return "#FFA500"; // Orange
    return "#FF0000"; // Red
  };

  return (
    <>
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
          {data.map((row, index) => (
              <tr key={index}>
                {headers.map((header, columnIndex) => (
                  <td
                    key={columnIndex}
                    style={{
                      ...tableCellStyle,
                      backgroundColor:
                        header === "final_grade" ? getMarkColor(row[header]) : "#fff",
                    }}
                  >
                    {row[header]}
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