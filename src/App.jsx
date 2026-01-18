import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar'
import Home from './pages/Home';
import Contact from './pages/Contact';
import Films from './pages/Films';
import FilmPage from './components/FilmPage';
import Resume from './pages/Resume';
import More from './pages/More';
import Art from './pages/Art';
import Photography from './pages/Photography';
import CharityCdProject from './pages/CharityCdProject';
import Footer from './components/Footer';
import './index.css'

function App() {
  return (
    <>
    <div className="h-dvh flex flex-col">
      <NavBar />
      <div className='overflow-auto flex-2'>
        <div className="min-h-full flex flex-col">
          <div className="flex-1">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/more" element={<More />} />
                <Route path="/more/art" element={<Art />} />
                <Route path="/more/photography" element={<Photography />} />
                <Route path="/more/charity-cd-project" element={<CharityCdProject />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/films" element={<Films />} />
                <Route path="/films/:title" element={<FilmPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </div> 
    </>
  )
}

export default App
