import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work, Chatbot } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const calculateDuration = (startDate: string, endDate?: string) => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
  return `${months} ay`;
};

const person: Person = {
  firstName: "Efe",
  lastName: "Kırbaş",
  name: `Efe Kırbaş`,
  role: "Yazılım Geliştirici & Sızma Testi Uzmanı",
  avatar: "/images/efe.jpg",
  email: "efekrbass@gmail.com",
  location: "Istanbul, TR",
  languages: ["TR", "EN"],
  locale: "tr",
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
  label: "Ana Sayfa",
  title: `${person.name} - Portfolyo`,
  description: `${person.role} olarak çalışmalarımı paylaştığım portfolyo sitem.`,
  headline: <>Siber Güvenlik ve Yazılım Geliştirme Tutkunu</>,
  featured: {
    display: false,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Once UI</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Öne Çıkan Çalışma
        </Text>
      </Row>
    ),
    href: "/work",
  },
  subline: (
    <>
      Merhaba! Ben Efe. Güvenli kod geliştirme prensipleriyle verimli araçlar üretiyor ve bir <Text as="span" size="xl" weight="strong">Sızma Testi Uzmanı</Text> olarak sistemlerin dijital güvenliğini optimize ediyorum.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "Hakkımda",
  title: `Hakkımda – ${person.name}`,
  description: `${person.name} hakkında daha fazla bilgi edinin`,
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
    title: "Ben Kimim?",
    description: (
      <>
        Medipol Sağlık Grubu'nda Bilgi İşlem Saha Destek Stajyeri olarak çalıştım ve bu süreçte son kullanıcıların donanım-yazılım sorunlarını çözme, arıza giderme konularında pratik deneyim kazandım. Ayrıca bilgisayar, yazıcı ve çevre birimlerinin kurulum–bakım işlemlerini gerçekleştirme konularında aktif görev aldım. Bilecik Şeyh Edebali Üniversitesi'nde <Text as="strong">"Bilgisayar Programcılığı"</Text> bölümünde önlisans eğitimime devam ediyor, aynı zamanda siber güvenlik, yazılım geliştirme ve yapay zeka teknolojileri üzerine yoğunlaşıyorum.
      </>
    ),
  },
  work: {
    display: true,
    title: "Deneyim",
    experiences: [
      {
        company: "Medipol Sağlık Grubu",
        timeframe: `Eyl 2024 - Haz 2025 · ${calculateDuration("2024-09-01", "2025-06-01")}`,
        role: "Bilgi İşlem Saha Destek Stajyeri",
        achievements: [
          <>Kullanıcı tarafında ortaya çıkan donanımsal ve yazılımsal sorunlara yönelik teknik (End-User) destek sunulması.</>,
          <>Sistem ve donanım bileşenlerinin kurulum, bakım, yapılandırma ve güncelleme süreçlerinin yürütülmesi.</>,
          <>Ağ altyapısının takibi, arıza tespiti ve sorun giderme (troubleshooting) operasyonlarında aktif görev alınması.</>,
        ],
        images: [],
      },
    ],
  },
  volunteering: {
    display: true,
    title: "Gönüllülük",
    experiences: [
      {
        company: "Gallipolixyz",
        timeframe: `Tem 2026 - Devam ediyor · ${calculateDuration("2026-07-01")}`,
        role: "Yönetim Ekibi Üyesi",
        achievements: [
          <>Topluluk bünyesinde siber güvenlik ve teknoloji odaklı teknik blog içeriklerinin üretilmesi.</>,
        ],
        images: [],
      },
      {
        company: "Kariyer Pusulan",
        timeframe: `May 2026 - Devam ediyor · ${calculateDuration("2026-05-01")}`,
        role: "Yönetim Ekibi Üyesi",
        achievements: [
          <>Teknik hata ve eksikliklerin tespit edilmesi, raporlanması ve çözüm süreçlerinin yönetilmesi.</>,
          <>Topluluk yönetimi, etkileşim ve içerik paylaşımı süreçlerinin yürütülmesi.</>,
        ],
        images: [],
      },
      {
        company: "Siber0x1",
        timeframe: `May 2026 - Devam ediyor · ${calculateDuration("2026-05-01")}`,
        role: "Sosyal Medya Yöneticisi",
        achievements: [
          <>Siber0x1 LinkedIn sosyal medya hesabının yönetimi ve içerik süreçlerinin yürütülmesi.</>,
        ],
        images: [],
      },
      {
        company: "Hackviser",
        timeframe: `Şub 2026 - Devam ediyor · ${calculateDuration("2026-02-01")}`,
        role: "Kampüs Elçisi",
        achievements: [
          <>Siber güvenlik alanında gelişmek isteyen kişilere, Hackviser'ı tavsiye ederek öğrenme süreçlerine rehberlik edilmesi.</>,
        ],
        images: [],
      },
      {
        company: "Siber Vatan",
        timeframe: `Eyl 2025 - Devam ediyor · ${calculateDuration("2025-09-01")}`,
        role: "Siber Güvenlik Öğrencisi",
        achievements: [
          <>Genel CTF sınavı sonucunda Bilecik genelinde ilk 40'a girerek program öğrencisi olmaya hak kazanılması.</>,
          <>Beyaz Şapkalı Hacker, CTF ve Reverse Engineering eğitimlerinin başarıyla tamamlanması.</>,
          <>Web güvenliği, ağ güvenliği, sızma testleri (penetration testing) ve zararlı yazılım analizi alanlarında pratik bilgi ve yetkinlik kazanılması.</>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Eğitim",
    institutions: [
      {
        name: "Bilecik Şeyh Edebali Üniversitesi",
        description: <>Önlisans, Bilgisayar Programcılığı</>,
      },
      {
        name: "Dündar Uçar MTAL",
        description: <>Lise, Bilişim Teknolojileri / Yazılım Geliştirme</>,
      },
    ],
  },
  technical: {
    display: false,
    title: "Yetenekler",
    skills: [],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Yazılarım",
  description: `${person.name} tarafından yazılan makaleler`,
};

const work: Work = {
  path: "/work",
  label: "Projeler",
  title: `Projeler – ${person.name}`,
  description: `${person.name} tarafından geliştirilen projeler`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Galeri",
  title: `Fotoğraf Galerisi – ${person.name}`,
  description: `${person.name} adlı kişinin fotoğraf koleksiyonu`,
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
  greeting: "Selam! Ben Efek, Efe'nin yapay zeka asistanıyım. Size nasıl yardımcı olabilirim?",
  rateLimit: "Şu an çok fazla soru soruldu, biraz dinlenmem lazım. Lütfen birkaç saniye sonra tekrar dene! 😅",
  placeholder: "Mesajınızı yazın...",
  typing: "Yazıyor...",
  suggestWho: "Efe kimdir?",
  suggestExp: "Efe'nin deneyimleri neler?",
  suggestEdu: "Efe'nin eğitimi hakkında bilgi alabilir miyim?",
  suggestProj: "Efe'nin projeleri neler?",
  suggestContact: "Efe'ye nasıl ulaşabilirim?",
  suggestTech: "Efe'nin yetenekleri neler?",
  errorPrefix: "Hata:",
};

export { person, social, newsletter, home, about, blog, work, gallery, chatbot };
