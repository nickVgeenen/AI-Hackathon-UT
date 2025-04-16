import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NoPage from './pages/NoPage';
import NavBar from './components/NavBar';

import Step1 from './pages/Step1';
import Step2 from './pages/Step2';
import Step3 from './pages/Step3';
import Uitreksel from './pages/Uitreksel';




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
  {/*
            <Route index element={<TransitionInterface />} />
            <Route path="/assistantsettings" element={<AssistantSettings />} />
            <Route path="/transitioninterface" element={<TransitionInterface />} />
  */}
            <Route path="/step1" element={<Step1 />} />
            <Route path="/step2" element={<Step2 />} />
            <Route path="/step3" element={<Step3 />} />


            <Route path="/uitreksel" element={<Uitreksel />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}


export default App;
