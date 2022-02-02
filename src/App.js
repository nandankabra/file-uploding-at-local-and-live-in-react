import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import FileUpload from './Pages/FileUpload';
import Error404 from './Pages/Error404';
import Login from './Pages/Login';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={ <Login /> } />
          <Route path="/fileupload" element={ <FileUpload /> } />
          <Route path="/Login" element={ <Login /> } />
          <Route path="*" element={ <Error404 /> } />
        </Routes>
      </Router>
  );
}

export default App;
