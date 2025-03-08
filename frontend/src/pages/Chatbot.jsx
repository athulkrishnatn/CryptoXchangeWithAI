import { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Controls chatbot visibility

  const GEMINI_API_KEY = "AIzaSyC5TMyR91JBKaFGu8bZICVD5DpDhXogvNs"; // Replace with actual API key
  const COINGECKO_API_URL = "https://api.coingecko.com/api/v3/simple/price";

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages([...messages, userMessage]);

    if (isPriceQuery(input)) {
      await fetchCryptoPrice(input);
    } else {
      await fetchAIResponse(input);
    }

    setInput(""); // Clear input field
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
    <div>
      {/* Floating Chat Button */}
      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        💬
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-16 right-6 w-80 bg-gray-900 text-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold mb-2">CryptoTrackrAI Chatbot</h2>

          <div className="h-60 overflow-y-auto p-2 bg-gray-800 rounded-md">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 my-1 rounded-lg ${msg.role === "user" ? "bg-blue-600 text-right" : "bg-gray-700 text-left"}`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="mt-2 flex">
            <input
              type="text"
              className="flex-1 p-2 rounded-md bg-gray-700 text-white"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about crypto..."
            />
            <button onClick={sendMessage} className="ml-2 bg-blue-600 p-2 rounded-md">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
