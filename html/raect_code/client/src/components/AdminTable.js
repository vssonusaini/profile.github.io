import React from 'react';

const AdminTable = ({ data, columns, onEdit, onDelete, onMakeAdmin }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={column}>{item[column]}</td>
            ))}
            <td>
              {onEdit && <button onClick={() => onEdit(item)}>Edit</button>}
              {onDelete && <button onClick={() => onDelete(item._id)}>Delete</button>}
               {onMakeAdmin &&  <button onClick={() => onMakeAdmin(item._id)}>Make Admin</button>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminTable;