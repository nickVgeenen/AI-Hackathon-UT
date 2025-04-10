import React from 'react';

const CollapsibleSection = ({ title, buttons, onSelect, selectedButton, isOpen, onToggle }) => {

    return (
        <div className="collapsible-section">
            <button className="toggle-button" onClick={onToggle}>
                {title}

                <span className="toggle-icon">
                    {isOpen ? (
                        <img 
                            src="https://img.icons8.com/ios-filled/50/000000/collapse-arrow.png" 
                            alt="Collapse" 
                            className="icon-arrow" 
                        />
                    ) : (
                        <img 
                            src="https://img.icons8.com/ios-filled/50/000000/expand-arrow.png" 
                            alt="Expand" 
                            className="icon-arrow" 
                        />
                    )}
                </span>

            </button>
            {isOpen && (
                <div className="button-container">
                    {buttons.map((button, index) => (
                        <button
                            key={index}
                            className={`square-button ${selectedButton === button.name ? 'selected' : ''}`}
                            onClick={() => onSelect(button.name)}
                        >
                            <span className="icon">{button.icon}</span>
                            <span className="buttonLabel">{button.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CollapsibleSection;
