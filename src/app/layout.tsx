'use client'
import "./globals.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Courses from "./components/Courses";
import Footer from "./components/Footer";
import Retreat from "./components/Retreat";
import About from "./components/About";
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
        <About/>
        <Philosophy/>
        <Approach/>
        <Begin/>
        <Services/>
        <Retreat/>
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
