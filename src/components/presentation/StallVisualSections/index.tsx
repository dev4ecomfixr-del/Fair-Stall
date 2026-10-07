import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ImageBackground,
  ScrollView,
  Modal,
  Alert,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export interface FlightImageItem {
  id: string;
  category: 'all' | 'aerial' | 'exterior' | 'interior' | 'amenities';
  categoryLabel: string;
  title: string;
  subtitle: string;
  source: any;
  tag: string;
  flightAltitude?: string;
  specs?: string[];
}

export const FLIGHT_GALLERY: FlightImageItem[] = [
  {
    id: 'flight-1',
    category: 'aerial',
    categoryLabel: '✈️ Aerial & Flight View',
    title: 'Panoramic 360° Skyline & Lakefront Flight View',
    subtitle: 'High-altitude drone capture over Prime Diplomatic Zone & Express Highway',
    source: require('../../../../assets/dhaka-expo-hero.jpg'),
    tag: '360° SKYLINE FLIGHT',
    flightAltitude: '180M Altitude View',
    specs: ['Unobstructed 360° Views', 'Lakefront Orientation', 'Verified Drone Survey'],
  },
  {
    id: 'flight-2',
    category: 'exterior',
    categoryLabel: '🏛️ Exterior Façade',
    title: 'Biophilic Green Terrace & Double-Glazed Glass Tower',
    subtitle: 'LEED Gold Certified acoustic glazing with vertical hydroponic gardens',
    source: require('../../../../assets/stall-shanta-hero.jpg'),
    tag: 'FAÇADE ARCHITECTURE',
    flightAltitude: 'Tower Heights 42 Floors',
    specs: ['Double Low-E Glass', 'Acoustic Noise Isolation', '9.0 Richter Scale Resistant'],
  },
  {
    id: 'flight-3',
    category: 'interior',
    categoryLabel: '🛋️ Luxury Interior',
    title: 'Grand Living Lounge & Imported Italian Marble Suites',
    subtitle: '14ft ceiling height with floor-to-ceiling double-glazed glass viewports',
    source: require('../../../../assets/deal-shanta-pinnacle.jpg'),
    tag: 'LUXURY SUITE INTERIOR',
    flightAltitude: 'Duplex Sky Villa Level 35',
    specs: ['Italian Bottochino Marble', 'Integrated IoT Automation', 'VRF Central Air System'],
  },
  {
    id: 'flight-4',
    category: 'amenities',
    categoryLabel: '🏊 Amenities & Pool',
    title: 'Temperature-Controlled Infinity Pool & Sunset Lounge',
    subtitle: 'Heated sky pool with private resident cabanas and 360° observation lounge',
    source: require('../../../../assets/deal-sheltech-elysium.jpg'),
    tag: 'ROOFTOP CLUBHOUSE',
    flightAltitude: 'Level 38 Sky Deck',
    specs: ['Heated Infinity Pool', 'Resident Cigar Lounge', 'Helipad & Sky Promenade'],
  },
  {
    id: 'flight-5',
    category: 'exterior',
    categoryLabel: '🏛️ Exterior Façade',
    title: 'Triple-Height Marble Lobby & Private Porte-Cochère',
    subtitle: '3-lane private driveway with 24/7 dedicated valet & concierge station',
    source: require('../../../../assets/pavilion-shanta.jpg'),
    tag: 'GRAND PORTE-COCHÈRE',
    flightAltitude: 'Ground Atrium Plaza',
    specs: ['3-Tier Security Gate', 'Automatic License Reader', 'Triple-Height Atrium'],
  },
  {
    id: 'flight-6',
    category: 'aerial',
    categoryLabel: '✈️ Aerial & Flight View',
    title: 'Architectural Night Illumination & Sky Promenade',
    subtitle: 'DMX programmable dynamic LED lighting by international lighting master architects',
    source: require('../../../../assets/mela-expo-banner.jpg'),
    tag: 'NIGHT FLIGHT ILLUMINATION',
    flightAltitude: 'Dusk Flight Render',
    specs: ['DMX Architectural Lighting', 'Rooftop Observatory', '360° Sky Walking Track'],
  },
];

const CAROUSEL_CATEGORIES = [
  { id: 'all', label: 'All Photos (6)', icon: '✦' },
  { id: 'aerial', label: '✈️ Aerial & Skyline Views', icon: '✈️' },
  { id: 'exterior', label: '🏛️ Tower Façade & Exterior', icon: '🏛️' },
  { id: 'interior', label: '🛋️ Luxury Residence Interiors', icon: '🛋️' },
  { id: 'amenities', label: '🏊 Sky Club & Amenities', icon: '🏊' },
];

/** Visual Banner 1: Top Spot Discount & Allotment Banner */
export function StallVisualBanner1({
  stallName,
  onClaimOffer,
  horizontalInset = 0,
}: {
  stallName: string;
  onClaimOffer: () => void;
  horizontalInset?: number;
}) {
  return (
    <View style={styles.banner1Wrapper}>
      <ImageBackground
        source={require('../../../../assets/mela-expo-banner.jpg')}
        resizeMode="cover"
        imageStyle={styles.banner1ImageStyle}
        style={styles.banner1Card}
      >
        <LinearGradient
          colors={['rgba(10, 26, 33, 0.92)', 'rgba(10, 26, 33, 0.72)', 'rgba(10, 26, 33, 0.88)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner1Gradient}
        >
          <View style={styles.banner1BadgeRow}>
            <View style={styles.banner1Badge}>
              <Text style={styles.banner1BadgeText}>✦ EXPO EXCLUSIVE SPOT DISCOUNT</Text>
            </View>
            <View style={styles.liveTag}>
              <View style={styles.liveDot} />
              <Text style={styles.liveTagText}>FAIR SPOT ONLY</Text>
            </View>
          </View>

          <Text style={styles.banner1Title}>
            Save up to ৳15 Lac on Spot Booking at {stallName}
          </Text>

          <Text style={styles.banner1Sub}>
            Book your luxury residence during Mela Fest 2026 to receive 0% bank loan processing fee, a free IoT Smart Home Suite, and guaranteed completion date protection.
          </Text>

          <View style={styles.banner1PillsRow}>
            <View style={styles.banner1Pill}>
              <Text style={styles.banner1PillIcon}>🎁</Text>
              <Text style={styles.banner1PillText}>Free Home Automation</Text>
            </View>
            <View style={styles.banner1Pill}>
              <Text style={styles.banner1PillIcon}>🏦</Text>
              <Text style={styles.banner1PillText}>0% Spot Processing Fee</Text>
            </View>
            <View style={styles.banner1Pill}>
              <Text style={styles.banner1PillIcon}>📜</Text>
              <Text style={styles.banner1PillText}>100% Legal Title Guarantee</Text>
            </View>
          </View>

          <View style={styles.banner1BtnRow}>
            <Pressable
              onPress={onClaimOffer}
              style={({ pressed }) => [styles.banner1PrimaryBtn, pressed && styles.pressed]}
            >
              <Text style={styles.banner1PrimaryBtnText}>Claim Spot Discount →</Text>
            </Pressable>

            <Pressable
              onPress={() =>
                Alert.alert(
                  'Brochure Download',
                  `Official brochure & pricing prospectus for ${stallName} will be sent to your device.`
                )
              }
              style={({ pressed }) => [styles.banner1SecondaryBtn, pressed && styles.pressed]}
            >
              <Text style={styles.banner1SecondaryBtnText}>📥 Download PDF Brochure</Text>
            </Pressable>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

/** Flight Image Grid Carousel: High-End Interactive Image Gallery */
export function StallFlightImageCarousel({
  stallName,
  horizontalInset = 0,
}: {
  stallName: string;
  horizontalInset?: number;
}) {
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [zoomModalVisible, setZoomModalVisible] = useState<boolean>(false);

  const filteredGallery = useMemo(() => {
    if (selectedCat === 'all') return FLIGHT_GALLERY;
    return FLIGHT_GALLERY.filter((item) => item.category === selectedCat);
  }, [selectedCat]);

  const currentItem = filteredGallery[activeIndex] || filteredGallery[0] || FLIGHT_GALLERY[0];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % filteredGallery.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + filteredGallery.length) % filteredGallery.length);
  };

  const openCardInLightbox = (index: number) => {
    setActiveIndex(index);
    setZoomModalVisible(true);
  };

  return (
    <View style={styles.carouselWrapper}>
      {/* Section Header */}
      <View style={styles.carouselHeaderRow}>
        <View style={{ flex: 1 }}>
          <View style={styles.carouselEyebrow}>
            <Text style={styles.carouselEyebrowText}>ARCHITECTURAL PORTFOLIO & 360° RENDERS</Text>
          </View>
          <Text style={styles.carouselTitle}>Architectural Gallery & Sky Flight Renders</Text>
          <Text style={styles.carouselSub}>
            Explore high-resolution aerial flight perspectives, biophilic glass tower facades, and bespoke luxury suite interiors engineered for {stallName}.
          </Text>
        </View>

        <Pressable
          onPress={() => setZoomModalVisible(true)}
          style={({ pressed }) => [styles.zoomTriggerBtn, pressed && styles.pressed]}
        >
          <Text style={styles.zoomTriggerText}>🔍 Open Lightbox Gallery</Text>
        </Pressable>
      </View>

      {/* Category Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterChipScroll}
      >
        {CAROUSEL_CATEGORIES.map((cat) => {
          const isActive = selectedCat === cat.id;
          return (
            <Pressable
              key={cat.id}
              onPress={() => {
                setSelectedCat(cat.id);
                setActiveIndex(0);
              }}
              style={[styles.filterChip, isActive && styles.filterChipActive]}
            >
              <Text style={[styles.filterChipText, isActive && styles.filterChipTextActive]}>
                {cat.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Featured Hero Main Preview Card */}
      <View style={styles.mainPreviewCard}>
        <ImageBackground
          source={currentItem.source}
          resizeMode="cover"
          imageStyle={styles.mainPreviewImage}
          style={styles.mainPreviewBg}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.4)', 'rgba(5, 13, 17, 0.9)']}
            locations={[0, 0.5, 1]}
            style={styles.mainPreviewGradient}
          >
            {/* Top Overlay Badge */}
            <View style={styles.mainPreviewTopRow}>
              <View style={styles.tagPill}>
                <Text style={styles.tagPillText}>{currentItem.tag}</Text>
              </View>

              {currentItem.flightAltitude && (
                <View style={styles.altitudePill}>
                  <Text style={styles.altitudePillText}>✈️ {currentItem.flightAltitude}</Text>
                </View>
              )}
            </View>

            {/* Navigation Arrows on Preview */}
            <View style={styles.arrowControlsRow}>
              <Pressable
                onPress={handlePrev}
                style={({ pressed }) => [styles.arrowBtn, pressed && styles.pressed]}
              >
                <Text style={styles.arrowBtnText}>‹</Text>
              </Pressable>

              <Pressable
                onPress={handleNext}
                style={({ pressed }) => [styles.arrowBtn, pressed && styles.pressed]}
              >
                <Text style={styles.arrowBtnText}>›</Text>
              </Pressable>
            </View>

            {/* Bottom Info Overlay */}
            <View style={styles.mainPreviewBottomInfo}>
              <Pressable onPress={() => setZoomModalVisible(true)}>
                <Text style={styles.previewTitleText}>{currentItem.title} 🔍</Text>
              </Pressable>
              <Text style={styles.previewSubText}>{currentItem.subtitle}</Text>

              {currentItem.specs && (
                <View style={styles.specsRow}>
                  {currentItem.specs.map((spec, sIdx) => (
                    <View key={sIdx} style={styles.specChip}>
                      <Text style={styles.specChipText}>✓ {spec}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>

      {/* Image Gallery Grid Section */}
      <View style={styles.galleryGridSectionHeader}>
        <Text style={styles.galleryGridSectionTitle}>
          IMAGE GALLERY ({filteredGallery.length} PHOTOS)
        </Text>
        <Text style={styles.galleryGridSectionSub}>
          Tap any render photo below to view in full screen 4K Lightbox
        </Text>
      </View>

      <View style={styles.imageGalleryGrid}>
        {filteredGallery.map((item, index) => {
          const isSelected = index === activeIndex;
          return (
            <Pressable
              key={item.id}
              onPress={() => openCardInLightbox(index)}
              style={({ pressed }) => [
                styles.galleryGridCard,
                isSelected && styles.galleryGridCardSelected,
                pressed && styles.pressed,
              ]}
            >
              <ImageBackground
                source={item.source}
                resizeMode="cover"
                style={styles.galleryCardBg}
                imageStyle={styles.galleryCardImg}
              >
                <LinearGradient
                  colors={['rgba(0,0,0,0.15)', 'rgba(5, 13, 17, 0.85)']}
                  style={styles.galleryCardGradient}
                >
                  <View style={styles.galleryCardTopBar}>
                    <View style={styles.galleryCardBadge}>
                      <Text style={styles.galleryCardBadgeText}>{item.tag}</Text>
                    </View>
                    <View style={styles.galleryZoomIconCircle}>
                      <Text style={styles.galleryZoomIconText}>🔍</Text>
                    </View>
                  </View>

                  <View style={styles.galleryCardBottom}>
                    <Text style={styles.galleryCardTitle} numberOfLines={2}>
                      {item.title}
                    </Text>
                    <Text style={styles.galleryCardSub} numberOfLines={1}>
                      {item.subtitle}
                    </Text>
                  </View>
                </LinearGradient>
              </ImageBackground>
            </Pressable>
          );
        })}
      </View>

      {/* Fullscreen Multi-Image Lightbox Modal */}
      <Modal
        visible={zoomModalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setZoomModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalDialog}>
            <View style={styles.modalHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.modalHeaderTitle}>{currentItem.title}</Text>
                <Text style={styles.modalHeaderSub}>
                  {currentItem.tag} · Photo {activeIndex + 1} of {filteredGallery.length} · {stallName}
                </Text>
              </View>

              <Pressable onPress={() => setZoomModalVisible(false)} style={styles.modalCloseBtn}>
                <Text style={styles.modalCloseText}>✕</Text>
              </Pressable>
            </View>

            {/* Lightbox Main Viewport with Next/Prev Arrow Controls */}
            <View style={styles.modalImageWrap}>
              <Image source={currentItem.source} style={styles.modalFullImage} resizeMode="contain" />

              <Pressable onPress={handlePrev} style={styles.modalArrowLeft}>
                <Text style={styles.modalArrowText}>‹</Text>
              </Pressable>

              <Pressable onPress={handleNext} style={styles.modalArrowRight}>
                <Text style={styles.modalArrowText}>›</Text>
              </Pressable>
            </View>

            {/* Lightbox Bottom Thumbnail Bar */}
            <View style={styles.modalThumbBar}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
                {filteredGallery.map((mItem, mIdx) => (
                  <Pressable
                    key={mItem.id}
                    onPress={() => setActiveIndex(mIdx)}
                    style={[
                      styles.modalThumbCard,
                      mIdx === activeIndex && styles.modalThumbCardActive,
                    ]}
                  >
                    <Image source={mItem.source} style={styles.modalThumbImg} resizeMode="cover" />
                  </Pressable>
                ))}
              </ScrollView>
            </View>

            <View style={styles.modalFooterRow}>
              <Text style={styles.modalFooterText}>{currentItem.subtitle}</Text>
              <Pressable
                onPress={() => {
                  setZoomModalVisible(false);
                  Alert.alert('HD Render Saved', 'Full resolution 4K photo downloaded to your gallery.');
                }}
                style={styles.downloadHdBtn}
              >
                <Text style={styles.downloadHdText}>💾 Save 4K Photo</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

interface TestimonialItem {
  name: string;
  role: string;
  project: string;
  rating: string;
  avatarBg: string;
  initials: string;
  quote: string;
  badge: string;
  badgeBg: string;
  badgeColor: string;
}

const STALL_SPECIFIC_REVIEWS: Record<string, TestimonialItem[]> = {
  shanta: [
    {
      name: 'Engr. Mahbubur Rahman & Family',
      role: 'Verified Mela Fest Buyer · Handover Oct 2025',
      project: 'Shanta Pinnacle Suites, Dhanmondi',
      rating: '5.0',
      avatarBg: '#D95D45',
      initials: 'MR',
      quote:
        'We booked our duplex sky residence during Mela Fest with a ৳15 Lac spot discount. Shanta handed over keys 2 months ahead of schedule with flawless imported marble finishes and zero hidden charges.',
      badge: '✦ EARLY HANDOVER',
      badgeBg: '#E8F5E9',
      badgeColor: '#2E7D32',
    },
    {
      name: 'Dr. Subrata Barua & Dr. Nusrat Jahan',
      role: 'Verified Resident Owner · Handover Dec 2025',
      project: 'Shanta Aura Penthouse, Banani',
      rating: '5.0',
      avatarBg: '#10262D',
      initials: 'SB',
      quote:
        'The double-height acoustic glass noise isolation in Shanta Aura is world class. Living on the 18th floor feels tranquil and extraordinarily luxurious. Spot loan approval took under 48 hours.',
      badge: '✦ SPOT LOAN APPROVED',
      badgeBg: '#E0F2F1',
      badgeColor: '#00695C',
    },
    {
      name: 'Shahriar Al-Mamun (NRB Investor)',
      role: 'US Resident Investor · Handover March 2026',
      project: 'Shanta Utopia Lakeview, Baridhara',
      rating: '5.0',
      avatarBg: '#F2B84B',
      initials: 'SM',
      quote:
        'Managing an overseas property purchase was completely seamless. Shanta provided monthly drone progress updates and live VR inspection tours. 100% recommended for high-net-worth NRB investors.',
      badge: '✦ OVERSEAS VERIFIED',
      badgeBg: '#FFF3E0',
      badgeColor: '#E65100',
    },
  ],
  rangs: [
    {
      name: 'Arch. Kazi Faisal Rahman & Family',
      role: 'Verified Resident Owner · Handover Nov 2025',
      project: 'Rangs Toruk Sky Penthouse, Banani Road 11',
      rating: '5.0',
      avatarBg: '#D95D45',
      initials: 'FR',
      quote:
        'Rangs Toruk is an architectural masterpiece. The cantilevered private sky terrace and raw fair-face concrete aesthetic exceed international standards. Handed over right on time!',
      badge: '✦ ARCHITECT’S CHOICE',
      badgeBg: '#E8F5E9',
      badgeColor: '#2E7D32',
    },
    {
      name: 'Syeda Tanvin Sultana & Dr. Arif Hasan',
      role: 'Mela Fest Spot Buyer · Handover Feb 2026',
      project: 'Rangs Courtyard Villas, Gulshan Avenue',
      rating: '5.0',
      avatarBg: '#10262D',
      initials: 'TS',
      quote:
        'We claimed the Mela Fest complimentary Italian interior package worth ৳20 Lac. The craftsmanship of custom teak cabinetry and hidden ambient lighting is breathtaking.',
      badge: '✦ SPOT OFFER CLAIMED',
      badgeBg: '#E0F2F1',
      badgeColor: '#00695C',
    },
    {
      name: 'Zulfiqar Ali Chowdhury (Tech Entrepreneur)',
      role: 'Resident Owner · Handover April 2026',
      project: 'Rangs Sky Residence, Baridhara',
      rating: '5.0',
      avatarBg: '#F2B84B',
      initials: 'ZC',
      quote:
        'The smart-home automation and high-speed acoustic private elevators in Rangs Toruk make daily living an absolute joy. Security and concierge service feel like a 5-star hotel.',
      badge: '✦ 5-STAR RATING',
      badgeBg: '#FFF3E0',
      badgeColor: '#E65100',
    },
  ],
  sheltech: [
    {
      name: 'Dr. Farhana Nusrat & Dr. Kazi Chowdhury',
      role: 'Verified Resident · Handover Jan 2026',
      project: 'Sheltech Elysium Lakeview, Gulshan',
      rating: '5.0',
      avatarBg: '#10262D',
      initials: 'FN',
      quote:
        'The acoustic double-glazed glass noise isolation is incredible. Even living near the main highway, our living room is completely quiet. Spot loan approval with City Bank took only 48 hours.',
      badge: '✦ SPOT LOAN APPROVED',
      badgeBg: '#E0F2F1',
      badgeColor: '#00695C',
    },
    {
      name: 'Engr. Tariqul Islam & Family',
      role: '35-Year Repeat Customer · Handover Aug 2025',
      project: 'Sheltech Enclave, Uttara Sector 4',
      rating: '5.0',
      avatarBg: '#D95D45',
      initials: 'TI',
      quote:
        'This is our family’s second property purchase from Sheltech in 15 years. Their structural engineering integrity and 100% on-time handover record are unmatched in Bangladesh.',
      badge: '✦ REPEAT BUYER TRUST',
      badgeBg: '#E8F5E9',
      badgeColor: '#2E7D32',
    },
    {
      name: 'Nusrat Jahan & Tanveer Ahmed (NRB Investor)',
      role: 'UK Resident Investor · Handover Dec 2025',
      project: 'Sheltech Executive Towers, Dhanmondi',
      rating: '5.0',
      avatarBg: '#F2B84B',
      initials: 'NJ',
      quote:
        'Sheltech provided transparent RAJUK legal title documents and monthly video progress reports while we were in London. Zero hassle and smooth registration.',
      badge: '✦ LEGAL TITLE VERIFIED',
      badgeBg: '#FFF3E0',
      badgeColor: '#E65100',
    },
  ],
  navana: [
    {
      name: 'Barrister Imran Hossain & Dr. Sabrina Khan',
      role: 'Verified Eco-Resident · Handover Nov 2025',
      project: 'Navana Botanica Sky Garden, Mirpur DOHS',
      rating: '5.0',
      avatarBg: '#2E7D32',
      initials: 'IH',
      quote:
        'Living in Navana Botanica feels like living in a lush urban forest. Vertical gardens and rainwater harvesting cut our monthly utility fees by 35%. Absolutely loving it!',
      badge: '✦ ECO-GREEN CERTIFIED',
      badgeBg: '#E8F5E9',
      badgeColor: '#2E7D32',
    },
    {
      name: 'Commodore Rafiqul Islam (Retd.) & Family',
      role: 'Verified Resident Owner · Handover Sept 2025',
      project: 'Navana Sanctuary, Bashundhara R/A',
      rating: '5.0',
      avatarBg: '#10262D',
      initials: 'RI',
      quote:
        'Navana delivered our 3,200 sqft apartment ahead of schedule with 100% earthquake-resistant steel structures and double basement car parking. Truly top tier experience.',
      badge: '✦ ON-TIME HANDOVER',
      badgeBg: '#E0F2F1',
      badgeColor: '#00695C',
    },
    {
      name: 'Selim Ahmed (Commercial Investor)',
      role: 'Spot Booking Buyer · Handover Jan 2026',
      project: 'Navana Tower Plaza, Tejgaon',
      rating: '5.0',
      avatarBg: '#F2B84B',
      initials: 'SA',
      quote:
        'Booked our office suite at the Mela Fest Expo with a ৳10 Lac instant spot cashback. High-speed smart elevators and LEED silver green certification make it ideal for our firm.',
      badge: '✦ SPOT CASHBACK CLAIMED',
      badgeBg: '#FFF3E0',
      badgeColor: '#E65100',
    },
  ],
  bti: [
    {
      name: 'Tariqul Islam (NRB Investor)',
      role: 'UK Resident Investor · Handover March 2026',
      project: 'bti Three Sixty Suites, Uttara',
      rating: '5.0',
      avatarBg: '#F2B84B',
      initials: 'TI',
      quote:
        'Managing an overseas property investment was effortless. bti provided monthly video drone survey updates and transparent legal documentation. 100% recommend visiting their Mela Fest booth.',
      badge: '✦ OVERSEAS VERIFIED',
      badgeBg: '#FFF3E0',
      badgeColor: '#E65100',
    },
    {
      name: 'Dr. Sajjad Hossain & Family',
      role: 'Verified Resident Owner · Handover Oct 2025',
      project: 'bti Landmark Heights, Banani',
      rating: '5.0',
      avatarBg: '#D95D45',
      initials: 'SH',
      quote:
        'bti’s customer care and 24/7 post-handover maintenance team are outstanding. Any small issue is resolved within 2 hours. Truly stress-free homeownership.',
      badge: '✦ 24/7 CUSTOMER CARE',
      badgeBg: '#E8F5E9',
      badgeColor: '#2E7D32',
    },
    {
      name: 'Anisur Rahman & Shabnam Parveen',
      role: 'First-Time Homebuyer · Handover Dec 2025',
      project: 'bti Urban Sanctuary, Dhanmondi',
      rating: '5.0',
      avatarBg: '#10262D',
      initials: 'AR',
      quote:
        'The flexible payment terms during Mela Fest made buying our dream 4BHK apartment realistic. Thermal roof insulation keeps the top floor cool even in peak summer.',
      badge: '✦ SMART THERMAL DESIGN',
      badgeBg: '#E0F2F1',
      badgeColor: '#00695C',
    },
  ],
  concord: [
    {
      name: 'Major General Kamal Uddin (Retd.) & Family',
      role: 'Verified Resident Owner · Handover Aug 2025',
      project: 'Concord Regency Towers, Baridhara',
      rating: '5.0',
      avatarBg: '#10262D',
      initials: 'KU',
      quote:
        'Concord’s 45-year legacy of engineering excellence gives complete peace of mind. High-grade prestressed concrete and multi-tier security make this our safest family investment.',
      badge: '✦ 45-YEAR LEGACY TRUST',
      badgeBg: '#E8F5E9',
      badgeColor: '#2E7D32',
    },
    {
      name: 'Dr. Sharmin Akter & Engr. Fahim Ahmed',
      role: 'Verified Resident Owner · Handover Jan 2026',
      project: 'Concord Lakeview Condos, Gulshan',
      rating: '5.0',
      avatarBg: '#D95D45',
      initials: 'SA',
      quote:
        'Panoramic lake views, private rooftop swimming pool, and solar-powered common lighting. Handed over on the exact date promised in our contract.',
      badge: '✦ LAKEVIEW LUXURY',
      badgeBg: '#E0F2F1',
      badgeColor: '#00695C',
    },
    {
      name: 'Mustafizur Rahman (NRB Investor)',
      role: 'Canada Resident Buyer · Handover Feb 2026',
      project: 'Concord Heights, Uttara Sector 1',
      rating: '5.0',
      avatarBg: '#F2B84B',
      initials: 'MR',
      quote:
        'From booking at Mela Fest to final registration in Dhaka, Concord managed every legal step with total transparency. Highly recommended for non-resident Bangladeshis.',
      badge: '✦ NRB PREFERRED CHOICE',
      badgeBg: '#FFF3E0',
      badgeColor: '#E65100',
    },
  ],
};

const getTestimonialsForStall = (stallName: string, stallSlug?: string): TestimonialItem[] => {
  const query = `${stallSlug || ''} ${stallName || ''}`.toLowerCase();
  if (query.includes('rangs') || query.includes('toruk')) return STALL_SPECIFIC_REVIEWS.rangs;
  if (query.includes('shanta')) return STALL_SPECIFIC_REVIEWS.shanta;
  if (query.includes('sheltech')) return STALL_SPECIFIC_REVIEWS.sheltech;
  if (query.includes('navana')) return STALL_SPECIFIC_REVIEWS.navana;
  if (query.includes('bti') || query.includes('building tech')) return STALL_SPECIFIC_REVIEWS.bti;
  if (query.includes('concord')) return STALL_SPECIFIC_REVIEWS.concord;

  return [
    {
      name: 'Engr. Mahbubur Rahman & Family',
      role: 'Verified Mela Fest Buyer · Handover Oct 2025',
      project: `${stallName} Residence`,
      rating: '5.0',
      avatarBg: '#D95D45',
      initials: 'MR',
      quote: `We booked our duplex residence at ${stallName} during Mela Fest with an exclusive spot discount. Handover was on schedule with zero hidden charges.`,
      badge: '✦ EARLY HANDOVER',
      badgeBg: '#E8F5E9',
      badgeColor: '#2E7D32',
    },
    {
      name: 'Dr. Farhana Nusrat & Dr. Kazi Chowdhury',
      role: 'Verified Resident · Handover Jan 2026',
      project: `${stallName} Luxury Suite`,
      rating: '5.0',
      avatarBg: '#10262D',
      initials: 'FN',
      quote: `The acoustic soundproofing and building finish quality by ${stallName} are incredible. Spot loan approval was smooth and fast.`,
      badge: '✦ SPOT LOAN APPROVED',
      badgeBg: '#E0F2F1',
      badgeColor: '#00695C',
    },
    {
      name: 'Tariqul Islam (NRB Investor)',
      role: 'UK Resident Investor · Handover March 2026',
      project: `${stallName} Sky Villa`,
      rating: '5.0',
      avatarBg: '#F2B84B',
      initials: 'TI',
      quote: `Managing an overseas property investment with ${stallName} was effortless with monthly video updates and transparent documentation.`,
      badge: '✦ OVERSEAS VERIFIED',
      badgeBg: '#FFF3E0',
      badgeColor: '#E65100',
    },
  ];
};

/** Visual Banner 2: Verified Buyer Testimonials & Handover History Showcase */
export function StallVisualBanner2({
  stallName,
  stallSlug,
  onLaunchVR,
  horizontalInset = 0,
}: {
  stallName: string;
  stallSlug?: string;
  onLaunchVR?: () => void;
  horizontalInset?: number;
}) {
  const testimonials = useMemo(() => {
    return getTestimonialsForStall(stallName, stallSlug);
  }, [stallName, stallSlug]);

  return (
    <View style={styles.banner2Wrapper}>
      <View style={styles.testimonialSheetCard}>
        {/* Header Row */}
        <View style={styles.testimonialHeader}>
          <View style={{ flex: 1 }}>
            <View style={styles.testimonialBadge}>
              <Text style={styles.testimonialBadgeText}>✦ HANDOVER TRUST & BUYER REVIEWS</Text>
            </View>
            <Text style={styles.testimonialTitle}>
              Verified Resident Reviews & Handover Record
            </Text>
            <Text style={styles.testimonialSub}>
              Discover why 1,200+ families chose {stallName}. 100% on-time project handovers with zero cost overruns and 40+ years of structural engineering trust.
            </Text>
          </View>

          <View style={styles.trustMetricBox}>
            <Text style={styles.trustMetricScore}>★ 4.9 / 5.0</Text>
            <Text style={styles.trustMetricSub}>100% On-Time Handover Record</Text>
            <Text style={styles.trustMetricCount}>42 Completed Luxury Towers</Text>
          </View>
        </View>

        {/* 3 Buyer Review Cards */}
        <View style={styles.testimonialGrid}>
          {testimonials.map((item, idx) => (
            <View key={idx} style={styles.testimonialCard}>
              <View style={styles.testimonialTopRow}>
                <View style={[styles.avatarCircle, { backgroundColor: item.avatarBg }]}>
                  <Text style={styles.avatarText}>{item.initials}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.reviewerName}>{item.name}</Text>
                  <Text style={styles.reviewerRole}>{item.role}</Text>
                </View>
                <View style={[styles.reviewBadgePill, { backgroundColor: item.badgeBg }]}>
                  <Text style={[styles.reviewBadgeText, { color: item.badgeColor }]}>{item.badge}</Text>
                </View>
              </View>

              <View style={styles.starsRow}>
                <Text style={styles.starsText}>★★★★★</Text>
                <Text style={styles.ratingScore}>{item.rating}</Text>
                <Text style={styles.projectTag}>📍 {item.project}</Text>
              </View>

              <Text style={styles.quoteText}>"{item.quote}"</Text>
            </View>
          ))}
        </View>

        {/* Trust Guarantees Bar */}
        <View style={styles.trustGuaranteesBar}>
          <View style={styles.trustGuaranteeItem}>
            <Text style={styles.trustGuaranteeIcon}>🏆</Text>
            <View>
              <Text style={styles.trustGuaranteeTitle}>100% On-Time Handover</Text>
              <Text style={styles.trustGuaranteeSub}>Guaranteed completion date protection</Text>
            </View>
          </View>

          <View style={styles.trustGuaranteeItem}>
            <Text style={styles.trustGuaranteeIcon}>📜</Text>
            <View>
              <Text style={styles.trustGuaranteeTitle}>100% Legal Title Guarantee</Text>
              <Text style={styles.trustGuaranteeSub}>Verified RAJUK & Ministry clearance</Text>
            </View>
          </View>

          <View style={styles.trustGuaranteeItem}>
            <Text style={styles.trustGuaranteeIcon}>🛡️</Text>
            <View>
              <Text style={styles.trustGuaranteeTitle}>5-Year Structural Warranty</Text>
              <Text style={styles.trustGuaranteeSub}>Comprehensive waterproofing & glass warranty</Text>
            </View>
          </View>
        </View>

        {/* Footer Action Bar */}
        <View style={styles.testimonialFooterBar}>
          <Text style={styles.testimonialFooterInfo}>
            Want to speak with recent apartment owners or visit a completed project site?
          </Text>

          <View style={styles.testimonialFooterActions}>
            <Pressable
              onPress={() =>
                Alert.alert(
                  'Verified Owner Reviews Catalog',
                  `Full buyer satisfaction survey data and video reviews for ${stallName} are available at our fair desk.`
                )
              }
              style={({ pressed }) => [styles.testimonialPrimaryBtn, pressed && styles.pressed]}
            >
              <Text style={styles.testimonialPrimaryBtnText}>Read All 200+ Verified Owner Reviews →</Text>
            </Pressable>

            <Pressable
              onPress={() =>
                Alert.alert(
                  'Resident Key Handover Tour',
                  `Visit ${stallName}'s pavilion counter to schedule a guided site inspection tour with private chauffeur transport.`
                )
              }
              style={({ pressed }) => [styles.testimonialSecondaryBtn, pressed && styles.pressed]}
            >
              <Text style={styles.testimonialSecondaryBtnText}>Schedule Site Tour</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Banner 1 Styles
  banner1Wrapper: {
    width: '100%',
    maxWidth: 1680,
    alignSelf: 'center',
    marginVertical: 24,
  },
  banner1Card: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  banner1ImageStyle: {
    borderRadius: 20,
  },
  banner1Gradient: {
    padding: 24,
    borderRadius: 20,
    gap: 12,
  },
  banner1BadgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10,
  },
  banner1Badge: {
    backgroundColor: '#FFF4D9',
    borderWidth: 1,
    borderColor: '#F2B84B',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  banner1BadgeText: {
    color: '#B94332',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  liveTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    borderWidth: 1,
    borderColor: '#4CAF50',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4CAF50',
  },
  liveTagText: {
    color: '#81C784',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  banner1Title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
    lineHeight: 32,
    letterSpacing: 0.3,
  },
  banner1Sub: {
    color: '#CFD8DC',
    fontSize: 13,
    lineHeight: 20,
    maxWidth: 680,
  },
  banner1PillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginVertical: 4,
  },
  banner1Pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  banner1PillIcon: {
    fontSize: 12,
  },
  banner1PillText: {
    color: '#ECEFF1',
    fontSize: 12,
    fontWeight: '700',
  },
  banner1BtnRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 6,
  },
  banner1PrimaryBtn: {
    backgroundColor: '#D95D45',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  banner1PrimaryBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
  },
  banner1SecondaryBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  banner1SecondaryBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  // Carousel & Gallery Styles
  carouselWrapper: {
    width: '100%',
    maxWidth: 1680,
    alignSelf: 'center',
    marginVertical: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E8E2D8',
    gap: 16,
  },
  carouselHeaderRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  carouselEyebrow: {
    alignSelf: 'flex-start',
    backgroundColor: '#EBF3F0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 6,
  },
  carouselEyebrowText: {
    color: '#2C6B56',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  carouselTitle: {
    color: '#17242A',
    fontSize: 20,
    fontWeight: '900',
  },
  carouselSub: {
    color: '#66757B',
    fontSize: 12,
    marginTop: 4,
    maxWidth: 580,
    lineHeight: 17,
  },
  zoomTriggerBtn: {
    backgroundColor: '#F3EDE3',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2D9CC',
  },
  zoomTriggerText: {
    color: '#17242A',
    fontSize: 12,
    fontWeight: '700',
  },

  // Category Filter Chips
  filterChipScroll: {
    gap: 8,
  },
  filterChip: {
    backgroundColor: '#FAF6F0',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5DFD5',
  },
  filterChipActive: {
    backgroundColor: '#D95D45',
    borderColor: '#B94332',
  },
  filterChipText: {
    color: '#4A565C',
    fontSize: 12,
    fontWeight: '600',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  // Main Preview Card
  mainPreviewCard: {
    width: '100%',
    height: 380,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#0A1A21',
  },
  mainPreviewBg: {
    width: '100%',
    height: '100%',
  },
  mainPreviewImage: {
    borderRadius: 16,
  },
  mainPreviewGradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  mainPreviewTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagPill: {
    backgroundColor: '#D95D45',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagPillText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  altitudePill: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  altitudePillText: {
    color: '#FFE082',
    fontSize: 10,
    fontWeight: '700',
  },

  arrowControlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  arrowBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  arrowBtnText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    marginTop: -2,
  },

  mainPreviewBottomInfo: {
    gap: 4,
  },
  previewTitleText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },
  previewSubText: {
    color: '#CFD8DC',
    fontSize: 12,
    lineHeight: 16,
  },
  specsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 6,
  },
  specChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  specChipText: {
    color: '#00BCD4',
    fontSize: 10,
    fontWeight: '700',
  },

  // Image Gallery Grid Section
  galleryGridSectionHeader: {
    marginTop: 8,
    marginBottom: 4,
    gap: 2,
  },
  galleryGridSectionTitle: {
    color: '#17242A',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  galleryGridSectionSub: {
    color: '#66757B',
    fontSize: 11,
  },
  imageGalleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginTop: 6,
  },
  galleryGridCard: {
    width: '48%',
    minWidth: 260,
    height: 180,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  galleryGridCardSelected: {
    borderColor: '#D95D45',
  },
  galleryCardBg: {
    width: '100%',
    height: '100%',
  },
  galleryCardImg: {
    borderRadius: 12,
  },
  galleryCardGradient: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  galleryCardTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  galleryCardBadge: {
    backgroundColor: '#D95D45',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  galleryCardBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  galleryZoomIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  galleryZoomIconText: {
    fontSize: 12,
  },
  galleryCardBottom: {
    gap: 2,
  },
  galleryCardTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 17,
  },
  galleryCardSub: {
    color: '#CFD8DC',
    fontSize: 10,
  },

  // Lightbox Modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(10, 26, 33, 0.88)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    ...(Platform.OS === 'web'
      ? ({
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999999,
        } as any)
      : {}),
  },
  modalDialog: {
    width: '100%',
    maxWidth: 960,
    maxHeight: '92%',
    backgroundColor: '#0A1A21',
    borderRadius: 20,
    padding: 16,
    gap: 12,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    paddingBottom: 10,
  },
  modalHeaderTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  modalHeaderSub: {
    color: '#00BCD4',
    fontSize: 11,
    marginTop: 2,
  },
  modalCloseBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  modalImageWrap: {
    width: '100%',
    height: 420,
    backgroundColor: '#050D11',
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalFullImage: {
    width: '100%',
    height: '100%',
  },
  modalArrowLeft: {
    position: 'absolute',
    left: 12,
    top: '45%',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  modalArrowRight: {
    position: 'absolute',
    right: 12,
    top: '45%',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  modalArrowText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    marginTop: -2,
  },
  modalThumbBar: {
    paddingVertical: 4,
  },
  modalThumbCard: {
    width: 80,
    height: 54,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  modalThumbCardActive: {
    borderColor: '#D95D45',
  },
  modalThumbImg: {
    width: '100%',
    height: '100%',
  },

  modalFooterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  modalFooterText: {
    color: '#B0BEC5',
    fontSize: 12,
    flex: 1,
  },
  downloadHdBtn: {
    backgroundColor: '#D95D45',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  downloadHdText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },

  // Banner 2 / Verified Buyer Testimonials Styles
  banner2Wrapper: {
    width: '100%',
    maxWidth: 1680,
    alignSelf: 'center',
    marginVertical: 24,
  },
  testimonialSheetCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E5DFD5',
    gap: 20,
    shadowColor: '#10262D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  testimonialHeader: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 16,
  },
  testimonialBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF4E5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#FFE0B2',
  },
  testimonialBadgeText: {
    color: '#E65100',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  testimonialTitle: {
    color: '#17242A',
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 28,
  },
  testimonialSub: {
    color: '#66757B',
    fontSize: 12,
    marginTop: 4,
    maxWidth: 720,
    lineHeight: 18,
  },
  trustMetricBox: {
    backgroundColor: '#FAF6F0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E8DFD0',
    alignItems: 'flex-start',
  },
  trustMetricScore: {
    color: '#D95D45',
    fontSize: 18,
    fontWeight: '900',
  },
  trustMetricSub: {
    color: '#17242A',
    fontSize: 11,
    fontWeight: '800',
    marginTop: 2,
  },
  trustMetricCount: {
    color: '#66757B',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 1,
  },

  testimonialGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  testimonialCard: {
    flexGrow: 1,
    flexBasis: 300,
    minWidth: 280,
    backgroundColor: '#FAF8F5',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#ECE6DC',
    gap: 10,
  },
  testimonialTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
  },
  reviewerName: {
    color: '#17242A',
    fontSize: 13,
    fontWeight: '900',
  },
  reviewerRole: {
    color: '#66757B',
    fontSize: 10,
    fontWeight: '600',
  },
  reviewBadgePill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  reviewBadgeText: {
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  starsText: {
    color: '#FFB300',
    fontSize: 13,
    letterSpacing: 1,
  },
  ratingScore: {
    color: '#17242A',
    fontSize: 11,
    fontWeight: '800',
  },
  projectTag: {
    color: '#D95D45',
    fontSize: 10,
    fontWeight: '700',
    marginLeft: 4,
  },
  quoteText: {
    color: '#455A64',
    fontSize: 12,
    lineHeight: 18,
    fontStyle: 'italic',
  },

  trustGuaranteesBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    backgroundColor: '#FAF6F0',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ECE6DC',
  },
  trustGuaranteeItem: {
    flex: 1,
    minWidth: 220,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  trustGuaranteeIcon: {
    fontSize: 22,
  },
  trustGuaranteeTitle: {
    color: '#17242A',
    fontSize: 12,
    fontWeight: '900',
  },
  trustGuaranteeSub: {
    color: '#66757B',
    fontSize: 10,
    marginTop: 1,
  },

  testimonialFooterBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#ECE6DC',
    gap: 14,
  },
  testimonialFooterInfo: {
    flex: 1,
    minWidth: 260,
    color: '#546E7A',
    fontSize: 12,
    fontWeight: '600',
  },
  testimonialFooterActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  testimonialPrimaryBtn: {
    backgroundColor: '#10262D',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  testimonialPrimaryBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  testimonialSecondaryBtn: {
    backgroundColor: '#FAF6F0',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D95D45',
  },
  testimonialSecondaryBtnText: {
    color: '#D95D45',
    fontSize: 12,
    fontWeight: '800',
  },

  pressed: {
    opacity: 0.8,
  },
});
