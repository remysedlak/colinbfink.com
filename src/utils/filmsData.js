let filmsCache = null;
let filmsPromise = null;

export const createFilmSlug = (title = "") => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const normalizeImageSrc = (src = "") => {
  if (!src) return "";
  return src.startsWith("/") ? src : `/${src}`;
};

export const findFilmBySlug = (films, slug) => {
  return films.find((film) => createFilmSlug(film.title) === slug);
};

export const getFilmsData = async () => {
  if (filmsCache) {
    return filmsCache;
  }

  if (!filmsPromise) {
    filmsPromise = fetch("/data/letterboxd_films.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch films: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        filmsCache = Array.isArray(data) ? data : [];
        return filmsCache;
      })
      .catch((error) => {
        filmsPromise = null;
        throw error;
      });
  }

  return filmsPromise;
};

export const clearFilmsDataCache = () => {
  filmsCache = null;
  filmsPromise = null;
};
