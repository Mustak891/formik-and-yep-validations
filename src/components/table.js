import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import { api_url } from '../components/api_url';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';

  
  
  export default function BasicTable() {

    const navigate = useNavigate();

  const handleEdit = ({id, studentname, book, number, email, password}) => {
    localStorage.setItem('id', id);
    localStorage.setItem('studentname', studentname);
    localStorage.setItem('book', book);
    localStorage.setItem('number', number);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    navigate('/updatedata');
  }

   const [tabledata, settabledata] = useState([]);
   useEffect(()=>{
     fetch(api_url).then((data)=> data.json()).then((data1)=>settabledata(data1))
   },[])
   
   const handleDelete = async (id) => {
   await fetch(api_url + id, {method: 'DELETE'})
    settabledata(tabledata.filter(data => data.id !== id))
   } 
    

    return (
      <div>
        <div className='tableheading'>
        <span>Libraries Database</span>
        <span><Link to='/adddata' style={{ textDecoration: "none"}}><Button variant="contained"><AddIcon />&nbsp;Add data</Button></Link></span>
        </div>
      <div className='curdtable'>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell width={40}><b>Name</b></TableCell>
              <TableCell align="center"><b>Book</b></TableCell>
              <TableCell align="center"><b>Number</b></TableCell>
              <TableCell align="center"><b>Email</b></TableCell>
              <TableCell align="center"><b>Password</b></TableCell>
              <TableCell align="center"><b>Edit</b></TableCell>
              <TableCell align="center"><b>Delete</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tabledata.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{row.studentname}</TableCell>
                <TableCell align="right">{row.book}</TableCell>
                <TableCell align="right">{row.number}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.password}</TableCell>
                <TableCell align="right"><Button onClick={() => handleEdit(row)} ><EditIcon /></Button></TableCell>
                <TableCell align="right"><Button onClick={() => handleDelete(row.id)}><DeleteIcon /></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
      </div>
    );
  }