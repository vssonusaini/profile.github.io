import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import Layout from '../../components/Layout';

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/admin/vendors');
      setVendors(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure want to delete this vendor?")) {
      setLoading(true);
      setError(null);
      try {
        await api.delete(`/admin/vendors/${id}`);
        fetchVendors();
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
  };

  return (
    <Layout>
      {loading && <div className='loading'>Loading vendors...</div>}
      {error && <div className='error'>{error}</div>}
      {!loading && !error && (
        <div>
          <h1>Vendor List</h1>
          <Link to={'/admin/vendors/create'}>Create Vendor</Link>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map(vendor => (
                <tr key={vendor._id}>
                  <td>{vendor.name}</td>
                  <td>{vendor.contact}</td>
                  <td>{vendor.address}</td>
                  <td>
                    <Link to={`/admin/vendors/${vendor._id}/edit`}>Edit</Link> |
                    <button onClick={() => { handleDelete(vendor._id); }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
};

export default Vendors;