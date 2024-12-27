// frontend/src/components/ApiForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const ApiForm = ({ onApiAdded, isEdit, apiToEdit, onApiUpdated, onCancelEdit }) => {
    const [formData, setFormData] = useState({
        name: '',
        url: '',
        method: 'GET',
        fields: [],
    });
    const [fieldData, setFieldData] = useState({
        name: '',
        type: 'string',
        required: false,
        description: '',
    });
    const [fieldEditIndex, setFieldEditIndex] = useState(-1);
    const [errors, setErrors] = useState(null);

    const { name, url, method, fields } = formData;
    const { name: fieldName, type, required, description } = fieldData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onFieldChange = (e) =>
        setFieldData({ ...fieldData, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

    useEffect(() => {
        if (isEdit) {
            setFormData(apiToEdit);
        }
    }, [isEdit, apiToEdit]);

    const handleEditField = (field, index) => {
        setFieldData(field);
        setFieldEditIndex(index);
    };

    const handleAddField = () => {
        if (!fieldName) {
            setErrors({ field: 'Field name is required' });
            return;
        }

        setErrors(null);
        if (fieldEditIndex > -1) {
            const newFields = fields.map((f, index) => (index === fieldEditIndex ? fieldData : f));
            setFormData({ ...formData, fields: newFields });
            setFieldEditIndex(-1);
            setFieldData({
                name: '',
                type: 'string',
                required: false,
                description: '',
            });
            return;
        }

        setFormData({ ...formData, fields: [...fields, fieldData] });
        setFieldData({
            name: '',
            type: 'string',
            required: false,
            description: '',
        });
    };

    const handleDeleteField = (fieldIndex) => {
        setFormData({ ...formData, fields: fields.filter((_, index) => index !== fieldIndex) });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrors(null);
        try {
            if (isEdit) {
                const updatedApi = await axios.put(`${apiUrl}/api/apis/${apiToEdit._id}`, formData);
                onApiUpdated(updatedApi.data);
                onCancelEdit();
            } else {
                const newApi = await axios.post(`${apiUrl}/api/apis`, formData);
                onApiAdded(newApi.data);
            }

            setFormData({
                name: '',
                url: '',
                method: 'GET',
                fields: [],
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({ submit: error.message });
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <h2>{isEdit ? 'Edit API' : 'Add New API'}</h2>
            {errors && errors.submit && <div className="error">{errors.submit}</div>}

            <div>
                <label htmlFor="name">API Name</label>
                <input type="text" name="name" value={name} onChange={onChange} required />
            </div>
            <div>
                <label htmlFor="url">URL</label>
                <input type="text" name="url" value={url} onChange={onChange} required />
            </div>
            <div>
                <label htmlFor="method">Method</label>
                <select name="method" value={method} onChange={onChange}>
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                </select>
            </div>
            <div>
                <h3>Fields</h3>
                {errors && errors.field && <div className="error">{errors.field}</div>}
                <div>
                    <label htmlFor="fieldName">Field Name</label>
                    <input type="text" name="name" value={fieldName} onChange={onFieldChange} />
                </div>
                <div>
                    <label htmlFor="type">Field Type</label>
                    <select name="type" value={type} onChange={onFieldChange}>
                        <option value="string">String</option>
                        <option value="number">Number</option>
                        <option value="boolean">Boolean</option>
                        <option value="object">Object</option>
                        <option value="array">Array</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="required">Required</label>
                    <input type="checkbox" name="required" checked={required} onChange={onFieldChange} />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea name="description" value={description} onChange={onFieldChange} />
                </div>
                <button type="button" onClick={handleAddField}>
                    {fieldEditIndex > -1 ? 'Update Field' : 'Add Field'}
                </button>
                {fieldEditIndex > -1 && (
                    <button
                        type="button"
                        onClick={() => {
                            setFieldEditIndex(-1);
                            setFieldData({ name: '', type: 'string', required: false, description: '' });
                        }}
                    >
                        Cancel
                    </button>
                )}
            </div>
            {fields.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Required</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fields.map((field, index) => (
                            <tr key={index}>
                                <td>{field.name}</td>
                                <td>{field.type}</td>
                                <td>{field.required ? 'Yes' : 'No'}</td>
                                <td>{field.description}</td>
                                <td>
                                    <button type="button" onClick={() => handleEditField(field, index)}>
                                        Edit
                                    </button>
                                    <button type="button" onClick={() => handleDeleteField(index)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <button type="submit">{isEdit ? 'Update Api' : 'Add Api'}</button>
            {isEdit && <button type="button" onClick={onCancelEdit}>Cancel</button>}
        </form>
    );
};

export default ApiForm;