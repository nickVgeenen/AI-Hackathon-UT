import { useState, useEffect, useRef } from "react";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

const API_KEY = "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";

function ChatBot() {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "...",
      direction: "incoming",
    },
  ]);
  //const [suggestions, setSuggestions] = useState([]); // Store AI-generated suggestions
  
  const [settings, setSettings] = useState({});
  const hasRun = useRef(false);


  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const fetchSettings = async () => {
      try {
        const response = await fetch('/.netlify/functions/settings');
        const data = await response.json();
        setSettings(data);
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();
  }, []);

  useEffect(() => {
    console.log("SETTINGS CHECK:", settings, Object.keys(settings).length);
    //if (Object.keys(settings).length > 0) {
    if (true) {
      const fetchInitialMessage = async () => {
        try {
          const apiRequestBody = {
            //model: "gpt-3.5-turbo", 
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: UpdateSystemPrompt() },
              //{ role: "user", content: "Hallo, Wat moeten we nu doen?" },
              { role: "user", content: "Zeg nu terug zonder extra tekst 'Hoi, ik ben Holli! Upload of schrijf een tekst om hier samen op te reflecteren:'"},
            ],
          };

          const response = await fetch(
            "https://api.openai.com/v1/chat/completions",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(apiRequestBody),
            }
          );

          const data = await response.json();          
          setMessages([
            {
              message: data.choices[0].message.content,
              direction: "incoming",
            },
          ]);

          //fetchSuggestions(data.choices[0].message.content); // Fetch suggestions after initial message for -> (message)
        } catch (error) {
          console.error("Error fetching initial message:", error);
          setMessages([
            {
              message: "Er is een probleem opgetreden :(",
              direction: "incoming",
            },
          ]);
        }
      };
      fetchInitialMessage();

    }
  }, [settings]);


  //
  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, [messages]);


  const UpdateSystemPrompt = () => {
    let designerSettings =

    "Je bent Holli, een AI-gestuurde reflectiecoach voor pabostudenten (leraren in opleiding voor (speciaal) basisonderwijs en voortgezet speciaal onderwijs). Je voert een vriendelijk, open en coachend gesprek over een praktijkervaring. Je helpt de student om zelf te onderzoeken wat er gebeurde, zonder oordeel of advies. Gebruiksvriendelijke reflectiestructuur: Fase 1 heet nu Situatiebeschrijving: Wat gebeurde er? Wat deed jij? Wat zag of hoorde je? Stel één open vraag per keer. Geef geen adviezen, geen tips. Laat de student het tempo bepalen. Reflectie mag tijd kosten. Houd rekening met de fase van de opleiding: 1e-jaars studenten: help bij het concreet benoemen van handelingen en gevoelens. 3e/4e-jaars studenten: stel diepere vragen over keuze en effect van handelen. Start het gesprek met: Kun je een concrete situatie uit je praktijk beschrijven waar je over wilt nadenken? Als de student vastloopt: Je mag even nadenken. Soms helpt het om klein te beginnen. Wat deed je als eerste? Je hoeft het niet perfect te vertellen. Wat is je het meest bijgebleven? Vervolgvragen kunnen zijn: Wat deed jij precies in deze situatie? Hoe reageerden anderen? Wat viel je op aan jezelf of de ander? Let op culturele sensitiviteit: Stel vragen open, zonder aannames over achtergrond, normen of context. Respecteer de diversiteit van scholen en leerlingen. Let op signalen dat de student mogelijk klaar is met deze fase. Dit herken je aan zinnen zoals (of vergelijkbaar met): ‘Dat is eigenlijk alles wat ik erover kan zeggen.’ ‘Ik denk dat ik het zo wel heb verteld.’ ‘Ik weet niet wat ik er nog meer over moet zeggen.’Dat was het wel, denk ik.’Zoals ik al zei…’Ik heb dit al eerder verteld…’ Als je dit soort uitspraken herkent, stel dan de volgende overgangsvraag: ‘Wil je nog iets toevoegen, of is dit voor jou rond? Zullen we verder naar het volgende deel van de reflectie?’ Afronding: Maak altijd een samenvatting van het gesprek. Zeg daarna:  Wil je verder reflecteren klik dan op stap 2. Wil je het gesprek afronden? Klink dan op afronden. ";    
    //const assistantSetting = localStorage.getItem("assistantSetting") || ""; //details over alle 4 de vragen

    //const transitionSetting = localStorage.getItem("transitionSetting") || ""; //'Ga van x naar y'

    //console.log(designerSettings + " ... " + assistantSetting + " ... " + transitionSetting);
    console.log(designerSettings);
    //return designerSettings + assistantSetting + transitionSetting;
    return designerSettings;

  };

  const handleSend = async (message) => {
    const newMessage = { message, direction: "outgoing" };
    const newMessages = [...messages, newMessage];


    console.log('student : ' + message);
    if (message == 'Ik ga aan de slag!' ){
      setTyping(false);
      setMessages(newMessages);
      console.log('IF STATEMENT COMPLETE');
      alert("Ga van start met de volgende leer activiteit!"); // Show a message to the user
      return
    }

    setMessages(newMessages);
    setTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  /*
  const fetchSuggestions = async (message) => {
    const transitionSetting = localStorage.getItem("transitionSetting").split("."); //get the first part of the transition settings
    
    const apiRequestBody = {
      //model: "gpt-3.5-turbo", 
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Je bent een basisschool leerling met de beschrijving '" + settings.question1 + "'. Beantwoord te gestelde vraag en geef korte antwoorden. Doel: begrijp de instructie en " + transitionSetting[0] + "." },
        { role: "user", content: "Gebruik geen emojis. Genereer een lijst met 3 opties: twee korte verschillende antwoorden als reactie op '" + message + "' en optie 3 is '3. Ik ga aan de slag!'."},
      ],
    };

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody),
      });
      const data = await response.json();

      //const generatedSuggestions = data.choices[0].message.content.split("\n");

      
      for (var i = 0; i < generatedSuggestions.length; i++) {
        generatedSuggestions[i] = generatedSuggestions[i].substring(3);
    }

      setSuggestions(generatedSuggestions.slice(0, 3)); // Store only 3 suggestions
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
    
  };
  */
  

  const processMessageToChatGPT = async (chatMessages) => {
    let apiMessages = chatMessages.map((messageObject) => ({
      role: messageObject.direction === "incoming" ? "assistant" : "user",
      content: messageObject.message,
    }));

    const apiRequestBody = {
      //: "gpt-3.5-turbo", 
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: UpdateSystemPrompt() }, ...apiMessages],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => data.json())
      .then((data) => {
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            direction: "incoming",
          },
        ]);
        setTyping(false);

        //suggestion fetchSuggestions(data.choices[0].message.content); // Fetch new suggestions after receiving a reply
      });
  };

  return (
    <>
      <h2 className="pageTitle">Reflecteren met het 3-slag model</h2>
      <MainContainer className="customMainContainer">
        <ChatContainer className="customChatContainer">
          <MessageList
            scrollBehavior="smooth"
            typingIndicator={
              typing ? <TypingIndicator content="Holli is aan het nadenken..." /> : null
            }
          >
            {messages.map((message, i) => (
              <Message
                key={i}
                model={{ message: message.message, direction: message.direction }}
              />
            ))}
          </MessageList>

          <MessageInput
            placeholder="Geef antwoord op Holli..."
            onSend={handleSend}
          />
          
        </ChatContainer>
      </MainContainer>
      {/* suggestion
      <div className="suggestionsContainer">
      <Suggestions ClassName="suggestions" suggestions={suggestions} onSelect={handleSend} />
      </div>
      */}
            

    </>
  );
}

//disabled function suggestion
function Suggestions({ suggestions, onSelect }) {
  return (
    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
      {suggestions.map((suggestion, index) => (
        <button 
          key={index}
          onClick={() => onSelect(suggestion)}
          className="suggestionBtn"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}

export default ChatBot;
