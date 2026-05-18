import { useEffect, useMemo, useState } from "react";
import { Search, X, ZoomIn, ZoomOut } from "lucide-react";

import fullfamily from "/src/assets/fullfamily.jpeg";
import dad1 from "/src/assets/dad1.jpeg";
import dad2 from "/src/assets/dad2.jpeg";
import dad3 from "/src/assets/dad3.jpeg";
import dad4 from "/src/assets/dad4.jpeg";
import dad5 from "/src/assets/dad5.jpeg";
import dad6 from "/src/assets/dad6.jpeg";
import dad7 from "/src/assets/dad7.jpeg";
import dad8 from "/src/assets/dad8.jpeg";

// Letters
import let1 from "/src/assets/let1.jpeg";
import let2 from "/src/assets/let2.jpeg";
import let3 from "/src/assets/let3.jpeg";
import let4 from "/src/assets/let4.jpeg";
import let5 from "/src/assets/let5.jpeg";

type letterType = {
  id: number;
  title: string;
  image: string;
};

export default function MemorialLettersPage() {
  const [search, setSearch] = useState("");
  const [showTitles, setShowTitles] = useState(true);
  const [selectedLetter, setSelectedLetter] = useState<letterType | null>(null);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });


  const images = [
    fullfamily,
    dad1,
    dad2,
    dad3,
    dad4,
    dad5,
    dad6,
    dad7,
    dad8,
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);


//   5 Letters
  const letters = [
    {
      id: 1,
      title: "Family Tribute",
      image:let1,
    },
    {
      id: 2,
      title: "Colleague's Condolence",
      image:let2,
    },
    {
      id: 3,
      title: "Friends & Loved Ones",
      image:let3,
    },
    {
      id: 4,
      title: "Community Support",
      image:let4,
    },
    {
      id: 5,
      title: "Special Tributes",
      image:let5,
    }
  ];

  const filteredLetters = useMemo(() => {
    return letters.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const openLetter = (letter: letterType) => {
    setSelectedLetter(letter);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const closeModal = () => {
    setSelectedLetter(null);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging) return;

    setPosition({
      x: e.clientX - start.x,
      y: e.clientY - start.y,
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-black text-white">
 
       
    
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">

  {/* ================= DESKTOP / TABLET ================= */}
  <div className="hidden md:grid h-[75vh] max-w-7xl mx-auto grid-cols-2">

    {/* LEFT: TEXT */}
    <div className="flex items-center px-10">
      <div>
        <p className="mb-3 text-sm uppercase tracking-[0.4em] text-neutral-300">
          In Loving Memory Of
        </p>

        <h1 className="text-4xl text-neutral-300 font-bold leading-tight md:text-6xl">
          TPL. DR. GUNN, EZEKIEL OVUOKERIE, FNITP
        </h1>

        <p className="mt-6 max-w-xl text-base leading-8 text-neutral-300">
          A beloved father, mentor, and inspiration whose memory continues
          to live in the hearts of family, friends, and loved ones.
        </p>
      </div>
    </div>

    {/* RIGHT: IMAGE SLIDESHOW */}
    <div className="relative h-full bg-black">
      {images.map((image, index) => (
        <img
          key={image}
          src={image}
          alt={`Memory ${index}`}
          className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-[2000ms] ${
            currentImage === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Mask */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />
    </div>
  </div>

  {/* ================= MOBILE ================= */}
  <div className="md:hidden relative h-[75vh] w-full overflow-hidden">

    {/* Images */}
    {images.map((image, index) => (
      <img
        key={image}
        src={image}
        alt={`Memory ${index}`}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[2000ms] ${
          currentImage === index ? "opacity-100" : "opacity-0"
        }`}
      />
    ))}

    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

    {/* Text */}
    <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-14">
      <p className="mb-3 text-sm uppercase tracking-[0.4em] text-neutral-300">
        In Loving Memory Of
      </p>

      <h1 style={{color:"#fff"}} className="text-4xl font-bold leading-tight sm:text-5xl md:text-7xl">
        TPL. DR. GUNN, EZEKIEL OVUOKERIE, FNITP
      </h1>

      <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-300 sm:text-lg">
        A beloved father, mentor, and inspiration whose memory continues
        to live in the hearts of family, friends, and loved ones.
      </p>
    </div>
  </div>

</section>



      {/* Search + Controls */}
      <section className="sticky top-0 z-20 border-b border-white/10 bg-black/70 px-4 py-5 backdrop-blur-xl sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-lg">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search condolence letters..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-sm text-white outline-none transition focus:border-white/30"
            />
          </div>

          <button
            onClick={() => setShowTitles(!showTitles)}
            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium transition hover:bg-white/10"
          >
            {showTitles ? "Hide Titles" : "Show Titles"}
          </button>
        </div>
      </section>

      {/* Letters */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        {/* Condolence Letters Title to be aligned to the left */}
        <h2 className="mb-8 text-2xl font-bold">Condolence Letters</h2>
        <br />
        <div className="columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3">
          {filteredLetters.map((letter) => (
            <div
              key={letter.id}
              className="group cursor-pointer break-inside-avoid overflow-hidden rounded-3xl border border-white/10 bg-neutral-950 shadow-2xl transition duration-300 hover:-translate-y-1 hover:border-white/20"
              onClick={() => openLetter(letter)}
            >
              <div className="overflow-hidden">
                <img
                  src={letter.image}
                  alt={letter.title}
                  className="w-full transition duration-500 group-hover:scale-[1.02]"
                />
              </div>

              {showTitles && (
                <div className="border-t border-white/10 p-5">
                  <h3 className="text-lg font-semibold">{letter.title}</h3>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedLetter && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <button
            onClick={closeModal}
            className="absolute right-5 top-5 rounded-full bg-white/10 p-3 transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4 rounded-2xl border border-white/10 bg-black/60 px-5 py-3 backdrop-blur-xl">
            <button
              onClick={() => setZoom((prev) => Math.max(1, prev - 0.2))}
              className="rounded-xl bg-white/10 p-3 transition hover:bg-white/20"
            >
              <ZoomOut className="h-5 w-5" />
            </button>

            <p className="min-w-[60px] text-center text-sm font-medium">
              {Math.round(zoom * 100)}%
            </p>

            <button
              onClick={() => setZoom((prev) => prev + 0.2)}
              className="rounded-xl bg-white/10 p-3 transition hover:bg-white/20"
            >
              <ZoomIn className="h-5 w-5" />
            </button>
          </div>

          <div className="flex h-full w-full items-center justify-center overflow-hidden">
            <img
              src={selectedLetter.image}
              alt={selectedLetter.title}
              onMouseDown={handleMouseDown}
              draggable={false}
              className="max-h-[90vh] max-w-[90vw] cursor-grab rounded-2xl shadow-2xl active:cursor-grabbing"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                transition: dragging ? "none" : "transform 0.2s ease",
              }}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/70 px-4 py-5 text-center text-sm text-neutral-500 backdrop-blur-xl sm:px-6">
        <p>
          &copy; {new Date().getFullYear()} In Loving Memory Of Doctor Ezekiel
          Gunn. All rights reserved.
        </p>
      </footer>

      
    </div>
    
  );
}
