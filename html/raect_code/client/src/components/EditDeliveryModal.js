import React, { useState, useEffect } from 'react';

const EditDeliveryModal = ({ delivery, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({ state: '', description: '' });
    useEffect(() => {
        if (delivery) {
            setFormData({ state: delivery.state, description: delivery.description });
        }
    }, [delivery]);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(delivery._id, formData);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Edit Delivery State</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="state"
                        placeholder="Delivery State"
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

export default EditDeliveryModal;