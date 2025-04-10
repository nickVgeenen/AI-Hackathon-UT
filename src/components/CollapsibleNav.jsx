import React, { useState } from 'react';

const CollapsibleSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => setIsOpen(!isOpen);

  return (
    <div className="collapsible-section">
      <button className="toggle-button" onClick={toggleCollapse}>
        {title}
        <span className="toggle-icon">{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && <div className="collapsible-content">{children}</div>}
    </div>
  );
};

export default CollapsibleSection;
