// src/components/Individual.jsx
import React from 'react';
import CollapsibleSection from './CollapsibleSection';

import reading from '../assets/icons8-book-reading-90.png'; //
import writing from '../assets/icons8-writing-90.png'; //
import book from '../assets/icons8-book-90.png'; //
import typing from '../assets/icons8-typing-90.png'; //
import video from '../assets/icons8-video-90.png'; //
import game from '../assets/icons8-game-90.png'; //

const Individual = ({ onSelect, selectedButton, isOpen, onToggle }) => {
    const buttons = [
        { name: 'Lezen', icon: <img src={reading} alt="reading" className='iconPNG' /> },
        { name: 'Schrijven', icon: <img src={writing} alt="writing" className='iconPNG' /> },
        { name: 'Werkboek', icon: <img src={book} alt="book" className='iconPNG' /> },
        { name: 'Typen', icon: <img src={typing} alt="typing" className='iconPNG' /> },
        { name: 'Video', icon: <img src={video} alt="video" className='iconPNG' /> },
        { name: 'Game', icon: <img src={game} alt="game" className='iconPNG' /> },
    ];

    return <CollapsibleSection 
        title="Zelfstandig"
        buttons={buttons} 
        onSelect={onSelect} 
        selectedButton={selectedButton}
        isOpen={isOpen}
        onToggle={onToggle}
          />;
};

export default Individual;
