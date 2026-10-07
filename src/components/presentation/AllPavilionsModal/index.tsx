import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  ImageBackground,
  Modal,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { REAL_ESTATE_STALLS } from '../PlaygroundFieldSection';

interface AllPavilionsModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectStall: (slug: string) => void;
  isDesktop?: boolean;
  horizontalInset?: number;
}

const STALL_SLUG_MAP: Record<string, string> = {
  shanta: 'shanta-pinnacle',
  sheltech: 'sheltech-elysium',
  navana: 'navana-botanica',
  bti: 'bti-three-sixty',
  rangs: 'rangs-toruk',
  concord: 'concord-regency',
  assure: 'assure-majestic',
  bay: 'bay-sanctuary',
  dominno: 'dominno-elegance',
  rupayan: 'rupayan-city',
  suvastu: 'suvastu-nazar-valley',
  urbandesign: 'urbandesign-vantage',
};

export function AllPavilionsModal({
  visible,
  onClose,
  onSelectStall,
  isDesktop = true,
  horizontalInset = 20,
}: AllPavilionsModalProps) {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredStalls = useMemo(() => {
    return REAL_ESTATE_STALLS.filter((stall) => {
      const matchesSearch =
        stall.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stall.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stall.plot.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (activeTab === 'all') return true;
      if (activeTab === 'luxury') return stall.category === 'Luxury';
      if (activeTab === 'eco')
        return (
          stall.tagline.toLowerCase().includes('eco') ||
          stall.tagline.toLowerCase().includes('urban')
        );
      if (activeTab === 'offers')
        return stall.fairOffer.includes('Cashback') || stall.fairOffer.includes('Zero');
      return true;
    });
  }, [activeTab, searchQuery]);

  const handleStallSelect = (stallId: string) => {
    const targetSlug = STALL_SLUG_MAP[stallId] || stallId;
    onClose();
    onSelectStall(targetSlug);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Sticky Header Bar */}
        <View style={styles.topHeader}>
          <View style={[styles.topHeaderInner, { paddingHorizontal: Math.max(horizontalInset, 20) }]}>
            <Pressable onPress={onClose} style={styles.backBtn}>
              <Text style={styles.backArrow}>←</Text>
              <Text style={styles.backText}>Back to Mela Fest</Text>
            </Pressable>

            <View style={styles.titleCenter}>
              <Text style={styles.eyebrow}>EXPO DIRECTORY</Text>
              <Text style={styles.headerTitle}>All Signature Developer Pavilions</Text>
            </View>

            <Pressable onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕ Close</Text>
            </Pressable>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContent}>
          {/* HERO BANNER CARD CONTAINER */}
          <View style={[styles.heroOuterWrap, { paddingHorizontal: Math.max(horizontalInset, 20) }]}>
            <View style={styles.heroCardWrap}>
              <ImageBackground
                source={require('../../../../assets/pavilion-shanta.jpg')}
                resizeMode="cover"
                style={styles.heroBg}
              >
                <LinearGradient
                  colors={['rgba(10, 26, 33, 0.94)', 'rgba(10, 26, 33, 0.82)', 'rgba(8, 15, 16, 0.95)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.heroGradient}
                >
                  <View style={styles.heroContent}>
                    <View style={styles.heroBadge}>
                      <View style={styles.liveDot} />
                      <Text style={styles.heroBadgeText}>EXPO 2026 SIGNATURE ARENA</Text>
                    </View>

                    <Text style={[styles.heroTitle, isDesktop && styles.heroTitleDesktop]}>
                      Signature Developer Pavilions & Architectural Showcases
                    </Text>

                    <Text style={styles.heroSub}>
                      Explore all premier developer pavilions live at Mela Fest Bangladesh 2026. Step inside physical scale models, 360° VR domes, interactive touch-tables, and claim exclusive spot booking cashbacks up to ৳15 Lac.
                    </Text>

                    {/* Live Stats Strip */}
                    <View style={styles.statsStrip}>
                      <View style={styles.statBox}>
                        <Text style={styles.statIcon}>🏛️</Text>
                        <View>
                          <Text style={styles.statVal}>12 Pavilions</Text>
                          <Text style={styles.statLbl}>Signature Developers</Text>
                        </View>
                      </View>

                      <View style={styles.statDivider} />

                      <View style={styles.statBox}>
                        <Text style={styles.statIcon}>🎁</Text>
                        <View>
                          <Text style={styles.statVal}>Spot Cashbacks</Text>
                          <Text style={styles.statLbl}>Up to ৳15 Lac Off</Text>
                        </View>
                      </View>

                      <View style={styles.statDivider} />

                      <View style={styles.statBox}>
                        <Text style={styles.statIcon}>📍</Text>
                        <View>
                          <Text style={styles.statVal}>Diamond Plaza</Text>
                          <Text style={styles.statLbl}>North & South Corridors</Text>
                        </View>
                      </View>

                      <View style={styles.statDivider} />

                      <View style={styles.statBox}>
                        <Text style={styles.statIcon}>⭐️</Text>
                        <View>
                          <Text style={styles.statVal}>4.9 / 5.0</Text>
                          <Text style={styles.statLbl}>Visitor Rating</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </LinearGradient>
              </ImageBackground>
            </View>
          </View>

          {/* MAIN SECTION: SEARCH & CATEGORY FILTERS */}
          <View style={[styles.mainBody, { paddingHorizontal: Math.max(horizontalInset, 20) }]}>
            <View style={styles.filterHeaderRow}>
              {/* Search Bar Input */}
              <View style={styles.searchBarWrap}>
                <Text style={styles.searchIcon}>🔍</Text>
                <TextInput
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder="Search by developer name, location, or project..."
                  placeholderTextColor="#869499"
                  style={styles.searchInput}
                />
                {searchQuery.length > 0 && (
                  <Pressable onPress={() => setSearchQuery('')} style={styles.clearSearchBtn}>
                    <Text style={styles.clearSearchText}>✕</Text>
                  </Pressable>
                )}
              </View>

              {/* Category Pills */}
              <View style={styles.tabsRow}>
                {[
                  { id: 'all', label: 'All Pavilions (12)' },
                  { id: 'luxury', label: 'Luxury Sky Villas' },
                  { id: 'eco', label: 'Eco Living' },
                  { id: 'offers', label: 'Spot Cashbacks' },
                ].map((tab) => {
                  const isSelected = activeTab === tab.id;
                  return (
                    <Pressable
                      key={tab.id}
                      onPress={() => setActiveTab(tab.id)}
                      style={[styles.tabBtn, isSelected && styles.tabBtnActive]}
                    >
                      <Text style={[styles.tabBtnText, isSelected && styles.tabBtnTextActive]}>
                        {tab.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* ALL PAVILIONS GRID */}
            <View style={styles.pavilionsGrid}>
              {filteredStalls.map((stall) => (
                <Pressable
                  key={stall.id}
                  onPress={() => handleStallSelect(stall.id)}
                  style={({ pressed }) => [
                    styles.pavilionCard,
                    isDesktop && styles.pavilionCardDesktop,
                    pressed && styles.pressed,
                  ]}
                >
                  <View style={styles.cardImageWrap}>
                    <ImageBackground
                      source={
                        stall.id === 'shanta'
                          ? require('../../../../assets/pavilion-shanta.jpg')
                          : stall.id === 'sheltech'
                          ? require('../../../../assets/stall-sheltech-hero.jpg')
                          : require('../../../../assets/mela-expo-banner.jpg')
                      }
                      resizeMode="cover"
                      style={styles.cardImageBg}
                    >
                      <LinearGradient
                        colors={['rgba(0,0,0,0.2)', 'rgba(10,26,33,0.85)']}
                        style={styles.cardImageGrad}
                      >
                        <View style={styles.cardTopBadges}>
                          <View style={styles.plotBadge}>
                            <View style={styles.plotDot} />
                            <Text style={styles.plotBadgeText}>{stall.plot.split('·')[0].trim()}</Text>
                          </View>

                          <View style={styles.sponsorBadge}>
                            <Text style={styles.sponsorBadgeText}>★ {stall.badge}</Text>
                          </View>
                        </View>

                        <View style={styles.cardBottomRow}>
                          <View style={[styles.emblemSquare, { backgroundColor: stall.accentColor }]}>
                            <Text style={styles.emblemText}>{stall.code}</Text>
                          </View>
                          <View style={{ flex: 1 }}>
                            <Text style={styles.stallName}>{stall.name}</Text>
                            <Text style={styles.stallCategory}>{stall.category} Category Pavilion</Text>
                          </View>
                          <View style={styles.ratingBox}>
                            <Text style={styles.starText}>★ {stall.rating}</Text>
                            <Text style={styles.reviewsText}>({stall.reviews})</Text>
                          </View>
                        </View>
                      </LinearGradient>
                    </ImageBackground>
                  </View>

                  {/* Card Details Body */}
                  <View style={styles.cardBody}>
                    <Text style={styles.stallTagline}>{stall.tagline}</Text>
                    <Text style={styles.stallDesc} numberOfLines={2}>
                      {stall.description}
                    </Text>

                    {/* Fair Offer Highlight Box */}
                    <View style={styles.offerHighlightBox}>
                      <Text style={styles.offerTagText}>✦ EXPO SPOT OFFER</Text>
                      <Text style={styles.offerText}>{stall.fairOffer}</Text>
                    </View>

                    {/* Action Bar */}
                    <View style={styles.cardActionRow}>
                      <View style={styles.locationChip}>
                        <Text style={styles.locationIcon}>📍</Text>
                        <Text style={styles.locationText} numberOfLines={1}>
                          {stall.plot}
                        </Text>
                      </View>

                      <View style={styles.stepInsideBtn}>
                        <Text style={styles.stepInsideText}>Step Inside Pavilion →</Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF6F0',
  },
  topHeader: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#E5DFD5',
    zIndex: 100,
  },
  topHeaderInner: {
    width: '100%',
    maxWidth: 1680,
    height: 70,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  backArrow: {
    color: '#D95D45',
    fontSize: 18,
    fontWeight: '800',
  },
  backText: {
    color: '#17242A',
    fontSize: 12,
    fontWeight: '800',
  },
  titleCenter: {
    alignItems: 'center',
  },
  eyebrow: {
    color: '#D95D45',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  headerTitle: {
    color: '#17242A',
    fontSize: 16,
    fontWeight: '900',
  },
  closeBtn: {
    backgroundColor: '#10262D',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
  },
  closeBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },

  scrollContent: {
    flex: 1,
  },
  heroOuterWrap: {
    width: '100%',
    paddingTop: 20,
  },
  heroCardWrap: {
    width: '100%',
    maxWidth: 1680,
    alignSelf: 'center',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#10262D',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  heroBg: {
    width: '100%',
  },
  heroGradient: {
    width: '100%',
    paddingVertical: 36,
    paddingHorizontal: 28,
  },
  heroContent: {
    width: '100%',
    gap: 14,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00E676',
  },
  heroBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 34,
    letterSpacing: -0.5,
  },
  heroTitleDesktop: {
    fontSize: 42,
    lineHeight: 48,
  },
  heroSub: {
    color: '#ECEFF1',
    fontSize: 14,
    lineHeight: 22,
    maxWidth: 780,
  },

  statsStrip: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    backgroundColor: 'rgba(10, 26, 33, 0.75)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 14,
    marginTop: 10,
    gap: 16,
  },
  statBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statIcon: {
    fontSize: 22,
  },
  statVal: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
  },
  statLbl: {
    color: '#B0BEC5',
    fontSize: 10,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },

  mainBody: {
    width: '100%',
    maxWidth: 1680,
    alignSelf: 'center',
    paddingVertical: 30,
    gap: 24,
  },
  filterHeaderRow: {
    gap: 16,
  },
  searchBarWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5DFD5',
    paddingHorizontal: 14,
    height: 48,
    gap: 10,
  },
  searchIcon: {
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#17242A',
  },
  clearSearchBtn: {
    padding: 4,
  },
  clearSearchText: {
    color: '#869499',
    fontSize: 12,
  },

  tabsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tabBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5DFD5',
  },
  tabBtnActive: {
    backgroundColor: '#10262D',
    borderColor: '#10262D',
  },
  tabBtnText: {
    color: '#66757B',
    fontSize: 11,
    fontWeight: '700',
  },
  tabBtnTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  pavilionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  pavilionCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5DFD5',
    shadowColor: '#10262D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  pavilionCardDesktop: {
    width: '48.5%',
  },
  cardImageWrap: {
    height: 200,
    width: '100%',
  },
  cardImageBg: {
    width: '100%',
    height: '100%',
  },
  cardImageGrad: {
    flex: 1,
    padding: 14,
    justifyContent: 'space-between',
  },
  cardTopBadges: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  plotBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(10, 26, 33, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
  },
  plotDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00E676',
  },
  plotBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  sponsorBadge: {
    backgroundColor: '#FFF4D9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F2B84B',
  },
  sponsorBadgeText: {
    color: '#B94332',
    fontSize: 9,
    fontWeight: '900',
  },

  cardBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  emblemSquare: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emblemText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  stallName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },
  stallCategory: {
    color: '#ECEFF1',
    fontSize: 11,
  },
  ratingBox: {
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  starText: {
    color: '#FFE082',
    fontSize: 11,
    fontWeight: '800',
  },
  reviewsText: {
    color: '#CFD8DC',
    fontSize: 9,
  },

  cardBody: {
    padding: 18,
    gap: 10,
  },
  stallTagline: {
    color: '#17242A',
    fontSize: 14,
    fontWeight: '800',
  },
  stallDesc: {
    color: '#66757B',
    fontSize: 12,
    lineHeight: 18,
  },

  offerHighlightBox: {
    backgroundColor: '#FFF8E6',
    borderWidth: 1,
    borderColor: '#FFE0B2',
    padding: 10,
    borderRadius: 12,
    gap: 2,
  },
  offerTagText: {
    color: '#E65100',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  offerText: {
    color: '#17242A',
    fontSize: 11,
    fontWeight: '800',
  },

  cardActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#ECE6DC',
  },
  locationChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  locationIcon: {
    fontSize: 12,
  },
  locationText: {
    color: '#66757B',
    fontSize: 11,
  },
  stepInsideBtn: {
    backgroundColor: '#D95D45',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  stepInsideText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },

  pressed: {
    opacity: 0.85,
  },
});
