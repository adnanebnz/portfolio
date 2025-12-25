import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting seed...");

  // Clean existing data
  await prisma.projectLink.deleteMany();
  await prisma.project.deleteMany();
  await prisma.social.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.workExperience.deleteMany();
  await prisma.education.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.cVFile.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();

  console.log("✅ Cleaned existing data");

  // Create Admin User
  const adminPassword = await bcrypt.hash("admin123", 12);
  await prisma.user.create({
    data: {
      email: "admin@skillzdev.tech",
      password: adminPassword,
      name: "Admin",
      role: UserRole.ADMIN,
    },
  });

  console.log("✅ Created admin user (admin@skillzdev.tech / admin123)");

  // Create Profile
  const profile = await prisma.profile.create({
    data: {
      name: "Adnane BENZERDJEB",
      initials: "AB",
      url: "https://skillzdev.tech",
      location: "Tlemcen, Algeria",
      locationLink: "https://www.google.com/maps/place/tlemcen",
      avatarUrl: "/me.png",
      descriptionEn:
        "Passionate Software Engineer. I love building things and helping people.",
      descriptionFr:
        "Ingénieur Logiciel Passionné. J'adore créer des choses et aider les gens.",
      summaryEn:
        "I am a highly motivated and skilled software engineer with a passion for software development. With a strong addiction to technology, I specialize in web development using ReactJS and NodeJS and mobile development using React Native and Flutter. I am also a big fan of UI/UX design and I am a self-taught designer.",
      summaryFr:
        "Je suis un ingénieur logiciel hautement motivé et compétent avec une passion pour le développement logiciel. Avec une forte addiction à la technologie, je me spécialise dans le développement web utilisant ReactJS et NodeJS et le développement mobile utilisant React Native et Flutter. Je suis aussi un grand fan de conception UI/UX et je suis autodidacte en design.",
    },
  });

  console.log("✅ Created profile");

  // Create Contact
  const contact = await prisma.contact.create({
    data: {
      email: "skillzdev@hotmail.com",
      phone: "+213560690167",
      profileId: profile.id,
    },
  });

  // Create Socials
  await prisma.social.createMany({
    data: [
      {
        name: "GitHub",
        url: "https://github.com/adnanebnz/",
        icon: "github",
        showInNav: true,
        contactId: contact.id,
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/adnane-benzerdjeb/",
        icon: "linkedin",
        showInNav: true,
        contactId: contact.id,
      },
      {
        name: "Send Email",
        url: "mailto:skillzdev@hotmail.com",
        icon: "email",
        showInNav: false,
        contactId: contact.id,
      },
    ],
  });

  console.log("✅ Created contact & socials");

  // Create Skills
  const skills = [
    { name: "Dart", category: "Mobile" },
    { name: "Flutter", category: "Mobile" },
    { name: "Java", category: "Backend" },
    { name: "JavaScript", category: "Frontend" },
    { name: "Typescript", category: "Frontend" },
    { name: "React", category: "Frontend" },
    { name: "Next.js", category: "Frontend" },
    { name: "TailwindCSS", category: "Frontend" },
    { name: "Node.js", category: "Backend" },
    { name: "Express", category: "Backend" },
    { name: "AdonisJS", category: "Backend" },
    { name: "NestJS", category: "Backend" },
    { name: "PHP", category: "Backend" },
    { name: "Python", category: "Backend" },
    { name: "Django", category: "Backend" },
    { name: "Laravel", category: "Backend" },
    { name: "Livewire", category: "Backend" },
    { name: "Postgres", category: "Database" },
    { name: "MySQL", category: "Database" },
    { name: "MongoDB", category: "Database" },
    { name: "Firebase", category: "Database" },
    { name: "C#", category: "Backend" },
    { name: ".NET", category: "Backend" },
    { name: "React Native", category: "Mobile" },
  ];

  await prisma.skill.createMany({
    data: skills.map((skill, index) => ({
      ...skill,
      order: index,
      profileId: profile.id,
    })),
  });

  console.log("✅ Created skills");

  // Create Work Experiences
  await prisma.workExperience.createMany({
    data: [
      {
        company: "RDSI",
        href: "https://www.rdsi-dz.com",
        logoUrl: "/RDSI.png",
        location: "Tlemcen, Algeria",
        titleEn: "Software Engineer",
        titleFr: "Ingénieur Logiciel",
        descriptionEn:
          "Full-time handling of legacy application development and maintenance topics for a main client company in France in an outsourcing/nearshoring scheme (corrections, evolutions, critical support, production stability). Development and maintenance of a business application for a client based in France (new features, optimizations, continuous deployment – stack: Django REST Framework, Flutter, PostgreSQL).",
        descriptionFr:
          "Prise en charge à temps plein, des sujets de développement et de maintenance applicative legacy pour une entreprise cliente principale en France dans un schéma d'externalisation/nearshoring (corrections, évolutions, support critique, stabilité en production). Développement et maintenance d'une application métier pour une cliente basée en France (nouvelles fonctionnalités, optimisations, déploiement continu – stack : Django REST Framework, Flutter, PostgreSQL).",
        startDate: "September 2025",
        endDate: null,
        isCurrent: true,
        order: 0,
        badges: [],
        profileId: profile.id,
      },
      {
        company: "Tawsil Star",
        href: "https://www.tawsilstar.dz/",
        logoUrl: "/tawsil_star.jpg",
        location: "Tlemcen, Algeria",
        titleEn: "Software Engineer",
        titleFr: "Ingénieur Logiciel",
        descriptionEn:
          "Developed and maintained a cross-platform mobile app using Flutter, integrating food delivery, package courier, and VTC services. Contributed to backend development using Django, including API creation, user management, and database models. Implemented real-time features for live order tracking and ride request handling using WebSockets. Set up CI/CD pipelines to automate builds, testing, and deployment, ensuring faster and more reliable releases. Integrated Crashlytics for real-time crash reporting and monitoring, improving app stability and performance. Collaborated with the design and backend teams to deliver a smooth and responsive user experience across Android and iOS. Participated in debugging, performance optimization, and publishing updates to app stores.",
        descriptionFr:
          "Développé et maintenu une application mobile multiplateforme utilisant Flutter, intégrant la livraison de nourriture, les services de courrier de colis et VTC. Contribué au développement backend utilisant Django, incluant la création d'API, la gestion des utilisateurs et les modèles de base de données. Implémenté des fonctionnalités en temps réel pour le suivi des commandes en direct et la gestion des demandes de trajets utilisant WebSockets. Mis en place des pipelines CI/CD pour automatiser les builds, les tests et le déploiement, assurant des releases plus rapides et plus fiables. Intégré Crashlytics pour le rapport de crash en temps réel et la surveillance, améliorant la stabilité et les performances de l'app. Collaboré avec les équipes de design et backend pour livrer une expérience utilisateur fluide et réactive sur Android et iOS. Participé au débogage, à l'optimisation des performances et à la publication des mises à jour sur les app stores.",
        startDate: "December 2024",
        endDate: "September 2025",
        isCurrent: false,
        order: 1,
        badges: [],
        profileId: profile.id,
      },
      {
        company: "Eurequat Algérie",
        href: "https://www.eurequat-algerie.com/",
        logoUrl: "/logo-eurequat.png",
        location: "Tlemcen, Algeria",
        titleEn: "Software Engineer Internship",
        titleFr: "Stage Ingénieur Logiciel",
        descriptionEn:
          "During my internship at Eurequat Algérie, I developed a robust XML to ZPL conversion package integrated into their WinForms project. Utilizing C# and Microsoft SQL Server, I created a solution that converts XML-based label templates into ZPL (Zebra Programming Language) for seamless label printing. This package allows for predefined label designs to be efficiently translated into ZPL code, ensuring consistent and high-quality label outputs.",
        descriptionFr:
          "Pendant mon stage chez Eurequat Algérie, j'ai développé un package robuste de conversion XML vers ZPL intégré dans leur projet WinForms. Utilisant C# et Microsoft SQL Server, j'ai créé une solution qui convertit les modèles d'étiquettes basés sur XML en ZPL (Zebra Programming Language) pour une impression d'étiquettes transparente. Ce package permet aux designs d'étiquettes prédéfinis d'être efficacement traduits en code ZPL, assurant des sorties d'étiquettes cohérentes et de haute qualité.",
        startDate: "July 2024",
        endDate: "September 2024",
        isCurrent: false,
        order: 2,
        badges: [],
        profileId: profile.id,
      },
      {
        company: "TechWay",
        href: "#",
        logoUrl: "/azimut.png",
        location: "Tlemcen, Algeria",
        titleEn: "Software Engineer Internship",
        titleFr: "Stage Ingénieur Logiciel",
        descriptionEn:
          "Development of a REST API at TechWay. During my internship at TechWay, I developed and deployed a REST API using Node.js, Express.js, and MySQL to manage reservations, check-ins, and check-outs for the Hydra Hotel in Algiers. This solution, now in production, is actively used by the company.",
        descriptionFr:
          "Développement d'une API REST chez TechWay. Pendant mon stage chez TechWay, j'ai développé et déployé une API REST utilisant Node.js, Express.js et MySQL pour gérer les réservations, les check-ins et les check-outs pour l'Hôtel Hydra à Alger. Cette solution, maintenant en production, est activement utilisée par l'entreprise.",
        startDate: "June 2024",
        endDate: "July 2024",
        isCurrent: false,
        order: 3,
        badges: [],
        profileId: profile.id,
      },
    ],
  });

  console.log("✅ Created work experiences");

  // Create Projects
  const projects = [
    {
      slug: "tawsil-star-vtc",
      titleEn: "Tawsil Star VTC",
      titleFr: "Tawsil Star VTC",
      subtitleEn: "VTC (Vehicle for Hire) taxi booking app",
      subtitleFr: "Application de réservation de taxi VTC",
      descriptionEn:
        "Developed a module in the mobile application for Tawsil Star, a VTC (Vehicle for Hire) taxi booking app, enabling seamless ride booking, real-time tracking, and improved user experience. Implemented key features such as trip management, driver-rider communication, and payment integration to enhance the app's functionality and reliability.",
      descriptionFr:
        "Développé un module dans l'application mobile pour Tawsil Star, une application de réservation de taxi VTC, permettant une réservation de trajet fluide, un suivi en temps réel et une expérience utilisateur améliorée. Implémenté des fonctionnalités clés telles que la gestion des trajets, la communication conducteur-passager et l'intégration du paiement pour améliorer la fonctionnalité et la fiabilité de l'application.",
      keyFeaturesEn: {
        Booking: "Seamless ride booking",
        Tracking: "Real-time tracking",
        Communication: "Driver-rider communication",
      },
      keyFeaturesFr: {
        Réservation: "Réservation de trajet fluide",
        Suivi: "Suivi en temps réel",
        Communication: "Communication conducteur-passager",
      },
      dates: "Jan 2024 - Jan 2024",
      active: true,
      featured: true,
      order: 0,
      posterImage:
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
      technologies: ["Python", "Django", "Flutter", "GetX"],
    },
    {
      slug: "tawsil-star-expeditor",
      titleEn: "Tawsil Star Expeditor",
      titleFr: "Tawsil Star Expéditeur",
      subtitleEn: "Package delivery and courier management app for expeditors",
      subtitleFr:
        "Application de gestion de livraison de colis pour expéditeurs",
      descriptionEn:
        "Developed the expeditor-facing mobile application for Tawsil Star's courier service. This app enables expeditors to manage their package deliveries, track shipments in real-time, communicate with drivers, and handle delivery confirmations. Features include route optimization, delivery scheduling, and comprehensive order management for efficient package handling.",
      descriptionFr:
        "Développé l'application mobile côté expéditeur pour le service de courrier Tawsil Star. Cette application permet aux expéditeurs de gérer leurs livraisons de colis, suivre les envois en temps réel, communiquer avec les chauffeurs et gérer les confirmations de livraison. Les fonctionnalités incluent l'optimisation des itinéraires, la planification des livraisons et une gestion complète des commandes pour un traitement efficace des colis.",
      keyFeaturesEn: {
        Management: "Complete package delivery management",
        Tracking: "Real-time shipment tracking",
        Scheduling: "Delivery scheduling and route optimization",
        Communication: "Driver communication system",
      },
      keyFeaturesFr: {
        Gestion: "Gestion complète des livraisons de colis",
        Suivi: "Suivi des envois en temps réel",
        Planification:
          "Planification des livraisons et optimisation des routes",
        Communication: "Système de communication avec les chauffeurs",
      },
      dates: "Dec 2024 - Sep 2025",
      active: true,
      featured: true,
      order: 1,
      posterImage:
        "https://res.cloudinary.com/drajcqail/image/upload/v1739485318/tawsil-star-vtc/poster.png",
      mobileAppImages: [],
      webAppImages: [],
      technologies: ["Python", "Django", "Flutter", "GetX", "WebSockets"],
    },
    {
      slug: "smartclean",
      titleEn: "SmartClean",
      titleFr: "SmartClean",
      subtitleEn: "Smart cleaning services booking platform",
      subtitleFr:
        "Plateforme de réservation de services de nettoyage intelligente",
      descriptionEn:
        "SmartClean is a comprehensive platform for booking professional cleaning services. The application connects customers with verified cleaning professionals, offering features like service scheduling, real-time tracking, secure payments, and quality ratings. Built with a focus on user experience and reliability.",
      descriptionFr:
        "SmartClean est une plateforme complète pour réserver des services de nettoyage professionnels. L'application connecte les clients avec des professionnels du nettoyage vérifiés, offrant des fonctionnalités comme la planification de services, le suivi en temps réel, les paiements sécurisés et les évaluations de qualité. Construite avec un accent sur l'expérience utilisateur et la fiabilité.",
      keyFeaturesEn: {
        Booking: "Easy service booking system",
        Tracking: "Real-time cleaner tracking",
        Payments: "Secure payment integration",
        Ratings: "Quality rating and review system",
      },
      keyFeaturesFr: {
        Réservation: "Système de réservation de services facile",
        Suivi: "Suivi du nettoyeur en temps réel",
        Paiements: "Intégration de paiement sécurisée",
        Évaluations: "Système d'évaluation et d'avis de qualité",
      },
      dates: "2024",
      active: true,
      featured: true,
      order: 2,
      posterImage: null,
      mobileAppImages: [],
      webAppImages: [],
      technologies: ["Flutter", "Firebase", "Node.js", "Express"],
    },
    {
      slug: "da-mall",
      titleEn: "DA-Mall",
      titleFr: "DA-Mall",
      subtitleEn: "E-commerce marketplace application",
      subtitleFr: "Application de marketplace e-commerce",
      descriptionEn:
        "DA-Mall is a comprehensive e-commerce marketplace application that connects buyers and sellers in a seamless digital shopping experience. Features include product listings, shopping cart, secure checkout, order tracking, seller dashboards, and customer reviews. Built with modern technologies for optimal performance and user experience.",
      descriptionFr:
        "DA-Mall est une application de marketplace e-commerce complète qui connecte acheteurs et vendeurs dans une expérience d'achat numérique fluide. Les fonctionnalités incluent les listes de produits, le panier d'achat, le paiement sécurisé, le suivi des commandes, les tableaux de bord vendeur et les avis clients. Construite avec des technologies modernes pour des performances optimales et une excellente expérience utilisateur.",
      keyFeaturesEn: {
        Shopping: "Complete shopping experience",
        Sellers: "Seller dashboard and analytics",
        Orders: "Order tracking and management",
        Payments: "Multiple payment options",
      },
      keyFeaturesFr: {
        Shopping: "Expérience d'achat complète",
        Vendeurs: "Tableau de bord et analytiques vendeur",
        Commandes: "Suivi et gestion des commandes",
        Paiements: "Options de paiement multiples",
      },
      dates: "2024",
      active: true,
      featured: true,
      order: 3,
      posterImage: null,
      mobileAppImages: [],
      webAppImages: [],
      technologies: ["Flutter", "Laravel", "MySQL", "Firebase"],
    },
    {
      slug: "algeria-eats",
      titleEn: "Algeria Eats",
      titleFr: "Algeria Eats",
      subtitleEn: "Online platform for ordering sweet and savory food",
      subtitleFr:
        "Plateforme en ligne pour commander des plats sucrés et salés",
      descriptionEn:
        "Algeria Eats is an online platform facilitating the ordering of sweet and savory food. Artisans showcase their creations, and dedicated delivery personnel ensure timely deliveries. The website seamlessly connects customers with a diverse culinary experience.",
      descriptionFr:
        "Algeria Eats est une plateforme en ligne facilitant la commande de plats sucrés et salés. Les artisans présentent leurs créations, et un personnel de livraison dédié assure des livraisons ponctuelles. Le site web connecte de manière transparente les clients avec une expérience culinaire diversifiée.",
      keyFeaturesEn: {
        Showcase: "Artisans showcase their creations",
        Delivery: "Dedicated delivery personnel",
        Connect:
          "Seamlessly connect customers with a diverse culinary experience",
      },
      keyFeaturesFr: {
        Vitrine: "Les artisans présentent leurs créations",
        Livraison: "Personnel de livraison dédié",
        Connexion:
          "Connecte les clients avec une expérience culinaire diversifiée",
      },
      href: "https://github.com/adnanebnz/algeria-eats",
      dates: "Nov 2022 - Jan 2023",
      active: true,
      featured: true,
      order: 4,
      posterImage:
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
      technologies: [
        "TailwindCSS",
        "AlpineJS",
        "Laravel",
        "Livewire",
        "MySQL",
        "Flutter",
        "GetX",
      ],
    },
    {
      slug: "wamidh",
      titleEn: "Wamidh",
      titleFr: "Wamidh",
      subtitleEn:
        "Platform to learn Arabic by interacting with a mobile application",
      subtitleFr:
        "Plateforme pour apprendre l'arabe en interagissant avec une application mobile",
      descriptionEn:
        "Wamidh is a mobile application that helps users learn Arabic by interacting with the app. The app provides a range of features to facilitate learning, including quizzes, games, and interactive exercises. Users can track their progress and receive feedback to improve their language skills.",
      descriptionFr:
        "Wamidh est une application mobile qui aide les utilisateurs à apprendre l'arabe en interagissant avec l'application. L'application fournit une gamme de fonctionnalités pour faciliter l'apprentissage, y compris des quiz, des jeux et des exercices interactifs. Les utilisateurs peuvent suivre leurs progrès et recevoir des retours pour améliorer leurs compétences linguistiques.",
      keyFeaturesEn: {
        Messaging: "Students can text each other and teachers.",
        Games:
          "Includes games to learn Arabic, such as listening, writing, and arranging words.",
        "Admin Controls":
          "Admins can ban users and control the entire application.",
        "Teacher Features": "Teachers can upload courses.",
        "Progress Tracking":
          "Users can track their progress and receive feedback.",
      },
      keyFeaturesFr: {
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
      href: "https://play.google.com/store/apps/details?id=com.mhamidi.el_makaniz",
      dates: "June 2024 - June 2024",
      active: true,
      featured: true,
      order: 5,
      posterImage:
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
      technologies: ["Flutter", "Firebase"],
    },
    {
      slug: "waffir",
      titleEn: "Waffir",
      titleFr: "Waffir",
      subtitleEn: "Food delivery app",
      subtitleFr: "Application de livraison de nourriture",
      descriptionEn:
        "Waffir is a freelance project for a food delivery app developed using Firebase and Flutter. The app enables buyers to browse food options, place orders, and track them, while sellers can create listings, manage orders, and process payments. Google Maps is integrated for location services, and GetX is utilized for state management, ensuring a smooth and responsive user experience.",
      descriptionFr:
        "Waffir est un projet freelance pour une application de livraison de nourriture développée avec Firebase et Flutter. L'application permet aux acheteurs de parcourir les options alimentaires, passer des commandes et les suivre, tandis que les vendeurs peuvent créer des annonces, gérer les commandes et traiter les paiements. Google Maps est intégré pour les services de localisation, et GetX est utilisé pour la gestion d'état, assurant une expérience utilisateur fluide et réactive.",
      keyFeaturesEn: {
        Browse: "Browse food options and place orders",
        Track: "Track orders in real-time",
        Manage: "Sellers can create listings and manage orders",
      },
      keyFeaturesFr: {
        Parcourir: "Parcourir les options alimentaires et passer des commandes",
        Suivre: "Suivre les commandes en temps réel",
        Gérer: "Les vendeurs peuvent créer des annonces et gérer les commandes",
      },
      dates: "June 2024 - June 2024",
      active: true,
      featured: true,
      order: 6,
      posterImage:
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
      technologies: ["Flutter", "GetX", "Firebase", "Google Maps"],
    },
    {
      slug: "dzhikers",
      titleEn: "DZHIKERS",
      titleFr: "DZHIKERS",
      subtitleEn: "Dynamic platform for hikers in Algeria",
      subtitleFr: "Plateforme dynamique pour les randonneurs en Algérie",
      descriptionEn:
        "Dynamic platform made using MERN STACK and React Native for hikers in Algeria, offering captivating hikes and a shop selling specialty products.",
      descriptionFr:
        "Plateforme dynamique créée avec MERN STACK et React Native pour les randonneurs en Algérie, offrant des randonnées captivantes et une boutique vendant des produits spécialisés.",
      keyFeaturesEn: {
        Hikes: "Discover captivating hikes in Algeria",
        Shop: "Shop specialty products",
        Community: "Connect with other hikers",
        Connect: "Join a community of passionate hikers",
      },
      keyFeaturesFr: {
        Randonnées: "Découvrez des randonnées captivantes en Algérie",
        Boutique: "Achetez des produits spécialisés",
        Communauté: "Connectez-vous avec d'autres randonneurs",
        Connexion: "Rejoignez une communauté de randonneurs passionnés",
      },
      href: "https://github.com/adnanebnz/dzhikers-web",
      dates: "Jan 2023 - June 2023",
      active: true,
      featured: true,
      order: 7,
      posterImage:
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
      technologies: ["React", "NodeJS", "ExpressJS", "MongoDB", "React Native"],
    },
    {
      slug: "movies-app",
      titleEn: "Movies App",
      titleFr: "Application Films",
      subtitleEn: "Discover and explore a wide range of movies",
      subtitleFr: "Découvrez et explorez une large gamme de films",
      descriptionEn:
        "I developed a movies app using Flutter and BLoC architecture, integrating with The Movie Database (TMDB) API. The app streamlines the movie search process, providing users with a seamless and intuitive interface to discover and explore a wide range of movies.",
      descriptionFr:
        "J'ai développé une application de films utilisant Flutter et l'architecture BLoC, s'intégrant avec l'API The Movie Database (TMDB). L'application simplifie le processus de recherche de films, offrant aux utilisateurs une interface fluide et intuitive pour découvrir et explorer une large gamme de films.",
      keyFeaturesEn: {
        Streamline: "Streamlines the movie search process",
        Intuitive: "Provides a seamless and intuitive interface",
        Explore: "Explore a wide range of movies",
      },
      keyFeaturesFr: {
        Simplifier: "Simplifie le processus de recherche de films",
        Intuitif: "Fournit une interface fluide et intuitive",
        Explorer: "Explorez une large gamme de films",
      },
      href: "https://github.com/adnanebnz/clean_architecture_movies_app",
      dates: "Date not specified",
      active: true,
      featured: true,
      order: 8,
      posterImage:
        "https://res.cloudinary.com/drajcqail/image/upload/v1723892712/movies-app/poster.png",
      mobileAppImages: [
        "https://res.cloudinary.com/drajcqail/image/upload/v1723892723/movies-app/image3.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723892724/movies-app/image2.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723892724/movies-app/home.jpg",
        "https://res.cloudinary.com/drajcqail/image/upload/v1723892696/movies-app/search.jpg",
      ],
      webAppImages: [],
      technologies: ["Flutter", "BLoC", "Hive"],
    },
  ];

  for (const project of projects) {
    await prisma.project.create({
      data: project,
    });
  }

  // Create project links
  const projectsWithLinks = [
    {
      slug: "wamidh",
      links: [
        {
          type: "Play Store",
          href: "https://play.google.com/store/apps/details?id=com.mhamidi.el_makaniz",
          icon: "playStore",
        },
      ],
    },
    {
      slug: "dzhikers",
      links: [
        {
          type: "Source Code (Web)",
          href: "https://github.com/adnanebnz/dzhikers-web",
          icon: "github",
        },
        {
          type: "Source Code (Mobile)",
          href: "https://github.com/adnanebnz/dzhikers-mobile",
          icon: "github",
        },
      ],
    },
    {
      slug: "movies-app",
      links: [
        {
          type: "Source Code",
          href: "https://github.com/adnanebnz/clean_architecture_movies_app",
          icon: "github",
        },
      ],
    },
  ];

  for (const proj of projectsWithLinks) {
    const project = await prisma.project.findUnique({
      where: { slug: proj.slug },
    });
    if (project) {
      for (const link of proj.links) {
        await prisma.projectLink.create({
          data: {
            ...link,
            projectId: project.id,
          },
        });
      }
    }
  }

  console.log("✅ Created projects");

  // Create CV Files
  await prisma.cVFile.createMany({
    data: [
      {
        language: "en",
        fileName: "CV_Adnane_Canada.pdf",
        filePath: "/CV_Adnane_Canada.pdf",
        version: "2024-12",
        isActive: true,
      },
      {
        language: "fr",
        fileName: "CV_Adnane_Canada_FR.pdf",
        filePath: "/CV_Adnane_Canada_FR.pdf",
        version: "2024-12",
        isActive: true,
      },
    ],
  });

  console.log("✅ Created CV files");

  // Create Blog Posts (from existing MDX content)
  await prisma.blogPost.createMany({
    data: [
      {
        slug: "what-are-webhooks",
        titleEn: "What is a Webhook 🎣",
        titleFr: "Qu'est-ce qu'un Webhook 🎣",
        summaryEn:
          "A webhook is a way for an app to provide other applications with real-time information.",
        summaryFr:
          "Un webhook est un moyen pour une application de fournir des informations en temps réel à d'autres applications.",
        contentEn: `A webhook is a way for an app to provide other applications with real-time information. Webhooks are a way for one application to send real-time information to another application. They are used to notify other applications when a specific event occurs. For example, when a new user signs up for your app, you can send a webhook to another application to notify them of the new user.

Webhooks are commonly used in web development to automate tasks and integrate different applications. They are often used to send notifications, update data, and trigger actions in other applications.

### Example: Webhook for New Order Notification

E-commerce Website: When a new order is placed, the website sends a webhook to the inventory management system.
Inventory Management System: Receives the webhook and updates the inventory accordingly.

#### Step-by-Step Implementation:

1. **Setting Up the Webhook Endpoint**

First, you need to create an endpoint in your inventory management system to receive the webhook.

2. **Sending the Webhook from the E-commerce Website**

When a new order is placed, the e-commerce website sends a POST request to the webhook endpoint.

**Webhook Endpoint**: The inventory management system sets up an endpoint/webhook to receive POST requests. When a new order is received, it logs the order and updates the inventory.

**Sending the Webhook**: The e-commerce website sends a POST request to the webhook endpoint with the new order details.`,
        contentFr: `Un webhook est un moyen pour une application de fournir des informations en temps réel à d'autres applications. Les webhooks permettent à une application d'envoyer des informations en temps réel à une autre application. Ils sont utilisés pour notifier d'autres applications lorsqu'un événement spécifique se produit.

Les webhooks sont couramment utilisés dans le développement web pour automatiser des tâches et intégrer différentes applications.

### Exemple : Webhook pour notification de nouvelle commande

Site e-commerce : Lorsqu'une nouvelle commande est passée, le site envoie un webhook au système de gestion des stocks.
Système de gestion des stocks : Reçoit le webhook et met à jour l'inventaire en conséquence.`,
        published: true,
        publishedAt: new Date("2024-08-09"),
        tags: ["webhooks", "api", "backend", "nodejs"],
      },
      {
        slug: "chargily-epay-service",
        titleEn: "Chargily E-pay services 💸",
        titleFr: "Services E-pay Chargily 💸",
        summaryEn:
          "Using Chargily's E-pay services to accept payments in your app.",
        summaryFr:
          "Utiliser les services E-pay de Chargily pour accepter les paiements dans votre application.",
        contentEn: `Chargily Pay, a gateway that allows you to accept online payments with many payment methods in Algeria such as EDAHABIA and CIB cards.

First, start by creating an account on Chargily. Then create your application on the dashboard.

You will be on the Test Mode by default, you can switch to Live Mode (you need to verify your identity first) when you are ready to go live.

The endpoint of this service in **Test Mode** is \`https://pay.chargily.net/test/api/v2\` and in **Live Mode** is \`https://pay.chargily.net/api/v2\`.

To create a payment, you need to send a POST request to the endpoint with the following parameters:
- \`amount\`: The amount of the payment in DZD.
- \`currency\`: The currency of the payment, always \`DZD\`.
- \`success_url\`: The URL to redirect the user to after a successful payment.

### The structure of a webhook's payload

**type**: The type key in the payload indicates the type of event that occurred.

**data**: The data key in the payload contains the object related to the event.

#### Create your webhook endpoint

You need to set up an endpoint on your backend that accepts POST requests so that Chargily Pay can send you the webhooks.

**What should your endpoint do**:
1. Verifying the signature
2. Identify the event
3. Handle the event
4. Respond with a 200 response`,
        contentFr: `Chargily Pay, une passerelle qui vous permet d'accepter des paiements en ligne avec de nombreuses méthodes de paiement en Algérie telles que les cartes EDAHABIA et CIB.

Commencez par créer un compte sur Chargily. Ensuite, créez votre application sur le tableau de bord.

Vous serez en mode Test par défaut, vous pouvez passer en mode Live (vous devez d'abord vérifier votre identité) lorsque vous êtes prêt à passer en production.

Pour créer un paiement, vous devez envoyer une requête POST à l'endpoint avec les paramètres suivants :
- \`amount\`: Le montant du paiement en DZD.
- \`currency\`: La devise du paiement, toujours \`DZD\`.
- \`success_url\`: L'URL pour rediriger l'utilisateur après un paiement réussi.`,
        published: true,
        publishedAt: new Date("2024-08-10"),
        tags: ["payments", "chargily", "algeria", "api"],
      },
      {
        slug: "dart-extensions",
        titleEn: "Dart Extensions 🚀",
        titleFr: "Extensions Dart 🚀",
        summaryEn:
          "Creating and using Dart extensions to add functionality to existing libraries and classes.",
        summaryFr:
          "Créer et utiliser des extensions Dart pour ajouter des fonctionnalités aux bibliothèques et classes existantes.",
        contentEn: `Dart extensions allow you to add functionality to existing libraries and classes without modifying them. Extensions are a powerful feature, especially when you want to add methods to types you don't own. With extensions, you can create custom methods that feel like they're part of the original type.

### Example: Logging Object Values with devtools.log

In this example, we'll create an extension on the Object class to log any object's value using the devtools.log method. This can be especially useful for debugging.

Let's create the extension:

\`\`\`dart
import 'package:devtools/devtools.dart' as devtools;

extension Log on Object {
  void log() => devtools.log(toString());
}
\`\`\`

Now you can call **log()** on any object to log its value:

\`\`\`dart
void main() {
  String greeting = "Hello World";
  greeting.log(); // Logs: "Hello World"

  int number = 42;
  number.log(); // Logs: "42"
}
\`\`\`

This extension leverages Dart's powerful extension methods to make logging more convenient and less intrusive in your codebase.`,
        contentFr: `Les extensions Dart vous permettent d'ajouter des fonctionnalités aux bibliothèques et classes existantes sans les modifier. Les extensions sont une fonctionnalité puissante, surtout lorsque vous voulez ajouter des méthodes à des types que vous ne possédez pas.

### Exemple : Journalisation des valeurs d'objets avec devtools.log

Dans cet exemple, nous allons créer une extension sur la classe Object pour journaliser la valeur de n'importe quel objet en utilisant la méthode devtools.log.

Créons l'extension et utilisons-la pour journaliser facilement n'importe quel objet dans notre code Dart.`,
        published: true,
        publishedAt: new Date("2024-08-16"),
        tags: ["dart", "flutter", "extensions", "mobile"],
      },
    ],
  });

  console.log("✅ Created blog posts");

  console.log("🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
