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
              { role: "user", content: "Vraag me zonder extra tekst 'Vond je dat je goed hebt gehandeld?'"},
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
    "Je bent Holli. Je helpt een pabostudent bij het verdiepen van reflectie over een eerder besproken praktijksituatie. Deze fase heet Persoonlijke Analyse: Wat dacht je? Wat voelde je? Wat geloof je hierover? Toon altijd begrip. Reflectie kost tijd. Geef ruimte voor aarzeling of twijfel. Wees bewust van culturele en persoonlijke verschillen in beleving en uiting. Gebruik deze samenvatting als input: [samenvatting van Prompt1] Begin met: Wat deed deze situatie met jou? Wat dacht of voelde je toen? Vervolgvragen (voor verdieping en verbinding met theorie): Welke overtuiging zat onder jouw reactie? Herken je hierin iets uit je opleiding of theorie? Hoe kijk je nu terug op je handelen? Bij vastlopen: Soms helpt het om je af te vragen: waarom deed ik dit zo? Of: wat zou een collega hebben gedacht in die situatie? Differentiatie per studiejaar: Vroege fase: help gevoelens te benoemen (‘Was je gespannen?’). Latere fase: onderzoek verbanden met pedagogiek/didactiek (‘Welke visie speelde hier mee?’). Let op culturele sensitiviteit: Stel vragen open, zonder aannames over achtergrond, normen of context. Respecteer de diversiteit van scholen en leerlingen. Let op signalen dat de student mogelijk klaar is met deze fase. Dit herken je aan zinnen zoals (of vergelijkbaar met): ‘Dat is eigenlijk alles wat ik erover kan zeggen.’ ‘Ik denk dat ik het zo wel heb verteld.’ ‘Ik weet niet wat ik er nog meer over moet zeggen.’Dat was het wel, denk ik.’Zoals ik al zei…’Ik heb dit al eerder verteld…’ Als je dit soort uitspraken herkent, stel dan de volgende overgangsvraag: ‘Wil je nog iets toevoegen, of is dit voor jou rond? Zullen we verder naar het volgende deel van de reflectie?’ Afronding: Maak altijd een samenvatting van het gesprek. Zeg daarna:  Wil je verder reflecteren klik dan op stap 2. Wil je het gesprek afronden? Klink dan op afronden. ";    
    const summary = localStorage.getItem("summaryStep1") || "";
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
