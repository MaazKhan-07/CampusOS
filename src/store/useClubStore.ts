import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Club, ClubMember, ClubAnnouncement, ClubMeeting } from '../types';
import { mockClubs, mockClubMembers, mockClubMeetings } from '../data/clubs';

interface ClubState {
  clubs: Club[];
  members: ClubMember[];
  meetings: ClubMeeting[];
  joinClub: (clubId: string) => void;
  leaveClub: (clubId: string) => void;
  postAnnouncement: (announcement: Omit<ClubAnnouncement, 'id' | 'date'>) => void;
  approveMember: (memberId: string) => void;
  rejectMember: (memberId: string) => void;
  markAttendance: (meetingId: string, studentId: string, present: boolean) => void;
  createMeeting: (meeting: Omit<ClubMeeting, 'id'>) => void;
  resetClubs: () => void;
}

export const useClubStore = create<ClubState>()(
  persist(
    (set) => ({
      clubs: mockClubs,
      members: mockClubMembers,
      meetings: mockClubMeetings,

      joinClub: (clubId: string) => {
        set((state) => ({
          clubs: state.clubs.map((c) =>
            c.id === clubId
              ? { ...c, isMember: true, membersCount: c.membersCount + 1 }
              : c
          ),
        }));
      },

      leaveClub: (clubId: string) => {
        set((state) => ({
          clubs: state.clubs.map((c) =>
            c.id === clubId
              ? { ...c, isMember: false, membersCount: Math.max(0, c.membersCount - 1) }
              : c
          ),
        }));
      },

      postAnnouncement: (announcementData) => {
        const newAnn: ClubAnnouncement = {
          ...announcementData,
          id: 'ann-' + Date.now(),
          date: new Date().toISOString().split('T')[0],
        };
        set((state) => ({
          clubs: state.clubs.map((c) =>
            c.id === announcementData.clubId
              ? {
                  ...c,
                  announcements: [newAnn, ...(c.announcements || [])],
                }
              : c
          ),
        }));
      },

      approveMember: (memberId: string) => {
        set((state) => ({
          members: state.members.map((m) =>
            m.id === memberId ? { ...m, status: 'active' as const } : m
          ),
        }));
      },

      rejectMember: (memberId: string) => {
        set((state) => ({
          members: state.members.filter((m) => m.id !== memberId),
        }));
      },

      markAttendance: (meetingId: string, studentId: string, present: boolean) => {
        set((state) => ({
          meetings: state.meetings.map((m) =>
            m.id === meetingId
              ? {
                  ...m,
                  attendees: m.attendees.map((a) =>
                    a.studentId === studentId ? { ...a, present } : a
                  ),
                }
              : m
          ),
        }));
      },

      createMeeting: (meetingData) => {
        const newMeet: ClubMeeting = {
          ...meetingData,
          id: 'meet-' + Date.now(),
        };
        set((state) => ({
          meetings: [newMeet, ...state.meetings],
        }));
      },

      resetClubs: () => {
        set({
          clubs: mockClubs,
          members: mockClubMembers,
          meetings: mockClubMeetings,
        });
      },
    }),
    {
      name: 'campus-os-clubs',
    }
  )
);

