import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import FooterComponent from './components/FooterComponent';
import Error404Page from './pages/Error404Page';
import RegistroPage from './pages/RegistroPage';
import LoginPage from './pages/LoginPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ResultadosPage from './pages/ResultadosPage';
import ProductoPage from './pages/ProductoPage';
import ConocenosPage from './pages/ConocenosPage';

function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <Router>
                <header className='sticky top-0 z-10'>
                    <NavbarComponent />
                </header>
                <main className="flex-grow">
                    <Routes>
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/reset-password' element={<ResetPasswordPage />} />
                        <Route path="/registro" element={<RegistroPage />} />
                        <Route path='/resultados' element={<ResultadosPage />} />
                        <Route path="/producto/:id" element={<ProductoPage />} />
                        <Route path='/conocenos' element={<ConocenosPage />}/>
                        <Route path='*' element={<Error404Page />} />
                    </Routes>
                </main>
                <footer className='overflow-x-hidden'>
                    <FooterComponent />
                </footer>
            </Router>
        </div>
    );
}

export default App;
