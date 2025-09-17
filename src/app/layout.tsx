'use client'
import "./globals.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import RetreatsSection from "./components/Retreat";
import Courses from "./components/Courses";
import TestimonialSection from "./components/Testimonial";
import Community from "./components/Community";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

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
        <Services/>
        <RetreatsSection/>
        <Courses/>
        <TestimonialSection/>
        <Community/>
        <Contact/>
        <Footer/>
        {children}
      </body>
    </html>
  );
}
