import React, { useState, useEffect, useRef } from 'react';
import latar2 from './assets/latar2.png';

const Nav = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef([]);

  const NavItems = [
    'Valuta',
    'Nilai',
    'Incoterm',
    'No. COO',
    'Tgl. COO',
    'No & Tgl. Dokumen Lartas LS/SNI/PI',
    'Kode Fasilitas per Item',
    'Shipper di COO',
    'Origin Criteria pada COO',
    'Issued Retro',
    'Third Party Invoicing'
  ];

  const handleKeyPress = (e) => {
    if (e.key === 'ArrowRight') {
      setActiveIndex((prevIndex) => (prevIndex + 1) % NavItems.length);
    } else if (e.key === 'ArrowLeft') {
      setActiveIndex((prevIndex) => (prevIndex - 1 + NavItems.length) % NavItems.length);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [activeIndex]);

  return (
    <div
      className="flex flex-col justify-center items-center h-screen"
      style={{
        backgroundImage: `url(${latar2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h1 className="text-3xl font-bold mb-6 text-blue-500 bg-white bg-opacity-80 p-1 rounded">
        Form Monitoring
      </h1>
      <div className="flex flex-col space-y-4 p-3 w-full max-w-xl h-[75vh] overflow-y-scroll scrollbar-none">
        {NavItems.map((item, index) => (
          <div
            key={index}
            ref={(el) => (itemRefs.current[index] = el)}
            className={`w-full p-8 rounded-md text-center text-xl font-bold transition-colors duration-300 ${
              index === activeIndex
                ? 'bg-red-500 text-white'
                : index < activeIndex
                ? 'bg-green-500 text-white'
                : 'bg-gray-200'
            }`}
            style={{
              color: index === activeIndex || index < activeIndex ? 'white' : '#4a4a4a',
              fontSize: '1.2rem', 
              padding: '1.1rem', 
              border: 'none'
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Nav;
