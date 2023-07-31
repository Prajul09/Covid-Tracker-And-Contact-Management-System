import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Contact from '@/components/Contact';
import dynamic from 'next/dynamic';

const Maps = dynamic(() => import('@/components/Maps'), { ssr: false });
const Charts = dynamic(() => import('@/components/Charts'), { ssr: false });

const Home = () => {
  const [selectedScreen, setSelectedScreen] = useState('contact');
  const [contacts, setContacts] = useState([]);

  const handleContactClick = () => {
    setSelectedScreen('contact');
  };

  const handleMapsClick = () => {
    setSelectedScreen('maps');
  };

  const handleChartsClick = () => {
    setSelectedScreen('charts');
  };

  return (
    <div>
      <Sidebar onContactClick={handleContactClick} onMapsClick={handleMapsClick} onChartsClick={handleChartsClick} />
      <div className="ml-60 p-4">
        {selectedScreen === 'contact' && <Contact contacts={contacts} setContacts={setContacts} />}
        {selectedScreen === 'maps' && <Maps />}
        {selectedScreen === 'charts' && <Charts />}
      </div>
    </div>
  );
};

export default Home;



