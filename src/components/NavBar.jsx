import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filmsMenuOpen, setFilmsMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const filmsMenuRef = useRef(null);
  const location = useLocation();
  const isFilmsSection = location.pathname.startsWith("/films");

  useEffect(() => {
    setMenuOpen(false);
    setFilmsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setFilmsMenuOpen(false);
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <nav className="flex gap-4  border-b px-6 items-center relative">
      <div className="flex items-center gap-3">
        <Link to="/">
          <img
            src="/Signature.png"
            alt="Signature"
            style={{ maxWidth: '160px' }}
          />
        </Link>
      </div>
      {/* Desktop NavLinks */}
      <div className="ml-auto gap-6 text-3xl hidden md:flex items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "font-bold italic" : "hover:text-4xl"
          }
        >
          Home
        </NavLink>
        <div
          className="relative"
          ref={filmsMenuRef}
          onMouseEnter={() => setFilmsMenuOpen(true)}
          onMouseLeave={() => setFilmsMenuOpen(false)}
          onFocus={() => setFilmsMenuOpen(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setFilmsMenuOpen(false);
            }
          }}
        >
          <NavLink
            to="/films"
            end
            className={isFilmsSection ? "font-bold italic" : "hover:text-4xl"}
            onClick={() => setFilmsMenuOpen(false)}
            aria-haspopup="menu"
            aria-expanded={filmsMenuOpen}
            onKeyDown={(event) => {
              if (["Enter", " ", "ArrowDown"].includes(event.key)) {
                event.preventDefault();
                setFilmsMenuOpen(true);
                const firstItem = filmsMenuRef.current?.querySelector('[role="menuitem"]');
                firstItem?.focus();
              }
            }}
          >
            Films
          </NavLink>
          <div
            className={`absolute top-full left-0 min-w-52 rounded border bg-white py-2 shadow-lg flex-col text-xl z-50 ${
              filmsMenuOpen ? "flex" : "hidden"
            }`}
            role="menu"
            aria-label="Films submenu"
          >
            <NavLink
              to="/films"
              end
              role="menuitem"
              className={({ isActive }) =>
                isActive
                  ? "font-bold italic px-4 py-2"
                  : "px-4 py-2 hover:bg-gray-100"
              }
              onClick={() => setFilmsMenuOpen(false)}
            >
              My Films
            </NavLink>
            <NavLink
              to="/films/collaborative-work"
              role="menuitem"
              className={({ isActive }) =>
                isActive
                  ? "font-bold italic px-4 py-2"
                  : "px-4 py-2 hover:bg-gray-100"
              }
              onClick={() => setFilmsMenuOpen(false)}
            >
              Collaborative Work
            </NavLink>
          </div>
        </div>
        <NavLink
          to="/resume"
          className={({ isActive }) =>
            isActive ? "font-bold italic" : "hover:text-4xl"
          }
        >
          Resume
        </NavLink>
        <NavLink
          to="/references"
          className={({ isActive }) =>
            isActive ? "font-bold italic" : "hover:text-4xl"
          }
        >
          References
        </NavLink>
        <NavLink
          to="/more"
          className={({ isActive }) =>
            isActive ? "font-bold italic" : "hover:text-4xl"
          }
        >
          More
        </NavLink>
        <NavLink
          to="/photos"
          className={({ isActive }) =>
            isActive ? "font-bold italic" : "hover:text-4xl"
          }
        >
          Photos
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "font-bold italic" : "hover:text-4xl"
          }
        >
          Contact
        </NavLink>
      </div>
      {/* Mobile Dropdown Button */}
      <button
        ref={menuButtonRef}
        className="ml-auto md:hidden p-2"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-nav-menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <img src="/buttons/open-menu.svg" alt="" className="w-8 h-8" />
      </button>
      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div
          id="mobile-nav-menu"
          role="menu"
          aria-label="Mobile navigation"
          className="absolute top-full right-4 bg-white shadow-lg rounded z-50 flex flex-col text-xl p-4 md:hidden"
        >
          <NavLink
            to="/"
            role="menuitem"
            className={({ isActive }) =>
              isActive ? "font-bold italic mb-2" : "mb-2 hover:text-2xl"
            }
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
          <p className={isFilmsSection ? "font-bold italic mb-1" : "mb-1"}>Films</p>
          <NavLink
            to="/films"
            end
            role="menuitem"
            className={({ isActive }) =>
              isActive ? "font-bold italic mb-1 ml-4" : "mb-1 ml-4 hover:text-2xl"
            }
            onClick={() => setMenuOpen(false)}
          >
            My Films
          </NavLink>
          <NavLink
            to="/films/collaborative-work"
            role="menuitem"
            className={({ isActive }) =>
              isActive ? "font-bold italic mb-2 ml-4" : "mb-2 ml-4 hover:text-2xl"
            }
            onClick={() => setMenuOpen(false)}
          >
            Collaborative Work
          </NavLink>
          <NavLink
            to="/resume"
            role="menuitem"
            className={({ isActive }) =>
              isActive ? "font-bold italic mb-2" : "mb-2 hover:text-2xl"
            }
            onClick={() => setMenuOpen(false)}
          >
            Resume
          </NavLink>
          <NavLink
            to="/more"
            role="menuitem"
            className={({ isActive }) =>
              isActive ? "font-bold italic mb-2" : "mb-2 hover:text-2xl"
            }
            onClick={() => setMenuOpen(false)}
          >
            More
          </NavLink>
          <NavLink
            to="/contact"
            role="menuitem"
            className={({ isActive }) =>
              isActive ? "font-bold italic mb-2" : "mb-2 hover:text-2xl"
            }
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </NavLink>
        </div>
      )}
    </nav>
  );
}
