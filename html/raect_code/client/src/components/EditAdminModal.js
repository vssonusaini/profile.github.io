import React, { useState, useEffect } from 'react';

const EditAdminModal = ({ admin, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({ name: '' });

    useEffect(() => {
        if (admin) {
            setFormData({ name: admin.name });
        }
    }, [admin]);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(admin._id, formData);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Edit Admin</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Admin Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Update</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditAdminModal;