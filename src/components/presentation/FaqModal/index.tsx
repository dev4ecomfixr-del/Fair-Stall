import React, { useState, useMemo } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  useWindowDimensions,
  Alert,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../../constants/Colors';

export interface FaqItem {
  id: string;
  category: 'tickets' | 'venue' | 'stalls' | 'attractions' | 'vendors';
  categoryLabel: string;
  question: string;
  answer: string;
  highlights?: string[];
  actionLabel?: string;
  actionType?: 'ticket' | 'map' | 'vendor' | 'contact' | 'loan';
  helpfulYes?: number;
  helpfulNo?: number;
}

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'tickets',
    categoryLabel: 'Tickets & Admission',
    question: 'What are the exhibition dates, venue hours, and ticket prices?',
    answer:
      'Mela Fest Bangladesh 2026 takes place from January 10 to January 25, 2026 at the Bangabandhu Bangladesh-China Friendship Exhibition Center (BBCFEC), Purbachal, Dhaka. Expo gates are open daily from 10:00 AM to 10:00 PM.',
    highlights: [
      'Regular Single Entry Pass: ৳50',
      'VIP Fast-Track Pass: ৳200 (Includes queue-jump & parking voucher)',
      'Free Entry: Children under 5 & Senior Citizens (65+ with ID)',
      'Student Pass: 50% discount at gate counters with valid ID card',
    ],
    actionLabel: 'Book Entry Passes',
    actionType: 'ticket',
    helpfulYes: 142,
    helpfulNo: 3,
  },
  {
    id: 'faq-2',
    category: 'tickets',
    categoryLabel: 'Tickets & Admission',
    question: 'How do I purchase VIP Fast-Track or Multi-Day Passes online?',
    answer:
      'You can easily book entry tickets and VIP passes in advance through our app or website. Click on the "Cart & Passes" icon in the header, select your desired date and pass type, and complete payment via bKash, Nagad, Rocket, or Credit/Debit Cards. E-tickets will be sent instantly to your email and phone.',
    highlights: [
      'Instant QR Code E-ticket on mobile',
      'Dedicated VIP Gate 2 access with no queue waiting',
      '100% refund available up to 24 hours before selected date',
    ],
    actionLabel: 'Open Ticket Counter',
    actionType: 'ticket',
    helpfulYes: 98,
    helpfulNo: 2,
  },
  {
    id: 'faq-3',
    category: 'venue',
    categoryLabel: 'Venue & Transport',
    question: 'Where is the expo located and is free shuttle transport available?',
    answer:
      'The venue is Bangabandhu BBCFEC, Purbachal Expressway, Sector 4, Dhaka. To ensure convenient travel for all visitors, Mela Fest operates complimentary AC Shuttle Buses every 15 minutes.',
    highlights: [
      'Shuttle Pickup Point 1: Kuril Flyover (300ft Bus Stand)',
      'Shuttle Pickup Point 2: Uttara Sector 8 Bus Terminal',
      'Shuttle Hours: 9:30 AM to 10:30 PM continuously',
      'Travel Time: Approx 15–20 minutes from Kuril',
    ],
    actionLabel: 'View Fair Map & Route',
    actionType: 'map',
    helpfulYes: 215,
    helpfulNo: 5,
  },
  {
    id: 'faq-4',
    category: 'venue',
    categoryLabel: 'Venue & Transport',
    question: 'What parking and wheelchair accessibility options are available?',
    answer:
      'The exhibition center features over 3,000 secured multi-level car parking spaces across Gate 1 and Gate 4. The entire venue is 100% wheel-chair friendly with ramps, spacious elevators, and dedicated assistance.',
    highlights: [
      'Car Parking Fee: ৳100 per day (Free for VIP Pass holders)',
      'Motorcycle Parking: ৳30 per day',
      'Free Electric Mobility Carts available at Info Booth Gate 1',
      'Dedicated accessible restrooms on all hall floors',
    ],
    actionLabel: 'Check Parking Map',
    actionType: 'map',
    helpfulYes: 87,
    helpfulNo: 1,
  },
  {
    id: 'faq-5',
    category: 'stalls',
    categoryLabel: 'Stalls & Real Estate',
    question: 'Which real estate developers and mega brands are exhibiting?',
    answer:
      'Mela Fest 2026 hosts 12 signature luxury developer pavilions showcasing premium residential apartments, commercial plots, and villas. Participating brands include Navana Real Estate, Asset Developments, bti, Sheltech, Concord, Assurance, along with 500+ authentic craft makers and commercial brands.',
    highlights: [
      'Exclusive fair-only discount of up to 15% on apartment bookings',
      'Spot booking gifts including home automation packages',
      'Interactive 3D virtual floorplans at each booth',
    ],
    actionLabel: 'Explore Developer Pavilions',
    actionType: 'map',
    helpfulYes: 176,
    helpfulNo: 4,
  },
  {
    id: 'faq-6',
    category: 'stalls',
    categoryLabel: 'Stalls & Real Estate',
    question: 'Can I get spot bank home loan approval during the fair?',
    answer:
      'Yes! Top financial institutions including Eastern Bank, City Bank, DBBL, and IDLC Finance have dedicated spot-financing desks inside Pavilion Block A.',
    highlights: [
      'Up to 80% property financing available',
      '0% processing fee on spot applications',
      'Pre-approved home loan letters issued within 30 minutes',
    ],
    actionLabel: 'Spot Loan Inquiry',
    actionType: 'loan',
    helpfulYes: 112,
    helpfulNo: 3,
  },
  {
    id: 'faq-7',
    category: 'attractions',
    categoryLabel: 'Food & Attractions',
    question: 'What food hubs, cultural shows, and rides are available?',
    answer:
      'Enjoy an unforgettable family festival experience! Mela Fest brings together traditional heritage crafts, food delights, and vibrant entertainment for all age groups.',
    highlights: [
      'Old Dhaka Kacchi & Fuchka Hub featuring Grand Nawab & Star Kabab',
      'Live Baul, Folk & Contemporary Concerts every evening from 6:30 PM',
      'Nagordola wheel, bioscope, puppet theatre & giant carnival rides',
      'Jamdani weavers & live pottery making by master artisans',
    ],
    actionLabel: 'See Fair Schedule',
    actionType: 'map',
    helpfulYes: 195,
    helpfulNo: 2,
  },
  {
    id: 'faq-8',
    category: 'vendors',
    categoryLabel: 'Vendor & Exhibitor',
    question: 'How can I apply for a stall or sponsorship at Mela Fest 2026?',
    answer:
      'Exhibitor stall allotment is open for commercial vendors, real estate developers, and artisanal businesses. You can submit your allotment application via our Vendor Portal or contact our team directly.',
    highlights: [
      'Shell Scheme Stalls (9 sqm to 36 sqm) & Bare Space Pavilions',
      '24/7 security, high-speed Wi-Fi & electrical power backup included',
      'Brand visibility to 1M+ footfall visitors across 16 days',
    ],
    actionLabel: 'Open Vendor Portal',
    actionType: 'vendor',
    helpfulYes: 74,
    helpfulNo: 1,
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Questions', icon: '✦' },
  { id: 'tickets', label: 'Tickets & Passes', icon: '🎟️' },
  { id: 'venue', label: 'Venue & Transport', icon: '📍' },
  { id: 'stalls', label: 'Stalls & Real Estate', icon: '🏢' },
  { id: 'attractions', label: 'Food & Attractions', icon: '🎡' },
  { id: 'vendors', label: 'Vendor & Exhibitors', icon: '💼' },
];

interface FaqModalProps {
  visible: boolean;
  onClose: () => void;
  onNavigateAction?: (actionType: string) => void;
  isDesktop?: boolean;
}

export function FaqModal({
  visible,
  onClose,
  onNavigateAction,
  isDesktop = false,
}: FaqModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'faq-1': true,
  });
  const [feedbackState, setFeedbackState] = useState<Record<string, 'yes' | 'no'>>({});
  const [showAskForm, setShowAskForm] = useState(false);
  const [askName, setAskName] = useState('');
  const [askEmail, setAskEmail] = useState('');
  const [askQuestionText, setAskQuestionText] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleFeedback = (id: string, type: 'yes' | 'no') => {
    if (feedbackState[id]) return;
    setFeedbackState((prev) => ({ ...prev, [id]: type }));
  };

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesQuery =
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query) ||
        item.highlights?.some((h) => h.toLowerCase().includes(query));

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const handleActionClick = (item: FaqItem) => {
    if (item.actionType && onNavigateAction) {
      onClose();
      onNavigateAction(item.actionType);
    } else {
      Alert.alert(
        item.actionLabel || 'Expo Info',
        `Thank you for checking "${item.question}". For immediate assistance, call our Helpline at +880 9612-MELABD.`
      );
    }
  };

  const handleSubmitQuestion = () => {
    if (!askName.trim() || !askQuestionText.trim()) {
      Alert.alert('Required Fields', 'Please enter your name and question.');
      return;
    }
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setShowAskForm(false);
      setAskName('');
      setAskEmail('');
      setAskQuestionText('');
      Alert.alert(
        'Question Submitted',
        'Thank you! Our expo support concierge will reply to your contact details within 2 hours.'
      );
    }, 1200);
  };

  if (!visible) return null;

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.modalContainer,
            isDesktop && styles.modalContainerDesktop,
          ]}
        >
          {/* Light Warm Header Banner */}
          <LinearGradient
            colors={['#FFFBF5', '#F7EFE3']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.modalHeader}
          >
            <View style={styles.headerTitleRow}>
              <View style={styles.headerBadge}>
                <Text style={styles.headerBadgeText}>EXPO HELP CENTER</Text>
              </View>
              <Pressable
                accessibilityLabel="Close FAQ"
                onPress={onClose}
                style={({ pressed }) => [
                  styles.closeButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </Pressable>
            </View>

            <Text style={styles.modalHeading}>Frequently Asked Questions</Text>
            <Text style={styles.modalSubheading}>
              Find quick answers about tickets, transport, developer pavilions, food, and vendor guidelines for Mela Fest 2026.
            </Text>

            {/* Search Box */}
            <View style={styles.searchContainer}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Search questions, shuttle times, ticket prices..."
                placeholderTextColor="#66757B"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <Pressable onPress={() => setSearchQuery('')} style={styles.searchClearBtn}>
                  <Text style={styles.searchClearText}>✕</Text>
                </Pressable>
              )}
            </View>
          </LinearGradient>

          {/* Light Category Tabs */}
          <View style={styles.categoryBar}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryScrollContent}
            >
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <Pressable
                    key={cat.id}
                    onPress={() => setSelectedCategory(cat.id)}
                    style={[
                      styles.categoryTab,
                      isActive && styles.categoryTabActive,
                    ]}
                  >
                    <Text style={styles.categoryIcon}>{cat.icon}</Text>
                    <Text
                      style={[
                        styles.categoryText,
                        isActive && styles.categoryTextActive,
                      ]}
                    >
                      {cat.label}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>

          {/* Main FAQ Accordion List */}
          <ScrollView
            style={styles.faqListScroll}
            contentContainerStyle={styles.faqListContent}
            showsVerticalScrollIndicator={true}
          >
            {filteredFaqs.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateIcon}>🔎</Text>
                <Text style={styles.emptyStateTitle}>No matching questions found</Text>
                <Text style={styles.emptyStateSub}>
                  Try searching with different keywords or submit a direct query to our helpline team below.
                </Text>
                <Pressable
                  onPress={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  style={styles.resetSearchBtn}
                >
                  <Text style={styles.resetSearchText}>Reset Filters & Search</Text>
                </Pressable>
              </View>
            ) : (
              filteredFaqs.map((item) => {
                const isExpanded = !!expandedIds[item.id];
                const userFeedback = feedbackState[item.id];

                return (
                  <View
                    key={item.id}
                    style={[
                      styles.faqCard,
                      isExpanded && styles.faqCardExpanded,
                    ]}
                  >
                    <Pressable
                      onPress={() => toggleExpand(item.id)}
                      style={({ pressed }) => [
                        styles.questionRow,
                        pressed && styles.pressedRow,
                      ]}
                    >
                      <View style={styles.questionLeftGroup}>
                        <View style={styles.tagBadge}>
                          <Text style={styles.tagBadgeText}>
                            {item.categoryLabel}
                          </Text>
                        </View>
                        <Text style={styles.questionText}>{item.question}</Text>
                      </View>

                      <View
                        style={[
                          styles.expandIconCircle,
                          isExpanded && styles.expandIconCircleActive,
                        ]}
                      >
                        <Text style={styles.expandIconText}>
                          {isExpanded ? '−' : '+'}
                        </Text>
                      </View>
                    </Pressable>

                    {isExpanded && (
                      <View style={styles.answerContainer}>
                        <Text style={styles.answerText}>{item.answer}</Text>

                        {item.highlights && item.highlights.length > 0 && (
                          <View style={styles.highlightsBox}>
                            {item.highlights.map((point, pIdx) => (
                              <View key={pIdx} style={styles.bulletRow}>
                                <Text style={styles.bulletSymbol}>✦</Text>
                                <Text style={styles.bulletText}>{point}</Text>
                              </View>
                            ))}
                          </View>
                        )}

                        <View style={styles.cardFooterRow}>
                          {item.actionLabel && (
                            <Pressable
                              onPress={() => handleActionClick(item)}
                              style={({ pressed }) => [
                                styles.actionBtn,
                                pressed && styles.pressed,
                              ]}
                            >
                              <Text style={styles.actionBtnText}>
                                {item.actionLabel} →
                              </Text>
                            </Pressable>
                          )}

                          <View style={styles.feedbackContainer}>
                            <Text style={styles.feedbackPrompt}>Was this helpful?</Text>
                            <Pressable
                              onPress={() => handleFeedback(item.id, 'yes')}
                              disabled={!!userFeedback}
                              style={[
                                styles.feedbackThumbBtn,
                                userFeedback === 'yes' && styles.feedbackThumbActive,
                              ]}
                            >
                              <Text style={styles.feedbackThumbText}>
                                👍 {(item.helpfulYes || 0) + (userFeedback === 'yes' ? 1 : 0)}
                              </Text>
                            </Pressable>

                            <Pressable
                              onPress={() => handleFeedback(item.id, 'no')}
                              disabled={!!userFeedback}
                              style={[
                                styles.feedbackThumbBtn,
                                userFeedback === 'no' && styles.feedbackThumbActiveNo,
                              ]}
                            >
                              <Text style={styles.feedbackThumbText}>
                                👎 {(item.helpfulNo || 0) + (userFeedback === 'no' ? 1 : 0)}
                              </Text>
                            </Pressable>
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                );
              })
            )}

            {/* Light Helpline Banner */}
            <LinearGradient
              colors={['#FFF9EE', '#FBEFD8']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.helplineBanner}
            >
              <View style={styles.helplineLeft}>
                <Text style={styles.helplineTitle}>Still have questions about Mela Fest?</Text>
                <Text style={styles.helplineSub}>
                  Our 24/7 Visitor Support Concierge is standing by at BBCFEC Purbachal.
                </Text>
              </View>

              <View style={styles.helplineActions}>
                <Pressable
                  onPress={() =>
                    Alert.alert(
                      'Mela Fest Helpline',
                      'Call +880 9612-MELABD or +880 1711-002233 for live support.'
                    )
                  }
                  style={styles.callHelplineBtn}
                >
                  <Text style={styles.callHelplineText}>📞 Call Hotline</Text>
                </Pressable>

                <Pressable
                  onPress={() => setShowAskForm(!showAskForm)}
                  style={styles.askQueryBtn}
                >
                  <Text style={styles.askQueryText}>
                    {showAskForm ? 'Close Form' : '✉️ Ask a Question'}
                  </Text>
                </Pressable>
              </View>
            </LinearGradient>

            {/* Submit Custom Question Form */}
            {showAskForm && (
              <View style={styles.customFormBox}>
                <Text style={styles.formBoxTitle}>Submit Your Query to Expo Concierge</Text>
                <Text style={styles.formBoxSub}>
                  We reply via SMS and email within 2 hours.
                </Text>

                <TextInput
                  style={styles.formInput}
                  placeholder="Your Full Name *"
                  placeholderTextColor="#869499"
                  value={askName}
                  onChangeText={setAskName}
                />

                <TextInput
                  style={styles.formInput}
                  placeholder="Email or Mobile Number (Optional)"
                  placeholderTextColor="#869499"
                  value={askEmail}
                  onChangeText={setAskEmail}
                />

                <TextInput
                  style={[styles.formInput, styles.formInputMulti]}
                  placeholder="Describe your question or stall inquiry *"
                  placeholderTextColor="#869499"
                  value={askQuestionText}
                  onChangeText={setAskQuestionText}
                  multiline
                  numberOfLines={4}
                />

                <Pressable
                  onPress={handleSubmitQuestion}
                  disabled={submittedMessage}
                  style={({ pressed }) => [
                    styles.submitFormBtn,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={styles.submitFormBtnText}>
                    {submittedMessage ? 'Sending Query...' : 'Submit Question'}
                  </Text>
                </Pressable>
              </View>
            )}

            {/* Bottom Footer Note */}
            <View style={styles.modalBottomInfo}>
              <Text style={styles.modalBottomText}>
                Mela Fest 2026 Official Helpdesk · Bangabandhu BBCFEC Exhibition Center · Sector 4, Purbachal, Dhaka
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

export function FaqSection({
  onOpenFaqModal,
  horizontalInset = 20,
}: {
  onOpenFaqModal: () => void;
  horizontalInset?: number;
}) {
  const [openId, setOpenId] = useState<string>('faq-1');

  const topFaqs = FAQ_DATA.slice(0, 4);

  return (
    <View style={[styles.sectionWrapper, { paddingHorizontal: horizontalInset }]}>
      <LinearGradient
        colors={['#FFFFFF', '#FAF5EE']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.sectionCard}
      >
        <View style={styles.sectionHeaderRow}>
          <View>
            <View style={styles.sectionBadge}>
              <Text style={styles.sectionBadgeText}>EXPO HELP CENTER</Text>
            </View>
            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
            <Text style={styles.sectionSubtitle}>
              Everything you need to know about tickets, shuttle timing, stalls & food hubs.
            </Text>
          </View>

          <Pressable
            onPress={onOpenFaqModal}
            style={({ pressed }) => [
              styles.sectionTopBtn,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.sectionTopBtnText}>View All FAQs (8) →</Text>
          </Pressable>
        </View>

        <View style={styles.sectionList}>
          {topFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <View
                key={faq.id}
                style={[
                  styles.sectionFaqItem,
                  isOpen && styles.sectionFaqItemOpen,
                ]}
              >
                <Pressable
                  onPress={() => setOpenId(isOpen ? '' : faq.id)}
                  style={styles.sectionQuestionPress}
                >
                  <View style={styles.sectionQuestionLeft}>
                    <Text style={styles.sectionCategoryPill}>
                      {faq.categoryLabel}
                    </Text>
                    <Text style={styles.sectionQuestionTitle}>{faq.question}</Text>
                  </View>
                  <Text style={styles.sectionToggleSymbol}>{isOpen ? '−' : '+'}</Text>
                </Pressable>

                {isOpen && (
                  <View style={styles.sectionAnswerBox}>
                    <Text style={styles.sectionAnswerText}>{faq.answer}</Text>
                    {faq.highlights && (
                      <View style={styles.sectionBullets}>
                        {faq.highlights.map((h, i) => (
                          <Text key={i} style={styles.sectionBulletLine}>
                            • {h}
                          </Text>
                        ))}
                      </View>
                    )}
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Section Bottom Banner */}
        <View style={styles.sectionBottomBanner}>
          <View>
            <Text style={styles.bannerBoldText}>Need Urgent Support at the Fair?</Text>
            <Text style={styles.bannerLightText}>
              24/7 Helpline: +880 9612-MELABD · Info Desk at Fountain Plaza Gate 1
            </Text>
          </View>
          <Pressable onPress={onOpenFaqModal} style={styles.bannerCTA}>
            <Text style={styles.bannerCTAText}>Open Help Center</Text>
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(16, 28, 34, 0.65)',
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
  modalContainer: {
    width: '100%',
    maxHeight: '90%',
    backgroundColor: '#FAF6F0',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 20,
    ...(Platform.OS === 'web'
      ? ({
          zIndex: 1000000,
        } as any)
      : {}),
  },
  modalContainerDesktop: {
    maxWidth: 820,
    maxHeight: '84%',
    borderRadius: 24,
  },

  // Modal Header Banner
  modalHeader: {
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#E7E2D9',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  headerBadge: {
    backgroundColor: '#FFF4D9',
    borderWidth: 1,
    borderColor: '#F2B84B',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  headerBadgeText: {
    color: '#B94332',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  closeButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#EFE8DC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: '#17242A',
    fontSize: 16,
    fontWeight: '700',
  },
  modalHeading: {
    color: '#17242A',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  modalSubheading: {
    color: '#66757B',
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 16,
  },

  // Search Box
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: '#E5DFD5',
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#17242A',
    fontSize: 13,
    height: '100%',
  },
  searchClearBtn: {
    padding: 4,
  },
  searchClearText: {
    color: '#66757B',
    fontSize: 14,
    fontWeight: '700',
  },

  // Category Bar
  categoryBar: {
    backgroundColor: '#F3EDE3',
    borderBottomWidth: 1,
    borderBottomColor: '#E7E2D9',
    paddingVertical: 10,
  },
  categoryScrollContent: {
    paddingHorizontal: 18,
    gap: 8,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5DFD5',
  },
  categoryTabActive: {
    backgroundColor: '#D95D45',
    borderColor: '#B94332',
  },
  categoryIcon: {
    fontSize: 13,
  },
  categoryText: {
    color: '#4A565C',
    fontSize: 12,
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  // FAQ List
  faqListScroll: {
    flex: 1,
    backgroundColor: '#FAF6F0',
  },
  faqListContent: {
    padding: 18,
    gap: 12,
  },

  // FAQ Card
  faqCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E8E2D8',
    overflow: 'hidden',
  },
  faqCardExpanded: {
    borderColor: '#D95D45',
    backgroundColor: '#FFFFFF',
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    gap: 12,
  },
  pressedRow: {
    opacity: 0.85,
  },
  questionLeftGroup: {
    flex: 1,
    gap: 6,
  },
  tagBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EBF3F0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagBadgeText: {
    color: '#2C6B56',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  questionText: {
    color: '#17242A',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  expandIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F3EDE3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandIconCircleActive: {
    backgroundColor: '#D95D45',
  },
  expandIconText: {
    color: '#17242A',
    fontSize: 16,
    fontWeight: '800',
  },

  // Answer Body
  answerContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#F0EAE1',
  },
  answerText: {
    color: '#3D4D54',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 12,
  },
  highlightsBox: {
    backgroundColor: '#FFFDF9',
    padding: 12,
    borderRadius: 10,
    gap: 6,
    marginBottom: 14,
    borderLeftWidth: 3,
    borderLeftColor: '#F2B84B',
    borderWidth: 1,
    borderColor: '#F5ECE0',
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  bulletSymbol: {
    color: '#D95D45',
    fontSize: 10,
    marginTop: 3,
  },
  bulletText: {
    color: '#2C3A40',
    fontSize: 12,
    lineHeight: 17,
    flex: 1,
    fontWeight: '600',
  },

  // Card Footer & Feedback
  cardFooterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 4,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0EAE1',
  },
  actionBtn: {
    backgroundColor: '#D95D45',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },

  feedbackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  feedbackPrompt: {
    color: '#66757B',
    fontSize: 11,
    fontWeight: '600',
  },
  feedbackThumbBtn: {
    backgroundColor: '#F3EDE3',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2D9CC',
  },
  feedbackThumbActive: {
    backgroundColor: '#E2F3E7',
    borderColor: '#4CAF50',
  },
  feedbackThumbActiveNo: {
    backgroundColor: '#FDE8E7',
    borderColor: '#E53935',
  },
  feedbackThumbText: {
    color: '#17242A',
    fontSize: 11,
    fontWeight: '700',
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    gap: 8,
  },
  emptyStateIcon: {
    fontSize: 36,
  },
  emptyStateTitle: {
    color: '#17242A',
    fontSize: 16,
    fontWeight: '800',
  },
  emptyStateSub: {
    color: '#66757B',
    fontSize: 12,
    textAlign: 'center',
    maxWidth: 320,
    lineHeight: 18,
  },
  resetSearchBtn: {
    marginTop: 8,
    backgroundColor: '#D95D45',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  resetSearchText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  // Helpline Banner
  helplineBanner: {
    marginTop: 10,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F2B84B',
    gap: 12,
  },
  helplineLeft: {
    gap: 4,
  },
  helplineTitle: {
    color: '#17242A',
    fontSize: 14,
    fontWeight: '800',
  },
  helplineSub: {
    color: '#546E7A',
    fontSize: 11,
    lineHeight: 16,
  },
  helplineActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  callHelplineBtn: {
    backgroundColor: '#10262D',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  callHelplineText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  askQueryBtn: {
    backgroundColor: '#D95D45',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  askQueryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  // Custom Form Box
  customFormBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: '#E5DFD5',
  },
  formBoxTitle: {
    color: '#B94332',
    fontSize: 13,
    fontWeight: '800',
  },
  formBoxSub: {
    color: '#66757B',
    fontSize: 11,
  },
  formInput: {
    backgroundColor: '#FBF8F3',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    color: '#17242A',
    fontSize: 12,
    borderWidth: 1,
    borderColor: '#E5DFD5',
  },
  formInputMulti: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: 8,
  },
  submitFormBtn: {
    backgroundColor: '#D95D45',
    height: 42,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  submitFormBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },

  modalBottomInfo: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  modalBottomText: {
    color: '#869499',
    fontSize: 10,
    textAlign: 'center',
  },

  // Inline Section Styles
  sectionWrapper: {
    width: '100%',
    maxWidth: 1680,
    alignSelf: 'center',
    marginVertical: 28,
  },
  sectionCard: {
    width: '100%',
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: '#E5DFD5',
    gap: 18,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  sectionBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF3D6',
    borderWidth: 1,
    borderColor: '#F2B84B',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 6,
  },
  sectionBadgeText: {
    color: '#996900',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  sectionTitle: {
    color: '#17242A',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  sectionSubtitle: {
    color: '#66757B',
    fontSize: 12,
    marginTop: 4,
    maxWidth: 480,
    lineHeight: 18,
  },
  sectionTopBtn: {
    backgroundColor: '#D95D45',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  sectionTopBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  sectionList: {
    gap: 10,
  },
  sectionFaqItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EAE4D9',
    overflow: 'hidden',
  },
  sectionFaqItemOpen: {
    borderColor: '#F2B84B',
    backgroundColor: '#FFFDF9',
  },
  sectionQuestionPress: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    gap: 12,
  },
  sectionQuestionLeft: {
    flex: 1,
    gap: 4,
  },
  sectionCategoryPill: {
    color: '#2C6B56',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  sectionQuestionTitle: {
    color: '#17242A',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
  },
  sectionToggleSymbol: {
    color: '#D95D45',
    fontSize: 18,
    fontWeight: '800',
  },
  sectionAnswerBox: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    paddingTop: 2,
    borderTopWidth: 1,
    borderTopColor: '#F0EAE1',
  },
  sectionAnswerText: {
    color: '#3D4D54',
    fontSize: 12,
    lineHeight: 18,
  },
  sectionBullets: {
    marginTop: 8,
    gap: 3,
  },
  sectionBulletLine: {
    color: '#B94332',
    fontSize: 11,
    fontWeight: '600',
  },

  sectionBottomBanner: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5EEE4',
    padding: 14,
    borderRadius: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: '#E2D9CC',
  },
  bannerBoldText: {
    color: '#17242A',
    fontSize: 12,
    fontWeight: '800',
  },
  bannerLightText: {
    color: '#66757B',
    fontSize: 11,
    marginTop: 2,
  },
  bannerCTA: {
    backgroundColor: '#10262D',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  bannerCTAText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },

  pressed: {
    opacity: 0.8,
  },
});
