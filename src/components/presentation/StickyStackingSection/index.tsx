import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  useWindowDimensions,
  Platform,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const STACK_CARDS = [
  {
    id: 'stack-1',
    title: '12 Luxury Real Estate Pavilions',
    subtitle: 'Explore 3D floor plans & spot bank home loan approvals up to 80%',
    tag: 'EXPLORE PAVILIONS',
    badgeColor: '#D95D45',
    image: require('../../../../assets/pavilion-shanta.jpg'),
    topOffset: 108,
    slug: 'shanta-pinnacle',
  },
  {
    id: 'stack-2',
    title: 'Jamdani & Master Artisan Craft Village',
    subtitle: 'Live handloom weaving & traditional Rajshahi silk craftsmanship',
    tag: 'HERITAGE CRAFTS',
    badgeColor: '#F2B84B',
    image: require('../../../../assets/booth-sonargaon.png'),
    topOffset: 132,
    slug: 'sheltech-elysium',
  },
  {
    id: 'stack-3',
    title: 'Old Dhaka Kacchi & Fuchka Culinary Hub',
    subtitle: 'Grand Nawab Kacchi, Star Kabab & authentic Chawkbazar street food',
    tag: 'FOOD COURT',
    badgeColor: '#00BCD4',
    image: require('../../../../assets/booth-rajshahi.png'),
    topOffset: 156,
    slug: 'navana-botanica',
  },
  {
    id: 'stack-4',
    title: 'Live Baul & Folk Concerts at Mela Mancho',
    subtitle: 'Evening cultural performances, puppet shows & traditional bioscope',
    tag: 'CULTURAL STAGE',
    badgeColor: '#9C27B0',
    image: require('../../../../assets/booth-tangail.png'),
    topOffset: 180,
    slug: 'rangs-toruk',
  },
  {
    id: 'stack-5',
    title: 'Nagordola Wheel & Carnival Rides',
    subtitle: 'Secured Kids Play Zone, giant carnival wheels & daily prize draws',
    tag: 'FAMILY FUN ZONE',
    badgeColor: '#4CAF50',
    image: require('../../../../assets/dhaka-expo-hero.jpg'),
    topOffset: 204,
    slug: 'bti-three-sixty',
  },
  {
    id: 'stack-6',
    title: 'Bangladesh Trade & Heritage Expo 2026',
    subtitle: '500+ authentic makers, 1M+ prospective visitors at BBCFEC Purbachal',
    tag: 'GRAND EXPO',
    badgeColor: '#E91E63',
    topOffset: 228,
    image: require('../../../../assets/mela-expo-banner.jpg'),
    slug: 'concord-regency',
  },
];

export function StickyStackingSection({
  horizontalInset = 20,
  onNavigateStall,
}: {
  horizontalInset?: number;
  onNavigateStall?: (slug: any) => void;
}) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  return (
    <View style={[styles.outerWrapper, { paddingHorizontal: horizontalInset }]}>
      {/* Intro Header Card */}
      <View style={styles.introHeaderCard}>
        <View style={styles.eyebrowBadge}>
          <Text style={styles.eyebrowText}>✦ SCROLL TO UNCOVER EXPO HIGHLIGHTS</Text>
        </View>

        <Text style={styles.introTitle}>
          Sticky Stacking Expo Highlights
        </Text>

        <Text style={styles.introSub}>
          Scroll down to watch signature pavilions, heritage craft hubs, and cultural stages stack dynamically into place. 👇
        </Text>
      </View>

      {/* Stacked Cards Stack */}
      <View style={styles.stackingContainer}>
        {STACK_CARDS.map((card, index) => {
          const stickyStyle =
            Platform.OS === 'web'
              ? ({
                  position: 'sticky',
                  top: card.topOffset,
                  zIndex: index + 1,
                  boxShadow: '0 -10px 30px rgba(0, 0, 0, 0.45), 0 4px 12px rgba(0,0,0,0.15)',
                } as any)
              : {};

          const handleCardPress = () => {
            if (onNavigateStall && card.slug) {
              onNavigateStall(card.slug);
            } else {
              Alert.alert(card.title, `Exploring ${card.title}. Opening fair section...`);
            }
          };

          return (
            <Pressable
              key={card.id}
              onPress={handleCardPress}
              style={[
                styles.stickyCardItem,
                stickyStyle,
              ]}
            >
              <ImageBackground
                source={card.image}
                resizeMode="cover"
                imageStyle={styles.cardImageStyle}
                style={styles.cardBg}
              >
                <LinearGradient
                  colors={[
                    'rgba(10, 26, 33, 0.2)',
                    'rgba(10, 26, 33, 0.65)',
                    'rgba(5, 13, 17, 0.95)',
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.cardGradient}
                >
                  <View style={styles.cardTopRow}>
                    <View
                      style={[
                        styles.tagBadge,
                        { backgroundColor: card.badgeColor },
                      ]}
                    >
                      <Text style={styles.tagBadgeText}>{card.tag}</Text>
                    </View>

                    <View style={styles.stepBadge}>
                      <Text style={styles.stepBadgeText}>
                        0{index + 1} / 0{STACK_CARDS.length}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.cardBottomContent}>
                    <Text style={styles.cardTitle}>{card.title}</Text>
                    <Text style={styles.cardSubtitle}>{card.subtitle}</Text>

                    <Pressable
                      onPress={handleCardPress}
                      style={({ pressed }) => [
                        styles.cardCtaBtn,
                        pressed && styles.pressed,
                      ]}
                    >
                      <Text style={styles.cardCtaText}>Explore Feature →</Text>
                    </Pressable>
                  </View>
                </LinearGradient>
              </ImageBackground>
            </Pressable>
          );
        })}
      </View>

      {/* Bottom Branding Footer */}
      <View style={styles.bottomBrandingFooter}>
        <Text style={styles.footerBrandingText}>MELA FEST BANGLADESH 2026</Text>
        <Text style={styles.footerSubText}>
          Bangabandhu BBCFEC Exhibition Center · Sector 4, Purbachal, Dhaka
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerWrapper: {
    width: '100%',
    marginVertical: 36,
  },
  introHeaderCard: {
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 32,
    gap: 8,
  },
  eyebrowBadge: {
    backgroundColor: '#FFF4D9',
    borderWidth: 1,
    borderColor: '#F2B84B',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  eyebrowText: {
    color: '#B94332',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  introTitle: {
    color: '#17242A',
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  introSub: {
    color: '#66757B',
    fontSize: 13,
    textAlign: 'center',
    maxWidth: 580,
    lineHeight: 19,
  },

  // Stacking Container
  stackingContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  stickyCardItem: {
    width: '100%',
    maxWidth: 1380,
    height: 480,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 20,
  },
  cardBg: {
    width: '100%',
    height: '100%',
  },
  cardImageStyle: {
    borderRadius: 24,
  },
  cardGradient: {
    flex: 1,
    padding: 28,
    justifyContent: 'space-between',
    borderRadius: 24,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tagBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  stepBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  stepBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  cardBottomContent: {
    gap: 6,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
    lineHeight: 34,
  },
  cardSubtitle: {
    color: '#CFD8DC',
    fontSize: 13,
    lineHeight: 19,
    maxWidth: 540,
  },
  cardCtaBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#D95D45',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 8,
  },
  cardCtaText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },

  // Bottom Branding Footer
  bottomBrandingFooter: {
    marginTop: 40,
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#E8E2D8',
    gap: 4,
  },
  footerBrandingText: {
    color: '#B94332',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 2,
  },
  footerSubText: {
    color: '#66757B',
    fontSize: 11,
  },

  pressed: {
    opacity: 0.85,
  },
});
