import { Helmet } from "react-helmet-async";
import { FiLinkedin, FiInstagram, FiMail, FiAward } from "react-icons/fi";

const leadership = [
  {
    name: "Om Jaunjal",
    role: "Founder & Chief Executive Officer (CEO)",
    image: "",
    bio: "Passionate entrepreneur committed to revolutionizing hyperlocal commerce and empowering traditional Indian shop owners with modern tech.",
    linkedin: "https://www.linkedin.com/in/om-jaunjal-8b2414306/",
    instagram: "https://instagram.com",
  },
  {
    name: "Atharv Dahifale",
    role: "Chief Financial Officer",
    image: "",
    bio: "Tech strategist and full-stack architect leading Mahii’s real-time ordering engines, logistics algorithms, and mobile infrastructure.",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
  },
  {
    name: "Rohan Kodgire",
    role: "Chief Marketing Officer",
    image: "",
    bio: "Fosters merchant onboarding, digital training, and local market growth for over 1,800+ shop owners across Kolhapur and Sangli.",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
  },
  {
    name: "Atharv Kambale",
    role: "Digital Media Manager",
    image: "",
    bio: "Manages neighborhood delivery fleet networks, dispatch optimization, and 15-minute last-mile delivery operations.",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
  },
  {
    name: "Aishwarya Patil",
    role: "Operations Manager",
    image: "",
    bio: "Oversees daily store onboarding, training, and ensures smooth marketplace operations across regions.",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
  },
  {
    name: "Ayush Mane",
    role: "Technical Manager",
    image: "",
    bio: "Leads product roadmap, feature prioritization, and coordinates cross‑functional teams for rapid releases.",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
  },
  {
    name: "Anuja Jaybhaye",
    role: "HR Manager",
    image: "",
    bio: "Builds relationships with local shop owners, runs outreach programs, and drives community engagement.",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
  }
];

export default function Team() {
  return (
    <>
      <Helmet>
        <title>Mahii Team | Founder, CEO & Leadership</title>
        <meta name="description" content="Meet the Mahii leadership team, Founder & CEO, CFO, CMO, and operations leaders behind Kolhapur's hyperlocal marketplace." />
      </Helmet>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center space-y-4">
            <span className="inline-flex items-center gap-1.5 bg-orange-100 dark:bg-orange-950/50 text-orange-600 font-extrabold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-widest">
              <FiAward size={14} /> Leadership & Team
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
              The Minds Building <span className="text-orange-500">Mahii</span>
            </h1>
            <p className="text-gray-600 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
              Driven by innovation, community impact, and deep love for Kolhapur’s rich cultural commerce.
            </p>
          </div>

          {/* Featured Founder & CEO Banner */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100 dark:border-slate-700 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative">
                <img
                  src={leadership[0].image}
                  alt={leadership[0].name}
                  className="w-56 h-56 sm:w-64 sm:h-64 object-cover rounded-3xl shadow-lg border-4 border-orange-500"
                />
                <span className="absolute bottom-3 right-3 bg-orange-500 text-white font-black text-[10px] uppercase px-3 py-1 rounded-full tracking-wider shadow">
                  Founder & CEO
                </span>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-500">Founder's Vision</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                {leadership[0].name}
              </h2>
              <p className="text-sm font-semibold text-gray-500 dark:text-slate-400">
                {leadership[0].role}
              </p>
              <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                “Mahii was born out of a desire to protect and empower local Kirana stores, messes, and bakeries. By combining real-time technology with neighborhood trust, we give local merchants the power to compete and thrive in the modern digital economy.”
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-3 pt-2">
                <a href={leadership[0].linkedin} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-200 hover:text-orange-500 transition">
                  <FiLinkedin size={18} />
                </a>
                <a href={leadership[0].instagram} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-200 hover:text-orange-500 transition">
                  <FiInstagram size={18} />
                </a>
                <a href="mailto:founder@mahii.in" className="p-2.5 rounded-xl bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-200 hover:text-orange-500 transition">
                  <FiMail size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Team Grid */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Leadership Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {leadership.slice(1).map((member) => (
                <div
                  key={member.name}
                  className="w-[160px] min-w-[160px] sm:w-[220px] sm:min-w-[220px] rounded-2xl overflow-hidden bg-white dark:bg-slate-800 shadow-sm border border-gray-100 dark:border-slate-700/50 flex flex-col justify-between flex-shrink-0 cursor-pointer hover:-translate-y-1 transition duration-200"
                >
                  <div className="space-y-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-56 object-cover rounded-2xl shadow"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{member.name}</h3>
                      <p className="text-xs font-semibold text-orange-500 mt-0.5">{member.role}</p>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed">{member.bio}</p>
                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t border-gray-100 dark:border-slate-700/60">
                    <a href={member.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-orange-500 transition">
                      <FiLinkedin size={16} />
                    </a>
                    <a href={member.instagram} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-orange-500 transition">
                      <FiInstagram size={16} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
