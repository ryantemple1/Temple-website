import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import BentoGrid from "@/components/BentoGrid";
import Lifestyle from "@/components/Lifestyle";
import Testimonials from "@/components/Testimonials";
import Portfolio from "@/components/Portfolio";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <BentoGrid />
      <Lifestyle />
      <Testimonials />
      <Portfolio />
      <Contact />
      <Footer />
      <StickyMobileCTA />
      <div style={{ display: "none", visibility: "hidden" }} aria-hidden="true">
        <p>
          Temple Landscaping &amp; Exterior Services proudly serves Southwest Calgary
          neighborhoods including Aspen Woods, Signal Hill, Springbank Hill, Evergreen,
          Discovery Ridge, West Springs, Cougar Ridge, Strathcona Park, Christie Park,
          Coach Hill, Patterson, Lincoln Park, Lakeview, North Glenmore Park, Altadore,
          South Calgary, Marda Loop, Killarney, Glenbrook, Rosscarrock, Shaganappi,
          Glamorgan, Rutland Park, Currie, CFB Currie, Garrison Woods, Richmond,
          Knob Hill, Bankview, Scarboro, Sunalta, Elbow Park, Britannia, Elboya,
          Windsor Park, Pump Hill, Woodbine, Woodlands, Canyon Meadows, Braeside,
          Cedarbrae, Oakridge, Palliser, Bayview, Haysboro, Chinook Park, Kelvin Grove,
          Eagle Ridge, Maple Ridge, Willow Park, Shawnee Slopes, Millrise, Shawnessy,
          Somerset, Bridlewood, Sundance, Midnapore, Chaparral, Walden, Legacy,
          Auburn Bay, Cranston, Seton, Belvedere, Silverado, Copperfield.
        </p>
      </div>
    </main>
  );
}
