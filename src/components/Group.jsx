// src/components/Group.jsx
import React from 'react';
import CollapsibleSection from './CollapsibleSection';

//svgs


const Group = ({ onSelect, selectedButton, isOpen, onToggle }) => {
    const buttons = [
        { name: 'Group A', icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="teal" /></svg> },
        { name: 'Group B', icon: <svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" fill="coral" /></svg> },
        { name: 'Group C', icon: <svg viewBox="0 0 24 24"><polygon points="12,2 2,22 22,22" fill="brown" /></svg> },
        { name: 'Group D', icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" fill="cyan" /></svg> },
        { name: 'Group E', icon: <svg viewBox="0 0 24 24"><path d="M12 2 L2 22 H22 Z" fill="lavender" /></svg> },
        { name: 'Group F', icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" fill="magenta" /></svg> },
    ];

    return <CollapsibleSection title="Group" buttons={buttons} onSelect={onSelect} selectedButton={selectedButton}  />;
};

export default Group;
