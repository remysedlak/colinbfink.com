import { Link } from 'react-router-dom';

function More() {
  return (
    <div className="w-full h-full flex flex-col">
      <h1 className="text-4xl italic font-bold text-center py-20">More</h1>
      
      <div className="flex-1 flex items-center justify-center w-full px-6 pb-10">
        <div
          className="flex flex-col md:flex-row items-center justify-center w-full"
          style={{ gap: "calc(var(--space-phi) * 2)" }}
        >
          {/* Photography - Left */}
          <Link
            to="/more/photography"
            className="flex flex-col items-center hover:opacity-80 transition-opacity"
            style={{ gap: "calc(var(--space-phi) * 0.5)" }}
          >
            <img
              src="/more/photography.jpg"
              alt="Photography"
              className="w-64 h-64 object-contain rounded-lg hover:shadow-lg transition-transform duration-200 hover:scale-105 cursor-pointer"
            />
            <p className="text-2xl font-semibold">Photography</p>
          </Link>

          {/* Charity CD Project - Middle and Slightly Higher */}
          <Link
            to="/more/charity-cd-project"
            className="flex flex-col items-center hover:opacity-80 transition-opacity"
            style={{ gap: "calc(var(--space-phi) * 0.5)", marginBottom: "3rem" }}
          >
            <img
              src="/more/charityCD.png"
              alt="Charity CD Project"
              className="w-64 h-64 object-contain rounded-lg hover:shadow-lg transition-transform duration-200 hover:scale-105 cursor-pointer"
            />
            <p className="text-2xl font-semibold">Charity CD</p>
          </Link>

          {/* Art */}
          <Link
            to="/more/art"
            className="flex flex-col items-center hover:opacity-80 transition-opacity"
            style={{ gap: "calc(var(--space-phi) * 0.5)" }}
          >
            <img
              src="/more/art.png"
              alt="Art"
              className="w-64 h-64 object-contain rounded-lg hover:shadow-lg transition-transform duration-200 hover:scale-105 cursor-pointer"
            />
            <p className="text-2xl font-semibold">Art</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default More;
