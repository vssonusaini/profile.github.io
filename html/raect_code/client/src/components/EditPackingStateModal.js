import React, { useState, useEffect } from 'react';

const EditPackingStateModal = ({ packingState, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({ state: '', description: '' });
    useEffect(() => {
        if (packingState) {
            setFormData({ state: packingState.state, description: packingState.description });
        }
    }, [packingState]);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(packingState._id, formData);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Edit Packing State</h3>
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
                    <button type="submit">Update</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditPackingStateModal;