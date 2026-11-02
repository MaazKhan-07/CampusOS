import React from 'react';
import { Card } from './Card';
import { BookOpen, IndianRupee, Leaf, Sparkles } from 'lucide-react';

export const ImpactWidget: React.FC = () => {
  return (
    <Card className="bg-gradient-to-br from-primary via-primary-light to-[#01241C] text-surface border-accent/25 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-sm text-surface">Campus Sustainability Impact</h4>
            <p className="text-[11px] text-surface/70">Verified peer-to-peer textbook reuse metrics</p>
          </div>
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-accent/25 text-surface border border-accent/40">
          This Semester
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 pt-2 border-t border-surface/10 relative z-10">
        <div className="bg-surface/5 p-3 rounded-xl border border-surface/10">
          <div className="flex items-center gap-1.5 text-accent text-xs font-semibold mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Reused</span>
          </div>
          <div className="text-xl sm:text-2xl font-heading font-extrabold text-surface">1,240+</div>
          <p className="text-[10px] text-surface/60 mt-0.5">Physical books kept in circulation</p>
        </div>

        <div className="bg-surface/5 p-3 rounded-xl border border-surface/10">
          <div className="flex items-center gap-1.5 text-accent text-xs font-semibold mb-1">
            <IndianRupee className="w-3.5 h-3.5" />
            <span>Saved</span>
          </div>
          <div className="text-xl sm:text-2xl font-heading font-extrabold text-accent">₹8.4L</div>
          <p className="text-[10px] text-surface/60 mt-0.5">Estimated student money saved</p>
        </div>

        <div className="bg-surface/5 p-3 rounded-xl border border-surface/10">
          <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-semibold mb-1">
            <Leaf className="w-3.5 h-3.5" />
            <span>Eco Value</span>
          </div>
          <div className="text-xl sm:text-2xl font-heading font-extrabold text-surface">3.8 Tons</div>
          <p className="text-[10px] text-surface/60 mt-0.5">Paper & printing waste reduced</p>
        </div>
      </div>
    </Card>
  );
};

