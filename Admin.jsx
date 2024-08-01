import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, TextField } from '@mui/material';
import './Admin.css'; 
import Aos from 'aos';
import 'aos/dist/aos'


const Admin = () => {
  useEffect(()=>{
    Aos.init()
  })

  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    role: ''
  });

  useEffect(() => {
    axios.get('http://localhost:8081/admin')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8081/delete/${id}`)
      .then(() => {
        setData(data.filter(item => item.id !== id));
      })
      .catch(error => {
        console.error('Error deleting item:', error);
      });
  };

  const handleEdit = (id) => {
    
    const item = data.find(item => item.id === id);
    setFormData({
      username: item.username,
      email: item.email,
      password: item.password,
      phone: item.phone,
      role: item.role
    });
    setEditId(id);
  };

  const handleSave = () => {
    axios.put(`http://localhost:8081/edit/${editId}`, formData)
      .then(() => {
        setData(data.map(item =>
          item.id === editId ? { ...item, ...formData } : item
        ));
        setEditId(null); 
      })
      .catch(error => {
        console.error('Error updating item:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <TableContainer component={Paper} className="table-container" data-aos="zoom-in" data-aos-duration="2000" >
      <Typography variant="h4" className="table-title">
        User Data
      </Typography>
      <Table className="table">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Password</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                {editId === row.id ? (
                  <TextField
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                ) : (
                  row.username
                )}
              </TableCell>
              <TableCell>
                {editId === row.id ? (
                  <TextField
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                ) : (
                  row.email
                )}
              </TableCell>
              <TableCell>
                {editId === row.id ? (
                  <TextField
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                ) : (
                  row.password
                )}
              </TableCell>
              <TableCell>
                {editId === row.id ? (
                  <TextField
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                ) : (
                  row.phone
                )}
              </TableCell>
              <TableCell>
                {editId === row.id ? (
                  <TextField
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  />
                ) : (
                  row.role
                )}
              </TableCell>
              <TableCell>
                {editId === row.id ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    style={{ marginRight: '8px' }}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(row.id)}
                    style={{ marginRight: '8px' }}
                  >
                    Edit
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(row.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Admin;




