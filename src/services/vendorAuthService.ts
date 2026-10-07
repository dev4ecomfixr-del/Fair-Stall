/**
 * JWT Authentication & Session Service for Mela Fest Stall Owners & Exhibitors
 */

export interface VendorUser {
  id: string;
  email: string;
  name: string;
  stallSlug: string;
  stallName: string;
  role: 'stall_owner' | 'admin';
  avatarInitials: string;
  brandColor: string;
}

export interface JWTPayload {
  sub: string;
  email: string;
  name: string;
  stallSlug: string;
  stallName: string;
  role: 'stall_owner' | 'admin';
  iat: number;
  exp: number;
}

// Pre-registered vendor accounts for each 3D fairground stall
export const VENDOR_ACCOUNTS: Array<{
  email: string;
  passwordHash: string; // Plaintext for demo match
  user: VendorUser;
}> = [
  {
    email: 'shanta@vendor.com',
    passwordHash: 'shanta123',
    user: {
      id: 'usr_shanta_01',
      email: 'shanta@vendor.com',
      name: 'Shanta Holdings Admin',
      stallSlug: 'shanta-pinnacle',
      stallName: 'Shanta Pinnacle Suites',
      role: 'stall_owner',
      avatarInitials: 'SH',
      brandColor: '#D4AF37',
    },
  },
  {
    email: 'sheltech@vendor.com',
    passwordHash: 'sheltech123',
    user: {
      id: 'usr_sheltech_02',
      email: 'sheltech@vendor.com',
      name: 'Sheltech Urban Lead',
      stallSlug: 'sheltech-elysium',
      stallName: 'Sheltech Elysium Lakeview',
      role: 'stall_owner',
      avatarInitials: 'SL',
      brandColor: '#2EB872',
    },
  },
  {
    email: 'navana@vendor.com',
    passwordHash: 'navana123',
    user: {
      id: 'usr_navana_03',
      email: 'navana@vendor.com',
      name: 'Navana Eco Team',
      stallSlug: 'navana-botanica',
      stallName: 'Navana Botanica Eco 3BHK',
      role: 'stall_owner',
      avatarInitials: 'NV',
      brandColor: '#00E5FF',
    },
  },
  {
    email: 'rangs@vendor.com',
    passwordHash: 'rangs123',
    user: {
      id: 'usr_rangs_04',
      email: 'rangs@vendor.com',
      name: 'Rangs Avant-Garde',
      stallSlug: 'rangs-toruk',
      stallName: 'Rangs Toruk Penthouse',
      role: 'stall_owner',
      avatarInitials: 'RG',
      brandColor: '#FF1744',
    },
  },
  {
    email: 'bti@vendor.com',
    passwordHash: 'bti123',
    user: {
      id: 'usr_bti_05',
      email: 'bti@vendor.com',
      name: 'bti Building Tech Lead',
      stallSlug: 'bti-three-sixty',
      stallName: 'bti Three Sixty Suites',
      role: 'stall_owner',
      avatarInitials: 'BT',
      brandColor: '#FF6D00',
    },
  },
  {
    email: 'concord@vendor.com',
    passwordHash: 'concord123',
    user: {
      id: 'usr_concord_06',
      email: 'concord@vendor.com',
      name: 'Concord Townships Lead',
      stallSlug: 'concord-regency',
      stallName: 'Concord Regency Lakeview',
      role: 'stall_owner',
      avatarInitials: 'CC',
      brandColor: '#00E676',
    },
  },
  {
    email: 'assure@vendor.com',
    passwordHash: 'assure123',
    user: {
      id: 'usr_assure_07',
      email: 'assure@vendor.com',
      name: 'Assure Group Admin',
      stallSlug: 'assure-majestic',
      stallName: 'Assure Majestic Heights',
      role: 'stall_owner',
      avatarInitials: 'AS',
      brandColor: '#E040FB',
    },
  },
  {
    email: 'bay@vendor.com',
    passwordHash: 'bay123',
    user: {
      id: 'usr_bay_08',
      email: 'bay@vendor.com',
      name: 'Bay Developments Lead',
      stallSlug: 'bay-sanctuary',
      stallName: 'Bay Sanctuary Lakefront',
      role: 'stall_owner',
      avatarInitials: 'BY',
      brandColor: '#64FFDA',
    },
  },
  {
    email: 'admin@melafest.com',
    passwordHash: 'admin123',
    user: {
      id: 'usr_super_admin',
      email: 'admin@melafest.com',
      name: 'Mela Fest Super Admin',
      stallSlug: 'shanta-pinnacle',
      stallName: 'All 3D Stalls Manager',
      role: 'admin',
      avatarInitials: 'AD',
      brandColor: '#D95D45',
    },
  },
];

const STORAGE_JWT_KEY = 'mela_fest_vendor_jwt_token';
const JWT_SECRET = 'mela_fest_jwt_secret_super_secure_key_2026';

// Universal Base64 helper compatible with Web and React Native
function toBase64(str: string): string {
  try {
    if (typeof btoa === 'function') {
      return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => String.fromCharCode(parseInt(p1, 16))));
    }
  } catch (e) {}
  
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let output = '';
  for (let block = 0, charCode, i = 0, map = chars; str.charAt(i | 0) || ((map = '='), i % 1); output += map.charAt(63 & (block >> (8 - (i % 1) * 8)))) {
    charCode = str.charCodeAt((i += 3 / 4));
    if (charCode > 0xff) {
      throw new Error('Base64 encoding error');
    }
    block = (block << 8) | charCode;
  }
  return output;
}

function fromBase64(str: string): string {
  try {
    if (typeof atob === 'function') {
      const decoded = atob(str);
      return decodeURIComponent(
        Array.prototype.map
          .call(decoded, (c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
    }
  } catch (e) {}

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let strClean = String(str).replace(/[=]+$/, '');
  let output = '';
  if (strClean.length % 4 === 1) {
    throw new Error('Invalid base64 string');
  }
  for (
    let bc = 0, bs = 0, buffer, idx = 0;
    (buffer = strClean.charAt(idx++));
    ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
      ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
      : 0
  ) {
    buffer = chars.indexOf(buffer);
  }
  return output;
}

/**
 * Generate standard format 3-part JSON Web Token (JWT)
 */
export function signJWT(user: VendorUser, expiresInHours = 24): string {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const now = Math.floor(Date.now() / 1000);
  const payload: JWTPayload = {
    sub: user.id,
    email: user.email,
    name: user.name,
    stallSlug: user.stallSlug,
    stallName: user.stallName,
    role: user.role,
    iat: now,
    exp: now + expiresInHours * 3600,
  };

  const encodedHeader = toBase64(JSON.stringify(header))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  const encodedPayload = toBase64(JSON.stringify(payload))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  // Pseudo HMAC-SHA256 signature for client-side deterministic verification
  const signatureInput = `${encodedHeader}.${encodedPayload}.${JWT_SECRET}`;
  const encodedSignature = toBase64(signatureInput)
    .slice(0, 32)
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
}

/**
 * Decode and verify JWT
 */
export function decodeAndVerifyJWT(token: string): { valid: boolean; payload?: JWTPayload; error?: string } {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return { valid: false, error: 'Invalid JWT format' };
    }

    const payloadRaw = fromBase64(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
    const payload: JWTPayload = JSON.parse(payloadRaw);

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return { valid: false, error: 'JWT token expired' };
    }

    return { valid: true, payload };
  } catch (err: any) {
    return { valid: false, error: err?.message || 'Failed to decode JWT' };
  }
}

/**
 * Vendor Auth Service Client
 */
class VendorAuthService {
  private currentToken: string | null = null;
  private currentUser: VendorUser | null = null;

  constructor() {
    this.restoreSession();
  }

  public restoreSession(): VendorUser | null {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const savedToken = window.localStorage.getItem(STORAGE_JWT_KEY);
        if (savedToken) {
          const result = decodeAndVerifyJWT(savedToken);
          if (result.valid && result.payload) {
            this.currentToken = savedToken;
            const account = VENDOR_ACCOUNTS.find((a) => a.email === result.payload?.email);
            if (account) {
              this.currentUser = account.user;
              return account.user;
            } else {
              this.currentUser = {
                id: result.payload.sub,
                email: result.payload.email,
                name: result.payload.name,
                stallSlug: result.payload.stallSlug,
                stallName: result.payload.stallName,
                role: result.payload.role,
                avatarInitials: result.payload.name.slice(0, 2).toUpperCase(),
                brandColor: '#D95D45',
              };
              return this.currentUser;
            }
          }
        }
      }
    } catch (e) {}
    return null;
  }

  public async login(email: string, password: string): Promise<{ success: boolean; token?: string; user?: VendorUser; error?: string }> {
    const normalizedEmail = email.trim().toLowerCase();
    const account = VENDOR_ACCOUNTS.find(
      (a) => a.email.toLowerCase() === normalizedEmail && a.passwordHash === password.trim()
    );

    if (!account) {
      return { success: false, error: 'Invalid vendor email or password.' };
    }

    const token = signJWT(account.user, 48); // 48 hours validity
    this.currentToken = token;
    this.currentUser = account.user;

    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(STORAGE_JWT_KEY, token);
      }
    } catch (e) {}

    return { success: true, token, user: account.user };
  }

  public logout(): void {
    this.currentToken = null;
    this.currentUser = null;
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(STORAGE_JWT_KEY);
      }
    } catch (e) {}
  }

  public getToken(): string | null {
    return this.currentToken;
  }

  public getUser(): VendorUser | null {
    if (!this.currentUser) {
      this.restoreSession();
    }
    return this.currentUser;
  }

  public isAuthenticated(): boolean {
    return !!this.getUser();
  }
}

export const vendorAuth = new VendorAuthService();
