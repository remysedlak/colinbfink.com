import { Link } from 'react-router-dom';

const moreItems = [
  {
    title: 'Photography',
    to: '/more/photography',
    image: '/more/photography.jpg',
    label: 'Photography',
  },
  {
    title: 'Charity CD',
    to: '/more/charity-cd-project',
    image: '/more/charityCD.png',
    label: 'Charity CD',
  },
  {
    title: 'Art',
    to: '/more/art',
    image: '/more/art.png',
    label: 'Art',
  },
  {
    title: 'BPHS President 2023',
    to: '/more/bphs-president-2023',
    image: '/more/BPHS President 2023.jpg',
    label: 'BPHS President 2023',
  },
  {
    title: "Layne's Ambassador",
    to: '/more/laynes-ambassador',
    image: "/more/Layne's Ambassador.jpeg",
    label: "Layne's Ambassador",
  },
  {
    title: 'Pitt in Hollywood',
    to: '/more/pitt-in-hollywood',
    image: '/more/Pitt in Hollywood.jpg',
    label: 'Pitt in Hollywood',
  },
  {
    title: 'SCENE Social Chair',
    to: '/more/scene-social-chair',
    image: '/more/SCENE.jpg',
    label: 'SCENE Social Chair',
  },
];

function More() {
  return (
    <div className="w-full h-full flex flex-col">
      <h1 className="text-4xl italic font-bold text-center py-20">More</h1>
      
      <div className="flex-1 flex items-center justify-center w-full px-6 pb-16">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center w-full max-w-7xl"
          style={{ gap: "calc(var(--space-phi) * 1.5)" }}
        >
          {moreItems.map((item) => (
            <Link
              key={item.title}
              to={item.to}
              className="flex flex-col items-center hover:opacity-85 transition-opacity"
              style={{ gap: "calc(var(--space-phi) * 0.45)" }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-64 md:w-72 aspect-[4/3] object-contain bg-white rounded-lg hover:shadow-lg transition-transform duration-200 hover:scale-105 cursor-pointer"
                loading="lazy"
                decoding="async"
              />
              <p className="text-xl md:text-2xl font-semibold text-center">{item.label}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default More;
