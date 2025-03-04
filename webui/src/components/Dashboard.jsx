import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Icon = ({ title, description, image_route, url }) => {
    return (
        <div className='container-icon'>
            <h2>{title}</h2>
            <p>{description}</p>
            <img src={image_route} alt='Container logo' />
            <br />
            <a href={`${url}`} target='_blank' rel='noreferrer'><button>Launch</button></a>
        </div>
    );
}

const Dashboard = () => {
    const [containers, setContainers] = useState({});
    const navigate = useNavigate();
    const settings = () => navigate("/settings");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        axios
            .get("http://localhost:5000/api/containers", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => setContainers(response.data))
            .catch((error) => console.error("Error loading containers:", error));
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div>
            <div id="icons">
                {Object.entries(containers).map(([name, info]) => (
                    <Icon key={name} title={name} description={info.description} image_route={info.imagePath} url={info.containerUrl} />
                ))}
            </div>
            <div className="align-center nav">
                <button onClick={handleLogout}>Logout</button>
                <button onClick={settings}>Settings</button>
            </div>
        </div>
    );
};

export default Dashboard;