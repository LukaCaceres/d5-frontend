import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import FooterComponent from './components/FooterComponent';
import Error404Page from './pages/Error404Page';
import RegistroPage from './pages/RegistroPage';


function App() {
    return (
        <Router>
            <header className='position-sticky top-0 z-3'>
                <NavbarComponent/>
            </header>
            <main className="flex-grow-1">
                <Routes>
                    <Route path="/registro" element={<RegistroPage />}/>
                    <Route path='*' element={<Error404Page />} />
                </Routes>
            </main>
            <footer className='overflow-x-hidden'>
                <FooterComponent/>
            </footer>
        </Router>
    )
}

export default App
