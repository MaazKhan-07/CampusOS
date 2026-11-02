import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Internship, Application, ApplicationStatus } from '../types';
import { mockInternships, mockInitialApplications } from '../data/internships';

interface InternshipState {
  internships: Internship[];
  applications: Application[];
  savedInternships: string[];
  toggleSave: (internshipId: string) => void;
  applyToInternship: (app: Omit<Application, 'id' | 'appliedAt' | 'status'>) => void;
  updateApplicationStatus: (applicationId: string, newStatus: ApplicationStatus) => void;
  postJob: (jobData: Omit<Internship, 'id' | 'applicantsCount' | 'postedDate'>) => void;
  resetInternships: () => void;
}

export const useInternshipStore = create<InternshipState>()(
  persist(
    (set) => ({
      internships: mockInternships,
      applications: mockInitialApplications,
      savedInternships: ['intern-1', 'intern-3'],

      toggleSave: (internshipId: string) => {
        set((state) => ({
          savedInternships: state.savedInternships.includes(internshipId)
            ? state.savedInternships.filter((id) => id !== internshipId)
            : [...state.savedInternships, internshipId],
        }));
      },

      applyToInternship: (appData) => {
        const newApp: Application = {
          ...appData,
          id: 'app-' + Date.now(),
          appliedAt: new Date().toISOString().split('T')[0],
          status: 'Applied',
        };
        set((state) => ({
          applications: [newApp, ...state.applications],
          internships: state.internships.map((intern) =>
            intern.id === appData.internshipId
              ? { ...intern, applicantsCount: intern.applicantsCount + 1 }
              : intern
          ),
        }));
      },

      updateApplicationStatus: (applicationId: string, newStatus: ApplicationStatus) => {
        set((state) => ({
          applications: state.applications.map((app) =>
            app.id === applicationId ? { ...app, status: newStatus } : app
          ),
        }));
      },

      postJob: (jobData) => {
        const newJob: Internship = {
          ...jobData,
          id: 'intern-' + Date.now(),
          applicantsCount: 0,
          postedDate: new Date().toISOString().split('T')[0],
        };
        set((state) => ({
          internships: [newJob, ...state.internships],
        }));
      },

      resetInternships: () => {
        set({
          internships: mockInternships,
          applications: mockInitialApplications,
          savedInternships: ['intern-1', 'intern-3'],
        });
      },
    }),
    {
      name: 'campus-os-internships',
    }
  )
);

