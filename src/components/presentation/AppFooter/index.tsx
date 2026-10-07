import React from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface AppFooterProps {
  horizontalInset?: number;
  onNavigateZone?: (zoneName: string) => void;
  onOpenMap?: () => void;
  onOpenFaq?: () => void;
}

export function AppFooter({
  horizontalInset = 20,
  onNavigateZone,
  onOpenMap,
  onOpenFaq,
}: AppFooterProps) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  const handleLinkClick = (title: string, msg: string) => {
    Alert.alert(title, msg);
  };

  return (
    <View style={styles.outerContainer}>
      <LinearGradient
        colors={['#0B1B22', '#081419', '#050D11']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.fullWidthGradient}
      >
        {/* Top Gold Accent Line */}
        <View style={styles.topAccentGlow} />

        <View
          style={[
            styles.footerWrapper,
            {
              paddingHorizontal: isDesktop ? Math.max(horizontalInset, 40) : 20,
            },
          ]}
        >

        {/* 1. MAIN 4-COLUMN RESPONSIVE DIRECTORY */}
        <View style={[styles.columnsGrid, isDesktop && styles.columnsGridDesktop]}>
          {/* Column 1: Brand & Venue Info */}
          <View style={[styles.column, isDesktop && styles.brandColumnDesktop]}>
            <View style={styles.logoRow}>
              <View style={styles.footerMark}>
                <Text style={styles.footerMarkText}>ম</Text>
              </View>
              <View>
                <Text style={styles.brandTitle}>Mela Fest Bangladesh</Text>
                <Text style={styles.brandSubtitle}>Trade, Real Estate & Heritage Expo 2026</Text>
              </View>
            </View>

            <Text style={styles.brandDescription}>
              Bangladesh’s premier international exhibition uniting 500+ authentic makers, 12 signature luxury developer pavilions, and 1M+ prospective visitors.
            </Text>

            {/* Live Expo Status Pill */}
            <View style={styles.statusPill}>
              <View style={styles.statusDot} />
              <Text style={styles.statusPillText}>EXPO LIVE · GATES OPEN 10 AM – 10 PM</Text>
            </View>

            <View style={styles.venueBlock}>
              <Text style={styles.venueLabel}>EXPO VENUE</Text>
              <Text style={styles.venueText}>
                Bangabandhu BBCFEC Exhibition Center{'\n'}
                Purbachal Expressway, Sector 4, Dhaka
              </Text>
            </View>
          </View>

          {/* Column 2: Expo Zones & Attractions */}
          <View style={styles.column}>
            <Text style={styles.columnHeading}>FAIR ZONES</Text>
            <View style={styles.linkList}>
              {[
                { label: '3D Interactive Fairground', action: 'Navigating to 3D Fairground' },
                { label: '12 Luxury Real Estate Pavilions', action: 'Exploring Developer Pavilions' },
                { label: 'Nagordola & Carnival Rides', action: 'Opening Carnival Guide' },
                { label: 'Live Baul & Folk Concerts', action: 'Opening Concert Schedule' },
                { label: 'Old Dhaka Kacchi & Fuchka Hub', action: 'Opening Food Court Directory' },
                { label: 'Jamdani & Clay Artisan Village', action: 'Exploring Heritage Crafts' },
                { label: 'Mega Brands Commercial Arena', action: 'Viewing Mega Brands' },
              ].map((item, idx) => (
                <Pressable
                  key={idx}
                  onPress={() => handleLinkClick(item.label, item.action)}
                  style={({ pressed }) => [styles.linkItem, pressed && styles.linkItemHovered]}
                >
                  <Text style={styles.linkBullet}>›</Text>
                  <Text style={styles.linkText}>{item.label}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Column 3: Visitor Services */}
          <View style={styles.column}>
            <Text style={styles.columnHeading}>VISITOR SERVICES</Text>
            <View style={styles.linkList}>
              {[
                { label: 'Frequently Asked Questions (FAQ)', isFaq: true, action: 'Opening FAQ Center' },
                { label: 'Interactive Digital Fair Map', action: 'Opening Digital Map' },
                { label: 'VIP Fast-Track Pass Booking', action: 'Booking VIP Fast-Track Pass' },
                { label: 'Free Shuttle Bus Timetable', action: 'Shuttle running every 15m from Kuril Flyover & Uttara Sector 8.' },
                { label: 'Multi-Level Car Parking & Valet', action: '3,000+ parking slots available at Gates 1, 2 and 4.' },
                { label: 'Wheelchair & Special Access', action: 'Dedicated ramps, mobility carts and assistance at Gate 1.' },
                { label: '24/7 First Aid & Medical Booths', action: 'Medical emergency teams stationed at North Booth #02.' },
                { label: 'Lost & Found / Info Concierge', action: 'Central helpdesk located at Fountain Plaza.' },
              ].map((item, idx) => (
                <Pressable
                  key={idx}
                  onPress={() => {
                    if (item.isFaq && onOpenFaq) {
                      onOpenFaq();
                    } else {
                      handleLinkClick(item.label, item.action);
                    }
                  }}
                  style={({ pressed }) => [styles.linkItem, pressed && styles.linkItemHovered]}
                >
                  <Text style={styles.linkBullet}>›</Text>
                  <Text style={styles.linkText}>{item.label}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Column 4: Business & Helplines */}
          <View style={styles.column}>
            <Text style={styles.columnHeading}>BUSINESS & SUPPORT</Text>
            <View style={styles.linkList}>
              {[
                { label: 'Stall Allotment & Registration', action: 'Opening Exhibitor Allotment Portal' },
                { label: 'Spot Bank Home Loan Desks', action: 'Partner banks offering up to 80% spot approvals with 0% processing fee.' },
                { label: 'B2B Investor & Partner Lounge', action: 'VIP networking lounge open at Diamond Pavilion Block A.' },
                { label: 'Media & Press Accreditation', action: 'Press passes available at Media Center Gate 2.' },
                { label: 'Sponsorship & Brand Activations', action: 'Contact our brand team at sponsor@melafestbd.com' },
              ].map((item, idx) => (
                <Pressable
                  key={idx}
                  onPress={() => handleLinkClick(item.label, item.action)}
                  style={({ pressed }) => [styles.linkItem, pressed && styles.linkItemHovered]}
                >
                  <Text style={styles.linkBullet}>›</Text>
                  <Text style={styles.linkText}>{item.label}</Text>
                </Pressable>
              ))}
            </View>

            {/* Helpline Contacts Card */}
            <View style={styles.contactCard}>
              <Text style={styles.contactCardTitle}>EXPO 24/7 HELPLINE</Text>
              <Text style={styles.contactPhone}>📞 +880 9612-MELABD</Text>
              <Text style={styles.contactPhone}>📱 +880 1711-002233</Text>
              <Text style={styles.contactEmail}>✉️ support@melafestbd.com</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* 2. INSTITUTIONAL & ENDORSEMENT BADGES */}
        <View style={styles.endorsementsSection}>
          <Text style={styles.endorsementsLabel}>OFFICIAL ORGANIZERS & CO-HOSTS</Text>
          <View style={styles.badgesRow}>
            {[
              'Export Promotion Bureau (EPB)',
              'REHAB Real Estate Partner',
              'Ministry of Commerce BD',
              'ICT Division Smart Bangladesh',
              'FBCCI Trade Federation',
            ].map((name, i) => (
              <View key={i} style={styles.partnerBadge}>
                <Text style={styles.partnerBadgeText}>★ {name}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.divider} />

        {/* 3. BOTTOM BAR: SOCIALS, COPYRIGHT & LEGAL */}
        <View style={[styles.bottomBar, isDesktop && styles.bottomBarDesktop]}>
          <View style={styles.socialsGroup}>
            {['Facebook', 'Instagram', 'YouTube', 'LinkedIn', 'X (Twitter)'].map((social, idx) => (
              <Pressable
                key={idx}
                onPress={() => handleLinkClick(social, `Opening Mela Fest official ${social} page.`)}
                style={({ pressed }) => [styles.socialBtn, pressed && { opacity: 0.75 }]}
              >
                <Text style={styles.socialBtnText}>{social}</Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.legalLinksRow}>
            {['Privacy Policy', 'Terms of Fair Allotment', 'Security Protocols', 'Cookie Settings', 'Sitemap'].map(
              (legal, idx) => (
                <Pressable
                  key={idx}
                  onPress={() => handleLinkClick(legal, `Viewing ${legal} document.`)}
                >
                  <Text style={styles.legalLinkText}>{legal}</Text>
                </Pressable>
              )
            )}
          </View>

          <Text style={styles.copyrightText}>
            © 2026 Mela Fest Bangladesh. All rights reserved. Designed with Pride in Bangladesh.
          </Text>
        </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    backgroundColor: '#050D11',
    marginTop: 40,
  },
  fullWidthGradient: {
    width: '100%',
    position: 'relative',
  },
  footerWrapper: {
    width: '100%',
    maxWidth: 1680,
    alignSelf: 'center',
    paddingTop: 42,
    paddingBottom: 42,
  },
  topAccentGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#D4AF37',
    shadowColor: '#FFE082',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginVertical: 28,
  },

  // Directory Columns Grid
  columnsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 32,
    justifyContent: 'space-between',
  },
  columnsGridDesktop: {
    flexWrap: 'nowrap',
  },
  column: {
    flex: 1,
    minWidth: 200,
  },
  brandColumnDesktop: {
    flex: 1.4,
    minWidth: 260,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  footerMark: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D95D45',
    borderWidth: 1.5,
    borderColor: '#FFE082',
  },
  footerMarkText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
  },
  brandTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  brandSubtitle: {
    color: '#FFE082',
    fontSize: 11,
    fontWeight: '700',
  },
  brandDescription: {
    color: '#90A4AE',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 16,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: 'rgba(0, 230, 118, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(0, 230, 118, 0.4)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#00E676',
  },
  statusPillText: {
    color: '#00E676',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  venueBlock: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    padding: 10,
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#D4AF37',
  },
  venueLabel: {
    color: '#FFE082',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.0,
    marginBottom: 3,
  },
  venueText: {
    color: '#CFD8DC',
    fontSize: 11,
    lineHeight: 16,
  },

  columnHeading: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.2,
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  linkList: {
    gap: 10,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 2,
  },
  linkItemHovered: {
    opacity: 0.7,
  },
  linkBullet: {
    color: '#D4AF37',
    fontSize: 14,
    fontWeight: '900',
  },
  linkText: {
    color: '#B0BEC5',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
  },

  contactCard: {
    marginTop: 18,
    backgroundColor: 'rgba(10, 26, 33, 0.85)',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    gap: 4,
  },
  contactCardTitle: {
    color: '#FFE082',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 4,
  },
  contactPhone: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  contactEmail: {
    color: '#00BCD4',
    fontSize: 11,
    fontWeight: '600',
  },

  // Endorsements
  endorsementsSection: {
    alignItems: 'center',
    gap: 12,
  },
  endorsementsLabel: {
    color: '#78909C',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  partnerBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  partnerBadgeText: {
    color: '#CFD8DC',
    fontSize: 11,
    fontWeight: '700',
  },

  // Bottom Bar
  bottomBar: {
    alignItems: 'center',
    gap: 16,
  },
  bottomBarDesktop: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  socialsGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  socialBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  socialBtnText: {
    color: '#ECEFF1',
    fontSize: 11,
    fontWeight: '700',
  },
  legalLinksRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  legalLinkText: {
    color: '#78909C',
    fontSize: 11,
    fontWeight: '600',
  },
  copyrightText: {
    color: '#546E7A',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 6,
  },
});
