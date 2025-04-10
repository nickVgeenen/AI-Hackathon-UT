import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AssistantSettings from './pages/AssistantSettings';
import TransitionInterface from './pages/TransitionInterface';
import StudentInterface from './pages/StudentInterface';
import NoPage from './pages/NoPage';
import NavBar from './components/NavBar';

import './main.scss'; // Adjust the path based on your file structure


// Styles
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <div className="content">
          <Routes>
            <Route index element={<TransitionInterface />} />
            <Route path="/assistantsettings" element={<AssistantSettings />} />
            <Route path="/transitioninterface" element={<TransitionInterface />} />
            <Route path="/studentinterface" element={<StudentInterface />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}


export default App;
