import "bootstrap/dist/css/bootstrap.min.css"; 
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import { Auth } from './components/Auth';
import { DefaultPage } from './components/DefaultPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DefaultPage />} />
                <Route path="/auth" element={<Auth />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;