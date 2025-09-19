import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar"; // adjust path to where NavBar.jsx is
import HospitalHistoryChart from "../HospitalHistoryChart";
import img1 from '../Images/bg_img.png';
const carouselImages = [
  { src: "https://source.unsplash.com/1600x600/?hospital,building", alt: "Hospital Building" },
  { src: "https://source.unsplash.com/1600x600/?doctor,patient", alt: "Doctor Consulting Patient" },
  { src: "https://source.unsplash.com/1600x600/?medical,equipment", alt: "Medical Equipment" },
  { src: "https://source.unsplash.com/1600x600/?nurse,hospital", alt: "Nurse with Patient" },
  { src: "https://source.unsplash.com/1600x600/?healthy,lifestyle", alt: "Healthy Lifestyle" },
];

const services = [
  { name: "Emergency", icon: "🚑" },
  { name: "Pediatrics", icon: "🧸" },
  { name: "Radiology", icon: "🩻" },
  { name: "Surgery", icon: "🩺" },
  { name: "Pharmacy", icon: "💊" },
];

const doctors = [
  { 
    name: "Dr. Sarah Johnson", 
    specialty: "Cardiologist", 
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    description: "Experienced in diagnosing and treating heart conditions with a focus on preventive care."
  },
  { 
    name: "Dr. Michael Lee", 
    specialty: "Pediatrician", 
    photo: "https://randomuser.me/api/portraits/men/46.jpg",
    description: "Dedicated to children’s health and development, providing compassionate pediatric care."
  },
  { 
    name: "Dr. Emily Davis", 
    specialty: "Radiologist", 
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    description: "Specializes in medical imaging to accurately diagnose and support treatment planning."
  },
  { 
    name: "Dr. James Smith", 
    specialty: "Surgeon", 
    photo: "https://randomuser.me/api/portraits/men/52.jpg",
    description: "Expert in performing complex surgical procedures with precision and patient care."
  },
];


const testimonials = [
  {
    name: "Anna Williams",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    quote: "The staff was incredibly compassionate and the care I received was top-notch. Highly recommend City Hospital!",
  },
  {
    name: "Mark Thompson",
    photo: "https://randomuser.me/api/portraits/men/72.jpg",
    quote: "Thanks to the excellent doctors and facilities, my surgery went smoothly and my recovery was quick.",
  },
  {
    name: "Lisa Chen",
    photo: "https://randomuser.me/api/portraits/women/55.jpg",
    quote: "I found the appointment booking process very easy and the doctors were very attentive to my concerns.",
  },
];

const faqs = [
  { question: "What insurance plans do you accept?", answer: "We accept most major insurance providers." },
  { question: "What are the visiting hours?", answer: "Visiting hours are from 9 AM to 8 PM daily." },
  { question: "How do I book an appointment?", answer: "You can book appointments online, by phone, or at reception." },
  { question: "Is parking available?", answer: "Yes, we have ample parking including handicapped spots." },
];

// Dark mode hook
function useDarkMode() {
  const [isDark, setIsDark] = useState(() => localStorage.getItem("darkMode") === "true");
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("darkMode", isDark);
  }, [isDark]);
  return [isDark, setIsDark];
}

export default function Dashboard() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [darkMode, setDarkMode] = useDarkMode();

  // Carousel auto change
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Testimonial auto change
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div >
      <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">

        {/* Hero + Carousel */}
        <section className="relative w-full h-[600px] overflow-hidden">
          {carouselImages.map((img, index) => (
            <img
              key={index}
              src={img.src}
              alt={img.alt}
              className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
            />
          ))}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center h-[600px] text-white text-center px-4"
            style={{
              backgroundImage: `url(${img1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Optional: Overlay for better text visibility */}
            <div className="absolute bg-black/50 inset-0 "></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-6xl font-bold mb-4">
                Your Health,Our Priority
              </h2>
              <div className="space-x-4 mt-10">
                <Link
                  to="/appointments/add"
                  className="bg-blue-500 px-6 font-bold py-3 rounded-3xl shadow-lg hover:bg-blue-700 transition "
                >
                  Book Appointment
                </Link>
                <a
                  href="#doctors"
                  className="bg-blue-500 font-bold px-6 py-3 rounded-3xl shadow-lg hover:bg-blue-700 transition"
                >
                  Find a Doctor
                </a>
              </div>
            </div>
          </div>

        </section>

        {/* Search Bar */}
        <section className="max-w-5xl mx-auto mt-8 px-4">
          <input
            type="text"
            placeholder="🔍 Search for a doctor or department..."
            className="w-full px-4 py-3 rounded-xl shadow bg-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </section>

        {/* Services */}
        <section id="services" className="max-w-5xl mx-auto mt-12 px-4">
          <h3 className="text-2xl font-bold mb-6">Our Services</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {services.map((s, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded shadow text-center hover:shadow-lg transition">
                <div className="text-4xl">{s.icon}</div>
                <p className="mt-2 font-semibold">{s.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Doctors */}
        <section id="doctors" className="max-w-5xl mx-auto mt-12 px-4">
          <h3 className="text-2xl font-bold mb-6">Our Doctors</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {filteredDoctors.map((doc, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded shadow p-3 text-center hover:shadow-lg transition">
                <img src={doc.photo} alt={doc.name} className="w-24 h-24 mx-auto rounded-full object-cover" />
                <h4 className="mt-2 font-bold">{doc.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{doc.specialty}</p>
                <p className="mt-2  text-gray-500 py-1">{doc.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="max-w-3xl mx-auto mt-12 px-4 text-center">
          <h3 className="text-2xl font-bold mb-6">Patient Stories</h3>
          <div className="bg-white dark:bg-gray-800 rounded p-6 shadow">
            <img src={testimonials[testimonialIndex].photo} alt="patient" className="w-20 h-20 mx-auto rounded-full" />
            <p className="italic mt-4">"{testimonials[testimonialIndex].quote}"</p>
            <h4 className="mt-2 font-bold">{testimonials[testimonialIndex].name}</h4>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto mt-12 px-4">
          <h3 className="text-2xl font-bold mb-6">FAQ</h3>
          {faqs.map((faq, i) => (
            <div key={i} className="mb-4">
              <button
                className="w-full text-left font-semibold py-2 px-4 bg-gray-200 dark:bg-gray-700 rounded"
                onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
              >
                {faq.question}
              </button>
              {openFaqIndex === i && <p className="p-4 bg-gray-100 dark:bg-gray-800">{faq.answer}</p>}
            </div>
          ))}
        </section>
        <HospitalHistoryChart />

        {/* Emergency Bar */}
        <div className="bg-red-600 text-white text-center py-2 font-bold mt-12">
          🚨 24/7 Emergency Helpline: <a href="tel:+18001234567">+1 800 123 4567</a>
        </div>

        {/* Footer */}
        <footer id="contact" className="bg-blue-700 dark:bg-gray-800 text-white text-center py-6 ">
          <p>&copy; 2025 City Hospital. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
