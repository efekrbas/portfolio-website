import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work, Chatbot } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const calculateDuration = (startDate: string, endDate?: string) => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
  return `${months} mos`;
};

const person: Person = {
  firstName: "Efe",
  lastName: "Kırbaş",
  name: `Efe Kırbaş`,
  role: "Software Developer & Vulnerability Researcher",
  avatar: "/images/lain.png",
  email: "efekrbass@gmail.com",
  location: "Istanbul, TR",
  languages: ["TR", "EN"],
  locale: "en",
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/efekrbas",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://linkedin.com/in/efekrbs",
    essential: true,
  },
  {
    name: "Medium",
    icon: "medium",
    link: "https://medium.com/@efekk",
    essential: true,
  },

  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name} - Portfolio`,
  description: `Portfolio website where I share my work as a ${person.role}.`,
  headline: <>Where software development meets cybersecurity.</>,
  featured: {
    display: false,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Once UI</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured Work
        </Text>
      </Row>
    ),
    href: "/work",
  },
  subline: (
    <>
      <Text as="strong" onBackground="brand-strong" style={{ display: 'block', marginBottom: '0.5rem' }}>Engineering software with a security-first mindset.</Text>
      Hello! I'm Efe. I build efficient tools using secure coding principles, and as a <Text as="span" size="xl" weight="strong">Vulnerability Researcher</Text>, I discover and analyze security flaws to strengthen digital systems.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Learn more about ${person.name}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "",
  },
  intro: {
    display: true,
    title: "Who am I?",
    description: (
      <>
        Focused on building secure software, Web3 ecosystems, and AI-driven solutions. Studying Computer Programming at Bilecik Şeyh Edebali University with a practical background in IT support and systems troubleshooting.
      </>
    ),
  },
  work: {
    display: true,
    title: "Experience",
    experiences: [
      {
        company: "Midnight",
        timeframe: `Aug 2026 - Present · ${calculateDuration("2026-08-01")}`,
        role: "Builder - Aliit Fellowship (Contract)",
        achievements: [
          <>Contributing to Midnight's core via code, custom tools, and documentation.</>,
          <>Mentoring Web3 builders and resolving early-stage technical issues.</>,
        ],
        images: [],
      },
      {
        company: "Medipol Sağlık Grubu",
        timeframe: `Sep 2024 - Jun 2025 · ${calculateDuration("2024-09-01", "2025-06-01")}`,
        role: "IT Field Support Intern",
        achievements: [
          <>Provided end-user technical support for hardware, software, and system issues.</>,
          <>Assisted in system maintenance, hardware deployment, and network troubleshooting.</>,
        ],
        images: [],
      },
    ],
  },
  volunteering: {
    display: true,
    title: "Volunteering",
    experiences: [
      {
        company: "BBData",
        timeframe: `Aug 2026 - Present · ${calculateDuration("2026-08-01")}`,
        role: "Mobile Security Analyst",
        achievements: [
          <>Conducting security analysis and vulnerability assessments on mobile applications.</>,
        ],
        images: [],
      },
      {
        company: "Midnight",
        timeframe: `Aug 2026 - Present · ${calculateDuration("2026-08-01")}`,
        role: "Ambassador",
        achievements: [
          <>Promoting Zero-Knowledge (ZK) privacy tech and onboarding developers to the ecosystem.</>,
          <>Creating technical resources and providing Discord support for Midnight SDK & smart contracts.</>,
        ],
        images: [],
      },
      {
        company: "AltaySec",
        timeframe: "Jun 2026 - Aug 2026 · 2 mos",
        role: "AI Security Core Team Member",
        achievements: [
          <>Contributing to AI security research and developing security solutions within the core team.</>,
        ],
        images: [],
      },
      {
        company: "Gallipolixyz",
        timeframe: `Jul 2026 - Present · ${calculateDuration("2026-07-01")}`,
        role: "Core Team Member",
        achievements: [
          <>Producing cybersecurity and technology-oriented technical blog contents within the community.</>,
        ],
        images: [],
      },
      {
        company: "Kariyer Pusulan",
        timeframe: `May 2026 - Present · ${calculateDuration("2026-05-01")}`,
        role: "Core Team Member",
        achievements: [
          <>Detecting, reporting, and managing the resolution processes of technical errors and deficiencies.</>,
          <>Carrying out community management, interaction, and content sharing processes.</>,
        ],
        images: [],
      },
      {
        company: "Siber0x1",
        timeframe: `May 2026 - Present · ${calculateDuration("2026-05-01")}`,
        role: "Social Media Manager",
        achievements: [
          <>Managing the Siber0x1 LinkedIn social media account and carrying out content processes.</>,
        ],
        images: [],
      },
      {
        company: "Hackviser",
        timeframe: `Feb 2026 - Present · ${calculateDuration("2026-02-01")}`,
        role: "Campus Ambassador",
        achievements: [
          <>Guiding aspiring cybersecurity learners and promoting Hackviser across campus communities.</>,
        ],
        images: [],
      },
      {
        company: "Siber Vatan",
        timeframe: `Sep 2025 - Present · ${calculateDuration("2025-09-01")}`,
        role: "Cybersecurity Student",
        achievements: [
          <>Qualifying as a program student by ranking in the top 40 in Bilecik as a result of the general CTF exam.</>,
          <>Successfully completing White Hat Hacker, CTF, and Reverse Engineering trainings.</>,
          <>Gaining practical knowledge and competence in areas such as web security, network security, penetration testing, and malware analysis.</>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "Bilecik Şeyh Edebali University",
        description: <>Associate Degree, Computer Programming</>,
      },
      {
        name: "Dündar Uçar MTAL",
        description: <>High School, Information Technologies / Software Development</>,
      },
    ],
  },
  technical: {
    display: false,
    title: "Skills",
    skills: [],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "My Articles",
  description: `Articles written by ${person.name}`,
};

const work: Work = {
  path: "/work",
  label: "Projects",
  title: `Projects – ${person.name}`,
  description: `Projects developed by ${person.name}`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo Gallery – ${person.name}`,
  description: `Photo collection of ${person.name}`,
  images: [
    {
      src: "/images/efesol.jpg",
      alt: "Efe Kırbaş 1",
      orientation: "vertical",
    },
    {
      src: "/images/efeorta.jpg",
      alt: "Efe Kırbaş 2",
      orientation: "vertical",
    },
    {
      src: "/images/efesag.png",
      alt: "Efe Kırbaş 3",
      orientation: "vertical",
    }
  ],
};

const chatbot: Chatbot = {
  header: "Efek",
  greeting: "Hey there! I'm Efek, Efe's AI assistant. How can I help you?",
  rateLimit: "Whoa, too many questions right now! Let me catch my breath for a minute. 😅",
  placeholder: "Type your message...",
  typing: "Typing...",
  suggestWho: "Who is Efe?",
  suggestExp: "Work experience?",
  suggestEdu: "Education?",
  suggestProj: "Projects?",
  suggestContact: "How to contact?",
  suggestTech: "Skills?",
  errorPrefix: "Error:",
};

export { person, social, newsletter, home, about, blog, work, gallery, chatbot };
