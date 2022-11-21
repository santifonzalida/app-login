import "bootstrap/dist/css/bootstrap.min.css"; 
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import { Auth } from './components/Auth';
import { DefaultPage } from './components/DefaultPage';
import { Dashboard } from "./components/Dashboard";
import { ForgotPassword } from './components/forgotPassword';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DefaultPage />} />
                <Route path="/auth" element={<Auth />} />
                <Route path='/forgotpassword' element={<ForgotPassword />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;