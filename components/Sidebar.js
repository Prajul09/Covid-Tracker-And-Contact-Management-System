import React from 'react';

const Sidebar = ({ onContactClick, onMapsClick, onChartsClick }) => {
  return (
    <div className="fixed top-0 left-0 h-full w-60 bg-gray-900 text-white">
      <div className="py-4 px-3">
        <h1 className="text-xl font-bold">Side Navbar</h1>
      </div>
      <ul className="mt-6">
        <li onClick={onContactClick} className="cursor-pointer py-2 px-4 hover:bg-gray-800">
          Contact
        </li>
        <li onClick={onMapsClick} className="cursor-pointer py-2 px-4 hover:bg-gray-800">
          Maps
        </li>
        <li onClick={onChartsClick} className="cursor-pointer py-2 px-4 hover:bg-gray-800">
          Charts & Graphs
        </li>
      </ul>

      <style jsx>{`
        @media (max-width: 640px) {
          .fixed {
            width: 100%; 
            max-width: 170px; 
            transition: max-width 0.3s ease-in-out; 
          }

          .py-4 {
            padding-top: 2rem; 
          }
        }
      `}</style>
    </div>
  );
};

export default Sidebar;

