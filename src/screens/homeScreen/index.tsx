import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  ImageBackground,
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
import { COLORS } from '../../constants/Colors';

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
    id: 'bata',
    brand: 'BATA',
    pavilion: 'Pavilion 01',
    offer: 'Up to 30% off',
    note: 'Footwear & lifestyle',
    color: '#D95D45',
  },
  {
    id: 'apex',
    brand: 'APEX',
    pavilion: 'Pavilion 02',
    offer: 'Festive sneakers',
    note: 'New season drop',
    color: '#193E4A',
  },
  {
    id: 'aarong',
    brand: 'AARONG',
    pavilion: 'Pavilion 03',
    offer: 'Heritage edit',
    note: 'Handcrafted in BD',
    color: '#9D4D3C',
  },
];

const stalls = [
  {
    slug: 'sonargaon-pottery',
    name: 'Sonargaon Pottery',
    location: 'Stall 101 · Zone B',
    category: 'Clay & ceramic',
    rating: '4.9',
    reviews: '120',
    initials: 'SP',
    tone: '#B7654B',
    booth: require('../../../assets/booth-sonargaon.png'),
  },
  {
    slug: 'tangail-jamdani',
    name: 'Tangail Jamdani',
    location: 'Stall 102 · Zone B',
    category: 'Handloom textile',
    rating: '5.0',
    reviews: '85',
    initials: 'TJ',
    tone: '#4C7165',
    booth: require('../../../assets/booth-tangail.png'),
  },
  {
    slug: 'rajshahi-silk',
    name: 'Rajshahi Silk',
    location: 'Stall 103 · Zone C',
    category: 'Natural silk',
    rating: '4.8',
    reviews: '210',
    initials: 'RS',
    tone: '#6B4059',
    booth: require('../../../assets/booth-rajshahi.png'),
  },
] as const;

const stallPageDetails = {
  'sonargaon-pottery': {
    hero: require('../../../assets/stall-sonargaon-hero.png'),
    bangla: 'সোনারগাঁও মৃৎশিল্প',
    tagline: 'Earth, shaped by generations.',
    description:
      'From the historic kiln yards of Sonargaon, our potters turn local river clay into objects made for everyday rituals and lasting beauty.',
    story:
      'Our family workshop has carried the language of Bengal’s terracotta craft for four generations. Every vessel is thrown by hand, sun-dried slowly and fired in small batches. At Mela Fest, visitors can meet the makers, watch the wheel in motion and take home a piece with its own fingerprints and story.',
    founded: 'Since 1968',
    makers: '12 artisans',
    material: 'Local river clay',
    demo: 'Live wheel demo · 4:30 PM',
    offer: 'Buy any 2 pieces and receive 15% off',
    phone: '+880 1712 345 101',
    products: [
      { name: 'Alpana Table Vase', price: '৳ 850', symbol: '◒', color: '#B7654B' },
      { name: 'Terracotta Tea Set', price: '৳ 1,450', symbol: '◉', color: '#8D4D3C' },
      { name: 'Nakshi Lamp', price: '৳ 980', symbol: '✦', color: '#D18A5E' },
    ],
  },
  'tangail-jamdani': {
    hero: require('../../../assets/stall-tangail-hero.png'),
    bangla: 'টাঙ্গাইল জামদানি',
    tagline: 'Woven slowly. Worn forever.',
    description:
      'Fine-count cotton, floating motifs and the patient rhythm of the handloom—discover Jamdani woven by master craftspeople from Tangail.',
    story:
      'Each piece begins as a conversation between two hands and hundreds of threads. Our weavers use the discontinuous supplementary-weft technique to build motifs directly on the loom, one tiny passage at a time. We work with artisan families across Tangail to preserve this knowledge and ensure every maker is credited fairly.',
    founded: 'Since 1984',
    makers: '28 weavers',
    material: 'Fine cotton yarn',
    demo: 'Motif weaving · 3:00 PM',
    offer: 'Complimentary blouse piece with selected sarees',
    phone: '+880 1712 345 102',
    products: [
      { name: 'Shapla Jamdani', price: '৳ 8,500', symbol: '✣', color: '#4C7165' },
      { name: 'Nakshi Stole', price: '৳ 2,200', symbol: '⌁', color: '#315C55' },
      { name: 'Classic Orna', price: '৳ 3,600', symbol: '≈', color: '#8C4D4B' },
    ],
  },
  'rajshahi-silk': {
    hero: require('../../../assets/stall-rajshahi-hero.png'),
    bangla: 'রাজশাহী সিল্ক',
    tagline: 'The quiet luxury of Bengal silk.',
    description:
      'Lustrous Rajshahi silk, refined by skilled hands and finished with timeless borders inspired by Bengal’s architectural heritage.',
    story:
      'We source silk from small sericulture communities around Rajshahi and finish every saree in our own workshop. From yarn preparation to border detailing, the process balances traditional knowledge with restrained contemporary design. The result is silk that feels light, breathes beautifully and grows more personal with wear.',
    founded: 'Since 1976',
    makers: '20 artisans',
    material: 'Mulberry silk',
    demo: 'Silk care session · 6:00 PM',
    offer: 'Free fall and edging on every saree',
    phone: '+880 1712 345 103',
    products: [
      { name: 'Padma Silk Saree', price: '৳ 12,500', symbol: '✦', color: '#6B4059' },
      { name: 'Heritage Panjabi', price: '৳ 5,800', symbol: '◇', color: '#4B2F43' },
      { name: 'Silk Gift Scarf', price: '৳ 2,750', symbol: '≈', color: '#A47750' },
    ],
  },
} as const;

const deals = [
  {
    name: 'Leather Loafer',
    brand: 'Bata',
    price: '৳ 2,499',
    oldPrice: '৳ 3,100',
    discount: '20% OFF',
    color: '#25383E',
    symbol: '⌁',
  },
  {
    name: 'Clay Vase',
    brand: 'Haat Studio',
    price: '৳ 350',
    oldPrice: '৳ 500',
    discount: '30% OFF',
    color: '#C66D4B',
    symbol: '◉',
  },
  {
    name: 'Casual Sandal',
    brand: 'Apex',
    price: '৳ 1,850',
    oldPrice: '৳ 2,200',
    discount: '16% OFF',
    color: '#D4A24D',
    symbol: '≈',
  },
];

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
    id: 'A01',
    name: 'Bata Pavilion',
    category: 'Mega brands',
    zone: 'North Pavilion',
    color: '#D95D45',
    rating: '4.8',
    hours: '10 AM – 10 PM',
    offer: 'Footwear · Up to 30% off',
  },
  {
    id: 'A02',
    name: 'Apex Pavilion',
    category: 'Mega brands',
    zone: 'North Pavilion',
    color: '#285C68',
    rating: '4.7',
    hours: '10 AM – 10 PM',
    offer: 'New festive sneaker edit',
  },
  {
    id: 'B11',
    name: 'Sonargaon Pottery',
    category: 'Artisan',
    zone: 'Mela Haat',
    color: '#B7654B',
    rating: '4.9',
    hours: '11 AM – 9 PM',
    offer: 'Live pottery demonstration',
  },
  {
    id: 'B12',
    name: 'Tangail Jamdani',
    category: 'Artisan',
    zone: 'Mela Haat',
    color: '#4C7165',
    rating: '5.0',
    hours: '11 AM – 9 PM',
    offer: 'Handloom sarees & scarves',
  },
  {
    id: 'C07',
    name: 'Dhaka Kacchi House',
    category: 'Food',
    zone: 'Food Court',
    color: '#C58A35',
    rating: '4.6',
    hours: '12 PM – 11 PM',
    offer: 'Kacchi · Borhani · Firni',
  },
  {
    id: 'C08',
    name: 'Pitha Ghor',
    category: 'Food',
    zone: 'Food Court',
    color: '#A85E4B',
    rating: '4.8',
    hours: '12 PM – 11 PM',
    offer: 'Traditional winter pitha',
  },
  {
    id: 'D03',
    name: 'Nagor Dola',
    category: 'Fun zone',
    zone: 'East Field',
    color: '#705570',
    rating: '4.9',
    hours: '3 PM – 11 PM',
    offer: '৳ 120 · All ages',
  },
  {
    id: 'D04',
    name: 'Balloon Shoot',
    category: 'Fun zone',
    zone: 'East Field',
    color: '#526A4E',
    rating: '4.7',
    hours: '3 PM – 11 PM',
    offer: '৳ 80 · Win prizes',
  },
];

const quickZones: { label: string; icon: GlyphName; tone: string }[] = [
  { label: 'Mega brands', icon: 'store', tone: '#E5ECE8' },
  { label: 'Crafts', icon: 'craft', tone: '#F4E3DA' },
  { label: 'Food court', icon: 'food', tone: '#F7E7BC' },
  { label: 'Events', icon: 'event', tone: '#E6E2EF' },
];

function SectionHeader({
  eyebrow,
  title,
  action = 'See all',
}: {
  eyebrow: string;
  title: string;
  action?: string;
}) {
  return (
    <View style={styles.sectionHeader}>
      <View style={{ flex: 1 }}>
        <Text style={styles.eyebrow}>{eyebrow}</Text>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <Pressable
        accessibilityRole="button"
        onPress={() => Alert.alert(title, 'More stalls are coming soon.')}
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

function FestivalMarquee() {
  return (
    <View style={styles.festivalMarquee}>
      <Text style={styles.festivalMarqueeText} numberOfLines={1}>
        ✦ ALPANA & CRAFTS　●　BAUL GAAN　●　PITHA & CHA　●　NAGOR DOLA　●　
        HANDLOOM HERITAGE　✦
      </Text>
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

function PavilionCard({
  item,
  width,
}: {
  item: (typeof pavilions)[number];
  width: number;
}) {
  return (
    <Pressable
      onPress={() => Alert.alert(item.brand, `${item.offer} at ${item.pavilion}`)}
      style={({ pressed }) => [
        styles.pavilionCard,
        { width },
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.pavilionBoothStage}>
        <View style={styles.pavilionGroundShadow} />
        <View style={styles.pavilionStructure}>
          <View style={[styles.pavilionBackWall, { backgroundColor: item.color }]}>
            <View style={styles.pavilionWallGlow} />
            <View style={styles.pavilionDisplayLine} />
            <View style={[styles.pavilionDisplayLine, { top: 74 }]} />
          </View>
          <View style={[styles.pavilionSideWall, { backgroundColor: item.color }]}>
            <Text style={styles.pavilionSideText}>{item.brand}</Text>
          </View>
          <View style={styles.pavilionFloor}>
            <View style={styles.pavilionFloorLine} />
          </View>
          <View style={[styles.pavilionFascia, { backgroundColor: item.color }]}>
            <View style={styles.brandSeal}>
              <Text style={[styles.brandSealText, { color: item.color }]}>
                {item.brand.slice(0, 1)}
              </Text>
            </View>
            <Text style={styles.pavilionBrand}>{item.brand}</Text>
            <Text style={styles.pavilionFasciaLabel}>MEGA PAVILION</Text>
          </View>
          <View style={styles.pavilionRoofUnder}>
            <View style={styles.pavilionSpotlight} />
            <View style={[styles.pavilionSpotlight, { right: '24%', left: undefined }]} />
          </View>
          <View style={styles.pavilionCounter}>
            <View
              style={[styles.pavilionCounterTop, { backgroundColor: item.color }]}
            />
            <Text style={[styles.pavilionCounterBrand, { color: item.color }]}>
              {item.brand}
            </Text>
          </View>
          <View style={styles.pavilionProductOne} />
          <View style={styles.pavilionProductTwo} />
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
        resizeMode="contain"
        imageStyle={styles.stallBoothImage}
        style={styles.stallArt}
      >
        <View style={[styles.stallBoothLabel, { backgroundColor: item.tone }]}>
          <Text style={styles.stallBoothLabelText}>{item.name}</Text>
        </View>
        <Pressable
          accessibilityLabel={saved ? 'Remove from saved' : 'Save stall'}
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
          <Text style={styles.outlineButtonText}>Visit stall</Text>
          <Glyph name="arrow" size={17} color={COLORS.ink} />
        </Pressable>
      </View>
    </View>
  );
}

function DealCard({
  item,
  width,
}: {
  item: (typeof deals)[number];
  width: number;
}) {
  return (
    <Pressable
      onPress={() => Alert.alert(item.name, `Today’s fair price: ${item.price}`)}
      style={({ pressed }) => [
        styles.dealCard,
        { width },
        pressed && styles.cardPressed,
      ]}
    >
      <View style={[styles.dealArt, { backgroundColor: item.color }]}>
        <View style={styles.dealPatternOne} />
        <View style={styles.dealPatternTwo} />
        <Text style={styles.dealSymbol}>{item.symbol}</Text>
        <View style={styles.discountPill}>
          <Text style={styles.discountText}>{item.discount}</Text>
        </View>
      </View>
      <Text style={styles.dealBrand}>{item.brand}</Text>
      <Text style={styles.dealName}>{item.name}</Text>
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
  const inset = width >= 768 ? 28 : 20;
  const base = stalls.find((stall) => stall.slug === slug) ?? stalls[0];
  const detail = stallPageDetails[slug];
  const productWidth = isDesktop
    ? (Math.min(width, 1100) - inset * 2 - 28) / 3
    : Math.min(width * 0.72, 270);

  const action = (title: string, message: string) => Alert.alert(title, message);

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
            imageStyle={{ borderRadius: 28 }}
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

        <View
          style={[
            styles.stallStorySection,
            { paddingHorizontal: inset },
            !isDesktop && styles.stallStorySectionMobile,
          ]}
        >
          <View style={styles.stallStoryHeading}>
            <Text style={styles.eyebrow}>MEET THE MAKERS</Text>
            <Text style={styles.stallSectionTitle}>Made with patience,{'\n'}kept alive by hand.</Text>
          </View>
          <View style={styles.stallStoryCopyWrap}>
            <Text style={styles.stallStoryCopy}>{detail.story}</Text>
            <View style={styles.stallQuote}>
              <View style={[styles.stallQuoteMark, { backgroundColor: base.tone }]}>
                <Text style={styles.stallQuoteMarkText}>{base.initials}</Text>
              </View>
              <Text style={styles.stallQuoteText}>
                Every purchase supports the artisan community behind this craft.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.stallProductsSection}>
          <View style={{ paddingHorizontal: inset }}>
            <SectionHeader
              eyebrow="FAIR EXCLUSIVES"
              title="Featured pieces"
              action="View collection"
            />
          </View>
          <ScrollView
            horizontal
            scrollEnabled={!isDesktop}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              styles.horizontalList,
              isDesktop && styles.horizontalListDesktop,
              { paddingHorizontal: inset },
            ]}
          >
            {detail.products.map((product, index) => (
              <Pressable
                key={product.name}
                onPress={() =>
                  action(product.name, `Fair price: ${product.price}`)
                }
                style={({ pressed }) => [
                  styles.stallProductCard,
                  { width: productWidth },
                  pressed && styles.cardPressed,
                ]}
              >
                <View
                  style={[
                    styles.stallProductArt,
                    { backgroundColor: product.color },
                  ]}
                >
                  <View style={styles.stallProductHalo} />
                  <Text style={styles.stallProductSymbol}>{product.symbol}</Text>
                  <Text style={styles.stallProductIndex}>0{index + 1}</Text>
                </View>
                <View style={styles.stallProductInfo}>
                  <Text style={styles.stallProductName}>{product.name}</Text>
                  <Text style={styles.stallProductPrice}>{product.price}</Text>
                  <View style={styles.stallProductLink}>
                    <Text style={styles.stallProductLinkText}>View piece</Text>
                    <Glyph name="arrow" size={17} color={COLORS.coral} />
                  </View>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={[styles.stallOffer, { marginHorizontal: inset }]}>
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

        <View
          style={[
            styles.stallVisitSection,
            { marginHorizontal: inset },
            !isDesktop && styles.stallVisitSectionMobile,
          ]}
        >
          <View style={styles.stallVisitMap}>
            <View style={styles.stallVisitRoute} />
            <View style={[styles.stallVisitPin, { backgroundColor: base.tone }]}>
              <Glyph name="map" size={25} color="#FFFFFF" />
            </View>
            <View style={styles.stallVisitGate}>
              <Text style={styles.stallVisitGateText}>GATE 1</Text>
            </View>
          </View>
          <View style={styles.stallVisitContent}>
            <Text style={styles.eyebrow}>PLAN YOUR VISIT</Text>
            <Text style={styles.stallSectionTitle}>Meet us at {base.location}</Text>
            <View style={styles.stallVisitFacts}>
              <View style={styles.stallVisitFact}>
                <Glyph name="clock" size={20} color={COLORS.coral} />
                <View>
                  <Text style={styles.stallVisitFactLabel}>OPENING HOURS</Text>
                  <Text style={styles.stallVisitFactValue}>11:00 AM – 9:00 PM</Text>
                </View>
              </View>
              <View style={styles.stallVisitFact}>
                <Glyph name="event" size={20} color={COLORS.coral} />
                <View>
                  <Text style={styles.stallVisitFactLabel}>TODAY’S SESSION</Text>
                  <Text style={styles.stallVisitFactValue}>{detail.demo}</Text>
                </View>
              </View>
            </View>
            <View style={styles.stallVisitActions}>
              <Pressable
                onPress={() =>
                  action('Directions', `Follow the fair map to ${base.location}.`)
                }
                style={styles.directionButtonLight}
              >
                <Glyph name="map" size={18} color="#FFFFFF" />
                <Text style={styles.directionButtonText}>Get directions</Text>
              </Pressable>
              <Pressable
                onPress={() => action('Call stall', detail.phone)}
                style={styles.callButton}
              >
                <Text style={styles.callButtonText}>Call stall</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={[styles.otherStallsSection, { paddingHorizontal: inset }]}>
          <Text style={styles.eyebrow}>KEEP EXPLORING</Text>
          <Text style={styles.sectionTitle}>More from the Mela Haat</Text>
          <View style={styles.otherStallsGrid}>
            {stalls
              .filter((stall) => stall.slug !== slug)
              .map((stall) => (
                <Pressable
                  key={stall.slug}
                  onPress={() => onSwitch(stall.slug)}
                  style={({ pressed }) => [
                    styles.otherStallCard,
                    pressed && styles.cardPressed,
                  ]}
                >
                  <View
                    style={[
                      styles.otherStallInitials,
                      { backgroundColor: stall.tone },
                    ]}
                  >
                    <Text style={styles.otherStallInitialsText}>
                      {stall.initials}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.otherStallLocation}>{stall.location}</Text>
                    <Text style={styles.otherStallName}>{stall.name}</Text>
                  </View>
                  <Glyph name="arrow" size={20} color={COLORS.coral} />
                </Pressable>
              ))}
          </View>
        </View>

        <View style={styles.stallPageFooter}>
          <Pressable onPress={onBack} style={styles.logoLockup}>
            <View style={styles.footerMark}>
              <Text style={styles.footerMarkText}>ম</Text>
            </View>
            <Text style={styles.stallFooterBrand}>Mela Fest Bangladesh</Text>
          </Pressable>
          <Text style={styles.copyright}>
            Authentic makers · Fair prices · Stories worth carrying
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  const isDesktop = width >= 900;
  const horizontalInset = width >= 768 ? 28 : 20;
  const contentWidth = Math.min(width, 1100) - horizontalInset * 2;
  const cardWidth = useMemo(
    () =>
      isDesktop
        ? (contentWidth - 28) / 3
        : Math.min(width * 0.76, width >= 768 ? 300 : 292),
    [contentWidth, isDesktop, width],
  );
  const dealWidth = isDesktop
    ? (contentWidth - 42) / 4
    : Math.min(width * 0.52, 205);

  const notify = (title: string, message: string) => Alert.alert(title, message);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar style="dark" />
      <View style={styles.appShell}>
        <ScrollView
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
                  {['Explore', 'Pavilions', 'Local Haat', 'Events', 'Fair map'].map(
                    (label) => (
                      <Pressable
                        key={label}
                        onPress={() =>
                          notify(label, `${label} section is available below.`)
                        }
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
                  onPress={() => notify('Search', 'Type in the search bar below.')}
                  style={styles.iconButton}
                >
                  <Glyph name="search" size={25} />
                </Pressable>
                <Pressable
                  accessibilityLabel="Open cart"
                  onPress={() => notify('Your cart', 'Your cart has 2 reserved items.')}
                  style={styles.iconButton}
                >
                  <Glyph name="bag" size={25} />
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>2</Text>
                  </View>
                </Pressable>
                {isDesktop && (
                  <Pressable
                    onPress={() =>
                      notify('Vendor portal', 'Vendor sign-in is coming soon.')
                    }
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
              source={require('../../../assets/fair-hero.png')}
              resizeMode="cover"
              imageStyle={{ borderRadius: 28 }}
              style={[styles.hero, isDesktop && styles.heroDesktop]}
            >
              <LinearGradient
                colors={[
                  'rgba(11, 28, 34, 0.82)',
                  'rgba(11, 28, 34, 0.42)',
                  'rgba(11, 28, 34, 0.12)',
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
                    <Text style={styles.heroDatePlace}>DHAKA · 2026</Text>
                  </View>
                )}
                <View style={styles.heroPill}>
                  <View style={styles.liveDot} />
                  <Text style={styles.heroPillText}>NOW OPEN · DHAKA</Text>
                </View>
                <Text
                  style={[styles.heroTitle, isDesktop && styles.heroTitleDesktop]}
                >
                  Where trade{'\n'}meets tradition.
                </Text>
                <Text
                  style={[
                    styles.heroSubtitle,
                    isDesktop && styles.heroSubtitleDesktop,
                  ]}
                >
                  Discover Bangladesh’s finest brands, makers and stories—all in
                  one vibrant fair.
                </Text>
                <View style={styles.heroActions}>
                  <Pressable
                    onPress={() =>
                      notify('Explore stalls', 'Choose a zone to start exploring.')
                    }
                    style={({ pressed }) => [
                      styles.primaryButton,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Text style={styles.primaryButtonText}>Explore stalls</Text>
                    <Glyph name="arrow" size={18} color="#FFFFFF" />
                  </Pressable>
                  <Pressable
                    onPress={() =>
                      notify('Book a stall', 'Vendor applications open this week.')
                    }
                    style={({ pressed }) => [
                      styles.heroSecondaryButton,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Text style={styles.heroSecondaryText}>Book a stall</Text>
                  </Pressable>
                </View>
              </LinearGradient>
            </ImageBackground>

            <View
              style={[styles.searchCard, isDesktop && styles.searchCardDesktop]}
            >
              <Glyph name="search" size={25} color={COLORS.muted} />
              <TextInput
                accessibilityLabel="Search stalls, brands and products"
                placeholder="Search stalls, brands or products"
                placeholderTextColor="#7D898D"
                style={styles.searchInput}
                returnKeyType="search"
                onSubmitEditing={({ nativeEvent }) =>
                  notify(
                    'Search',
                    nativeEvent.text
                      ? `Searching for “${nativeEvent.text}”`
                      : 'Enter a stall or brand name.',
                  )
                }
              />
              <View style={styles.searchFilter}>
                <FilterSliders />
              </View>
            </View>
          </View>

          <View style={[styles.liveTicker, { paddingHorizontal: horizontalInset }]}>
            <View style={styles.tickerIcon}>
              <Glyph name="ticket" size={17} color={COLORS.coral} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.tickerLabel}>LIVE AT THE FAIR</Text>
              <Text style={styles.tickerText} numberOfLines={1}>
                Bata 20% off · Baul show starts at 6:00 PM
              </Text>
            </View>
            <View style={styles.tickerTime}>
              <Glyph name="clock" size={14} color={COLORS.muted} />
              <Text style={styles.tickerTimeText}>Today</Text>
            </View>
          </View>

          <FestivalMarquee />

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
                eyebrow="FEATURED BRAND ZONE"
                title="Mega pavilions"
              />
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
              {pavilions.map((item) => (
                <PavilionCard key={item.id} item={item} width={cardWidth} />
              ))}
            </ScrollView>
          </View>

          <View
            style={[
              styles.section,
              styles.festivalPanel,
              styles.festivalPanelClay,
            ]}
          >
            <BuntingStrip />
            <View style={{ paddingHorizontal: horizontalInset }}>
              <SectionHeader
                eyebrow="LOCAL MELA HAAT"
                title="Made by local hands"
              />
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
              {stalls.map((item) => (
                <StallCard
                  key={item.name}
                  item={item}
                  width={cardWidth}
                  onVisit={onNavigateStall}
                />
              ))}
            </ScrollView>
          </View>

          <FestiveDivider />

          <View style={[styles.dealsSection, { paddingLeft: horizontalInset }]}>
            <View style={{ paddingRight: horizontalInset }}>
              <SectionHeader
                eyebrow="ENDS IN 06 : 42 : 18"
                title="Today’s flash deals"
                action="Shop deals"
              />
            </View>
            <ScrollView
              horizontal
              scrollEnabled={!isDesktop}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[
                styles.horizontalList,
                isDesktop && styles.horizontalListDesktop,
                { paddingRight: horizontalInset },
              ]}
            >
              {deals.map((item) => (
                <DealCard key={item.name} item={item} width={dealWidth} />
              ))}
            </ScrollView>
          </View>

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

          <View
            style={[
              styles.section,
              styles.festivalPanel,
              styles.festivalPanelMap,
              { paddingHorizontal: horizontalInset },
            ]}
          >
            <BuntingStrip />
            <SectionHeader
              eyebrow="INTERACTIVE FAIR DIRECTORY"
              title="Stall map & lineup"
              action="Download map"
            />
            <Text style={styles.mapSectionIntro}>
              Tap a numbered stall to see what’s there, check opening hours and
              get directions from the main gate.
            </Text>
            <InteractiveFairMap isDesktop={isDesktop} />
          </View>

          <FestiveDivider />

          <View style={[styles.mapBanner, { marginHorizontal: horizontalInset }]}>
            <View style={styles.mapPattern}>
              <View style={styles.mapRouteOne} />
              <View style={styles.mapRouteTwo} />
              <View style={styles.mapPin}>
                <Glyph name="map" size={22} color="#FFFFFF" />
              </View>
            </View>
            <View style={styles.mapContent}>
              <Text style={styles.mapEyebrow}>NEVER MISS A STALL</Text>
              <Text style={styles.mapTitle}>Find your way around</Text>
              <Text style={styles.mapText}>
                Open the fair map for pavilions, gates, stages and amenities.
              </Text>
              <Pressable
                onPress={() =>
                  notify('Fair map', 'The interactive map will open here.')
                }
                style={styles.mapButton}
              >
                <Text style={styles.mapButtonText}>Open fair map</Text>
                <Glyph name="arrow" size={17} color="#FFFFFF" />
              </Pressable>
            </View>
          </View>

          <View style={[styles.footer, { paddingHorizontal: horizontalInset }]}>
            <View style={styles.footerMark}>
              <Text style={styles.footerMarkText}>ম</Text>
            </View>
            <Text style={styles.footerTitle}>The heart of Bangladesh,{'\n'}all in one place.</Text>
            <Text style={styles.footerCopy}>
              Mela Fest · Bangladesh Trade & Heritage Fair
            </Text>
            <View style={styles.footerLinks}>
              {['Contact', 'Vendor portal', 'Fair guide'].map((label) => (
                <Pressable key={label} onPress={() => notify(label, 'Coming soon.')}>
                  <Text style={styles.footerLink}>{label}</Text>
                </Pressable>
              ))}
            </View>
            <Text style={styles.copyright}>© 2026 Mela Fest Bangladesh</Text>
          </View>
        </ScrollView>

        {!isDesktop && <View style={styles.bottomNav}>
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
                onPress={() => setActiveTab(tab.label)}
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
        </View>}
      </View>
    </SafeAreaView>
  );
}

export default function FairExperience() {
  const readSlug = (): keyof typeof stallPageDetails | null => {
    if (typeof window === 'undefined') return null;
    const value = window.location.hash.replace(/^#\/?stall\//, '');
    return value in stallPageDetails
      ? (value as keyof typeof stallPageDetails)
      : null;
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
    backgroundColor: COLORS.paper,
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
    maxWidth: 1100,
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
    maxWidth: 1100,
    alignSelf: 'center',
    paddingTop: 14,
  },
  stallPageHero: {
    height: 500,
    overflow: 'hidden',
    borderRadius: 28,
  },
  stallPageHeroDesktop: {
    height: 590,
  },
  stallPageHeroGradient: {
    flex: 1,
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
    maxWidth: 1100,
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
    maxWidth: 1100,
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
    maxWidth: 1100,
    alignSelf: 'center',
    paddingTop: 36,
    paddingBottom: 60,
    backgroundColor: '#F1EBE1',
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
    width: 'auto',
    maxWidth: 1044,
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
    marginTop: 58,
    marginBottom: 65,
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
    width: 'auto',
    maxWidth: 1044,
    alignSelf: 'center',
    minHeight: 410,
    borderRadius: 26,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.line,
    flexDirection: 'row',
    marginBottom: 70,
  },
  stallVisitSectionMobile: {
    flexDirection: 'column',
  },
  stallVisitMap: {
    flex: 1,
    minHeight: 310,
    backgroundColor: '#DDE8DF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  stallVisitRoute: {
    position: 'absolute',
    width: 330,
    height: 170,
    borderRadius: 90,
    borderWidth: 22,
    borderColor: 'rgba(255,255,255,0.58)',
    transform: [{ rotate: '-16deg' }],
  },
  stallVisitPin: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.navy,
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  stallVisitGate: {
    position: 'absolute',
    left: 20,
    bottom: 20,
    borderRadius: 10,
    backgroundColor: COLORS.ink,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  stallVisitGateText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  stallVisitContent: {
    flex: 1,
    padding: 32,
    justifyContent: 'center',
  },
  stallVisitFacts: {
    gap: 16,
    marginTop: 25,
  },
  stallVisitFact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stallVisitFactLabel: {
    color: COLORS.muted,
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1,
  },
  stallVisitFactValue: {
    color: COLORS.ink,
    fontSize: 12,
    fontWeight: '800',
    marginTop: 3,
  },
  stallVisitActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 28,
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
  otherStallsSection: {
    width: '100%',
    maxWidth: 1100,
    alignSelf: 'center',
    paddingBottom: 68,
  },
  otherStallsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 19,
  },
  otherStallCard: {
    flexGrow: 1,
    flexBasis: 310,
    minHeight: 84,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.line,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    padding: 12,
  },
  otherStallInitials: {
    width: 54,
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otherStallInitialsText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  otherStallLocation: {
    color: COLORS.coral,
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.7,
  },
  otherStallName: {
    color: COLORS.ink,
    fontSize: 14,
    fontWeight: '800',
    marginTop: 4,
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
    maxWidth: 1100,
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
    maxWidth: 1100,
    alignSelf: 'center',
    paddingTop: 12,
    marginBottom: 46,
  },
  hero: {
    height: 430,
    overflow: 'hidden',
    borderRadius: 28,
  },
  heroDesktop: {
    height: 530,
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
    maxWidth: 470,
    fontSize: 17,
    lineHeight: 25,
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
    width: 560,
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
    maxWidth: 1100,
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
  festivalMarquee: {
    width: '100%',
    minHeight: 38,
    backgroundColor: COLORS.navy,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    marginBottom: 34,
    overflow: 'hidden',
  },
  festivalMarqueeText: {
    color: '#F6E5B7',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.6,
    textAlign: 'center',
  },
  section: {
    width: '100%',
    maxWidth: 1100,
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
    width: '100%',
    overflow: 'visible',
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
    height: 222,
    backgroundColor: '#EDECE9',
    overflow: 'hidden',
  },
  pavilionGroundShadow: {
    position: 'absolute',
    left: 28,
    right: 18,
    bottom: 9,
    height: 18,
    borderRadius: 999,
    backgroundColor: 'rgba(29,38,41,0.14)',
    transform: [{ skewX: '-12deg' }],
  },
  pavilionStructure: {
    position: 'absolute',
    left: 16,
    right: 16,
    top: 14,
    bottom: 12,
  },
  pavilionBackWall: {
    position: 'absolute',
    left: 2,
    right: '22%',
    top: 43,
    bottom: 27,
    opacity: 0.9,
    overflow: 'hidden',
  },
  pavilionWallGlow: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.14)',
  },
  pavilionDisplayLine: {
    position: 'absolute',
    left: 15,
    right: 17,
    top: 47,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  pavilionSideWall: {
    position: 'absolute',
    right: 0,
    width: '24%',
    top: 43,
    bottom: 24,
    opacity: 0.77,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pavilionSideText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.1,
    transform: [{ rotate: '90deg' }],
  },
  pavilionFloor: {
    position: 'absolute',
    left: -2,
    right: -2,
    bottom: 0,
    height: 34,
    backgroundColor: '#E2CBA8',
    transform: [{ skewX: '-8deg' }],
    borderBottomWidth: 4,
    borderBottomColor: '#BDA27D',
  },
  pavilionFloorLine: {
    position: 'absolute',
    left: 18,
    right: 13,
    top: 8,
    height: 1,
    backgroundColor: 'rgba(120,90,50,0.22)',
  },
  pavilionFascia: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 45,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 11,
    gap: 8,
    zIndex: 4,
  },
  brandSeal: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandSealText: {
    fontSize: 14,
    fontWeight: '900',
  },
  pavilionBrand: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  pavilionFasciaLabel: {
    color: 'rgba(255,255,255,0.68)',
    fontSize: 6,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  pavilionRoofUnder: {
    position: 'absolute',
    left: 4,
    right: 3,
    top: 45,
    height: 12,
    backgroundColor: '#F7F1E8',
    zIndex: 3,
    shadowColor: COLORS.navy,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  pavilionSpotlight: {
    position: 'absolute',
    left: '28%',
    top: 3,
    width: 7,
    height: 4,
    borderRadius: 4,
    backgroundColor: COLORS.gold,
  },
  pavilionCounter: {
    position: 'absolute',
    left: '19%',
    bottom: 20,
    width: '48%',
    height: 57,
    backgroundColor: '#FCFAF5',
    borderWidth: 1,
    borderColor: '#D7C9B6',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
    shadowColor: COLORS.navy,
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.14,
    shadowRadius: 5,
  },
  pavilionCounterTop: {
    position: 'absolute',
    left: -4,
    right: -4,
    top: -4,
    height: 7,
    borderRadius: 3,
  },
  pavilionCounterBrand: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.7,
  },
  pavilionProductOne: {
    position: 'absolute',
    left: 21,
    top: 84,
    width: 30,
    height: 42,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.72)',
  },
  pavilionProductTwo: {
    position: 'absolute',
    left: 58,
    top: 93,
    width: 36,
    height: 33,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.5)',
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
    maxWidth: 1100,
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
  mapBanner: {
    width: 'auto',
    maxWidth: 1060,
    alignSelf: 'center',
    minHeight: 250,
    borderRadius: 26,
    overflow: 'hidden',
    backgroundColor: COLORS.navy,
    marginBottom: 42,
    flexDirection: 'row',
  },
  mapPattern: {
    width: '38%',
    minWidth: 120,
    overflow: 'hidden',
    backgroundColor: '#183A42',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapRouteOne: {
    position: 'absolute',
    width: 190,
    height: 190,
    borderRadius: 90,
    borderWidth: 18,
    borderColor: 'rgba(255,255,255,0.08)',
    left: -75,
    top: -12,
  },
  mapRouteTwo: {
    position: 'absolute',
    width: 150,
    height: 220,
    borderRadius: 80,
    borderWidth: 10,
    borderColor: 'rgba(242,184,75,0.18)',
    right: -80,
    bottom: -115,
    transform: [{ rotate: '24deg' }],
  },
  mapPin: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: COLORS.coral,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  mapContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 25,
    justifyContent: 'center',
  },
  mapEyebrow: {
    color: COLORS.gold,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.4,
  },
  mapTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    lineHeight: 27,
    fontWeight: '800',
    marginTop: 7,
  },
  mapText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 7,
  },
  mapButton: {
    marginTop: 14,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.45)',
  },
  mapButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  footer: {
    width: '100%',
    maxWidth: 1100,
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
});
