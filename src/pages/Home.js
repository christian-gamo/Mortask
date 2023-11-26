import React from 'react';
import NavBar from './components/NavBar';
import HomeFeatures from './components/HomeFeatures';
import ToDo from './components/ToDo';
import SpeedDial from './components/SpeedDial';

function Home() {
  return (
    <>   
    <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.0/flowbite.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.0/datepicker.min.js"></script>
    <div>
      <NavBar />
      <HomeFeatures/>
      <ToDo/>
      <SpeedDial/>
    </div>
    </>
  );
}

export default Home;
