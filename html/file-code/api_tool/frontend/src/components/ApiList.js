// frontend/src/components/ApiList.js
import React from 'react';

const ApiList = ({ apis, onApiDelete, onApiEdit }) => {
    return (
        <div>
            <h2>API List</h2>
            {apis.length === 0 ? (
                <p>No apis added</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>URL</th>
                            <th>Method</th>
                            <th>Fields</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {apis.map((api) => (
                            <tr key={api._id}>
                                <td>{api.name}</td>
                                <td>{api.url}</td>
                                <td>{api.method}</td>
                                <td>
                                    {api.fields &&
                                        api.fields.map((field, index) => (
                                            <div key={index}>
                                                <p>
                                                    <strong>{field.name}</strong> ({field.type}){' '}
                                                    {field.required ? '(required)' : ''}
                                                </p>
                                                {field.description && <small>{field.description}</small>}
                                            </div>
                                        ))}
                                </td>
                                <td>
                                    <button onClick={() => onApiEdit(api)}>Edit</button>
                                    <button onClick={() => onApiDelete(api._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ApiList;