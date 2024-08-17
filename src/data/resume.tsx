import { Icons } from "@/components/icons";
import { CodeIcon, HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Adnane BENZERDJEB",
  initials: "AB",
  url: "https://skillzdev.tech",
  location: "Tlemcen, Algeria",
  locationLink: "https://www.google.com/maps/place/tlemcen",
  description:
    "Passionate Software Engineer. I love building things and helping people.",
  summary:
    "I am a highly motivated and skilled software engineer with a passion for software development. With a strong addiction to technology,I specialize in web development using ReactJS and NodeJS and mobile development using React Native and Flutter. I am also a big fan of UI/UX design and I am a self-taught designer.",
  avatarUrl: "/me.png",
  skills: [
    "Dart",
    "Flutter",
    "Java",
    "Typescript",
    "React",
    "React Native",
    "Next.js",
    "TailwindCSS",
    "Node.js",
    "Express",
    "AdonisJS",
    "PHP",
    "Laravel",
    "Livewire",
    "Python",
    "Django",
    "C#",
    "ASP.NET",
    "Postgres",
    "MySQL",
    "MongoDB",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
    { href: "/projects", icon: CodeIcon, label: "Projects" },
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

  work: [
    {
      company: "Eurequat Algérie",
      href: "https://www.eurequat-algerie.com/",
      badges: [],
      location: "Tlemcen, Algeria",
      title: "Software Engineer Internship",
      logoUrl: "/logo-eurequat.png",
      start: "July 2024",
      end: "Present",
      description:
        "During my internship at Eurequat Algérie, I developed a robust XML to ZPL conversion package integrated into their WinForms project. Utilizing C# and Microsoft SQL Server, I created a solution that converts XML-based label templates into ZPL (Zebra Programming Language) for seamless label printing. This package allows for predefined label designs to be efficiently translated into ZPL code, ensuring consistent and high-quality label outputs.",
    },
    {
      company: "TechWay",
      href: "#",
      badges: [],
      location: "Tlemcen, Algeria",
      title: "Software Engineer Internship",
      logoUrl: "/azimut.png",
      start: "June 2024",
      end: "July 2024",
      description:
        "Development of a REST API at TechWay \n During my internship at TechWay, I developed and deployed a REST API using Node.js, Express.js, and MySQL to manage reservations, check-ins, and check-outs for the Hydra Hotel in Algiers. This solution, now in production, is actively used by the company",
    },
  ],
  featuredProjects: [
    {
      title: "Algeria Eats",
      slug: "algeria-eats",
      subtitle: "Online platform for ordering sweet and savory food",
      keyFeatures: {
        Showcase: "Artisans showcase their creations",
        Delivery: "Dedicated delivery personnel",
        Connect:
          "Seamlessly connect customers with a diverse culinary experience",
      },
      href: "https://github.com/adnanebnz/algeria-eats",
      dates: "Nov 2022 - Jan 2023",
      active: true,
      description:
        "Algeria Eats is an online platform facilitating the ordering of sweet and savory food. Artisans showcase their creations, and dedicated delivery personnel ensure timely deliveries. The website seamlessly connects customers with a diverse culinary experience.",
      technologies: [
        "TailwindCSS",
        "AlpineJS",
        "Laravel",
        "Livewire",
        "MySQL",
        "Flutter",
        "GetX",
      ],
      links: [
        {
          type: "Source Code (Web)",
          href: "https://github.com/adnanebnz/algeria-eats",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Source Code (Mobile)",
          href: "https://github.com/adnanebnz/algeria-eats-mobile",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/AlgeriaEatsMobile.png",
      mobileAppImages: [
        "/algeriaEats1.jpg",
        "/algeriaEats11.jpg",
        "/algeriaEats2.jpg",
        "/algeriaEats3.jpg",
        "/algeriaEats4.jpg",
        "/algeriaEats5.jpg",
        "/algeriaEats6.jpg",
        "/algeriaEats7.jpg",
        "/algeriaEats8.jpg",
        "/algeriaEats9.jpg",
      ],
      webAppImages: [
        "/vendorScreen.jpg",
        "/AlgeriaEats.png",
        "/admindashboard.jpg",
        "/productsImage.jpg",
        "/orderImage.jpg",
        "/authImage.jpg",
        "/faqImage.jpg",
        "/contactImage.jpg",
      ],
    },
    {
      title: "DZHIKERS",
      slug: "dzhikers",
      subtitle: "Dynamic platform for hikers in Algeria",
      keyFeatures: {
        Hikes: "Discover captivating hikes in Algeria",
        Shop: "Shop specialty products",
        Community: "Connect with other hikers",
        Connect: "Join a community of passionate hikers",
      },
      href: "https://github.com/adnanebnz/dzhikers-web",
      dates: "Jan 2023 - June 2023",
      active: true,
      description:
        "Dynamic platform made using MERN STACK and React Native for hikers in Algeria, offering captivating hikes and a shop selling specialty products.",
      technologies: ["React", "NodeJS", "ExpressJS", "MongoDB", "React Native"],
      image: "/DZHIKERS.jpg",
      images: ["/DZHIKERS.jpg", "/DZHIKERS2.jpg", "/DZHIKERS3.jpg"],
      mobileAppImages: [
        "/dzhikersstore.jpg",
        "/dzhikersmap.jpg",
        "/dzhikersrandi.jpg",
        "/dzhikersnotif2.jpg",
        "/dzhikersprofile.jpg",
        "/dzhikersorder1.jpg",
        "/dzhikersorder2.jpg",
      ],
      webAppImages: [],
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
      title: "Movies App",
      slug: "movies-app",
      subtitle: "Discover and explore a wide range of movies",
      keyFeatures: {
        Streamline: "Streamlines the movie search process",
        Intuitive: "Provides a seamless and intuitive interface",
        Explore: "Explore a wide range of movies",
      },
      href: "https://github.com/adnanebnz/clean_architecture_movies_app",
      dates: "Date not specified",
      active: true,
      description:
        "I developed a movies app using Flutter and BLoC architecture, integrating with The Movie Database (TMDB) API. The app streamlines the movie search process, providing users with a seamless and intuitive interface to discover and explore a wide range of movies.",
      technologies: ["Flutter", "BLoC", "Hive"],
      links: [
        {
          type: "Source Code",
          href: "https://github.com/adnanebnz/clean_architecture_movies_app",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/MoviesApp.png",
      mobileAppImages: [
        "/movies1.jpg",
        "/movies2.jpg",
        "/movies3.jpg",
        "/movies4.jpg",
      ],
      webAppImages: [],
    },
    // {
    //   title: "Multi Vendor Web App",
    //   slug: "multi-vendor-web-app",
    //   subtitle: "Online platform for vendors to sell products",
    //   keyFeatures: {
    //     Register: "Vendors can register and sell products",
    //     Chat: "Chat with customers",
    //     Payments: "Receive payments online",
    //   },
    //   href: "https://github.com/adnanebnz/multi-vendor-project",
    //   dates: "Date not specified",
    //   active: true,
    //   description:
    //     "This is a multi-vendor web app that allows vendors to register and sell their products online with the possibility to chat with customers and receive payments online.",
    //   technologies: ["Node.js", "Express", "MongoDB", "SocketIO", "React"],
    //   links: [
    //     {
    //       type: "Source Code",
    //       href: "https://github.com/adnanebnz/multi-vendor-project",
    //       icon: <Icons.github className="size-3" />,
    //     },
    //   ],
    //   image: "/multi-vendor.png",
    //   images: [
    //     "/multi-vendor.png",
    //     "/multi-vendor2.png",
    //     "/multi-vendor3.png",
    //     "/multi-vendor4.png",
    //   ],
    // },
    {
      title: "Waffir (freelance project)",
      slug: "waffir",
      subtitle: "Food delivery app",
      keyFeatures: {
        Browse: "Browse food options and place orders",
        Track: "Track orders in real-time",
        Manage: "Sellers can create listings and manage orders",
      },
      dates: "June 2024 - June 2024",
      active: true,
      description:
        "Waffir is a freelance project for a food delivery app developed using Firebase and Flutter. The app enables buyers to browse food options, place orders, and track them, while sellers can create listings, manage orders, and process payments. Google Maps is integrated for location services, and GetX is utilized for state management, ensuring a smooth and responsive user experience.",
      technologies: ["Flutter", "GetX", "Firebase", "Google Maps"],
      image: "/waffir.png",
      mobileAppImages: [
        "/waffir1.jpg",
        "/waffir2.jpg",
        "/waffir3.jpg",
        "/waffir4.jpg",
        "/waffir6.jpg",
        "/waffir7.jpg",
        "/waffir5.jpg",
        "/waffir8.jpg",
      ],
    },
  ],
  // TODO ADD WAMMIDH PROJECT and netflix clone maybe other projects too
};
