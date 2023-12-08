
import React, { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import HomeFeatures from './components/HomeFeatures';
import SpeedDial from './components/SpeedDial';
import MonthViewCalendar from './components/MonthViewCalendar';
import ShareToDo from './components/ShareToDo';
import AddToDo from './components/AddToDo';
import { useRouter } from 'next/router';

function Planned() {

    const router = useRouter();
    const [userData, setUserData] = useState({});

    const getUserData = async () => {
        const apiUrl = `http://localhost:2020/users/${sessionStorage.getItem(
            "user_id"
        )}`;

        try {
            const response = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        if (sessionStorage.getItem("user_id") == null) {
            router.push("/Login");
        }
        getUserData();
    }, []);
    return (
        <>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.0/flowbite.min.js"></script>
            <div>
                <ShareToDo />
                <AddToDo />
                <NavBar userData={userData} />
                <HomeFeatures userData={userData} />
                <MonthViewCalendar />
                <SpeedDial />

            </div>
        </>
    );
}

export default Planned;
