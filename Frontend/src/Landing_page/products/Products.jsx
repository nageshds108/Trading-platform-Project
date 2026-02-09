import Hero from "./Hero.jsx";
import LeftSection from "./LeftSection.jsx";
import Rightsection from "./RightSection.jsx";
import Universe from "./Universe.jsx";


export default function () {
    return ( 
        <>
        <Hero></Hero>
        <LeftSection 
         imgURL="/media/kite.png"
         title="Kite"
         content="Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices."
        ></LeftSection>

         <Rightsection 
        imgURL="media/console.png"
        title="Console"
        content="The central dashboard for your Zerodha account. Gain insights into your trades and investments with in-depth reports and visualisations."
        ></Rightsection>


         <LeftSection 
         imgURL="/media/coin.png"
         title="Coin"
         content="Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on Android and iOS devices."
        ></LeftSection>

             <Rightsection

        imgURL="media/kiteconnect.png"
        title="Kite Connect API"
        content="Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs. If you are a startup, build your investment app and showcase it to our clientbase.">
        </Rightsection>

         <LeftSection 
         imgURL="/media/varsity.png"
         title="Varsity"
         content="An easy-to-grasp collection of stock market lessons with in-depth coverage and illustrations. Content is broken down into bite-size cards to help you learn on the go"
        ></LeftSection>

        <div className="p-5 text-center">
        <p>Want  to know more about our technology stack? Check out the  Zerodha.tech blog. </p>
</div>


        <Universe></Universe>

        </>
     );
}






