import Navbar from "../components/NavBar";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";


//import {systemMessageContent} from "../pages/StudentInterface";
//let systemMessageContent = "Talk like a italian mobster"

const Create = () => {
    
    const [question1, setQuestion1] = useState(localStorage.getItem("question1") || '');
    const [question2, setQuestion2] = useState(localStorage.getItem("question2") || '');
    const [question3, setQuestion3] = useState(localStorage.getItem("question3") || '');
    const [question4, setQuestion4] = useState(localStorage.getItem("question4") || '');
    

    const navigate = useNavigate(); // Initialize useNavigate

        // Save each input to localStorage whenever it changes
        useEffect(() => {
            localStorage.setItem("question1", question1);
        }, [question1]);
    
        useEffect(() => {
            localStorage.setItem("question2", question2);
        }, [question2]);
    
        useEffect(() => {
            localStorage.setItem("question3", question3);
        }, [question3]);
    
        useEffect(() => {
            localStorage.setItem("question4", question4);
        }, [question4]);


    const handleSubmit = async (e) => {
        e.preventDefault(); //working?!
        const systemSettings = { question1, question2, question3, question4};

        try {

              const assistantSettingFile1 = 
              
                "De docent noemt de klas " + question1 +". Houd hiermee rekening met de woordkeuze. " +
                "De docent werkt met de methode " + question2 + ". Onderzoek wat deze methode inhoud en pas het toe. " +
                "De leerlingen werken momenteel met het doorlopende thema " + question3 + ". verwerk dit subtiel. " +
                "De docent heeft als achtergrond informatie een planning gedeeld voor de komende periode: '" + question4 + "' Gebruikt dit alleen als het bruggetje betrekking heeft tot deze vakken, en anders niet. "; 

            localStorage.setItem('assistantSetting', assistantSettingFile1);
            
            console.log("Settings updated:", assistantSettingFile1);

            /*
            await fetch('/.netlify/functions/settings', {
                method: "PATCH",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(systemSettings),
            });

            console.log("Settings updated:", systemSettings);
            */
            // Navigate to the next page after successful submission
            navigate("/transitioninterface");
        
        } catch (error) {
        console.error("Error updating settings:", error);
        }

        };
       

    return (
        <div className="create">
            <h2 className="pageTitle">AI chatbot instellen</h2>
            <form onSubmit={handleSubmit}>     
                <label className="promptTitleA">Mijn Klas</label>
                <label className="promptSubTitle">Wat kan je vertellen over de groep die je lesgeeft?</label>
                <textarea className="textfield" 
                type="text"
                placeholder="Groep 5A de kikkertjes, een vaak onrustige klas met 3 kinderen die extra aandacht nodig hebben "
                style={{
                    width: '100%', // Fills the container's width
                    height: '50px', // Fills the container's height
                    resize: 'none', // Prevents resizing (optional)
                    padding: '8px', // Adds some padding for better user experience
                }}
                value = {question1} //two way minding with the input from the user
                onChange={(e) => setQuestion1(e.target.value)}
                />

                <label className="promptTitleA">Methode</label>
                <label className="promptSubTitle">Op basis van welke methodes gaan leerlingen aan het werk?</label>
                <textarea className="textfield"
                type="text"
                placeholder="We gebruiken een Jenaplan methode"
                style={{
                    width: '100%', // Fills the container's width
                    height: '50px', // Fills the container's height
                    resize: 'none', // Prevents resizing (optional)
                    padding: '8px', // Adds some padding for better user experience
                }}
                value = {question2} //two way minding with the input from the user
                onChange={(e) => setQuestion2(e.target.value)}
                />   

                <label className="promptTitleA">Thema</label>
                <label className="promptSubTitle">Met welk thema zijn leerlingen aan het werk?</label>
                <textarea className="textfield"
                type="text"
                placeholder="Het thema is chocolade"
                style={{
                    width: '100%', // Fills the container's width
                    height: '50px', // Fills the container's height
                    resize: 'none', // Prevents resizing (optional)
                    padding: '8px', // Adds some padding for better user experience
                }}
                value = {question3} //two way minding with the input from the user
                onChange={(e) => setQuestion3(e.target.value)}
                />       

                                <label className="promptTitleA">Taken en Planning</label>
                <label className="promptSubTitle">Welke taken staat er bij de leerlingen op de planning?</label>
                <textarea className="textfield" 
                type="text"
                placeholder="Rekenen: hoofdstuk 10 - breuken
Spelling: hoofdstuk 3 - Hoofdletters
Lezen: Hun eigen leesboek
                 "
                style={{
                    width: '100%', // Fills the container's width
                    height: '50px', // Fills the container's height
                    resize: 'none', // Prevents resizing (optional)
                    padding: '8px', // Adds some padding for better user experience
                }}
                value = {question4} //two way minding with the input from the user
                onChange={(e) => setQuestion4(e.target.value)}
                />                   

                

                <button className="submit" type="submit">Opslaan</button>


            </form>
        </div>
    )
}

export default Create;
//export { systemMessageContent };