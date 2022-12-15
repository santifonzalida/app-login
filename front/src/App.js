import "bootstrap/dist/css/bootstrap.min.css"; 
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; 
import { Auth } from './components/Auth';
import { DefaultPage } from './components/DefaultPage';
import { Dashboard } from "./components/dashboard/Dashboard";
import { ForgotPassword } from './components/forgotPassword';
import { ResetPasswordForm } from "./components/ResetPassword";
import { Profile } from "./components/dashboard/Profile";
import { EditProfile } from "./components/dashboard/EditProfile";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DefaultPage />} />
                <Route path="/auth" element={<Auth />} />
                <Route path='/forgotpassword' element={<ForgotPassword />} /> 
                <Route path="/reset/:userId/:token" element={<ResetPasswordForm/>} />
                <Route path="/dashboard" element={<Dashboard />} > 
                    <Route path="profile/:id" element={<Profile />} />
                    <Route path="profile/:id/edit" element={<EditProfile />} />
                </Route>
                <Route path='*' element={<Navigate to="/" repalce /> } />
            </Routes>
        </BrowserRouter>
    )
}

export default App;