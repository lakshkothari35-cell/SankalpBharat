import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  User as FirebaseUser,
  signOut
} from 'firebase/auth';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestore-errors';

export type UserRole = 'donor' | 'volunteer' | 'staff' | 'manager' | 'admin';

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
  mobileNumber?: string;
  photoURL?: string;
  language?: string;
  address?: string;
  state?: string;
  city?: string;
  createdAt: string;
}

interface AuthContextType {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubProfile: (() => void) | null = null;
    let authUnsubscribe: (() => void) | null = null;

    // Small delay to allow Firebase Auth state machine to stabilize
    const timeoutId = setTimeout(() => {
      authUnsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        setUser(firebaseUser);
        
        // Cleanup previous profile listener
        if (unsubProfile) {
          unsubProfile();
          unsubProfile = null;
        }

        if (firebaseUser) {
          const userPath = `users/${firebaseUser.uid}`;
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          
          unsubProfile = onSnapshot(userDocRef, (docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data() as UserProfile;
              
              // Auto-upgrade developer to admin if they are currently a donor
              if (firebaseUser.email === 'lakshkothari35@gmail.com' && data.role === 'donor') {
                console.log('Upgrading developer to admin role...');
                const updatedProfile = { ...data, role: 'admin' as UserRole };
                setDoc(userDocRef, updatedProfile, { merge: true }).catch(err => {
                  console.error('Failed to upgrade role:', err);
                });
                setProfile(updatedProfile);
              } else {
                setProfile(data);
              }
              setLoading(false);
            } else {
              const newRole: UserRole = firebaseUser.email === 'lakshkothari35@gmail.com' ? 'admin' : 'donor';
              
              const newProfile: UserProfile = {
                uid: firebaseUser.uid,
                email: firebaseUser.email || '',
                name: firebaseUser.displayName || 'Human Being',
                role: newRole,
                photoURL: firebaseUser.photoURL || '',
                createdAt: new Date().toISOString()
              };
              
              setDoc(userDocRef, newProfile).catch(err => {
                 handleFirestoreError(err, OperationType.WRITE, userPath, firebaseUser);
              });
              
              setProfile(newProfile);
              setLoading(false);
            }
          }, (error) => {
            console.error('Profile snapshot error:', error);
            handleFirestoreError(error, OperationType.GET, userPath, firebaseUser);
          });
        } else {
          setProfile(null);
          setLoading(false);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (authUnsubscribe) authUnsubscribe();
      if (unsubProfile) unsubProfile();
    };
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
