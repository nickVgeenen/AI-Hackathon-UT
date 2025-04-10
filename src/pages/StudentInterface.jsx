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
  const [suggestions, setSuggestions] = useState([]); // Store AI-generated suggestions
  
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
    if (Object.keys(settings).length > 0) {
      const fetchInitialMessage = async () => {
        try {
          const apiRequestBody = {
            //model: "gpt-3.5-turbo", 
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: UpdateSystemPrompt() },
              { role: "user", content: "Hallo, Wat moeten we nu doen?" },
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

          fetchSuggestions(data.choices[0].message.content); // Fetch suggestions after initial message for -> (message)
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
      "Jouw naam is BrugBot. Gedraag je als een vriendelijke, creatieve en betrouwbare chatbot met het doel om leerlingen op Nederlandse basisscholen te helpen met de overschakeling van een leer activiteit naar een volgende leer activiteit door het maken van een bruggetje. Gebruik emojis. Je geeft de leerling instructies om hen efficient te laten starten aan de volgende leer activiteit. De docent van de leerlingen is ook aanwezig en je werkt samen met hen om de leerlingen te helpen. De docent heeft je wat informatie gegeven over de leerlingen en jouw gewenste aanpak: ";


    const assistantSetting = localStorage.getItem("assistantSetting") || ""; //details over alle 4 de vragen

    const transitionSetting = localStorage.getItem("transitionSetting") || ""; //'Ga van x naar y'

    console.log(designerSettings + " ... " + assistantSetting + " ... " + transitionSetting);
    return designerSettings + assistantSetting + transitionSetting;
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

      const generatedSuggestions = data.choices[0].message.content.split("\n");

      //alert(s2); // shows "oobar"
      for (var i = 0; i < generatedSuggestions.length; i++) {
        generatedSuggestions[i] = generatedSuggestions[i].substring(3);
    }

      setSuggestions(generatedSuggestions.slice(0, 3)); // Store only 3 suggestions
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

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

        fetchSuggestions(data.choices[0].message.content); // Fetch new suggestions after receiving a reply
      });
  };

  return (
    <>
      <h2 className="pageTitle">Chatbot voorbeeld</h2>
      <MainContainer className="customMainContainer">
        <ChatContainer className="customChatContainer">
          <MessageList
            scrollBehavior="smooth"
            typingIndicator={
              typing ? <TypingIndicator content="ChatGPT is typing..." /> : null
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
            placeholder="Geef antwoord op de chatbot..."
            onSend={handleSend}
          />
          
        </ChatContainer>
      </MainContainer>
      <div className="suggestionsContainer">
      <Suggestions ClassName="suggestions" suggestions={suggestions} onSelect={handleSend} />
      </div>
            

    </>
  );
}

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
