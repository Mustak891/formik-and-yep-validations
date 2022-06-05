import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { api_url } from './api_url';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';


export default function Form(){

  const formvalidationSchema = yup.object({
    studentname: yup.string().required('Name is required ⚠️').min(3, 'Name must be at least 3️⃣ characters long'),
    book: yup.string().required('Book is required ⚠️').min(3, 'Book must be at least 3️⃣ characters long'),
    number: yup.number().required('Number is required ⚠️').max(9999999999, 'Number must be at least 🔟 characters long'),
    email: yup.string().required('Email is required ⚠️').min(3, 'Email must be at least 3️⃣ characters long').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Invalid email address'),
    password: yup.string().required('Password is required ⚠️').min(6, 'Password must be at least 6️⃣ characters long').max(12, 'Number must be at least 1️⃣2️⃣ characters long').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 'Password must contain at least one lowercase letter, one uppercase letter, one number and one special character')
  })

  const { handleSubmit, values, handleChange, handleBlur, errors, touched } = useFormik({
    initialValues:{studentname: "", book: "",  number: "", email: "", password: ""},
    validationSchema: formvalidationSchema,
    onSubmit: (values) => {postData(values)},
  });

  
// post data to mock api
  const navigate = useNavigate();

  const postData = async () => {
  try{ await fetch(api_url,{method:"POST", headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(values)})}
  catch{console.log((error) => error)}navigate('/')}
  

    return(
        <div className='totaladdnewuser'>
        <div className="adddatahead">
           <span>ADD NEW USER ➡️</span> 
        </div>
        <div className="addnewuser">
        <div className="addnew">
        <form onSubmit={handleSubmit} className="border">
        <Box sx={{'& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off" > 
       
      <TextField style={{width: "400px"}} name='studentname' onChange={handleChange} onBlur={handleBlur}  value={values.studentname}  label="Name" variant="outlined" error={errors.studentname && touched.studentname} helperText={errors.studentname && touched.studentname ? errors.studentname : ""} /><br />
  
      <TextField style={{width: "400px"}} name='book' onChange={handleChange} onBlur={handleBlur}  value={values.book}  label="Book" variant="outlined" error={errors.book && touched.book} helperText={errors.book && touched.book ? errors.book : ""} /><br />
       
      <TextField style={{width: "400px"}} name='number' onChange={handleChange} onBlur={handleBlur}  value={values.number}  label="phone number" type="number" variant="outlined" error={errors.number && touched.number}  helperText={errors.number && touched.number ? errors.number : ""} /><br />
   
      <TextField  style={{width: "400px"}} name='email' onChange={handleChange} onBlur={handleBlur}  value={values.email}  label="Email" variant="outlined" error={errors.email && touched.email} helperText={errors.email && touched.email ? errors.email : ""}/><br />
      
      <TextField style={{width: "400px"}} name='password' onChange={handleChange} onBlur={handleBlur}  value={values.password}  label="Password"  type="password" variant="outlined" error={errors.password && touched.password} helperText={errors.password && touched.password ? errors.password : ""} /><br />

      <Button variant="contained" type='submit' >Submit</Button><Button variant="contained" onClick={() => navigate('/')}>Cancel</Button>
    </Box>
     </form>
     </div>
     <div className='image'>
       <img style={{marginLeft:"100px", height:"400px", width:"400px", objectFit:"cover"}} src="https://www.freeiconspng.com/uploads/user-add-icon---shine-set-add-new-user-add-user-30.png" alt='adduser ' />
       </div>
       </div>
        </div> 
    )
}