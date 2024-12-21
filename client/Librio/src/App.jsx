import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarComponent from './components/navbar/NavbarComponent';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import Dashboard from './components/dashboard/Dashboard';
import Students from './components/students/Students';
import Books from './components/books/Books';
import Rentals from './components/rentals/Rentals';
import { LibraryProvider } from './components/LibraryContext';

import "./app.css"


function App() {
  return (
    <LibraryProvider>
      <Router>
        <div className="app">
          <NavbarComponent />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/books" element={<Books />} />
              <Route path="/rentals" element={<Rentals />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer />
        </div>
      </Router>
    </LibraryProvider>
  );
}

export default App;