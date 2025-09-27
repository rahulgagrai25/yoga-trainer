'use client'
import "./globals.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Courses from "./components/Courses";
import Footer from "./components/Footer";
import Retreat1 from "./components/Retreat1";
import About2 from "./components/About2";
import Philosophy from "./components/Philosophy";
import Approach from "./components/Approach";
import Begin from "./components/Begin";
import Testimonial from "./components/Testimonial";
import Marquee from "./components/Marquee";
import Gallery from "./components/Gallery";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black">
        <Navbar/>
        <Hero/>     
        <About2/>
        <Philosophy/>
        <Approach/>
        <Begin/>
        <Services/>
        <Retreat1/>
        <Courses/>
        <Testimonial/>
        <Marquee/>
        <Gallery/>
        <Footer/>
        {children}
      </body>
    </html>
  );
}
