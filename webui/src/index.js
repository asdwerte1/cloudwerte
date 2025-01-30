import React, { useEffect, useState } from 'react';
import './App.css';
import ReactDOM from 'react-dom/client';

function Icon({ title, image_route, url }) {
  return (
    <div className='container-icon'>
      <h2>{title}</h2>
      <img src={image_route} alt='Container logo' />
      <br />
      <a href={url} target='_blank' rel='noreferrer'><button>Launch</button></a>
    </div>
  );
}

function App() {
  const [containers, setContainers] = useState({});

  useEffect(() => {
    fetch("./containers.json")
      .then((response) => response.json())
      .then((data) => setContainers(data))
      .catch((error) => console.error("Error loading JSON" , error));
  }, []);

  return (
    <div>
      {Object.entries(containers).map(([name, info]) => (
        <Icon key={name} title={name} image_route={info.imagePath} url={info.containerUrl} />
      ))}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('react-section'));
root.render(<App />);