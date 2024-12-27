// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import ApiForm from './components/ApiForm';
import ApiList from './components/ApiList';
import axios from 'axios';
import './index.css';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
    const [apis, setApis] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [apiToEdit, setApiToEdit] = useState(null);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        fetchApis();
    }, []);

    const fetchApis = async () => {
        setErrors(null);
        try {
            const response = await axios.get(`${apiUrl}/api/apis`);
            setApis(response.data);
        } catch (error) {
            console.error('Error fetching apis:', error);
            setErrors({ fetch: error.message });
        }
    };

    const handleApiAdded = (newApi) => {
        setApis([...apis, newApi]);
    };

    const handleApiDelete = async (id) => {
        setErrors(null);
        try {
            await axios.delete(`${apiUrl}/api/apis/${id}`);
            setApis(apis.filter((api) => api._id !== id));
        } catch (error) {
            console.error('Error deleting api:', error);
            setErrors({ delete: error.message });
        }
    };

    const handleApiEdit = (api) => {
        setIsEdit(true);
        setApiToEdit(api);
    };

    const handleApiUpdated = (updatedApi) => {
        setApis(apis.map((api) => (api._id === updatedApi._id ? updatedApi : api)));
        setIsEdit(false);
        setApiToEdit(null);
    };

    const handleCancelEdit = () => {
        setIsEdit(false);
        setApiToEdit(null);
    };

    return (
        <div className="App">
            {errors && errors.fetch && <div className="error">{errors.fetch}</div>}
            {errors && errors.delete && <div className="error">{errors.delete}</div>}

            <ApiForm
                onApiAdded={handleApiAdded}
                isEdit={isEdit}
                apiToEdit={apiToEdit}
                onApiUpdated={handleApiUpdated}
                onCancelEdit={handleCancelEdit}
            />
            <ApiList apis={apis} onApiDelete={handleApiDelete} onApiEdit={handleApiEdit} />
        </div>
    );
}

export default App;