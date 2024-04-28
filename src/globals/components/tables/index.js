import React from 'react';

const Table = ({ headers, data, handleUpdate, handleDelete, isAction }) => {
  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            {headers.map((header, index) => (
              <th key={index}>{header.label}</th>
            ))}
            {isAction && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{rowIndex + 1}</td>
              {headers.map((header, cellIndex) => (
                <td key={cellIndex}>{row[header.var]}</td>
              ))}
              {isAction && (
                <td>
                  <button className="btn btn-primary" onClick={() => handleUpdate(row)}>
                    Ubah
                  </button>
                  <button className="btn btn-danger ms-2" onClick={() => handleDelete(row)}>
                    Hapus
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
