import React, { useState } from 'react';

const AddAdminModal = ({ onClose, onAdd }) => {
    const [formData, setFormData] = useState({ name: '' });

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
                <h3>Add Admin</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Admin Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Add Admin</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default AddAdminModal;