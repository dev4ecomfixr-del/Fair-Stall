import React, { useEffect, useState } from 'react';
import {
  Alert,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../../constants/Colors';
import { Glyph } from '../textRN';
import {
  VENDOR_ACCOUNTS,
  vendorAuth,
  VendorUser,
} from '../../../services/vendorAuthService';
import {
  EditableStallConfig,
  LandmarkProjectItem,
  stallStore,
} from '../../../services/stallDataStore';

interface VendorPortalProps {
  visible: boolean;
  onClose: () => void;
  onNavigateStall: (slug: string) => void;
  isDesktop: boolean;
}

export function VendorPortalModal({
  visible,
  onClose,
  onNavigateStall,
  isDesktop,
}: VendorPortalProps) {
  const [currentUser, setCurrentUser] = useState<VendorUser | null>(vendorAuth.getUser());
  const [activeSlug, setActiveSlug] = useState<string>(currentUser?.stallSlug || 'shanta-pinnacle');

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Active dashboard tab
  const [activeTab, setActiveTab] = useState<'branding' | 'projects' | 'privileges' | 'agent' | 'theme3D'>(
    'branding',
  );

  // Stall live editable form data
  const [formData, setFormData] = useState<EditableStallConfig>(stallStore.getStall(activeSlug));

  // Project modal editor
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProjectIndex, setEditingProjectIndex] = useState<number | null>(null);
  const [projectForm, setProjectForm] = useState<LandmarkProjectItem>({
    name: '',
    location: '',
    priceRange: '৳ 2.5 Cr – ৳ 5.0 Cr',
    sizeArea: '2,200 – 3,500 sqft',
    bedBath: '3 Beds · 3 Baths',
    orientation: 'South-East Facing',
    status: 'Under Construction',
    amenities: ['24/7 Security', 'High-Speed Elevators', 'Community Lounge'],
  });
  const [newAmenity, setNewAmenity] = useState('');

  // Sync when activeSlug changes or user changes
  useEffect(() => {
    const user = vendorAuth.getUser();
    setCurrentUser(user);
    const targetSlug = user ? user.stallSlug : 'shanta-pinnacle';
    setActiveSlug(targetSlug);
    setFormData(stallStore.getStall(targetSlug));
  }, [visible]);

  useEffect(() => {
    setFormData(stallStore.getStall(activeSlug));
  }, [activeSlug]);

  // Handle Login
  const handleLogin = async (loginEmail?: string, loginPass?: string) => {
    const targetEmail = loginEmail || email;
    const targetPass = loginPass || password;

    if (!targetEmail || !targetPass) {
      setLoginError('Please enter both your exhibitor email and password.');
      return;
    }

    setIsSubmitting(true);
    setLoginError('');

    const res = await vendorAuth.login(targetEmail, targetPass);
    setIsSubmitting(false);

    if (res.success && res.user) {
      setCurrentUser(res.user);
      setActiveSlug(res.user.stallSlug);
      setFormData(stallStore.getStall(res.user.stallSlug));
    } else {
      setLoginError(res.error || 'Invalid credentials. Please check your email and password.');
    }
  };

  const handleLogout = () => {
    vendorAuth.logout();
    setCurrentUser(null);
    setEmail('');
    setPassword('');
  };

  const handleSaveStallConfig = () => {
    stallStore.updateStall(activeSlug, formData);
    Alert.alert(
      'Changes Published Live',
      `All updates for ${formData.name} have been saved and published to the 3D fairground and stall page!`,
    );
  };

  const handleOpenAddProject = () => {
    setEditingProjectIndex(null);
    setProjectForm({
      name: '',
      location: formData.location || 'Gulshan 2 Avenue',
      priceRange: '৳ 3.5 Cr – ৳ 6.5 Cr',
      sizeArea: '2,400 – 3,800 sqft',
      bedBath: '4 Beds · 4 Baths',
      orientation: 'South-East Lake Facing',
      status: 'Under Construction',
      amenities: ['Imported Italian Marble', 'Private Balcony', 'EV Charger'],
    });
    setProjectModalOpen(true);
  };

  const handleOpenEditProject = (index: number) => {
    setEditingProjectIndex(index);
    setProjectForm({ ...formData.landmarkProjects[index] });
    setProjectModalOpen(true);
  };

  const handleSaveProject = () => {
    if (!projectForm.name.trim()) {
      Alert.alert('Validation Error', 'Project name is required.');
      return;
    }

    let updatedProjects = [...formData.landmarkProjects];
    if (editingProjectIndex !== null) {
      updatedProjects[editingProjectIndex] = projectForm;
    } else {
      updatedProjects = [projectForm, ...updatedProjects];
    }

    const updatedConfig = { ...formData, landmarkProjects: updatedProjects };
    setFormData(updatedConfig);
    stallStore.updateStall(activeSlug, updatedConfig);
    setProjectModalOpen(false);
  };

  const handleDeleteProject = (index: number) => {
    const pName = formData.landmarkProjects[index]?.name || 'this project';
    Alert.alert('Delete Project', `Are you sure you want to remove "${pName}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          const updated = formData.landmarkProjects.filter((_, i) => i !== index);
          const updatedConfig = { ...formData, landmarkProjects: updated };
          setFormData(updatedConfig);
          stallStore.updateStall(activeSlug, updatedConfig);
        },
      },
    ]);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <View style={[styles.dashboardModal, isDesktop && styles.dashboardModalDesktop]}>
          {/* Top Bar */}
          <View style={styles.topBar}>
            <View style={styles.topBarLeft}>
              <View style={styles.liveBadge}>
                <View style={[styles.liveDot, { backgroundColor: currentUser ? '#10B981' : '#F59E0B' }]} />
                <Text style={styles.liveBadgeText}>
                  {currentUser ? 'LIVE PAVILION MANAGER' : 'EXHIBITOR ACCESS PORTAL'}
                </Text>
              </View>
              <Text style={styles.topBarTitle}>
                {currentUser ? currentUser.stallName : 'Pavilion & Stall Console'}
              </Text>
            </View>

            <View style={styles.topBarRight}>
              {currentUser && (
                <>
                  <Pressable
                    onPress={() => {
                      onClose();
                      onNavigateStall(activeSlug);
                    }}
                    style={styles.previewBtn}
                  >
                    <Text style={styles.previewBtnText}>👁️ View 3D Stall</Text>
                  </Pressable>
                  <Pressable onPress={handleLogout} style={styles.logoutBtn}>
                    <Text style={styles.logoutBtnText}>Sign Out</Text>
                  </Pressable>
                </>
              )}
              <Pressable onPress={onClose} style={styles.closeBtn}>
                <Text style={styles.closeBtnText}>✕</Text>
              </Pressable>
            </View>
          </View>

          {/* If NOT logged in: Professional Enterprise Login Screen */}
          {!currentUser ? (
            <ScrollView style={styles.loginContainer} showsVerticalScrollIndicator={false}>
              <View style={styles.loginCard}>
                <View style={styles.loginHeroBadge}>
                  <Text style={styles.loginHeroBadgeText}>DHAKA REAL ESTATE EXPO 2026</Text>
                </View>

                <Text style={styles.loginMainTitle}>Exhibitor Management Portal</Text>
                <Text style={styles.loginSub}>
                  Sign in to manage your 3D fairground pavilion, update landmark project specifications, customize booking privileges, and configure in-booth team details.
                </Text>

                {loginError ? (
                  <View style={styles.errorBox}>
                    <Text style={styles.errorText}>⚠️ {loginError}</Text>
                  </View>
                ) : null}

                <View style={styles.formCard}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>EXHIBITOR WORK EMAIL</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="e.g. shanta@vendor.com"
                      placeholderTextColor="#94A3B8"
                      value={email}
                      onChangeText={setEmail}
                      autoCapitalize="none"
                      keyboardType="email-address"
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <View style={styles.labelRow}>
                      <Text style={styles.inputLabel}>ACCOUNT PASSWORD</Text>
                      <Pressable onPress={() => setShowPassword(!showPassword)}>
                        <Text style={styles.showPassText}>{showPassword ? 'Hide' : 'Show'}</Text>
                      </Pressable>
                    </View>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Enter exhibitor password"
                      placeholderTextColor="#94A3B8"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                    />
                  </View>

                  <Pressable
                    onPress={() => handleLogin()}
                    disabled={isSubmitting}
                    style={({ pressed }) => [
                      styles.primarySubmitBtn,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Text style={styles.primarySubmitBtnText}>
                      {isSubmitting ? 'Verifying Account...' : 'Sign In to Exhibitor Console →'}
                    </Text>
                  </Pressable>
                </View>

                {/* Quick 1-Click Exhibitor Demo Accounts */}
                <View style={styles.quickLoginSection}>
                  <View style={styles.quickLoginHeaderRow}>
                    <View style={styles.quickLoginDivider} />
                    <Text style={styles.quickLoginTitle}>OR SELECT YOUR DEVELOPER PAVILION</Text>
                    <View style={styles.quickLoginDivider} />
                  </View>

                  <View style={styles.quickLoginGrid}>
                    {VENDOR_ACCOUNTS.map((acc) => (
                      <Pressable
                        key={acc.email}
                        onPress={() => handleLogin(acc.email, acc.passwordHash)}
                        style={({ pressed }) => [
                          styles.quickLoginBtn,
                          pressed && styles.pressed,
                        ]}
                      >
                        <View style={[styles.quickLoginBadge, { backgroundColor: acc.user.brandColor }]}>
                          <Text style={styles.quickLoginBadgeText}>{acc.user.avatarInitials}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.quickLoginName}>{acc.user.stallName}</Text>
                          <Text style={styles.quickLoginSlug}>{acc.user.email} · {acc.user.role === 'admin' ? 'Super Admin' : 'Stall Owner'}</Text>
                        </View>
                        <Text style={styles.quickLoginArrow}>→</Text>
                      </Pressable>
                    ))}
                  </View>
                </View>
              </View>
            </ScrollView>
          ) : (
            /* If Logged in: Full Stall Management Dashboard */
            <View style={styles.dashboardBody}>
              {/* Live KPI Performance Cards */}
              <View style={styles.kpiRow}>
                <View style={styles.kpiCard}>
                  <Text style={styles.kpiValue}>4,820</Text>
                  <Text style={styles.kpiLabel}>Pavilion Visitors Today</Text>
                </View>
                <View style={styles.kpiCard}>
                  <Text style={styles.kpiValue}>28</Text>
                  <Text style={styles.kpiLabel}>VIP Consultations Booked</Text>
                </View>
                <View style={styles.kpiCard}>
                  <Text style={styles.kpiValue}>142</Text>
                  <Text style={styles.kpiLabel}>Digital Brochures Downloaded</Text>
                </View>
                <View style={styles.kpiCard}>
                  <Text style={styles.kpiValue}>৳36.5 Cr</Text>
                  <Text style={styles.kpiLabel}>Spot Booking Inquiries</Text>
                </View>
              </View>

              {/* Admin Stall Switcher if super admin */}
              {currentUser.role === 'admin' && (
                <View style={styles.adminBar}>
                  <Text style={styles.adminBarLabel}>👑 ADMIN SWITCH PAVILION:</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
                    {Object.keys(stallStore.getAllStalls()).map((slug) => (
                      <Pressable
                        key={slug}
                        onPress={() => setActiveSlug(slug)}
                        style={[
                          styles.adminStallPill,
                          activeSlug === slug && styles.adminStallPillActive,
                        ]}
                      >
                        <Text
                          style={[
                            styles.adminStallPillText,
                            activeSlug === slug && styles.adminStallPillTextActive,
                          ]}
                        >
                          {slug}
                        </Text>
                      </Pressable>
                    ))}
                  </ScrollView>
                </View>
              )}

              {/* Navigation Tabs */}
              <View style={styles.dashboardTabs}>
                {[
                  { id: 'branding', label: '🏛️ Pavilion Identity', badge: '' },
                  { id: 'projects', label: '🏢 Landmark Projects', badge: `${formData.landmarkProjects?.length || 0}` },
                  { id: 'privileges', label: '🎁 Spot Privileges', badge: 'Active' },
                  { id: 'agent', label: '👤 In-Booth Team', badge: '' },
                  { id: 'theme3D', label: '🎨 3D Stall Theme', badge: '' },
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <Pressable
                      key={tab.id}
                      onPress={() => setActiveTab(tab.id as any)}
                      style={[styles.dashTabBtn, isActive && styles.dashTabBtnActive]}
                    >
                      <Text style={[styles.dashTabBtnText, isActive && styles.dashTabBtnTextActive]}>
                        {tab.label}
                      </Text>
                      {tab.badge ? (
                        <View style={[styles.tabCountBadge, isActive && styles.tabCountBadgeActive]}>
                          <Text style={[styles.tabCountText, isActive && styles.tabCountTextActive]}>
                            {tab.badge}
                          </Text>
                        </View>
                      ) : null}
                    </Pressable>
                  );
                })}
              </View>

              {/* Tab Contents */}
              <ScrollView style={styles.tabContentScroll} showsVerticalScrollIndicator={false}>
                {/* 1. STALL BRANDING & IDENTITY */}
                {activeTab === 'branding' && (
                  <View style={styles.formSection}>
                    <Text style={styles.sectionHeader}>Pavilion Identity &amp; Branding</Text>
                    <Text style={styles.sectionSub}>Configure the core brand name, location plot, and artisan story displayed on your 3D stall page.</Text>

                    <View style={styles.inputRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.inputLabel}>PAVILION NAME (ENGLISH)</Text>
                        <TextInput
                          style={styles.textInput}
                          value={formData.name}
                          onChangeText={(t) => setFormData({ ...formData, name: t })}
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.inputLabel}>PAVILION NAME (BANGLA)</Text>
                        <TextInput
                          style={styles.textInput}
                          value={formData.bangla}
                          onChangeText={(t) => setFormData({ ...formData, bangla: t })}
                        />
                      </View>
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>TAGLINE / SLOGAN</Text>
                      <TextInput
                        style={styles.textInput}
                        value={formData.tagline}
                        onChangeText={(t) => setFormData({ ...formData, tagline: t })}
                      />
                    </View>

                    <View style={styles.inputRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.inputLabel}>FAIRGROUND PLOT LOCATION</Text>
                        <TextInput
                          style={styles.textInput}
                          value={formData.location}
                          onChangeText={(t) => setFormData({ ...formData, location: t })}
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.inputLabel}>CATEGORY</Text>
                        <TextInput
                          style={styles.textInput}
                          value={formData.category}
                          onChangeText={(t) => setFormData({ ...formData, category: t })}
                        />
                      </View>
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>EXPO SHOWCASE OVERVIEW</Text>
                      <TextInput
                        style={[styles.textInput, { height: 75 }]}
                        multiline
                        value={formData.description}
                        onChangeText={(t) => setFormData({ ...formData, description: t })}
                      />
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>ARTISAN &amp; ARCHITECTURAL STORY</Text>
                      <TextInput
                        style={[styles.textInput, { height: 75 }]}
                        multiline
                        value={formData.story}
                        onChangeText={(t) => setFormData({ ...formData, story: t })}
                      />
                    </View>

                    <View style={styles.inputRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.inputLabel}>BRAND ACCENT HEX COLOR</Text>
                        <TextInput
                          style={styles.textInput}
                          value={formData.accentColor}
                          onChangeText={(t) => setFormData({ ...formData, accentColor: t })}
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.inputLabel}>HERITAGE / FOUNDED</Text>
                        <TextInput
                          style={styles.textInput}
                          value={formData.founded}
                          onChangeText={(t) => setFormData({ ...formData, founded: t })}
                        />
                      </View>
                    </View>
                  </View>
                )}

                {/* 2. LANDMARK PROJECTS CMS */}
                {activeTab === 'projects' && (
                  <View style={styles.formSection}>
                    <View style={styles.sectionHeaderRow}>
                      <View>
                        <Text style={styles.sectionHeader}>Landmark Projects Portfolio</Text>
                        <Text style={styles.sectionSub}>Add and manage high-rise properties displayed on your interactive stall showcase.</Text>
                      </View>
                      <Pressable onPress={handleOpenAddProject} style={styles.addProjectBtn}>
                        <Text style={styles.addProjectBtnText}>+ Add New Project</Text>
                      </Pressable>
                    </View>

                    <View style={styles.projectList}>
                      {formData.landmarkProjects?.map((proj, idx) => (
                        <View key={idx} style={styles.projectCard}>
                          <View style={styles.projectCardTop}>
                            <View style={{ flex: 1 }}>
                              <Text style={styles.projectCardTitle}>{proj.name}</Text>
                              <Text style={styles.projectCardLoc}>📍 {proj.location}</Text>
                            </View>
                            <View style={styles.statusBadge}>
                              <Text style={styles.statusBadgeText}>{proj.status.toUpperCase()}</Text>
                            </View>
                          </View>

                          <View style={styles.projectSpecsGrid}>
                            <View style={styles.specBox}>
                              <Text style={styles.specBoxLabel}>PRICE RANGE</Text>
                              <Text style={styles.specBoxVal}>{proj.priceRange}</Text>
                            </View>
                            <View style={styles.specBox}>
                              <Text style={styles.specBoxLabel}>SIZE / AREA</Text>
                              <Text style={styles.specBoxVal}>{proj.sizeArea}</Text>
                            </View>
                            <View style={styles.specBox}>
                              <Text style={styles.specBoxLabel}>BED / BATH</Text>
                              <Text style={styles.specBoxVal}>{proj.bedBath}</Text>
                            </View>
                            <View style={styles.specBox}>
                              <Text style={styles.specBoxLabel}>ORIENTATION</Text>
                              <Text style={styles.specBoxVal}>{proj.orientation}</Text>
                            </View>
                          </View>

                          <View style={styles.amenitiesWrap}>
                            {proj.amenities?.map((amen, aIdx) => (
                              <View key={aIdx} style={styles.amenityTag}>
                                <Text style={styles.amenityTagText}>✦ {amen}</Text>
                              </View>
                            ))}
                          </View>

                          <View style={styles.projectCardActions}>
                            <Pressable
                              onPress={() => handleOpenEditProject(idx)}
                              style={styles.projActionEditBtn}
                            >
                              <Text style={styles.projActionEditBtnText}>✏️ Edit Project</Text>
                            </Pressable>
                            <Pressable
                              onPress={() => handleDeleteProject(idx)}
                              style={styles.projActionDeleteBtn}
                            >
                              <Text style={styles.projActionDeleteBtnText}>🗑️ Delete</Text>
                            </Pressable>
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                )}

                {/* 3. EXPO SPOT PRIVILEGES */}
                {activeTab === 'privileges' && (
                  <View style={styles.formSection}>
                    <Text style={styles.sectionHeader}>Expo Spot Booking Incentives</Text>
                    <Text style={styles.sectionSub}>Configure exclusive fairground privileges and instant cashback tokens claimed by visitors.</Text>

                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>OFFER BANNER HEADLINE</Text>
                      <TextInput
                        style={styles.textInput}
                        value={formData.offer}
                        onChangeText={(t) => setFormData({ ...formData, offer: t })}
                      />
                    </View>

                    <View style={styles.inputRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.inputLabel}>CASHBACK / VALUE AMOUNT</Text>
                        <TextInput
                          style={styles.textInput}
                          value={formData.offerCashback}
                          onChangeText={(t) => setFormData({ ...formData, offerCashback: t })}
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.inputLabel}>PROMO CODE TOKEN PREFIX</Text>
                        <TextInput
                          style={styles.textInput}
                          value={formData.offerPromoCode}
                          onChangeText={(t) => setFormData({ ...formData, offerPromoCode: t })}
                        />
                      </View>
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>VALIDITY PERIOD / RULES</Text>
                      <TextInput
                        style={styles.textInput}
                        value={formData.offerValidity}
                        onChangeText={(t) => setFormData({ ...formData, offerValidity: t })}
                      />
                    </View>
                  </View>
                )}

                {/* 4. IN-BOOTH SALES TEAM */}
                {activeTab === 'agent' && (
                  <View style={styles.formSection}>
                    <Text style={styles.sectionHeader}>In-Booth Sales Team &amp; Contacts</Text>
                    <Text style={styles.sectionSub}>Configure the primary representative contact displayed for VIP booking meetings.</Text>

                    <View style={styles.inputRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.inputLabel}>REPRESENTATIVE NAME</Text>
                        <TextInput
                          style={styles.textInput}
                          value={formData.agent?.name}
                          onChangeText={(t) =>
                            setFormData({
                              ...formData,
                              agent: { ...formData.agent, name: t },
                            })
                          }
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.inputLabel}>CORPORATE TITLE</Text>
                        <TextInput
                          style={styles.textInput}
                          value={formData.agent?.title}
                          onChangeText={(t) =>
                            setFormData({
                              ...formData,
                              agent: { ...formData.agent, title: t },
                            })
                          }
                        />
                      </View>
                    </View>

                    <View style={styles.inputRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.inputLabel}>DIRECT PHONE / WHATSAPP</Text>
                        <TextInput
                          style={styles.textInput}
                          value={formData.agent?.phone}
                          onChangeText={(t) =>
                            setFormData({
                              ...formData,
                              agent: { ...formData.agent, phone: t },
                            })
                          }
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.inputLabel}>PAVILION DESK HOTLINE</Text>
                        <TextInput
                          style={styles.textInput}
                          value={formData.phone}
                          onChangeText={(t) => setFormData({ ...formData, phone: t })}
                        />
                      </View>
                    </View>
                  </View>
                )}

                {/* 5. 3D ARCHITECTURAL THEME */}
                {activeTab === 'theme3D' && (
                  <View style={styles.formSection}>
                    <Text style={styles.sectionHeader}>3D Pavilion Architectural Theme</Text>
                    <Text style={styles.sectionSub}>Customize 3D ambient lighting and pavilion archetype in the 3D playground field.</Text>

                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>3D PAVILION MODEL ARCHETYPE</Text>
                      <View style={styles.archetypeGrid}>
                        {['SkyVilla', 'EcoTower', 'Penthouse', 'Commercial'].map((arch) => {
                          const isSel = formData.theme3D?.modelType === arch;
                          return (
                            <Pressable
                              key={arch}
                              onPress={() =>
                                setFormData({
                                  ...formData,
                                  theme3D: { ...formData.theme3D, modelType: arch as any },
                                })
                              }
                              style={[
                                styles.archetypeBtn,
                                isSel && styles.archetypeBtnActive,
                              ]}
                            >
                              <Text
                                style={[
                                  styles.archetypeBtnText,
                                  isSel && styles.archetypeBtnTextActive,
                                ]}
                              >
                                {arch}
                              </Text>
                            </Pressable>
                          );
                        })}
                      </View>
                    </View>

                    <View style={styles.inputRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.inputLabel}>3D AMBIENT AURA COLOR (HEX)</Text>
                        <TextInput
                          style={styles.textInput}
                          value={formData.theme3D?.ambientColor}
                          onChangeText={(t) =>
                            setFormData({
                              ...formData,
                              theme3D: { ...formData.theme3D, ambientColor: t },
                            })
                          }
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.inputLabel}>3D LIGHTING WARMTH MULTIPLIER</Text>
                        <TextInput
                          style={styles.textInput}
                          value={String(formData.theme3D?.lightingWarmth || 1.2)}
                          onChangeText={(t) =>
                            setFormData({
                              ...formData,
                              theme3D: {
                                ...formData.theme3D,
                                lightingWarmth: parseFloat(t) || 1.2,
                              },
                            })
                          }
                        />
                      </View>
                    </View>
                  </View>
                )}
              </ScrollView>

              {/* Save & Publish Bottom Bar */}
              <View style={styles.saveBottomBar}>
                <View>
                  <Text style={styles.saveBottomText}>{formData.name}</Text>
                  <Text style={styles.saveBottomSub}>Changes sync in real-time to the 3D fairground arena</Text>
                </View>
                <Pressable onPress={handleSaveStallConfig} style={styles.savePublishBtn}>
                  <Text style={styles.savePublishBtnText}>💾 Save &amp; Publish Live Changes</Text>
                </Pressable>
              </View>
            </View>
          )}

          {/* ADD / EDIT LANDMARK PROJECT MODAL */}
          <Modal
            visible={projectModalOpen}
            animationType="fade"
            transparent
            onRequestClose={() => setProjectModalOpen(false)}
          >
            <View style={styles.modalSubBackdrop}>
              <View style={styles.projectEditorCard}>
                <View style={styles.editorTopRow}>
                  <Text style={styles.editorTitle}>
                    {editingProjectIndex !== null ? 'Edit Landmark Project' : 'Add New Landmark Project'}
                  </Text>
                  <Pressable onPress={() => setProjectModalOpen(false)} style={styles.closeSubBtn}>
                    <Text style={styles.closeBtnText}>✕</Text>
                  </Pressable>
                </View>

                <ScrollView style={{ maxHeight: 420 }} showsVerticalScrollIndicator={false}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>PROJECT NAME</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="e.g. Shanta Utopia Sky Duplexes"
                      placeholderTextColor="#94A3B8"
                      value={projectForm.name}
                      onChangeText={(t) => setProjectForm({ ...projectForm, name: t })}
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>LOCATION / AREA</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="e.g. Plot A1 · Gulshan 2 Avenue"
                      placeholderTextColor="#94A3B8"
                      value={projectForm.location}
                      onChangeText={(t) => setProjectForm({ ...projectForm, location: t })}
                    />
                  </View>

                  <View style={styles.inputRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.inputLabel}>PRICE RANGE</Text>
                      <TextInput
                        style={styles.textInput}
                        value={projectForm.priceRange}
                        onChangeText={(t) => setProjectForm({ ...projectForm, priceRange: t })}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.inputLabel}>SIZE / AREA</Text>
                      <TextInput
                        style={styles.textInput}
                        value={projectForm.sizeArea}
                        onChangeText={(t) => setProjectForm({ ...projectForm, sizeArea: t })}
                      />
                    </View>
                  </View>

                  <View style={styles.inputRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.inputLabel}>BED / BATH</Text>
                      <TextInput
                        style={styles.textInput}
                        value={projectForm.bedBath}
                        onChangeText={(t) => setProjectForm({ ...projectForm, bedBath: t })}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.inputLabel}>ORIENTATION</Text>
                      <TextInput
                        style={styles.textInput}
                        value={projectForm.orientation}
                        onChangeText={(t) => setProjectForm({ ...projectForm, orientation: t })}
                      />
                    </View>
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>CONSTRUCTION STATUS</Text>
                    <View style={{ flexDirection: 'row', gap: 8, marginTop: 4 }}>
                      {['Ready', 'Under Construction', 'Upcoming'].map((st) => {
                        const isSel = projectForm.status === st;
                        return (
                          <Pressable
                            key={st}
                            onPress={() => setProjectForm({ ...projectForm, status: st as any })}
                            style={[
                              styles.statusSelectBtn,
                              isSel && styles.statusSelectBtnActive,
                            ]}
                          >
                            <Text
                              style={[
                                styles.statusSelectBtnText,
                                isSel && styles.statusSelectBtnTextActive,
                              ]}
                            >
                              {st}
                            </Text>
                          </Pressable>
                        );
                      })}
                    </View>
                  </View>

                  {/* Amenities List */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>KEY AMENITIES</Text>
                    <View style={styles.amenityChipRow}>
                      {projectForm.amenities.map((am, idx) => (
                        <View key={idx} style={styles.amenityEditChip}>
                          <Text style={styles.amenityEditChipText}>{am}</Text>
                          <Pressable
                            onPress={() =>
                              setProjectForm({
                                ...projectForm,
                                amenities: projectForm.amenities.filter((_, i) => i !== idx),
                              })
                            }
                          >
                            <Text style={styles.amenityRemoveText}>✕</Text>
                          </Pressable>
                        </View>
                      ))}
                    </View>
                    <View style={styles.addAmenityRow}>
                      <TextInput
                        style={[styles.textInput, { flex: 1 }]}
                        placeholder="Add amenity (e.g. Private Pool)"
                        placeholderTextColor="#94A3B8"
                        value={newAmenity}
                        onChangeText={setNewAmenity}
                      />
                      <Pressable
                        onPress={() => {
                          if (newAmenity.trim()) {
                            setProjectForm({
                              ...projectForm,
                              amenities: [...projectForm.amenities, newAmenity.trim()],
                            });
                            setNewAmenity('');
                          }
                        }}
                        style={styles.addAmenityBtn}
                      >
                        <Text style={styles.addAmenityBtnText}>+ Add</Text>
                      </Pressable>
                    </View>
                  </View>
                </ScrollView>

                <View style={styles.editorActionRow}>
                  <Pressable
                    onPress={() => setProjectModalOpen(false)}
                    style={styles.editorCancelBtn}
                  >
                    <Text style={styles.editorCancelBtnText}>Cancel</Text>
                  </Pressable>
                  <Pressable onPress={handleSaveProject} style={styles.editorSaveBtn}>
                    <Text style={styles.editorSaveBtnText}>Save Project</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(5, 12, 16, 0.82)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  dashboardModal: {
    width: '100%',
    maxHeight: '92%',
    backgroundColor: '#0F172A',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.5,
    shadowRadius: 28,
    elevation: 20,
  },
  dashboardModalDesktop: {
    maxWidth: 1060,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingVertical: 16,
    backgroundColor: '#1E293B',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  topBarLeft: {
    flex: 1,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  liveBadgeText: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  topBarTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '800',
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  previewBtn: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  previewBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  logoutBtn: {
    backgroundColor: '#334155',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutBtnText: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '600',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '700',
  },

  // KPI STATS ROW
  kpiRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    padding: 16,
    backgroundColor: '#141E33',
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  kpiCard: {
    flex: 1,
    minWidth: 130,
    backgroundColor: '#1E293B',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  kpiValue: {
    color: '#38BDF8',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 2,
  },
  kpiLabel: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
  },

  // LOGIN SCREEN
  loginContainer: {
    padding: 24,
  },
  loginCard: {
    alignItems: 'center',
  },
  loginHeroBadge: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#38BDF8',
    marginBottom: 12,
  },
  loginHeroBadgeText: {
    color: '#38BDF8',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  loginMainTitle: {
    color: '#F8FAFC',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },
  loginSub: {
    color: '#94A3B8',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    maxWidth: 620,
    marginBottom: 20,
  },
  errorBox: {
    backgroundColor: '#7F1D1D',
    borderWidth: 1,
    borderColor: '#EF4444',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    maxWidth: 520,
    marginBottom: 16,
  },
  errorText: {
    color: '#FEE2E2',
    fontSize: 13,
    fontWeight: '600',
  },
  formCard: {
    width: '100%',
    maxWidth: 520,
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 14,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  inputLabel: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 6,
  },
  showPassText: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '600',
  },
  textInput: {
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#F8FAFC',
    fontSize: 13,
  },
  primarySubmitBtn: {
    backgroundColor: '#10B981',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 6,
  },
  primarySubmitBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  // QUICK LOGIN SECTION
  quickLoginSection: {
    width: '100%',
    maxWidth: 820,
    marginTop: 8,
  },
  quickLoginHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  quickLoginDivider: {
    flex: 1,
    height: 1,
    backgroundColor: '#334155',
  },
  quickLoginTitle: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  quickLoginGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  quickLoginBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
    padding: 12,
    borderRadius: 10,
    width: '48%',
    minWidth: 240,
  },
  quickLoginBadge: {
    width: 38,
    height: 38,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickLoginBadgeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  quickLoginName: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '700',
  },
  quickLoginSlug: {
    color: '#94A3B8',
    fontSize: 11,
  },
  quickLoginArrow: {
    color: '#64748B',
    fontSize: 16,
    fontWeight: '700',
  },

  // DASHBOARD BODY
  dashboardBody: {
    flex: 1,
  },
  adminBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#1E293B',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  adminBarLabel: {
    color: '#F59E0B',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  adminStallPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#334155',
  },
  adminStallPillActive: {
    backgroundColor: '#F59E0B',
    borderColor: '#F59E0B',
  },
  adminStallPillText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '700',
  },
  adminStallPillTextActive: {
    color: '#000000',
  },

  // DASHBOARD TABS
  dashboardTabs: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    paddingHorizontal: 14,
  },
  dashTabBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  dashTabBtnActive: {
    borderBottomColor: '#38BDF8',
  },
  dashTabBtnText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700',
  },
  dashTabBtnTextActive: {
    color: '#F8FAFC',
  },
  tabCountBadge: {
    backgroundColor: '#334155',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  tabCountBadgeActive: {
    backgroundColor: '#38BDF8',
  },
  tabCountText: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '800',
  },
  tabCountTextActive: {
    color: '#0F172A',
  },

  // TAB CONTENTS
  tabContentScroll: {
    flex: 1,
    padding: 20,
  },
  formSection: {
    marginBottom: 40,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionHeader: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 4,
  },
  sectionSub: {
    color: '#94A3B8',
    fontSize: 12,
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },

  // PROJECTS LIST
  addProjectBtn: {
    backgroundColor: '#10B981',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addProjectBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  projectList: {
    gap: 12,
  },
  projectCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 16,
  },
  projectCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  projectCardTitle: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 2,
  },
  projectCardLoc: {
    color: '#94A3B8',
    fontSize: 12,
  },
  statusBadge: {
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#F59E0B',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusBadgeText: {
    color: '#F59E0B',
    fontSize: 10,
    fontWeight: '800',
  },
  projectSpecsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
    backgroundColor: '#0F172A',
    padding: 10,
    borderRadius: 8,
  },
  specBox: {
    flex: 1,
    minWidth: 100,
  },
  specBoxLabel: {
    color: '#64748B',
    fontSize: 9,
    fontWeight: '800',
    marginBottom: 2,
  },
  specBoxVal: {
    color: '#F8FAFC',
    fontSize: 12,
    fontWeight: '700',
  },
  amenitiesWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 14,
  },
  amenityTag: {
    backgroundColor: '#334155',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  amenityTagText: {
    color: '#CBD5E1',
    fontSize: 10,
    fontWeight: '600',
  },
  projectCardActions: {
    flexDirection: 'row',
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: '#334155',
    paddingTop: 12,
  },
  projActionEditBtn: {
    flex: 1,
    backgroundColor: '#334155',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  projActionEditBtnText: {
    color: '#F8FAFC',
    fontSize: 11,
    fontWeight: '700',
  },
  projActionDeleteBtn: {
    backgroundColor: '#7F1D1D',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  projActionDeleteBtnText: {
    color: '#FCA5A5',
    fontSize: 11,
    fontWeight: '700',
  },

  // 3D ARCHETYPE
  archetypeGrid: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  archetypeBtn: {
    flex: 1,
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#334155',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  archetypeBtnActive: {
    borderColor: '#38BDF8',
    backgroundColor: '#1E293B',
  },
  archetypeBtnText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700',
  },
  archetypeBtnTextActive: {
    color: '#38BDF8',
  },

  // SAVE BOTTOM BAR
  saveBottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  saveBottomText: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '800',
  },
  saveBottomSub: {
    color: '#94A3B8',
    fontSize: 10,
  },
  savePublishBtn: {
    backgroundColor: '#10B981',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },
  savePublishBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },

  // SUB MODAL
  modalSubBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(5, 12, 16, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  projectEditorCard: {
    width: '100%',
    maxWidth: 580,
    backgroundColor: '#1E293B',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 20,
  },
  editorTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  editorTitle: {
    color: '#F8FAFC',
    fontSize: 17,
    fontWeight: '800',
  },
  closeSubBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusSelectBtn: {
    flex: 1,
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#334155',
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  statusSelectBtnActive: {
    borderColor: '#38BDF8',
    backgroundColor: '#1E293B',
  },
  statusSelectBtnText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '700',
  },
  statusSelectBtnTextActive: {
    color: '#38BDF8',
  },
  amenityChipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
  },
  amenityEditChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  amenityEditChipText: {
    color: '#F8FAFC',
    fontSize: 11,
  },
  amenityRemoveText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '800',
  },
  addAmenityRow: {
    flexDirection: 'row',
    gap: 8,
  },
  addAmenityBtn: {
    backgroundColor: '#334155',
    paddingHorizontal: 14,
    justifyContent: 'center',
    borderRadius: 8,
  },
  addAmenityBtnText: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '800',
  },
  editorActionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#334155',
    paddingTop: 14,
  },
  editorCancelBtn: {
    flex: 1,
    backgroundColor: '#334155',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  editorCancelBtnText: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '700',
  },
  editorSaveBtn: {
    flex: 1,
    backgroundColor: '#10B981',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  editorSaveBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.8,
  },
});
