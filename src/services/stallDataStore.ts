/**
 * Real-Time Stall Data Store for Mela Fest Stall Owners & 3D Fairground Customization
 */

export interface LandmarkProjectItem {
  name: string;
  location: string;
  priceRange: string;
  sizeArea: string;
  bedBath: string;
  orientation: string;
  status: 'Ready' | 'Under Construction' | 'Upcoming';
  amenities: string[];
}

export interface EditableStallConfig {
  slug: string;
  name: string;
  bangla: string;
  tagline: string;
  description: string;
  story: string;
  location: string;
  category: string;
  accentColor: string;
  initials: string;
  rating: string;
  reviews: string;
  founded: string;
  makers: string;
  material: string;
  demo: string;
  offer: string;
  offerCashback: string;
  offerPromoCode: string;
  offerValidity: string;
  phone: string;
  agent: {
    name: string;
    title: string;
    phone: string;
  };
  landmarkProjects: LandmarkProjectItem[];
  theme3D: {
    ambientColor: string;
    modelType: 'SkyVilla' | 'EcoTower' | 'Penthouse' | 'Commercial';
    lightingWarmth: number;
  };
}

export const INITIAL_STALLS_DATA: Record<string, EditableStallConfig> = {
  'shanta-pinnacle': {
    slug: 'shanta-pinnacle',
    name: 'Shanta Pinnacle Suites',
    bangla: 'শান্তা হোল্ডিংস · দ্য পিনাকল',
    tagline: 'Setting standards in luxury architectural landmarks.',
    description:
      'Step into Bangladesh’s premier ultra-luxury residential landmark. Featuring double-height sky duplexes, cantilevered private infinity pools, and panoramic lake vistas in Gulshan 2.',
    story:
      'Designed by internationally acclaimed architectural masters, Shanta Pinnacle redefines Dhaka’s skyline with energy-efficient curtain glass facades, 4-tier biometric security, dedicated lifestyle concierge, and private elevator foyers.',
    location: 'Plot A1 · Gulshan 2 Avenue',
    category: 'Ultra-Luxury Sky Villa',
    accentColor: '#D4AF37',
    initials: 'SH',
    rating: '4.9',
    reviews: '240',
    founded: 'Established 2005',
    makers: 'Principal Architects',
    material: 'Curtain Glass & Italian Marble',
    demo: '3D VR Sky Tour · 4:00 PM',
    offer: '৳15 Lac Spot Booking Cashback + Complimentary Signature Interior Package',
    offerCashback: '৳ 15,00,000',
    offerPromoCode: 'EXPO-SHANTA-7721',
    offerValidity: 'Live Fair Days',
    phone: '+880 1711 002233',
    agent: {
      name: 'Tanvir Ahmed',
      title: 'Senior Portfolio Director',
      phone: '+880 1711 002233',
    },
    landmarkProjects: [
      {
        name: 'The Pinnacle Suites',
        location: 'Plot A1 · Gulshan 2 Avenue',
        priceRange: '৳ 4.5 Cr – ৳ 11.0 Cr',
        sizeArea: '3,200 – 6,500 sqft',
        bedBath: '4 Beds · 5 Baths',
        orientation: 'South-East Lake Facing',
        status: 'Under Construction',
        amenities: ['Private Infinity Pool', 'Imported Italian Marble', 'Concierge Foyer'],
      },
      {
        name: 'Shanta Forum Landmark',
        location: 'Tejgaon Central Boulevard',
        priceRange: '৳ 3.8 Cr – ৳ 8.5 Cr',
        sizeArea: '2,600 – 4,800 sqft',
        bedBath: '3-4 Beds · 4 Baths',
        orientation: 'North-East Open Vista',
        status: 'Ready',
        amenities: ['LEED Gold Certified', 'Double Glazed Glass', 'High-Speed Elevators'],
      },
      {
        name: 'Shanta Utopia Condos',
        location: 'Mirpur DOHS Avenue',
        priceRange: '৳ 2.2 Cr – ৳ 4.0 Cr',
        sizeArea: '1,850 – 2,900 sqft',
        bedBath: '3 Beds · 3 Baths',
        orientation: 'South Facing Greenery',
        status: 'Upcoming',
        amenities: ['Rooftop Jogging Track', 'Solar Backup', 'Kids Arena'],
      },
    ],
    theme3D: {
      ambientColor: '#D4AF37',
      modelType: 'SkyVilla',
      lightingWarmth: 1.4,
    },
  },
  'sheltech-elysium': {
    slug: 'sheltech-elysium',
    name: 'Sheltech Elysium Lakeview',
    bangla: 'শেলটেক লাক্সারি লিভিং · এলিসিয়াম',
    tagline: '35 years of trusted urban living & smart communities.',
    description:
      'Serene lakefront residences with a private jogging promenade, 99% solar-powered common areas, and multi-tier clubhouse amenities.',
    story:
      'For over 35 years, Sheltech has engineered homes with 100% earthquake-resistant structural safety, expansive green balconies, and guaranteed handover timelines.',
    location: 'Plot A2 · Banani Lakefront',
    category: 'Eco Luxury Living',
    accentColor: '#2EB872',
    initials: 'SL',
    rating: '4.8',
    reviews: '310',
    founded: 'Since 1988',
    makers: '35+ Yrs Engineering Trust',
    material: 'Engineered Concrete & Glass',
    demo: 'Architectural Model Demo · 5:30 PM',
    offer: 'Zero Registration Cost + Guaranteed 3-Year Rental Yield',
    offerCashback: '100% Free Registration',
    offerPromoCode: 'EXPO-SHELTECH-3390',
    offerValidity: 'Exclusive Spot Privilege',
    phone: '+880 1819 445566',
    agent: {
      name: 'Farhana Rahman',
      title: 'Lead Property Advisor',
      phone: '+880 1819 445566',
    },
    landmarkProjects: [
      {
        name: 'Sheltech Elysium Lakeview',
        location: 'Banani Lake Road',
        priceRange: '৳ 2.9 Cr – ৳ 6.5 Cr',
        sizeArea: '2,100 – 4,200 sqft',
        bedBath: '3-4 Beds · 4 Baths',
        orientation: 'South-West Lake Vista',
        status: 'Under Construction',
        amenities: ['Private Pier', 'EV Fast Charging', '99% Solar Power'],
      },
      {
        name: 'Sheltech Platinum Heights',
        location: 'Dhanmondi Road 8/A',
        priceRange: '৳ 3.2 Cr – ৳ 5.8 Cr',
        sizeArea: '2,400 – 3,600 sqft',
        bedBath: '4 Beds · 4 Baths',
        orientation: 'South Facing Garden',
        status: 'Ready',
        amenities: ['Clubhouse & Gym', '24/7 Monitored CCTV', 'Central Gas Line'],
      },
    ],
    theme3D: {
      ambientColor: '#2EB872',
      modelType: 'EcoTower',
      lightingWarmth: 1.2,
    },
  },
  'navana-botanica': {
    slug: 'navana-botanica',
    name: 'Navana Botanica Eco 3BHK',
    bangla: 'নাভানা রিয়েল এস্টেট · বোটানিকা',
    tagline: 'Pioneering eco-friendly sustainable smart architecture.',
    description:
      'Vertical forest balconies, rainwater harvesting systems, solar micro-grid, and full-home IoT automation.',
    story:
      'Navana Botanica brings nature into vertical urban dwellings. Every residence enjoys dual-aspect cross-ventilation, soundproof German glazing, and smart app-controlled ambient lighting.',
    location: 'Plot B1 · Uttara Sector 4',
    category: 'Biophilic Smart Living',
    accentColor: '#00E5FF',
    initials: 'NV',
    rating: '4.8',
    reviews: '195',
    founded: 'Since 1996',
    makers: 'Green Building Council',
    material: 'Biophilic Eco Concrete',
    demo: 'Smart IoT Home Demo · 6:00 PM',
    offer: 'Free Full-Home IoT Automation Kit + 8% Fair Discount',
    offerCashback: '৳ 8,00,000 Free Smart Kit',
    offerPromoCode: 'EXPO-NAVANA-1092',
    offerValidity: 'Fair Special',
    phone: '+880 1977 112299',
    agent: {
      name: 'Ashfaqur Chowdhury',
      title: 'Smart Home Specialist',
      phone: '+880 1977 112299',
    },
    landmarkProjects: [
      {
        name: 'Navana Botanica Tower',
        location: 'Uttara Sector 4 Lakeview',
        priceRange: '৳ 1.4 Cr – ৳ 3.5 Cr',
        sizeArea: '1,500 – 2,800 sqft',
        bedBath: '3 Beds · 3 Baths',
        orientation: 'East-West Cross Ventilation',
        status: 'Under Construction',
        amenities: ['Vertical Forest Balconies', 'Rainwater Harvesting', 'App Controlled Lighting'],
      },
    ],
    theme3D: {
      ambientColor: '#00E5FF',
      modelType: 'EcoTower',
      lightingWarmth: 1.0,
    },
  },
  'rangs-toruk': {
    slug: 'rangs-toruk',
    name: 'Rangs Toruk Penthouse',
    bangla: 'র‍্যাংগস প্রপার্টিজ · তরুক',
    tagline: 'Sculpting iconic bold contemporary architecture.',
    description:
      'Dramatic fair-face exposed concrete cantilevers, private plunge pools, and bespoke single-unit luxury floors in Banani 11.',
    story:
      'Rangs Toruk is an architectural sculpture in the skyline. Designed with German engineered floor-to-ceiling glass, custom Italian joinery, and private sky gardens.',
    location: 'Plot B3 · Banani Block 11',
    category: 'Sculptural Luxury Residence',
    accentColor: '#FF1744',
    initials: 'RG',
    rating: '4.9',
    reviews: '280',
    founded: 'Since 1998',
    makers: 'Avant-Garde Studio',
    material: 'Fair-Face Concrete & Glass',
    demo: 'Architectural Masterclass · 7:00 PM',
    offer: 'Complimentary Signature Italian Interior Package (Value ৳20L)',
    offerCashback: '৳ 20,00,000 Interior Voucher',
    offerPromoCode: 'EXPO-RANGS-9941',
    offerValidity: 'Spot Allotment',
    phone: '+880 1708 556677',
    agent: {
      name: 'Rubaiyat Zaman',
      title: 'Senior Architect & Curator',
      phone: '+880 1708 556677',
    },
    landmarkProjects: [
      {
        name: 'Rangs Toruk Sky Villa',
        location: 'Banani Road 11',
        priceRange: '৳ 4.2 Cr – ৳ 9.8 Cr',
        sizeArea: '3,000 – 5,400 sqft',
        bedBath: '4 Beds · 5 Baths',
        orientation: 'Panoramic 360 Degree View',
        status: 'Ready',
        amenities: ['Private Heated Plunge Pool', 'German Engineered Glass', 'Italian Kitchen'],
      },
    ],
    theme3D: {
      ambientColor: '#FF1744',
      modelType: 'Penthouse',
      lightingWarmth: 1.5,
    },
  },
  'assure-majestic': {
    slug: 'assure-majestic',
    name: 'Assure Majestic Heights',
    bangla: 'অ্যাসিওর গ্রুপ · ম্যাজেস্টিক হাইটস',
    tagline: 'Exquisite craftsmanship, timely delivery & prime Dhaka locations.',
    description:
      'Waterfront luxury condominiums with imported Turkish marble, rooftop community infinity lounge, and 24/7 monitored guarding.',
    story:
      'Assure Group is renowned for on-time handover guarantee, prime residential addresses across Gulshan, Banani, and Uttara, and bespoke interior packages.',
    location: 'Plot C2 · Central South Walkway',
    category: 'Waterfront Condominiums',
    accentColor: '#E040FB',
    initials: 'AS',
    rating: '4.8',
    reviews: '165',
    founded: 'Since 2007',
    makers: 'Assure Engineering',
    material: 'Turkish Marble & Reinforced Concrete',
    demo: 'Waterfront Condos Tour · 6:30 PM',
    offer: 'Guaranteed 50g Gold Coin + ৳5 Lac Interior Voucher on Spot Booking',
    offerCashback: '50g Gold Coin + ৳5L Interior',
    offerPromoCode: 'EXPO-ASSURE-5520',
    offerValidity: 'Live 15 Days of Fair',
    phone: '+880 1841 334455',
    agent: {
      name: 'Muntasir Billah',
      title: 'Corporate Sales Lead',
      phone: '+880 1841 334455',
    },
    landmarkProjects: [
      {
        name: 'Assure Majestic Heights',
        location: 'Uttara Sector 3 (Near Park)',
        priceRange: '৳ 1.6 Cr – ৳ 3.4 Cr',
        sizeArea: '1,750 – 2,700 sqft',
        bedBath: '3 Beds · 3 Baths',
        orientation: 'South-East',
        status: 'Under Construction',
        amenities: ['Imported Turkish Marble', 'Rooftop Community Lounge', '24/7 Monitored CCTV Guarding'],
      },
      {
        name: 'Assure Oasis Bay',
        location: 'Mirpur DOHS Waterfront',
        priceRange: '৳ 1.9 Cr – ৳ 3.8 Cr',
        sizeArea: '1,900 – 2,950 sqft',
        bedBath: '3-4 Beds · 4 Baths',
        orientation: 'Lakefront Open View',
        status: 'Ready',
        amenities: ['Private Lake Deck', 'Fitness Center', 'Double Parking'],
      },
      {
        name: 'Assure Celestial Star',
        location: 'Dhanmondi Central (Road 9/A)',
        priceRange: '৳ 2.4 Cr – ৳ 4.9 Cr',
        sizeArea: '2,100 – 3,300 sqft',
        bedBath: '4 Beds · 4 Baths',
        orientation: 'South Facing',
        status: 'Under Construction',
        amenities: ['High-Speed Elevators', 'Community Hall', 'Full Power Backup'],
      },
      {
        name: 'Assure Palace Royale',
        location: 'Banani Block F',
        priceRange: '৳ 3.8 Cr – ৳ 7.6 Cr',
        sizeArea: '2,800 – 4,500 sqft',
        bedBath: '4 Beds · 5 Baths',
        orientation: 'Corner Plot',
        status: 'Ready',
        amenities: ['Single Unit Floor', 'Smart Door Access', 'Private Balcony Gardens'],
      },
    ],
    theme3D: {
      ambientColor: '#E040FB',
      modelType: 'SkyVilla',
      lightingWarmth: 1.3,
    },
  },
  'bti-three-sixty': {
    slug: 'bti-three-sixty',
    name: 'bti Three Sixty Suites',
    bangla: 'বিটিআই · থ্রি সিক্সটি লাইফস্টাইল',
    tagline: '40 years of structural excellence & smart engineering.',
    description:
      'Contemporary high-rise apartments featuring earthquake-damping structural tech, solar power arrays, and panoramic skyline viewing lounges.',
    story:
      'With four decades of pioneering real estate in Bangladesh, bti delivers highest quality craftsmanship, green building technologies, and dedicated customer care.',
    location: 'Plot B2 · Central East Promenade',
    category: 'Engineered Luxury Living',
    accentColor: '#FF6D00',
    initials: 'BT',
    rating: '4.8',
    reviews: '230',
    founded: 'Since 1984',
    makers: 'bti Engineering Team',
    material: 'Engineered Steel & Concrete',
    demo: 'Structural Safety Tour · 4:30 PM',
    offer: 'Zero Transfer Fees + Free Smart Kitchen Appliance Package',
    offerCashback: '৳ 6,50,000 Kitchen Kit',
    offerPromoCode: 'EXPO-BTI-8830',
    offerValidity: 'Expo Days Only',
    phone: '+880 1713 008899',
    agent: {
      name: 'Shahriar Kabir',
      title: 'Senior Property Consultant',
      phone: '+880 1713 008899',
    },
    landmarkProjects: [
      {
        name: 'bti Three Sixty',
        location: 'Gulshan 1 (Road 132)',
        priceRange: '৳ 3.5 Cr – ৳ 7.2 Cr',
        sizeArea: '2,600 – 4,800 sqft',
        bedBath: '4 Beds · 4 Baths',
        orientation: 'South-East Lake Panorama',
        status: 'Under Construction',
        amenities: ['Seismic Damping System', 'Solar Array Grid', 'Infinity Sky Deck'],
      },
    ],
    theme3D: {
      ambientColor: '#FF6D00',
      modelType: 'SkyVilla',
      lightingWarmth: 1.3,
    },
  },
  'concord-regency': {
    slug: 'concord-regency',
    name: 'Concord Regency Lakeview',
    bangla: 'কনকর্ড রিয়েল এস্টেট · রিজেন্সি',
    tagline: '50 years of shaping Bangladesh’s iconic masterplans.',
    description:
      'Integrated township residences surrounded by landscaped central lakes, private clubhouses, and dedicated family leisure zones.',
    story:
      'Builders of the National Monument and Fantasy Kingdom, Concord is synonymous with megastructure engineering and masterplanned gated communities.',
    location: 'Plot C1 · South Plaza Garden Corner',
    category: 'Masterplanned Communities',
    accentColor: '#00E676',
    initials: 'CC',
    rating: '4.9',
    reviews: '340',
    founded: 'Since 1973',
    makers: 'Concord Group Engineers',
    material: 'Pre-stressed Concrete & Glass',
    demo: 'Masterplan VR Walk · 5:00 PM',
    offer: 'Guaranteed 5-Year Structural Warranty + 10% Spot Booking Rebate',
    offerCashback: '10% Spot Booking Rebate',
    offerPromoCode: 'EXPO-CONCORD-1973',
    offerValidity: 'Exclusive Expo Offer',
    phone: '+880 1711 556677',
    agent: {
      name: 'Tanvir Hossain',
      title: 'Principal Sales Lead',
      phone: '+880 1711 556677',
    },
    landmarkProjects: [
      {
        name: 'Concord Regency Lakeview',
        location: 'Khilkhet Lake City',
        priceRange: '৳ 1.5 Cr – ৳ 3.2 Cr',
        sizeArea: '1,650 – 2,750 sqft',
        bedBath: '3 Beds · 3 Baths',
        orientation: 'North-East Lakefront',
        status: 'Ready',
        amenities: ['Lakeside Clubhouse', 'Olympic Swimming Pool', '24/7 Security Patrol'],
      },
    ],
    theme3D: {
      ambientColor: '#00E676',
      modelType: 'EcoTower',
      lightingWarmth: 1.2,
    },
  },
  'bay-sanctuary': {
    slug: 'bay-sanctuary',
    name: 'Bay Sanctuary Waterfront',
    bangla: 'বে ডেভেলপমেন্টস · স্যাঙ্কচুয়ারি',
    tagline: 'Ultra-exclusive private waterfront estates & sky penthouses.',
    description:
      'Dhaka’s most private boutique luxury towers with single-unit floors, double-height cantilevered terraces, and direct lake access.',
    story:
      'Bay Developments crafts architectural jewelry for discerning homeowners, prioritizing privacy, natural breezes, and timeless monolithic aesthetics.',
    location: 'Plot C3 · South East VIP Waterfront',
    category: 'Ultra-Exclusive Private Estates',
    accentColor: '#FFD700',
    initials: 'BY',
    rating: '4.9',
    reviews: '180',
    founded: 'Since 1999',
    makers: 'Bay Master Craftsmen',
    material: 'Monolithic Fair-Face & Teak Wood',
    demo: 'Private Lakefront Tour · 6:00 PM',
    offer: 'Complimentary Bespoke Italian Teak Wood & Marble Fit-Out (Value ৳25L)',
    offerCashback: '৳ 25,00,000 Teak Fitout',
    offerPromoCode: 'EXPO-BAY-7700',
    offerValidity: 'Live Fair Days',
    phone: '+880 1715 990011',
    agent: {
      name: 'Naveed Ahmed',
      title: 'Managing Director - Private Sales',
      phone: '+880 1715 990011',
    },
    landmarkProjects: [
      {
        name: 'Bay Sanctuary Waterfront',
        location: 'Baridhara Diplomatic Enclave',
        priceRange: '৳ 6.5 Cr – ৳ 15.0 Cr',
        sizeArea: '4,200 – 7,500 sqft',
        bedBath: '4-5 Beds · 5 Baths',
        orientation: 'Direct South Lake Panorama',
        status: 'Under Construction',
        amenities: ['Private Boat Jetty', 'Single Unit Living', 'Smart Elevator Priority'],
      },
    ],
    theme3D: {
      ambientColor: '#FFD700',
      modelType: 'Penthouse',
      lightingWarmth: 1.5,
    },
  },
};

const SLUG_ALIAS_MAP: Record<string, string> = {
  shanta: 'shanta-pinnacle',
  sheltech: 'sheltech-elysium',
  navana: 'navana-botanica',
  rangs: 'rangs-toruk',
  bti: 'bti-three-sixty',
  concord: 'concord-regency',
  assure: 'assure-majestic',
  bay: 'bay-sanctuary',
};

const STORAGE_STALLS_DATA_KEY = 'mela_fest_stalls_data_store';

class StallDataStore {
  private data: Record<string, EditableStallConfig>;
  private subscribers: Set<() => void> = new Set();

  constructor() {
    this.data = { ...INITIAL_STALLS_DATA };
    this.loadFromStorage();
  }

  private resolveSlug(slug: string): string {
    return SLUG_ALIAS_MAP[slug] || slug;
  }

  private loadFromStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = window.localStorage.getItem(STORAGE_STALLS_DATA_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          this.data = { ...INITIAL_STALLS_DATA, ...parsed };
        }
      }
    } catch (e) {}
  }

  private persist() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(STORAGE_STALLS_DATA_KEY, JSON.stringify(this.data));
      }
    } catch (e) {}
    this.notifySubscribers();
  }

  public subscribe(cb: () => void): () => void {
    this.subscribers.add(cb);
    return () => this.subscribers.delete(cb);
  }

  private notifySubscribers() {
    this.subscribers.forEach((cb) => {
      try {
        cb();
      } catch (e) {}
    });
  }

  public getStall(rawSlug: string): EditableStallConfig {
    const slug = this.resolveSlug(rawSlug);
    if (this.data[slug]) {
      return { ...this.data[slug] };
    }
    // Fallback default
    return {
      slug,
      name: `${slug.toUpperCase()} Pavilion`,
      bangla: `${slug} প্যাভিলিয়ন`,
      tagline: 'Architectural Excellence & Prime Real Estate.',
      description: 'Explore signature residential and commercial developments.',
      story: 'Crafted with premium engineering standards and modern amenities.',
      location: 'Plot X · Fairground Central',
      category: 'Luxury Residences',
      accentColor: '#D4AF37',
      initials: slug.slice(0, 2).toUpperCase(),
      rating: '4.8',
      reviews: '120',
      founded: 'Since 2000',
      makers: 'Licensed Engineers',
      material: 'Reinforced Steel & Glass',
      demo: 'Live Showcase · 5:00 PM',
      offer: 'Special Spot Booking Cashback',
      offerCashback: '৳ 10,00,000',
      offerPromoCode: `EXPO-${slug.toUpperCase()}-2026`,
      offerValidity: 'Live Fair Days',
      phone: '+880 1700 000000',
      agent: {
        name: 'Representative',
        title: 'Sales Director',
        phone: '+880 1700 000000',
      },
      landmarkProjects: [
        {
          name: `${slug.toUpperCase()} Flagship Tower`,
          location: 'Prime Avenue',
          priceRange: '৳ 2.5 Cr – ৳ 5.0 Cr',
          sizeArea: '2,000 – 3,500 sqft',
          bedBath: '3-4 Beds · 4 Baths',
          orientation: 'South Facing',
          status: 'Under Construction',
          amenities: ['Modern Elevators', 'Full Power Backup', 'Fitness Center'],
        },
      ],
      theme3D: {
        ambientColor: '#D4AF37',
        modelType: 'SkyVilla',
        lightingWarmth: 1.2,
      },
    };
  }

  public getAllStalls(): Record<string, EditableStallConfig> {
    return { ...this.data };
  }

  public updateStall(rawSlug: string, updates: Partial<EditableStallConfig>): void {
    const slug = this.resolveSlug(rawSlug);
    const existing = this.getStall(slug);
    this.data[slug] = {
      ...existing,
      ...updates,
      agent: {
        ...existing.agent,
        ...(updates.agent || {}),
      },
      theme3D: {
        ...existing.theme3D,
        ...(updates.theme3D || {}),
      },
      landmarkProjects: updates.landmarkProjects || existing.landmarkProjects,
    };
    this.persist();
  }

  public addProject(rawSlug: string, project: LandmarkProjectItem): void {
    const slug = this.resolveSlug(rawSlug);
    const stall = this.getStall(slug);
    stall.landmarkProjects = [project, ...stall.landmarkProjects];
    this.data[slug] = stall;
    this.persist();
  }

  public updateProject(rawSlug: string, index: number, project: LandmarkProjectItem): void {
    const slug = this.resolveSlug(rawSlug);
    const stall = this.getStall(slug);
    if (stall.landmarkProjects[index]) {
      stall.landmarkProjects[index] = project;
      this.data[slug] = stall;
      this.persist();
    }
  }

  public deleteProject(rawSlug: string, index: number): void {
    const slug = this.resolveSlug(rawSlug);
    const stall = this.getStall(slug);
    stall.landmarkProjects = stall.landmarkProjects.filter((_, i) => i !== index);
    this.data[slug] = stall;
    this.persist();
  }

  public resetToDefaults(): void {
    this.data = { ...INITIAL_STALLS_DATA };
    this.persist();
  }
}

export const stallStore = new StallDataStore();
