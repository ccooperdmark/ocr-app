import { Session, SessionType } from '@/types/trainingPlan/plan';
import { DayOfWeek } from '@/types/trainingPlan/athlete';

export interface InterferenceRule {
  id: string;
  incompatibleTypes: [SessionType, SessionType];
  minHoursSeparation: number; // e.g. 48 hours
  reason: string;
}

export const OCR_INTERFERENCE_RULES: InterferenceRule[] = [
  {
    id: 'heavy_squat_vs_hard_run',
    incompatibleTypes: ['maximal_strength', 'anaerobic_lactate_intervals'],
    minHoursSeparation: 48,
    reason: 'Heavy lower-body resistance training creates eccentric muscle micro-tears that impair glycogen resynthesis and elevate tendon injury risk during hard interval running.'
  },
  {
    id: 'long_run_vs_heavy_strength',
    incompatibleTypes: ['aerobic_run_engine', 'maximal_strength'],
    minHoursSeparation: 24,
    reason: 'Prolonged running activates AMPK pathways which inhibit mTOR protein synthesis and blunt maximal strength and hypertrophic adaptations.'
  },
  {
    id: 'grip_arm_pump_vs_obstacle_skill',
    incompatibleTypes: ['grip_and_hanging_armor', 'obstacle_skill_and_agility'],
    minHoursSeparation: 48,
    reason: 'Heavy localized forearm fatigue destroys fine motor control and tactile sensory feedback required for high-risk dynamic multi-rig swinging.'
  },
  {
    id: 'heavy_carries_vs_mountain_vert',
    incompatibleTypes: ['loaded_carry_complex', 'trail_mountain_vert'],
    minHoursSeparation: 48,
    reason: 'Loaded carries heavily tax the spinal erectors, glutes, and Achilles tendon; back-to-back mountain vert running creates compound lumbar and knee breakdown.'
  },
  {
    id: 'plyometric_vs_compromised_wod',
    incompatibleTypes: ['hybrid_compromised_ocr', 'anaerobic_lactate_intervals'],
    minHoursSeparation: 48,
    reason: 'High CNS and stretch-shortening cycle fatigue impairs reactive ground contact time and risks acute tendon strains.'
  }
];

const DAY_ORDER: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export function validateMicrocycleInterference(sessions: Session[]): {
  isValid: boolean;
  conflicts: string[];
} {
  const conflicts: string[] = [];

  for (let i = 0; i < sessions.length; i++) {
    for (let j = i + 1; j < sessions.length; j++) {
      const s1 = sessions[i];
      const s2 = sessions[j];

      const dayIdx1 = DAY_ORDER.indexOf(s1.dayOfWeek);
      const dayIdx2 = DAY_ORDER.indexOf(s2.dayOfWeek);
      const dayDiff = Math.abs(dayIdx1 - dayIdx2);

      // Check if sessions are within 1 day (consecutive or same day)
      if (dayDiff <= 1) {
        // Evaluate against interference rules
        OCR_INTERFERENCE_RULES.forEach((rule) => {
          const matches =
            (s1.sessionType === rule.incompatibleTypes[0] && s2.sessionType === rule.incompatibleTypes[1]) ||
            (s1.sessionType === rule.incompatibleTypes[1] && s2.sessionType === rule.incompatibleTypes[0]);

          if (matches) {
            conflicts.push(
              `Interference Conflict on ${s1.dayOfWeek} & ${s2.dayOfWeek}: ${s1.name} and ${s2.name} violate the ${rule.minHoursSeparation}h separation rule. ${rule.reason}`
            );
          }
        });

        // Also check: Never cluster 2 hard sessions on consecutive days unless it is an advanced race-simulation block
        if (s1.isHardSession && s2.isHardSession && dayDiff === 0) {
          conflicts.push(`Same-Day Fatigue Conflict: Two hard sessions programmed on ${s1.dayOfWeek}.`);
        }
      }
    }
  }

  return {
    isValid: conflicts.length === 0,
    conflicts
  };
}
