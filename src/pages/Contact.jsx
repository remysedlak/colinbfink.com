const EmailIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="w-6 h-6"
    >
        <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
        <path d="M3 7.5 12 13l9-5.5" />
    </svg>
);

function Contact() {
    return (
        <div
            className="w-full min-h-screen flex flex-col items-center justify-center px-6 sm:px-10 lg:px-16"
            style={{ gap: "var(--space-phi)" }}
        >
            <img src="/mail.jpeg" alt="Mail" className="w-32 h-32 object-contain" />
            <h1 className="text-4xl italic font-bold text-center">Contact Me</h1>
            <div
                className="flex flex-col sm:flex-row items-center justify-center"
                style={{ gap: "var(--space-phi)" }}
            >
                <a
                    href="mailto:colinfink@gmail.com"
                    className="flex items-center gap-3 px-6 py-3 border-2 border-black rounded-full hover:bg-gray-100 transition"
                >
                    <EmailIcon />
                    <span className="text-xl font-semibold">Email</span>
                </a>
                <a
                    href="https://www.linkedin.com/in/colinbfink/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-3 border-2 border-black rounded-full hover:bg-gray-100 transition"
                >
                    <img src="/icons/linkedin.svg" alt="LinkedIn" className="w-6 h-6" />
                    <span className="text-xl font-semibold">LinkedIn</span>
                </a>
            </div>
        </div>
    );
}
export default Contact;