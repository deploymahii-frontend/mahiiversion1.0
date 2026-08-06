import { Helmet } from "react-helmet-async";
import { FiLinkedin, FiInstagram, FiMail, FiAward } from "react-icons/fi";

const placeholderImg = "https://via.placeholder.com/300x300?text=Team+Member";

const getTeamImage = (name) => {
  const imageMap = {
    "Om Jaunjal": "/team/Om%20Jaunjal.jpeg",
    "Atharv Dahifale": "/team/Atharv%20Dahifale.jpeg",
    "Rohan Kodgire": "/team/Rohan%20Kodgire.jpeg",
    "Atharv Kambale": "/team/Athav%20kamble.png",
    "Vishwajit Sanap": "/team/Vishwajit%20Sanap.png",
  };

  return imageMap[name] || placeholderImg;
};

const leadership = [
  {
    name: "Om Jaunjal",
    role: "Founder & Chief Executive Officer (CEO)",
    image: getTeamImage("Om Jaunjal"),

    linkedin: "https://www.linkedin.com/in/om-jaunjal-8b2414306/",
    instagram: "https://www.instagram.com/omjaunjal_?igsh=MXA1Z3I5dGl4dHM2bA==",
  },
  {
    name: "Atharva Dahifale",
    role: "Chief Financial Officer",
    image: getTeamImage("Atharv Dahifale"),

    linkedin: "https://linkedin.com",
    instagram: "https://www.instagram.com/atharva_407?igsh=azVvNjMxd213Z3Rz",
  },
  {
    name: "Rohan Kodgire",
    role: "Chief Marketing Officer",
    image: getTeamImage("Rohan Kodgire"),

    linkedin: "https://linkedin.com",
    instagram: "https://www.instagram.com/rohan_40006?igsh=N2d5OWRtam14NnRs",
  },
  {
    name: "Atharv Kambale",
    role: "Digital Media Manager",
    image: getTeamImage("Atharv Kambale"),

    linkedin: "https://linkedin.com",
    instagram: "https://www.instagram.com/athu19_?igsh=NG8xNWduMDg3enB3",
  },
  {
    name: "Vishwajit Sanap",
    role: "influencer",
    image: getTeamImage("Vishwajit Sanap"),

    linkedin: "https://linkedin.com",
    instagram: "https://www.instagram.com/vishu_sanap_02?igsh=cHE3eXAwc3ZndmFu",
  },
  
];

export default function Team() {
  return (
    <>
      <Helmet>
        <title>Mahii Team | Founder, CEO & Leadership</title>
        <meta name="description" content="Meet the Mahii leadership team, Founder & CEO, CFO, CMO, and operations leaders behind Kolhapur's hyperlocal marketplace." />
      </Helmet>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
        <div className="max-w-7xl mx-auto space-y-16">
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
  src={leadership[0].image || placeholderImg}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {leadership.slice(1).map((member) => (
                <div
                  key={member.name}
                                  className="max-w-xs w-full mx-auto rounded-2xl overflow-hidden bg-white dark:bg-slate-800 shadow-sm border border-gray-100 dark:border-slate-700/50 flex flex-col justify-between cursor-pointer hover:-translate-y-1 transition duration-200 p-4"
                >
                  <div className="flex flex-col flex-1 space-y-4 text-center">
                    <img
                      src={member.image || placeholderImg}
                      alt={member.name}
                      className="w-full h-56 object-cover rounded-2xl shadow"
                    />
                    <div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white">{member.name}</h3>
                      <p className="text-sm font-semibold text-orange-500 mt-0.5">{member.role}</p>
                    </div>

                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t border-gray-100 dark:border-slate-700/60">
                    <a href={member.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-orange-500 transition">
                      <FiLinkedin size={20} />
                    </a>
                    <a href={member.instagram} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-orange-500 transition">
                      <FiInstagram size={20} />
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
