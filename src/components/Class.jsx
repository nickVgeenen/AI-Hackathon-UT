// src/components/Class.jsx
import React from 'react';
import CollapsibleSection from './CollapsibleSection';

import explain from '../assets/icons8-presentation-90.png'; //
import group from '../assets/icons8-group-90.png'; //
import dictee from '../assets/icons8-long-words-90.png'; //
import video from '../assets/icons8-video-90.png'; //
import eat from '../assets/icons8-eat-90.png'; //
import quiz from '../assets/icons8-question-90.png'; //


const Class = ({ onSelect, selectedButton, isOpen, onToggle}) => {
    const buttons = [
        { name: 'Uitleg', icon: <img src={explain} alt="Explain" className='iconPNG' /> },
        { name: 'Kring', icon: <img src={group} alt="Group" className='iconPNG'/> },
        { name: 'Dictee', icon: <img src={dictee} alt="Dictee" className='iconPNG'/> },
        { name: 'Video', icon: <img src={video} alt="Video" className='iconPNG'/> },
        { name: 'Pauze', icon: <img src={eat} alt="Eat" className='iconPNG'/> },
        { name: 'Quiz', icon: <img src={quiz} alt="Quiz" className='iconPNG'/> },
    ];

    

    return <CollapsibleSection
        title="Klassikaal"
        buttons={buttons}
        onSelect={onSelect}
        selectedButton={selectedButton}
        isOpen={isOpen}
        onToggle={onToggle}
        />;
};

export default Class;
