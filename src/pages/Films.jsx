import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";

const LOADER_MIN_VISIBLE_MS = 900;
const LOADER_FADE_MS = 300;
const PRELOAD_TIMEOUT_MS = 15000;

const normalizeImageSrc = (src) => {
  if (!src) return "";
  return src.startsWith("/") ? src : `/${src}`;
};

const preloadImage = (src, timeoutMs) => {
  return new Promise((resolve) => {
    const img = new Image();
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      clearTimeout(timeoutId);
      resolve();
    };

    const timeoutId = setTimeout(finish, timeoutMs);

    img.onload = () => {
      if (typeof img.decode === "function") {
        img.decode().finally(finish);
      } else {
        finish();
      }
    };

    img.onerror = finish;
    img.src = src;
  });
};

// Utility function to create SEO-friendly slugs
const createSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters except hyphens
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

function Films() {
  const [films, setFilms] = useState([]);
  const [sortOrder, setSortOrder] = useState("oldest");
  const [genreFilter, setGenreFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);

  useEffect(() => {
    let cancelled = false;
    let revealTimeoutId;
    let fadeTimeoutId;
    const startedAt = Date.now();

    const loadFilms = async () => {
      setLoading(true);
      setIsLoaderVisible(true);

      try {
        const response = await fetch("/data/letterboxd_films.json");
        const data = await response.json();
        const filmsData = Array.isArray(data) ? data : [];

        if (cancelled) return;
        setFilms(filmsData);

        const imagePromises = filmsData
          .filter((film) => film.image)
          .map((film) => preloadImage(normalizeImageSrc(film.image), PRELOAD_TIMEOUT_MS));

        await Promise.allSettled(imagePromises);
      } catch {
        if (cancelled) return;
        setFilms([]);
      }

      const elapsed = Date.now() - startedAt;
      const remainingMinDuration = Math.max(LOADER_MIN_VISIBLE_MS - elapsed, 0);

      revealTimeoutId = setTimeout(() => {
        if (cancelled) return;
        setLoading(false);

        fadeTimeoutId = setTimeout(() => {
          if (!cancelled) {
            setIsLoaderVisible(false);
          }
        }, LOADER_FADE_MS);
      }, remainingMinDuration);
    };

    loadFilms();

    return () => {
      cancelled = true;
      clearTimeout(revealTimeoutId);
      clearTimeout(fadeTimeoutId);
    };
  }, []);

  const allGenres = useMemo(() => {
    const genreSet = new Set();
    films.forEach((film) => {
      if (Array.isArray(film.genre)) {
        film.genre.forEach((g) => genreSet.add(g));
      } else if (typeof film.genre === "string") {
        genreSet.add(film.genre);
      }
    });
    return Array.from(genreSet).sort();
  }, [films]);

  const displayedFilms = useMemo(() => {
    let filtered = films;
    if (genreFilter) {
      filtered = films.filter((film) => {
        if (Array.isArray(film.genre)) {
          return film.genre.includes(genreFilter);
        } else if (typeof film.genre === "string") {
          return film.genre === genreFilter;
        }
        return false;
      });
    }
    
    // Helper function to extract duration in minutes from duration string
    const getDurationInMinutes = (duration) => {
      if (!duration) return 0;
      const match = duration.match(/(\d+)\s*mins?/);
      return match ? parseInt(match[1]) : 0;
    };
    
    return [...filtered].sort((a, b) => {
      if (sortOrder === "earliest") {
        return (a.date || "").localeCompare(b.date || "");
      } else if (sortOrder === "oldest") {
        return (b.date || "").localeCompare(a.date || "");
      } else if (sortOrder === "duration-shortest") {
        return getDurationInMinutes(a.duration) - getDurationInMinutes(b.duration);
      } else if (sortOrder === "duration-longest") {
        return getDurationInMinutes(b.duration) - getDurationInMinutes(a.duration);
      }
      return 0;
    });
  }, [films, sortOrder, genreFilter]);

  return (
    <>
      {isLoaderVisible && (
        <div
          className={`fixed inset-0 bg-white flex flex-col items-center justify-center z-50 transition-opacity duration-300 ${
            loading ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <img
            src="/gifs/camera.gif"
            alt="Loading..."
            className="w-20 h-20 mb-4"
            style={{ imageRendering: "pixelated" }}
          />
          <p className="text-xl text-gray-700 font-medium">Loading films...</p>
        </div>
      )}

      <div
        className={`p-4 transition-opacity duration-300 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
      <div className="flex flex-col items-center justify-center mb-4">
        <h1 className="text-4xl text-center mb-2">My Films</h1>
        <div className="flex gap-4 items-center my-2">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border px-4 py-2 rounded text-xl hover:bg-gray-100"
          >
            <option value="earliest">Earliest</option>
            <option value="oldest">Most recent</option>
            <option value="duration-shortest">Duration: Shortest</option>
            <option value="duration-longest">Duration: Longest</option>
          </select>
          <select
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
            className="border px-4 py-2 rounded text-xl hover:bg-gray-100"
          >
            <option value="">All Genres</option>
            {allGenres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 px-4 md:px-32 lg:px-32 xl:px-64">
        {displayedFilms.map((film, i) => {
          // Use image directly from letterboxd_films.json
          const imgSrc = normalizeImageSrc(film.image);
          
          return (
            <Link
              key={i}
              to={`/films/${createSlug(film.title)}`}
              state={{ imgSrc }}
              className="flex flex-col items-center text-center transition-transform duration-200 hover:scale-105"
            >
              {imgSrc ? (
                <img
                  src={imgSrc}
                  alt={film.title}
                  className="w-full h-auto aspect-3/4 object-top shadow-md hover:shadow-xl"
                  loading="eager"
                  decoding="sync"
                />
              ) : (
                <div className="w-full h-auto aspect-3/4 bg-gray-200 flex items-center justify-center rounded">
                  <span className="text-sm text-gray-500">No Image</span>
                </div>
              )}
              <span className="italic font-semibold mt-3 text-lg">{film.title}</span>
              <span className="text-md text-gray-600">
                ({film.date ? film.date.slice(0, 4) : ""})
              </span>
              {film.duration && (
                <span className="text-sm text-gray-500 mt-1">{film.duration}</span>
              )}
            </Link>
          );
        })}
      </div>
      </div>
    </>
  );
}

export default Films;