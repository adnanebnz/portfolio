import { Icons } from "@/components/icons";
import {
  CodeIcon,
  HomeIcon,
  NotebookIcon,
  Quote,
  CalendarDays,
} from "lucide-react";

// Type definitions
export type Locale = "en" | "fr";

export interface TranslatedText {
  en: string;
  fr: string;
}

export interface WorkExperience {
  company: string;
  href: string;
  badges: string[];
  location: string;
  title: TranslatedText;
  logoUrl: string;
  start: string;
  end: string | null;
  description: TranslatedText;
}

export interface FeaturedProject {
  title: TranslatedText;
  slug: string;
  subtitle: TranslatedText;
  keyFeatures: {
    en: Record<string, string>;
    fr: Record<string, string>;
  };
  dates: string;
  active: boolean;
  description: TranslatedText;
  technologies: string[];
  links: Array<{
    type: string;
    href: string;
    icon: React.ReactNode;
  }>;
  image: string;
  mobileAppImages: string[];
  webAppImages: string[];
  href?: string;
}

export interface CVFile {
  language: Locale;
  fileName: string;
  filePath: string;
}

// Static data that doesn't need translation
export const DATA = {
  name: "Adnane BENZERDJEB",
  initials: "AB",
  url: "https://skillzdev.tech",
  location: {
    en: "Tlemcen, Algeria",
    fr: "Tlemcen, Algérie",
  },
  locationLink: "https://www.google.com/maps/place/tlemcen",
  description: {
    en: "Building robust software solutions & transforming ideas into scalable digital products.",
    fr: "Création de solutions logicielles robustes & transformation d'idées en produits numériques évolutifs.",
  },
  summary: {
    en: "I am a highly motivated and skilled software engineer with a passion for software development. With a strong addiction to technology, I specialize in web development using ReactJS and NodeJS and mobile development using React Native and Flutter. I am also a big fan of UI/UX design and I am a self-taught designer.",
    fr: "Je suis un ingénieur logiciel hautement motivé et compétent avec une passion pour le développement logiciel. Avec une forte addiction à la technologie, je me spécialise dans le développement web utilisant ReactJS et NodeJS et le développement mobile utilisant React Native et Flutter. Je suis aussi un grand fan de conception UI/UX et je suis autodidacte en design.",
  },
  avatarUrl: "/me.png",
  skills: [
    "Dart",
    "Flutter",
    "Java",
    "JavaScript",
    "Typescript",
    "React",
    "Next.js",
    "TailwindCSS",
    "Node.js",
    "Express",
    "AdonisJS",
    "NestJS",
    "PHP",
    "Python",
    "Django",
    "Laravel",
    "Livewire",
    "Postgres",
    "MySQL",
    "MongoDB",
    "Firebase",
    "C#",
    ".NET",
    "React Native",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
    { href: "/projects", icon: CodeIcon, label: "Projects" },
    { href: "/reviews", icon: Quote, label: "Guest Book" },
    { href: "/schedule", icon: CalendarDays, label: "Schedule" },
  ],
  contact: {
    email: "skillzdev@hotmail.com",
    tel: "+213560690167",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/adnanebnz/",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/adnane-benzerdjeb/",
        icon: Icons.linkedin,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:skillzdev@hotmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  // CV Files for download
  cvFiles: {
    en: {
      language: "en" as Locale,
      fileName: "CV_Adnane_Canada.pdf",
      filePath: "/CV_Adnane_Canada.pdf",
    },
    fr: {
      language: "fr" as Locale,
      fileName: "CV_Adnane_Canada_FR.pdf",
      filePath: "/CV_Adnane_Canada_FR.pdf",
    },
  },

  work: [
    {
      company: "RDSI",
      href: "https://www.rdsi.dz/",
      badges: [],
      location: "Tlemcen, Algeria",
      title: {
        en: "Software Engineer",
        fr: "Ingénieur Logiciel",
      },
      logoUrl: "/RDSI.png",
      start: "September 2025",
      end: null,
      description: {
        en: "Full-time responsibility for application development and legacy maintenance for a main client company in France in an outsourcing/nearshoring model (bug fixes, feature development, critical support, production stability). Development and maintenance of a business application for a France-based client (new features, optimizations, continuous deployment – stack: Django REST Framework, Flutter, PostgreSQL).",
        fr: "Prise en charge à temps plein, des sujets de développement et de maintenance applicative legacy pour une entreprise cliente principale en France dans un schéma d'externalisation/nearshoring (corrections, évolutions, support critique, stabilité en production). Développement et maintenance d'une application métier pour une cliente basée en France (nouvelles fonctionnalités, optimisations, déploiement continu – stack : Django REST Framework, Flutter, PostgreSQL).",
      },
    },
    {
      company: "Tawsil Star",
      href: "https://www.tawsilstar.dz/",
      badges: [],
      location: "Tlemcen, Algeria",
      title: {
        en: "Software Engineer",
        fr: "Ingénieur Logiciel",
      },
      logoUrl: "/tawsil_star.jpg",
      start: "December 2024",
      end: "September 2025",
      description: {
        en: "Developed and maintained a cross-platform mobile app using Flutter, integrating food delivery, package courier, and VTC services. Contributed to backend development using Django, including API creation, user management, and database models. Implemented real-time features for live order tracking and ride request handling using WebSockets. Set up CI/CD pipelines to automate builds, testing, and deployment, ensuring faster and more reliable releases. Integrated Crashlytics for real-time crash reporting and monitoring, improving app stability and performance. Collaborated with the design and backend teams to deliver a smooth and responsive user experience across Android and iOS. Participated in debugging, performance optimization, and publishing updates to app stores.",
        fr: "Développé et maintenu une application mobile multiplateforme utilisant Flutter, intégrant la livraison de nourriture, les services de courrier de colis et VTC. Contribué au développement backend utilisant Django, incluant la création d'API, la gestion des utilisateurs et les modèles de base de données. Implémenté des fonctionnalités en temps réel pour le suivi des commandes en direct et la gestion des demandes de trajets utilisant WebSockets. Mis en place des pipelines CI/CD pour automatiser les builds, les tests et le déploiement, assurant des releases plus rapides et plus fiables. Intégré Crashlytics pour le rapport de crash en temps réel et la surveillance, améliorant la stabilité et les performances de l'app. Collaboré avec les équipes de design et backend pour livrer une expérience utilisateur fluide et réactive sur Android et iOS. Participé au débogage, à l'optimisation des performances et à la publication des mises à jour sur les app stores.",
      },
    },
    {
      company: "Eurequat Algérie",
      href: "https://www.eurequat-algerie.com/",
      badges: [],
      location: "Tlemcen, Algeria",
      title: {
        en: "Software Engineer Internship",
        fr: "Stage Ingénieur Logiciel",
      },
      logoUrl: "/logo-eurequat.png",
      start: "July 2024",
      end: "September 2024",
      description: {
        en: "During my internship at Eurequat Algérie, I developed a robust XML to ZPL conversion package integrated into their WinForms project. Utilizing C# and Microsoft SQL Server, I created a solution that converts XML-based label templates into ZPL (Zebra Programming Language) for seamless label printing. This package allows for predefined label designs to be efficiently translated into ZPL code, ensuring consistent and high-quality label outputs.",
        fr: "Pendant mon stage chez Eurequat Algérie, j'ai développé un package robuste de conversion XML vers ZPL intégré dans leur projet WinForms. Utilisant C# et Microsoft SQL Server, j'ai créé une solution qui convertit les modèles d'étiquettes basés sur XML en ZPL (Zebra Programming Language) pour une impression d'étiquettes transparente. Ce package permet aux designs d'étiquettes prédéfinis d'être efficacement traduits en code ZPL, assurant des sorties d'étiquettes cohérentes et de haute qualité.",
      },
    },
    {
      company: "TechWay",
      href: "#",
      badges: [],
      location: "Tlemcen, Algeria",
      title: {
        en: "Software Engineer Internship",
        fr: "Stage Ingénieur Logiciel",
      },
      logoUrl: "/azimut.png",
      start: "June 2024",
      end: "July 2024",
      description: {
        en: "Development of a REST API at TechWay. During my internship at TechWay, I developed and deployed a REST API using Node.js, Express.js, and MySQL to manage reservations, check-ins, and check-outs for the Hydra Hotel in Algiers. This solution, now in production, is actively used by the company.",
        fr: "Développement d'une API REST chez TechWay. Pendant mon stage chez TechWay, j'ai développé et déployé une API REST utilisant Node.js, Express.js et MySQL pour gérer les réservations, les check-ins et les check-outs pour l'Hôtel Hydra à Alger. Cette solution, maintenant en production, est activement utilisée par l'entreprise.",
      },
    },
  ],

  featuredProjects: [
    {
      title: {
        en: "Tawsil Star VTC",
        fr: "Tawsil Star VTC",
      },
      slug: "tawsil-star-vtc",
      subtitle: {
        en: "VTC (Vehicle for Hire) taxi booking app",
        fr: "Application de réservation de taxi VTC",
      },
      keyFeatures: {
        en: {
          Booking: "Seamless ride booking",
          Tracking: "Real-time tracking",
          Communication: "Driver-rider communication",
        },
        fr: {
          Réservation: "Réservation de trajet fluide",
          Suivi: "Suivi en temps réel",
          Communication: "Communication conducteur-passager",
        },
      },
      dates: "Jan 2024 - Jan 2024",
      active: true,
      description: {
        en: "Developed a module in the mobile application for Tawsil Star, a VTC (Vehicle for Hire) taxi booking app, enabling seamless ride booking, real-time tracking, and improved user experience. Implemented key features such as trip management, driver-rider communication, and payment integration to enhance the app's functionality and reliability.",
        fr: "Développé un module dans l'application mobile pour Tawsil Star, une application de réservation de taxi VTC, permettant une réservation de trajet fluide, un suivi en temps réel et une expérience utilisateur améliorée. Implémenté des fonctionnalités clés telles que la gestion des trajets, la communication conducteur-passager et l'intégration du paiement pour améliorer la fonctionnalité et la fiabilité de l'application.",
      },
      technologies: ["Python", "Django", "Flutter", "GetX"],
      links: [],
      image:
        "https://res.cloudinary.com/drajcqail/image/upload/v1739485318/tawsil-star-vtc/poster.png",
      mobileAppImages: [
        "https://res.cloudinary.com/drajcqail/image/upload/v1739483075/tawsil-star-vtc/menu.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1739484299/tawsil-star-vtc/client_sheet.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1739484300/tawsil-star-vtc/location_search.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1739483074/tawsil-star-vtc/choose_your_ride.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1739483075/tawsil-star-vtc/last_step.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1739484301/tawsil-star-vtc/getting_your_ride.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1739483073/tawsil-star-vtc/driver_found.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1739483074/tawsil-star-vtc/partner_home.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1739484298/tawsil-star-vtc/history.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1739484298/tawsil-star-vtc/addresses_list.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1739484298/tawsil-star-vtc/delete_address.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1739484298/tawsil-star-vtc/add_address.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1739483072/tawsil-star-vtc/home_screen.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1739484298/tawsil-star-vtc/profile.jpg",
      ],
      webAppImages: [],
    },
    {
      title: {
        en: "Tawsil Star Expeditor",
        fr: "Tawsil Star Expéditeur",
      },
      slug: "tawsil-star-expeditor",
      subtitle: {
        en: "Package delivery and courier management app for expeditors",
        fr: "Application de gestion de livraison de colis pour expéditeurs",
      },
      keyFeatures: {
        en: {
          Management: "Complete package delivery management",
          Tracking: "Real-time shipment tracking",
          Scheduling: "Delivery scheduling and route optimization",
          Communication: "Driver communication system",
        },
        fr: {
          Gestion: "Gestion complète des livraisons de colis",
          Suivi: "Suivi des envois en temps réel",
          Planification:
            "Planification des livraisons et optimisation des routes",
          Communication: "Système de communication avec les chauffeurs",
        },
      },
      dates: "Dec 2024 - Sep 2025",
      active: true,
      description: {
        en: "Developed the expeditor-facing mobile application for Tawsil Star's courier service. This app enables expeditors to manage their package deliveries, track shipments in real-time, communicate with drivers, and handle delivery confirmations. Features include route optimization, delivery scheduling, and comprehensive order management for efficient package handling.",
        fr: "Développé l'application mobile côté expéditeur pour le service de courrier Tawsil Star. Cette application permet aux expéditeurs de gérer leurs livraisons de colis, suivre les envois en temps réel, communiquer avec les chauffeurs et gérer les confirmations de livraison. Les fonctionnalités incluent l'optimisation des itinéraires, la planification des livraisons et une gestion complète des commandes pour un traitement efficace des colis.",
      },
      technologies: ["Python", "Django", "Flutter", "GetX", "WebSockets"],
      links: [],
      image:
        "https://res.cloudinary.com/drajcqail/image/upload/v1739485318/tawsil-star-vtc/poster.png",
      mobileAppImages: [],
      webAppImages: [],
    },
    {
      title: {
        en: "SmartClean",
        fr: "SmartClean",
      },
      slug: "smartclean",
      subtitle: {
        en: "Smart cleaning services booking platform",
        fr: "Plateforme de réservation de services de nettoyage intelligente",
      },
      keyFeatures: {
        en: {
          Booking: "Easy service booking system",
          Tracking: "Real-time cleaner tracking",
          Payments: "Secure payment integration",
          Ratings: "Quality rating and review system",
        },
        fr: {
          Réservation: "Système de réservation de services facile",
          Suivi: "Suivi du nettoyeur en temps réel",
          Paiements: "Intégration de paiement sécurisée",
          Évaluations: "Système d'évaluation et d'avis de qualité",
        },
      },
      dates: "2024",
      active: true,
      description: {
        en: "SmartClean is a comprehensive platform for booking professional cleaning services. The application connects customers with verified cleaning professionals, offering features like service scheduling, real-time tracking, secure payments, and quality ratings. Built with a focus on user experience and reliability.",
        fr: "SmartClean est une plateforme complète pour réserver des services de nettoyage professionnels. L'application connecte les clients avec des professionnels du nettoyage vérifiés, offrant des fonctionnalités comme la planification de services, le suivi en temps réel, les paiements sécurisés et les évaluations de qualité. Construite avec un accent sur l'expérience utilisateur et la fiabilité.",
      },
      technologies: ["Flutter", "Firebase", "Node.js", "Express"],
      links: [],
      image: "",
      mobileAppImages: [],
      webAppImages: [],
    },
    {
      title: {
        en: "DA-Mall",
        fr: "DA-Mall",
      },
      slug: "da-mall",
      subtitle: {
        en: "E-commerce marketplace application",
        fr: "Application de marketplace e-commerce",
      },
      keyFeatures: {
        en: {
          Shopping: "Complete shopping experience",
          Sellers: "Seller dashboard and analytics",
          Orders: "Order tracking and management",
          Payments: "Multiple payment options",
        },
        fr: {
          Shopping: "Expérience d'achat complète",
          Vendeurs: "Tableau de bord et analytiques vendeur",
          Commandes: "Suivi et gestion des commandes",
          Paiements: "Options de paiement multiples",
        },
      },
      dates: "2024",
      active: true,
      description: {
        en: "DA-Mall is a comprehensive e-commerce marketplace application that connects buyers and sellers in a seamless digital shopping experience. Features include product listings, shopping cart, secure checkout, order tracking, seller dashboards, and customer reviews. Built with modern technologies for optimal performance and user experience.",
        fr: "DA-Mall est une application de marketplace e-commerce complète qui connecte acheteurs et vendeurs dans une expérience d'achat numérique fluide. Les fonctionnalités incluent les listes de produits, le panier d'achat, le paiement sécurisé, le suivi des commandes, les tableaux de bord vendeur et les avis clients. Construite avec des technologies modernes pour des performances optimales et une excellente expérience utilisateur.",
      },
      technologies: ["Flutter", "Laravel", "MySQL", "Firebase"],
      links: [],
      image: "",
      mobileAppImages: [],
      webAppImages: [],
    },
    {
      title: {
        en: "Algeria Eats",
        fr: "Algeria Eats",
      },
      slug: "algeria-eats",
      subtitle: {
        en: "Online platform for ordering sweet and savory food",
        fr: "Plateforme en ligne pour commander des plats sucrés et salés",
      },
      keyFeatures: {
        en: {
          Showcase: "Artisans showcase their creations",
          Delivery: "Dedicated delivery personnel",
          Connect:
            "Seamlessly connect customers with a diverse culinary experience",
        },
        fr: {
          Vitrine: "Les artisans présentent leurs créations",
          Livraison: "Personnel de livraison dédié",
          Connexion:
            "Connecte les clients avec une expérience culinaire diversifiée",
        },
      },
      href: "https://github.com/adnanebnz/algeria-eats",
      dates: "Nov 2022 - Jan 2023",
      active: true,
      description: {
        en: "Algeria Eats is an online platform facilitating the ordering of sweet and savory food. Artisans showcase their creations, and dedicated delivery personnel ensure timely deliveries. The website seamlessly connects customers with a diverse culinary experience.",
        fr: "Algeria Eats est une plateforme en ligne facilitant la commande de plats sucrés et salés. Les artisans présentent leurs créations, et un personnel de livraison dédié assure des livraisons ponctuelles. Le site web connecte de manière transparente les clients avec une expérience culinaire diversifiée.",
      },
      technologies: [
        "TailwindCSS",
        "AlpineJS",
        "Laravel",
        "Livewire",
        "MySQL",
        "Flutter",
        "GetX",
      ],
      links: [],
      image:
        "https://res.cloudinary.com/drajcqail/image/upload/v1723891211/algeria-eats/poster.png",
      mobileAppImages: [
        "https://res.cloudinary.com/drajcqail/image/upload/v1723891259/algeria-eats/home-mobile.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723891189/algeria-eats/onboarding-mobile.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723891291/algeria-eats/product-list.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723891293/algeria-eats/filter-product.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723891311/algeria-eats/product.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723891300/algeria-eats/product-review.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723891174/algeria-eats/artisans-page-mobile.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723891188/algeria-eats/artisan-profile-1-mobile.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723891189/algeria-eats/artisan-profile-mobile.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723891235/algeria-eats/map-mobile.jpg",
      ],
      webAppImages: [
        "https://res.cloudinary.com/drajcqail/image/upload/v1723891262/algeria-eats/on-boarding-web.png",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723891243/algeria-eats/contact-web.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723891314/algeria-eats/faq.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723891311/algeria-eats/auth.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723891271/algeria-eats/profile-web.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723891274/algeria-eats/artisan-dashboard.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723891209/algeria-eats/products-view-dashboard-artisan.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723891217/algeria-eats/order-dashboard-web.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723891289/algeria-eats/admin-dashboard.jpg",
      ],
    },
    {
      title: {
        en: "Wamidh",
        fr: "Wamidh",
      },
      slug: "wamidh",
      subtitle: {
        en: "Platform to learn Arabic by interacting with a mobile application",
        fr: "Plateforme pour apprendre l'arabe en interagissant avec une application mobile",
      },
      keyFeatures: {
        en: {
          Messaging: "Students can text each other and teachers.",
          Games:
            "Includes games to learn Arabic, such as listening, writing, and arranging words.",
          "Admin Controls":
            "Admins can ban users and control the entire application.",
          "Teacher Features": "Teachers can upload courses.",
          "Progress Tracking":
            "Users can track their progress and receive feedback.",
        },
        fr: {
          Messagerie:
            "Les étudiants peuvent s'envoyer des messages et contacter les professeurs.",
          Jeux: "Inclut des jeux pour apprendre l'arabe, comme l'écoute, l'écriture et l'arrangement de mots.",
          "Contrôles Admin":
            "Les admins peuvent bannir les utilisateurs et contrôler l'application.",
          "Fonctionnalités Enseignant":
            "Les enseignants peuvent télécharger des cours.",
          "Suivi de Progression":
            "Les utilisateurs peuvent suivre leurs progrès et recevoir des retours.",
        },
      },
      href: "https://play.google.com/store/apps/details?id=com.mhamidi.el_makaniz",
      dates: "June 2024 - June 2024",
      active: true,
      description: {
        en: "Wamidh is a mobile application that helps users learn Arabic by interacting with the app. The app provides a range of features to facilitate learning, including quizzes, games, and interactive exercises. Users can track their progress and receive feedback to improve their language skills.",
        fr: "Wamidh est une application mobile qui aide les utilisateurs à apprendre l'arabe en interagissant avec l'application. L'application fournit une gamme de fonctionnalités pour faciliter l'apprentissage, y compris des quiz, des jeux et des exercices interactifs. Les utilisateurs peuvent suivre leurs progrès et recevoir des retours pour améliorer leurs compétences linguistiques.",
      },
      technologies: ["Flutter", "Firebase"],
      image:
        "https://res.cloudinary.com/drajcqail/image/upload/v1723897373/wamidh/poster.png",
      mobileAppImages: [
        "https://res.cloudinary.com/drajcqail/image/upload/v1723896314/wamidh/home.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723896311/wamidh/drawer.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723896306/wamidh/listening.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723896295/wamidh/writing.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723896300/wamidh/arranging.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723896311/wamidh/about.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723896305/wamidh/profile.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723896296/wamidh/messages.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723896302/wamidh/chat.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723896303/wamidh/admin-users.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723896294/wamidh/stats.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723896296/wamidh/login.jpg",
      ],
      webAppImages: [],
      links: [
        {
          type: "Play Store",
          href: "https://play.google.com/store/apps/details?id=com.mhamidi.el_makaniz",
          icon: <Icons.playStore className="size-3" />,
        },
      ],
    },
    {
      title: {
        en: "Waffir",
        fr: "Waffir",
      },
      slug: "waffir",
      subtitle: {
        en: "Food delivery app",
        fr: "Application de livraison de nourriture",
      },
      keyFeatures: {
        en: {
          Browse: "Browse food options and place orders",
          Track: "Track orders in real-time",
          Manage: "Sellers can create listings and manage orders",
        },
        fr: {
          Parcourir:
            "Parcourir les options alimentaires et passer des commandes",
          Suivre: "Suivre les commandes en temps réel",
          Gérer:
            "Les vendeurs peuvent créer des annonces et gérer les commandes",
        },
      },
      dates: "June 2024 - June 2024",
      active: true,
      description: {
        en: "Waffir is a freelance project for a food delivery app developed using Firebase and Flutter. The app enables buyers to browse food options, place orders, and track them, while sellers can create listings, manage orders, and process payments. Google Maps is integrated for location services, and GetX is utilized for state management, ensuring a smooth and responsive user experience.",
        fr: "Waffir est un projet freelance pour une application de livraison de nourriture développée avec Firebase et Flutter. L'application permet aux acheteurs de parcourir les options alimentaires, passer des commandes et les suivre, tandis que les vendeurs peuvent créer des annonces, gérer les commandes et traiter les paiements. Google Maps est intégré pour les services de localisation, et GetX est utilisé pour la gestion d'état, assurant une expérience utilisateur fluide et réactive.",
      },
      technologies: ["Flutter", "GetX", "Firebase", "Google Maps"],
      image:
        "https://res.cloudinary.com/drajcqail/image/upload/v1723891394/waffir/poster.png",
      mobileAppImages: [
        "https://res.cloudinary.com/drajcqail/image/upload/v1723891379/waffir/home.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723891360/waffir/product-detail.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723891365/waffir/cart.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723891362/waffir/making-order.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723891363/waffir/order-success.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723891362/waffir/dashboard.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723891376/waffir/map.jpg",
      ],
      webAppImages: [],
      links: [],
    },
    {
      title: {
        en: "DZHIKERS",
        fr: "DZHIKERS",
      },
      slug: "dzhikers",
      subtitle: {
        en: "Dynamic platform for hikers in Algeria",
        fr: "Plateforme dynamique pour les randonneurs en Algérie",
      },
      keyFeatures: {
        en: {
          Hikes: "Discover captivating hikes in Algeria",
          Shop: "Shop specialty products",
          Community: "Connect with other hikers",
          Connect: "Join a community of passionate hikers",
        },
        fr: {
          Randonnées: "Découvrez des randonnées captivantes en Algérie",
          Boutique: "Achetez des produits spécialisés",
          Communauté: "Connectez-vous avec d'autres randonneurs",
          Connexion: "Rejoignez une communauté de randonneurs passionnés",
        },
      },
      href: "https://github.com/adnanebnz/dzhikers-web",
      dates: "Jan 2023 - June 2023",
      active: true,
      description: {
        en: "Dynamic platform made using MERN STACK and React Native for hikers in Algeria, offering captivating hikes and a shop selling specialty products.",
        fr: "Plateforme dynamique créée avec MERN STACK et React Native pour les randonneurs en Algérie, offrant des randonnées captivantes et une boutique vendant des produits spécialisés.",
      },
      technologies: ["React", "NodeJS", "ExpressJS", "MongoDB", "React Native"],
      image:
        "https://res.cloudinary.com/drajcqail/image/upload/v1723891474/dzhikers/poster.jpg",
      mobileAppImages: [
        "https://res.cloudinary.com/drajcqail/image/upload/v1723891472/dzhikers/mobile-shop.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723891469/dzhikers/mobile-map.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723891473/dzhikers/mobile-notif.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723891471/dzhikers/mobile-dashboard.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723891460/dzhikers/mobile-reservation.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723891468/dzhikers/mobile-order-1.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723891468/dzhikers/mobile-order-2.jpg",
      ],
      webAppImages: [
        "https://res.cloudinary.com/drajcqail/image/upload/v1723918640/dzhikers/home.png",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723918628/dzhikers/randos.png",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723918627/dzhikers/creating-rando.png",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723918645/dzhikers/rando.png",
      ],
      links: [
        {
          type: "Source Code (Web)",
          href: "https://github.com/adnanebnz/dzhikers-web",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Source Code (Mobile)",
          href: "https://github.com/adnanebnz/dzhikers-mobile",
          icon: <Icons.github className="size-3" />,
        },
      ],
    },
    {
      title: {
        en: "Movies App",
        fr: "Application Films",
      },
      slug: "movies-app",
      subtitle: {
        en: "Discover and explore a wide range of movies",
        fr: "Découvrez et explorez une large gamme de films",
      },
      keyFeatures: {
        en: {
          Streamline: "Streamlines the movie search process",
          Intuitive: "Provides a seamless and intuitive interface",
          Explore: "Explore a wide range of movies",
        },
        fr: {
          Simplifier: "Simplifie le processus de recherche de films",
          Intuitif: "Fournit une interface fluide et intuitive",
          Explorer: "Explorez une large gamme de films",
        },
      },
      href: "https://github.com/adnanebnz/clean_architecture_movies_app",
      dates: "Date not specified",
      active: true,
      description: {
        en: "I developed a movies app using Flutter and BLoC architecture, integrating with The Movie Database (TMDB) API. The app streamlines the movie search process, providing users with a seamless and intuitive interface to discover and explore a wide range of movies.",
        fr: "J'ai développé une application de films utilisant Flutter et l'architecture BLoC, s'intégrant avec l'API The Movie Database (TMDB). L'application simplifie le processus de recherche de films, offrant aux utilisateurs une interface fluide et intuitive pour découvrir et explorer une large gamme de films.",
      },
      technologies: ["Flutter", "BLoC", "Hive"],
      links: [
        {
          type: "Source Code",
          href: "https://github.com/adnanebnz/clean_architecture_movies_app",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image:
        "https://res.cloudinary.com/drajcqail/image/upload/v1723892712/movies-app/poster.png",
      mobileAppImages: [
        "https://res.cloudinary.com/drajcqail/image/upload/v1723892723/movies-app/image3.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723892724/movies-app/image2.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723892724/movies-app/home.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723892696/movies-app/search.jpg",
      ],
      webAppImages: [],
    },
  ],
};

// Helper function to get translated text
export function getTranslatedText(
  text: TranslatedText | string,
  locale: Locale
): string {
  if (typeof text === "string") return text;
  return text[locale] || text.en;
}

// Helper function to get CV file for a specific language
export function getCVFile(locale: Locale): CVFile {
  return DATA.cvFiles[locale];
}
