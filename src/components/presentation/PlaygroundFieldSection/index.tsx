import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { COLORS } from '../../../constants/Colors';
import { stallStore } from '../../../services/stallDataStore';
import { FairgroundScene3D } from './FairgroundScene3D';

export interface RealEstateStall {
  id: string;
  code: string;
  name: string;
  tagline: string;
  category: 'Luxury' | 'Eco Living' | 'Waterfront' | 'Commercial' | 'Smart Home';
  plot: string;
  accentColor: string;
  secondaryColor: string;
  roofColor: string;
  wallColor: string;
  badge: string;
  rating: number;
  reviews: number;
  visitorsNow: number;
  fairOffer: string;
  offerExpires: string;
  description: string;
  boothType: string;
  amenities: string[];
  heightFloor: number;
  projects: {
    title: string;
    type: string;
    location: string;
    priceRange: string;
    sizeRange: string;
    status: 'Ready' | 'Under Construction' | 'Pre-Launch';
    highlights: string[];
    isFeatured?: boolean;
    floorPlan: {
      beds: number;
      baths: number;
      sqft: number;
      facing: string;
    };
  }[];
  agent: {
    name: string;
    title: string;
    phone: string;
    email: string;
    available: boolean;
  };
}

export const REAL_ESTATE_STALLS: RealEstateStall[] = [
  {
    id: 'shanta',
    code: 'RE-01',
    name: 'Shanta Holdings',
    tagline: 'Setting standards in luxury architectural landmarks',
    category: 'Luxury',
    plot: 'Plot A1 · North Plaza Diamond Corner',
    accentColor: '#D4AF37',
    secondaryColor: '#172B33',
    roofColor: '#B38B3F',
    wallColor: '#203A45',
    badge: 'Diamond Sponsor',
    rating: 4.9,
    reviews: 240,
    visitorsNow: 38,
    heightFloor: 3,
    fairOffer: '৳15 Lac Spot Booking Cashback + Complimentary Interior Package',
    offerExpires: 'Ends with Expo',
    description:
      'Experience Bangladesh’s premier ultra-luxury developer. Step into our duplex interactive pavilion showcasing signature high-rises and private sky villas in Gulshan & Banani.',
    boothType: 'Grand Duplex Pavilion',
    amenities: ['360° VR Dome Experience', 'Private VIP Lounge Suites', 'Principal Architect Consultation', '3D Holographic Masterplan'],
    projects: [
      {
        title: 'The Pinnacle Suites',
        type: 'Ultra-Luxury Sky Residence',
        location: 'Gulshan 2 Avenue',
        priceRange: '৳4.5 Cr – ৳11 Cr',
        sizeRange: '3,800 – 6,200 sqft',
        status: 'Under Construction',
        highlights: ['Rooftop Infinity Pool', 'Helipad Access', 'Private Elevator Foyer'],
        isFeatured: true,
        floorPlan: { beds: 4, baths: 5, sqft: 4850, facing: 'South-East Lake' },
      },
      {
        title: 'Shanta Aura',
        type: 'Signature Penthouse Collection',
        location: 'Banani Diplomatic Zone',
        priceRange: '৳3.8 Cr – ৳8 Cr',
        sizeRange: '2,900 – 4,500 sqft',
        status: 'Ready',
        highlights: ['Double-Height Living', 'Smart Home Automation', '4 Car Parking'],
        floorPlan: { beds: 3, baths: 4, sqft: 3400, facing: 'North-West Park' },
      },
      {
        title: 'Shanta Glasshouse',
        type: 'Grade-A Commercial Landmark',
        location: 'Tejgaon Commercial Hub',
        priceRange: '৳6.5 Cr – ৳22 Cr',
        sizeRange: '4,000 – 16,000 sqft',
        status: 'Ready',
        highlights: ['Triple Height Atrium', 'High-Speed Smart Lifts', 'LEED Platinum Rating'],
        floorPlan: { beds: 0, baths: 6, sqft: 6200, facing: 'Main Expressway' },
      },
      {
        title: 'Shanta Forum Tower',
        type: 'Twin Landmark Commercial Highrise',
        location: 'Mohakhali Expressway',
        priceRange: '৳4.2 Cr – ৳14 Cr',
        sizeRange: '3,200 – 8,500 sqft',
        status: 'Under Construction',
        highlights: ['Multi-Level Basements', 'Central BMS Automation', 'Fiber Optic Backbone'],
        floorPlan: { beds: 0, baths: 4, sqft: 4500, facing: 'South Avenue' },
      },
      {
        title: 'Shanta Utopia',
        type: 'Lakefront Sky Villas',
        location: 'Baridhara Diplomatic Lakeview',
        priceRange: '৳5.2 Cr – ৳12.5 Cr',
        sizeRange: '3,500 – 5,800 sqft',
        status: 'Pre-Launch',
        highlights: ['Direct Lake Frontage', 'Private Infinity Plunge Pool', 'German Glazing'],
        floorPlan: { beds: 4, baths: 5, sqft: 4200, facing: 'East Lake Panorama' },
      },
    ],
    agent: {
      name: 'Tanvir Hossain',
      title: 'Senior Property Director',
      phone: '+880 1711 002233',
      email: 'tanvir@shantaholdings.com',
      available: true,
    },
  },
  {
    id: 'sheltech',
    code: 'RE-02',
    name: 'Sheltech Luxury Living',
    tagline: '35 years of trusted urban living & smart communities',
    category: 'Luxury',
    plot: 'Plot A2 · North East Promenade',
    accentColor: '#2EB872',
    secondaryColor: '#0E3A2C',
    roofColor: '#1E6B52',
    wallColor: '#164839',
    badge: 'Platinum Exhibitor',
    rating: 4.8,
    reviews: 310,
    visitorsNow: 44,
    heightFloor: 2,
    fairOffer: 'Zero Registration Cost + Guaranteed 3-Year Rental Yield',
    offerExpires: 'Expo Exclusive',
    description:
      'Sheltech brings bespoke homes designed for contemporary urban living. Explore over 25 ongoing projects with instant spot bank loan approvals up to 80%.',
    boothType: 'Glasshouse Pavilion',
    amenities: ['Instant Loan Approval Desk', 'Architectural Scale Model', 'Espresso Lounge', 'Private Meeting Suites'],
    projects: [
      {
        title: 'Sheltech Elysium',
        type: 'Premium Residential Enclave',
        location: 'Gulshan 1 Lake Road',
        priceRange: '৳2.9 Cr – ৳6.5 Cr',
        sizeRange: '2,400 – 3,900 sqft',
        status: 'Ready',
        highlights: ['Lakefront Jogging Track', 'Solar Powered Grid', 'Clubhouse with Gym'],
        isFeatured: true,
        floorPlan: { beds: 3, baths: 4, sqft: 2850, facing: 'South Lake' },
      },
      {
        title: 'Sheltech Symphony',
        type: 'Modern Urban Apartments',
        location: 'Dhanmondi Rd 8/A',
        priceRange: '৳1.8 Cr – ৳3.9 Cr',
        sizeRange: '1,850 – 2,600 sqft',
        status: 'Under Construction',
        highlights: ['EV Charging Stations', 'Full Power Backup', 'Rooftop BBQ Deck'],
        floorPlan: { beds: 3, baths: 3, sqft: 2100, facing: 'East' },
      },
      {
        title: 'Sheltech Windmere',
        type: 'Boutique Green Condos',
        location: 'Uttara Sector 4 (Near Park)',
        priceRange: '৳1.4 Cr – ৳2.8 Cr',
        sizeRange: '1,750 – 2,400 sqft',
        status: 'Ready',
        highlights: ['Park View Balconies', 'Central Water Filtration', 'Full Generator Backup'],
        floorPlan: { beds: 3, baths: 3, sqft: 1950, facing: 'North-East' },
      },
      {
        title: 'Sheltech Rubicon',
        type: 'Smart Family Residences',
        location: 'Bashundhara R/A Block C',
        priceRange: '৳1.9 Cr – ৳3.6 Cr',
        sizeRange: '2,100 – 3,100 sqft',
        status: 'Under Construction',
        highlights: ['Smart Security System', 'Community Hall & Library', 'Kids Play Area'],
        floorPlan: { beds: 3, baths: 3, sqft: 2300, facing: 'South' },
      },
      {
        title: 'Sheltech Serenity',
        type: 'Peaceful Waterfront Living',
        location: 'Mirpur DOHS Waterfront',
        priceRange: '৳1.3 Cr – ৳2.4 Cr',
        sizeRange: '1,650 – 2,250 sqft',
        status: 'Pre-Launch',
        highlights: ['Lakeside Promenade', 'Acoustic Sound Insulation', 'Modern Marble Finishes'],
        floorPlan: { beds: 3, baths: 3, sqft: 1800, facing: 'Lake View' },
      },
    ],
    agent: {
      name: 'Farzana Rahman',
      title: 'Lead Consultant - Residential',
      phone: '+880 1819 445566',
      email: 'farzana@sheltech-bd.com',
      available: true,
    },
  },
  {
    id: 'navana',
    code: 'RE-03',
    name: 'Navana Real Estate',
    tagline: 'Pioneering eco-friendly sustainable smart architecture',
    category: 'Eco Living',
    plot: 'Plot B1 · West Green Boulevard',
    accentColor: '#00E5FF',
    secondaryColor: '#0A3B52',
    roofColor: '#0097A7',
    wallColor: '#124155',
    badge: 'Eco Pioneer',
    rating: 4.7,
    reviews: 195,
    visitorsNow: 29,
    heightFloor: 2,
    fairOffer: 'Free Full-Home IoT Automation Kit + 8% Fair Discount',
    offerExpires: 'First 20 Bookings',
    description:
      'Navana Real Estate brings biophilic architecture, energy-efficient building tech, and lush hanging gardens into high-density urban living spaces.',
    boothType: 'Eco Dome Pavilion',
    amenities: ['Interactive Touch Walls', 'VR Walkthrough Station', 'Green Energy Showcase', 'Biophilic Design Hub'],
    projects: [
      {
        title: 'Navana Botanica',
        type: 'Eco-Smart Residential Tower',
        location: 'Bashundhara R/A Block I',
        priceRange: '৳1.4 Cr – ৳3.2 Cr',
        sizeRange: '1,650 – 2,800 sqft',
        status: 'Under Construction',
        highlights: ['Vertical Forest Balconies', 'Rainwater Harvesting', '99.9% Solar Common Area'],
        isFeatured: true,
        floorPlan: { beds: 3, baths: 3, sqft: 2200, facing: 'South-West' },
      },
      {
        title: 'Navana Platinum Lake',
        type: 'Waterfront Duplex Suites',
        location: 'Uttara Sector 11 Lakeview',
        priceRange: '৳2.2 Cr – ৳5 Cr',
        sizeRange: '2,200 – 3,600 sqft',
        status: 'Pre-Launch',
        highlights: ['Direct Lake Access', 'Soundproof Triple Glazing', 'Private Garden Deck'],
        floorPlan: { beds: 4, baths: 4, sqft: 3100, facing: 'North Lake' },
      },
      {
        title: 'Navana Gardenia',
        type: 'Biophilic Luxury Residences',
        location: 'Banani Lakefront Avenue',
        priceRange: '৳3.5 Cr – ৳7 Cr',
        sizeRange: '2,800 – 4,200 sqft',
        status: 'Ready',
        highlights: ['Hanging Balcony Gardens', 'Smart Air Purification', 'Infinity Rooftop Pool'],
        floorPlan: { beds: 3, baths: 4, sqft: 3300, facing: 'Lake North' },
      },
      {
        title: 'Navana Eco-Haven',
        type: 'Sustainable Green Community',
        location: 'Purbachal 300ft Expressway',
        priceRange: '৳1.1 Cr – ৳2.3 Cr',
        sizeRange: '1,500 – 2,400 sqft',
        status: 'Under Construction',
        highlights: ['70% Open Landscaping', 'Organic Rooftop Farming', 'Solar Battery Microgrid'],
        floorPlan: { beds: 3, baths: 2, sqft: 1750, facing: 'South-East' },
      },
    ],
    agent: {
      name: 'Ashikur Chowdhury',
      title: 'Senior Green Architect',
      phone: '+880 1977 112299',
      email: 'ashik@navana-realestate.com',
      available: true,
    },
  },
  {
    id: 'bti',
    code: 'RE-04',
    name: 'bti (Building Tech & Ideas)',
    tagline: 'Creating classic homes with engineering excellence',
    category: 'Smart Home',
    plot: 'Plot B2 · Central Ring Plaza',
    accentColor: '#FF6D00',
    secondaryColor: '#4A2800',
    roofColor: '#E65100',
    wallColor: '#36200D',
    badge: 'Gold Exhibitor',
    rating: 4.8,
    reviews: 280,
    visitorsNow: 36,
    heightFloor: 2,
    fairOffer: 'Pre-launch 12% Spot Price Advantage + Modular Kitchen Voucher',
    offerExpires: 'This Fair Weekend',
    description:
      'With over four decades of engineering trust, bti showcases smart functional residences and mixed-use towers with earthquake-resistant structural safety.',
    boothType: 'Smart Kinetic Pavilion',
    amenities: ['Smart Automation Experience', 'Architectural Material Bar', '3D Walkthrough Station', 'Complimentary Financial Plan'],
    projects: [
      {
        title: 'bti Three Sixty',
        type: 'Smart Urban Living Spaces',
        location: 'Dhanmondi Central',
        priceRange: '৳2.1 Cr – ৳4.8 Cr',
        sizeRange: '1,950 – 3,100 sqft',
        status: 'Under Construction',
        highlights: ['App Controlled Lighting & Climate', 'Double Basements', 'Rooftop Observatory'],
        isFeatured: true,
        floorPlan: { beds: 3, baths: 3, sqft: 2450, facing: 'South' },
      },
      {
        title: 'bti Silicon Horizon',
        type: 'Commercial Tech Suites',
        location: 'Tejgaon Commercial Corridor',
        priceRange: '৳3.5 Cr – ৳15 Cr',
        sizeRange: '3,000 – 12,000 sqft',
        status: 'Ready',
        highlights: ['LEED Gold Certified', 'High-Speed Optical Elevators', 'Central Chiller AC'],
        floorPlan: { beds: 0, baths: 4, sqft: 5200, facing: 'Main Expressway' },
      },
      {
        title: 'bti Celebration Point',
        type: 'Modern Skyline Residences',
        location: 'Gulshan 1 South Avenue',
        priceRange: '৳3.9 Cr – ৳8 Cr',
        sizeRange: '2,700 – 4,400 sqft',
        status: 'Ready',
        highlights: ['Heated Indoor Pool', 'Concierge Reception Foyer', 'Automated Basement Parking'],
        floorPlan: { beds: 4, baths: 4, sqft: 3600, facing: 'South-East' },
      },
      {
        title: 'bti Grand Monarch',
        type: 'Classic Family Apartments',
        location: 'Bashundhara Block D',
        priceRange: '৳1.6 Cr – ৳3.3 Cr',
        sizeRange: '1,800 – 2,750 sqft',
        status: 'Under Construction',
        highlights: ['Earthquake Zone 3 Engineering', 'Rooftop Gym & Walking Track', 'CCTV Security'],
        floorPlan: { beds: 3, baths: 3, sqft: 2050, facing: 'East' },
      },
    ],
    agent: {
      name: 'Kazi Mahbub',
      title: 'Principal Sales Advisor',
      phone: '+880 1730 889900',
      email: 'kazi.mahbub@btibd.com',
      available: true,
    },
  },
  {
    id: 'rangs',
    code: 'RE-05',
    name: 'Rangs Properties',
    tagline: 'Sculpting iconic bold contemporary architecture',
    category: 'Luxury',
    plot: 'Plot B3 · East Plaza Wing',
    accentColor: '#FF1744',
    secondaryColor: '#3A0B17',
    roofColor: '#C2185B',
    wallColor: '#28121B',
    badge: 'Design Icon',
    rating: 4.9,
    reviews: 215,
    visitorsNow: 31,
    heightFloor: 3,
    fairOffer: 'Complimentary Signature Italian Interior Package (Value ৳20L)',
    offerExpires: 'Expo Only',
    description:
      'Rangs Properties crafts architectural sculpture in the skyline. Known for exposed fair-face concrete, dramatic cantilevers, and ultra-exclusive residences.',
    boothType: 'Grand Duplex Pavilion',
    amenities: ['Design Studio Bar', 'Architectural Diorama', 'Private VIP Lounge', 'Virtual Tour Experience'],
    projects: [
      {
        title: 'Rangs Toruk',
        type: 'Architectural Sculptural Landmark',
        location: 'Banani Rd 11',
        priceRange: '৳4.2 Cr – ৳9.8 Cr',
        sizeRange: '3,400 – 5,800 sqft',
        status: 'Under Construction',
        highlights: ['Exposed Concrete Aesthetics', 'Cantilevered Plunge Pools', 'Private Sky Garden'],
        isFeatured: true,
        floorPlan: { beds: 4, baths: 5, sqft: 4200, facing: 'South-East' },
      },
      {
        title: 'Rangs FC Enclave',
        type: 'Boutique Residence',
        location: 'Gulshan 2 Diplomatic Zone',
        priceRange: '৳5 Cr – ৳12 Cr',
        sizeRange: '4,200 – 7,000 sqft',
        status: 'Ready',
        highlights: ['Single Apartment per Floor', 'German Engineered Glazing', '4-Tier Biometric Access'],
        floorPlan: { beds: 4, baths: 5, sqft: 5400, facing: 'South Panoramic' },
      },
      {
        title: 'Rangs Miranda',
        type: 'Signature Minimalist Suites',
        location: 'Dhanmondi Rd 2',
        priceRange: '৳2.8 Cr – ৳6.2 Cr',
        sizeRange: '2,600 – 4,100 sqft',
        status: 'Ready',
        highlights: ['Floor-to-Ceiling Glass Walls', 'Italian Travertine Marble', 'Infinity Roof Deck'],
        floorPlan: { beds: 3, baths: 4, sqft: 3100, facing: 'South' },
      },
      {
        title: 'Rangs Babylon',
        type: 'Ultra-Luxury Sky Villa',
        location: 'Baridhara Diplomatic Zone',
        priceRange: '৳5.5 Cr – ৳13 Cr',
        sizeRange: '3,800 – 6,500 sqft',
        status: 'Under Construction',
        highlights: ['Private Elevator Entry', 'Double-Height Terrace', 'Custom Designer Kitchens'],
        floorPlan: { beds: 4, baths: 5, sqft: 4800, facing: 'Lake & Park Panorama' },
      },
    ],
    agent: {
      name: 'Nusrat Jahan',
      title: 'Head of Luxury Relations',
      phone: '+880 1708 556677',
      email: 'nusrat@rangsproperties.com',
      available: true,
    },
  },
  {
    id: 'concord',
    code: 'RE-06',
    name: 'Concord Real Estate',
    tagline: 'The pioneers who built the nation’s monumental towers',
    category: 'Commercial',
    plot: 'Plot C1 · South West Lake Promenade',
    accentColor: '#00E676',
    secondaryColor: '#063A25',
    roofColor: '#00838F',
    wallColor: '#0B292F',
    badge: 'Pioneer Builder',
    rating: 4.7,
    reviews: 420,
    visitorsNow: 25,
    heightFloor: 2,
    fairOffer: '36-Month 0% Interest EMI Scheme + Instant Spot Allotment',
    offerExpires: 'Fair Special',
    description:
      'From the National Martyrs’ Monument to Dhaka’s tallest commercial towers, Concord is synonymous with mega-scale infrastructure and residential reliability.',
    boothType: 'Glasshouse Pavilion',
    amenities: ['Township Masterplan Model', 'Mortgage Assistance Desk', 'VR Experience Pod', 'VIP Consultation Room'],
    projects: [
      {
        title: 'Concord Regency Lakeview',
        type: 'Serene Waterfront Condominium',
        location: 'Baridhara Diplomatic Enclave',
        priceRange: '৳3.6 Cr – ৳7.5 Cr',
        sizeRange: '2,800 – 4,600 sqft',
        status: 'Ready',
        highlights: ['Exclusive Lake View Balconies', 'Tennis & Squash Courts', 'Dedicated Generator Substations'],
        isFeatured: true,
        floorPlan: { beds: 3, baths: 4, sqft: 3200, facing: 'East Lake' },
      },
      {
        title: 'Concord City Centre',
        type: 'Commercial Grade-A Tower',
        location: 'Motijheel Commercial Hub',
        priceRange: '৳2.8 Cr – ৳18 Cr',
        sizeRange: '2,500 – 15,000 sqft',
        status: 'Under Construction',
        highlights: ['High-Velocity Elevators', 'Integrated BMS Automation', 'Fiber Optic Backbone'],
        floorPlan: { beds: 0, baths: 6, sqft: 6500, facing: 'Financial District' },
      },
      {
        title: 'Concord Lake City',
        type: 'Self-Sufficient Mega Township',
        location: 'Khilkhet Mega Township',
        priceRange: '৳85 Lac – ৳1.8 Cr',
        sizeRange: '1,250 – 2,100 sqft',
        status: 'Ready',
        highlights: ['Huge Open Lakes', 'Shopping Mall & School Inside', 'Community Mosque & Park'],
        floorPlan: { beds: 3, baths: 2, sqft: 1450, facing: 'South Lake' },
      },
      {
        title: 'Concord Grand Heritage',
        type: 'Boutique Luxury Suites',
        location: 'Gulshan 2 Avenue',
        priceRange: '৳4.8 Cr – ৳9.5 Cr',
        sizeRange: '3,200 – 5,000 sqft',
        status: 'Under Construction',
        highlights: ['Imported Greek Marble', 'Rooftop Lounge & Gym', 'Automated Card Access'],
        floorPlan: { beds: 4, baths: 4, sqft: 3900, facing: 'South Avenue' },
      },
    ],
    agent: {
      name: 'Saiful Islam',
      title: 'Associate General Manager',
      phone: '+880 1713 990011',
      email: 'saiful@concordgroupbd.com',
      available: true,
    },
  },
  {
    id: 'assure',
    code: 'RE-07',
    name: 'Assure Group',
    tagline: 'Exquisite craftsmanship, timely delivery & prime Dhaka locations',
    category: 'Waterfront',
    plot: 'Plot C2 · Central South Walkway',
    accentColor: '#E040FB',
    secondaryColor: '#360947',
    roofColor: '#6A1B9A',
    wallColor: '#240A30',
    badge: 'Premium Builder',
    rating: 4.8,
    reviews: 165,
    visitorsNow: 22,
    heightFloor: 2,
    fairOffer: 'Guaranteed 50g Gold Coin + ৳5 Lac Interior Voucher on Spot Booking',
    offerExpires: 'Last 3 Days of Fair',
    description:
      'Assure Group is renowned for meticulous detailing, elegant marble finishes, and on-time project handover records across Dhanmondi, Uttara, and Mirpur DOHS.',
    boothType: 'Smart Kinetic Pavilion',
    amenities: ['Interior Mockup Suites', 'Live Site Camera Feed', 'Financial Advisory Desk', 'VIP Guest Lounge'],
    projects: [
      {
        title: 'Assure Majestic Heights',
        type: 'Modern Executive Apartments',
        location: 'Uttara Sector 3 (Near Park)',
        priceRange: '৳1.6 Cr – ৳3.4 Cr',
        sizeRange: '1,750 – 2,700 sqft',
        status: 'Under Construction',
        highlights: ['Imported Turkish Marble', 'Rooftop Community Lounge', '24/7 Monitored CCTV Guarding'],
        isFeatured: true,
        floorPlan: { beds: 3, baths: 3, sqft: 2150, facing: 'South-East' },
      },
      {
        title: 'Assure Oasis Bay',
        type: 'Lakeside Boutique Condos',
        location: 'Mirpur DOHS Waterfront',
        priceRange: '৳1.9 Cr – ৳3.8 Cr',
        sizeRange: '1,900 – 2,950 sqft',
        status: 'Ready',
        highlights: ['Serene Water Breeze', 'Dedicated Jogging Path', 'Central Water Filtration Plant'],
        floorPlan: { beds: 3, baths: 3, sqft: 2600, facing: 'Lake North' },
      },
      {
        title: 'Assure Celestial Star',
        type: 'Prime Urban Sanctuary',
        location: 'Dhanmondi Central (Road 9/A)',
        priceRange: '৳2.4 Cr – ৳4.9 Cr',
        sizeRange: '2,100 – 3,300 sqft',
        status: 'Under Construction',
        highlights: ['Full Generator Backup', 'Kids Indoor Play Zone', 'Solar Roof Common Area'],
        floorPlan: { beds: 3, baths: 4, sqft: 2500, facing: 'South' },
      },
      {
        title: 'Assure Palace Royale',
        type: 'Exclusive High-Rise Enclave',
        location: 'Banani Block F',
        priceRange: '৳3.8 Cr – ৳7.6 Cr',
        sizeRange: '2,800 – 4,500 sqft',
        status: 'Ready',
        highlights: ['Modern Glass Architecture', 'Double Car Parking', 'Automated Fire Protection'],
        floorPlan: { beds: 4, baths: 4, sqft: 3400, facing: 'East Avenue' },
      },
    ],
    agent: {
      name: 'Muntasir Billah',
      title: 'Corporate Sales Lead',
      phone: '+880 1841 334455',
      email: 'muntasir@assuregroupbd.com',
      available: true,
    },
  },
  {
    id: 'bay',
    code: 'RE-08',
    name: 'Bay Developments',
    tagline: 'Architect-led design philosophy creating timeless sanctuaries',
    category: 'Waterfront',
    plot: 'Plot C3 · South East Pavilion Corner',
    accentColor: '#64FFDA',
    secondaryColor: '#053B34',
    roofColor: '#00695C',
    wallColor: '#082E2B',
    badge: 'Architects Guild',
    rating: 4.9,
    reviews: 180,
    visitorsNow: 30,
    heightFloor: 2,
    fairOffer: 'Free Lifetime Membership to Bay Luxury Club + 5 Years Free Maintenance',
    offerExpires: 'Fair Special',
    description:
      'Bay Developments integrates natural light, cross-ventilation, and custom architectural bespoke fittings for discerning connoisseurs who seek timeless tranquility.',
    boothType: 'Glasshouse Pavilion',
    amenities: ['Material Library', 'Acoustic Sound Testing Demo', 'Espresso Bar', 'Private VIP Suites'],
    projects: [
      {
        title: 'Bay Edgewater',
        type: 'Ultra-Exclusive Waterfront Haven',
        location: 'Gulshan 2 North Lake',
        priceRange: '৳5.5 Cr – ৳14 Cr',
        sizeRange: '4,500 – 7,800 sqft',
        status: 'Under Construction',
        highlights: ['Private Boat Dock Access', 'Triple Height Living Atrium', 'Acoustic Glass Walls'],
        isFeatured: true,
        floorPlan: { beds: 4, baths: 5, sqft: 5200, facing: 'North Waterfront' },
      },
      {
        title: 'Bay’s Park Ridge',
        type: 'Luxury Park-Facing Residences',
        location: 'Baridhara Park Road',
        priceRange: '৳4.2 Cr – ৳8.5 Cr',
        sizeRange: '3,200 – 5,100 sqft',
        status: 'Ready',
        highlights: ['Direct Park Panorama', 'Automated Venetian Blinds', 'Sub-Zero & Wolf Kitchens'],
        floorPlan: { beds: 3, baths: 4, sqft: 3800, facing: 'Direct Park Panorama' },
      },
      {
        title: 'Bay’s Bella Vista',
        type: 'Waterfront Urban Sanctuary',
        location: 'Dhanmondi Lakefront Road',
        priceRange: '৳3.4 Cr – ৳7.2 Cr',
        sizeRange: '2,900 – 4,600 sqft',
        status: 'Ready',
        highlights: ['Panoramic Lake Balconies', 'Italian Quartz Counters', '24/7 Security Concierge'],
        floorPlan: { beds: 4, baths: 4, sqft: 3500, facing: 'Lake Front' },
      },
      {
        title: 'Bay’s 23rd Boulevard',
        type: 'Sky Villa Penthouse Suites',
        location: 'Gulshan Avenue Central',
        priceRange: '৳4.8 Cr – ৳11 Cr',
        sizeRange: '3,600 – 6,000 sqft',
        status: 'Under Construction',
        highlights: ['Private Elevator Entry', 'Double Height Ceilings', 'Rooftop Infinity Deck'],
        floorPlan: { beds: 4, baths: 5, sqft: 4500, facing: 'South-East City View' },
      },
    ],
    agent: {
      name: 'Nabil Haque',
      title: 'Director of VIP Relations',
      phone: '+880 1715 667788',
      email: 'nabil@baydevelopments.com',
      available: true,
    },
  },
  {
    id: 'dominno',
    code: 'RE-09',
    name: 'Dom-Inno Builders',
    tagline: 'Modern aesthetic living in prime residential sectors',
    category: 'Luxury',
    plot: 'Plot D1 · Far North-West Avenue',
    accentColor: '#AB47BC',
    secondaryColor: '#2A0835',
    roofColor: '#8E24AA',
    wallColor: '#24092C',
    badge: 'Premier Icon',
    rating: 4.7,
    reviews: 140,
    visitorsNow: 20,
    heightFloor: 2,
    fairOffer: '৳8 Lac Spot Rebate + Free Modular Wardrobe Systems',
    offerExpires: 'Fair Weekend',
    description:
      'Dom-Inno crafts contemporary urban residences known for architectural purity, private balconies, and landscaped roof lounges in Dhanmondi and Uttara.',
    boothType: 'Glasshouse Pavilion',
    amenities: ['Material Sample Bar', 'Virtual Model Station', 'VIP Coffee Bar', 'Architectural Layout Desk'],
    projects: [
      {
        title: 'Dom-Inno Serenita',
        type: 'Modern Boutique Suites',
        location: 'Dhanmondi Rd 4',
        priceRange: '৳2.2 Cr – ৳4.6 Cr',
        sizeRange: '2,100 – 3,200 sqft',
        status: 'Under Construction',
        highlights: ['Soundproof French Windows', 'Rooftop Infinity Deck', 'Dual Car Parking'],
        isFeatured: true,
        floorPlan: { beds: 3, baths: 3, sqft: 2500, facing: 'South Park' },
      },
      {
        title: 'Dom-Inno Dolce Vita',
        type: 'Urban Luxury Enclave',
        location: 'Banani Lake Walkway',
        priceRange: '৳3.1 Cr – ৳6.2 Cr',
        sizeRange: '2,500 – 3,800 sqft',
        status: 'Ready',
        highlights: ['Imported Spanish Tile', 'Rooftop Gymnasium', '24/7 Security CCTV'],
        floorPlan: { beds: 3, baths: 4, sqft: 2900, facing: 'East' },
      },
      {
        title: 'Dom-Inno Bella Casa',
        type: 'Contemporary Family Homes',
        location: 'Uttara Sector 5',
        priceRange: '৳1.5 Cr – ৳3.0 Cr',
        sizeRange: '1,800 – 2,650 sqft',
        status: 'Ready',
        highlights: ['Full Generator Backup', 'South-Facing Balcony', 'Dedicated Intercom'],
        floorPlan: { beds: 3, baths: 3, sqft: 2100, facing: 'South' },
      },
    ],
    agent: {
      name: 'Imtiaz Ahmed',
      title: 'Senior Property Advisor',
      phone: '+880 1712 112233',
      email: 'imtiaz@dominno-bd.com',
      available: true,
    },
  },
  {
    id: 'rupayan',
    code: 'RE-10',
    name: 'Rupayan City Uttara',
    tagline: 'Country’s premier premium gated mega township',
    category: 'Luxury',
    plot: 'Plot D2 · Far North-East Avenue',
    accentColor: '#FF9800',
    secondaryColor: '#3E2723',
    roofColor: '#F57C00',
    wallColor: '#301F11',
    badge: 'Mega Township',
    rating: 4.9,
    reviews: 380,
    visitorsNow: 42,
    heightFloor: 3,
    fairOffer: 'Instant ৳20 Lac Booking Cashback + 5-Year Club Membership',
    offerExpires: 'Expo Exclusive',
    description:
      'Rupayan City Uttara represents Bangladesh’s first self-contained premium gated mega community with 63% open green spaces, private school, and grand clubhouse.',
    boothType: 'Grand Duplex Pavilion',
    amenities: ['Township 3D Hologram', 'Helicopter Site Visit Booking', 'VIP Executive Suites', 'Kids Play Zone'],
    projects: [
      {
        title: 'Rupayan Grand Majestic',
        type: 'Township Condominium',
        location: 'Uttara Sector 12 Mega Township',
        priceRange: '৳3.2 Cr – ৳7.8 Cr',
        sizeRange: '2,600 – 4,800 sqft',
        status: 'Ready',
        highlights: ['63% Open Green Space', 'Olympic Lap Pool', 'Private Gated Security'],
        isFeatured: true,
        floorPlan: { beds: 4, baths: 4, sqft: 3600, facing: 'Central Boulevard' },
      },
      {
        title: 'Rupayan Sky Villa Collection',
        type: 'Duplex Penthouse Residences',
        location: 'Uttara Gated Township',
        priceRange: '৳4.8 Cr – ৳11.5 Cr',
        sizeRange: '3,800 – 6,500 sqft',
        status: 'Under Construction',
        highlights: ['Private Rooftop Plunge Pool', 'Double Height Living Room', 'Clubhouse Access'],
        floorPlan: { beds: 5, baths: 5, sqft: 5200, facing: 'Township Central Park' },
      },
      {
        title: 'Rupayan Maxx Square',
        type: 'Commercial Retail & Corporate Tower',
        location: 'Uttara Sector 12 Commercial Hub',
        priceRange: '৳2.2 Cr – ৳15 Cr',
        sizeRange: '1,500 – 8,000 sqft',
        status: 'Ready',
        highlights: ['Grand Central Atrium', 'Escalators & High-Speed Lifts', 'Ample Basement Parking'],
        floorPlan: { beds: 0, baths: 4, sqft: 4200, facing: 'Main Avenue' },
      },
    ],
    agent: {
      name: 'Shahrier Kabir',
      title: 'VP of Township Sales',
      phone: '+880 1719 334455',
      email: 'shahrier@rupayancity.com',
      available: true,
    },
  },
  {
    id: 'suvastu',
    code: 'RE-11',
    name: 'Suvastu Properties',
    tagline: 'Delivering architectural landmarks with unyielding trust',
    category: 'Smart Home',
    plot: 'Plot D3 · Far South-West Avenue',
    accentColor: '#26A69A',
    secondaryColor: '#07332D',
    roofColor: '#00796B',
    wallColor: '#0B2925',
    badge: 'Quality Builder',
    rating: 4.8,
    reviews: 175,
    visitorsNow: 19,
    heightFloor: 2,
    fairOffer: 'Free Solar Panel System + 10% Down Payment Option',
    offerExpires: 'Fair Special',
    description:
      'Suvastu Properties delivers premium living environments that blend smart electrical engineering, lush green gardens, and high earthquake safety standards.',
    boothType: 'Smart Kinetic Pavilion',
    amenities: ['Smart Energy Desk', 'Structural Safety Certs', 'VIP Lounge', 'VR Walkthrough'],
    projects: [
      {
        title: 'Suvastu Nazar Valley',
        type: 'Eco-Smart Residential Complex',
        location: 'Badda Link Road / Gulshan Fringe',
        priceRange: '৳1.5 Cr – ৳3.1 Cr',
        sizeRange: '1,700 – 2,650 sqft',
        status: 'Under Construction',
        highlights: ['Solar Roof Grid', 'Multi-Tier Fire Safety', 'Rooftop Badminton Court'],
        isFeatured: true,
        floorPlan: { beds: 3, baths: 3, sqft: 2150, facing: 'South East' },
      },
      {
        title: 'Suvastu Suraiya Heights',
        type: 'Modern Urban Residences',
        location: 'Dhanmondi Rd 12/A',
        priceRange: '৳2.3 Cr – ৳4.5 Cr',
        sizeRange: '2,050 – 3,100 sqft',
        status: 'Ready',
        highlights: ['Italian Imported Marble', '24/7 Security & CCTV', 'Community Lounge'],
        floorPlan: { beds: 3, baths: 4, sqft: 2600, facing: 'South' },
      },
      {
        title: 'Suvastu Green Palace',
        type: 'Serene Residential Enclave',
        location: 'Uttara Sector 6',
        priceRange: '৳1.4 Cr – ৳2.8 Cr',
        sizeRange: '1,600 – 2,500 sqft',
        status: 'Ready',
        highlights: ['Park Vicinity', 'Rooftop Gardening', 'Standby Generator'],
        floorPlan: { beds: 3, baths: 3, sqft: 1900, facing: 'East' },
      },
    ],
    agent: {
      name: 'Rezaul Karim',
      title: 'Head of Sales & Marketing',
      phone: '+880 1817 778899',
      email: 'reza@suvastu.com',
      available: true,
    },
  },
  {
    id: 'urbandesign',
    code: 'RE-12',
    name: 'Urban Design & Dev',
    tagline: 'Modern urban aesthetics for visionary living',
    category: 'Commercial',
    plot: 'Plot D4 · Far South-East Avenue',
    accentColor: '#F06292',
    secondaryColor: '#38091E',
    roofColor: '#C2185B',
    wallColor: '#2B0D1B',
    badge: 'Innovator',
    rating: 4.7,
    reviews: 130,
    visitorsNow: 21,
    heightFloor: 2,
    fairOffer: 'Zero Processing Fee + Spot Gold Sovereign Voucher',
    offerExpires: 'Last 2 Days',
    description:
      'Urban Design & Development specializes in modern commercial landmarks and boutique residential towers with cutting-edge glass curtain walls.',
    boothType: 'Glasshouse Pavilion',
    amenities: ['BMS Automation Desk', 'Commercial ROI Calculator', 'Private Meeting Suite'],
    projects: [
      {
        title: 'Urban Vantage Point',
        type: 'Commercial & Corporate Hub',
        location: 'Gulshan Avenue Commercial',
        priceRange: '৳3.8 Cr – ৳14 Cr',
        sizeRange: '2,800 – 10,000 sqft',
        status: 'Pre-Launch',
        highlights: ['Triple Height Atrium', 'Smart Access Turnstiles', '100% Acoustic Double Glazing'],
        isFeatured: true,
        floorPlan: { beds: 0, baths: 4, sqft: 4500, facing: 'Avenue View' },
      },
      {
        title: 'Urban Crystal Lake',
        type: 'Luxury Boutique Residences',
        location: 'Banani Lake Enclave',
        priceRange: '৳2.9 Cr – ৳6.2 Cr',
        sizeRange: '2,400 – 3,900 sqft',
        status: 'Ready',
        highlights: ['Lakefront Balconies', 'Imported Marble Flooring', 'Rooftop Barbecue Area'],
        floorPlan: { beds: 3, baths: 4, sqft: 2800, facing: 'Lake North' },
      },
      {
        title: 'Urban Imperial Heights',
        type: 'Contemporary Skyline Suites',
        location: 'Dhanmondi Central',
        priceRange: '৳1.9 Cr – ৳4.0 Cr',
        sizeRange: '1,950 – 3,000 sqft',
        status: 'Under Construction',
        highlights: ['Smart Lighting Systems', 'Double Basement Parking', 'Full Power Backup'],
        floorPlan: { beds: 3, baths: 3, sqft: 2250, facing: 'South' },
      },
    ],
    agent: {
      name: 'Sabrina Mostafa',
      title: 'Senior Commercial Consultant',
      phone: '+880 1714 556688',
      email: 'sabrina@uddlbd.com',
      available: true,
    },
  },
];

const CATEGORIES = [
  { label: 'ALL ATTRACTIONS (18)', value: 'All Stalls' },
  { label: 'LUXURY RESIDENCES (5)', value: 'Luxury' },
  { label: 'ECO SMART LIVING', value: 'Eco Living' },
  { label: 'SMART IOT HOMES (2)', value: 'Smart Home' },
  { label: 'WATERFRONT CONDOS (2)', value: 'Waterfront' },
  { label: 'COMMERCIAL & TOWNSHIPS (2)', value: 'Commercial' },
] as const;

type CameraPreset = 'isometric' | 'birdsEye' | 'streetLevel' | 'nightMode';

export function PlaygroundFieldSection({
  horizontalInset = 18,
  isDesktop = false,
}: {
  horizontalInset?: number;
  isDesktop?: boolean;
}) {
  const { width } = useWindowDimensions();
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('isometric');
  const [activeCategory, setActiveCategory] = useState<string>('All Stalls');
  const [focusedStall, setFocusedStall] = useState<RealEstateStall | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<{ title: string; detail: string } | null>(null);
  const [isFieldFullScreen, setIsFieldFullScreen] = useState(false);
  const [inStallDrawerOpen, setInStallDrawerOpen] = useState(false);
  const [activeProjectTab, setActiveProjectTab] = useState<number>(0);
  const [claimedOffer, setClaimedOffer] = useState<string | null>(null);
  const [meetingBooked, setMeetingBooked] = useState(false);
  const [liveStoreVersion, setLiveStoreVersion] = useState(0);

  // Subscribe to real-time vendor stall edits
  useEffect(() => {
    return stallStore.subscribe(() => {
      setLiveStoreVersion((v) => v + 1);
    });
  }, []);

  // Merge static stalls with real-time vendor modifications from JWT dashboard
  const liveStalls: RealEstateStall[] = useMemo(() => {
    return REAL_ESTATE_STALLS.map((baseStall) => {
      const live = stallStore.getStall(baseStall.id);
      if (!live) return baseStall;

      const dynamicProjects =
        live.landmarkProjects && live.landmarkProjects.length > 0
          ? live.landmarkProjects.map((p, idx) => ({
              title: p.name,
              type: p.bedBath || 'Luxury Residence',
              location: p.location,
              priceRange: p.priceRange,
              sizeRange: p.sizeArea,
              status: (p.status === 'Upcoming' ? 'Pre-Launch' : p.status) as any,
              highlights: p.amenities || [],
              isFeatured: idx === 0,
              floorPlan: {
                beds: parseInt(p.bedBath?.match(/(\d+)\s*Bed/i)?.[1] || '3', 10),
                baths: parseInt(p.bedBath?.match(/(\d+)\s*Bath/i)?.[1] || '3', 10),
                sqft: parseInt(p.sizeArea?.replace(/[^0-9]/g, '') || '2400', 10),
                facing: p.orientation || 'South Facing',
              },
            }))
          : baseStall.projects;

      return {
        ...baseStall,
        name: live.name || baseStall.name,
        tagline: live.tagline || baseStall.tagline,
        plot: live.location || baseStall.plot,
        fairOffer: live.offer || baseStall.fairOffer,
        offerExpires: live.offerValidity || baseStall.offerExpires,
        description: live.description || baseStall.description,
        rating: parseFloat(live.rating) || baseStall.rating,
        reviews: parseInt(live.reviews, 10) || baseStall.reviews,
        accentColor: live.accentColor || baseStall.accentColor,
        agent: {
          ...baseStall.agent,
          name: live.agent?.name || baseStall.agent.name,
          title: live.agent?.title || baseStall.agent.title,
          phone: live.agent?.phone || baseStall.agent.phone,
        },
        projects: dynamicProjects,
      };
    });
  }, [liveStoreVersion]);

  // Balloon shooting score in activity modal
  const [gameScore, setGameScore] = useState(0);

  // Filtered stalls
  const filteredStalls = useMemo(() => {
    if (activeCategory === 'All Stalls') return liveStalls;
    return liveStalls.filter((s) => s.category === activeCategory);
  }, [activeCategory, liveStalls]);

  // Keep focusedStall up to date with live edits
  useEffect(() => {
    if (focusedStall) {
      const updated = liveStalls.find((s) => s.id === focusedStall.id);
      if (updated) {
        setFocusedStall(updated);
      }
    }
  }, [liveStalls]);

  const handleSelectStall = (stall: RealEstateStall) => {
    const liveTarget = liveStalls.find((s) => s.id === stall.id) || stall;
    setFocusedStall(liveTarget);
    setActiveProjectTab(0);
    setClaimedOffer(null);
    setMeetingBooked(false);
    setInStallDrawerOpen(true);
  };

  const handleSelectActivity = (activityName: string, detail: string) => {
    setSelectedActivity({ title: activityName, detail });
    setGameScore(0);
  };

  const handleNextStall = () => {
    if (!focusedStall) return;
    const currentIndex = liveStalls.findIndex((s) => s.id === focusedStall.id);
    const nextIndex = (currentIndex + 1) % liveStalls.length;
    setFocusedStall(liveStalls[nextIndex]);
    setActiveProjectTab(0);
    setClaimedOffer(null);
    setMeetingBooked(false);
  };

  const handlePrevStall = () => {
    if (!focusedStall) return;
    const currentIndex = liveStalls.findIndex((s) => s.id === focusedStall.id);
    const prevIndex = (currentIndex - 1 + liveStalls.length) % liveStalls.length;
    setFocusedStall(liveStalls[prevIndex]);
    setActiveProjectTab(0);
    setClaimedOffer(null);
    setMeetingBooked(false);
  };

  const handleClaimOffer = (stall: RealEstateStall) => {
    const code = `EXPO-${stall.code}-${Math.floor(1000 + Math.random() * 9000)}`;
    setClaimedOffer(code);
    Alert.alert(
      'Expo Privilege Claimed',
      `Pass Code: ${code}\n\nPresent this code at ${stall.name} (${stall.plot}) to redeem: ${stall.fairOffer}`,
    );
  };

  const handleBookAppointment = (stall: RealEstateStall) => {
    setMeetingBooked(true);
    Alert.alert(
      'VIP Appointment Confirmed',
      `You are scheduled to meet ${stall.agent.name} (${stall.agent.title}) at ${stall.name} (${stall.plot}). A confirmation message has been dispatched.`,
    );
  };

  const playgroundHeight = isDesktop ? 620 : Math.max(450, width * 0.98);

  return (
    <View style={[styles.container, { paddingHorizontal: horizontalInset }]}>
      {/* Ambient Lighting */}
      <View style={styles.ambient3DAura} />

      {/* Header Row */}
      <View style={styles.headerRow}>
        <View style={{ flex: 1 }}>
          <View style={styles.badgePill}>
            <View style={styles.pulseLiveDot} />
            <Text style={styles.badgePillText}>FESTIVAL 3D FAIRGROUND ARENA</Text>
            <View style={styles.badge3DTag}>
              <Text style={styles.badge3DTagText}>R3F INTERACTIVE</Text>
            </View>
          </View>
          <Text style={styles.title}>Festival Fairground &amp; Pavilions</Text>
          <Text style={styles.subtitle}>
            Experience the vibrant mela field! Spin the 3D Nagordola Ferris wheel, pop balloons, taste street food, and
            tap any developer pavilion for full-screen architectural tours.
          </Text>
        </View>

        {/* Professional Camera Perspective Switcher */}
        <View style={styles.cameraControlsWrap}>
          <Text style={styles.cameraLabel}>CAMERA PERSPECTIVE</Text>
          <View style={styles.cameraBtnGroup}>
            <Pressable
              onPress={() => setCameraPreset('isometric')}
              style={[styles.camBtn, cameraPreset === 'isometric' && styles.camBtnActive]}
            >
              <Text style={[styles.camBtnText, cameraPreset === 'isometric' && styles.camBtnTextActive]}>
                ISOMETRIC 3D
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setCameraPreset('nightMode')}
              style={[styles.camBtn, cameraPreset === 'nightMode' && styles.camBtnActive]}
            >
              <Text style={[styles.camBtnText, cameraPreset === 'nightMode' && styles.camBtnTextActive]}>
                NIGHT FAIR
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setCameraPreset('streetLevel')}
              style={[styles.camBtn, cameraPreset === 'streetLevel' && styles.camBtnActive]}
            >
              <Text style={[styles.camBtnText, cameraPreset === 'streetLevel' && styles.camBtnTextActive]}>
                STREET LEVEL
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setCameraPreset('birdsEye')}
              style={[styles.camBtn, cameraPreset === 'birdsEye' && styles.camBtnActive]}
            >
              <Text style={[styles.camBtnText, cameraPreset === 'birdsEye' && styles.camBtnTextActive]}>
                AERIAL TOP
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Professional Category Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScroll}
      >
        {['All Stalls', 'Luxury', 'Eco Living', 'Waterfront', 'Smart Home'].map(
          (cat) => {
            const isSelected = activeCategory === cat;
            return (
              <Pressable
                key={cat}
                onPress={() => setActiveCategory(cat)}
                style={({ pressed }) => [
                  styles.categoryChip,
                  isSelected && styles.categoryChipSelected,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={[styles.categoryChipText, isSelected && styles.categoryChipTextSelected]}>
                  {cat}
                </Text>
              </Pressable>
            );
          },
        )}
      </ScrollView>

      {/* R3F 3D FAIRGROUND PLAYGROUND CARD */}
      <View style={[styles.field3DCard, { height: playgroundHeight }]}>
        <FairgroundScene3D
          stalls={liveStalls}
          activeCategory={activeCategory}
          selectedStallId={focusedStall?.id ?? null}
          onSelectStall={handleSelectStall}
          onSelectActivity={handleSelectActivity}
          cameraPreset={cameraPreset}
        />

        {/* 3D Festival Activities Ribbon */}
        <View style={styles.developerDockOverlay}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.developerDockScroll}
          >
            {/* Nagordola Ride Quick Trigger */}
            <Pressable
              onPress={() => handleSelectActivity('Nagordola Wheel', 'Traditional Ferris Wheel Ride with panoramic spinning view of the fairground.')}
              style={[styles.dockItemPill, { borderColor: '#FF1744' }]}
            >
              <Text style={{ fontSize: 13 }}>🎡</Text>
              <Text style={[styles.dockNameText, { color: '#FF8A80' }]}>Nagordola Ride</Text>
            </Pressable>

            {/* Balloon Shooting Quick Trigger */}
            <Pressable
              onPress={() => handleSelectActivity('Balloon Shooting Game', 'Pop colorful mela balloons to score points and unlock lucky coupons!')}
              style={[styles.dockItemPill, { borderColor: '#FF6D00' }]}
            >
              <Text style={{ fontSize: 13 }}>🎯</Text>
              <Text style={[styles.dockNameText, { color: '#FFB74D' }]}>Balloon Dart Game</Text>
            </Pressable>

            {/* Baul Stage Quick Trigger */}
            <Pressable
              onPress={() => handleSelectActivity('Baul Gaan & Folk Stage', 'Live acoustic folk concerts, ektara music, and festival cultural shows.')}
              style={[styles.dockItemPill, { borderColor: '#E040FB' }]}
            >
              <Text style={{ fontSize: 13 }}>🪘</Text>
              <Text style={[styles.dockNameText, { color: '#EA80FC' }]}>Live Baul Stage</Text>
            </Pressable>

            {/* Fuchka Hub */}
            <Pressable
              onPress={() => handleSelectActivity('Dhaka Fuchka & Chotpoti Hub', 'Crispy fuchka with tangy tamarind tok and spiced chotpoti.')}
              style={[styles.dockItemPill, { borderColor: '#00E676' }]}
            >
              <Text style={{ fontSize: 13 }}>🍲</Text>
              <Text style={[styles.dockNameText, { color: '#B9F6CA' }]}>Fuchka &amp; Chotpoti</Text>
            </Pressable>

            {/* Developer Stalls */}
            {filteredStalls.map((stall) => (
              <Pressable
                key={stall.id}
                onPress={() => handleSelectStall(stall)}
                style={({ pressed }) => [
                  styles.dockItemPill,
                  pressed && styles.pressed,
                ]}
              >
                <View style={[styles.dockCodeBadge, { backgroundColor: stall.accentColor }]}>
                  <Text style={styles.dockCodeBadgeText}>{stall.code}</Text>
                </View>
                <Text style={styles.dockNameText}>{stall.name}</Text>
                <View style={styles.dockStatusDot} />
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Floating 3D HUD Bar */}
        <View style={styles.hudBar3D}>
          <View style={styles.hudBadge3D}>
            <View style={styles.hudGreenSignal} />
            <Text style={styles.hudBadgeText}>
              Interactive Mela Field · Tap Nagordola, Games &amp; Booths
            </Text>
          </View>

          <Pressable
            onPress={() => setIsFieldFullScreen(true)}
            style={styles.hudFullScreenBtn}
          >
            <Text style={styles.hudFullScreenBtnText}>ENTER 3D FIELD FULL SCREEN ⛶</Text>
          </Pressable>
        </View>
      </View>

      {/* FULL-SCREEN 3D PLAYGROUND FIELD MODAL */}
      <Modal
        visible={isFieldFullScreen}
        animationType="fade"
        presentationStyle="fullScreen"
        onRequestClose={() => setIsFieldFullScreen(false)}
      >
        <View style={styles.fullScreenFieldContainer}>
          <View style={styles.fullScreenSceneWrap}>
            <FairgroundScene3D
              stalls={liveStalls}
              activeCategory={activeCategory}
              selectedStallId={focusedStall?.id ?? null}
              onSelectStall={handleSelectStall}
              onSelectActivity={handleSelectActivity}
              cameraPreset={cameraPreset}
            />
          </View>

          {/* Floating Glass Top Bar */}
          <LinearGradient
            colors={['rgba(10, 26, 34, 0.95)', 'rgba(8, 20, 26, 0.8)']}
            style={styles.fsFieldTopBar}
          >
            <View style={styles.fsFieldBrandGroup}>
              <View style={styles.fsFieldLiveSignal}>
                <View style={styles.fsLiveDotSmall} />
                <Text style={styles.fsFieldLiveText}>FULL-SCREEN 3D FESTIVAL FIELD</Text>
              </View>
              <Text style={styles.fsFieldTitle}>Interactive Mela &amp; Expo Ground</Text>
            </View>

            <View style={styles.fsFieldCameraGroup}>
              <Pressable
                onPress={() => setCameraPreset('isometric')}
                style={[styles.fsCamPill, cameraPreset === 'isometric' && styles.fsCamPillActive]}
              >
                <Text style={[styles.fsCamPillText, cameraPreset === 'isometric' && styles.fsCamPillTextActive]}>
                  ISOMETRIC 3D
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setCameraPreset('nightMode')}
                style={[styles.fsCamPill, cameraPreset === 'nightMode' && styles.fsCamPillActive]}
              >
                <Text style={[styles.fsCamPillText, cameraPreset === 'nightMode' && styles.fsCamPillTextActive]}>
                  NIGHT FAIR
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setCameraPreset('streetLevel')}
                style={[styles.fsCamPill, cameraPreset === 'streetLevel' && styles.fsCamPillActive]}
              >
                <Text style={[styles.fsCamPillText, cameraPreset === 'streetLevel' && styles.fsCamPillTextActive]}>
                  STREET LEVEL
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setCameraPreset('birdsEye')}
                style={[styles.fsCamPill, cameraPreset === 'birdsEye' && styles.fsCamPillActive]}
              >
                <Text style={[styles.fsCamPillText, cameraPreset === 'birdsEye' && styles.fsCamPillTextActive]}>
                  AERIAL TOP
                </Text>
              </Pressable>
            </View>

            <Pressable
              onPress={() => setIsFieldFullScreen(false)}
              style={styles.fsFieldExitBtn}
            >
              <Text style={styles.fsFieldExitBtnText}>✕ EXIT FULL SCREEN</Text>
            </Pressable>
          </LinearGradient>

          {/* Floating Category Pills Strip on Full-Screen Field */}
          <View style={styles.fsFieldCategoriesWrap}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.fsFieldCategoriesScroll}
            >
              <Pressable
                onPress={() => handleSelectActivity('Nagordola Wheel', 'Traditional Ferris Wheel Ride with panoramic spinning view of the fairground.')}
                style={[styles.fsCategoryChip, { backgroundColor: '#FF1744', borderColor: '#FFE082' }]}
              >
                <Text style={[styles.fsCategoryChipText, { color: '#FFFFFF', fontWeight: '900' }]}>
                  🎡 RIDE NAGORDOLA
                </Text>
              </Pressable>
              <Pressable
                onPress={() => handleSelectActivity('Balloon Shooting Game', 'Pop colorful mela balloons to score points and unlock lucky coupons!')}
                style={[styles.fsCategoryChip, { backgroundColor: '#FF6D00', borderColor: '#FFE082' }]}
              >
                <Text style={[styles.fsCategoryChipText, { color: '#FFFFFF', fontWeight: '900' }]}>
                  🎯 BALLOON SHOOTING
                </Text>
              </Pressable>
              <Pressable
                onPress={() => handleSelectActivity('Baul Gaan & Folk Stage', 'Live acoustic folk concerts, ektara music, and festival cultural shows.')}
                style={[styles.fsCategoryChip, { backgroundColor: '#B71C1C', borderColor: '#FFE082' }]}
              >
                <Text style={[styles.fsCategoryChipText, { color: '#FFFFFF', fontWeight: '900' }]}>
                  🪘 BAUL FOLK STAGE
                </Text>
              </Pressable>
            </ScrollView>
          </View>

          {/* Floating Bottom Developer Dock on Full-Screen Field */}
          <View style={styles.fsFieldBottomDock}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.fsFieldDockScroll}
            >
              {filteredStalls.map((stall) => (
                <Pressable
                  key={stall.id}
                  onPress={() => handleSelectStall(stall)}
                  style={styles.fsDockPill}
                >
                  <View style={[styles.dockCodeBadge, { backgroundColor: stall.accentColor }]}>
                    <Text style={styles.dockCodeBadgeText}>{stall.code}</Text>
                  </View>
                  <Text style={styles.fsDockName}>{stall.name}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* FESTIVAL ACTIVITY INTERACTIVE MODAL (NAGORDOLA, GAMES, FOOD, LIVE STAGE) */}
      <Modal
        visible={selectedActivity !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedActivity(null)}
      >
        {selectedActivity && (
          <View style={styles.modalBackdrop}>
            <View style={[styles.activityModalCard, isDesktop && styles.activityModalDesktop]}>
              <LinearGradient
                colors={['#1F3A48', '#0D1E26']}
                style={styles.activityModalHeader}
              >
                <View style={styles.activityHeaderRow}>
                  <View style={styles.activityTagBadge}>
                    <Text style={styles.activityTagBadgeText}>MELA FESTIVAL ATTRACTION</Text>
                  </View>
                  <Pressable
                    onPress={() => setSelectedActivity(null)}
                    style={styles.activityCloseBtn}
                  >
                    <Text style={styles.activityCloseBtnText}>✕ Close</Text>
                  </Pressable>
                </View>

                <Text style={styles.activityTitle}>{selectedActivity.title}</Text>
                <Text style={styles.activityDetail}>{selectedActivity.detail}</Text>
              </LinearGradient>

              {/* Specific Mini-Game / Feature Content */}
              <View style={styles.activityBody}>
                {selectedActivity.title.includes('Nagordola') && (
                  <View style={styles.nagordolaCard}>
                    <Text style={{ fontSize: 44, textAlign: 'center', marginBottom: 8 }}>🎡</Text>
                    <Text style={styles.nagordolaHeader}>Nagordola Wheel Spinning at Full Speed!</Text>
                    <Text style={styles.nagordolaSub}>
                      Experience traditional Bangladeshi fair carnival joy. Look around to catch sweeping views of the
                      festive park and high-rise developer pavilions!
                    </Text>
                    <Pressable
                      onPress={() => {
                        Alert.alert('🎡 Nagordola Speed Boost', 'Spun the Nagordola wheel! Enjoy your high-altitude fair ride.');
                        setSelectedActivity(null);
                      }}
                      style={styles.nagordolaActionBtn}
                    >
                      <Text style={styles.nagordolaActionBtnText}>⚡ Boost Spin Speed</Text>
                    </Pressable>
                  </View>
                )}

                {selectedActivity.title.includes('Balloon') && (
                  <View style={styles.gameCard}>
                    <Text style={styles.gameScoreText}>Balloons Popped: {gameScore} / 9</Text>
                    <View style={styles.balloonGrid}>
                      {Array.from({ length: 9 }).map((_, i) => (
                        <Pressable
                          key={i}
                          onPress={() => setGameScore((prev) => prev + 1)}
                          style={[
                            styles.balloonTarget,
                            i < gameScore && styles.balloonTargetPopped,
                          ]}
                        >
                          <Text style={{ fontSize: 24 }}>{i < gameScore ? '💥' : '🎈'}</Text>
                        </Pressable>
                      ))}
                    </View>
                    <Text style={styles.gameHint}>Tap any balloon to shoot and pop!</Text>
                  </View>
                )}

                {selectedActivity.title.includes('Baul') && (
                  <View style={styles.baulCard}>
                    <Text style={{ fontSize: 36, textAlign: 'center', marginBottom: 6 }}>🪘 ♬</Text>
                    <Text style={styles.baulScheduleTitle}>Tonight’s Live Performances:</Text>
                    <Text style={styles.baulItem}>• 6:00 PM: Lalon Geeti by Baul Shofi Mondol</Text>
                    <Text style={styles.baulItem}>• 7:30 PM: Traditional Dhol &amp; Flute Fusion Ensemble</Text>
                    <Text style={styles.baulItem}>• 9:00 PM: Celebrity Mela Musical Extravaganza</Text>
                  </View>
                )}

                {selectedActivity.title.includes('Fuchka') && (
                  <View style={styles.foodCard}>
                    <Text style={{ fontSize: 36, textAlign: 'center', marginBottom: 6 }}>🍲 🌶️</Text>
                    <Text style={styles.foodHeading}>Dhaka Special Crunchy Fuchka &amp; Chotpoti</Text>
                    <Text style={styles.foodDesc}>
                      Crispy puris filled with spicy mashed yellow peas, boiled eggs, fresh coriander, green chilies, and
                      tangy sweet-sour tamarind water.
                    </Text>
                  </View>
                )}

                <Pressable
                  onPress={() => setSelectedActivity(null)}
                  style={styles.activityDoneBtn}
                >
                  <Text style={styles.activityDoneBtnText}>Return to 3D Field</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      </Modal>

      {/* IN-STALL FIELD SPOTLIGHT & DETAILS MODAL */}
      <Modal
        visible={inStallDrawerOpen}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setInStallDrawerOpen(false)}
      >
        {focusedStall && (
          <View style={styles.stallModalContainer}>
            <View style={styles.stallModalHeader}>
              <View style={styles.smNavRow}>
                <View style={styles.smLocationBadge}>
                  <View style={styles.smGreenOrb} />
                  <Text style={styles.smLocationText}>{focusedStall.plot.toUpperCase()}</Text>
                </View>

                <Pressable
                  onPress={() => setInStallDrawerOpen(false)}
                  style={styles.smCloseBtn}
                >
                  <Text style={styles.smCloseBtnText}>✕ Return to 3D Field</Text>
                </Pressable>
              </View>

              <View style={styles.smProfileRow}>
                <View style={[styles.smEmblemCube, { backgroundColor: focusedStall.accentColor }]}>
                  <Text style={styles.smEmblemCode}>{focusedStall.code}</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 14 }}>
                  <View style={styles.smBadgeRow}>
                    <Text style={[styles.smBadgeText, { color: focusedStall.accentColor }]}>
                      {focusedStall.badge}
                    </Text>
                    <Text style={styles.smRatingText}>
                      ★ {focusedStall.rating} ({focusedStall.reviews} reviews)
                    </Text>
                  </View>
                  <Text style={styles.smTitle}>{focusedStall.name}</Text>
                  <Text style={styles.smTagline}>{focusedStall.tagline}</Text>
                </View>
              </View>

              <View style={styles.smWalkBar}>
                <Pressable onPress={handlePrevStall} style={styles.smWalkBtn}>
                  <Text style={styles.smWalkBtnText}>← PREV PAVILION</Text>
                </Pressable>
                <View style={styles.smBoothType}>
                  <Text style={styles.smBoothTypeText}>{focusedStall.boothType.toUpperCase()}</Text>
                </View>
                <Pressable onPress={handleNextStall} style={styles.smWalkBtn}>
                  <Text style={styles.smWalkBtnText}>NEXT PAVILION →</Text>
                </Pressable>
              </View>
            </View>

            <ScrollView style={styles.smScrollBody}>
              <View style={styles.smPrivilegeCard}>
                <LinearGradient
                  colors={['#FFF8E6', '#FDEEC9']}
                  style={styles.smPrivilegeGrad}
                >
                  <Text style={styles.smPrivilegeHeading}>EXPO SPOT PRIVILEGE</Text>
                  <Text style={styles.smPrivilegeOffer}>{focusedStall.fairOffer}</Text>
                  <Text style={styles.smPrivilegeValidity}>Validity: {focusedStall.offerExpires}</Text>

                  <Pressable
                    onPress={() => handleClaimOffer(focusedStall)}
                    style={styles.smClaimBtn}
                  >
                    <Text style={styles.smClaimBtnText}>
                      {claimedOffer ? `PASS CODE: ${claimedOffer}` : 'CLAIM EXCLUSIVE PASS CODE'}
                    </Text>
                  </Pressable>
                </LinearGradient>
              </View>

              {/* LANDMARK PROJECTS SHOWCASE */}
              <View style={styles.smSectionBox}>
                <View style={styles.smProjHeaderRow}>
                  <Text style={styles.smSectionTitle}>
                    Landmark Projects ({focusedStall.projects.length})
                  </Text>
                  <Text style={styles.smSectionSub}>
                    Select a project to explore floor specifications & features
                  </Text>
                </View>

                {/* Horizontal Project Selector Pills */}
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.smProjTabsScroll}
                  style={styles.smProjTabsScrollWrap}
                >
                  {focusedStall.projects.map((proj, idx) => {
                    const isActive = activeProjectTab === idx;
                    return (
                      <Pressable
                        key={idx}
                        onPress={() => setActiveProjectTab(idx)}
                        style={[
                          styles.smProjPill,
                          isActive && styles.smProjPillActive,
                        ]}
                      >
                        <View
                          style={[
                            styles.smProjStatusDot,
                            {
                              backgroundColor:
                                proj.status === 'Ready'
                                  ? '#2E7D32'
                                  : proj.status === 'Under Construction'
                                  ? '#E65100'
                                  : '#0288D1',
                            },
                          ]}
                        />
                        <Text
                          style={[
                            styles.smProjPillText,
                            isActive && styles.smProjPillTextActive,
                          ]}
                        >
                          {proj.title}
                        </Text>
                      </Pressable>
                    );
                  })}
                </ScrollView>

                {/* Detailed Selected Project Card */}
                {focusedStall.projects[activeProjectTab] && (() => {
                  const currentProj = focusedStall.projects[activeProjectTab];
                  return (
                    <View style={styles.smProjCard}>
                      <View style={styles.smProjCardTopRow}>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.smProjCardTitle}>
                            {currentProj.title}
                          </Text>
                          <Text style={styles.smProjCardType}>
                            {currentProj.type}
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.smStatusBadge,
                            {
                              backgroundColor:
                                currentProj.status === 'Ready'
                                  ? '#E8F5E9'
                                  : currentProj.status === 'Under Construction'
                                  ? '#FFF3E0'
                                  : '#E1F5FE',
                              borderColor:
                                currentProj.status === 'Ready'
                                  ? '#A5D6A7'
                                  : currentProj.status === 'Under Construction'
                                  ? '#FFCC80'
                                  : '#81D4FA',
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.smStatusBadgeText,
                              {
                                color:
                                  currentProj.status === 'Ready'
                                    ? '#2E7D32'
                                    : currentProj.status === 'Under Construction'
                                    ? '#E65100'
                                    : '#0288D1',
                              },
                            ]}
                          >
                            {currentProj.status.toUpperCase()}
                          </Text>
                        </View>
                      </View>

                      <Text style={styles.smProjCardLoc}>
                        📍 {currentProj.location}
                      </Text>

                      {/* 4-Stat Specs Grid */}
                      <View style={styles.smSpecsGrid}>
                        <View style={styles.smSpecCol}>
                          <Text style={styles.smSpecLabel}>PRICE RANGE</Text>
                          <Text style={styles.smSpecVal}>
                            {currentProj.priceRange}
                          </Text>
                        </View>
                        <View style={styles.smSpecCol}>
                          <Text style={styles.smSpecLabel}>SIZE / AREA</Text>
                          <Text style={styles.smSpecVal}>
                            {currentProj.sizeRange}
                          </Text>
                        </View>
                        {currentProj.floorPlan.beds > 0 && (
                          <View style={styles.smSpecCol}>
                            <Text style={styles.smSpecLabel}>BED / BATH</Text>
                            <Text style={styles.smSpecVal}>
                              {currentProj.floorPlan.beds} Beds · {currentProj.floorPlan.baths} Baths
                            </Text>
                          </View>
                        )}
                        <View style={styles.smSpecCol}>
                          <Text style={styles.smSpecLabel}>ORIENTATION</Text>
                          <Text style={styles.smSpecVal}>
                            {currentProj.floorPlan.facing}
                          </Text>
                        </View>
                      </View>

                      {/* Key Highlights */}
                      {currentProj.highlights && currentProj.highlights.length > 0 && (
                        <View style={styles.smHighlightsWrap}>
                          <Text style={styles.smHighlightsHeading}>KEY HIGHLIGHTS & AMENITIES</Text>
                          <View style={styles.smHighlightsRow}>
                            {currentProj.highlights.map((hl, hIdx) => (
                              <View key={hIdx} style={styles.smHighlightTag}>
                                <Text style={styles.smHighlightTagText}>✦ {hl}</Text>
                              </View>
                            ))}
                          </View>
                        </View>
                      )}
                    </View>
                  );
                })()}

                {/* All Projects Quick Portfolio */}
                <Text style={styles.smAllProjectsHeading}>
                  PORTFOLIO PROJECTS ({focusedStall.projects.length})
                </Text>
                <View style={styles.smAllProjectsList}>
                  {focusedStall.projects.map((p, pIdx) => {
                    const isSelected = activeProjectTab === pIdx;
                    return (
                      <Pressable
                        key={pIdx}
                        onPress={() => setActiveProjectTab(pIdx)}
                        style={[
                          styles.smQuickProjCard,
                          isSelected && styles.smQuickProjCardSelected,
                        ]}
                      >
                        <View style={{ flex: 1 }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Text style={[styles.smQuickProjTitle, isSelected && styles.smQuickProjTitleSelected]}>
                              {p.title}
                            </Text>
                            {isSelected && (
                              <View style={styles.smActiveIndicator}>
                                <Text style={styles.smActiveIndicatorText}>VIEWING</Text>
                              </View>
                            )}
                          </View>
                          <Text style={styles.smQuickProjSub}>
                            📍 {p.location} · {p.sizeRange}
                          </Text>
                        </View>
                        <View style={{ alignItems: 'flex-end', marginLeft: 10 }}>
                          <Text style={styles.smQuickProjPrice}>{p.priceRange}</Text>
                          <Text
                            style={[
                              styles.smQuickProjStatus,
                              {
                                color:
                                  p.status === 'Ready'
                                    ? '#2E7D32'
                                    : p.status === 'Under Construction'
                                    ? '#E65100'
                                    : '#0288D1',
                              },
                            ]}
                          >
                            {p.status}
                          </Text>
                        </View>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              <View style={styles.smConsultantCard}>
                <View style={styles.smConsultantAvatar}>
                  <Text style={styles.smConsultantInitials}>
                    {focusedStall.agent.name.split(' ').map((n) => n[0]).join('')}
                  </Text>
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.smConsultantName}>{focusedStall.agent.name}</Text>
                  <Text style={styles.smConsultantTitle}>{focusedStall.agent.title}</Text>
                  <Text style={styles.smConsultantPhone}>Direct: {focusedStall.agent.phone}</Text>
                </View>
              </View>

              <View style={styles.smActionsStack}>
                <Pressable
                  onPress={() => handleBookAppointment(focusedStall)}
                  style={[styles.smPrimaryBtn, meetingBooked && styles.smBtnSuccess]}
                >
                  <Text style={styles.smPrimaryBtnText}>
                    {meetingBooked ? '✓ VIP MEETING SCHEDULED' : 'RESERVE IN-BOOTH VIP MEETING'}
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => {
                    Alert.alert(
                      'Brochure Dispatched',
                      `Floor plans and project specs for ${focusedStall.name} have been emailed to you.`,
                    );
                  }}
                  style={styles.smSecondaryBtn}
                >
                  <Text style={styles.smSecondaryBtnText}>DOWNLOAD PROJECT BROCHURES & SPECS (PDF)</Text>
                </Pressable>
              </View>

              <View style={{ height: 40 }} />
            </ScrollView>
          </View>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 1680,
    alignSelf: 'center',
    marginVertical: 24,
    position: 'relative',
  },
  ambient3DAura: {
    position: 'absolute',
    top: 30,
    left: '10%',
    width: '80%',
    height: 220,
    borderRadius: 120,
    backgroundColor: 'rgba(212, 175, 55, 0.08)',
    transform: [{ scaleX: 1.5 }],
  },
  headerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 16,
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#172D38',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginBottom: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  pulseLiveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#00E676',
  },
  badgePillText: {
    color: '#B0D0DC',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  badge3DTag: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  badge3DTagText: {
    color: '#FFE082',
    fontSize: 10,
    fontWeight: '900',
  },
  title: {
    color: COLORS.ink,
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 14,
    lineHeight: 20,
    maxWidth: 640,
  },
  cameraControlsWrap: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  cameraLabel: {
    color: COLORS.muted,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  cameraBtnGroup: {
    flexDirection: 'row',
    backgroundColor: '#0E242E',
    padding: 3,
    borderRadius: 12,
    gap: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  camBtn: {
    paddingVertical: 6,
    paddingHorizontal: 11,
    borderRadius: 8,
  },
  camBtnActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  camBtnText: {
    color: '#90A4AE',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  camBtnTextActive: {
    color: '#0D212B',
    fontWeight: '900',
  },
  categoryScroll: {
    paddingVertical: 4,
    gap: 8,
    marginBottom: 16,
  },
  categoryChip: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6E0D4',
  },
  categoryChipSelected: {
    backgroundColor: COLORS.navy,
    borderColor: COLORS.navy,
  },
  categoryChipText: {
    color: '#4B585E',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  categoryChipTextSelected: {
    color: '#FFFFFF',
  },
  field3DCard: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#1F4756',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.35,
    shadowRadius: 22,
    elevation: 10,
    position: 'relative',
    backgroundColor: '#0C1C24',
  },
  developerDockOverlay: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    zIndex: 40,
    pointerEvents: 'box-none',
  },
  developerDockScroll: {
    gap: 8,
  },
  dockItemPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(10, 26, 33, 0.92)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  dockCodeBadge: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 6,
  },
  dockCodeBadgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '900',
  },
  dockNameText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  dockStatusDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#00E676',
  },
  hudBar3D: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 50,
    pointerEvents: 'box-none',
  },
  hudBadge3D: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(10, 26, 33, 0.94)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    gap: 8,
  },
  hudGreenSignal: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00E676',
  },
  hudBadgeText: {
    color: '#E0F2F1',
    fontSize: 11,
    fontWeight: '700',
  },
  hudFullScreenBtn: {
    backgroundColor: COLORS.coral,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    shadowColor: COLORS.coral,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  hudFullScreenBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },

  // FULL-SCREEN FIELD STYLES
  fullScreenFieldContainer: {
    flex: 1,
    backgroundColor: '#07161E',
    position: 'relative',
  },
  fullScreenSceneWrap: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  fsFieldTopBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 16,
    paddingBottom: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 60,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  fsFieldBrandGroup: {
    justifyContent: 'center',
  },
  fsFieldLiveSignal: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 2,
  },
  fsLiveDotSmall: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00E676',
  },
  fsFieldLiveText: {
    color: '#80CBC4',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  fsFieldTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  fsFieldCameraGroup: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 3,
    borderRadius: 10,
    gap: 4,
  },
  fsCamPill: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 7,
  },
  fsCamPillActive: {
    backgroundColor: '#FFFFFF',
  },
  fsCamPillText: {
    color: '#90A4AE',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  fsCamPillTextActive: {
    color: '#0A1B22',
    fontWeight: '900',
  },
  fsFieldExitBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  fsFieldExitBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  fsFieldCategoriesWrap: {
    position: 'absolute',
    top: 74,
    left: 20,
    right: 20,
    zIndex: 55,
    pointerEvents: 'box-none',
  },
  fsFieldCategoriesScroll: {
    gap: 8,
  },
  fsCategoryChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(10, 26, 33, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  fsCategoryChipSelected: {
    backgroundColor: '#FFE082',
    borderColor: '#FFE082',
  },
  fsCategoryChipText: {
    color: '#B0BEC5',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  fsCategoryChipTextSelected: {
    color: '#0C1C24',
  },
  fsFieldBottomDock: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 55,
    pointerEvents: 'box-none',
  },
  fsFieldDockScroll: {
    gap: 8,
  },
  fsDockPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(10, 26, 33, 0.92)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    gap: 6,
  },
  fsDockName: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },

  // ACTIVITY MODAL STYLES
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(23, 36, 42, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  activityModalCard: {
    width: '100%',
    maxWidth: 540,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.line,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  activityModalDesktop: {
    maxWidth: 580,
  },
  activityModalHeader: {
    padding: 18,
    backgroundColor: '#FAF7F2',
    borderBottomWidth: 1,
    borderColor: COLORS.line,
  },
  activityHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityTagBadge: {
    backgroundColor: '#FFF3D8',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FFE082',
  },
  activityTagBadgeText: {
    color: '#A66B00',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  activityCloseBtn: {
    backgroundColor: COLORS.ink,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  activityCloseBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  activityTitle: {
    color: COLORS.ink,
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 4,
  },
  activityDetail: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 18,
  },
  activityBody: {
    padding: 20,
    backgroundColor: COLORS.paper,
  },
  nagordolaCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  nagordolaHeader: {
    color: COLORS.ink,
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 4,
    textAlign: 'center',
  },
  nagordolaSub: {
    color: COLORS.muted,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 14,
    lineHeight: 16,
  },
  nagordolaActionBtn: {
    backgroundColor: COLORS.coral,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  nagordolaActionBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  gameCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  gameScoreText: {
    color: '#2E7D32',
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 12,
  },
  balloonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    width: 220,
    marginBottom: 12,
  },
  balloonTarget: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#F8F5EF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  balloonTargetPopped: {
    backgroundColor: 'rgba(46, 125, 50, 0.15)',
    borderColor: '#2E7D32',
  },
  gameHint: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: '700',
  },
  baulCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  baulScheduleTitle: {
    color: COLORS.ink,
    fontSize: 14,
    fontWeight: '900',
    marginBottom: 8,
  },
  baulItem: {
    color: COLORS.ink,
    fontSize: 12,
    lineHeight: 20,
    fontWeight: '600',
  },
  foodCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  foodHeading: {
    color: COLORS.ink,
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 6,
    textAlign: 'center',
  },
  foodDesc: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
  },
  activityDoneBtn: {
    backgroundColor: COLORS.ink,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  activityDoneBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },

  // STALL DETAILS DRAWER MODAL STYLES
  stallModalContainer: {
    flex: 1,
    backgroundColor: COLORS.paper,
  },
  stallModalHeader: {
    width: '100%',
    maxWidth: 1680,
    alignSelf: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: COLORS.line,
  },
  smNavRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  smLocationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C8E6C9',
    gap: 5,
  },
  smGreenOrb: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2E7D32',
  },
  smLocationText: {
    color: '#1B5E20',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  smCloseBtn: {
    backgroundColor: COLORS.ink,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
  },
  smCloseBtnText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  smProfileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  smEmblemCube: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smEmblemCode: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
  },
  smBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  smBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  smRatingText: {
    color: '#B27B00',
    fontSize: 10,
    fontWeight: '700',
  },
  smTitle: {
    color: COLORS.ink,
    fontSize: 18,
    fontWeight: '900',
  },
  smTagline: {
    color: COLORS.muted,
    fontSize: 11,
  },
  smWalkBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: COLORS.line,
  },
  smWalkBtn: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: '#F8F5EF',
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 6,
  },
  smWalkBtnText: {
    color: COLORS.ink,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  smBoothType: {
    backgroundColor: '#FFF3D8',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FFE082',
  },
  smBoothTypeText: {
    color: '#A66B00',
    fontSize: 8,
    fontWeight: '900',
  },
  smScrollBody: {
    width: '100%',
    maxWidth: 1680,
    alignSelf: 'center',
    padding: 16,
    backgroundColor: COLORS.paper,
  },
  smPrivilegeCard: {
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E8C568',
    marginBottom: 16,
  },
  smPrivilegeGrad: {
    padding: 14,
  },
  smPrivilegeHeading: {
    color: '#9C6800',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  smPrivilegeOffer: {
    color: COLORS.ink,
    fontSize: 13,
    fontWeight: '800',
  },
  smPrivilegeValidity: {
    color: COLORS.coralDark,
    fontSize: 9,
    marginTop: 2,
    marginBottom: 10,
  },
  smClaimBtn: {
    backgroundColor: COLORS.gold,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  smClaimBtnText: {
    color: COLORS.ink,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  smSectionBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.line,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  smProjHeaderRow: {
    marginBottom: 12,
  },
  smSectionTitle: {
    color: COLORS.ink,
    fontSize: 14,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  smSectionSub: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 2,
  },
  smProjTabsScrollWrap: {
    marginBottom: 14,
  },
  smProjTabsScroll: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 2,
  },
  smProjPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F1EBE1',
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  smProjPillActive: {
    backgroundColor: COLORS.ink,
    borderColor: COLORS.ink,
  },
  smProjStatusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    marginRight: 6,
  },
  smProjPillText: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: '800',
  },
  smProjPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
  smProjCard: {
    backgroundColor: '#F8F5EF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.line,
    marginBottom: 14,
  },
  smProjCardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  smProjCardTitle: {
    color: COLORS.ink,
    fontSize: 16,
    fontWeight: '900',
  },
  smProjCardType: {
    color: COLORS.coralDark,
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
  smStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  smStatusBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  smProjCardLoc: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 4,
    marginBottom: 12,
  },
  smSpecsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.line,
    marginBottom: 12,
  },
  smSpecCol: {
    flex: 1,
    minWidth: 120,
  },
  smSpecLabel: {
    color: COLORS.muted,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  smSpecVal: {
    color: COLORS.ink,
    fontSize: 12,
    fontWeight: '900',
    marginTop: 2,
  },
  smHighlightsWrap: {
    marginTop: 4,
  },
  smHighlightsHeading: {
    color: COLORS.muted,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  smHighlightsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  smHighlightTag: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  smHighlightTagText: {
    color: COLORS.ink,
    fontSize: 10,
    fontWeight: '700',
  },
  smAllProjectsHeading: {
    color: COLORS.ink,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.6,
    marginTop: 6,
    marginBottom: 10,
  },
  smAllProjectsList: {
    gap: 8,
  },
  smQuickProjCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F5EF',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  smQuickProjCardSelected: {
    backgroundColor: '#FFFDF9',
    borderColor: COLORS.coral,
    borderWidth: 1.5,
  },
  smQuickProjTitle: {
    color: COLORS.ink,
    fontSize: 12,
    fontWeight: '900',
  },
  smQuickProjTitleSelected: {
    color: COLORS.coralDark,
  },
  smActiveIndicator: {
    backgroundColor: COLORS.coral,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  smActiveIndicatorText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '900',
  },
  smQuickProjSub: {
    color: COLORS.muted,
    fontSize: 10,
    marginTop: 3,
  },
  smQuickProjPrice: {
    color: COLORS.ink,
    fontSize: 11,
    fontWeight: '900',
  },
  smQuickProjStatus: {
    fontSize: 9,
    fontWeight: '800',
    marginTop: 2,
  },
  smConsultantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.line,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  smConsultantAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.sage,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smConsultantInitials: {
    color: COLORS.ink,
    fontSize: 14,
    fontWeight: '900',
  },
  smConsultantName: {
    color: COLORS.ink,
    fontSize: 13,
    fontWeight: '800',
  },
  smConsultantTitle: {
    color: COLORS.muted,
    fontSize: 10,
  },
  smConsultantPhone: {
    color: COLORS.coralDark,
    fontSize: 9,
    fontWeight: '700',
  },
  smActionsStack: {
    gap: 8,
  },
  smPrimaryBtn: {
    backgroundColor: COLORS.coral,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  smBtnSuccess: {
    backgroundColor: '#2E7D32',
  },
  smPrimaryBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  smSecondaryBtn: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.ink,
  },
  smSecondaryBtnText: {
    color: COLORS.ink,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
});
