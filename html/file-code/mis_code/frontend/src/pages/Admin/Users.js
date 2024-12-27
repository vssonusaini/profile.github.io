import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import Layout from '../../components/Layout';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/admin/users');
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure want to delete this user?")) {
      setLoading(true);
      setError(null);
      try {
        await api.delete(`/admin/users/${id}`);
        fetchUsers();
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
  };

  return (
    <Layout>
      {loading && <div className='loading'>Loading users...</div>}
      {error && <div className='error'>{error}</div>}
      {!loading && !error && (
        <div>
          <h1>User List</h1>
          <Link to={'/admin/users/create'}>Create User</Link>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td>
                    <Link to={`/admin/users/${user._id}/edit`}>Edit</Link> |
                    <button onClick={() => { handleDelete(user._id); }}>Delete</button>
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

export default Users;