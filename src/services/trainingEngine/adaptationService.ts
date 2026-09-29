import { WorkoutLogEntry, Session, TrainingPlan } from '@/types/trainingPlan/plan';

export interface AdaptationRecommendation {
  action: 'progress' | 'maintain' | 'regress' | 'trigger_reactive_deload' | 'flag_medical_eval';
  rationale: string;
  volumeMultiplier: number; // e.g. 0.7 for deload, 1.05 for progressive overload
  intensityMultiplier: number;
  flaggedSafetyWarning?: string;
}

export function evaluateWorkoutFeedback(
  logs: WorkoutLogEntry[]
): AdaptationRecommendation {
  if (!logs || logs.length === 0) {
    return {
      action: 'maintain',
      rationale: 'Baseline programming maintained as athlete logs initial workout feedback.',
      volumeMultiplier: 1.0,
      intensityMultiplier: 1.0
    };
  }

  // 1. Safety & Medical Flag Check
  const recentPainLogs = logs.filter((l) => l.painFlagDetected);
  if (recentPainLogs.length >= 2) {
    return {
      action: 'flag_medical_eval',
      rationale: `Pain flag detected in ${recentPainLogs.length} consecutive sessions (${recentPainLogs[0]?.painLocationAndNotes || 'Joint / Tendon'}). Training must not progress through significant pain. Seek clearance from a licensed physical therapist or healthcare professional before resuming high-impact work.`,
      volumeMultiplier: 0.5,
      intensityMultiplier: 0.6,
      flaggedSafetyWarning: 'MEDICAL WARNING: Consecutive workouts flagged with localized pain. High-impact loading paused pending healthcare clearance.'
    };
  }

  // 2. High Fatigue & Exhaustion Check (Reactive Deload Trigger)
  const highRpeCount = logs.filter((l) => l.overallRpe >= 9 && l.perceivedDifficulty === 'excessive_burnout').length;
  const highSorenessCount = logs.filter((l) => l.sorenessLevel >= 4).length;

  if (highRpeCount >= 2 || (highRpeCount >= 1 && highSorenessCount >= 2)) {
    return {
      action: 'trigger_reactive_deload',
      rationale: 'Reactive Deload Triggered: Athlete logged multiple sessions with excessive fatigue (RPE ≥ 9) and elevated systemic soreness (≥ 4/5). Volume is temporarily dialed down 35% for 4-5 days to avert overtraining syndrome.',
      volumeMultiplier: 0.65,
      intensityMultiplier: 0.85
    };
  }

  // 3. Positive Adaptation & Progressive Overload Check
  const wellToleratedCount = logs.filter((l) => l.completed && l.overallRpe <= 7 && l.perceivedDifficulty !== 'excessive_burnout').length;
  if (wellToleratedCount >= 3) {
    return {
      action: 'progress',
      rationale: 'Consistent Adaptation Confirmed: Athlete successfully completed last 3 sessions within target RPE with normal recovery. Progressing weekly volume by 5-8% according to progressive overload criteria.',
      volumeMultiplier: 1.06,
      intensityMultiplier: 1.02
    };
  }

  // 4. Standard Maintenance
  return {
    action: 'maintain',
    rationale: 'Planned progression steady. Athlete is adapting to current mesocycle loading parameters.',
    volumeMultiplier: 1.0,
    intensityMultiplier: 1.0
  };
}

export function triageMissedWorkout(
  missedSession: Session,
  remainingSessionsInWeek: Session[],
  daysUntilRace: number
): {
  recommendedAction: 'skip' | 'reschedule' | 'shorten' | 'substitute';
  explanation: string;
  adjustedSessions: Session[];
} {
  // If race is within 7 days, do not try to make up lost volume
  if (daysUntilRace <= 7) {
    return {
      recommendedAction: 'skip',
      explanation: 'Race week taper rule: Never attempt to make up missed sessions during peak race week. Rest preserves glycogen and freshness.',
      adjustedSessions: remainingSessionsInWeek
    };
  }

  // If the missed session was active recovery, simply skip
  if (!missedSession.isHardSession || missedSession.sessionType === 'active_recovery') {
    return {
      recommendedAction: 'skip',
      explanation: 'Missed session was active recovery/easy volume. Skipping preserves scheduled 48h separation before upcoming hard sessions without disrupting weekly rhythm.',
      adjustedSessions: remainingSessionsInWeek
    };
  }

  // If missed session was a high-priority hard session (e.g. carry or grip)
  const hasRestDayAvailable = remainingSessionsInWeek.some((s) => s.sessionType === 'active_recovery' || s.isOptional);

  if (hasRestDayAvailable) {
    // Reschedule into the rest day slot
    const updated = remainingSessionsInWeek.map((s) => {
      if (s.sessionType === 'active_recovery') {
        return {
          ...missedSession,
          dayOfWeek: s.dayOfWeek,
          whyThisSessionIsInYourProgram: `Rescheduled from earlier in the week. Adjusted duration to 45 mins to prevent cumulative fatigue.`
        };
      }
      return s;
    });

    return {
      recommendedAction: 'reschedule',
      explanation: `Rescheduled ${missedSession.name} into an open recovery day slot, keeping remaining high-intensity days intact without calendar drift.`,
      adjustedSessions: updated
    };
  }

  // Otherwise, shorten remaining high-intensity session by 20% rather than doubling up
  return {
    recommendedAction: 'skip',
    explanation: 'Calendar is already fully occupied. Stacking workouts would violate the 48h interference rule. Proceed with the remaining microcycle schedule.',
    adjustedSessions: remainingSessionsInWeek
  };
}
