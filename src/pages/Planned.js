
import React from 'react';
import NavBar from './components/NavBar';
import HomeFeatures from './components/HomeFeatures';
import SpeedDial from './components/SpeedDial';
import MonthViewCalendar from './components/MonthViewCalendar';
import ShareToDo from './components/ShareToDo';
import AddToDo from './components/AddToDo';

function Planned() {
    return (
        <>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.0/flowbite.min.js"></script>
            <div>
                <ShareToDo />
                <AddToDo />
                <NavBar />
                <HomeFeatures />
                <MonthViewCalendar />
                <SpeedDial />
            </div>
        </>
    );
}

export default Planned;
