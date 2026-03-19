import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Upsert tawsil-star-expeditor
  await prisma.project.upsert({
    where: { slug: "tawsil-star-expeditor" },
    update: { architectureDiagram: true },
    create: {
      slug: "tawsil-star-expeditor",
      titleEn: "Tawsil Star Expeditor",
      titleFr: "Tawsil Star Expéditeur",
      subtitleEn: "Package delivery and courier management app for expeditors",
      subtitleFr:
        "Application de gestion de livraison de colis pour expéditeurs",
      descriptionEn:
        "Developed the expeditor-facing mobile application for Tawsil Star's courier service. This app enables expeditors to manage their package deliveries, track shipments in real-time, communicate with drivers, and handle delivery confirmations. Features include route optimization, delivery scheduling, and comprehensive order management for efficient package handling.",
      descriptionFr:
        "Développé l'application mobile côté expéditeur pour le service de courrier Tawsil Star. Cette application permet aux expéditeurs de gérer leurs livraisons de colis, suivre les envois en temps réel, communiquer avec les chauffeurs et gérer les confirmations de livraison.",
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
      architectureDiagram: true,
      posterImage:
        "https://res.cloudinary.com/drajcqail/image/upload/v1739485318/tawsil-star-vtc/poster.png",
      mobileAppImages: [],
      webAppImages: [],
      technologies: ["Python", "Django", "Flutter", "GetX", "WebSockets"],
    },
  });
  console.log("✅ tawsil-star-expeditor");

  // Upsert da-mall
  await prisma.project.upsert({
    where: { slug: "da-mall" },
    update: { architectureDiagram: true },
    create: {
      slug: "da-mall",
      titleEn: "DA-Mall",
      titleFr: "DA-Mall",
      subtitleEn: "E-commerce marketplace application",
      subtitleFr: "Application de marketplace e-commerce",
      descriptionEn:
        "DA-Mall is a comprehensive e-commerce marketplace application that connects buyers and sellers in a seamless digital shopping experience. Features include product listings, shopping cart, secure checkout, order tracking, seller dashboards, and customer reviews.",
      descriptionFr:
        "DA-Mall est une application de marketplace e-commerce complète qui connecte acheteurs et vendeurs dans une expérience d'achat numérique fluide.",
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
      architectureDiagram: true,
      posterImage: null,
      mobileAppImages: [],
      webAppImages: [],
      technologies: ["Flutter", "Laravel", "MySQL", "Firebase"],
    },
  });
  console.log("✅ da-mall");

  // Upsert dzhikers
  await prisma.project.upsert({
    where: { slug: "dzhikers" },
    update: { architectureDiagram: true },
    create: {
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
      architectureDiagram: true,
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
  });
  console.log("✅ dzhikers");

  console.log("🎉 All 3 projects upserted!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
