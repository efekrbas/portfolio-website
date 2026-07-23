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
  role: "Software Developer & Penetration Tester",
  avatar: "/images/efe.jpg",
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
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://linkedin.com/in/efekrbs",
    essential: true,
  },
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/efekrbas",
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
  headline: <>Cybersecurity and Software Development Enthusiast</>,
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
      Hello! I'm Efe. I build efficient tools using secure coding principles, and as a <Text as="span" size="xl" weight="strong">Penetration Tester</Text>, I optimize the digital security of systems.
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
        I worked as an IT Field Support Intern at Medipol Healthcare Group, where I gained practical experience in resolving end-user hardware-software issues and troubleshooting. I also actively participated in the installation and maintenance of computers, printers, and peripherals. I am continuing my associate degree in Computer Programming at Bilecik Şeyh Edebali University, while also focusing on cybersecurity, software development, and artificial intelligence technologies.
      </>
    ),
  },
  work: {
    display: true,
    title: "Experience",
    experiences: [
      {
        company: "Medipol Healthcare Group",
        timeframe: `Sep 2024 - Jun 2025 · ${calculateDuration("2024-09-01", "2025-06-01")}`,
        role: "IT Field Support Intern",
        achievements: [
          <>Provided end-user support.</>,
          <>Performed hardware installation and maintenance.</>,
          <>Actively participated in troubleshooting and network monitoring.</>,
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
        company: "Gallipolixyz",
        timeframe: `Jul 2026 - Present · ${calculateDuration("2026-07-01")}`,
        role: "Core Team Member",
        achievements: [],
        images: [],
      },
      {
        company: "Kariyer Pusulan",
        timeframe: `May 2026 - Present · ${calculateDuration("2026-05-01")}`,
        role: "Core Team Member",
        achievements: [
          <>Contributed to the technical infrastructure of the community by actively participating in the detection, reporting, and resolution processes of technical errors and deficiencies.</>,
          <>Managed community management and content sharing processes.</>,
        ],
        images: [],
      },
      {
        company: "Siber0x1",
        timeframe: `May 2026 - Present · ${calculateDuration("2026-05-01")}`,
        role: "Social Media Manager",
        achievements: [
          <>Responsible for managing the Siber0x1 LinkedIn account.</>,
        ],
        images: [],
      },
      {
        company: "Hackviser",
        timeframe: `Feb 2026 - Present · ${calculateDuration("2026-02-01")}`,
        role: "Campus Ambassador",
        achievements: [
          <>Guided the learning processes of individuals who want to develop in the field of cybersecurity by recommending Hackviser.</>,
        ],
        images: [],
      },
      {
        company: "Siber Vatan",
        timeframe: `Sep 2025 - Present · ${calculateDuration("2025-09-01")}`,
        role: "Cyber Security Student",
        achievements: [
          <>Qualified as a student by ranking in the top 40 in Bilecik in the general CTF exam.</>,
          <>Received White Hat Hacker, CTF, and Reverse Engineering Training.</>,
          <>Gained knowledge and skills in many areas such as web security, network security, penetration testing, and malware analysis.</>,
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
