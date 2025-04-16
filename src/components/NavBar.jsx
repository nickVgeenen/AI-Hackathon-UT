import { NavLink } from 'react-router-dom';

import logo from '../assets/logo.png';
import iconAI from '../assets/icons8-ai-90.png';
import iconChatbot from '../assets/icons8-chatbot-90.png';

export default function Navbar() {
  const navItems = [
    
    {
      to: "/step1",
      icon: iconChatbot,
      title: "Slag 1",
      details: ["Hoe is het gegaan?"],
    },
    
    {
      to: "/step2",
      icon: iconChatbot,
      title: "Slag 2",
      details: ["Doen we het goed?"],
    },
    
    {
      to: "/step3",
      icon: iconChatbot,
      title: "Slag 3",
      details: ["Wat betekent dit voor mij?"],
    },

    {
      to: "/uitreksel",
      icon: iconAI,
      title: "Reflectieverslag",
      details: [],
    },
  ];

  return (
    <nav className="nav">
      <ul>
         
        <li>
          <NavLink to="/studentinterface">
            <div>
              <img src={logo} alt="logo" className="nav-logo" />
            </div>
          </NavLink>
        </li>
        

        {/* Navigation Items */}
        {navItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.to}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              <div className="nav-item">
                <img src={item.icon} alt={item.title} className="nav-icon" />
                <span className="nav-title">{item.title}</span>
              </div>
              {item.details.length > 0 && (
                <ul className="nav-details">
                  {item.details.map((detail, idx) => (
                    <li key={idx} className="nav-list-item">• {detail}</li>
                  ))}
                </ul>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
