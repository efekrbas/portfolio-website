import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Efe",
  lastName: "Kırbaş",
  name: `Efe Kırbaş`,
  role: "Yazılım Geliştirici & Sızma Testi Uzmanı",
  avatar: "/images/efe.jpg",
  email: "iletisim@efekrbs.com.tr",
  location: "Europe/Istanbul",
  languages: ["Türkçe", "English"],
  locale: "tr",
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
    link: "https://github.com/efekrbs",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/efe-kirbas/",
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
      Merhaba! Ben {person.firstName}. Sistemleri otomatize eden verimli araçlar geliştiriyor ve <Text as="span" size="xl" weight="strong">Sızma Testi Uzmanı</Text> olarak güvenlik açıklarını bulmaya odaklanıyorum.
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
        Medipol Sağlık Grubu'nda Bilgi İşlem Saha Destek Stajyeri olarak çalıştım ve bu süreçte son kullanıcıların donanım-yazılım sorunlarını çözme, arıza giderme konularında pratik deneyim kazandım. Ayrıca bilgisayar, yazıcı ve çevre birimlerinin kurulum–bakım işlemlerini gerçekleştirme konularında aktif görev aldım. Bilecik Şeyh Edebali Üniversitesi'nde Bilgisayar Programcılığı bölümünde önlisans eğitimime devam ediyor, aynı zamanda siber güvenlik, yazılım geliştirme ve yapay zeka teknolojileri üzerine yoğunlaşıyorum.
      </>
    ),
  },
  work: {
    display: true,
    title: "Deneyim",
    experiences: [
      {
        company: "Medipol Sağlık Grubu",
        timeframe: "Devam ediyor",
        role: "Bilgi İşlem Saha Destek Stajyeri",
        achievements: [
          <>Son kullanıcı desteği verdim.</>,
          <>Donanım kurulum ve bakım işlemlerini gerçekleştirdim.</>,
          <>Arıza giderme ve ağ takibi konularında aktif görevler aldım.</>,
        ],
        images: [],
      },
      {
        company: "Siber Vatan",
        timeframe: "Geçmiş",
        role: "Siber Güvenlik Öğrencisi",
        achievements: [
          <>Genel CTF sınavı sonucunda Bilecik'de ilk 40'a girerek öğrenci olmaya hak kazandım.</>,
          <>Beyaz Şapkalı Hacker, CTF ve Reverse Engineering Eğitimi aldım.</>,
          <>Aldığım eğitimlerde web güvenliği, ağ güvenliği, sızma testleri, zararlı yazılım analizi gibi birçok alanda bilgi ve beceri kazandım.</>,
        ],
        images: [],
      },
      {
        company: "Kariyer Pusulan",
        timeframe: "Geçmiş",
        role: "Teknik Ekip Üyesi",
        achievements: [
          <>Teknik hata ve eksikliklerin tespit edilmesi, raporlanması ve çözüm süreçlerinin yönetilmesinde aktif görev alarak topluluğun teknik altyapısına katkıda bulundum.</>,
          <>Topluluk yönetimi ve içerik paylaşımı süreçlerini yürüttüm.</>,
        ],
        images: [],
      },
      {
        company: "Siber0x1",
        timeframe: "Geçmiş",
        role: "Sosyal Medya Yöneticisi",
        achievements: [
          <>Siber0x1 LinkedIn hesabının yönetilmesinden sorumlu oldum.</>,
        ],
        images: [],
      },
      {
        company: "Hackviser",
        timeframe: "Geçmiş",
        role: "Kampüs Elçisi",
        achievements: [
          <>Siber güvenlik alanında gelişmek isteyen kişilere, Hackviser'ı tavsiye ederek öğrenme süreçlerine rehberlik ettim.</>,
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
  images: [],
};

export { person, social, newsletter, home, about, blog, work, gallery };
