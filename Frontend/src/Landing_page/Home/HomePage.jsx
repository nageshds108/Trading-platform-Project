import Awards from "./Award.jsx"
import Hero from "./Hero.jsx"
import Stats from "./Stats.jsx"
import Pricing from "./Pricing.jsx"
import Education from "./Education.jsx"
import Footer from "../Footer.jsx"
import Navbar from "../Navbar.jsx"
import OpenAccount from "../OpenAccount.jsx"

export default function  HomePage () {
    return (
        <div>
         <Hero></Hero>
         <Awards></Awards>
         <Stats></Stats>
         <Pricing></Pricing>
         <Education/>
         <OpenAccount/>
        </div>
      );
}
