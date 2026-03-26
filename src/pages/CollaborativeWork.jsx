import { useEffect, useState } from "react";

const LOADER_MIN_VISIBLE_MS = 900;
const LOADER_FADE_MS = 300;
const PRELOAD_TIMEOUT_MS = 15000;

const projects = [
  {
    title: "Read The Fine Print",
    year: "2026",
    director: "Emma Meo",
    format: "Short Film",
    roles: "Camera Operator",
    image: "Read_The_Fine_Print.png",
  },
  {
    title: "Leave of Absence",
    year: "2026",
    director: "Zain Adamo",
    format: "Short Film",
    roles: "Boom Operator, Additional Sound",
    image: "Leave_Of_Absence.png",
  },
  {
    title: "One Eighty",
    year: "2026",
    director: "Alexander Rossi",
    format: "Short Film",
    roles: "Director of Photography, Camera Operator",
    image: "One_Eighty.jpeg",
  },
  {
    title: "Go Home",
    year: "2026",
    director: "Landon White",
    format: "Short Film",
    roles: "1st AC",
    image: "Go_Home_(temp).jpg",
  },
  {
    title: "Another Shot",
    year: "2026",
    director: "Nolan Dubois",
    format: "Short Film",
    roles: "Script Supervisor",
    image: "Another_Shot.png",
  },
  {
    title: "Global Protection",
    year: "2026",
    director: "Joshua Yoon",
    format: "Short Film",
    roles: "Producer, Director of Photography, Camera Operator",
    image: "Global_Protetection.JPEG",
  },
  {
    title: "The Paper",
    year: "2026",
    director: "Anastasia Matveev",
    format: "Short Film",
    roles: "Director of Photography, Camera Operator",
    image: "The_Paper.png",
  },
  {
    title: "Come With Us",
    year: "2026",
    director: "Josh Poe",
    format: "Short Film",
    roles: "Sound, Gaffing, AC",
    image: "Come_With_Us.jpeg",
  },
  {
    title: "Wazobia Fashion Show Promo",
    year: "2026",
    director: "Aleje Jacobs",
    format: "Promotional",
    roles: "Camera Work",
    image: "Wazobia_Fashion_show_Promo.png",
  },
  {
    title: "Channel 99",
    year: "2025",
    director: "Nick Benec",
    format: "Short Film",
    roles: "Actor",
    image: "Channel_99.jpg",
  },
  {
    title: "Welcome to The Farm",
    year: "2025",
    director: "Julie Rostock",
    format: "Short Film",
    roles: "Gaffing",
    image: "Welcome_To_The_Farm.png",
  },
  {
    title: "We All Leave By The End of The Night",
    year: "2025",
    director: "Freya Norwood",
    format: "Short Film",
    roles: "Gaffer",
    image: "WALATEOTN.png",
  },
  {
    title: "Hero Complex",
    year: "2025",
    director: "Jacob Parayil",
    format: "Short Film",
    roles: "Actor",
    image: "Hero_Complex.png",
  },
  {
    title: "Burden of Proof",
    year: "2025",
    director: "Nate Drew, Zain Adamo",
    format: "Short Film",
    roles: "Set Decoration",
    image: "100_1496_Original.jpg",
  },
  {
    title: "Le Voyage",
    year: "2025",
    director: "Joshua Gardener, Wendy White",
    format: "Short Film",
    roles: "Actor, Script Supervisor",
    image: "Le_Voyage.png",
  },
  {
    title: "Toluca Nights",
    year: "2025",
    director: "Anastasia Matveev",
    format: "Short Film",
    roles: "Director of Photography, Camera Operator",
    image: "Toluca_Lights.png",
  },
  {
    title: "What It Means to Love",
    year: "2025",
    director: "Aleje Jacobs",
    format: "Short Film",
    roles: "Sound, Boom Operator, AC, Additional Camerawork",
    image: "What_It_Means_To_Love.png",
  },
  {
    title: "Sunflower Seed",
    year: "2025",
    director: "James Genco, Nolan DuBois",
    format: "Short Film",
    roles: "Sound, Boom Operator",
    image: "Sunflower_Seed.png",
  },
  {
    title: "The Runner",
    year: "2025",
    director: "Grace Kenneth",
    format: "Short Film",
    roles: "AC, Script Supervisor, Additional Camerawork",
    image: "The_Runner.png",
  },
  {
    title: "Welcome Back",
    year: "2025",
    director: "Maia Nikolova",
    format: "Short Film",
    roles: "Ensemble",
    image: "Welcome_Back.png",
  },
  {
    title: "House of Tears",
    year: "2024",
    director: "Josh Poe",
    format: "Feature Film",
    roles: "2nd AC, Production Assistant",
    image: "House_Of_Tears.png",
  },
  {
    title: "VEGAS",
    year: "2024",
    director: "Haddie Bushman",
    format: "Short Film",
    roles: "Director of Photography, Camera Operator, Editor",
    image: "VEGAS.png",
  },
  {
    title: "The Bootlegger",
    year: "2023",
    director: "Dylan Finnell",
    format: "Short Film",
    roles: "Director of Photography, 1st AD, Camera Operator, Actor",
    image: "The_Bootlegger.png",
  },
  {
    title: "Truth Insured",
    year: "2022",
    director: "Haiden Hunter",
    format: "Short Film",
    roles: "Director of Photography, Camera Operator, Actor",
    image: "Truth_Insured.png",
  },
];

const additionalStills = [
  "Global_Protection(2).JPEG",
  "Global_Protection(3).JPEG",
  "Wazobia_Fashion_Show_Promo(2).png",
];

const getImagePath = (fileName) => {
  return encodeURI(`/Collaborative Film Work Images/${fileName}`);
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

function CollaborativeWork() {
  const [loading, setLoading] = useState(true);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);

  useEffect(() => {
    let cancelled = false;
    let revealTimeoutId;
    let fadeTimeoutId;
    const startedAt = Date.now();

    const preloadPageImages = async () => {
      setLoading(true);
      setIsLoaderVisible(true);

      const allImages = [...projects.map((p) => p.image), ...additionalStills];
      const uniqueImagePaths = [...new Set(allImages.map(getImagePath))];

      await Promise.allSettled(
        uniqueImagePaths.map((src) => preloadImage(src, PRELOAD_TIMEOUT_MS))
      );

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

    preloadPageImages();

    return () => {
      cancelled = true;
      clearTimeout(revealTimeoutId);
      clearTimeout(fadeTimeoutId);
    };
  }, []);

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
          <p className="text-xl text-gray-700 font-medium">Loading collaborative work...</p>
        </div>
      )}

      <div
        className={`min-h-screen w-full px-6 sm:px-10 lg:px-16 py-10 bg-[#ececec] transition-opacity duration-300 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl mb-2">Collaborative Film Work</h1>
        </div>

        <div className="flex flex-col" style={{ gap: "4.5rem" }}>
          {projects.map((project, idx) => {
            const imageOnRight = idx % 2 === 0;
            const textSection = (
              <div className="w-full lg:w-[52%] text-center lg:text-left">
                <p className="text-2xl leading-snug">
                  <span className="italic">{project.title}</span> ({project.year}, Dir. {project.director}) | {project.format}
                </p>
                <p className="text-2xl leading-snug">{project.roles}</p>
              </div>
            );

            const imageSection = (
              <div className="w-full lg:w-[38%] flex justify-center">
                <img
                  src={getImagePath(project.image)}
                  alt={project.title}
                  className="w-full max-w-[420px] h-auto object-cover border border-black/50"
                  loading="eager"
                  decoding="sync"
                />
              </div>
            );

            return (
              <section
                key={project.title}
                className="flex flex-col gap-8 lg:gap-12 lg:items-center"
              >
                <div className="hidden lg:flex w-full items-center justify-between gap-8">
                  {imageOnRight ? (
                    <>
                      {textSection}
                      {imageSection}
                    </>
                  ) : (
                    <>
                      {imageSection}
                      {textSection}
                    </>
                  )}
                </div>

                <div className="flex lg:hidden w-full flex-col items-center gap-6">
                  {textSection}
                  {imageSection}
                </div>
              </section>
            );
          })}
        </div>

        <section className="mt-20">
          <h2 className="text-3xl text-center mb-8">Additional Stills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalStills.map((fileName) => (
              <img
                key={fileName}
                src={getImagePath(fileName)}
                alt={fileName.replace(/[_()]/g, " ")}
                className="w-full h-auto object-cover border border-black/40"
                loading="eager"
                decoding="sync"
              />
            ))}
          </div>
        </section>
      </div>
      </div>
    </>
  );
}

export default CollaborativeWork;
