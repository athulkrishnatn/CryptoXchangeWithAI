import { useState, useEffect } from "react";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const GEMINI_API_KEY = "AIzaSyC5TMyR91JBKaFGu8bZICVD5DpDhXogvNs"; 
  const COINGECKO_API_URL = "https://api.coingecko.com/api/v3/simple/price";

  const [hasGreeted, setHasGreeted] = useState(false);

  // Welcome message 
  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "bot", text: "Hello!👋 Welcome to CryptoTrackrAI Assistant! How can I assist you today?" }
      ]);
      setHasGreeted(true);
    }

    if (!isOpen) {
      setHasGreeted(false);
      setMessages([]);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages([...messages, userMessage]);

    if (isPriceQuery(input)) {
      await fetchCryptoPrice(input);
    } else {
      await fetchAIResponse(input);
    }

    setInput("");
  };

  const isPriceQuery = (text) => /(price|value|rate)\s+of\s+(\w+)/i.test(text);

  const fetchCryptoPrice = async (text) => {
    const match = text.match(/(price|value|rate)\s+of\s+(\w+)/i);
    if (!match) return;

    const coin = match[2].toLowerCase();
    try {
      const response = await fetch(`${COINGECKO_API_URL}?ids=${coin}&vs_currencies=usd`);
      const data = await response.json();

      if (data[coin]) {
        const price = data[coin].usd;
        setMessages((prev) => [...prev, { role: "bot", text: `The current price of ${coin.toUpperCase()} is $${price}` }]);
      } else {
        setMessages((prev) => [...prev, { role: "bot", text: "I couldn't find the price. Try again with a valid crypto name!" }]);
      }
    } catch (error) {
      console.error("❌ CoinGecko API Error:", error);
      setMessages((prev) => [...prev, { role: "bot", text: "Error fetching crypto price!" }]);
    }
  };

  const fetchAIResponse = async (text) => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text }] }],
          }),
        }
      );

      const data = await response.json();

      if (data?.candidates?.length > 0) {
        const botReply = data.candidates[0]?.content?.parts?.[0]?.text || "No response from AI";
        setMessages((prevMessages) => [...prevMessages, { role: "bot", text: botReply }]);
      } else {
        setMessages((prevMessages) => [...prevMessages, { role: "bot", text: "I couldn't fetch a response. Try again!" }]);
      }
    } catch (error) {
      console.error("❌ Gemini API Error:", error);
      setMessages((prevMessages) => [...prevMessages, { role: "bot", text: "Something went wrong!" }]);
    }
  };

  return (
    <div className="z-50">
      {/* Floating Chat Button */}
      <button
        className="fixed bottom-6 right-6 hover:scale-125 transition-all duration-300 bg-white text-black p-3 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <QuestionAnswerIcon />
      </button>

      {/* Chat  */}
      <div
        className={`fixed bottom-16 right-6 w-[400px] bg-gray-100 text-white border border-gray-300 
                    transition-all duration-300 p-4 rounded-lg shadow-lg z-50 transform 
                    ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}`}
      >
        <h2 className="text-lg font-light mb-2 text-black ms-4">
          CryptoTrackerAI Chatbot <PsychologyAltIcon className="mb-2" />
        </h2>

        <div className="h-[500px] overflow-y-auto p-4 text-sm bg-white rounded-md">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 my-1 rounded-lg ${
                msg.role === "user"
                  ? "bg-gray-300 text-black my-3 text-right font-light"
                  : "bg-gray-900 text-white text-left font-light"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="mt-2 flex">
          <input
            type="text"
            className="flex-1 p-2 text-sm rounded-md bg-white text-black"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about crypto..."
          />
          <button onClick={sendMessage} className="ml-2 bg-black p-2 rounded-md">
            <SendRoundedIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
