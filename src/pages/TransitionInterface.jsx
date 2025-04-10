import { useState, useEffect } from "react";
import Class from '../components/Class';
import Individual from '../components/Individual';
import { useNavigate } from "react-router-dom";


const DoubleSidedLayout = () => {

    //chatgpt
    const [leftOpenSection, setLeftOpenSection] = useState('class'); // Default: "class"
    const [rightOpenSection, setRightOpenSection] = useState('individual'); // Default: "individual"

    const handleToggleLeft = (section) => {
        setLeftOpenSection((prev) => (prev === section ? null : section));
    };

    const handleToggleRight = (section) => {
        setRightOpenSection((prev) => (prev === section ? null : section));
    };
    //



    const [leftSelection, setLeftSelection] = useState(null);
    const [rightSelection, setRightSelection] = useState(null);
    const [transitionPrompt, setTransitionPrompt] = useState(localStorage.getItem("transitionPrompt") || '');

    const navigate = useNavigate(); // Initialize useNavigate

    const [isGlowing, setIsGlowing] = useState(false);


    useEffect(() => {
        localStorage.setItem("transitionPrompt", transitionPrompt);
    }, [transitionPrompt]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (leftSelection === null || rightSelection === null) {
            alert("Kies links de vorige leeractiviteit en rechts de volgende leeractiviteit"); // Show a message to the user
            return; // Prevent navigation
        }

        try {
            //passing var
            const transitionSettingFile1 = ' Maak een bruggetje van ' + leftSelection + ' naar ' + rightSelection +
            '. Leg de praktische stappen uit voor het maken van deze overgang in emoji bulletpoints. Belangrijk: Motiveer de leerlingen met "' + transitionPrompt + 
            '". Behandel slechts één vak tegelijk, stop niet te veel tekst in één bericht. Geef de leerlingen de ruimte om nieuwe energie te vinden voor de volgende activiteit. Neem de leerling eerst mee door ze één duidelijke vraag te stellen aan het einde van je bericht maar geef ze daarna de ruimte om aan de slag te gaan.';
            localStorage.setItem('transitionSetting', transitionSettingFile1);
            //console.log(transitionSettingFile1);
    
            // Navigate to the next page after successful submission
            navigate("/studentinterface");
            
            } catch (error) {
            console.error("Error updating transition settings:", error);
            }
    };

    const handleSelection = (side, buttonName) => {
        if (side === 'left') setLeftSelection(buttonName);
        if (side === 'right') setRightSelection(buttonName);
        //console.log('selected: ' + side + ' ' + buttonName);
    };

    return (
        <>
            <h2 className="pageTitle">Bruggetje instellen</h2>
            <div className="double-sided-layout">
                {/* Left Panel */}
                <div className="side-panel">
                    <label className="promptTitleB">Vorige leeractiviteit</label>
                    <Class 
                        onSelect={(buttonName) => handleSelection('left', buttonName)} 
                        selectedButton={leftSelection} 
                        isOpen={leftOpenSection === 'class'}
                        onToggle={() => handleToggleLeft('class')}
                    />
                    <Individual 
                        onSelect={(buttonName) => handleSelection('left', buttonName)} 
                        selectedButton={leftSelection} 
                        isOpen={leftOpenSection === 'individual'}
                        onToggle={() => handleToggleLeft('individual')}
                    />
                </div>

                {/* Center Panel */}
                <div className="transition-center">
                    <label className="promptTitleB">Bruggetje</label>
                    <label className="promptSubTitle">
                        Waarmee gaan de leerlingen nu aan de slag? 
                        Hoe zorgen we voor de juiste mindset en stemming bij de leerlingen?
                    </label>
                        <textarea className="textfield"
                            placeholder="Rekenen in hun werkboek. Ze moeten hun focus behouden en de uitleg meenemen naar de opdracht. Gebruik hiervoor een kleine puzzel of quizvraag"
                            value={transitionPrompt}
                            onChange={(e) => setTransitionPrompt(e.target.value)}
                            style={{
                                width: '85%',
                                height: '240px',
                                resize: 'none',
                                padding: '8px',
                                boxSizing: 'border-box',
                            }}
                        />
                    <form onSubmit={handleSubmit}>
                        <button className="submit" >Starten</button>
                    </form>
                </div>

                {/* Right Panel */}
                <div className="side-panel">
                    <label className="promptTitleB">Volgende leeractiviteit</label>
                    <Class 
                        onSelect={(buttonName) => handleSelection('right', buttonName)} 
                        selectedButton={rightSelection} 
                        isOpen={rightOpenSection === 'class'}
                        onToggle={() => handleToggleRight('class')}
                    />
                    <Individual 
                        onSelect={(buttonName) => handleSelection('right', buttonName)} 
                        selectedButton={rightSelection} 
                        isOpen={rightOpenSection === 'individual'}
                        onToggle={() => handleToggleRight('individual')}
                    />
                </div>

            </div>
        </>
    );
};

export default DoubleSidedLayout;
