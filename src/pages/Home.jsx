import Socials from '../components/Socials';
import AboutMe from '../components/AboutMe';
import Portrait from '../components/Portrait';
import SlideShow from '../components/SlideShow';

function Home() {
    return (
        <div className="min-h-screen w-full flex justify-center px-6 sm:px-10 lg:px-16 py-10 overflow-x-hidden">
            <div
                className="flex flex-col lg:flex-row w-full max-w-7xl items-start"
                style={{ columnGap: "var(--space-phi2)", rowGap: "var(--space-phi2)" }}
            >
                <div
                    className="flex flex-col w-full lg:w-2/5 max-w-2xl items-center text-center"
                    style={{ gap: "var(--space-phi)" }}
                >
                    <Portrait />
                    <Socials />
                </div>
                <div
                    className="flex flex-col w-full lg:w-3/5 max-w-6xl items-center"
                    style={{ gap: "var(--space-phi)" }}
                >
                    <AboutMe />
                    <SlideShow />
                </div>
            </div>
        </div>
    )
}
export default Home;