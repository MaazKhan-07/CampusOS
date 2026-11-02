import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Role } from '../types';
import { mockUsers } from '../data/users';

interface AuthState {
  currentUser: User;
  currentRole: Role;
  isAuthenticated: boolean;
  switchRole: (role: Role) => void;
  login: (email: string, collegeId?: string) => boolean;
  signup: (userData: Partial<User>) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  upgradeToPremium: () => void;
  resetDemoData: () => void;
}

const defaultStudent = mockUsers[0]; // Aarav Sharma
const defaultAdmin = mockUsers[1];   // Dr. Radhika Sen
const defaultRecruiter = mockUsers[2]; // Vikram Mehta

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      currentUser: defaultStudent,
      currentRole: 'student',
      isAuthenticated: true,

      switchRole: (role: Role) => {
        let user: User;
        if (role === 'admin') {
          user = defaultAdmin;
        } else if (role === 'recruiter') {
          user = defaultRecruiter;
        } else {
          user = defaultStudent;
        }
        set({
          currentRole: role,
          currentUser: user,
          isAuthenticated: true,
        });
      },

      login: (email: string, collegeId?: string) => {
        const found = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
        if (found) {
          set({
            currentUser: found,
            currentRole: found.role,
            isAuthenticated: true,
          });
          return true;
        }
        // Simulated student login
        const newUser: User = {
          id: 'user-' + Date.now(),
          name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          email: email,
          role: 'student',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
          collegeId: collegeId || 'col-1',
          collegeName: 'Sunrise Institute of Technology, Mumbai',
          department: 'Computer Science & Engineering',
          semester: 4,
          isVerified: email.endsWith('.edu') || email.endsWith('.edu.in') || email.endsWith('.ac.in'),
          bio: 'Student at SIT Mumbai.',
          skills: ['Java', 'Python', 'Problem Solving'],
          isPremium: false,
        };
        set({
          currentUser: newUser,
          currentRole: 'student',
          isAuthenticated: true,
        });
        return true;
      },

      signup: (userData: Partial<User>) => {
        const isCollegeEmail = !!(
          userData.email?.endsWith('.edu') ||
          userData.email?.endsWith('.edu.in') ||
          userData.email?.endsWith('.ac.in')
        );

        const newUser: User = {
          id: 'user-' + Date.now(),
          name: userData.name || 'Campus Student',
          email: userData.email || 'student@sit.edu.in',
          role: userData.role || 'student',
          avatar: userData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          collegeId: userData.collegeId || 'col-1',
          collegeName: userData.collegeName || 'Sunrise Institute of Technology, Mumbai',
          department: userData.department || 'Computer Science & Engineering',
          semester: userData.semester || 1,
          bio: userData.bio || 'New student on CampusOS!',
          isVerified: isCollegeEmail,
          skills: userData.skills || ['Communication', 'Teamwork'],
          isPremium: false,
        };

        set({
          currentUser: newUser,
          currentRole: newUser.role,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          isAuthenticated: false,
        });
      },

      updateProfile: (updates: Partial<User>) => {
        set((state) => ({
          currentUser: { ...state.currentUser, ...updates },
        }));
      },

      upgradeToPremium: () => {
        set((state) => ({
          currentUser: { ...state.currentUser, isPremium: true },
        }));
      },

      resetDemoData: () => {
        localStorage.clear();
        window.location.reload();
      },
    }),
    {
      name: 'campus-os-auth',
    }
  )
);

