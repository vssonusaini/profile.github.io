import React, { useState } from 'react';

const UpdateStatusModal = ({ order, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    status: order ? order.status : 'packing done',
      orderId: order ? order.orderId : '',
      email: order ? order.email : ''
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    const handleStatusChange = (e) => {
        setFormData({ ...formData, status: e.target.value });
    };

  const handleSubmit = (e) => {
      e.preventDefault();
       onUpdate(formData)
        onClose();
  };


  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Update Order Status</h3>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            name="orderId"
            placeholder="Order ID"
            value={formData.orderId}
            onChange={handleChange}
            required
            />
            <input
                type="email"
                name="email"
                placeholder="Customer Email"
                value={formData.email}
                onChange={handleChange}
                required
                />
          <select name="status" value={formData.status} onChange={handleStatusChange} required>
            <option value="packing done">Packing Done</option>
            <option value="ready for dispatch">Ready for Dispatch</option>
            <option value="dispatched">Dispatched</option>
            <option value="in transit">In Transit</option>
          </select>
          <button type="submit">Update</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateStatusModal;