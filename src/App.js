import './App.css';
import ResponsiveAppBar from './components/appbar';
import BasicTable from './components/table';
import { Routes, Route } from 'react-router-dom';
import Form from './components/add data';
import Updatedata from './components/updatedata';


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/adddata' element={[<ResponsiveAppBar />, <Form />]} />
        <Route path='/updatedata' element={[<ResponsiveAppBar />, <Updatedata />]} />
      </Routes>
    </div>
  );
}

function Home(){
  return(
    <div>
    <ResponsiveAppBar />
      <div>
        <span><h1 className='topheading'>REACT + FORMIK LIBRARY MANGEMENT</h1></span>
      </div>
      <BasicTable />
      <createData />
    </div>
  )
}






export default App;
