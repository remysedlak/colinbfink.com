import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar'
import Footer from './components/Footer';
import './index.css'

{/* Lazy loading pages for speed optimization and content splitting */}
const Home = lazy(() => import('./pages/Home'));
const Contact = lazy(() => import('./pages/Contact'));
const Films = lazy(() => import('./pages/films/MyFilms'));
const CollaborativeWork = lazy(() => import('./pages/films/CollaborativeWork'));
const FilmPage = lazy(() => import('./components/FilmPage'));
const Resume = lazy(() => import('./pages/Resume'));
const More = lazy(() => import('./pages/More'));
const Art = lazy(() => import('./pages/more/Art'));
const Photography = lazy(() => import('./pages/more/Photography'));
const CharityCdProject = lazy(() => import('./pages/more/CharityCdProject'));
const BphsPresident2023 = lazy(() => import('./pages/more/BphsPresident2023'));
const LaynesAmbassador = lazy(() => import('./pages/more/LaynesAmbassador'));
const PittInHollywood = lazy(() => import('./pages/more/PittInHollywood'));
const SceneSocialChair = lazy(() => import('./pages/more/SceneSocialChair'));
const References = lazy(() => import('./pages/References'));
const Photos = lazy(() => import('./pages/Photos'));

function App() {
  return (
    <>
    <div className="h-dvh flex flex-col">
      <NavBar />
      <main className='overflow-auto flex-2' role="main">
        <div className="min-h-full flex flex-col">
          <div className="flex-1">
            {/* Uses a fallback page while assets are loading to memory */}
            <Suspense
              fallback={
                <div className="textured-background min-h-[40vh] flex items-center justify-center px-4">
                  <p className="text-xl text-gray-700 font-medium">Loading page...</p>
                </div>
              }
            >
              {/* Router */}
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/more" element={<More />} />
                  <Route path="/more/art" element={<Art />} />
                  <Route path="/more/photography" element={<Photography />} />
                  <Route path="/more/charity-cd-project" element={<CharityCdProject />} />
                  <Route path="/more/bphs-president-2023" element={<BphsPresident2023 />} />
                  <Route path="/more/laynes-ambassador" element={<LaynesAmbassador />} />
                  <Route path="/more/pitt-in-hollywood" element={<PittInHollywood />} />
                  <Route path="/more/scene-social-chair" element={<SceneSocialChair />} />
                  <Route path="/resume" element={<Resume />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/films" element={<Films />} />
                  <Route path="/films/collaborative-work" element={<CollaborativeWork />} />
                  <Route path="/photos" element={<Photos/>} />
                  <Route path="/references" element={<References />} />
                  <Route path="/films/:title" element={<FilmPage />} />
              </Routes>
            </Suspense>
          </div>
          <Footer />
        </div>
      </main>
    </div> 
    </>
  )
}

export default App
