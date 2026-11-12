import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDocs, updateDoc } from 'firebase/firestore';
import firebaseConfig from './firebase-applet-config.json' with { type: 'json' };

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '1mb' }));

// Initialize Firebase in server
let db: any = null;
try {
  const firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);
  console.log('Firebase Firestore initialized on server with database ID:', firebaseConfig.firestoreDatabaseId);
} catch (err) {
  console.warn('Firebase server initialization warning:', err);
}

// In-memory inquiry store as instant operational buffer and backup
interface InquiryData {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  arrivalDate: string;
  guestCount: number;
  experienceChoice: 'golf' | 'massage';
  notes?: string;
  status: 'new' | 'contacted' | 'reserved' | 'archived';
  packagePrice: number;
  currency: string;
  createdAt: string;
}

const inMemoryInquiries: InquiryData[] = [];

// Helper validation function
function validateInquiry(body: any): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!body.fullName || typeof body.fullName !== 'string' || body.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  } else if (body.fullName.trim().length > 100) {
    errors.fullName = 'Full name must not exceed 100 characters.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!body.email || typeof body.email !== 'string' || !emailRegex.test(body.email.trim())) {
    errors.email = 'Please provide a valid email address.';
  } else if (body.email.trim().length > 120) {
    errors.email = 'Email address must not exceed 120 characters.';
  }

  if (body.phone && typeof body.phone === 'string' && body.phone.trim().length > 40) {
    errors.phone = 'Phone number must not exceed 40 characters.';
  }

  if (!body.arrivalDate || typeof body.arrivalDate !== 'string') {
    errors.arrivalDate = 'Please select your preferred arrival date.';
  } else {
    const parsedDate = new Date(body.arrivalDate);
    if (isNaN(parsedDate.getTime())) {
      errors.arrivalDate = 'Please provide a valid calendar date (YYYY-MM-DD).';
    }
  }

  const guestNum = Number(body.guestCount);
  if (!guestNum || isNaN(guestNum) || guestNum < 1 || guestNum > 12) {
    errors.guestCount = 'Guest count must be between 1 and 12.';
  }

  if (body.experienceChoice !== 'golf' && body.experienceChoice !== 'massage') {
    errors.experienceChoice = 'Please select either the PGA Riviera Maya Golf or Signature Massages.';
  }

  if (body.notes && typeof body.notes === 'string' && body.notes.length > 2000) {
    errors.notes = 'Notes must not exceed 2,000 characters.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// POST /api/inquiries - Submit an inquiry with server-side validation and Firestore persistence
app.post('/api/inquiries', async (req: Request, res: Response) => {
  try {
    const { fullName, email, phone, arrivalDate, guestCount, experienceChoice, notes } = req.body;

    const validation = validateInquiry(req.body);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed. Please correct the highlighted fields.',
        errors: validation.errors,
      });
    }

    const inquiryId = `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const newInquiry: InquiryData = {
      id: inquiryId,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      arrivalDate: arrivalDate.trim(),
      guestCount: Math.min(12, Math.max(1, parseInt(String(guestCount), 10))),
      experienceChoice: experienceChoice === 'golf' ? 'golf' : 'massage',
      notes: notes ? notes.trim().slice(0, 2000) : '',
      status: 'new',
      packagePrice: 3950,
      currency: 'USD',
      createdAt: new Date().toISOString(),
    };

    // Store in-memory buffer
    inMemoryInquiries.unshift(newInquiry);

    // Persist to Firestore if available
    let firestorePersisted = false;
    if (db) {
      try {
        await setDoc(doc(db, 'inquiries', inquiryId), newInquiry);
        firestorePersisted = true;
      } catch (fsErr) {
        console.error('Firestore server persistence note:', fsErr);
      }
    }

    return res.status(201).json({
      success: true,
      inquiryId,
      firestorePersisted,
      message: 'Your inquiry has been successfully received. Our private villa concierge will review availability and contact you within 4 hours.',
      inquiry: newInquiry,
    });
  } catch (error: any) {
    console.error('Error processing inquiry:', error);
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred while processing your inquiry. Please try again or contact concierge directly via WhatsApp.',
      error: error?.message || 'Internal Server Error',
    });
  }
});

// GET /api/inquiries - Admin review endpoint
app.get('/api/inquiries', async (req: Request, res: Response) => {
  const adminKey = req.headers['x-admin-key'] || req.query.adminKey;
  const isAuthorized = adminKey === 'kachava-lux-admin-2026' || adminKey === 'KACHAVA2026';

  if (!isAuthorized) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized. Admin key required to view inquiries.',
    });
  }

  try {
    let items = [...inMemoryInquiries];

    if (db) {
      try {
        const snapshot = await getDocs(collection(db, 'inquiries'));
        const firestoreItems: InquiryData[] = [];
        snapshot.forEach((docSnapshot) => {
          firestoreItems.push(docSnapshot.data() as InquiryData);
        });

        if (firestoreItems.length > 0) {
          // Merge by id
          const map = new Map<string, InquiryData>();
          items.forEach((it) => map.set(it.id, it));
          firestoreItems.forEach((it) => map.set(it.id, it));
          items = Array.from(map.values()).sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
      } catch (fsErr) {
        console.warn('Could not read from Firestore in admin route, using memory store:', fsErr);
      }
    }

    return res.json({
      success: true,
      count: items.length,
      inquiries: items,
      firestoreDatabaseId: firebaseConfig.firestoreDatabaseId,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err?.message });
  }
});

// PATCH /api/inquiries/:id/status - Update inquiry status (new, contacted, reserved, archived)
app.patch('/api/inquiries/:id/status', async (req: Request, res: Response) => {
  const adminKey = req.headers['x-admin-key'] || req.query.adminKey;
  const isAuthorized = adminKey === 'kachava-lux-admin-2026' || adminKey === 'KACHAVA2026';

  if (!isAuthorized) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const { id } = req.params;
  const { status } = req.body;

  if (!['new', 'contacted', 'reserved', 'archived'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status' });
  }

  // Update memory
  const memoryItem = inMemoryInquiries.find((item) => item.id === id);
  if (memoryItem) {
    memoryItem.status = status;
  }

  // Update Firestore
  if (db) {
    try {
      await updateDoc(doc(db, 'inquiries', id), { status });
    } catch (fsErr) {
      console.warn('Firestore status update note:', fsErr);
    }
  }

  return res.json({ success: true, id, status });
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    resort: 'Kachava Lux Tulum',
    timestamp: new Date().toISOString(),
    firestoreReady: Boolean(db),
  });
});

// Mount Vite or serve static assets
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Kachava Lux server listening on http://localhost:${PORT}`);
  });
}

startServer();
