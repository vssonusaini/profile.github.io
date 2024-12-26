import React, { useState } from 'react';

const AddPackingStateModal = ({ onClose, onAdd }) => {
    const [formData, setFormData] = useState({ state: '', description: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(formData);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Add Packing State</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="state"
                        placeholder="Packing State"
                        value={formData.state}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <button type="submit">Add Packing State</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default AddPackingStateModal;