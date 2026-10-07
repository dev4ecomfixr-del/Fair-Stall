import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Easing,
  Image,
  ImageBackground,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { Glyph } from '../../components/presentation/textRN';
import type { GlyphName } from '../../components/presentation/textRN';
import { PlaygroundFieldSection, REAL_ESTATE_STALLS } from '../../components/presentation/PlaygroundFieldSection';
import { AppFooter } from '../../components/presentation/AppFooter';
import { VendorPortalModal } from '../../components/presentation/VendorDashboard';
import { FaqModal, FaqSection } from '../../components/presentation/FaqModal';
import {
  StallVisualBanner1,
  StallFlightImageCarousel,
  StallVisualBanner2,
} from '../../components/presentation/StallVisualSections';
import { StickyStackingSection } from '../../components/presentation/StickyStackingSection';
import { AllPavilionsModal } from '../../components/presentation/AllPavilionsModal';
import { COLORS } from '../../constants/Colors';

const SITE_MAX_WIDTH = 1680;

function getSiteInset(width: number) {
  if (width >= 1600) return 36;
  if (width >= 1024) return 28;
  if (width >= 768) return 20;
  return 16;
}

function FilterSliders() {
  return (
    <View style={styles.filterSliders} accessibilityElementsHidden>
      <View style={styles.filterSliderRow}>
        <View style={styles.filterSliderLine} />
        <View style={[styles.filterSliderKnob, { left: 4 }]} />
      </View>
      <View style={styles.filterSliderRow}>
        <View style={styles.filterSliderLine} />
        <View style={[styles.filterSliderKnob, { right: 4 }]} />
      </View>
      <View style={styles.filterSliderRow}>
        <View style={styles.filterSliderLine} />
        <View style={[styles.filterSliderKnob, { left: 8 }]} />
      </View>
    </View>
  );
}

const pavilions = [
  {
    id: 'shanta',
    brand: 'SHANTA',
    pavilion: 'Pavilion A1',
    offer: '৳15 Lac Spot Cashback',
    note: 'Gulshan & Banani Sky Villas',
    color: '#D4AF37',
    image: require('../../../assets/pavilion-shanta.jpg'),
  },
  {
    id: 'sheltech',
    brand: 'SHELTECH',
    pavilion: 'Pavilion A2',
    offer: '0% Registration Cost',
    note: '35 Yrs of Urban Trust',
    color: '#2EB872',
    image: require('../../../assets/pavilion-sheltech.jpg'),
  },
  {
    id: 'navana',
    brand: 'NAVANA',
    pavilion: 'Pavilion B1',
    offer: 'Free IoT Home Suite',
    note: 'Biophilic Eco Living',
    color: '#00E5FF',
    image: require('../../../assets/pavilion-navana.jpg'),
  },
  {
    id: 'bti',
    brand: 'BTI',
    pavilion: 'Pavilion B2',
    offer: '12% Spot Advantage',
    note: 'Smart Classic Residences',
    color: '#FF6D00',
    image: require('../../../assets/pavilion-bti.jpg'),
  },
  {
    id: 'rangs',
    brand: 'RANGS',
    pavilion: 'Pavilion B3',
    offer: '৳20L Italian Interior',
    note: 'Sculptural Architecture',
    color: '#FF1744',
    image: require('../../../assets/pavilion-rangs.jpg'),
  },
  {
    id: 'concord',
    brand: 'CONCORD',
    pavilion: 'Pavilion C1',
    offer: '36-Mo 0% EMI Scheme',
    note: 'Townships & Highrises',
    color: '#00E676',
    image: require('../../../assets/pavilion-concord.jpg'),
  },
  {
    id: 'assure',
    brand: 'ASSURE',
    pavilion: 'Pavilion C2',
    offer: '50g Gold Coin + ৳5L Int.',
    note: 'Waterfront Luxury Condos',
    color: '#E040FB',
    image: require('../../../assets/pavilion-assure.jpg'),
  },
  {
    id: 'bay',
    brand: 'BAY',
    pavilion: 'Pavilion C3',
    offer: 'Architectural Sanctuaries',
    note: 'Bespoke Lakefront Homes',
    color: '#64FFDA',
    image: require('../../../assets/pavilion-bay.jpg'),
  },
];

const stalls = [
  {
    slug: 'shanta-pinnacle',
    name: 'Shanta Pinnacle Suites',
    location: 'Plot A1 · Gulshan 2 Avenue',
    category: 'Ultra-Luxury Sky Villa',
    rating: '4.9',
    reviews: '240',
    initials: 'SH',
    tone: '#D4AF37',
    booth: require('../../../assets/stall-shanta-hero.jpg'),
  },
  {
    slug: 'sheltech-elysium',
    name: 'Sheltech Elysium Lakeview',
    location: 'Plot A2 · Gulshan 1 Lake Road',
    category: 'Lakefront Condominium',
    rating: '4.8',
    reviews: '310',
    initials: 'SL',
    tone: '#2EB872',
    booth: require('../../../assets/stall-sheltech-hero.jpg'),
  },
  {
    slug: 'navana-botanica',
    name: 'Navana Botanica Eco Tower',
    location: 'Plot B1 · Bashundhara R/A Block I',
    category: 'Biophilic Eco Living',
    rating: '4.7',
    reviews: '195',
    initials: 'NB',
    tone: '#00E5FF',
    booth: require('../../../assets/stall-navana-hero.jpg'),
  },
  {
    slug: 'rangs-toruk',
    name: 'Rangs Toruk Sky Penthouse',
    location: 'Plot B3 · Banani Road 11',
    category: 'Sculptural Landmark',
    rating: '4.9',
    reviews: '215',
    initials: 'RP',
    tone: '#FF1744',
    booth: require('../../../assets/stall-rangs-hero.jpg'),
  },
  {
    slug: 'bti-three-sixty',
    name: 'bti Three Sixty Suites',
    location: 'Plot B2 · Dhanmondi Central',
    category: 'Smart Classic Living',
    rating: '4.8',
    reviews: '280',
    initials: 'BT',
    tone: '#FF6D00',
    booth: require('../../../assets/stall-shanta-hero.jpg'),
  },
  {
    slug: 'concord-regency',
    name: 'Concord Regency Lakeview',
    location: 'Plot C1 · Baridhara Diplomatic',
    category: 'Waterfront Condominium',
    rating: '4.7',
    reviews: '420',
    initials: 'CR',
    tone: '#00E676',
    booth: require('../../../assets/stall-sheltech-hero.jpg'),
  },
  {
    slug: 'assure-majestic',
    name: 'Assure Majestic Residency',
    location: 'Plot C2 · Uttara Sector 3',
    category: 'Boutique Residence',
    rating: '4.8',
    reviews: '175',
    initials: 'AG',
    tone: '#E91E63',
    booth: require('../../../assets/mela-expo-banner.jpg'),
  },
  {
    slug: 'bay-sanctuary',
    name: 'Bay Sanctuary Waterfront Sky Villa',
    location: 'Plot C3 · Gulshan 2 Avenue',
    category: 'Ultra-Luxury Architecture',
    rating: '4.9',
    reviews: '290',
    initials: 'BD',
    tone: '#00BCD4',
    booth: require('../../../assets/mela-expo-banner.jpg'),
  },
  {
    slug: 'dominno-elegance',
    name: 'Dom-Inno Elegance Residences',
    location: 'Plot D1 · Dhanmondi Road 27',
    category: 'Contemporary Urban Living',
    rating: '4.7',
    reviews: '160',
    initials: 'DI',
    tone: '#9C27B0',
    booth: require('../../../assets/mela-expo-banner.jpg'),
  },
  {
    slug: 'rupayan-city',
    name: 'Rupayan City Premium Condos',
    location: 'Plot D2 · Uttara Sector 12 Township',
    category: 'Gated Premium Township',
    rating: '4.8',
    reviews: '380',
    initials: 'RC',
    tone: '#FF9800',
    booth: require('../../../assets/mela-expo-banner.jpg'),
  },
  {
    slug: 'suvastu-nazar-valley',
    name: 'Suvastu Nazar Valley Sky Suite',
    location: 'Plot D3 · Pragati Sarani Expressway',
    category: 'Commercial & Mixed-Use',
    rating: '4.6',
    reviews: '145',
    initials: 'SD',
    tone: '#4CAF50',
    booth: require('../../../assets/mela-expo-banner.jpg'),
  },
  {
    slug: 'urbandesign-vantage',
    name: 'Urban Vantage Point Commercial Hub',
    location: 'Plot D4 · Far South-East Avenue',
    category: 'Commercial Glasshouse Landmark',
    rating: '4.7',
    reviews: '130',
    initials: 'UD',
    tone: '#F06292',
    booth: require('../../../assets/mela-expo-banner.jpg'),
  },
] as const;

const stallPageDetails = {
  'shanta-pinnacle': {
    hero: require('../../../assets/stall-shanta-hero.jpg'),
    bangla: 'শান্তা হোল্ডিংস · দ্য পিনাকল',
    tagline: 'Setting standards in luxury architectural landmarks.',
    description:
      'Step into Bangladesh’s premier ultra-luxury residential landmark. Featuring double-height sky duplexes, cantilevered private infinity pools, and panoramic lake vistas in Gulshan 2.',
    story:
      'Designed by internationally acclaimed architectural masters, Shanta Pinnacle redefines Dhaka’s skyline with energy-efficient curtain glass facades, 4-tier biometric security, dedicated lifestyle concierge, and private elevator foyers. Every sky villa is crafted with imported Italian marble and double-glazed acoustic windows.',
    founded: 'Established 2005',
    makers: 'Principal Architects',
    material: 'Curtain Glass & Italian Marble',
    demo: '3D VR Sky Tour · 4:00 PM',
    offer: '৳15 Lac Spot Booking Cashback + Complimentary Interior Package',
    phone: '+880 1711 002233',
    products: [
      { name: 'The Penthouse Sky Residence', price: '৳ 11.0 Cr', symbol: '🏛️', color: '#D4AF37' },
      { name: 'Lakeview Duplex Sky Villa', price: '৳ 6.5 Cr', symbol: '✦', color: '#B38B3F' },
      { name: 'Executive 4BHK Residence', price: '৳ 4.5 Cr', symbol: '◇', color: '#203A45' },
    ],
  },
  'sheltech-elysium': {
    hero: require('../../../assets/stall-sheltech-hero.jpg'),
    bangla: 'শেলটেক লাক্সারি লিভিং · এলিসিয়াম',
    tagline: '35 years of trusted urban living & smart communities.',
    description:
      'Serene lakefront residences with a private jogging promenade, 99% solar-powered common areas, and multi-tier clubhouse amenities.',
    story:
      'For over 35 years, Sheltech has engineered homes with 100% earthquake-resistant structural safety, expansive green balconies, and guaranteed handover timelines. Sheltech Elysium blends tranquil water breeze with high-speed optical elevators and EV charging infrastructure.',
    founded: 'Since 1988',
    makers: '35+ Yrs Engineering Trust',
    material: 'Engineered Concrete & Glass',
    demo: 'Architectural Model Demo · 5:30 PM',
    offer: 'Zero Registration Cost + Guaranteed 3-Year Rental Yield',
    phone: '+880 1819 445566',
    products: [
      { name: 'Lakeside 4BHK Sky Condo', price: '৳ 6.5 Cr', symbol: '🌊', color: '#2EB872' },
      { name: 'Panoramic 3BHK Residence', price: '৳ 3.8 Cr', symbol: '≈', color: '#1E6B52' },
      { name: 'Urban Executive Suite', price: '৳ 2.9 Cr', symbol: '◉', color: '#164839' },
    ],
  },
  'navana-botanica': {
    hero: require('../../../assets/stall-navana-hero.jpg'),
    bangla: 'নাভানা রিয়েল এস্টেট · বোটানিকা',
    tagline: 'Pioneering eco-friendly sustainable smart architecture.',
    description:
      'Vertical forest balconies, rainwater harvesting systems, solar micro-grid, and full-home IoT automation.',
    story:
      'Navana Botanica brings nature into vertical urban dwellings. Every residence enjoys dual-aspect cross-ventilation, soundproof German glazing, smart app-controlled ambient lighting, and lush terrace garden spaces.',
    founded: 'Since 1996',
    makers: 'Green Building Council',
    material: 'Biophilic Eco Concrete',
    demo: 'Smart IoT Home Demo · 6:00 PM',
    offer: 'Free Full-Home IoT Automation Kit + 8% Fair Discount',
    phone: '+880 1977 112299',
    products: [
      { name: 'Vertical Forest Penthouse', price: '৳ 5.0 Cr', symbol: '🌿', color: '#00E5FF' },
      { name: 'Eco-Smart 4BHK Suite', price: '৳ 3.2 Cr', symbol: '✣', color: '#0097A7' },
      { name: 'Green Haven 3BHK', price: '৳ 1.4 Cr', symbol: '⌁', color: '#124155' },
    ],
  },
  'rangs-toruk': {
    hero: require('../../../assets/stall-rangs-hero.jpg'),
    bangla: 'র‍্যাংগস প্রপার্টিজ · তরুক',
    tagline: 'Sculpting iconic bold contemporary architecture.',
    description:
      'Dramatic fair-face exposed concrete cantilevers, private plunge pools, and bespoke single-unit luxury floors in Banani 11.',
    story:
      'Rangs Toruk is an architectural sculpture in the skyline. Designed with German engineered floor-to-ceiling glass, custom Italian joinery, private sky gardens, and 4 car parkings per residence.',
    founded: 'Since 1998',
    makers: 'Avant-Garde Studio',
    material: 'Fair-Face Concrete & Glass',
    demo: 'Architectural Masterclass · 7:00 PM',
    offer: 'Complimentary Signature Italian Interior Package (Value ৳20L)',
    phone: '+880 1708 556677',
    products: [
      { name: 'Sculptural Duplex Penthouse', price: '৳ 9.8 Cr', symbol: '✦', color: '#FF1744' },
      { name: 'Sky Garden Residence', price: '৳ 6.2 Cr', symbol: '◇', color: '#C2185B' },
      { name: 'Boutique 4BHK Floor', price: '৳ 4.2 Cr', symbol: '⌁', color: '#3A0B17' },
    ],
  },
  'bti-three-sixty': {
    hero: require('../../../assets/stall-shanta-hero.jpg'),
    bangla: 'বিটিআই · থ্রি সিক্সটি',
    tagline: 'Creating classic homes with engineering excellence.',
    description:
      'Smart urban living spaces in central Dhanmondi with smart home climate control, double basements, and rooftop observatory deck.',
    story:
      'Backed by 40+ years of engineering excellence and ISO-certified structural safety, bti Three Sixty offers refined family residences near elite schools and cultural hubs.',
    founded: 'Since 1984',
    makers: 'ISO Certified Engineers',
    material: 'High-Tensile Reinforced Steel',
    demo: 'Smart Home Automation · 5:00 PM',
    offer: 'Pre-launch 12% Spot Price Advantage + Modular Kitchen Voucher',
    phone: '+880 1730 889900',
    products: [
      { name: 'Observatory Sky Suite', price: '৳ 4.8 Cr', symbol: '◉', color: '#FF6D00' },
      { name: 'Smart Family 3BHK', price: '৳ 3.1 Cr', symbol: '◒', color: '#E65100' },
      { name: 'Classic Residence', price: '৳ 2.1 Cr', symbol: '≈', color: '#4A2800' },
    ],
  },
  'concord-regency': {
    hero: require('../../../assets/stall-sheltech-hero.jpg'),
    bangla: 'কনকর্ড · রিজেন্সি লেকভিউ',
    tagline: 'The pioneers who built the nation’s monumental towers.',
    description:
      'Serene waterfront condominiums in Baridhara Diplomatic Enclave with private lakeview balconies, tennis courts, and full power substations.',
    story:
      'From the National Martyrs’ Monument to the nation’s tallest towers, Concord ensures lifetime reliability, highest construction standards, and hassle-free bank financing.',
    founded: 'Since 1972',
    makers: 'National Builders',
    material: 'Heavy Structural Concrete',
    demo: 'Township Masterplan · 4:30 PM',
    offer: '36-Month 0% Interest EMI Scheme + Instant Spot Allotment',
    phone: '+880 1713 990011',
    products: [
      { name: 'Diplomatic Lakefront Condo', price: '৳ 7.5 Cr', symbol: '🏛️', color: '#00E676' },
      { name: 'Waterfront 4BHK Suite', price: '৳ 4.9 Cr', symbol: '🌊', color: '#00838F' },
      { name: 'Executive 3BHK Residence', price: '৳ 3.6 Cr', symbol: '◇', color: '#063A25' },
    ],
  },
  'assure-majestic': {
    hero: require('../../../assets/mela-expo-banner.jpg'),
    bangla: 'এসিওর গ্রুপ · ম্যাজেস্টিক রেসিডেন্সি',
    tagline: 'Crafting architecturally sound boutique living.',
    description:
      'Step into Assure Group’s signature boutique residences in Uttara. Featuring private elevator foyers, double-height grand entry lobby, and 100% earthquake-resistant RCC frame structure.',
    story:
      'Assure Group brings over 18 years of commitment to perfection, delivering luxury residences with full RAJUK clearance, clear legal land titles, and premium German fittings.',
    founded: 'Established 2007',
    makers: 'Assure Engineering Team',
    material: 'RCC Frame & Tempered Glass',
    demo: 'Boutique Scale Model · 3:30 PM',
    offer: '৳8 Lac Spot Discount + Free Parking Bay',
    phone: '+880 1711 556677',
    products: [
      { name: 'Majestic 4BHK Sky Suite', price: '৳ 3.8 Cr', symbol: '🏛️', color: '#E91E63' },
      { name: 'Executive 3BHK Residence', price: '৳ 2.6 Cr', symbol: '✦', color: '#C2185B' },
    ],
  },
  'bay-sanctuary': {
    hero: require('../../../assets/mela-expo-banner.jpg'),
    bangla: 'বে ডেভেলপমেন্টস · স্যাঙ্কচুয়ারি ওয়াটারফ্রন্ট',
    tagline: 'Pioneering environmental luxury and architectural perfection.',
    description:
      'Experience Dhaka’s most exclusive eco-luxury waterfront condominium in Gulshan 2. Designed with floor-to-ceiling glass, private infinity pools, and panoramic lake views.',
    story:
      'Bay Developments sets the gold standard for luxury living in Bangladesh, with award-winning architectural designs, sustainable rainwater harvesting, and 24/7 white-glove concierge service.',
    founded: 'Since 1995',
    makers: 'Principal International Architects',
    material: 'Acoustic Glass & Natural Granite',
    demo: 'VR Sky Villa Walkthrough · 5:00 PM',
    offer: 'Complimentary Custom European Kitchen + Spot Cash Back',
    phone: '+880 1712 667788',
    products: [
      { name: 'Sanctuary Waterfront Villa', price: '৳ 9.5 Cr', symbol: '🌊', color: '#00BCD4' },
      { name: 'Diplomatic Duplex Penthouse', price: '৳ 6.8 Cr', symbol: '✦', color: '#00838F' },
    ],
  },
  'dominno-elegance': {
    hero: require('../../../assets/mela-expo-banner.jpg'),
    bangla: 'ডম-ইননো · এলিমেন্টস রেসিডেন্সেস',
    tagline: 'Modern urban aesthetics with pure architectural geometry.',
    description:
      'Dom-Inno crafts contemporary urban residences known for architectural purity, private balconies, and landscaped roof lounges in Dhanmondi and Uttara.',
    story:
      'Dom-Inno Builders has delivered over 100 landmark residential projects in Dhaka, focusing on minimalist aesthetics, natural light, and structural integrity.',
    founded: 'Since 2002',
    makers: 'Dom-Inno Design Studio',
    material: 'Engineered Steel & Fair-Face Concrete',
    demo: 'Architectural Presentation · 2:30 PM',
    offer: 'Zero Registration Fee + Free AC Installation',
    phone: '+880 1714 889900',
    products: [
      { name: 'Elegance 3BHK Penthouse', price: '৳ 3.2 Cr', symbol: '🏢', color: '#9C27B0' },
      { name: 'Urban Smart Residence', price: '৳ 1.9 Cr', symbol: '◇', color: '#7B1FA2' },
    ],
  },
  'rupayan-city': {
    hero: require('../../../assets/mela-expo-banner.jpg'),
    bangla: 'রূপায়ণ সিটি উত্তরা · প্রিমিয়াম কনডো',
    tagline: 'Country’s first premium gated township city.',
    description:
      'Explore South Asia’s premier gated township with 63% open green spaces, private jogging tracks, international school, sports complex, and multi-tier security.',
    story:
      'Rupayan City Uttara redefines modern living by providing a self-contained ecosystem where luxury condos, commercial hubs, and nature harmonize perfectly.',
    founded: 'Since 1998',
    makers: 'Rupayan Infrastructure Masterminds',
    material: 'Prestressed Concrete & Smart BMS',
    demo: 'Township Masterplan Tour · 6:00 PM',
    offer: '৳10 Lac Spot Discount + 5-Year Maintenance Waiver',
    phone: '+880 1715 990011',
    products: [
      { name: 'Maxus Premium Condo', price: '৳ 3.6 Cr', symbol: '🏙️', color: '#FF9800' },
      { name: 'Executive Sky Villa', price: '৳ 2.4 Cr', symbol: '✦', color: '#F57C00' },
    ],
  },
  'suvastu-nazar-valley': {
    hero: require('../../../assets/mela-expo-banner.jpg'),
    bangla: 'সুবাস্তু ডেভেলপমেন্ট · নজর ভ্যালি',
    tagline: 'Engineering excellence for iconic commercial & residential towers.',
    description:
      'Suvastu Development presents high-yield commercial landmarks and boutique residential suites on Pragati Sarani Expressway with LEED green certification.',
    story:
      'Over 25 years of trusted real estate development, Suvastu has delivered iconics commercial plazas and family residences with guaranteed handover timelines.',
    founded: 'Since 1997',
    makers: 'Suvastu Engineering Board',
    material: 'Curtain Wall Glass & Granite',
    demo: 'Commercial ROI Consultation · 4:00 PM',
    offer: 'Guaranteed 10% Rental Yield + Spot Booking Bonus',
    phone: '+880 1817 778899',
    products: [
      { name: 'Nazar Valley Corporate Floor', price: '৳ 5.8 Cr', symbol: '🏢', color: '#4CAF50' },
      { name: 'Expressway Commercial Suite', price: '৳ 2.2 Cr', symbol: '◇', color: '#388E3C' },
    ],
  },
  'urbandesign-vantage': {
    hero: require('../../../assets/mela-expo-banner.jpg'),
    bangla: 'আর্বান ডিজাইন অ্যান্ড দেব · ভ্যানটেজ পয়েন্ট',
    tagline: 'Modern urban aesthetics for visionary commercial living.',
    description:
      'Urban Design & Development specializes in modern commercial landmarks and boutique residential towers with cutting-edge glass curtain walls on Gulshan Avenue.',
    story:
      'Urban Design & Dev brings visionary commercial architecture, featuring triple-height grand atriums, smart access turnstiles, and 100% acoustic double glazing.',
    founded: 'Since 2005',
    makers: 'Urban Design & Dev Team',
    material: 'Glass Curtain Walls & Smart Automation',
    demo: 'Commercial ROI Calculator Demo · 3:00 PM',
    offer: 'Zero Processing Fee + Spot Gold Sovereign Voucher',
    phone: '+880 1819 112233',
    products: [
      { name: 'Urban Vantage Corporate Hub', price: '৳ 4.5 Cr', symbol: '🏢', color: '#F06292' },
      { name: 'Urban Crystal Boutique Residence', price: '৳ 2.9 Cr', symbol: '✦', color: '#C2185B' },
    ],
  },
} as const;

const deals = [
  {
    name: 'The Pinnacle Suites',
    brand: 'Shanta Holdings',
    slug: 'shanta-pinnacle',
    price: '৳ 4.5 Cr',
    oldPrice: '৳ 4.8 Cr',
    discount: '৳15L CASHBACK',
    color: '#D4AF37',
    symbol: '🏛️',
    image: require('../../../assets/deal-shanta-pinnacle.jpg'),
  },
  {
    name: 'Sheltech Elysium Lakeview',
    brand: 'Sheltech',
    slug: 'sheltech-elysium',
    price: '৳ 2.9 Cr',
    oldPrice: '৳ 3.2 Cr',
    discount: 'FREE REGISTRATION',
    color: '#2EB872',
    symbol: '🌊',
    image: require('../../../assets/deal-sheltech-elysium.jpg'),
  },
  {
    name: 'Navana Botanica Eco 3BHK',
    brand: 'Navana',
    slug: 'navana-botanica',
    price: '৳ 1.4 Cr',
    oldPrice: '৳ 1.6 Cr',
    discount: 'FREE SMART IOT',
    color: '#00E5FF',
    symbol: '🌿',
    image: require('../../../assets/deal-navana-botanica.jpg'),
  },
  {
    name: 'Rangs Toruk Penthouse',
    brand: 'Rangs Properties',
    slug: 'rangs-toruk',
    price: '৳ 4.2 Cr',
    oldPrice: '৳ 4.6 Cr',
    discount: '৳20L INTERIOR',
    color: '#FF1744',
    symbol: '✦',
    image: require('../../../assets/deal-rangs-toruk.jpg'),
  },
  {
    name: 'bti Three Sixty Suites',
    brand: 'bti Building Tech',
    slug: 'bti-three-sixty',
    price: '৳ 2.1 Cr',
    oldPrice: '৳ 2.4 Cr',
    discount: '12% SPOT ADVANTAGE',
    color: '#FF6D00',
    symbol: '◉',
    image: require('../../../assets/deal-bti-threesixty.jpg'),
  },
  {
    name: 'Concord Regency Lakeview',
    brand: 'Concord Real Estate',
    slug: 'concord-regency',
    price: '৳ 3.6 Cr',
    oldPrice: '৳ 3.9 Cr',
    discount: '36-MO 0% EMI',
    color: '#00E676',
    symbol: '🏛️',
    image: require('../../../assets/deal-concord-regency.jpg'),
  },
  {
    name: 'Assure Majestic Heights',
    brand: 'Assure Group',
    slug: 'sheltech-elysium',
    price: '৳ 1.6 Cr',
    oldPrice: '৳ 1.8 Cr',
    discount: '50G GOLD COIN',
    color: '#E040FB',
    symbol: '👑',
    image: require('../../../assets/deal-assure-majestic.jpg'),
  },
  {
    name: 'Bay Sanctuary Lakefront',
    brand: 'Bay Developments',
    slug: 'navana-botanica',
    price: '৳ 3.9 Cr',
    oldPrice: '৳ 4.3 Cr',
    discount: 'FREE INTERIOR DECOR',
    color: '#64FFDA',
    symbol: '💎',
    image: require('../../../assets/deal-bay-sanctuary.jpg'),
  },
] as const;

const games = [
  {
    name: 'Nagor Dola',
    bangla: 'নাগরদোলা',
    symbol: '🎡',
    price: '৳ 120',
    meta: '5 min ride · All ages',
    badge: 'MOST LOVED',
    color: '#285C68',
  },
  {
    name: 'Balloon Shoot',
    bangla: 'বেলুন শুট',
    symbol: '🎯',
    price: '৳ 80',
    meta: '5 shots · Age 8+',
    badge: 'WIN PRIZES',
    color: '#B75543',
  },
  {
    name: 'Mela Mini Train',
    bangla: 'মেলা ট্রেন',
    symbol: '🚂',
    price: '৳ 100',
    meta: '2 rounds · Kids',
    badge: 'FAMILY FUN',
    color: '#526A4E',
  },
  {
    name: 'Ring Toss',
    bangla: 'রিং টস',
    symbol: '◎',
    price: '৳ 60',
    meta: '5 rings · Age 6+',
    badge: 'QUICK PLAY',
    color: '#705570',
  },
];

const mapStalls = [
  {
    id: 'RE-01',
    name: 'Shanta Holdings Pavilion',
    category: 'Diamond Sponsor',
    zone: 'Plot A1 · North Plaza',
    color: '#D4AF37',
    rating: '4.9',
    hours: '10 AM – 10 PM',
    offer: 'Sky Villas · ৳15L Cashback',
  },
  {
    id: 'RE-02',
    name: 'Sheltech Luxury Living',
    category: 'Platinum Exhibitor',
    zone: 'Plot A2 · North East',
    color: '#2EB872',
    rating: '4.8',
    hours: '10 AM – 10 PM',
    offer: '0% Registration Cost · 80% Loan',
  },
  {
    id: 'RE-03',
    name: 'Navana Real Estate',
    category: 'Eco Pioneer',
    zone: 'Plot B1 · West Boulevard',
    color: '#00E5FF',
    rating: '4.7',
    hours: '10 AM – 10 PM',
    offer: 'Biophilic Eco Homes · Free IoT',
  },
  {
    id: 'RE-04',
    name: 'bti (Building Tech & Ideas)',
    category: 'Gold Exhibitor',
    zone: 'Plot B2 · Central Ring',
    color: '#FF6D00',
    rating: '4.8',
    hours: '10 AM – 10 PM',
    offer: '12% Spot Advantage · Smart Homes',
  },
  {
    id: 'RE-05',
    name: 'Rangs Properties',
    category: 'Design Icon',
    zone: 'Plot B3 · East Wing',
    color: '#FF1744',
    rating: '4.9',
    hours: '10 AM – 10 PM',
    offer: '৳20L Italian Interior Voucher',
  },
  {
    id: 'RE-06',
    name: 'Concord Real Estate',
    category: 'Pioneer Builder',
    zone: 'Plot C1 · South Promenade',
    color: '#00E676',
    rating: '4.7',
    hours: '10 AM – 10 PM',
    offer: '36-Month 0% Interest EMI Scheme',
  },
  {
    id: 'RE-07',
    name: 'Assure Group',
    category: 'Premium Builder',
    zone: 'Plot C2 · South Walkway',
    color: '#E040FB',
    rating: '4.8',
    hours: '10 AM – 10 PM',
    offer: '50g Gold Coin + ৳5L Interior',
  },
  {
    id: 'RE-08',
    name: 'Bay Developments',
    category: 'Architects Guild',
    zone: 'Plot C3 · South East',
    color: '#64FFDA',
    rating: '4.9',
    hours: '10 AM – 10 PM',
    offer: 'Bespoke Lakefront Residences',
  },
  {
    id: 'FC-01',
    name: 'Old Dhaka Kacchi House',
    category: 'Food Court',
    zone: 'South Food Plaza',
    color: '#C58A35',
    rating: '4.8',
    hours: '12 PM – 11 PM',
    offer: 'Traditional Mutton Kacchi · Borhani',
  },
  {
    id: 'FC-02',
    name: 'Pitha & Gourmet Cha Ghor',
    category: 'Food Court',
    zone: 'South Food Plaza',
    color: '#A85E4B',
    rating: '4.8',
    hours: '12 PM – 11 PM',
    offer: 'Winter Pitha · Special Dudh Cha',
  },
  {
    id: 'ND-01',
    name: 'Nagor Dola Ferris Wheel',
    category: 'Fun Zone',
    zone: 'East Amusement Lawn',
    color: '#705570',
    rating: '4.9',
    hours: '3 PM – 11 PM',
    offer: '৳ 120 · 3D Interactive Ride',
  },
  {
    id: 'BS-01',
    name: 'Balloon Shooting Challenge',
    category: 'Fun Zone',
    zone: 'East Amusement Lawn',
    color: '#D50000',
    rating: '4.7',
    hours: '3 PM – 11 PM',
    offer: '৳ 80 · Win Spot Fair Prizes',
  },
];

const quickZones: { label: string; icon: GlyphName; tone: string }[] = [
  { label: 'Signature Pavilions', icon: 'store', tone: '#FFF8E1' },
  { label: 'Eco Living', icon: 'craft', tone: '#E0F7FA' },
  { label: 'Waterfront', icon: 'event', tone: '#E8F5E9' },
  { label: 'Food & Fest', icon: 'food', tone: '#FBE9E7' },
];

function SectionHeader({
  eyebrow,
  title,
  action = 'See all',
  onPressAction,
}: {
  eyebrow: string;
  title: string;
  action?: string;
  onPressAction?: () => void;
}) {
  return (
    <View style={styles.sectionHeader}>
      <View style={{ flex: 1 }}>
        <Text style={styles.eyebrow}>{eyebrow}</Text>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <Pressable
        accessibilityRole="button"
        onPress={() => {
          if (onPressAction) {
            onPressAction();
          } else {
            Alert.alert(title, 'More stalls are coming soon.');
          }
        }}
        style={({ pressed }) => [styles.textButton, pressed && styles.pressed]}
      >
        <Text style={styles.textButtonLabel}>{action}</Text>
        <Glyph name="arrow" size={16} color={COLORS.coral} />
      </Pressable>
    </View>
  );
}

function FestiveDivider() {
  return (
    <View style={styles.festiveDivider} accessibilityElementsHidden>
      <View style={styles.festiveDividerLine} />
      {[COLORS.coral, COLORS.gold, '#4C7165', '#705570', COLORS.coral].map(
        (color, index) => (
          <View
            key={`${color}-${index}`}
            style={[
              styles.festiveDiamond,
              {
                backgroundColor: color,
                transform: [
                  { rotate: index % 2 === 0 ? '45deg' : '0deg' },
                  { scale: index === 2 ? 1.35 : 1 },
                ],
              },
            ]}
          />
        ),
      )}
      <View style={styles.festiveDividerLine} />
    </View>
  );
}

const MARQUEE_ITEMS = [
  { tag: 'FLASH SPOT OFFER', text: '৳20 Lac Booking Cashback on Shanta & Rupayan', icon: '🔥', tagBg: '#D95D45' },
  { tag: 'MELA AMUSEMENT', text: 'Nagordola Ferris Wheel & Carnival Dart Game Arena Open', icon: '🎡', tagBg: '#00B0FF' },
  { tag: 'LIVE BAUL GAAN', text: 'Acoustic Folk Stage Concert by Baul Shufi at 6:00 PM', icon: '🪘', tagBg: '#AB47BC' },
  { tag: 'FOOD STREET', text: 'Authentic Dhaka Tok Fuchka, Steaming Bhapa Pitha & Kacchi', icon: '🍲', tagBg: '#FF8F00' },
  { tag: 'SPOT BANK LOAN', text: 'Instant Spot Home Loan Approvals Up to 80% with 0% Processing Fee', icon: '⚡', tagBg: '#00C853' },
  { tag: 'HERITAGE CRAFT', text: 'Tangail Jamdani Handloom Weaving & Sonargaon Clay Terracotta', icon: '🧵', tagBg: '#00897B' },
  { tag: '3D FAIRGROUND', text: 'Walk through 12 Luxury Developer Pavilions in 3D WebGL Arena', icon: '🏢', tagBg: '#F57C00' },
  { tag: 'FREE GIFT VOUCHER', text: 'Complimentary Modular Kitchen & Italian Interior Package on Spot Booking', icon: '🎁', tagBg: '#E91E63' },
];

function FestivalMarquee({ onSelectOffer }: { onSelectOffer?: (item: typeof MARQUEE_ITEMS[0]) => void }) {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const [contentWidth, setContentWidth] = React.useState(1800);

  React.useEffect(() => {
    animatedValue.setValue(0);
    const animation = Animated.loop(
      Animated.timing(animatedValue, {
        toValue: -contentWidth,
        duration: 36000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    animation.start();
    return () => animation.stop();
  }, [animatedValue, contentWidth]);

  const renderTickerTrack = (trackKey: string) => (
    <View
      key={trackKey}
      style={styles.tickerTrack}
      onLayout={(e) => {
        const w = e.nativeEvent.layout.width;
        if (w > 0 && Math.abs(w - contentWidth) > 10) {
          setContentWidth(w);
        }
      }}
    >
      {MARQUEE_ITEMS.map((item, idx) => (
        <Pressable
          key={idx}
          onPress={() => {
            if (onSelectOffer) {
              onSelectOffer(item);
            } else {
              Alert.alert(`${item.icon} ${item.tag}`, `${item.text}\n\nVisit the respective pavilion or zone on the fairground!`);
            }
          }}
          style={({ pressed }) => [
            styles.tickerItem,
            pressed && { opacity: 0.7, transform: [{ scale: 0.98 }] },
          ]}
        >
          <View style={[styles.tickerTag, { backgroundColor: item.tagBg }]}>
            <Text style={styles.tickerTagText}>{item.tag}</Text>
          </View>
          <Text style={styles.tickerItemText}>
            {item.icon} {item.text}
          </Text>
          <Text style={styles.tickerSeparator}>✦</Text>
        </Pressable>
      ))}
    </View>
  );

  return (
    <View style={styles.festivalMarqueeWrapper}>
      <View style={styles.marqueeTopLine} />

      <View style={styles.festivalMarquee}>
        {/* Left Fixed Live Badge */}
        <View style={styles.fixedHighlightBadge}>
          <Text style={styles.fixedBadgePulse}>●</Text>
          <Text style={styles.fixedBadgeText}>EXPO LIVE</Text>
        </View>

        {/* Animated Infinite Horizontal Scrolling Strip */}
        <View style={styles.marqueeScrollContainer}>
          <Animated.View
            style={[
              styles.marqueeAnimatedRow,
              {
                transform: [{ translateX: animatedValue }],
              },
            ]}
          >
            {renderTickerTrack('track-1')}
            {renderTickerTrack('track-2')}
          </Animated.View>
        </View>
      </View>

      <View style={styles.marqueeBottomLine} />
    </View>
  );
}

function BuntingStrip() {
  return (
    <View style={styles.eventBunting} accessibilityElementsHidden>
      {[
        COLORS.coral,
        COLORS.gold,
        '#4C7165',
        '#705570',
        COLORS.coral,
        COLORS.gold,
        '#4C7165',
      ].map((color, index) => (
        <View
          key={`${color}-${index}`}
          style={[styles.buntingFlag, { borderTopColor: color }]}
        />
      ))}
    </View>
  );
}

function MinimalFestivalBackdrop() {
  return (
    <View
      pointerEvents="none"
      style={styles.minimalBackdrop}
      accessibilityElementsHidden
    >
      <View style={styles.backdropRingTop}>
        <View style={styles.backdropRingInner} />
      </View>

      <View style={styles.backdropDotCluster}>
        {Array.from({ length: 12 }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.backdropDot,
              index % 3 === 0 && styles.backdropDotGold,
            ]}
          />
        ))}
      </View>

      <View style={styles.backdropArch}>
        <View style={styles.backdropArchInner} />
      </View>

      <View style={styles.backdropDiamondRow}>
        {[COLORS.coral, COLORS.gold, '#4C7165', '#705570'].map(
          (color, index) => (
            <View
              key={`${color}-${index}`}
              style={[
                styles.backdropMiniDiamond,
                {
                  backgroundColor: color,
                  transform: [{ rotate: '45deg' }],
                },
              ]}
            />
          ),
        )}
      </View>

      <View style={styles.backdropFlower}>
        <View style={styles.backdropPetalTop} />
        <View style={styles.backdropPetalRight} />
        <View style={styles.backdropPetalBottom} />
        <View style={styles.backdropPetalLeft} />
        <View style={styles.backdropFlowerCenter} />
      </View>
    </View>
  );
}

const pavilionSlugMap: Record<string, keyof typeof stallPageDetails> = {
  shanta: 'shanta-pinnacle',
  'shanta-pinnacle': 'shanta-pinnacle',
  sheltech: 'sheltech-elysium',
  'sheltech-elysium': 'sheltech-elysium',
  navana: 'navana-botanica',
  'navana-botanica': 'navana-botanica',
  bti: 'bti-three-sixty',
  'bti-three-sixty': 'bti-three-sixty',
  rangs: 'rangs-toruk',
  'rangs-toruk': 'rangs-toruk',
  concord: 'concord-regency',
  'concord-regency': 'concord-regency',
  assure: 'assure-majestic',
  'assure-majestic': 'assure-majestic',
  bay: 'bay-sanctuary',
  'bay-sanctuary': 'bay-sanctuary',
  dominno: 'dominno-elegance',
  'dom-inno': 'dominno-elegance',
  'dominno-elegance': 'dominno-elegance',
  rupayan: 'rupayan-city',
  'rupayan-city': 'rupayan-city',
  suvastu: 'suvastu-nazar-valley',
  'suvastu-nazar-valley': 'suvastu-nazar-valley',
  urbandesign: 'urbandesign-vantage',
  urban: 'urbandesign-vantage',
  'urbandesign-vantage': 'urbandesign-vantage',
};

function PavilionCard({
  item,
  width,
  onNavigateStall,
}: {
  item: (typeof pavilions)[number];
  width: number;
  onNavigateStall?: (slug: keyof typeof stallPageDetails) => void;
}) {
  const targetSlug = pavilionSlugMap[item.id] || 'shanta-pinnacle';

  return (
    <Pressable
      onPress={() => {
        if (onNavigateStall) {
          onNavigateStall(targetSlug);
        } else {
          Alert.alert(item.brand, `${item.offer} at ${item.pavilion}`);
        }
      }}
      style={({ pressed }) => [
        styles.pavilionCard,
        { width },
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.pavilionBoothStage}>
        <Image
          source={item.image}
          style={styles.pavilionImage}
          resizeMode="cover"
        />
        <View style={styles.pavilionBadge}>
          <View style={[styles.brandSeal, { backgroundColor: item.color }]}>
            <Text style={styles.brandSealText}>
              {item.brand.slice(0, 1)}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.pavilionBrand}>{item.brand}</Text>
            <Text style={styles.pavilionFasciaLabel}>MEGA PAVILION</Text>
          </View>
        </View>
      </View>

      <View style={styles.pavilionInfo}>
        <View style={styles.pavilionInfoTop}>
          <Text style={[styles.pavilionNumber, { color: item.color }]}>
            {item.pavilion}
          </Text>
          <View style={styles.pavilionOpenPill}>
            <View style={styles.pavilionOpenDot} />
            <Text style={styles.pavilionOpenText}>OPEN</Text>
          </View>
        </View>
        <Text style={styles.pavilionOffer}>{item.offer}</Text>
        <View style={styles.pavilionFooter}>
          <Text style={styles.pavilionNote}>{item.note}</Text>
          <View style={[styles.roundArrow, { backgroundColor: item.color }]}>
            <Glyph name="arrow" size={18} color="#FFFFFF" />
          </View>
        </View>
      </View>
    </Pressable>
  );
}

function StallCard({
  item,
  width,
  onVisit,
}: {
  item: (typeof stalls)[number];
  width: number;
  onVisit: (slug: keyof typeof stallPageDetails) => void;
}) {
  const [saved, setSaved] = useState(false);

  return (
    <View style={[styles.stallCard, { width }]}>
      <ImageBackground
        source={item.booth}
        resizeMode="cover"
        imageStyle={styles.stallBoothImage}
        style={styles.stallArt}
      >
        <LinearGradient
          colors={[
            'rgba(7, 21, 27, 0.75)',
            'rgba(7, 21, 27, 0.25)',
            'rgba(7, 21, 27, 0.88)',
          ]}
          style={StyleSheet.absoluteFill}
        />
        <View style={[styles.stallBoothLabel, { backgroundColor: item.tone }]}>
          <Text style={styles.stallBoothLabelText}>{item.name}</Text>
        </View>
        <Pressable
          accessibilityLabel={saved ? 'Remove from saved' : 'Save residence'}
          onPress={() => setSaved((value) => !value)}
          style={[styles.saveButton, saved && styles.saveButtonActive]}
        >
          <Glyph
            name="heart"
            size={20}
            color={saved ? '#FFFFFF' : COLORS.ink}
          />
        </Pressable>
        <Text style={styles.stallCategory}>{item.category}</Text>
      </ImageBackground>
      <View style={styles.stallContent}>
        <Text style={styles.stallLocation}>{item.location}</Text>
        <Text style={styles.stallName} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.ratingRow}>
          <Glyph name="star" size={14} color={COLORS.gold} />
          <Text style={styles.ratingStrong}>{item.rating}</Text>
          <Text style={styles.ratingText}>({item.reviews} reviews)</Text>
        </View>
        <Pressable
          onPress={() => onVisit(item.slug)}
          style={({ pressed }) => [
            styles.outlineButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.outlineButtonText}>Explore residence</Text>
          <Glyph name="arrow" size={17} color={COLORS.ink} />
        </Pressable>
      </View>
    </View>
  );
}

function DealCard({
  item,
  width,
  onNavigateStall,
}: {
  item: (typeof deals)[number];
  width: number;
  onNavigateStall?: (slug: keyof typeof stallPageDetails) => void;
}) {
  return (
    <Pressable
      onPress={() => {
        if (onNavigateStall) {
          onNavigateStall(item.slug);
        } else {
          Alert.alert(item.name, `Today’s fair price: ${item.price}`);
        }
      }}
      style={({ pressed }) => [
        styles.dealCard,
        { width },
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.dealArt}>
        <Image
          source={item.image}
          style={styles.dealImage}
          resizeMode="cover"
        />
        <View style={styles.discountPill}>
          <Text style={styles.discountText}>{item.discount}</Text>
        </View>
      </View>
      <Text style={styles.dealBrand}>{item.brand}</Text>
      <Text style={styles.dealName} numberOfLines={1}>{item.name}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.oldPrice}>{item.oldPrice}</Text>
      </View>
    </Pressable>
  );
}

function GameCard({
  item,
  width,
}: {
  item: (typeof games)[number];
  width: number;
}) {
  return (
    <Pressable
      onPress={() =>
        Alert.alert(item.name, `${item.price} per play · ${item.meta}`)
      }
      style={({ pressed }) => [
        styles.gameCard,
        { width },
        pressed && styles.cardPressed,
      ]}
    >
      <View style={[styles.gameArt, { backgroundColor: item.color }]}>
        <View style={styles.gameSun} />
        <View style={styles.gameGround} />
        <Text style={styles.gameSymbol}>{item.symbol}</Text>
        <View style={styles.gameBadge}>
          <Text style={styles.gameBadgeText}>{item.badge}</Text>
        </View>
      </View>
      <View style={styles.gameContent}>
        <View style={styles.gameTitleRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.gameBangla}>{item.bangla}</Text>
            <Text style={styles.gameName}>{item.name}</Text>
          </View>
          <Text style={styles.gamePrice}>{item.price}</Text>
        </View>
        <Text style={styles.gameMeta}>{item.meta}</Text>
        <View style={styles.gameButton}>
          <Text style={styles.gameButtonText}>Get play pass</Text>
          <Glyph name="arrow" size={17} color={COLORS.coral} />
        </View>
      </View>
    </Pressable>
  );
}

function PlayableBalloonGame({ isDesktop }: { isDesktop: boolean }) {
  const [status, setStatus] = useState<'idle' | 'playing' | 'finished'>('idle');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [target, setTarget] = useState(4);
  const [lastHit, setLastHit] = useState<number | null>(null);

  const nextTarget = (current: number) => {
    let next = Math.floor(Math.random() * 9);
    if (next === current) next = (next + 4) % 9;
    return next;
  };

  useEffect(() => {
    if (status !== 'playing') return;
    const timer = setInterval(() => {
      setTimeLeft((value) => {
        if (value <= 1) {
          setStatus('finished');
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [status]);

  useEffect(() => {
    if (status !== 'playing') return;
    const shuffle = setInterval(() => {
      setTarget((current) => nextTarget(current));
    }, 850);
    return () => clearInterval(shuffle);
  }, [status]);

  useEffect(() => {
    if (status === 'finished') {
      setBestScore((current) => Math.max(current, score));
    }
  }, [score, status]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(20);
    setTarget(Math.floor(Math.random() * 9));
    setLastHit(null);
    setStatus('playing');
  };

  const hitBalloon = (index: number) => {
    if (status !== 'playing') return;
    if (index === target) {
      setScore((value) => value + 10);
      setLastHit(index);
      setTarget((current) => nextTarget(current));
      setTimeout(() => setLastHit(null), 220);
    } else {
      setScore((value) => Math.max(0, value - 2));
    }
  };

  const balloonColors = [
    '#D95D45',
    '#F2B84B',
    '#4C7165',
    '#705570',
    '#D95D45',
    '#2F7180',
    '#E18B63',
    '#8C4D4B',
    '#D7A63E',
  ];

  return (
    <View
      style={[
        styles.playableGameLayout,
        !isDesktop && styles.playableGameLayoutMobile,
      ]}
    >
      <View
        style={[
          styles.gameInstructions,
          !isDesktop && styles.gameInstructionsMobile,
        ]}
      >
        <View style={styles.gameLivePill}>
          <View
            style={[
              styles.gameLiveDot,
              status === 'playing' && styles.gameLiveDotActive,
            ]}
          />
          <Text style={styles.gameLiveText}>
            {status === 'playing' ? 'GAME IN PROGRESS' : 'MELA MINI GAME'}
          </Text>
        </View>
        <Text style={styles.playableGameTitle}>Pop the{'\n'}golden balloon!</Text>
        <Text style={styles.playableGameCopy}>
          Tap the balloon showing a golden star before it moves. A hit earns 10
          points; a miss costs 2. You have 20 seconds.
        </Text>

        <View style={styles.gameScoreboard}>
          <View style={styles.gameScoreItem}>
            <Text style={styles.gameScoreLabel}>SCORE</Text>
            <Text style={styles.gameScoreValue}>{score}</Text>
          </View>
          <View style={styles.gameScoreRule} />
          <View style={styles.gameScoreItem}>
            <Text style={styles.gameScoreLabel}>TIME</Text>
            <Text
              style={[
                styles.gameScoreValue,
                timeLeft <= 5 && status === 'playing' && styles.gameTimeUrgent,
              ]}
            >
              {timeLeft}s
            </Text>
          </View>
          <View style={styles.gameScoreRule} />
          <View style={styles.gameScoreItem}>
            <Text style={styles.gameScoreLabel}>BEST</Text>
            <Text style={styles.gameScoreValue}>{bestScore}</Text>
          </View>
        </View>

        <View style={styles.gameTimerTrack}>
          <View
            style={[
              styles.gameTimerFill,
              { width: `${(timeLeft / 20) * 100}%` },
            ]}
          />
        </View>

        <Pressable
          onPress={startGame}
          style={({ pressed }) => [
            styles.gameStartButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.gameStartButtonText}>
            {status === 'playing'
              ? 'Restart game'
              : status === 'finished'
                ? 'Play again'
                : 'Start game'}
          </Text>
          <Glyph name="arrow" size={19} color="#FFFFFF" />
        </Pressable>
      </View>

      <View style={styles.balloonBoard}>
        <View style={styles.balloonBoardLights}>
          {Array.from({ length: 9 }).map((_, index) => (
            <View key={index} style={styles.boardLight} />
          ))}
        </View>
        <View style={styles.balloonGrid}>
          {balloonColors.map((color, index) => {
            const active = status === 'playing' && target === index;
            const popped = lastHit === index;
            return (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={
                  active ? 'Golden target balloon' : `Balloon ${index + 1}`
                }
                key={`${color}-${index}`}
                onPress={() => hitBalloon(index)}
                style={({ pressed }) => [
                  styles.balloonSlot,
                  active && styles.balloonSlotActive,
                  pressed && status === 'playing' && styles.balloonPressed,
                ]}
              >
                <View
                  style={[
                    styles.balloon,
                    { backgroundColor: color },
                    active && styles.balloonActive,
                    popped && styles.balloonPopped,
                    status !== 'playing' && styles.balloonIdle,
                  ]}
                >
                  <View style={styles.balloonShine} />
                  <Text style={styles.balloonTarget}>{active ? '★' : '·'}</Text>
                </View>
                <View
                  style={[
                    styles.balloonKnot,
                    { borderTopColor: color },
                    status !== 'playing' && styles.balloonIdle,
                  ]}
                />
                <View style={styles.balloonString} />
              </Pressable>
            );
          })}
        </View>
        {status !== 'playing' && (
          <View style={styles.gameBoardOverlay}>
            <Text style={styles.gameBoardOverlayIcon}>
              {status === 'finished' ? '🏆' : '🎈'}
            </Text>
            <Text style={styles.gameBoardOverlayTitle}>
              {status === 'finished' ? `You scored ${score}!` : 'Ready to play?'}
            </Text>
            <Text style={styles.gameBoardOverlayText}>
              {status === 'finished'
                ? score >= 80
                  ? 'Champion! Collect a virtual mela badge.'
                  : 'Nice try—play again and beat your score.'
                : 'Press Start game to begin the countdown.'}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

function InteractiveFairMap({ isDesktop }: { isDesktop: boolean }) {
  const [activeCategory, setActiveCategory] = useState('All stalls');
  const [selectedId, setSelectedId] = useState(mapStalls[0].id);
  const selected =
    mapStalls.find((stall) => stall.id === selectedId) ?? mapStalls[0];
  const categories = ['All stalls', 'Mega brands', 'Artisan', 'Food', 'Fun zone'];

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.mapFilters}
      >
        {categories.map((category) => {
          const active = activeCategory === category;
          return (
            <Pressable
              key={category}
              onPress={() => setActiveCategory(category)}
              style={({ pressed }) => [
                styles.mapFilter,
                active && styles.mapFilterActive,
                pressed && styles.pressed,
              ]}
            >
              <Text
                style={[
                  styles.mapFilterText,
                  active && styles.mapFilterTextActive,
                ]}
              >
                {category}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View
        style={[
          styles.interactiveMapLayout,
          !isDesktop && styles.interactiveMapLayoutMobile,
        ]}
      >
        <View style={styles.mapCanvas}>
          <View style={styles.mapTopLandmarks}>
            <View style={styles.landmark}>
              <Text style={styles.landmarkIcon}>♫</Text>
              <Text style={styles.landmarkText}>MAIN STAGE</Text>
            </View>
            <View style={[styles.landmark, styles.landmarkGold]}>
              <Text style={styles.landmarkIcon}>◒</Text>
              <Text style={styles.landmarkText}>FOOD COURT</Text>
            </View>
          </View>

          <View style={styles.stallLine}>
            {mapStalls.slice(0, 4).map((stall) => {
              const selectedStall = stall.id === selectedId;
              const dimmed =
                activeCategory !== 'All stalls' &&
                stall.category !== activeCategory;
              return (
                <Pressable
                  accessibilityLabel={`Select ${stall.name}, stall ${stall.id}`}
                  key={stall.id}
                  disabled={dimmed}
                  onPress={() => setSelectedId(stall.id)}
                  style={({ pressed }) => [
                    styles.mapStall,
                    { borderTopColor: stall.color },
                    selectedStall && styles.mapStallSelected,
                    dimmed && styles.mapStallDimmed,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={styles.mapStallId}>{stall.id}</Text>
                  <Text style={styles.mapStallName} numberOfLines={2}>
                    {stall.name}
                  </Text>
                  {selectedStall && <View style={styles.mapSelectedDot} />}
                </Pressable>
              );
            })}
          </View>

          <View style={styles.mainAisle}>
            <View style={styles.aisleDash} />
            <View style={styles.aisleLabel}>
              <Text style={styles.aisleLabelText}>ALPANA AVENUE · MAIN WALKWAY</Text>
            </View>
            <View style={styles.aisleDash} />
          </View>

          <View style={styles.stallLine}>
            {mapStalls.slice(4, 8).map((stall) => {
              const selectedStall = stall.id === selectedId;
              const dimmed =
                activeCategory !== 'All stalls' &&
                stall.category !== activeCategory;
              return (
                <Pressable
                  accessibilityLabel={`Select ${stall.name}, stall ${stall.id}`}
                  key={stall.id}
                  disabled={dimmed}
                  onPress={() => setSelectedId(stall.id)}
                  style={({ pressed }) => [
                    styles.mapStall,
                    { borderTopColor: stall.color },
                    selectedStall && styles.mapStallSelected,
                    dimmed && styles.mapStallDimmed,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={styles.mapStallId}>{stall.id}</Text>
                  <Text style={styles.mapStallName} numberOfLines={2}>
                    {stall.name}
                  </Text>
                  {selectedStall && <View style={styles.mapSelectedDot} />}
                </Pressable>
              );
            })}
          </View>

          <View style={styles.mapBottomLandmarks}>
            <View style={styles.amenityPill}>
              <Text style={styles.amenityText}>WC</Text>
            </View>
            <View style={styles.entryGate}>
              <Glyph name="map" size={18} color="#FFFFFF" />
              <Text style={styles.entryGateText}>GATE 1 · MAIN ENTRY</Text>
            </View>
            <View style={styles.amenityPill}>
              <Text style={styles.amenityText}>INFO</Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.mapDetailCard,
            !isDesktop && styles.mapDetailCardMobile,
          ]}
        >
          <View style={styles.mapDetailTop}>
            <View
              style={[
                styles.mapDetailNumber,
                { backgroundColor: selected.color },
              ]}
            >
              <Text style={styles.mapDetailNumberText}>{selected.id}</Text>
            </View>
            <View style={styles.openPill}>
              <View style={styles.openDot} />
              <Text style={styles.openText}>OPEN NOW</Text>
            </View>
          </View>
          <Text style={styles.mapDetailZone}>
            {selected.zone} · {selected.category}
          </Text>
          <Text style={styles.mapDetailTitle}>{selected.name}</Text>
          <Text style={styles.mapDetailOffer}>{selected.offer}</Text>

          <View style={styles.mapDetailFacts}>
            <View style={styles.mapDetailFact}>
              <Glyph name="star" size={15} color={COLORS.gold} />
              <Text style={styles.mapDetailFactText}>
                {selected.rating} rating
              </Text>
            </View>
            <View style={styles.mapDetailFact}>
              <Glyph name="clock" size={16} color={COLORS.muted} />
              <Text style={styles.mapDetailFactText}>{selected.hours}</Text>
            </View>
          </View>

          <Pressable
            onPress={() =>
              Alert.alert(
                `Directions to ${selected.name}`,
                `From Gate 1, follow Alpana Avenue to stall ${selected.id}.`,
              )
            }
            style={({ pressed }) => [
              styles.directionButton,
              pressed && styles.pressed,
            ]}
          >
            <Glyph name="map" size={18} color="#FFFFFF" />
            <Text style={styles.directionButtonText}>Get directions</Text>
          </Pressable>
          <Text style={styles.mapHint}>Select any stall on the map to explore.</Text>
        </View>
      </View>
    </View>
  );
}

function StallLandingPage({
  slug,
  onBack,
  onSwitch,
}: {
  slug: keyof typeof stallPageDetails;
  onBack: () => void;
  onSwitch: (slug: keyof typeof stallPageDetails) => void;
}) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;
  const inset = getSiteInset(width);
  const base = stalls.find((stall) => stall.slug === slug) ?? stalls[0];
  const detail = stallPageDetails[slug];
  const productWidth = isDesktop
    ? (Math.min(width, SITE_MAX_WIDTH) - inset * 2 - 28) / 3
    : Math.min(width * 0.72, 270);

  const action = (title: string, message: string) => Alert.alert(title, message);

  const reStall = useMemo(() => {
    return (
      REAL_ESTATE_STALLS.find((s) => {
        if (slug.startsWith('shanta')) return s.id === 'shanta';
        if (slug.startsWith('sheltech')) return s.id === 'sheltech';
        if (slug.startsWith('navana')) return s.id === 'navana';
        if (slug.startsWith('rangs')) return s.id === 'rangs';
        if (slug.startsWith('bti')) return s.id === 'bti';
        if (slug.startsWith('concord')) return s.id === 'concord';
        return false;
      }) || REAL_ESTATE_STALLS[0]
    );
  }, [slug]);

  const [selectedFloorplanProject, setSelectedFloorplanProject] = useState<any | null>(null);
  const [selectedInquiryProject, setSelectedInquiryProject] = useState<any | null>(null);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryTimeSlot, setInquiryTimeSlot] = useState('immediate');
  const [inquiryNotes, setInquiryNotes] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [projectTypeFilter, setProjectTypeFilter] = useState<'all' | 'ready' | 'construction'>('all');

  const openInquiryForm = (project: any) => {
    setSelectedInquiryProject(project);
    setInquirySubmitted(false);
  };

  const filteredProjects = useMemo(() => {
    if (projectTypeFilter === 'ready') {
      return reStall.projects.filter((p) => p.status === 'Ready');
    }
    if (projectTypeFilter === 'construction') {
      return reStall.projects.filter((p) => p.status === 'Under Construction' || p.status === 'Pre-Launch');
    }
    return reStall.projects;
  }, [reStall, projectTypeFilter]);

  return (
    <SafeAreaView style={styles.stallPage} edges={['top', 'left', 'right']}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.stallPageHeader}>
          <View style={[styles.stallPageHeaderInner, { paddingHorizontal: inset }]}>
            <Pressable
              onPress={onBack}
              style={({ pressed }) => [
                styles.backButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.backArrow}>←</Text>
              <Text style={styles.backButtonText}>Back to fair</Text>
            </Pressable>
            <Pressable onPress={onBack} style={styles.logoLockup}>
              <View style={styles.logoMark}>
                <Text style={styles.logoMarkText}>ম</Text>
              </View>
              <Text style={styles.logoText}>Mela Fest</Text>
            </Pressable>
            <View style={styles.stallHeaderActions}>
              <Pressable
                onPress={() => action('Saved', `${base.name} has been saved.`)}
                style={styles.iconButton}
              >
                <Glyph name="heart" size={22} />
              </Pressable>
              {isDesktop && (
                <Pressable
                  onPress={() =>
                    action('Directions', `Opening directions to ${base.name}.`)
                  }
                  style={styles.stallHeaderButton}
                >
                  <Glyph name="map" size={17} color="#FFFFFF" />
                  <Text style={styles.stallHeaderButtonText}>Find this stall</Text>
                </Pressable>
              )}
            </View>
          </View>
        </View>

        <View style={[styles.stallHeroWrap, { paddingHorizontal: inset }]}>
          <ImageBackground
            source={detail.hero}
            resizeMode="cover"
            imageStyle={styles.stallPageHeroImage}
            style={[
              styles.stallPageHero,
              isDesktop && styles.stallPageHeroDesktop,
            ]}
          >
            <LinearGradient
              colors={[
                'rgba(8,15,16,0.87)',
                'rgba(8,15,16,0.58)',
                'rgba(8,15,16,0.05)',
              ]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={[
                styles.stallPageHeroGradient,
                isDesktop && styles.stallPageHeroGradientDesktop,
              ]}
            >
              <View style={styles.stallHeroBadge}>
                <View style={styles.openDot} />
                <Text style={styles.stallHeroBadgeText}>
                  OPEN TODAY · {base.location.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.stallHeroBangla}>{detail.bangla}</Text>
              <Text
                style={[
                  styles.stallHeroTitle,
                  isDesktop && styles.stallHeroTitleDesktop,
                ]}
              >
                {base.name}
              </Text>
              <Text style={styles.stallHeroTagline}>{detail.tagline}</Text>
              <Text
                style={[
                  styles.stallHeroDescription,
                  isDesktop && styles.stallHeroDescriptionDesktop,
                ]}
              >
                {detail.description}
              </Text>
              <View style={styles.stallHeroActions}>
                <Pressable
                  onPress={() =>
                    action('Visit planned', `${base.name} added to your fair plan.`)
                  }
                  style={({ pressed }) => [
                    styles.primaryButton,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={styles.primaryButtonText}>Plan your visit</Text>
                  <Glyph name="arrow" size={18} color="#FFFFFF" />
                </Pressable>
                <View style={styles.stallHeroRating}>
                  <Glyph name="star" size={16} color={COLORS.gold} />
                  <Text style={styles.stallHeroRatingStrong}>{base.rating}</Text>
                  <Text style={styles.stallHeroRatingText}>
                    ({base.reviews} reviews)
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>

        <View style={[styles.stallStats, { paddingHorizontal: inset }]}>
          {[
            { label: 'HERITAGE', value: detail.founded },
            { label: 'COMMUNITY', value: detail.makers },
            { label: 'SIGNATURE', value: detail.material },
            { label: 'AT THE FAIR', value: detail.demo },
          ].map((stat) => (
            <View key={stat.label} style={styles.stallStat}>
              <Text style={styles.stallStatLabel}>{stat.label}</Text>
              <Text style={styles.stallStatValue}>{stat.value}</Text>
            </View>
          ))}
        </View>

        <View style={{ paddingHorizontal: inset }}>
          <StallVisualBanner1
            stallName={base.name}
            onClaimOffer={() =>
              action('Spot Discount Claimed', `Your ৳15 Lac spot offer code for ${base.name} has been generated: MELA-2026-${base.slug.toUpperCase()}`)
            }
          />
        </View>

        <View
          style={[
            styles.stallStorySection,
            { paddingHorizontal: inset },
            !isDesktop && styles.stallStorySectionMobile,
          ]}
        >
          <View style={styles.stallStoryHeading}>
            <Text style={styles.eyebrow}>ARCHITECTURAL HERITAGE</Text>
            <Text style={styles.stallSectionTitle}>Engineered with precision,{'\n'}built for generations.</Text>
          </View>
          <View style={styles.stallStoryCopyWrap}>
            <Text style={styles.stallStoryCopy}>{detail.story}</Text>
            <View style={styles.stallQuote}>
              <View style={[styles.stallQuoteMark, { backgroundColor: base.tone }]}>
                <Text style={styles.stallQuoteMarkText}>{base.initials}</Text>
              </View>
              <Text style={styles.stallQuoteText}>
                Committed to 100% earthquake-resistant structural safety, international acoustic glazing, and timely handover.
              </Text>
            </View>
          </View>
        </View>

        {/* Signature Developments & Floorplans Showcase */}
        <View style={[styles.stallProjectsSection, { paddingHorizontal: inset }]}>
          <View style={styles.projectsSectionHeader}>
            <View style={{ flex: 1 }}>
              <Text style={styles.eyebrow}>SIGNATURE DEVELOPMENTS</Text>
              <Text style={styles.sectionTitle}>Featured Residences & Landmarks</Text>
              <Text style={styles.sectionSubtitle}>
                Explore ongoing and ready developments by {base.name} featuring bespoke duplex penthouses and lakefront sky villas.
              </Text>
            </View>

            {/* Filter Pills */}
            <View style={styles.projectFilterRow}>
              <Pressable
                onPress={() => setProjectTypeFilter('all')}
                style={[
                  styles.projectFilterBtn,
                  projectTypeFilter === 'all' && styles.projectFilterBtnActive,
                ]}
              >
                <Text
                  style={[
                    styles.projectFilterBtnText,
                    projectTypeFilter === 'all' && styles.projectFilterBtnTextActive,
                  ]}
                >
                  All ({reStall.projects.length})
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setProjectTypeFilter('ready')}
                style={[
                  styles.projectFilterBtn,
                  projectTypeFilter === 'ready' && styles.projectFilterBtnActive,
                ]}
              >
                <Text
                  style={[
                    styles.projectFilterBtnText,
                    projectTypeFilter === 'ready' && styles.projectFilterBtnTextActive,
                  ]}
                >
                  Ready to Move
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setProjectTypeFilter('construction')}
                style={[
                  styles.projectFilterBtn,
                  projectTypeFilter === 'construction' && styles.projectFilterBtnActive,
                ]}
              >
                <Text
                  style={[
                    styles.projectFilterBtnText,
                    projectTypeFilter === 'construction' && styles.projectFilterBtnTextActive,
                  ]}
                >
                  Under Construction
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Projects Cards Grid */}
          <View style={styles.projectsGrid}>
            {filteredProjects.map((project) => (
              <View key={project.title} style={styles.projectCard}>
                <View style={styles.projectCardTopBar}>
                  <View
                    style={[
                      styles.projectStatusBadge,
                      project.status === 'Ready'
                        ? styles.statusReady
                        : styles.statusUnderConstruction,
                    ]}
                  >
                    <Text
                      style={[
                        styles.projectStatusText,
                        project.status === 'Ready'
                          ? styles.statusReadyText
                          : styles.statusUnderConstructionText,
                      ]}
                    >
                      {project.status.toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.projectPricePill}>
                    <Text style={styles.projectPriceText}>{project.priceRange}</Text>
                  </View>
                </View>

                <View style={styles.projectTitleBlock}>
                  <Text style={styles.projectTitleText}>{project.title}</Text>
                  <Text style={styles.projectTypeText}>{project.type}</Text>
                  <View style={styles.projectLocationRow}>
                    <Text style={styles.projectLocationIcon}>📍</Text>
                    <Text style={styles.projectLocationText} numberOfLines={1}>
                      {project.location}
                    </Text>
                  </View>
                </View>

                {/* Floor Plan Metrics Box */}
                <View style={styles.floorPlanMetricsBox}>
                  <View style={styles.metricItem}>
                    <Text style={styles.metricLabel}>BEDS</Text>
                    <Text style={styles.metricValue}>
                      {project.floorPlan.beds > 0 ? `${project.floorPlan.beds} BHK` : 'Grade-A'}
                    </Text>
                  </View>
                  <View style={styles.metricDivider} />
                  <View style={styles.metricItem}>
                    <Text style={styles.metricLabel}>BATHS</Text>
                    <Text style={styles.metricValue}>{project.floorPlan.baths} Baths</Text>
                  </View>
                  <View style={styles.metricDivider} />
                  <View style={styles.metricItem}>
                    <Text style={styles.metricLabel}>SIZE</Text>
                    <Text style={styles.metricValue}>{project.floorPlan.sqft} sqft</Text>
                  </View>
                  <View style={styles.metricDivider} />
                  <View style={styles.metricItem}>
                    <Text style={styles.metricLabel}>FACING</Text>
                    <Text style={styles.metricValue}>{project.floorPlan.facing}</Text>
                  </View>
                </View>

                {/* Highlights Tags */}
                <View style={styles.projectHighlightsRow}>
                  {project.highlights.map((h) => (
                    <View key={h} style={styles.highlightPill}>
                      <Text style={styles.highlightPillText}>✓ {h}</Text>
                    </View>
                  ))}
                </View>

                {/* Actions Row */}
                <View style={styles.projectCardActions}>
                  <Pressable
                    onPress={() => setSelectedFloorplanProject(project)}
                    style={styles.viewFloorplanBtn}
                  >
                    <Glyph name="craft" size={16} color={COLORS.ink} />
                    <Text style={styles.viewFloorplanBtnText}>View Floorplan Specs</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => openInquiryForm(project)}
                    style={styles.inquireProjectBtn}
                  >
                    <Text style={styles.inquireProjectBtnText}>Inquire Spot Price</Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Flight Renders & Image Grid Carousel */}
        <View style={{ paddingHorizontal: inset }}>
          <StallFlightImageCarousel stallName={base.name} />
        </View>

        {/* Pavilion Amenities & Booth Experience Section */}
        <View style={[styles.pavilionAmenitiesSection, { paddingHorizontal: inset }]}>
          <View style={styles.amenitiesHeader}>
            <Text style={styles.eyebrow}>INSIDE OUR PAVILION</Text>
            <Text style={styles.sectionTitle}>
              Experience {base.name} at {reStall.plot.split('·')[0].trim()}
            </Text>
            <Text style={styles.sectionSubtitle}>
              {reStall.boothType} · Featuring interactive architectural technologies and dedicated VIP hospitality suites.
            </Text>
          </View>

          <View style={styles.boothAmenitiesGrid}>
            {reStall.amenities.map((amenity, idx) => (
              <View key={idx} style={styles.boothAmenityCard}>
                <View style={[styles.boothAmenityIconWrap, { backgroundColor: base.tone }]}>
                  <Text style={styles.boothAmenityIcon}>
                    {idx === 0 ? '🏛️' : idx === 1 ? '🥽' : idx === 2 ? '☕' : '📐'}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.boothAmenityTitle}>{amenity}</Text>
                  <Text style={styles.boothAmenityDesc}>
                    {idx === 0
                      ? 'Detailed physical model plinth with interactive touch-controlled illumination.'
                      : idx === 1
                      ? 'Oculus VR headsets letting you step inside private penthouses and sky terraces.'
                      : idx === 2
                      ? 'Complimentary Illy barista coffee, artisan refreshments, and air-conditioned meeting pods.'
                      : 'Private consultation desks with structural architects for custom floorplan reviews.'}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={{ paddingHorizontal: inset }}>
          <View style={styles.stallOffer}>
            <View style={styles.stallOfferIcon}>
              <Glyph name="ticket" size={25} color={COLORS.coral} />
            </View>
            <View style={styles.stallOfferCopy}>
              <Text style={styles.stallOfferEyebrow}>MELA FEST EXCLUSIVE</Text>
              <Text style={styles.stallOfferTitle}>{detail.offer}</Text>
              <Text style={styles.stallOfferText}>
                Show this page at the counter. Valid during fair opening hours.
              </Text>
            </View>
            <Pressable
              onPress={() => action('Offer saved', 'Your fair offer is ready.')}
              style={({ pressed }) => [
                styles.offerSaveButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.offerSaveButtonText}>Save offer</Text>
            </Pressable>
          </View>
        </View>

        {/* 3D Virtual Walkthrough Visual Banner 2 */}
        <View style={{ paddingHorizontal: inset }}>
          <StallVisualBanner2
            stallName={base.name}
            stallSlug={slug}
            onLaunchVR={() =>
              action('3D VR Pavilion Walkthrough', `Launching 3D VR Walkthrough engine for ${base.name}...`)
            }
          />
        </View>

        <View style={{ paddingHorizontal: inset }}>
          <View style={styles.stallVisitSection}>
          <View style={styles.stallVisitTopHeader}>
            <View style={{ flex: 1 }}>
              <Text style={styles.eyebrow}>PLAN YOUR VISIT</Text>
              <Text style={styles.stallSectionTitle}>Meet us at {base.location}</Text>
              <Text style={styles.stallVisitSubtitle}>
                Experience {base.name} in person at our fairgrounds pavilion. Meet our principal architects, view physical scale models, and enjoy exclusive on-site spot booking advantages.
              </Text>
            </View>
            <View style={styles.liveOpenBadge}>
              <View style={styles.openDot} />
              <Text style={styles.liveOpenText}>OPEN TODAY · NO APPOINTMENT NEEDED</Text>
            </View>
          </View>

          <View style={styles.stallVisitFactsGrid}>
            <View style={styles.stallVisitFactCard}>
              <View style={styles.factIconWrap}>
                <Glyph name="clock" size={20} color={COLORS.coral} />
              </View>
              <View style={styles.factTextCol}>
                <Text style={styles.stallVisitFactLabel}>OPENING HOURS</Text>
                <Text style={styles.stallVisitFactValue}>11:00 AM – 9:00 PM</Text>
                <Text style={styles.factHint}>Open all fair days</Text>
              </View>
            </View>

            <View style={styles.stallVisitFactCard}>
              <View style={styles.factIconWrap}>
                <Glyph name="event" size={20} color={COLORS.coral} />
              </View>
              <View style={styles.factTextCol}>
                <Text style={styles.stallVisitFactLabel}>TODAY’S SESSION</Text>
                <Text style={styles.stallVisitFactValue}>{detail.demo}</Text>
                <Text style={styles.factHint}>Live demonstration at booth counter</Text>
              </View>
            </View>

            <View style={styles.stallVisitFactCard}>
              <View style={styles.factIconWrap}>
                <Glyph name="map" size={20} color={COLORS.coral} />
              </View>
              <View style={styles.factTextCol}>
                <Text style={styles.stallVisitFactLabel}>PAVILION PLOT</Text>
                <Text style={styles.stallVisitFactValue}>{base.location.split('·')[0].trim()}</Text>
                <Text style={styles.factHint}>Near Gate 1 & Central Plaza</Text>
              </View>
            </View>

            <View style={styles.stallVisitFactCard}>
              <View style={styles.factIconWrap}>
                <Glyph name="craft" size={20} color={COLORS.coral} />
              </View>
              <View style={styles.factTextCol}>
                <Text style={styles.stallVisitFactLabel}>CONSULTANTS</Text>
                <Text style={styles.stallVisitFactValue}>{detail.makers}</Text>
                <Text style={styles.factHint}>1-on-1 advisory available</Text>
              </View>
            </View>
          </View>

          <View style={styles.stallVisitActions}>
            <Pressable
              onPress={() =>
                action(
                  'VIP Fast-Track Pass',
                  `Your priority pass for ${base.name} at ${base.location} has been confirmed. Present this at the pavilion desk for express entry.`
                )
              }
              style={styles.directionButtonLight}
            >
              <Glyph name="ticket" size={18} color="#FFFFFF" />
              <Text style={styles.directionButtonText}>Claim VIP Pass</Text>
            </Pressable>
            <Pressable
              onPress={() => action('Call stall', detail.phone)}
              style={styles.callButton}
            >
              <Text style={styles.callButtonText}>Call stall: {detail.phone}</Text>
            </Pressable>
          </View>
        </View>
      </View>

        {/* On-Site Senior Property Director / Lead Consultant Suite */}
        <View style={{ paddingHorizontal: inset }}>
          <View
            style={[
              styles.stallDirectorSection,
              !isDesktop && styles.stallDirectorSectionMobile,
            ]}
          >
          <View style={styles.stallDirectorProfile}>
            <View style={[styles.stallDirectorAvatar, { backgroundColor: base.tone }]}>
              <Text style={styles.stallDirectorInitials}>
                {reStall.agent.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)}
              </Text>
            </View>
            <View style={styles.stallDirectorDetails}>
              <View style={styles.agentDutyRow}>
                <View style={styles.openDot} />
                <Text style={styles.agentDutyText}>ON-SITE TODAY · BOOTH CONSULTANT</Text>
              </View>
              <Text style={styles.stallDirectorName}>{reStall.agent.name}</Text>
              <Text style={styles.stallDirectorTitle}>{reStall.agent.title}</Text>
              <Text style={styles.stallDirectorContact}>
                📞 {reStall.agent.phone} · ✉️ {reStall.agent.email}
              </Text>
            </View>
          </View>

          <View style={styles.stallDirectorCta}>
            <Text style={styles.directorCtaHint}>
              Complimentary 1-on-1 advisory on fair spot discounts, customized duplex floor plans, and bank home loan pre-approvals up to 80%.
            </Text>
            <View style={styles.directorBtnRow}>
              <Pressable
                onPress={() =>
                  action(
                    'Consultation Booked',
                    `Your private consultation with ${reStall.agent.name} (${base.name}) has been scheduled at ${base.location.split('·')[0].trim()}.`
                  )
                }
                style={styles.directorPrimaryBtn}
              >
                <Glyph name="event" size={17} color="#FFFFFF" />
                <Text style={styles.directorPrimaryBtnText}>Book 1-on-1 Consultation</Text>
              </Pressable>
              <Pressable
                onPress={() => action('Call Consultant', reStall.agent.phone)}
                style={styles.directorCallBtn}
              >
                <Text style={styles.directorCallBtnText}>Call Consultant</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>

        <View style={styles.stallPageFooter}>
          <Pressable onPress={onBack} style={styles.logoLockup}>
            <View style={[styles.footerMark, { backgroundColor: base.tone }]}>
              <Text style={styles.footerMarkText}>{base.initials}</Text>
            </View>
            <Text style={styles.stallFooterBrand}>{base.name} Pavilion</Text>
          </Pressable>
          <Text style={styles.copyright}>
            Official Expo Pavilion · {base.location} · Spot Advisory: {detail.phone}
          </Text>
        </View>
      </ScrollView>

      {/* Floorplan Specifications Interactive Modal */}
      <Modal
        visible={!!selectedFloorplanProject}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedFloorplanProject(null)}
      >
        <View style={styles.floorplanModalBackdrop}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setSelectedFloorplanProject(null)}
          />
          {selectedFloorplanProject && (
            <View style={styles.floorplanModalCard}>
              <View style={styles.floorplanModalHeader}>
                <View style={{ flex: 1 }}>
                  <View style={styles.floorplanModalBadgeRow}>
                    <View
                      style={[
                        styles.projectStatusBadge,
                        selectedFloorplanProject.status === 'Ready'
                          ? styles.statusReady
                          : styles.statusUnderConstruction,
                      ]}
                    >
                      <Text
                        style={[
                          styles.projectStatusText,
                          selectedFloorplanProject.status === 'Ready'
                            ? styles.statusReadyText
                            : styles.statusUnderConstructionText,
                        ]}
                      >
                        {selectedFloorplanProject.status.toUpperCase()}
                      </Text>
                    </View>
                    <Text style={styles.floorplanModalType}>
                      {selectedFloorplanProject.type}
                    </Text>
                  </View>
                  <Text style={styles.floorplanModalTitle}>
                    {selectedFloorplanProject.title}
                  </Text>
                  <Text style={styles.floorplanModalSubtitle}>
                    📍 {selectedFloorplanProject.location} · {base.name}
                  </Text>
                </View>
                <Pressable
                  onPress={() => setSelectedFloorplanProject(null)}
                  style={styles.floorplanModalCloseBtn}
                >
                  <Text style={styles.floorplanModalCloseText}>✕</Text>
                </Pressable>
              </View>

              {/* Blueprint / Architectural Spec Graphic Area */}
              <View style={styles.floorplanBlueprintArea}>
                <LinearGradient
                  colors={['#0F2027', '#203A43', '#2C5364']}
                  style={styles.blueprintGradient}
                >
                  <View style={styles.blueprintGridLines}>
                    <View style={styles.blueprintCompass}>
                      <Text style={styles.blueprintCompassText}>
                        🧭 Facing: {selectedFloorplanProject.floorPlan.facing}
                      </Text>
                    </View>
                    <View style={styles.blueprintCenterSchematic}>
                      <Text style={styles.blueprintSchematicIcon}>📐</Text>
                      <Text style={styles.blueprintSchematicTitle}>
                        ARCHITECTURAL SPECIFICATION
                      </Text>
                      <Text style={styles.blueprintSchematicDimension}>
                        {selectedFloorplanProject.floorPlan.sqft} SQ.FT GROSS AREA
                      </Text>
                    </View>
                    <View style={styles.blueprintTagBadge}>
                      <Text style={styles.blueprintTagText}>
                        {selectedFloorplanProject.priceRange}
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>

              {/* Key Floorplan Metrics */}
              <View style={styles.floorplanSpecsGrid}>
                <View style={styles.floorplanSpecItem}>
                  <Text style={styles.floorplanSpecLabel}>CONFIGURATION</Text>
                  <Text style={styles.floorplanSpecValue}>
                    {selectedFloorplanProject.floorPlan.beds > 0
                      ? `${selectedFloorplanProject.floorPlan.beds} Bed Duplex/Flat`
                      : 'Grade-A Open Plan'}
                  </Text>
                </View>
                <View style={styles.floorplanSpecItem}>
                  <Text style={styles.floorplanSpecLabel}>BATHROOMS</Text>
                  <Text style={styles.floorplanSpecValue}>
                    {selectedFloorplanProject.floorPlan.baths} Attached + Powder
                  </Text>
                </View>
                <View style={styles.floorplanSpecItem}>
                  <Text style={styles.floorplanSpecLabel}>CARPET AREA</Text>
                  <Text style={styles.floorplanSpecValue}>
                    {selectedFloorplanProject.floorPlan.sqft} SQFT
                  </Text>
                </View>
                <View style={styles.floorplanSpecItem}>
                  <Text style={styles.floorplanSpecLabel}>NATURAL LIGHT</Text>
                  <Text style={styles.floorplanSpecValue}>
                    {selectedFloorplanProject.floorPlan.facing}
                  </Text>
                </View>
              </View>

              {/* Architectural Highlights */}
              <View style={styles.floorplanHighlightsBox}>
                <Text style={styles.floorplanHighlightsHeading}>
                  KEY ARCHITECTURAL HIGHLIGHTS
                </Text>
                <View style={styles.floorplanHighlightsList}>
                  {selectedFloorplanProject.highlights.map((h: string, idx: number) => (
                    <View key={idx} style={styles.floorplanHighlightItem}>
                      <Text style={styles.floorplanCheckMark}>✓</Text>
                      <Text style={styles.floorplanHighlightItemText}>{h}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Modal Actions */}
              <View style={styles.floorplanModalActions}>
                <Pressable
                  onPress={() => {
                    const proj = selectedFloorplanProject;
                    setSelectedFloorplanProject(null);
                    action(
                      'Brochure Sent',
                      `Complete floorplan specs and architectural brochure for ${proj.title} has been sent to your registered contact.`
                    );
                  }}
                  style={styles.floorplanModalSecondaryBtn}
                >
                  <Text style={styles.floorplanModalSecondaryBtnText}>
                    Download Brochure (PDF)
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    const proj = selectedFloorplanProject;
                    setSelectedFloorplanProject(null);
                    openInquiryForm(proj);
                  }}
                  style={styles.floorplanModalInquireBtn}
                >
                  <Text style={styles.floorplanModalInquireBtnText}>
                    Inquire Spot Price
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      </Modal>

      {/* Dedicated Spot Price Inquiry Form Modal */}
      <Modal
        visible={!!selectedInquiryProject}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedInquiryProject(null)}
      >
        <View style={styles.floorplanModalBackdrop}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setSelectedInquiryProject(null)}
          />
          {selectedInquiryProject && (
            <View style={styles.inquiryModalCard}>
              {inquirySubmitted ? (
                <View style={styles.inquirySuccessBox}>
                  <View style={styles.inquirySuccessIconWrap}>
                    <Text style={styles.inquirySuccessIcon}>🎉</Text>
                  </View>
                  <Text style={styles.inquirySuccessTitle}>Spot Price Request Dispatched!</Text>
                  <Text style={styles.inquirySuccessSubtitle}>
                    Thank you, {inquiryName || 'Valued Visitor'}. Your tailored spot pricing breakdown for{' '}
                    <Text style={{ fontWeight: '800', color: COLORS.ink }}>
                      {selectedInquiryProject.title}
                    </Text>{' '}
                    has been submitted to {base.name}.
                  </Text>
                  <View style={styles.inquirySuccessDetailCard}>
                    <Text style={styles.inquirySuccessDetailText}>
                      👤 Assigned Consultant: {reStall.agent.name} ({reStall.agent.title})
                    </Text>
                    <Text style={styles.inquirySuccessDetailText}>
                      📍 Booth Location: {base.location.split('·')[0].trim()}
                    </Text>
                    <Text style={styles.inquirySuccessDetailText}>
                      📱 Confirmation dispatched to: {inquiryPhone}
                    </Text>
                  </View>
                  <View style={styles.inquirySuccessActions}>
                    <Pressable
                      onPress={() => action('Call Consultant', reStall.agent.phone)}
                      style={styles.inquiryCallAgentBtn}
                    >
                      <Glyph name="event" size={16} color="#FFFFFF" />
                      <Text style={styles.inquiryCallAgentBtnText}>
                        Call {reStall.agent.name}
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => setSelectedInquiryProject(null)}
                      style={styles.inquirySuccessDoneBtn}
                    >
                      <Text style={styles.inquirySuccessDoneBtnText}>Done</Text>
                    </Pressable>
                  </View>
                </View>
              ) : (
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.inquiryFormContent}>
                  {/* Modal Header */}
                  <View style={styles.inquiryModalHeader}>
                    <View style={{ flex: 1, paddingRight: 10 }}>
                      <View style={styles.inquiryHeaderBadge}>
                        <Text style={styles.inquiryHeaderBadgeText}>FAIR SPOT PRICE INQUIRY</Text>
                      </View>
                      <Text style={styles.inquiryModalTitle}>
                        {selectedInquiryProject.title}
                      </Text>
                      <Text style={styles.inquiryModalSubtitle}>
                        {base.name} · {selectedInquiryProject.location}
                      </Text>
                    </View>
                    <Pressable
                      onPress={() => setSelectedInquiryProject(null)}
                      style={styles.floorplanModalCloseBtn}
                    >
                      <Text style={styles.floorplanModalCloseText}>✕</Text>
                    </Pressable>
                  </View>

                  {/* Spot Rate & Fair Incentive Box */}
                  <View style={styles.inquiryRateBanner}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.inquiryRateLabel}>INDICATIVE EXPO RATE</Text>
                      <Text style={styles.inquiryRateValue}>{selectedInquiryProject.priceRange}</Text>
                    </View>
                    <View style={styles.inquiryDiscountPill}>
                      <Text style={styles.inquiryDiscountText}>⚡ Spot Concession Eligible</Text>
                    </View>
                  </View>

                  {/* Form Inputs */}
                  <View style={styles.inquiryFieldsWrap}>
                    <View style={styles.inquiryFieldGroup}>
                      <Text style={styles.inquiryInputLabel}>FULL NAME *</Text>
                      <TextInput
                        value={inquiryName}
                        onChangeText={setInquiryName}
                        placeholder="e.g. Tanvir Hossain"
                        placeholderTextColor={COLORS.muted}
                        style={styles.inquiryTextInput}
                      />
                    </View>

                    <View style={styles.inquiryFieldGroup}>
                      <Text style={styles.inquiryInputLabel}>PHONE / WHATSAPP NUMBER *</Text>
                      <TextInput
                        value={inquiryPhone}
                        onChangeText={setInquiryPhone}
                        placeholder="e.g. +880 1712 345678"
                        keyboardType="phone-pad"
                        placeholderTextColor={COLORS.muted}
                        style={styles.inquiryTextInput}
                      />
                    </View>

                    <View style={styles.inquiryFieldGroup}>
                      <Text style={styles.inquiryInputLabel}>EMAIL ADDRESS (OPTIONAL)</Text>
                      <TextInput
                        value={inquiryEmail}
                        onChangeText={setInquiryEmail}
                        placeholder="e.g. name@domain.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor={COLORS.muted}
                        style={styles.inquiryTextInput}
                      />
                    </View>

                    {/* Preferred Consultation Time Slot */}
                    <View style={styles.inquiryFieldGroup}>
                      <Text style={styles.inquiryInputLabel}>PREFERRED CONTACT TIMING</Text>
                      <View style={styles.inquirySlotRow}>
                        {[
                          { key: 'immediate', label: 'Immediate' },
                          { key: 'today_eve', label: 'Today (4-7 PM)' },
                          { key: 'tomorrow_booth', label: 'At Booth Tomorrow' },
                        ].map((slot) => (
                          <Pressable
                            key={slot.key}
                            onPress={() => setInquiryTimeSlot(slot.key)}
                            style={[
                              styles.inquirySlotChip,
                              inquiryTimeSlot === slot.key && styles.inquirySlotChipActive,
                            ]}
                          >
                            <Text
                              style={[
                                styles.inquirySlotChipText,
                                inquiryTimeSlot === slot.key && styles.inquirySlotChipTextActive,
                              ]}
                            >
                              {slot.label}
                            </Text>
                          </Pressable>
                        ))}
                      </View>
                    </View>

                    {/* Specific Requirements / Notes */}
                    <View style={styles.inquiryFieldGroup}>
                      <Text style={styles.inquiryInputLabel}>SPECIFIC QUESTIONS / CUSTOM FLOORPLAN REQUEST</Text>
                      <TextInput
                        value={inquiryNotes}
                        onChangeText={setInquiryNotes}
                        placeholder="e.g. Looking for south-facing high floor unit with parking..."
                        placeholderTextColor={COLORS.muted}
                        multiline
                        numberOfLines={3}
                        style={[styles.inquiryTextInput, styles.inquiryTextArea]}
                      />
                    </View>
                  </View>

                  {/* Assigned Pavilion Consultant Bar */}
                  <View style={styles.inquiryAssignedConsultant}>
                    <View style={[styles.inquiryConsultantAvatar, { backgroundColor: base.tone }]}>
                      <Text style={styles.inquiryConsultantInitials}>
                        {reStall.agent.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.inquiryConsultantName}>{reStall.agent.name}</Text>
                      <Text style={styles.inquiryConsultantTitle}>{reStall.agent.title} · {base.name}</Text>
                    </View>
                  </View>

                  {/* Submit CTA */}
                  <View style={styles.inquirySubmitRow}>
                    <Pressable
                      onPress={() => {
                        if (!inquiryName.trim() || !inquiryPhone.trim()) {
                          Alert.alert('Required Fields', 'Please provide your full name and phone number to receive the spot price quote.');
                          return;
                        }
                        setInquirySubmitted(true);
                      }}
                      style={styles.inquirySubmitBtn}
                    >
                      <Glyph name="ticket" size={17} color="#FFFFFF" />
                      <Text style={styles.inquirySubmitBtnText}>Get Spot Price Quote</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => setSelectedInquiryProject(null)}
                      style={styles.inquiryCancelBtn}
                    >
                      <Text style={styles.inquiryCancelBtnText}>Cancel</Text>
                    </Pressable>
                  </View>
                </ScrollView>
              )}
            </View>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function EnclaveCarousel({
  items,
  cardWidth,
  horizontalInset,
  isDesktop,
  onNavigateStall,
}: {
  items: readonly (typeof stalls)[number][];
  cardWidth: number;
  horizontalInset: number;
  isDesktop: boolean;
  onNavigateStall: (slug: keyof typeof stallPageDetails) => void;
}) {
  const itemsPerPage = isDesktop ? 3 : 1;
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const goToPage = (pageIndex: number, direction: 'next' | 'prev' = 'next') => {
    const nextPageIndex = (pageIndex + totalPages) % totalPages;
    const fromX = direction === 'next' ? 24 : -24;

    Animated.parallel([
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: -fromX,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    setCurrentPage(nextPageIndex);
  };

  const handlePrev = () => goToPage(currentPage - 1, 'prev');
  const handleNext = () => goToPage(currentPage + 1, 'next');

  // Auto-advance slideshow every 5 seconds to next 3 cards
  useEffect(() => {
    const timer = setInterval(() => {
      goToPage(currentPage + 1, 'next');
    }, 5000);
    return () => clearInterval(timer);
  }, [currentPage, totalPages]);

  const currentItems = useMemo(() => {
    const start = currentPage * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [currentPage, itemsPerPage, items]);

  return (
    <View
      style={[
        styles.section,
        styles.festivalPanel,
        styles.festivalPanelClay,
      ]}
    >
      <BuntingStrip />
      <View style={[styles.enclaveHeaderRow, { paddingHorizontal: horizontalInset }]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.eyebrow}>HANDCRAFTED ARCHITECTURE</Text>
          <Text style={styles.sectionTitle}>Signature Developer Enclaves</Text>
        </View>

        {/* Slideshow Controls */}
        <View style={styles.slideshowControls}>
          <View style={styles.pageBadge}>
            <Text style={styles.pageBadgeText}>
              SET {currentPage + 1} OF {totalPages}
            </Text>
          </View>
          <Pressable
            accessibilityLabel="Previous 3 residences"
            onPress={handlePrev}
            style={({ pressed }) => [
              styles.sliderArrowBtn,
              pressed && styles.pressed,
            ]}
          >
            <View style={{ transform: [{ rotate: '180deg' }] }}>
              <Glyph name="arrow" size={16} color={COLORS.ink} />
            </View>
          </Pressable>
          <Pressable
            accessibilityLabel="Next 3 residences"
            onPress={handleNext}
            style={({ pressed }) => [
              styles.sliderArrowBtn,
              styles.sliderArrowBtnPrimary,
              pressed && styles.pressed,
            ]}
          >
            <Glyph name="arrow" size={16} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>

      {/* 3 Cards Slide Show View */}
      <Animated.View
        style={[
          styles.enclaveGridRow,
          isDesktop && styles.enclaveGridRowDesktop,
          {
            paddingHorizontal: horizontalInset,
            opacity: fadeAnim,
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        {currentItems.map((item) => (
          <StallCard
            key={item.slug}
            item={item}
            width={cardWidth}
            onVisit={onNavigateStall}
          />
        ))}
      </Animated.View>

      {/* Bottom Pagination Indicators */}
      <View style={styles.sliderDotsRow}>
        {Array.from({ length: totalPages }).map((_, idx) => {
          const active = idx === currentPage;
          return (
            <Pressable
              key={idx}
              onPress={() => goToPage(idx, idx > currentPage ? 'next' : 'prev')}
              style={({ pressed }) => [
                styles.sliderDot,
                active && styles.sliderDotActive,
                pressed && styles.pressed,
              ]}
            >
              {active && <View style={styles.sliderDotInner} />}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function DealsCarousel({
  items,
  dealWidth,
  horizontalInset,
  isDesktop,
  onNavigateStall,
}: {
  items: readonly (typeof deals)[number][];
  dealWidth: number;
  horizontalInset: number;
  isDesktop: boolean;
  onNavigateStall?: (slug: keyof typeof stallPageDetails) => void;
}) {
  const itemsPerPage = isDesktop ? 4 : 1;
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const goToPage = (pageIndex: number, direction: 'next' | 'prev' = 'next') => {
    const nextPageIndex = (pageIndex + totalPages) % totalPages;
    const fromX = direction === 'next' ? 24 : -24;

    Animated.parallel([
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: -fromX,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    setCurrentPage(nextPageIndex);
  };

  const handlePrev = () => goToPage(currentPage - 1, 'prev');
  const handleNext = () => goToPage(currentPage + 1, 'next');

  // Auto-advance slideshow every 5 seconds to next 4 cards
  useEffect(() => {
    const timer = setInterval(() => {
      goToPage(currentPage + 1, 'next');
    }, 5000);
    return () => clearInterval(timer);
  }, [currentPage, totalPages]);

  const currentItems = useMemo(() => {
    const start = currentPage * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [currentPage, itemsPerPage, items]);

  return (
    <View
      style={[
        styles.section,
        styles.festivalPanel,
        styles.festivalPanelSand,
      ]}
    >
      <BuntingStrip />
      <View style={[styles.enclaveHeaderRow, { paddingHorizontal: horizontalInset }]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.eyebrow}>EXPO SPECIAL PRIVILEGES</Text>
          <Text style={styles.sectionTitle}>Spot Property Booking Offers</Text>
        </View>

        {/* Slideshow Controls */}
        <View style={styles.slideshowControls}>
          <View style={styles.pageBadge}>
            <Text style={styles.pageBadgeText}>
              SET {currentPage + 1} OF {totalPages}
            </Text>
          </View>
          <Pressable
            accessibilityLabel="Previous property offers"
            onPress={handlePrev}
            style={({ pressed }) => [
              styles.sliderArrowBtn,
              pressed && styles.pressed,
            ]}
          >
            <View style={{ transform: [{ rotate: '180deg' }] }}>
              <Glyph name="arrow" size={16} color={COLORS.ink} />
            </View>
          </Pressable>
          <Pressable
            accessibilityLabel="Next property offers"
            onPress={handleNext}
            style={({ pressed }) => [
              styles.sliderArrowBtn,
              styles.sliderArrowBtnPrimary,
              pressed && styles.pressed,
            ]}
          >
            <Glyph name="arrow" size={16} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>

      {/* 4 Cards Slide Show View */}
      <Animated.View
        style={[
          styles.enclaveGridRow,
          isDesktop && styles.enclaveGridRowDesktop,
          {
            paddingHorizontal: horizontalInset,
            opacity: fadeAnim,
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        {currentItems.map((item) => (
          <DealCard
            key={item.name}
            item={item}
            width={dealWidth}
            onNavigateStall={onNavigateStall}
          />
        ))}
      </Animated.View>

      {/* Bottom Pagination Indicators */}
      <View style={styles.sliderDotsRow}>
        {Array.from({ length: totalPages }).map((_, idx) => {
          const active = idx === currentPage;
          return (
            <Pressable
              key={idx}
              onPress={() => goToPage(idx, idx > currentPage ? 'next' : 'prev')}
              style={({ pressed }) => [
                styles.sliderDot,
                active && styles.sliderDotActive,
                pressed && styles.pressed,
              ]}
            >
              {active && <View style={styles.sliderDotInner} />}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
function SearchModal({
  visible,
  onClose,
  onNavigateStall,
  isDesktop,
}: {
  visible: boolean;
  onClose: () => void;
  onNavigateStall: (slug: keyof typeof stallPageDetails) => void;
  isDesktop: boolean;
}) {
  const [query, setQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<'all' | 'stalls' | 'deals' | 'fun'>('all');

  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();

    // Stalls & Pavilions
    const matchingStalls = stalls
      .filter(
        (s) =>
          !q ||
          s.name.toLowerCase().includes(q) ||
          s.location.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q),
      )
      .map((s) => ({
        type: 'stall' as const,
        id: s.slug,
        title: s.name,
        subtitle: `${s.location} · ${s.category}`,
        tag: '🏢 STALL',
        tagColor: COLORS.coral,
        slug: s.slug as keyof typeof stallPageDetails,
        image: s.booth,
      }));

    // Deals
    const matchingDeals = deals
      .filter(
        (d) =>
          !q ||
          d.name.toLowerCase().includes(q) ||
          d.brand.toLowerCase().includes(q) ||
          d.discount.toLowerCase().includes(q),
      )
      .map((d) => ({
        type: 'deal' as const,
        id: d.name,
        title: d.name,
        subtitle: `${d.brand} · ${d.discount} · ${d.price}`,
        tag: '💎 SPOT OFFER',
        tagColor: COLORS.gold,
        image: d.image,
      }));

    // Fun & Attractions
    const matchingFun = games
      .filter(
        (g) =>
          !q ||
          g.name.toLowerCase().includes(q) ||
          g.bangla.includes(q) ||
          g.meta.toLowerCase().includes(q) ||
          g.badge.toLowerCase().includes(q),
      )
      .map((g) => ({
        type: 'fun' as const,
        id: g.name,
        title: `${g.name} (${g.bangla})`,
        subtitle: `${g.meta} · ${g.price} · ${g.badge}`,
        tag: '🎡 ATTRACTION',
        tagColor: g.color || '#00E676',
        emoji: g.symbol,
      }));

    const combined: Array<{
      type: 'stall' | 'deal' | 'fun';
      id: string;
      title: string;
      subtitle: string;
      tag: string;
      tagColor: string;
      slug?: keyof typeof stallPageDetails;
      image?: any;
      emoji?: string;
    }> = [];

    if (selectedCat === 'all' || selectedCat === 'stalls') combined.push(...matchingStalls);
    if (selectedCat === 'all' || selectedCat === 'deals') combined.push(...matchingDeals);
    if (selectedCat === 'all' || selectedCat === 'fun') combined.push(...matchingFun);

    return combined;
  }, [query, selectedCat]);

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <View style={[styles.modalDialog, isDesktop && styles.modalDialogDesktop]}>
          {/* Header */}
          <View style={styles.modalHeaderRow}>
            <View style={styles.modalSearchBarWrap}>
              <Glyph name="search" size={20} color={COLORS.navy} />
              <TextInput
                style={styles.modalSearchInput}
                placeholder="Search pavilions, deals, stalls, pitha, fuchka..."
                placeholderTextColor="#8A9BA8"
                value={query}
                onChangeText={setQuery}
                autoFocus
              />
              {query.length > 0 && (
                <Pressable onPress={() => setQuery('')} style={styles.modalClearBtn}>
                  <Text style={styles.modalClearBtnText}>✕</Text>
                </Pressable>
              )}
            </View>
            <Pressable onPress={onClose} style={styles.modalCloseBtn}>
              <Text style={styles.modalCloseBtnText}>✕</Text>
            </Pressable>
          </View>

          {/* Categories */}
          <View style={styles.modalFilterRow}>
            {[
              { id: 'all', label: `All (${filteredResults.length})` },
              { id: 'stalls', label: '🏢 Pavilions & Stalls' },
              { id: 'deals', label: '💎 Spot Deals' },
              { id: 'fun', label: '🎡 Rides & Food' },
            ].map((cat) => (
              <Pressable
                key={cat.id}
                onPress={() => setSelectedCat(cat.id as any)}
                style={[
                  styles.modalFilterChip,
                  selectedCat === cat.id && styles.modalFilterChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.modalFilterChipText,
                    selectedCat === cat.id && styles.modalFilterChipTextActive,
                  ]}
                >
                  {cat.label}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Trending Suggestions if query empty */}
          {query.length === 0 && (
            <View style={styles.modalTrendingWrap}>
              <Text style={styles.modalTrendingTitle}>TRENDING SEARCHES:</Text>
              <View style={styles.modalTrendingChips}>
                {[
                  'Shanta Pinnacle',
                  'Nagordola Ride',
                  '৳15L Cashback',
                  'Fuchka & Chotpoti',
                  'Sheltech Elysium',
                ].map((tag) => (
                  <Pressable
                    key={tag}
                    onPress={() => setQuery(tag)}
                    style={styles.modalTrendChip}
                  >
                    <Text style={styles.modalTrendChipText}>✦ {tag}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          {/* Results List */}
          <ScrollView style={styles.modalResultsList} showsVerticalScrollIndicator={false}>
            {filteredResults.length === 0 ? (
              <View style={styles.modalEmptyState}>
                <Text style={styles.modalEmptyEmoji}>🔍</Text>
                <Text style={styles.modalEmptyTitle}>No results found for "{query}"</Text>
                <Text style={styles.modalEmptySubtitle}>
                  Try searching for Shanta, Sheltech, Nagordola, or Pitha
                </Text>
              </View>
            ) : (
              filteredResults.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() => {
                    onClose();
                    if (item.type === 'stall' && item.slug) {
                      onNavigateStall(item.slug);
                    } else if (item.type === 'deal') {
                      Alert.alert(item.title, `Spot offer details:\n${item.subtitle}`);
                    } else {
                      Alert.alert(item.title, item.subtitle);
                    }
                  }}
                  style={({ pressed }) => [
                    styles.modalResultCard,
                    pressed && styles.modalResultCardPressed,
                  ]}
                >
                  {item.image ? (
                    <Image source={item.image} style={styles.modalResultImg} />
                  ) : (
                    <View style={styles.modalResultEmojiBox}>
                      <Text style={{ fontSize: 24 }}>{item.emoji || '🎪'}</Text>
                    </View>
                  )}
                  <View style={{ flex: 1 }}>
                    <View style={styles.modalResultTopRow}>
                      <View
                        style={[
                          styles.modalResultBadge,
                          { backgroundColor: item.tagColor },
                        ]}
                      >
                        <Text style={styles.modalResultBadgeText}>{item.tag}</Text>
                      </View>
                    </View>
                    <Text style={styles.modalResultTitle} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text style={styles.modalResultSubtitle} numberOfLines={1}>
                      {item.subtitle}
                    </Text>
                  </View>
                  <View style={styles.modalResultArrow}>
                    <Glyph name="arrow" size={16} color={COLORS.navy} />
                  </View>
                </Pressable>
              ))
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

function CartPassesModal({
  visible,
  onClose,
  onNavigateStall,
  isDesktop,
}: {
  visible: boolean;
  onClose: () => void;
  onNavigateStall: (slug: keyof typeof stallPageDetails) => void;
  isDesktop: boolean;
}) {
  const [passes, setPasses] = useState([
    {
      id: 'p1',
      title: 'Shanta Pinnacle VIP Buyer Pass',
      code: 'EXP-SHANTA-7721',
      brand: 'Shanta Holdings',
      plot: 'Plot A1 · Gulshan 2 Ave',
      slug: 'shanta-pinnacle' as keyof typeof stallPageDetails,
      benefit: 'Priority lounge entry + ৳15L spot cashback access',
    },
    {
      id: 'p2',
      title: 'Nagordola Priority FastTrack',
      code: 'MELA-NAGOR-409',
      brand: 'Amusement Arena',
      plot: 'Plot F1 · Fun Zone',
      benefit: 'Skip the standard line for traditional Ferris wheel ride',
    },
  ]);

  const handleRemove = (id: string) => {
    setPasses((prev) => prev.filter((p) => p.id !== id));
    Alert.alert('Pass Cancelled', 'Reservation removed from your wallet.');
  };

  const handleCopyCode = (code: string) => {
    Alert.alert('Pass Token Copied', `Token: ${code}\nPresent this code at the stall reception.`);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <View style={[styles.modalDialog, isDesktop && styles.modalDialogDesktop]}>
          <View style={styles.modalTopHeader}>
            <View>
              <Text style={styles.modalEyebrow}>EXPO WALLET &amp; RESERVATIONS</Text>
              <Text style={styles.modalMainTitle}>Your Fair Passes ({passes.length})</Text>
            </View>
            <Pressable onPress={onClose} style={styles.modalCloseBtn}>
              <Text style={styles.modalCloseBtnText}>✕</Text>
            </Pressable>
          </View>

          <ScrollView style={styles.modalResultsList} showsVerticalScrollIndicator={false}>
            {passes.length === 0 ? (
              <View style={styles.modalEmptyState}>
                <Text style={styles.modalEmptyEmoji}>🎟️</Text>
                <Text style={styles.modalEmptyTitle}>No active reservations</Text>
                <Text style={styles.modalEmptySubtitle}>
                  Explore stalls and claim spot booking privileges to add passes here.
                </Text>
              </View>
            ) : (
              passes.map((pass) => (
                <View key={pass.id} style={styles.passCard}>
                  <View style={styles.passHeader}>
                    <View style={styles.passBrandBadge}>
                      <Text style={styles.passBrandText}>{pass.brand}</Text>
                    </View>
                    <Text style={styles.passCode}>{pass.code}</Text>
                  </View>
                  <Text style={styles.passTitle}>{pass.title}</Text>
                  <Text style={styles.passPlot}>{pass.plot}</Text>
                  <View style={styles.passBenefitRow}>
                    <Text style={styles.passBenefitText}>✦ {pass.benefit}</Text>
                  </View>
                  <View style={styles.passActionsRow}>
                    <Pressable
                      onPress={() => handleCopyCode(pass.code)}
                      style={styles.passBtnSecondary}
                    >
                      <Text style={styles.passBtnSecondaryText}>📋 Copy Token</Text>
                    </Pressable>
                    {pass.slug && (
                      <Pressable
                        onPress={() => {
                          onClose();
                          onNavigateStall(pass.slug);
                        }}
                        style={styles.passBtnPrimary}
                      >
                        <Text style={styles.passBtnPrimaryText}>Visit Stall →</Text>
                      </Pressable>
                    )}
                    <Pressable
                      onPress={() => handleRemove(pass.id)}
                      style={styles.passBtnDelete}
                    >
                      <Text style={styles.passBtnDeleteText}>Cancel</Text>
                    </Pressable>
                  </View>
                </View>
              ))
            )}
          </ScrollView>

          <View style={styles.cartFooter}>
            <Text style={styles.cartFooterNote}>
              💡 Show pass tokens at developer pavilions to claim fairground privileges.
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function HomeScreen({
  onNavigateStall,
}: {
  onNavigateStall: (slug: keyof typeof stallPageDetails) => void;
}) {
  const { width } = useWindowDimensions();
  const [activeZone, setActiveZone] = useState('Mega brands');
  const [activeTab, setActiveTab] = useState('Home');
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [vendorPortalOpen, setVendorPortalOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);
  const isAllStallsHash = (hashStr: string) => {
    const clean = hashStr.toLowerCase().trim();
    return (
      clean === '#all-stall' ||
      clean === '#all-stalls' ||
      clean === '#/all-stall' ||
      clean === '#/all-stalls'
    );
  };

  const [allPavilionsOpen, setAllPavilionsOpen] = useState(() => {
    if (typeof window === 'undefined') return false;
    return isAllStallsHash(window.location.hash);
  });

  const openAllPavilions = () => {
    if (typeof window !== 'undefined' && !isAllStallsHash(window.location.hash)) {
      window.location.hash = 'all-stall';
    }
    setAllPavilionsOpen(true);
  };

  const closeAllPavilions = () => {
    if (typeof window !== 'undefined' && isAllStallsHash(window.location.hash)) {
      window.location.hash = '';
    }
    setAllPavilionsOpen(false);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleHash = () => {
      if (isAllStallsHash(window.location.hash)) {
        setAllPavilionsOpen(true);
      } else if (allPavilionsOpen && !window.location.hash.startsWith('#stall/')) {
        setAllPavilionsOpen(false);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const mainScrollRef = useRef<ScrollView>(null);

  const isDesktop = width >= 900;
  const horizontalInset = getSiteInset(width);
  const contentWidth =
    Math.min(width, SITE_MAX_WIDTH) - horizontalInset * 2;
  const cardWidth = useMemo(
    () =>
      isDesktop
        ? (contentWidth - 32) / 3
        : Math.min(width * 0.76, width >= 768 ? 300 : 292),
    [contentWidth, isDesktop, width],
  );
  const dealWidth = useMemo(
    () =>
      isDesktop
        ? (contentWidth - 48) / 4
        : Math.min(width * 0.72, 260),
    [contentWidth, isDesktop, width],
  );

  const notify = (title: string, message: string) => Alert.alert(title, message);

  const handleNavClick = (label: string) => {
    if (label === 'Explore' || label === 'Fair map') {
      mainScrollRef.current?.scrollTo({ y: 560, animated: true });
    } else if (label === 'Pavilions') {
      mainScrollRef.current?.scrollTo({ y: 1300, animated: true });
    } else if (label === 'Local Haat') {
      mainScrollRef.current?.scrollTo({ y: 1950, animated: true });
    } else if (label === 'Events') {
      mainScrollRef.current?.scrollTo({ y: 2650, animated: true });
    } else if (label === 'FAQ') {
      mainScrollRef.current?.scrollTo({ y: 3400, animated: true });
      setFaqOpen(true);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar style="dark" />
      <LinearGradient
        colors={['#FBF8F1', '#F7EEE2', '#FAF4EA', '#F4ECE3']}
        locations={[0, 0.34, 0.7, 1]}
        style={styles.appShell}
      >
        <MinimalFestivalBackdrop />
        <ScrollView
          ref={mainScrollRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            isDesktop && styles.scrollContentDesktop,
          ]}
          stickyHeaderIndices={[0]}
        >
          <View style={styles.headerWrap}>
            <View style={styles.festivalTopBar}>
              <Text style={styles.festivalTopBarText}>
                ✦ BANGLADESH TRADE & HERITAGE FAIR
              </Text>
              <View style={styles.festivalTopBarCenter}>
                <View style={styles.topBarDot} />
                <Text style={styles.festivalTopBarStrong}>10–25 JANUARY</Text>
                <View style={styles.topBarDot} />
              </View>
              <Text style={styles.festivalTopBarText}>AGARGAON · DHAKA ✦</Text>
            </View>
            <View style={[styles.header, { paddingHorizontal: horizontalInset }]}>
              <Pressable
                accessibilityRole="button"
                onPress={() => notify('Mela Fest', 'Welcome to the fair!')}
                style={styles.logoLockup}
              >
                <View style={styles.logoMark}>
                  <Text style={styles.logoMarkText}>ম</Text>
                </View>
                <View>
                  <Text style={styles.logoText}>Mela Fest</Text>
                  <Text style={styles.logoSubtext}>BANGLADESH</Text>
                </View>
              </Pressable>
              {isDesktop && (
                <View style={styles.desktopNav}>
                  {['Explore', 'Pavilions', 'Local Haat', 'Events', 'Fair map', 'FAQ'].map(
                    (label) => (
                      <Pressable
                        key={label}
                        onPress={() => handleNavClick(label)}
                        style={({ pressed }) => [
                          styles.desktopNavLink,
                          pressed && styles.pressed,
                        ]}
                      >
                        <Text style={styles.desktopNavText}>{label}</Text>
                      </Pressable>
                    ),
                  )}
                </View>
              )}
              <View style={styles.headerActions}>
                <Pressable
                  accessibilityLabel="Open search"
                  onPress={() => setSearchOpen(true)}
                  style={styles.iconButton}
                >
                  <Glyph name="search" size={25} />
                </Pressable>
                <Pressable
                  accessibilityLabel="Open cart"
                  onPress={() => setCartOpen(true)}
                  style={styles.iconButton}
                >
                  <Glyph name="bag" size={25} />
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>2</Text>
                  </View>
                </Pressable>
                {isDesktop && (
                  <Pressable
                    onPress={() => setVendorPortalOpen(true)}
                    style={({ pressed }) => [
                      styles.vendorButton,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Text style={styles.vendorButtonText}>Vendor portal</Text>
                  </Pressable>
                )}
              </View>
            </View>
          </View>

          <View style={[styles.heroSection, { paddingHorizontal: horizontalInset }]}>
            <ImageBackground
              source={require('../../../assets/dhaka-expo-hero.jpg')}
              resizeMode="cover"
              imageStyle={styles.heroImage}
              style={[styles.hero, isDesktop && styles.heroDesktop]}
            >
              <LinearGradient
                colors={[
                  'rgba(6, 17, 22, 0.95)',
                  'rgba(6, 17, 22, 0.82)',
                  'rgba(6, 17, 22, 0.25)',
                ]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={[
                  styles.heroGradient,
                  isDesktop && styles.heroGradientDesktop,
                ]}
              >
                {isDesktop && (
                  <View style={styles.heroDateCard}>
                    <Text style={styles.heroDateMonth}>JAN</Text>
                    <Text style={styles.heroDateNumber}>10–25</Text>
                    <View style={styles.heroDateRule} />
                    <Text style={styles.heroDatePlace}>BBCFEC · DHAKA</Text>
                  </View>
                )}
                <View style={styles.heroPill}>
                  <View style={styles.liveDot} />
                  <Text style={styles.heroPillText}>BANGLADESH MEGA REAL ESTATE EXPO 2026</Text>
                </View>
                <Text
                  style={[styles.heroTitle, isDesktop && styles.heroTitleDesktop]}
                >
                  Where Luxury Living{'\n'}Meets Architecture.
                </Text>
                <Text
                  style={[
                    styles.heroSubtitle,
                    isDesktop && styles.heroSubtitleDesktop,
                  ]}
                >
                  Step into Bangladesh’s premier property showcase. Explore duplex sky villas, waterfront residences, and smart highrises from Shanta, Sheltech, bti, Navana, Concord, Rangs & Assure with spot cashback up to ৳20 Lac.
                </Text>
                <View style={styles.heroActions}>
                  <Pressable
                    onPress={() =>
                      notify('3D Field View', 'Exploring 12 interactive developer pavilions in 3D WebGL.')
                    }
                    style={({ pressed }) => [
                      styles.primaryButton,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Text style={styles.primaryButtonText}>Explore 3D Pavilions</Text>
                    <Glyph name="arrow" size={18} color="#FFFFFF" />
                  </Pressable>
                  <Pressable
                    onPress={() =>
                      notify('VIP Consultation', 'VIP Principal Architect consultation suites are open at Diamond Pavilion Block A.')
                    }
                    style={({ pressed }) => [
                      styles.heroSecondaryButton,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Text style={styles.heroSecondaryText}>Book VIP Tour</Text>
                  </Pressable>
                </View>

                {/* Real Estate Expo Key Metrics Strip */}
                <View style={styles.heroStatsRow}>
                  <View style={styles.heroStatItem}>
                    <Text style={styles.heroStatNumber}>12</Text>
                    <Text style={styles.heroStatLabel}>Signature Pavilions</Text>
                  </View>
                  <View style={styles.heroStatDivider} />
                  <View style={styles.heroStatItem}>
                    <Text style={styles.heroStatNumber}>৳20 Lac</Text>
                    <Text style={styles.heroStatLabel}>Spot Cashback</Text>
                  </View>
                  <View style={styles.heroStatDivider} />
                  <View style={styles.heroStatItem}>
                    <Text style={styles.heroStatNumber}>80%</Text>
                    <Text style={styles.heroStatLabel}>Spot Bank Loans</Text>
                  </View>
                  <View style={styles.heroStatDivider} />
                  <View style={styles.heroStatItem}>
                    <Text style={styles.heroStatNumber}>3D WebGL</Text>
                    <Text style={styles.heroStatLabel}>Virtual Field</Text>
                  </View>
                </View>
              </LinearGradient>
            </ImageBackground>

            <Pressable
              onPress={() => setSearchOpen(true)}
              style={[styles.searchCard, isDesktop && styles.searchCardDesktop]}
            >
              <Glyph name="search" size={24} color={COLORS.muted} />
              <TextInput
                accessibilityLabel="Search property projects and developers"
                placeholder="Search projects, developers (e.g. Shanta, Gulshan, Duplex, 3BHK)..."
                placeholderTextColor="#7D898D"
                style={styles.searchInput}
                returnKeyType="search"
                onFocus={() => setSearchOpen(true)}
                onSubmitEditing={() => setSearchOpen(true)}
              />
              <View style={styles.searchFilter}>
                <FilterSliders />
              </View>
            </Pressable>
          </View>

          <FestivalMarquee />

          <PlaygroundFieldSection
            horizontalInset={horizontalInset}
            isDesktop={isDesktop}
          />

          <View
            style={[
              styles.section,
              styles.festiveZoneSection,
              { paddingHorizontal: horizontalInset },
            ]}
          >
            <View style={styles.zoneDecorOne} />
            <View style={styles.zoneDecorTwo} />
            <Text style={styles.eyebrow}>FIND YOUR WAY</Text>
            <Text style={styles.sectionTitle}>Quick zones</Text>
            <View style={styles.quickGrid}>
              {quickZones.map((zone) => {
                const selected = zone.label === activeZone;
                return (
                  <Pressable
                    key={zone.label}
                    onPress={() => setActiveZone(zone.label)}
                    style={({ pressed }) => [
                      styles.quickCard,
                      isDesktop && styles.quickCardDesktop,
                      selected && styles.quickCardActive,
                      pressed && styles.pressed,
                    ]}
                  >
                    <View
                      style={[styles.quickIcon, { backgroundColor: zone.tone }]}
                    >
                      <Glyph name={zone.icon} size={23} />
                    </View>
                    <Text
                      style={[
                        styles.quickLabel,
                        selected && styles.quickLabelActive,
                      ]}
                    >
                      {zone.label}
                    </Text>
                    <Glyph
                      name="arrow"
                      size={16}
                      color={selected ? COLORS.coral : COLORS.muted}
                    />
                  </Pressable>
                );
              })}
            </View>
          </View>

          <FestiveDivider />

          <View
            style={[
              styles.section,
              styles.festivalPanel,
              styles.festivalPanelSage,
            ]}
          >
            <BuntingStrip />
            <View style={{ paddingHorizontal: horizontalInset }}>
              <SectionHeader
                eyebrow="EXPO SIGNATURE PAVILIONS"
                title="Mega pavilions"
                onPressAction={openAllPavilions}
              />
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[
                styles.horizontalList,
                isDesktop && styles.horizontalListDesktop,
                { paddingHorizontal: horizontalInset },
              ]}
            >
              {pavilions.map((item) => (
                <PavilionCard
                  key={item.id}
                  item={item}
                  width={cardWidth}
                  onNavigateStall={onNavigateStall}
                />
              ))}
            </ScrollView>
          </View>

          <EnclaveCarousel
            items={stalls}
            cardWidth={cardWidth}
            horizontalInset={horizontalInset}
            isDesktop={isDesktop}
            onNavigateStall={onNavigateStall}
          />

          <FestiveDivider />

          <DealsCarousel
            items={deals}
            dealWidth={dealWidth}
            horizontalInset={horizontalInset}
            isDesktop={isDesktop}
            onNavigateStall={onNavigateStall}
          />

          <View
            style={[
              styles.section,
              styles.playableGameSection,
              { paddingHorizontal: horizontalInset },
            ]}
          >
            <BuntingStrip />
            <SectionHeader
              eyebrow="PLAY · SCORE · WIN"
              title="Mela game challenge"
              action="How to play"
            />
            <PlayableBalloonGame isDesktop={isDesktop} />
          </View>

          {/* Sticky Stacking Cards Section */}
          <StickyStackingSection
            horizontalInset={horizontalInset}
            onNavigateStall={onNavigateStall}
          />

          <FestiveDivider />

          <View style={[styles.section, styles.festivalGamesSection]}>
            <BuntingStrip />
            <View style={{ paddingHorizontal: horizontalInset }}>
              <SectionHeader
                eyebrow="RIDES · GAMES · PRIZES"
                title="Fun at the mela"
                action="View fun zone"
              />
              <View style={styles.funIntro}>
                <View style={styles.funIntroIcon}>
                  <Text style={styles.funIntroEmoji}>🎟️</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.funIntroTitle}>Play more, queue less</Text>
                  <Text style={styles.funIntroText}>
                    Pick up a Fun Pass online and use it at every attraction.
                  </Text>
                </View>
                <Pressable
                  onPress={() =>
                    notify('Fun Pass', 'Fun Pass booking will open here.')
                  }
                  style={({ pressed }) => [
                    styles.funPassButton,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={styles.funPassButtonText}>Get Fun Pass</Text>
                </Pressable>
              </View>
            </View>
            <ScrollView
              horizontal
              scrollEnabled={!isDesktop}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[
                styles.horizontalList,
                isDesktop && styles.horizontalListDesktop,
                { paddingHorizontal: horizontalInset },
              ]}
            >
              {games.map((item) => (
                <GameCard key={item.name} item={item} width={dealWidth} />
              ))}
            </ScrollView>
          </View>

          <View
            style={[
              styles.section,
              styles.festivalEventSection,
              { paddingHorizontal: horizontalInset },
            ]}
          >
            <BuntingStrip />
            <SectionHeader
              eyebrow="CULTURAL EVENTS & SHOWS"
              title="Mela mancho"
              action="Full schedule"
            />
            <View style={styles.eventCard}>
              <View style={styles.eventDate}>
                <Text style={styles.eventDateTop}>JAN</Text>
                <Text style={styles.eventDateNumber}>12</Text>
                <Text style={styles.eventDateBottom}>FRIDAY</Text>
              </View>
              <View style={styles.eventBody}>
                <View style={styles.eventRow}>
                  <View style={styles.eventTimeline}>
                    <View style={styles.timelineDotActive} />
                    <View style={styles.timelineLine} />
                  </View>
                  <View style={styles.eventCopy}>
                    <Text style={styles.eventTime}>5:00 PM · MAIN STAGE</Text>
                    <Text style={styles.eventTitle}>Live Pot Gan & Puppet Show</Text>
                    <Text style={styles.eventMeta}>Putul Naach · Family friendly</Text>
                  </View>
                </View>
                <View style={styles.eventRow}>
                  <View style={styles.eventTimeline}>
                    <View style={styles.timelineDot} />
                  </View>
                  <View style={styles.eventCopy}>
                    <Text style={styles.eventTime}>7:30 PM · FOLK COURT</Text>
                    <Text style={styles.eventTitle}>Traditional Folk & Baul Gaan</Text>
                    <Text style={styles.eventMeta}>Open seating · 90 minutes</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Visual Expo Image Banner */}
          <View
            style={[
              styles.visualBannerSection,
              { paddingHorizontal: horizontalInset },
            ]}
          >
            <Image
              source={require('../../../assets/mela-expo-banner.jpg')}
              resizeMode="cover"
              style={[
                styles.visualOnlyBanner,
                isDesktop && styles.visualOnlyBannerDesktop,
              ]}
            />
          </View>


          {/* FAQ Interactive Section */}
          <FaqSection
            horizontalInset={horizontalInset}
            onOpenFaqModal={() => setFaqOpen(true)}
          />

          {/* Rich Professional Footer */}
          <AppFooter
            horizontalInset={horizontalInset}
            onNavigateZone={(zone) => setActiveZone(zone)}
            onOpenMap={() => notify('Fair Map', 'The interactive map will open here.')}
            onOpenFaq={() => setFaqOpen(true)}
          />
        </ScrollView>

        {!isDesktop && (
          <View style={styles.bottomNav}>
            {[
              { label: 'Home', icon: 'home' as GlyphName },
              { label: 'Explore', icon: 'search' as GlyphName },
              { label: 'Map', icon: 'map' as GlyphName },
              { label: 'Saved', icon: 'heart' as GlyphName },
              { label: 'Profile', icon: 'user' as GlyphName },
            ].map((tab) => {
              const active = activeTab === tab.label;
              return (
                <Pressable
                  accessibilityRole="button"
                  key={tab.label}
                  onPress={() => {
                    setActiveTab(tab.label);
                    if (tab.label === 'Explore') {
                      setSearchOpen(true);
                    } else if (tab.label === 'Map') {
                      mainScrollRef.current?.scrollTo({ y: 560, animated: true });
                    } else if (tab.label === 'Saved') {
                      setCartOpen(true);
                    } else if (tab.label === 'Profile') {
                      setVendorPortalOpen(true);
                    } else if (tab.label === 'Home') {
                      mainScrollRef.current?.scrollTo({ y: 0, animated: true });
                    }
                  }}
                  style={styles.navItem}
                >
                  <Glyph
                    name={tab.icon}
                    size={22}
                    color={active ? COLORS.coral : '#7A878B'}
                  />
                  <Text style={[styles.navLabel, active && styles.navLabelActive]}>
                    {tab.label}
                  </Text>
                  {active && <View style={styles.navDot} />}
                </Pressable>
              );
            })}
          </View>
        )}

        <SearchModal
          visible={searchOpen}
          onClose={() => setSearchOpen(false)}
          onNavigateStall={onNavigateStall}
          isDesktop={isDesktop}
        />
        <CartPassesModal
          visible={cartOpen}
          onClose={() => setCartOpen(false)}
          onNavigateStall={onNavigateStall}
          isDesktop={isDesktop}
        />
        <VendorPortalModal
          visible={vendorPortalOpen}
          onClose={() => setVendorPortalOpen(false)}
          onNavigateStall={(slug) => {
            setVendorPortalOpen(false);
            onNavigateStall(slug as any);
          }}
          isDesktop={isDesktop}
        />
        <FaqModal
          visible={faqOpen}
          onClose={() => setFaqOpen(false)}
          onNavigateAction={(actionType) => {
            if (actionType === 'ticket') {
              setCartOpen(true);
            } else if (actionType === 'vendor') {
              setVendorPortalOpen(true);
            } else if (actionType === 'map') {
              mainScrollRef.current?.scrollTo({ y: 560, animated: true });
            }
          }}
          isDesktop={isDesktop}
        />
        <AllPavilionsModal
          visible={allPavilionsOpen}
          onClose={closeAllPavilions}
          onSelectStall={(slug) => {
            closeAllPavilions();
            onNavigateStall(slug as any);
          }}
          isDesktop={isDesktop}
          horizontalInset={horizontalInset}
        />
      </LinearGradient>
    </SafeAreaView>
  );
}

export default function FairExperience() {
  const readSlug = (): keyof typeof stallPageDetails | null => {
    if (typeof window === 'undefined') return null;
    const rawValue = window.location.hash.replace(/^#\/?stall\//, '').toLowerCase().trim();
    if (!rawValue) return null;
    if (rawValue in stallPageDetails) {
      return rawValue as keyof typeof stallPageDetails;
    }
    if (rawValue in pavilionSlugMap) {
      return pavilionSlugMap[rawValue];
    }
    return null;
  };

  const [activeStall, setActiveStall] = useState<
    keyof typeof stallPageDetails | null
  >(readSlug);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleHashChange = () => setActiveStall(readSlug());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (typeof window !== 'undefined') {
      const h = window.location.hash.toLowerCase().trim();
      if (h === '#all-stall' || h === '#all-stalls' || h === '#/all-stall' || h === '#/all-stalls') {
        document.title = 'All Signature Developer Pavilions · Mela Fest';
        return;
      }
    }
    const stall = stalls.find((item) => item.slug === activeStall);
    document.title = stall
      ? `${stall.name} · Mela Fest`
      : 'Mela Fest — Bangladesh Trade & Heritage Fair';
  }, [activeStall]);

  const navigateToStall = (slug: keyof typeof stallPageDetails) => {
    if (typeof window !== 'undefined') {
      window.location.hash = `stall/${slug}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setActiveStall(slug);
  };

  const navigateHome = () => {
    if (typeof window !== 'undefined') {
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setActiveStall(null);
  };

  return (
    <SafeAreaProvider>
      {activeStall ? (
        <StallLandingPage
          slug={activeStall}
          onBack={navigateHome}
          onSwitch={navigateToStall}
        />
      ) : (
        <HomeScreen onNavigateStall={navigateToStall} />
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.paper,
  },
  appShell: {
    flex: 1,
    overflow: 'hidden',
  },
  minimalBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  backdropRingTop: {
    position: 'absolute',
    right: -105,
    top: 130,
    width: 260,
    height: 260,
    borderRadius: 130,
    borderWidth: 24,
    borderColor: 'rgba(217,93,69,0.07)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdropRingInner: {
    width: 155,
    height: 155,
    borderRadius: 78,
    borderWidth: 1,
    borderColor: 'rgba(217,93,69,0.14)',
  },
  backdropDotCluster: {
    position: 'absolute',
    left: 20,
    top: '36%',
    width: 74,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    opacity: 0.28,
  },
  backdropDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#4C7165',
  },
  backdropDotGold: {
    backgroundColor: COLORS.gold,
  },
  backdropArch: {
    position: 'absolute',
    right: -74,
    bottom: 110,
    width: 210,
    height: 210,
    borderTopLeftRadius: 106,
    borderTopRightRadius: 106,
    borderWidth: 2,
    borderBottomWidth: 0,
    borderColor: 'rgba(76,113,101,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdropArchInner: {
    width: 132,
    height: 132,
    borderTopLeftRadius: 67,
    borderTopRightRadius: 67,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: 'rgba(76,113,101,0.14)',
    marginTop: 52,
  },
  backdropDiamondRow: {
    position: 'absolute',
    left: 30,
    bottom: 75,
    flexDirection: 'row',
    gap: 15,
    opacity: 0.18,
  },
  backdropMiniDiamond: {
    width: 9,
    height: 9,
    borderRadius: 2,
  },
  backdropFlower: {
    position: 'absolute',
    right: 42,
    top: '56%',
    width: 74,
    height: 74,
    opacity: 0.08,
  },
  backdropPetalTop: {
    position: 'absolute',
    left: 27,
    top: 0,
    width: 20,
    height: 31,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: '#705570',
  },
  backdropPetalRight: {
    position: 'absolute',
    right: 0,
    top: 27,
    width: 31,
    height: 20,
    borderTopRightRadius: 13,
    borderBottomRightRadius: 13,
    backgroundColor: '#705570',
  },
  backdropPetalBottom: {
    position: 'absolute',
    left: 27,
    bottom: 0,
    width: 20,
    height: 31,
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,
    backgroundColor: '#705570',
  },
  backdropPetalLeft: {
    position: 'absolute',
    left: 0,
    top: 27,
    width: 31,
    height: 20,
    borderTopLeftRadius: 13,
    borderBottomLeftRadius: 13,
    backgroundColor: '#705570',
  },
  backdropFlowerCenter: {
    position: 'absolute',
    left: 27,
    top: 27,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.gold,
  },
  stallPage: {
    flex: 1,
    backgroundColor: COLORS.paper,
  },
  stallPageHeader: {
    backgroundColor: 'rgba(248,245,239,0.98)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.line,
  },
  stallPageHeaderInner: {
    width: '100%',
    maxWidth: 1680,
    height: 70,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    minWidth: 115,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingVertical: 10,
  },
  backArrow: {
    color: COLORS.coral,
    fontSize: 21,
    fontWeight: '800',
  },
  backButtonText: {
    color: COLORS.ink,
    fontSize: 11,
    fontWeight: '800',
  },
  stallHeaderActions: {
    minWidth: 115,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
  },
  stallHeaderButton: {
    height: 42,
    borderRadius: 12,
    backgroundColor: COLORS.ink,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    paddingHorizontal: 14,
  },
  stallHeaderButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  stallHeroWrap: {
    width: '100%',
    maxWidth: 1680,
    alignSelf: 'center',
    paddingTop: 14,
  },
  stallPageHero: {
    width: '100%',
    height: 500,
    overflow: 'hidden',
    borderRadius: 28,
    backgroundColor: '#07151B',
  },
  stallPageHeroDesktop: {
    width: '100%',
    height: 590,
  },
  stallPageHeroImage: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
  },
  stallPageHeroGradient: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingHorizontal: 24,
    paddingVertical: 34,
    justifyContent: 'flex-end',
  },
  stallPageHeroGradientDesktop: {
    paddingHorizontal: 58,
    paddingVertical: 58,
  },
  stallHeroBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 11,
    paddingVertical: 7,
    marginBottom: 15,
  },
  stallHeroBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },
  stallHeroBangla: {
    color: COLORS.gold,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 5,
  },
  stallHeroTitle: {
    color: '#FFFFFF',
    fontSize: 38,
    lineHeight: 43,
    fontWeight: '900',
    letterSpacing: -1.3,
  },
  stallHeroTitleDesktop: {
    fontSize: 61,
    lineHeight: 64,
    letterSpacing: -2.3,
  },
  stallHeroTagline: {
    color: '#FFFFFF',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
    marginTop: 7,
  },
  stallHeroDescription: {
    maxWidth: 570,
    color: 'rgba(255,255,255,0.76)',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 12,
  },
  stallHeroDescriptionDesktop: {
    fontSize: 15,
    lineHeight: 23,
  },
  stallHeroActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 16,
    marginTop: 24,
  },
  stallHeroRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  stallHeroRatingStrong: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  stallHeroRatingText: {
    color: 'rgba(255,255,255,0.66)',
    fontSize: 10,
  },
  stallStats: {
    width: '100%',
    maxWidth: 1680,
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 22,
    marginTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.line,
  },
  stallStat: {
    flexGrow: 1,
    flexBasis: 150,
    minWidth: '24%',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.line,
  },
  stallStatLabel: {
    color: COLORS.coral,
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1.2,
    marginBottom: 5,
  },
  stallStatValue: {
    color: COLORS.ink,
    fontSize: 13,
    fontWeight: '800',
  },
  stallStorySection: {
    width: '100%',
    maxWidth: 1680,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 70,
    paddingTop: 70,
    paddingBottom: 72,
  },
  stallStorySectionMobile: {
    flexDirection: 'column',
    gap: 25,
    paddingTop: 48,
    paddingBottom: 52,
  },
  stallStoryHeading: {
    flex: 0.9,
  },
  stallSectionTitle: {
    color: COLORS.ink,
    fontSize: 30,
    lineHeight: 35,
    fontWeight: '900',
    letterSpacing: -1,
  },
  stallStoryCopyWrap: {
    flex: 1.1,
  },
  stallStoryCopy: {
    color: '#4F5E63',
    fontSize: 14,
    lineHeight: 24,
  },
  stallQuote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 22,
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
  },
  stallQuoteMark: {
    width: 43,
    height: 43,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stallQuoteMarkText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  stallQuoteText: {
    flex: 1,
    color: COLORS.ink,
    fontSize: 11,
    lineHeight: 17,
    fontWeight: '700',
  },
  stallProductsSection: {
    width: '100%',
    maxWidth: 1680,
    alignSelf: 'center',
    paddingTop: 36,
    paddingBottom: 60,
    backgroundColor: '#F1EBE1',
    borderRadius: 28,
    overflow: 'hidden',
    marginVertical: 18,
  },
  stallProductCard: {
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2D9CA',
  },
  stallProductArt: {
    height: 235,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  stallProductHalo: {
    position: 'absolute',
    width: 165,
    height: 165,
    borderRadius: 83,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  stallProductSymbol: {
    color: '#FFFFFF',
    fontSize: 72,
    fontWeight: '300',
  },
  stallProductIndex: {
    position: 'absolute',
    top: 14,
    right: 14,
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  stallProductInfo: {
    padding: 16,
  },
  stallProductName: {
    color: COLORS.ink,
    fontSize: 16,
    fontWeight: '800',
  },
  stallProductPrice: {
    color: COLORS.coral,
    fontSize: 14,
    fontWeight: '900',
    marginTop: 5,
  },
  stallProductLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingTop: 11,
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
  },
  stallProductLinkText: {
    color: COLORS.coral,
    fontSize: 11,
    fontWeight: '800',
  },
  stallOffer: {
    width: '100%',
    maxWidth: 1680,
    alignSelf: 'center',
    minHeight: 120,
    borderRadius: 22,
    backgroundColor: '#FFF3D8',
    borderWidth: 1,
    borderColor: '#E8CF90',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 15,
    padding: 20,
    marginTop: 38,
    marginBottom: 45,
  },
  stallOfferIcon: {
    width: 54,
    height: 54,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stallOfferCopy: {
    flex: 1,
    minWidth: 190,
  },
  stallOfferEyebrow: {
    color: COLORS.coral,
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1.3,
  },
  stallOfferTitle: {
    color: COLORS.ink,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '900',
    marginTop: 4,
  },
  stallOfferText: {
    color: COLORS.muted,
    fontSize: 10,
    marginTop: 4,
  },
  offerSaveButton: {
    height: 44,
    borderRadius: 13,
    backgroundColor: COLORS.coral,
    paddingHorizontal: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  offerSaveButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  stallVisitSection: {
    width: '100%',
    maxWidth: 1680,
    alignSelf: 'center',
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(23, 36, 42, 0.08)',
    padding: 36,
    marginBottom: 70,
    shadowColor: COLORS.navy,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 3,
  },
  stallVisitTopHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 28,
  },
  stallVisitSubtitle: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
    maxWidth: 720,
  },
  liveOpenBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(46, 184, 114, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(46, 184, 114, 0.25)',
  },
  liveOpenText: {
    color: '#1E8E54',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginLeft: 6,
  },
  stallVisitFactsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginBottom: 26,
  },
  stallVisitFactCard: {
    flex: 1,
    minWidth: 220,
    backgroundColor: '#FAF8F4',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(23, 36, 42, 0.05)',
  },
  factIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: 'rgba(23, 36, 42, 0.06)',
  },
  factTextCol: {
    flex: 1,
  },
  stallVisitFactLabel: {
    color: COLORS.muted,
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1,
  },
  stallVisitFactValue: {
    color: COLORS.ink,
    fontSize: 13,
    fontWeight: '800',
    marginTop: 3,
  },
  factHint: {
    color: COLORS.muted,
    fontSize: 10,
    marginTop: 2,
  },
  stallVisitActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(23, 36, 42, 0.06)',
  },
  directionButtonLight: {
    height: 46,
    borderRadius: 13,
    backgroundColor: COLORS.coral,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 15,
  },
  callButton: {
    height: 46,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: COLORS.line,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 17,
  },
  callButtonText: {
    color: COLORS.ink,
    fontSize: 11,
    fontWeight: '800',
  },
  /* On-Site Director Suite Styles */
  stallDirectorSection: {
    width: '100%',
    maxWidth: 1680,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(23, 36, 42, 0.08)',
    padding: 30,
    marginBottom: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 24,
    shadowColor: COLORS.navy,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 18,
    elevation: 3,
  },
  stallDirectorSectionMobile: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  stallDirectorProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    flex: 1,
    minWidth: 280,
  },
  stallDirectorAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  stallDirectorInitials: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
  },
  stallDirectorDetails: {
    flex: 1,
  },
  agentDutyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  agentDutyText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#1E8E54',
    letterSpacing: 0.8,
  },
  stallDirectorName: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.ink,
    letterSpacing: -0.3,
  },
  stallDirectorTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.muted,
    marginTop: 2,
  },
  stallDirectorContact: {
    fontSize: 11,
    color: COLORS.ink,
    marginTop: 6,
    fontWeight: '700',
  },
  stallDirectorCta: {
    flex: 1,
    minWidth: 280,
    justifyContent: 'center',
  },
  directorCtaHint: {
    fontSize: 12,
    color: COLORS.muted,
    lineHeight: 18,
    marginBottom: 14,
  },
  directorBtnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  directorPrimaryBtn: {
    backgroundColor: COLORS.navy,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  directorPrimaryBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  directorCallBtn: {
    backgroundColor: '#FAF8F4',
    borderWidth: 1,
    borderColor: 'rgba(23, 36, 42, 0.12)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  directorCallBtnText: {
    color: COLORS.ink,
    fontSize: 12,
    fontWeight: '800',
  },

  /* Signature Developments Showcase Styles */
  stallProjectsSection: {
    maxWidth: 1680,
    alignSelf: 'center',
    width: '100%',
    marginBottom: 60,
  },
  projectsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 26,
  },
  projectFilterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  projectFilterBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FAF8F4',
    borderWidth: 1,
    borderColor: 'rgba(23, 36, 42, 0.08)',
  },
  projectFilterBtnActive: {
    backgroundColor: COLORS.navy,
    borderColor: COLORS.navy,
  },
  projectFilterBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.muted,
  },
  projectFilterBtnTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  projectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  projectCard: {
    flexGrow: 1,
    flexBasis: 340,
    minWidth: 300,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(23, 36, 42, 0.08)',
    padding: 22,
    shadowColor: COLORS.navy,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 18,
    elevation: 3,
    justifyContent: 'space-between',
  },
  projectCardTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  projectStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusReady: {
    backgroundColor: 'rgba(46, 184, 114, 0.12)',
  },
  statusUnderConstruction: {
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
  },
  projectStatusText: {
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  statusReadyText: {
    color: '#1E8E54',
  },
  statusUnderConstructionText: {
    color: '#9C6F12',
  },
  projectPricePill: {
    backgroundColor: '#FAF8F4',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(23, 36, 42, 0.06)',
  },
  projectPriceText: {
    fontSize: 13,
    fontWeight: '900',
    color: COLORS.ink,
    letterSpacing: -0.2,
  },
  projectTitleBlock: {
    marginBottom: 14,
  },
  projectTitleText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.ink,
    letterSpacing: -0.3,
  },
  projectTypeText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.muted,
    marginTop: 2,
    marginBottom: 6,
  },
  projectLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  projectLocationIcon: {
    fontSize: 11,
  },
  projectLocationText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.muted,
    flex: 1,
  },
  floorPlanMetricsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF8F4',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(23, 36, 42, 0.05)',
    marginBottom: 16,
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 8,
    fontWeight: '900',
    color: COLORS.muted,
    letterSpacing: 0.8,
  },
  metricValue: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.ink,
    marginTop: 2,
  },
  metricDivider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(23, 36, 42, 0.08)',
  },
  projectHighlightsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 18,
  },
  highlightPill: {
    backgroundColor: 'rgba(23, 36, 42, 0.04)',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
  },
  highlightPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.ink,
  },
  projectCardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(23, 36, 42, 0.06)',
  },
  viewFloorplanBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#F3EFE6',
  },
  viewFloorplanBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.ink,
  },
  inquireProjectBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: COLORS.navy,
  },
  inquireProjectBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  /* Pavilion Amenities & Booth Highlights */
  pavilionAmenitiesSection: {
    maxWidth: 1680,
    alignSelf: 'center',
    width: '100%',
    marginBottom: 60,
  },
  amenitiesHeader: {
    marginBottom: 24,
  },
  boothAmenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  boothAmenityCard: {
    flexGrow: 1,
    flexBasis: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(23, 36, 42, 0.07)',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    shadowColor: COLORS.navy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  boothAmenityIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boothAmenityIcon: {
    fontSize: 20,
  },
  boothAmenityTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.ink,
    marginBottom: 4,
  },
  boothAmenityDesc: {
    fontSize: 11,
    color: COLORS.muted,
    lineHeight: 17,
  },

  /* Interactive Floorplan Specs Modal Styles */
  floorplanModalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(7, 18, 24, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  floorplanModalCard: {
    width: '100%',
    maxWidth: 620,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 26,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.25,
    shadowRadius: 32,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  floorplanModalHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  floorplanModalBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  floorplanModalType: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.muted,
  },
  floorplanModalTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.ink,
    letterSpacing: -0.5,
  },
  floorplanModalSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.muted,
    marginTop: 2,
  },
  floorplanModalCloseBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FAF8F4',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(23, 36, 42, 0.08)',
  },
  floorplanModalCloseText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.ink,
  },
  floorplanBlueprintArea: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  blueprintGradient: {
    height: 150,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blueprintGridLines: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'space-between',
    padding: 14,
    alignItems: 'center',
  },
  blueprintCompass: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  blueprintCompassText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  blueprintCenterSchematic: {
    alignItems: 'center',
  },
  blueprintSchematicIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  blueprintSchematicTitle: {
    color: '#00E5FF',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  blueprintSchematicDimension: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    marginTop: 2,
  },
  blueprintTagBadge: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  blueprintTagText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  floorplanSpecsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 18,
  },
  floorplanSpecItem: {
    flex: 1,
    minWidth: 120,
    backgroundColor: '#FAF8F4',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(23, 36, 42, 0.05)',
  },
  floorplanSpecLabel: {
    fontSize: 8,
    fontWeight: '900',
    color: COLORS.muted,
    letterSpacing: 0.8,
  },
  floorplanSpecValue: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.ink,
    marginTop: 3,
  },
  floorplanHighlightsBox: {
    backgroundColor: '#FAF8F4',
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(23, 36, 42, 0.05)',
  },
  floorplanHighlightsHeading: {
    fontSize: 9,
    fontWeight: '900',
    color: COLORS.muted,
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  floorplanHighlightsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  floorplanHighlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: '48%',
  },
  floorplanCheckMark: {
    color: '#1E8E54',
    fontSize: 12,
    fontWeight: '900',
  },
  floorplanHighlightItemText: {
    fontSize: 11,
    color: COLORS.ink,
    fontWeight: '700',
    flex: 1,
  },
  floorplanModalActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  floorplanModalPrimaryBtn: {
    flex: 1.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.navy,
    paddingVertical: 14,
    borderRadius: 14,
  },
  floorplanModalPrimaryBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  floorplanModalSecondaryBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAF8F4',
    borderWidth: 1,
    borderColor: 'rgba(23, 36, 42, 0.12)',
    paddingVertical: 14,
    borderRadius: 14,
  },
  floorplanModalSecondaryBtnText: {
    color: COLORS.ink,
    fontSize: 12,
    fontWeight: '800',
  },
  floorplanModalInquireBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.coral,
    paddingVertical: 14,
    borderRadius: 14,
  },
  floorplanModalInquireBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },

  /* Spot Price Inquiry Modal Styles */
  inquiryModalCard: {
    width: '100%',
    maxWidth: 580,
    maxHeight: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.25,
    shadowRadius: 32,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  inquiryFormContent: {
    paddingBottom: 10,
  },
  inquiryModalHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  inquiryHeaderBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(235, 94, 65, 0.1)',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 6,
  },
  inquiryHeaderBadgeText: {
    color: COLORS.coral,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  inquiryModalTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.ink,
    letterSpacing: -0.4,
  },
  inquiryModalSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.muted,
    marginTop: 2,
  },
  inquiryRateBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FAF8F4',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(23, 36, 42, 0.06)',
    marginBottom: 20,
    flexWrap: 'wrap',
    gap: 8,
  },
  inquiryRateLabel: {
    fontSize: 8,
    fontWeight: '900',
    color: COLORS.muted,
    letterSpacing: 0.8,
  },
  inquiryRateValue: {
    fontSize: 15,
    fontWeight: '900',
    color: COLORS.ink,
    marginTop: 2,
  },
  inquiryDiscountPill: {
    backgroundColor: 'rgba(46, 184, 114, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  inquiryDiscountText: {
    color: '#1E8E54',
    fontSize: 10,
    fontWeight: '800',
  },
  inquiryFieldsWrap: {
    gap: 14,
    marginBottom: 18,
  },
  inquiryFieldGroup: {
    gap: 6,
  },
  inquiryInputLabel: {
    fontSize: 9,
    fontWeight: '900',
    color: COLORS.muted,
    letterSpacing: 0.8,
  },
  inquiryTextInput: {
    backgroundColor: '#FAF8F4',
    borderWidth: 1,
    borderColor: 'rgba(23, 36, 42, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 13,
    color: COLORS.ink,
    fontWeight: '600',
  },
  inquiryTextArea: {
    minHeight: 70,
    textAlignVertical: 'top',
  },
  inquirySlotRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  inquirySlotChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#FAF8F4',
    borderWidth: 1,
    borderColor: 'rgba(23, 36, 42, 0.1)',
  },
  inquirySlotChipActive: {
    backgroundColor: COLORS.navy,
    borderColor: COLORS.navy,
  },
  inquirySlotChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.muted,
  },
  inquirySlotChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  inquiryAssignedConsultant: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FAF8F4',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(23, 36, 42, 0.05)',
    marginBottom: 20,
  },
  inquiryConsultantAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inquiryConsultantInitials: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },
  inquiryConsultantName: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.ink,
  },
  inquiryConsultantTitle: {
    fontSize: 10,
    color: COLORS.muted,
    fontWeight: '600',
    marginTop: 1,
  },
  inquirySubmitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  inquirySubmitBtn: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.coral,
    paddingVertical: 14,
    borderRadius: 14,
  },
  inquirySubmitBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  inquiryCancelBtn: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAF8F4',
    borderWidth: 1,
    borderColor: 'rgba(23, 36, 42, 0.12)',
    paddingVertical: 14,
    borderRadius: 14,
  },
  inquiryCancelBtnText: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: '700',
  },

  /* Success View Inside Modal */
  inquirySuccessBox: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  inquirySuccessIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(46, 184, 114, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  inquirySuccessIcon: {
    fontSize: 32,
  },
  inquirySuccessTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.ink,
    letterSpacing: -0.4,
    textAlign: 'center',
    marginBottom: 8,
  },
  inquirySuccessSubtitle: {
    fontSize: 13,
    color: COLORS.muted,
    textAlign: 'center',
    lineHeight: 19,
    maxWidth: 440,
    marginBottom: 20,
  },
  inquirySuccessDetailCard: {
    width: '100%',
    backgroundColor: '#FAF8F4',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(23, 36, 42, 0.06)',
    gap: 8,
    marginBottom: 24,
  },
  inquirySuccessDetailText: {
    fontSize: 12,
    color: COLORS.ink,
    fontWeight: '700',
  },
  inquirySuccessActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    width: '100%',
  },
  inquiryCallAgentBtn: {
    flex: 1.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.navy,
    paddingVertical: 14,
    borderRadius: 14,
  },
  inquiryCallAgentBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  inquirySuccessDoneBtn: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAF8F4',
    borderWidth: 1,
    borderColor: 'rgba(23, 36, 42, 0.12)',
    paddingVertical: 14,
    borderRadius: 14,
  },
  inquirySuccessDoneBtnText: {
    color: COLORS.ink,
    fontSize: 12,
    fontWeight: '800',
  },
  stallPageFooter: {
    minHeight: 150,
    backgroundColor: COLORS.navy,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 13,
    padding: 25,
  },
  stallFooterBrand: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  scrollContent: {
    paddingBottom: 112,
  },
  scrollContentDesktop: {
    paddingBottom: 0,
  },
  headerWrap: {
    backgroundColor: 'rgba(248, 245, 239, 0.97)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.line,
    zIndex: 10,
  },
  festivalTopBar: {
    minHeight: 30,
    backgroundColor: COLORS.coral,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    gap: 8,
  },
  festivalTopBarText: {
    flex: 1,
    color: 'rgba(255,255,255,0.78)',
    fontSize: 7,
    fontWeight: '900',
    letterSpacing: 0.8,
    textAlign: 'center',
  },
  festivalTopBarCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  festivalTopBarStrong: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.1,
  },
  topBarDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.gold,
  },
  header: {
    height: 68,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 1680,
    alignSelf: 'center',
  },
  logoLockup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoMark: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.coral,
  },
  logoMarkText: {
    fontSize: 21,
    lineHeight: 26,
    color: '#FFFFFF',
    fontWeight: '800',
  },
  logoText: {
    color: COLORS.ink,
    fontSize: 18,
    lineHeight: 20,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  logoSubtext: {
    color: COLORS.muted,
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 2.2,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  desktopNav: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginHorizontal: 18,
  },
  desktopNavLink: {
    paddingHorizontal: 9,
    paddingVertical: 9,
    borderRadius: 10,
  },
  desktopNavText: {
    color: COLORS.ink,
    fontSize: 12,
    fontWeight: '700',
  },
  vendorButton: {
    height: 42,
    paddingHorizontal: 15,
    borderRadius: 12,
    backgroundColor: COLORS.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vendorButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadge: {
    position: 'absolute',
    right: -1,
    top: -2,
    minWidth: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: COLORS.coral,
    borderWidth: 2,
    borderColor: COLORS.paper,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  heroSection: {
    width: '100%',
    maxWidth: 1680,
    alignSelf: 'center',
    paddingTop: 12,
    marginBottom: 46,
  },
  hero: {
    width: '100%',
    height: 440,
    overflow: 'hidden',
    borderRadius: 28,
    backgroundColor: '#07151B',
  },
  heroDesktop: {
    width: '100%',
    height: 560,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
  },
  heroGradient: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 44,
    paddingBottom: 58,
    justifyContent: 'flex-end',
  },
  heroGradientDesktop: {
    paddingHorizontal: 56,
    paddingTop: 70,
    paddingBottom: 72,
  },
  heroDateCard: {
    position: 'absolute',
    right: 48,
    top: 42,
    width: 128,
    minHeight: 142,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.32)',
    backgroundColor: 'rgba(10,25,30,0.48)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
  },
  heroDateMonth: {
    color: COLORS.gold,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2.5,
  },
  heroDateNumber: {
    color: '#FFFFFF',
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '900',
    letterSpacing: -1,
    marginTop: 4,
  },
  heroDateRule: {
    width: 42,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.38)',
    marginVertical: 9,
  },
  heroDatePlace: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 1,
  },
  heroPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    marginBottom: 16,
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#FF8B6F',
  },
  heroPillText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.6,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 40,
    lineHeight: 43,
    fontWeight: '800',
    letterSpacing: -1.5,
  },
  heroTitleDesktop: {
    fontSize: 58,
    lineHeight: 61,
    letterSpacing: -2.4,
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.84)',
    maxWidth: 380,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 12,
  },
  heroSubtitleDesktop: {
    maxWidth: 620,
    fontSize: 17,
    lineHeight: 26,
  },
  heroActions: {
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 14,
    backgroundColor: COLORS.coral,
    paddingHorizontal: 18,
    height: 50,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  heroSecondaryButton: {
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 17,
    backgroundColor: 'rgba(7, 19, 24, 0.2)',
  },
  heroSecondaryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  heroStatsRow: {
    marginTop: 26,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    alignSelf: 'flex-start',
  },
  heroStatItem: {
    alignItems: 'flex-start',
  },
  heroStatNumber: {
    color: '#FFE082',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  heroStatLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  heroStatDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  searchCard: {
    position: 'absolute',
    left: 34,
    right: 34,
    bottom: -26,
    height: 62,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingLeft: 16,
    paddingRight: 8,
    shadowColor: '#213338',
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.13,
    shadowRadius: 18,
    elevation: 7,
  },
  searchCardDesktop: {
    left: 56,
    right: undefined,
    width: 680,
    height: 68,
    bottom: -28,
  },
  searchInput: {
    flex: 1,
    color: COLORS.ink,
    fontSize: 14,
    height: '100%',
  },
  searchFilter: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.sage,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterSliders: {
    width: 20,
    height: 18,
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  filterSliderRow: {
    width: 20,
    height: 4,
    justifyContent: 'center',
  },
  filterSliderLine: {
    width: 20,
    height: 2,
    borderRadius: 1,
    backgroundColor: COLORS.ink,
  },
  filterSliderKnob: {
    position: 'absolute',
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.ink,
    borderWidth: 1,
    borderColor: COLORS.sage,
  },
  liveTicker: {
    width: '100%',
    maxWidth: 1280,
    alignSelf: 'center',
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    marginTop: 4,
    marginBottom: 24,
  },
  tickerIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5E3DE',
  },
  tickerLabel: {
    color: COLORS.coral,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.4,
    marginBottom: 3,
  },
  tickerText: {
    color: COLORS.ink,
    fontSize: 13,
    fontWeight: '700',
  },
  tickerTime: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  tickerTimeText: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: '600',
  },
  festivalMarqueeWrapper: {
    width: '100%',
    backgroundColor: '#081419',
    marginBottom: 32,
    position: 'relative',
    overflow: 'hidden',
  },
  marqueeTopLine: {
    height: 1.5,
    backgroundColor: 'rgba(212, 175, 55, 0.45)',
  },
  marqueeBottomLine: {
    height: 1.5,
    backgroundColor: 'rgba(212, 175, 55, 0.45)',
  },
  festivalMarquee: {
    width: '100%',
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#081419',
    overflow: 'hidden',
  },
  fixedHighlightBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D95D45',
    paddingHorizontal: 12,
    height: '100%',
    gap: 6,
    borderRightWidth: 2,
    borderRightColor: '#FFE082',
    zIndex: 10,
  },
  fixedBadgePulse: {
    color: '#FFE082',
    fontSize: 10,
    fontWeight: '900',
  },
  fixedBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.0,
  },
  marqueeScrollContainer: {
    flex: 1,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  marqueeAnimatedRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tickerTrack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
  },
  tickerTag: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  tickerTagText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  tickerItemText: {
    color: '#F6E5B7',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  tickerSeparator: {
    color: '#D4AF37',
    fontSize: 12,
    marginLeft: 8,
  },
  section: {
    width: '100%',
    maxWidth: 1680,
    alignSelf: 'center',
    marginBottom: 42,
  },
  festivalPanel: {
    borderRadius: 28,
    paddingTop: 42,
    paddingBottom: 28,
    overflow: 'hidden',
  },
  festivalPanelSage: {
    backgroundColor: '#E5EEE9',
  },
  festivalPanelClay: {
    backgroundColor: '#F6E6DC',
  },
  festivalPanelSand: {
    backgroundColor: '#F8EFE3',
  },
  festivalPanelMap: {
    backgroundColor: '#EEE8F1',
  },
  festiveZoneSection: {
    borderRadius: 26,
    backgroundColor: '#F2E8D8',
    paddingTop: 27,
    paddingBottom: 27,
    overflow: 'hidden',
  },
  zoneDecorOne: {
    position: 'absolute',
    right: -45,
    top: -55,
    width: 145,
    height: 145,
    borderRadius: 73,
    borderWidth: 22,
    borderColor: 'rgba(217,93,69,0.1)',
  },
  zoneDecorTwo: {
    position: 'absolute',
    left: -38,
    bottom: -58,
    width: 115,
    height: 115,
    borderRadius: 58,
    borderWidth: 17,
    borderColor: 'rgba(76,113,101,0.1)',
  },
  festiveDivider: {
    width: '100%',
    maxWidth: 310,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 11,
    marginTop: -11,
    marginBottom: 31,
  },
  festiveDividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#D9CBB8',
  },
  festiveDiamond: {
    width: 9,
    height: 9,
    borderRadius: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 18,
    gap: 12,
  },
  eyebrow: {
    color: COLORS.coral,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.7,
    marginBottom: 6,
  },
  sectionTitle: {
    color: COLORS.ink,
    fontSize: 27,
    lineHeight: 31,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  sectionSubtitle: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 4,
    maxWidth: 640,
  },
  textButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 7,
  },
  textButtonLabel: {
    color: COLORS.coral,
    fontSize: 12,
    fontWeight: '800',
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 18,
  },
  quickCard: {
    minWidth: '47%',
    flexGrow: 1,
    flexBasis: 150,
    height: 68,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.line,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  quickCardDesktop: {
    minWidth: '22%',
    flexBasis: 210,
    height: 76,
  },
  quickCardActive: {
    borderColor: COLORS.coral,
    backgroundColor: '#FFF9F6',
  },
  quickIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickLabel: {
    flex: 1,
    color: COLORS.ink,
    fontSize: 13,
    fontWeight: '700',
  },
  quickLabelActive: {
    color: COLORS.coralDark,
  },
  horizontalList: {
    gap: 14,
    paddingBottom: 3,
  },
  horizontalListDesktop: {
    gap: 16,
    paddingBottom: 6,
    overflow: 'visible',
  },
  enclaveHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 16,
  },
  slideshowControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pageBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(10, 26, 33, 0.08)',
    marginRight: 6,
  },
  pageBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.ink,
    letterSpacing: 1,
  },
  sliderArrowBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.line,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.navy,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  sliderArrowBtnPrimary: {
    backgroundColor: COLORS.coral,
    borderColor: COLORS.coral,
  },
  enclaveGridRow: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'stretch',
    width: '100%',
  },
  enclaveGridRowDesktop: {
    gap: 16,
    justifyContent: 'space-between',
  },
  sliderDotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 22,
  },
  sliderDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(10, 26, 33, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderDotActive: {
    width: 28,
    borderRadius: 5,
    backgroundColor: COLORS.coral,
  },
  sliderDotInner: {
    width: '100%',
    height: '100%',
  },
  pavilionCard: {
    minHeight: 352,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.line,
    shadowColor: COLORS.navy,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.09,
    shadowRadius: 12,
    elevation: 4,
  },
  pavilionBoothStage: {
    height: 200,
    backgroundColor: '#1D2629',
    overflow: 'hidden',
    position: 'relative',
  },
  pavilionImage: {
    width: '100%',
    height: '100%',
  },
  pavilionBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(15, 23, 42, 0.78)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  brandSeal: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandSealText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
  },
  pavilionBrand: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  pavilionFasciaLabel: {
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: 7,
    fontWeight: '800',
    letterSpacing: 0.9,
  },
  pavilionInfo: {
    flex: 1,
    padding: 17,
  },
  pavilionInfoTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pavilionNumber: {
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.9,
    textTransform: 'uppercase',
  },
  pavilionOpenPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: '#E5F1E9',
  },
  pavilionOpenDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#3D9B60',
  },
  pavilionOpenText: {
    color: '#337C4E',
    fontSize: 7,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  pavilionOffer: {
    color: COLORS.ink,
    fontSize: 19,
    lineHeight: 23,
    fontWeight: '900',
    marginTop: 10,
  },
  pavilionFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
    paddingTop: 15,
  },
  pavilionNote: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: '700',
  },
  roundArrow: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stallCard: {
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.line,
    overflow: 'hidden',
  },
  stallArt: {
    height: 230,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: '#ECEBE9',
  },
  stallBoothImage: {
    borderTopLeftRadius: 23,
    borderTopRightRadius: 23,
  },
  stallBoothLabel: {
    position: 'absolute',
    left: 14,
    right: 62,
    top: 14,
    minHeight: 34,
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 11,
    shadowColor: COLORS.navy,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
  },
  stallBoothLabelText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  alpanaRing: {
    width: 116,
    height: 116,
    borderRadius: 58,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.62)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alpanaRingInner: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.85)',
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-7deg' }],
  },
  stallInitials: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 2,
    transform: [{ rotate: '7deg' }],
  },
  saveButton: {
    position: 'absolute',
    right: 14,
    top: 14,
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  saveButtonActive: {
    backgroundColor: COLORS.coral,
  },
  stallCategory: {
    position: 'absolute',
    left: 14,
    bottom: 12,
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
    backgroundColor: 'rgba(20,25,26,0.72)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  stallContent: {
    padding: 17,
  },
  stallLocation: {
    color: COLORS.coral,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.7,
    marginBottom: 6,
  },
  stallName: {
    color: COLORS.ink,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  ratingStrong: {
    color: COLORS.ink,
    fontSize: 12,
    fontWeight: '800',
  },
  ratingText: {
    color: COLORS.muted,
    fontSize: 11,
  },
  outlineButton: {
    height: 42,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: COLORS.line,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    marginTop: 15,
  },
  outlineButtonText: {
    color: COLORS.ink,
    fontSize: 12,
    fontWeight: '800',
  },
  dealsSection: {
    width: '100%',
    maxWidth: 1280,
    alignSelf: 'center',
    paddingVertical: 30,
    marginBottom: 42,
    backgroundColor: '#F1EBE1',
  },
  festivalGamesSection: {
    borderRadius: 28,
    backgroundColor: '#F8E7DD',
    paddingTop: 30,
    paddingBottom: 32,
    overflow: 'hidden',
  },
  playableGameSection: {
    borderRadius: 30,
    backgroundColor: '#F4E2B9',
    paddingTop: 42,
    paddingBottom: 28,
    overflow: 'hidden',
  },
  playableGameLayout: {
    flexDirection: 'row',
    minHeight: 450,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: COLORS.navy,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: COLORS.navy,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 5,
  },
  playableGameLayoutMobile: {
    flexDirection: 'column',
  },
  gameInstructions: {
    width: '37%',
    minWidth: 265,
    backgroundColor: '#17333A',
    padding: 27,
    justifyContent: 'center',
  },
  gameInstructionsMobile: {
    width: '100%',
    minWidth: 0,
  },
  gameLivePill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginBottom: 16,
  },
  gameLiveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#74868A',
  },
  gameLiveDotActive: {
    backgroundColor: '#7BE19D',
    shadowColor: '#7BE19D',
    shadowOpacity: 0.7,
    shadowRadius: 6,
  },
  gameLiveText: {
    color: 'rgba(255,255,255,0.68)',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1,
  },
  playableGameTitle: {
    color: '#FFFFFF',
    fontSize: 31,
    lineHeight: 34,
    fontWeight: '900',
    letterSpacing: -1,
  },
  playableGameCopy: {
    color: 'rgba(255,255,255,0.64)',
    fontSize: 11,
    lineHeight: 18,
    marginTop: 12,
  },
  gameScoreboard: {
    minHeight: 68,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 21,
    paddingHorizontal: 8,
  },
  gameScoreItem: {
    flex: 1,
    alignItems: 'center',
  },
  gameScoreRule: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  gameScoreLabel: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 7,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  gameScoreValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 3,
  },
  gameTimeUrgent: {
    color: '#FF8B72',
  },
  gameTimerTrack: {
    width: '100%',
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
    marginTop: 13,
  },
  gameTimerFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: COLORS.gold,
  },
  gameStartButton: {
    height: 48,
    borderRadius: 14,
    backgroundColor: COLORS.coral,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 18,
  },
  gameStartButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  balloonBoard: {
    flex: 1,
    minHeight: 450,
    backgroundColor: '#A84738',
    padding: 25,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  balloonBoardLights: {
    position: 'absolute',
    left: 14,
    right: 14,
    top: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  boardLight: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.gold,
    shadowColor: COLORS.gold,
    shadowOpacity: 0.8,
    shadowRadius: 7,
  },
  balloonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  balloonSlot: {
    width: '31%',
    height: 126,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  balloonSlotActive: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  balloonPressed: {
    transform: [{ scale: 0.93 }],
  },
  balloon: {
    width: 62,
    height: 73,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#32130F',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  balloonActive: {
    width: 69,
    height: 81,
    borderRadius: 38,
    borderWidth: 4,
    borderColor: '#FFE39C',
    shadowColor: COLORS.gold,
    shadowOpacity: 0.8,
    shadowRadius: 13,
  },
  balloonPopped: {
    transform: [{ scale: 0.2 }],
    opacity: 0.1,
  },
  balloonIdle: {
    opacity: 0.62,
  },
  balloonShine: {
    position: 'absolute',
    top: 14,
    left: 15,
    width: 10,
    height: 18,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.35)',
    transform: [{ rotate: '22deg' }],
  },
  balloonTarget: {
    color: '#FFF0B7',
    fontSize: 25,
    fontWeight: '900',
  },
  balloonKnot: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 9,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginTop: -2,
  },
  balloonString: {
    width: 1,
    height: 17,
    backgroundColor: 'rgba(255,255,255,0.45)',
  },
  gameBoardOverlay: {
    position: 'absolute',
    left: 28,
    right: 28,
    top: '27%',
    borderRadius: 20,
    backgroundColor: 'rgba(16,38,45,0.94)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
    paddingVertical: 27,
    shadowColor: '#000000',
    shadowOpacity: 0.28,
    shadowRadius: 15,
  },
  gameBoardOverlayIcon: {
    fontSize: 34,
  },
  gameBoardOverlayTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '900',
    marginTop: 8,
  },
  gameBoardOverlayText: {
    color: 'rgba(255,255,255,0.62)',
    fontSize: 10,
    lineHeight: 16,
    textAlign: 'center',
    marginTop: 6,
  },
  dealCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E7DFD3',
  },
  dealArt: {
    height: 138,
    borderRadius: 14,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dealImage: {
    width: '100%',
    height: '100%',
  },
  dealPatternOne: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    left: -35,
    top: -42,
  },
  dealPatternTwo: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    right: -20,
    bottom: -28,
  },
  dealSymbol: {
    color: '#FFFFFF',
    fontSize: 52,
    fontWeight: '300',
  },
  discountPill: {
    position: 'absolute',
    left: 9,
    top: 9,
    backgroundColor: COLORS.gold,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  discountText: {
    color: '#4A3412',
    fontSize: 8,
    fontWeight: '900',
  },
  dealBrand: {
    color: COLORS.coral,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginTop: 12,
  },
  dealName: {
    color: COLORS.ink,
    fontSize: 15,
    fontWeight: '800',
    marginTop: 3,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 7,
    marginTop: 8,
    marginBottom: 3,
  },
  price: {
    color: COLORS.ink,
    fontSize: 15,
    fontWeight: '900',
  },
  oldPrice: {
    color: '#8A9395',
    fontSize: 10,
    textDecorationLine: 'line-through',
  },
  funIntro: {
    minHeight: 88,
    borderRadius: 20,
    backgroundColor: '#FFF3D8',
    borderWidth: 1,
    borderColor: '#EBD59D',
    padding: 14,
    marginBottom: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 12,
  },
  funIntroIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  funIntroEmoji: {
    fontSize: 24,
  },
  funIntroTitle: {
    color: COLORS.ink,
    fontSize: 14,
    fontWeight: '800',
  },
  funIntroText: {
    color: COLORS.muted,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 3,
  },
  funPassButton: {
    minHeight: 42,
    borderRadius: 12,
    backgroundColor: COLORS.coral,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  funPassButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  gameCard: {
    borderRadius: 21,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  gameArt: {
    height: 156,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameSun: {
    position: 'absolute',
    top: -45,
    right: -25,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(242,184,75,0.42)',
  },
  gameGround: {
    position: 'absolute',
    left: -20,
    right: -20,
    bottom: -62,
    height: 100,
    borderRadius: 70,
    backgroundColor: 'rgba(12,28,33,0.2)',
  },
  gameSymbol: {
    fontSize: 62,
    lineHeight: 76,
  },
  gameBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
  },
  gameBadgeText: {
    color: COLORS.coralDark,
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.7,
  },
  gameContent: {
    padding: 14,
  },
  gameTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  gameBangla: {
    color: COLORS.coral,
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 2,
  },
  gameName: {
    color: COLORS.ink,
    fontSize: 15,
    fontWeight: '800',
  },
  gamePrice: {
    color: COLORS.ink,
    fontSize: 14,
    fontWeight: '900',
  },
  gameMeta: {
    color: COLORS.muted,
    fontSize: 10,
    marginTop: 7,
  },
  gameButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
    paddingTop: 11,
    marginTop: 12,
  },
  gameButtonText: {
    color: COLORS.coral,
    fontSize: 11,
    fontWeight: '800',
  },
  eventCard: {
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.line,
    flexDirection: 'row',
  },
  festivalEventSection: {
    borderRadius: 28,
    backgroundColor: '#E7EFEA',
    paddingTop: 42,
    paddingBottom: 28,
    overflow: 'hidden',
  },
  eventBunting: {
    position: 'absolute',
    top: 0,
    left: 18,
    right: 18,
    height: 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#B9C9BE',
  },
  buntingFlag: {
    width: 0,
    height: 0,
    borderLeftWidth: 9,
    borderRightWidth: 9,
    borderTopWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  eventDate: {
    width: 82,
    backgroundColor: COLORS.coral,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 22,
  },
  eventDateTop: {
    color: '#FFD8CE',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.6,
  },
  eventDateNumber: {
    color: '#FFFFFF',
    fontSize: 35,
    lineHeight: 40,
    fontWeight: '900',
  },
  eventDateBottom: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 1,
  },
  eventBody: {
    flex: 1,
    padding: 18,
    gap: 4,
  },
  eventRow: {
    flexDirection: 'row',
    minHeight: 84,
  },
  eventTimeline: {
    width: 19,
    alignItems: 'center',
  },
  timelineDotActive: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: COLORS.coral,
    borderWidth: 3,
    borderColor: '#F6D6CE',
  },
  timelineDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: COLORS.gold,
  },
  timelineLine: {
    flex: 1,
    width: 1,
    backgroundColor: COLORS.line,
    marginVertical: 4,
  },
  eventCopy: {
    flex: 1,
    paddingLeft: 8,
    paddingBottom: 14,
  },
  eventTime: {
    color: COLORS.coral,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.7,
  },
  eventTitle: {
    color: COLORS.ink,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '800',
    marginTop: 4,
  },
  eventMeta: {
    color: COLORS.muted,
    fontSize: 10,
    marginTop: 4,
  },
  mapSectionIntro: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 20,
    maxWidth: 620,
    marginTop: -8,
    marginBottom: 16,
  },
  mapFilters: {
    gap: 8,
    paddingBottom: 14,
  },
  mapFilter: {
    height: 36,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.line,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  mapFilterActive: {
    borderColor: COLORS.ink,
    backgroundColor: COLORS.ink,
  },
  mapFilterText: {
    color: COLORS.muted,
    fontSize: 10,
    fontWeight: '800',
  },
  mapFilterTextActive: {
    color: '#FFFFFF',
  },
  interactiveMapLayout: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'stretch',
  },
  interactiveMapLayoutMobile: {
    flexDirection: 'column',
  },
  mapCanvas: {
    flex: 1,
    minHeight: 440,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#D9D6CD',
    backgroundColor: '#E7EEE8',
    padding: 14,
    overflow: 'hidden',
  },
  mapTopLandmarks: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  landmark: {
    flex: 1,
    minHeight: 46,
    borderRadius: 12,
    backgroundColor: '#DAD3E7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  landmarkGold: {
    backgroundColor: '#F2DDAE',
  },
  landmarkIcon: {
    color: COLORS.ink,
    fontSize: 18,
    fontWeight: '800',
  },
  landmarkText: {
    color: COLORS.ink,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  stallLine: {
    flexDirection: 'row',
    gap: 7,
  },
  mapStall: {
    flex: 1,
    minWidth: 0,
    height: 104,
    borderRadius: 12,
    borderWidth: 1,
    borderTopWidth: 5,
    borderColor: '#D8D3C9',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 9,
    justifyContent: 'space-between',
    shadowColor: COLORS.navy,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  mapStallSelected: {
    borderColor: COLORS.ink,
    backgroundColor: '#FFF8F3',
    shadowOpacity: 0.15,
    elevation: 3,
  },
  mapStallDimmed: {
    opacity: 0.25,
  },
  mapStallId: {
    color: COLORS.coral,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.7,
  },
  mapStallName: {
    color: COLORS.ink,
    fontSize: 10,
    lineHeight: 13,
    fontWeight: '800',
  },
  mapSelectedDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.coral,
  },
  mainAisle: {
    height: 78,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
  },
  aisleDash: {
    width: '100%',
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#AAB8AE',
  },
  aisleLabel: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D5DED7',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  aisleLabelText: {
    color: '#617169',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  mapBottomLandmarks: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 12,
  },
  amenityPill: {
    minWidth: 45,
    height: 32,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#CBD6CD',
    backgroundColor: 'rgba(255,255,255,0.65)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  amenityText: {
    color: COLORS.muted,
    fontSize: 8,
    fontWeight: '900',
  },
  entryGate: {
    flex: 1,
    maxWidth: 220,
    height: 38,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: COLORS.coral,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  entryGateText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.7,
  },
  mapDetailCard: {
    width: 292,
    minHeight: 440,
    borderRadius: 24,
    backgroundColor: COLORS.navy,
    padding: 22,
    justifyContent: 'flex-start',
  },
  mapDetailCardMobile: {
    width: '100%',
    minHeight: 365,
  },
  mapDetailTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mapDetailNumber: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapDetailNumberText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.7,
  },
  openPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  openDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#77D79A',
  },
  openText: {
    color: '#A6E6BA',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  mapDetailZone: {
    color: COLORS.gold,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginTop: 34,
  },
  mapDetailTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    lineHeight: 29,
    fontWeight: '900',
    letterSpacing: -0.5,
    marginTop: 7,
  },
  mapDetailOffer: {
    color: 'rgba(255,255,255,0.68)',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
  },
  mapDetailFacts: {
    gap: 11,
    marginTop: 26,
  },
  mapDetailFact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  mapDetailFactText: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 11,
    fontWeight: '600',
  },
  directionButton: {
    height: 48,
    borderRadius: 14,
    backgroundColor: COLORS.coral,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 'auto',
  },
  directionButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  mapHint: {
    color: 'rgba(255,255,255,0.42)',
    fontSize: 9,
    textAlign: 'center',
    marginTop: 10,
  },
  /* Visual Image Banner Section Styles */
  visualBannerSection: {
    maxWidth: 1680,
    alignSelf: 'center',
    width: '100%',
    marginBottom: 44,
  },
  visualOnlyBanner: {
    width: '100%',
    height: 220,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(23, 36, 42, 0.08)',
    shadowColor: COLORS.navy,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  visualOnlyBannerDesktop: {
    height: 420,
    borderRadius: 28,
  },

  footer: {
    width: '100%',
    maxWidth: 1280,
    alignSelf: 'center',
    alignItems: 'center',
    paddingTop: 42,
    paddingBottom: 42,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#EFE5D6',
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#E0D0B9',
  },
  footerMark: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.coral,
  },
  footerMarkText: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '900',
  },
  footerTitle: {
    color: COLORS.ink,
    textAlign: 'center',
    fontSize: 24,
    lineHeight: 29,
    fontWeight: '800',
    letterSpacing: -0.6,
    marginTop: 14,
  },
  footerCopy: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 10,
  },
  footerLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    marginTop: 22,
  },
  footerLink: {
    color: COLORS.ink,
    fontSize: 11,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  copyright: {
    color: '#9BA3A5',
    fontSize: 9,
    marginTop: 22,
  },
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: 72,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: COLORS.navy,
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 10,
  },
  navItem: {
    minWidth: 55,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  navLabel: {
    color: '#7A878B',
    fontSize: 9,
    fontWeight: '700',
  },
  navLabelActive: {
    color: COLORS.coral,
  },
  navDot: {
    position: 'absolute',
    bottom: -1,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.coral,
  },
  pressed: {
    opacity: 0.72,
  },
  cardPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
  // Modal Styles
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(10, 26, 33, 0.72)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalDialog: {
    width: '100%',
    maxWidth: 620,
    maxHeight: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
  },
  modalDialogDesktop: {
    maxWidth: 680,
    padding: 24,
  },
  modalDialogLarge: {
    width: '100%',
    maxWidth: 760,
    maxHeight: '88%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
  },
  modalDialogLargeDesktop: {
    maxWidth: 820,
    padding: 26,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  modalTopHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  modalEyebrow: {
    color: COLORS.coral,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.1,
  },
  modalMainTitle: {
    color: COLORS.navy,
    fontSize: 18,
    fontWeight: '900',
    marginTop: 3,
  },
  modalSearchBarWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F5F7',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 46,
    gap: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  modalSearchInput: {
    flex: 1,
    color: COLORS.navy,
    fontSize: 14,
    fontWeight: '600',
  },
  modalClearBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalClearBtnText: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '900',
  },
  modalCloseBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseBtnText: {
    color: COLORS.navy,
    fontSize: 15,
    fontWeight: '800',
  },
  modalFilterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 14,
  },
  modalFilterChip: {
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  modalFilterChipActive: {
    backgroundColor: COLORS.navy,
    borderColor: COLORS.navy,
  },
  modalFilterChipText: {
    color: '#475569',
    fontSize: 11,
    fontWeight: '700',
  },
  modalFilterChipTextActive: {
    color: '#FFFFFF',
  },
  modalTrendingWrap: {
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  modalTrendingTitle: {
    color: '#64748B',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  modalTrendingChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  modalTrendChip: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FFEDD5',
  },
  modalTrendChipText: {
    color: '#C2410C',
    fontSize: 10,
    fontWeight: '700',
  },
  modalResultsList: {
    maxHeight: 440,
  },
  modalEmptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  modalEmptyEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  modalEmptyTitle: {
    color: COLORS.navy,
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 4,
  },
  modalEmptySubtitle: {
    color: '#64748B',
    fontSize: 12,
    textAlign: 'center',
  },
  modalResultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 10,
    borderRadius: 14,
    backgroundColor: '#FAF8F5',
    borderWidth: 1,
    borderColor: '#EDE8E1',
    marginBottom: 8,
  },
  modalResultCardPressed: {
    backgroundColor: '#F3EFE9',
  },
  modalResultImg: {
    width: 64,
    height: 64,
    borderRadius: 10,
    backgroundColor: '#E2E8F0',
  },
  modalResultEmojiBox: {
    width: 64,
    height: 64,
    borderRadius: 10,
    backgroundColor: '#FFF3E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalResultTopRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  modalResultBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  modalResultBadgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  modalResultTitle: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: '800',
    marginTop: 2,
  },
  modalResultSubtitle: {
    color: '#64748B',
    fontSize: 11,
    marginTop: 2,
  },
  modalResultArrow: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  // Cart / Pass Styles
  passCard: {
    backgroundColor: '#FAFAF9',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E7E5E4',
    marginBottom: 10,
  },
  passHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  passBrandBadge: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  passBrandText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
  },
  passCode: {
    color: COLORS.coral,
    fontSize: 11,
    fontWeight: '900',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  passTitle: {
    color: COLORS.navy,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 2,
  },
  passPlot: {
    color: '#78716C',
    fontSize: 10,
    marginBottom: 6,
  },
  passBenefitRow: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 10,
  },
  passBenefitText: {
    color: '#92400E',
    fontSize: 10,
    fontWeight: '700',
  },
  passActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  passBtnSecondary: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D6D3D1',
  },
  passBtnSecondaryText: {
    color: COLORS.navy,
    fontSize: 11,
    fontWeight: '700',
  },
  passBtnPrimary: {
    flex: 1,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: COLORS.coral,
    alignItems: 'center',
    justifyContent: 'center',
  },
  passBtnPrimaryText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  passBtnDelete: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: '#FEE2E2',
  },
  passBtnDeleteText: {
    color: '#DC2626',
    fontSize: 11,
    fontWeight: '700',
  },
  cartFooter: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  cartFooterNote: {
    color: '#64748B',
    fontSize: 10,
    lineHeight: 15,
  },
  // Vendor Portal Styles
  vendorHeaderBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#0F172A',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  vendorLiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00E676',
  },
  vendorHeaderBadgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  vendorTabContent: {
    paddingVertical: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 14,
  },
  statCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statNumber: {
    color: COLORS.navy,
    fontSize: 20,
    fontWeight: '900',
  },
  statLabel: {
    color: '#64748B',
    fontSize: 10,
    marginTop: 3,
    fontWeight: '600',
  },
  leadInfoBox: {
    backgroundColor: '#EFF6FF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  leadInfoTitle: {
    color: '#1E40AF',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 4,
  },
  leadInfoText: {
    color: '#3B82F6',
    fontSize: 11,
    lineHeight: 16,
  },
  offerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
  },
  offerTitle: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: '800',
  },
  offerSub: {
    color: '#64748B',
    fontSize: 10,
    marginTop: 2,
  },
  toggleBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#E2E8F0',
  },
  toggleBtnActive: {
    backgroundColor: '#DCFCE7',
  },
  toggleBtnText: {
    color: '#15803D',
    fontSize: 10,
    fontWeight: '900',
  },
  addOfferBtn: {
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: COLORS.navy,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  addOfferBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  leadCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 8,
  },
  leadName: {
    color: COLORS.navy,
    fontSize: 13,
    fontWeight: '800',
  },
  leadPhone: {
    color: '#64748B',
    fontSize: 10,
    marginTop: 1,
  },
  leadProject: {
    color: COLORS.coral,
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },
  leadTimeWrap: {
    alignItems: 'flex-end',
    gap: 6,
  },
  leadTimeText: {
    color: '#059669',
    fontSize: 10,
    fontWeight: '700',
  },
  contactBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: '#10B981',
  },
  contactBtnText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 8,
  },
  serviceTitle: {
    color: COLORS.navy,
    fontSize: 12,
    fontWeight: '800',
  },
  serviceDesc: {
    color: '#64748B',
    fontSize: 10,
    marginTop: 2,
  },
  requestBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: COLORS.navy,
  },
  requestBtnText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
});
