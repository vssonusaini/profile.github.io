import React, { useState, useEffect } from 'react';

const EditVendorModal = ({ vendor, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({ name: '', description: '' });
    useEffect(() => {
        if (vendor) {
            setFormData({ name: vendor.name, description: vendor.description });
        }
    }, [vendor]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(vendor._id, formData);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Edit Vendor</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Vendor Name"
                        value={formData.name}
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

export default EditVendorModal;