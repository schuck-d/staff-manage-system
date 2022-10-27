import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Layout from './pages/Wrapper';
import Home from './pages/Home';
import Departments from './pages/departments';
import Employees from './pages/employees';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/" element={<Layout />}>
                    <Route path="home" element={<Home />} />
                    <Route path="/departments" element={<Departments />} />
                    <Route path="/employees" element={<Employees />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
