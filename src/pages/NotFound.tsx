import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0C0C0C]">
      <div className="text-center">
        <h1 className="hero-heading mb-4 font-black uppercase" style={{ fontSize: 'clamp(4rem, 15vw, 10rem)' }}>
          404
        </h1>
        <p className="mb-6 text-lg font-light text-[#D7E2EA]/60">Oops! Page not found</p>
        <a
          href="/"
          className="inline-block rounded-full border-2 border-[#D7E2EA] px-8 py-3 font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-300 hover:bg-[#D7E2EA]/10"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
