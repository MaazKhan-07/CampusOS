import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RoadmapFeature } from '../types';
import { initialRoadmapFeatures } from '../data/roadmap';

interface RoadmapState {
  features: RoadmapFeature[];
  toggleVote: (featureId: string) => void;
  resetRoadmap: () => void;
}

export const useRoadmapStore = create<RoadmapState>()(
  persist(
    (set) => ({
      features: initialRoadmapFeatures,

      toggleVote: (featureId: string) => {
        set((state) => ({
          features: state.features.map((f) => {
            if (f.id === featureId) {
              const hasVoted = !!f.hasVoted;
              return {
                ...f,
                hasVoted: !hasVoted,
                votes: hasVoted ? f.votes - 1 : f.votes + 1,
              };
            }
            return f;
          }),
        }));
      },

      resetRoadmap: () => {
        set({ features: initialRoadmapFeatures });
      },
    }),
    {
      name: 'campus-os-roadmap',
    }
  )
);

