'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const artworks = [
  {
    src: "/images/bethconklin_selfportrait_1500pixelsw.jpg",
    title: "self portrait",
    medium: "pencil and watercolour on paper",
    dimensions: '10 x 12"',
    year: "2016",
    category: "Drawing"
  },
  {
    src: "/images/bethconklin_apothecary_1500pixelsw.jpg",
    title: "apothecary",
    medium: "pencil and watercolour on paper",
    dimensions: '15 x 20"',
    year: "2017",
    category: "Drawing"
  },
  {
    src: "/images/bethconklin_untitled_version4.jpg",
    title: "untitled version 4",
    medium: "pencil and watercolour on paper",
    dimensions: '8 x 10"',
    year: "2015",
    category: "Drawing"
  },
  {
    src: "/images/bluehand.jpg",
    title: "blue hand",
    medium: "pencil and watercolour on paper",
    dimensions: '11 x 14"',
    year: "2019",
    category: "Drawing"
  },
  {
    src: "/images/fourpiece.jpg",
    title: "four piece",
    medium: "pencil and watercolour on paper",
    dimensions: '20 x 24"',
    year: "2020",
    category: "Drawing"
  },
  {
    src: "/images/goldleaf.jpg",
    title: "gold leaf",
    medium: "pencil and watercolour on paper",
    dimensions: '10 x 12"',
    year: "2021",
    category: "Drawing"
  },
  {
    src: "/images/somafinaldetail.jpg",
    title: "soma final detail",
    medium: "pencil and watercolour on paper",
    dimensions: '16 x 20"',
    year: "2022",
    category: "Drawing"
  },
  {
    src: "/images/through_1retouched.jpg",
    title: "through 1",
    medium: "pencil and watercolour on paper",
    dimensions: '12 x 16"',
    year: "2018",
    category: "Painting"
  },
  {
    src: "/images/bethconklin_through2.jpg",
    title: "through 2",
    medium: "pencil and watercolour on paper",
    dimensions: '12 x 16"',
    year: "2018",
    category: "Painting"
  },
  {
    src: "/images/through_3retouched.jpg",
    title: "through 3",
    medium: "pencil and watercolour on paper",
    dimensions: '12 x 16"',
    year: "2018",
    category: "Painting"
  },
  {
    src: "/images/bethconklin_through4.jpg",
    title: "through 4",
    medium: "pencil and watercolour on paper",
    dimensions: '12 x 16"',
    year: "2018",
    category: "Painting"
  }
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("Drawing");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [fade, setFade] = useState(true);

  const filteredArtworks = artworks.filter(art => art.category === activeCategory);
  const currentArt = filteredArtworks[currentIndex];

  const switchCategory = (e: React.MouseEvent, category: string) => {
    e.preventDefault();
    if (activeCategory === category) return;
    setFade(false);
    setTimeout(() => {
      setActiveCategory(category);
      setCurrentIndex(0);
      setShowThumbnails(false);
      setFade(true);
    }, 200);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    if (showThumbnails) return;
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? filteredArtworks.length - 1 : prev - 1));
      setFade(true);
    }, 200);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (showThumbnails) return;
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === filteredArtworks.length - 1 ? 0 : prev + 1));
      setFade(true);
    }, 200);
  };

  const toggleThumbnails = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!showThumbnails) {
      setFade(false);
      setTimeout(() => setShowThumbnails(true), 200);
    } else {
      setShowThumbnails(false);
      setTimeout(() => setFade(true), 50);
    }
  };

  const selectThumbnail = (index: number) => {
    setCurrentIndex(index);
    setShowThumbnails(false);
    setTimeout(() => setFade(true), 50);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white text-[#333] font-sans">
      <aside className="w-[280px] h-full p-12 shrink-0 flex flex-col z-10 bg-white">
        <h1 className="font-serif text-[26px] font-normal mb-14 text-[#111] tracking-wide">
          Elizabeth Conklin
        </h1>
        
        <nav>
          <ul className="list-none mb-10 space-y-4 text-[14px] tracking-wide">
            <li><a href="#" onClick={(e) => switchCategory(e, "Drawing")} className={`transition-colors ${activeCategory === "Drawing" ? "font-bold text-[#999]" : "hover:text-black"}`}>Drawing</a></li>
            <li><a href="#" onClick={(e) => switchCategory(e, "Painting")} className={`transition-colors ${activeCategory === "Painting" ? "font-bold text-[#999]" : "hover:text-black"}`}>Painting</a></li>
            <li><a href="#" onClick={(e) => switchCategory(e, "Sculpture/Installation")} className={`transition-colors ${activeCategory === "Sculpture/Installation" ? "font-bold text-[#999]" : "hover:text-black"}`}>Sculpture/Installation</a></li>
          </ul>
          <ul className="list-none mb-10 space-y-3 text-[13px]">
            <li><a href="#" className="hover:text-black transition-colors">CV</a></li>
            <li><a href="#" className="hover:text-black transition-colors">Contact</a></li>
          </ul>
        </nav>
        
        {currentArt && (<div className={`mt-auto transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}>
          <div className="font-serif font-bold text-[15px] mb-4 tracking-wide">
            {currentArt.title}
          </div>
          <div className="text-[13px] text-[#666] my-2 leading-relaxed">
            {currentArt.medium}
          </div>
          <div className="text-[13px] text-[#666] my-2 leading-relaxed">
            {currentArt.dimensions}
          </div>
          <div className="text-[13px] text-[#666] my-2 leading-relaxed">
            {currentArt.year}
          </div>
          
          <div className="mt-8 text-[11px] tracking-wider uppercase">
            <a href="#" onClick={handlePrev} className="hover:text-black transition-colors">PREV</a> /{' '}
            <a href="#" onClick={handleNext} className="hover:text-black transition-colors">NEXT</a>
          </div>
          <div className="mt-6 text-[11px] tracking-wider uppercase text-[#666]">
            <a href="#" onClick={toggleThumbnails} className="hover:text-black transition-colors">
              {showThumbnails ? 'HIDE THUMBNAILS' : 'SHOW THUMBNAILS'}
            </a>
          </div>
        </div>)}
      </aside>

      <main className="flex-grow relative flex items-center justify-center bg-[#fafafa]">
        {!showThumbnails ? (
          <div className={`transition-opacity duration-300 w-[90%] h-[90%] flex items-center justify-center ${fade ? 'opacity-100' : 'opacity-0'}`}>
            <div className="relative w-full h-full">
              {currentArt ? (
                <Image 
                  src={currentArt.src} 
                  alt={currentArt.title}
                  fill
                  className="object-contain"
                  priority
                />
              ) : (
                <div className="text-[#999] tracking-widest text-sm flex items-center justify-center h-full">NO ARTWORKS IN THIS CATEGORY</div>
              )}
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-[#fafafa] p-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 overflow-y-auto content-start">
            {filteredArtworks.map((art, index) => (
              <div 
                key={index}
                className="cursor-pointer aspect-square bg-[#eee] relative transition-opacity hover:opacity-80"
                onClick={() => selectThumbnail(index)}
              >
                <Image 
                  src={art.src} 
                  alt={art.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
