import { NavLink } from 'react-router-dom';

import logo from '../assets/brugbotLogo.png';
import iconAI from '../assets/icons8-ai-90.png';
import iconBridge from '../assets/icons8-bridge-90.png';
import iconChatbot from '../assets/icons8-chatbot-90.png';

export default function Navbar() {
  const navItems = [
    {
      to: "/assistantsettings",
      icon: iconAI,
      title: "AI chatbot instellen",
      details: ["Mijn Klas", "Methode", "Thema", "Taken"],
    },
    {
      to: "/transitioninterface",
      icon: iconBridge,
      title: "Bruggetje instellen",
      details: ["Vorige leeractiviteit", "Bruggetje", "Volgende leeractiviteit"],
    },
    {
      to: "/studentinterface",
      icon: iconChatbot,
      title: "Chatbot voorbeeld",
      details: [],
    },
  ];

  return (
    <nav className="nav">
      <ul>
        {/* Home Logo */}
        <li>
          <NavLink to="/transitioninterface">
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
