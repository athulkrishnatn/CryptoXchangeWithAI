import React from "react";
import Footer from "@/components/Common/Footer/Footer";
import Header from "@/components/Common/Header";
import { FlipWords } from "@/components/ui/flip-words"; // Adjust the path if needed
import video from "@/assets/video.mp4";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from "react-router-dom";
import GlowingEffectTest from "@/components/GlowingEffectTest";


const About = () => {
  const wordsArray = [
    "Real-time Market Intelligence",
    "AI-Driven Predictive Analytics",
    "Portfolio Management"
  ];

  return (
    <>
      <Header />
     
      <div className= " bg-black text-white min-h-screen flex flex-col items-start px-6 md:px-10 relative mt-[250px] lg:mt-[20px] sm:mt-[50px] -top-40">
        
        
        <div className="w-full max-w-9xl flex flex-col md:flex-row items-center justify-between md:mt-20">
          {/* Left - Text */}
          <div className="w-[300px] sm:w-4xl md:w-7xl text-left ms-2 md:ms-5 lg:ms-5 ">
            <h1 className="text-4xl sm:text-4xl lg:text-6xl  text-gray-400 font-light leading-[1.4]">
              Stay ahead in crypto with{" "}
              <br />
              
              <span className="text-white text-4xl sm:text-4xl lg:text-6xl -ms-2 font-light">
                <FlipWords words={wordsArray} duration={2000} />
              </span>
              <br />
              <span className="text-gray-400 text-2xl sm:text-4xl lg:text-6xl font-light">
                and seamless portfolio insights.
              </span>
            </h1>
            <Link to={'/dashboard'}><button className= " hover:font-normal border-b-2 text-gray-100 font-extralight   mt-5 text-3xl  cursor-pointer underline-offset-1   relative z-10 ">Explore   </button><ChevronRightIcon className="w-7 h-7 -mt-1 text-gray-100" /></Link>

          </div>

          {/* Right - Video */}
          <div className="flex justify-center mt-5 md:mt-0 me-8">
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="w-[400px] h-[400px] lg:w-[800px] lg:h-[800px]  rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          </div>
        </div>

       
        <section className="mt-2 mb-10 w-full max-w-7xl text-left ms-6">
          <h2 className="sm:text-4xl text-3xl lg:text-5xl font-light text-white mb-6">About CryptoTrackrAI</h2>
          <p className="text-gray-400 text-sm sm:text-lg lg:text-lg font-light leading-relaxed">
            The decentralized finance (DeFi) landscape is revolutionizing traditional market structures. With over 
            <span className="text-white font-semibold"> $1 trillion</span> in total market capitalization, blockchain technology is paving the way 
            for transparent, secure, and immutable financial transactions. CryptoTrackrAI is committed to revolutionizing the way traders interact with digital assets 
            by providing precise market analytics, AI-enhanced decision-making tools, and personalized insights. Our platform empowers users with the information they need 
            to navigate the dynamic crypto market effectively.
          </p>
          <p className="text-gray-400 text-sm sm:text-lg lg:text-lg font-light leading-relaxed py-2">CryptoTrackrAI is committed to revolutionizing the way traders interact with digital assets by providing precise market analytics, AI-enhanced decision-making tools, and personalized insights. Our platform empowers users with the information they need to navigate the dynamic crypto market effectively. Whether you're new to crypto or an experienced trader, CryptoTrackrAI simplifies complex data and turns it into actionable intelligence.

Our AI-powered platform not only tracks market fluctuations but also helps predict price movements with advanced machine learning algorithms. This enables users to stay ahead of potential market shifts and make proactive trading decisions. Additionally, our sentiment analysis tools monitor news, social media, and blockchain trends to provide a holistic view of the market.</p>
<p className="text-gray-400 text-sm sm:text-lg lg:text-lg font-light leading-relaxed">We understand that security and transparency are essential when dealing with digital assets. That’s why CryptoTrackrAI prioritizes data integrity and user privacy. With our decentralized and secure architecture, users can access real-time market intelligence without compromising their personal data.</p>
        </section>

     
        <section className="mt-10 mb-5 w-full max-w-7xl  text-left ms-6">
          <h2 className="sm:text-4xl text-3xl lg:text-5xl font-light text-white mb-6 flex items-center">
           Why Choose CryptoTrackrAI?   
          </h2>
          <p className="text-gray-400 text-sm sm:text-lg lg:text-lg leading-relaxed font-light">
            In a rapidly evolving market, staying ahead requires more than just tracking prices. CryptoTrackrAI provides cutting-edge tools that leverage AI-driven insights, 
            real-time market analysis, and seamless portfolio management. Our advanced analytics engine ensures you have access to the most accurate data, helping you make 
            well-informed trading decisions. Whether you’re an active trader or a long-term investor, our platform is designed to optimize your strategy and enhance your profitability.
          </p>
          <p className="text-gray-400 text-sm sm:text-lg lg:text-lg leading-relaxed font-light py-2">Traditional investment tools often fail to capture the volatility of cryptocurrencies. CryptoTrackrAI fills this gap by offering real-time alerts, deep technical analysis, and customizable dashboards. Whether you’re an active trader or a long-term investor, our platform is designed to optimize your strategy and enhance your profitability.</p>
        </section>
    

      
        <section className="mt-10 mb-10 w-full max-w-7xl text-left ms-6">
          <h2 className="sm:text-4xl text-3xl lg:text-5xl font-light text-white mb-6 flex items-center">
            Join CryptoTrackrAI Today  
          </h2>
          <p className="text-gray-400 text-sm sm:text-lg lg:text-lg leading-relaxed font-light">
            Don't just follow the market—stay ahead of it. Experience the power of AI-driven crypto insights and take control of your investments like never before. 
            Sign up now and start making data-backed decisions with confidence.
          </p>
          <p className="text-gray-400 text-sm sm:text-lg lg:text-lg leading-relaxed font-light">
  By joining <span className="text-white font-semibold">CryptoTrackrAI</span>, you gain access to:<br /> <br />
  <span className="text-white font-medium">AI-driven insights:</span> Advanced analytics and predictive models.<br />
   <span className="text-white font-medium">Real-time price tracking:</span> Up-to-the-second market updates.<br />
   <span className="text-white font-medium">Portfolio management:</span> Track, analyze, and optimize your investments.<br />
  <span className="text-white font-medium">Community-driven strategies:</span> Learn and share insights with top traders.<br /><br />
  
  Whether you're looking to make your first crypto trade or refine your investment strategies, 
  <span className="text-white font-semibold">CryptoTrackrAI</span> is your all-in-one solution for staying informed and making data-backed decisions. 
  <span className="text-white font-semibold">Sign up now</span> and start your journey toward smarter, more efficient crypto trading!
</p>

        </section>

        <Footer />
      </div>
    </>
  );
};

export default About;
