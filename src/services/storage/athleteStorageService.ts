// Production-Grade Client Storage & Persistence Layer
// Backed by browser localStorage with in-memory fallback and reactive event dispatch

import { 
  ComprehensiveAthleteProfile, 
  AutomatedAdaptationRecord, 
  AutonomousWeeklyReview, 
  AutonomousNotification, 
  DailyReadinessAssessment,
  GoalPathwayMilestone,
  DEFAULT_GOAL_PATHWAYS,
  calculateDailyReadiness,
  generateAutonomousWeeklyReview
} from '@/services/trainingEngine/aiCoachEngineService';
import { ExperienceTier } from '@/types/trainingPlan/athlete';

export type { 
  ComprehensiveAthleteProfile, 
  AutomatedAdaptationRecord, 
  AutonomousWeeklyReview, 
  AutonomousNotification, 
  DailyReadinessAssessment,
  GoalPathwayMilestone,
  ExperienceTier
};

export interface SetLogItem {
  setNumber: number;
  prescribedReps: string;
  prescribedLoad: string;
  actualWeightLbs: number;
  actualReps: number;
  rpe: number; // 1-10
  rir: number; // 0-5
  isCompleted: boolean;
  notes?: string;
}

export interface ExerciseWorkoutLog {
  exerciseId: string;
  exerciseName: string;
  sets: SetLogItem[];
  exerciseNotes?: string;
  activeSubstitution?: string;
}

export interface CompletedWorkoutRecord {
  id: string;
  sessionId: string;
  sessionName: string;
  dayOfWeek: string;
  completedAt: string; // ISO string
  durationMinutes: number;
  overallRpe: number;
  perceivedDifficulty: 'too_easy' | 'just_right' | 'hard_manageable' | 'excessive_burnout';
  sorenessLevel: number; // 1-5
  painFlag: boolean;
  painLocationAndNotes?: string;
  athleteComments?: string;
  exercises: ExerciseWorkoutLog[];
  totalVolumeLbs: number;
  totalSetsCompleted: number;
  prsAchieved: string[];
}

export interface PersonalRecordItem {
  id: string;
  category: 'Strength' | 'Running' | 'Grip' | 'Endurance' | 'Obstacle';
  exerciseName: string;
  metricValue: number;
  metricUnit: string;
  dateAchieved: string;
  previousValue?: number;
  badgeLabel: string;
}

export interface BaselineAssessmentData {
  parqApproved: boolean;
  medicalConditions: string[];
  trainingAgeYears: number;
  primaryGoal: string;
  maxDeadHangSeconds: number;
  oneMileTrailPaceSeconds: number; // in seconds (e.g. 450 = 7:30)
  maxStrictPullUps: number;
  plankHoldSeconds: number;
  fiveHundredMeterRowSeconds: number;
  assessedAt: string;
}

export interface CoachChatMessage {
  id: string;
  sender: 'coach' | 'athlete';
  senderName: string;
  avatarUrl?: string;
  messageText: string;
  sentAt: string;
  attachmentType?: 'form_check_video' | 'workout_summary' | 'checkin';
  attachmentTitle?: string;
  isRead: boolean;
}

export interface WeeklyCheckInSubmission {
  id: string;
  submittedAt: string;
  weeklyAdherenceRate: number;
  averageSleepHours: number;
  energyRating: number; // 1-10
  stressRating: number; // 1-10
  currentWeightLbs: number;
  highlightsAndWins: string;
  strugglesAndChallenges: string;
  coachFeedback?: string;
  coachReviewedAt?: string;
  status: 'pending_review' | 'reviewed';
}

export interface NutritionUserSettings {
  isEnabled: boolean; // default optional toggle
  primaryGoal: 'lean_muscle' | 'race_weight_fat_loss' | 'endurance_fueling' | 'general_recomp';
  dietaryPreference: 'omnivore' | 'vegetarian' | 'vegan' | 'pescatarian' | 'low_carb' | 'high_carb_endurance';
  allergies: string[];
  trackingComplexity: 'simple_habits' | 'moderate' | 'advanced_precision';
  sweatRateLph: number;
  manualDemandOverride: 'auto' | 'low' | 'moderate' | 'high' | 'very_high' | 'race_day';
  onboardingCompleted: boolean;
}

export interface SweatRateTestRecord {
  id: string;
  testDate: string;
  preWeightLbs: number;
  postWeightLbs: number;
  fluidConsumedOz: number;
  durationMinutes: number;
  temperatureF: number;
  sweatRateLph: number;
  sweatRateOzPerHour: number;
  dehydrationPercent: number;
  sweatCategory: string;
  notes?: string;
}

export interface DailyNutritionLog {
  date: string;
  targetCalories: number;
  targetProteinGrams: number;
  targetCarbsGrams: number;
  targetFatGrams: number;
  targetWaterOunces: number;
  consumedCalories: number;
  consumedProteinGrams: number;
  consumedCarbsGrams: number;
  consumedFatGrams: number;
  consumedWaterOunces: number;
  
  preWorkoutFuelHit?: boolean;
  postWorkoutFuelHit?: boolean;
  hydrationTargetHit?: boolean;
  proteinTargetHit?: boolean;
  demandLevel?: 'low' | 'moderate' | 'high' | 'very_high' | 'race_day';
}

export interface WearableSyncData {
  isConnected: boolean;
  provider: 'apple_health' | 'garmin' | 'whoop';
  lastSyncedAt: string;
  restingHeartRate: number;
  activeCaloriesBurned: number;
  sleepHours: number;
  sleepQualityScore: number;
  hrvMilliseconds: number;
  stepCount: number;
}

// STORAGE KEYS
const KEYS = {
  WORKOUT_LOGS: 'grit_ocr_workout_logs_v1',
  PRS: 'grit_ocr_personal_records_v1',
  ASSESSMENT: 'grit_ocr_baseline_assessment_v1',
  CHAT: 'grit_ocr_coach_messages_v1',
  CHECKINS: 'grit_ocr_weekly_checkins_v1',
  NUTRITION: 'grit_ocr_daily_nutrition_v1',
  NUTRITION_SETTINGS: 'grit_ocr_nutrition_settings_v1',
  SWEAT_RATE_TESTS: 'grit_ocr_sweat_rate_tests_v1',
  WEARABLE: 'grit_ocr_wearable_sync_v1',
  BODY_WEIGHT_HISTORY: 'grit_ocr_weight_history_v1',
  COMPREHENSIVE_PROFILE: 'grit_ocr_comprehensive_profile_v2',
  ADAPTATIONS: 'grit_ocr_adaptations_history_v2',
  WEEKLY_REVIEWS: 'grit_ocr_weekly_reviews_v2',
  NOTIFICATIONS: 'grit_ocr_notifications_v2',
  READINESS: 'grit_ocr_daily_readiness_v2',
  GOAL_PATHWAYS: 'grit_ocr_goal_pathways_v2',
  EXPERIENCE_TIER: 'grit_ocr_experience_tier_v2'
};

// INITIAL SEED DATA
const DEFAULT_PRS: PersonalRecordItem[] = [
  { id: 'pr-1', category: 'Grip', exerciseName: 'Active Dead Hang', metricValue: 115, metricUnit: 'Seconds', dateAchieved: '2026-09-10', badgeLabel: 'Age Group Competitive' },
  { id: 'pr-2', category: 'Running', exerciseName: '1-Mile Trail Pace', metricValue: 435, metricUnit: 'Sec (7:15/mi)', dateAchieved: '2026-09-12', badgeLabel: 'Course Ready' },
  { id: 'pr-3', category: 'Strength', exerciseName: 'Farmer Carry (Per Hand)', metricValue: 70, metricUnit: 'lbs', dateAchieved: '2026-09-14', badgeLabel: 'Elite Standard' },
  { id: 'pr-4', category: 'Strength', exerciseName: 'Max Strict Pull-Ups', metricValue: 18, metricUnit: 'Reps', dateAchieved: '2026-09-15', badgeLabel: 'Podium Ready' },
  { id: 'pr-5', category: 'Endurance', exerciseName: '5K Compromised Run', metricValue: 1380, metricUnit: 'Sec (23:00)', dateAchieved: '2026-09-08', badgeLabel: 'Sub-25 Club' }
];

const DEFAULT_ASSESSMENT: BaselineAssessmentData = {
  parqApproved: true,
  medicalConditions: [],
  trainingAgeYears: 4,
  primaryGoal: 'Sub-3:30 Spartan Beast Finish (Age Group Podium)',
  maxDeadHangSeconds: 115,
  oneMileTrailPaceSeconds: 435,
  maxStrictPullUps: 18,
  plankHoldSeconds: 150,
  fiveHundredMeterRowSeconds: 98,
  assessedAt: '2026-09-01T12:00:00.000Z'
};

const DEFAULT_COMPREHENSIVE_PROFILE: ComprehensiveAthleteProfile = {
  id: 'ath_alex_morgan',
  name: 'Alex Morgan',
  age: 32,
  sex: 'male',
  heightCm: 178,
  weightKg: 76.7, // ~169 lbs
  trainingAgeYears: 4,
  experienceTier: 'intermediate',
  availableTrainingDays: ['monday', 'wednesday', 'thursday', 'friday', 'saturday'],
  preferredDurationMinutes: 65,
  availableEquipment: ['full_gym', 'barbell', 'dumbbells', 'pullup_bar', 'sandbag', 'trail'],
  trainingLocation: 'hybrid',
  preferredExercises: ['Dead Hangs', 'Farmer Carries', 'Trail Hill Repeats', 'Sandbag Cleans'],
  dislikedExercises: ['Burpee Box Jumps (Replaced with Fast Sprawls)'],
  maxDeadHangSeconds: 115,
  oneMileTrailPaceSeconds: 435,
  maxStrictPullUps: 18,
  plankHoldSeconds: 150,
  fiveHundredMeterRowSeconds: 98,
  farmerCarryWeightPerHandLbs: 70,
  targetRaceOrg: 'spartan',
  targetRaceFormat: 'beast',
  raceDate: '2026-11-14T08:00:00.000Z',
  expectedTerrain: 'mountain_vert',
  primaryGoal: 'Sub-3:30 Spartan Beast Finish (Age Group Podium)',
  competitionCategory: 'age_group',
  averageSleepHours: 7.8,
  sleepQualityScore: 8,
  occupationalActivity: 'sedentary',
  parqApproved: true,
  voluntaryInjuryRestrictions: [],
  lastAssessedAt: '2026-09-01T12:00:00.000Z'
};

const DEFAULT_ADAPTATIONS: AutomatedAdaptationRecord[] = [
  {
    id: 'adapt-1',
    appliedAt: '2026-09-17T18:30:00.000Z',
    sessionId: 'sess_friday_grip',
    sessionName: 'Compromised Trail Engine & Grip Gauntlet',
    adaptationType: 'progressive_overload',
    confidenceScore: 'HIGH',
    confidenceReason: 'All 4 working sets of Farmer Carries completed at RPE 7.0 with clean posture.',
    volumeMultiplier: 1.05,
    intensityMultiplier: 1.025,
    plainLanguageExplanation: 'Progressive Overload Unlocked: Because you logged RPE 7 across all Farmer Carry sets on Wednesday, Friday\'s working weight has been autonomously progressed from 65 lbs to 70 lbs per hand.',
    triggerMetric: 'RPE 7.0 • 100% Prescribed Sets Completed',
    affectedExercises: ['Farmer Carry (Per Hand)', 'Active Dead Hang']
  },
  {
    id: 'adapt-2',
    appliedAt: '2026-09-14T11:00:00.000Z',
    sessionId: 'sess_aerobic_base',
    sessionName: 'Zone 2 Aerobic Base & Lactate Clearance',
    adaptationType: 'volume_hold',
    confidenceScore: 'HIGH',
    confidenceReason: 'Cardiac drift stayed within 3.5% threshold during 60-min trail run.',
    volumeMultiplier: 1.0,
    intensityMultiplier: 1.0,
    plainLanguageExplanation: 'Zone 2 Aerobic Pace Confirmed: Your heart rate remained locked within 136-144 BPM without pace decay. Steady volume maintained for current microcycle.',
    triggerMetric: 'Avg HR 139 BPM • Pace 8:15/mi'
  }
];

const DEFAULT_NOTIFICATIONS: AutonomousNotification[] = [
  {
    id: 'notif-1',
    type: 'auto_adaptation',
    title: 'Autonomous Overload Applied (+5 lbs)',
    message: 'AI analyzed your recent RPE 7.0 sets. Friday\'s Farmer Carry progressed to 70 lbs/hand with High Confidence.',
    timestamp: '2 hours ago',
    isRead: false,
    badgeType: 'ai'
  },
  {
    id: 'notif-2',
    type: 'weekly_review',
    title: 'Microcycle Week 01 Coaching Report',
    message: 'Completed 4 of 5 sessions (80% adherence). 36,800 lbs volume load, 2 new PRs. Tap to inspect full review.',
    timestamp: 'Yesterday',
    isRead: false,
    badgeType: 'ai'
  },
  {
    id: 'notif-3',
    type: 'pr_achievement',
    title: 'New Personal Record: Active Dead Hang',
    message: 'Congratulations! You established a new personal best: 115 seconds (Age Group Competitive Tier).',
    timestamp: '3 days ago',
    isRead: true,
    badgeType: 'pr'
  },
  {
    id: 'notif-4',
    type: 'race_countdown',
    title: 'Spartan Beast: 8 Weeks to Race Day',
    message: 'Entering Specific Development Mesocycle. Volume progression peaks over the next 4 weeks before taper.',
    timestamp: '5 days ago',
    isRead: true,
    badgeType: 'event'
  }
];

const DEFAULT_MESSAGES: CoachChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'coach',
    senderName: 'GRIT AI Performance Coach',
    messageText: 'Welcome to your peak Beast prep block, Alex! I am actively monitoring your 12 OCR domains and have dynamically aligned your trail intervals with heavy carry compromised sets.',
    sentAt: '2026-09-16T14:30:00.000Z',
    isRead: true
  },
  {
    id: 'msg-2',
    sender: 'athlete',
    senderName: 'Alex Morgan',
    messageText: 'I felt strong on yesterday\'s incline sandbag session, but grip started slipping on set 4.',
    sentAt: '2026-09-17T09:15:00.000Z',
    isRead: true
  },
  {
    id: 'msg-3',
    sender: 'coach',
    senderName: 'GRIT AI Performance Coach',
    messageText: 'Completely expected under lactate accumulation. I have autonomously scheduled towel dead hangs for Friday\'s accessory to target that specific forearm weakness.',
    sentAt: '2026-09-17T11:45:00.000Z',
    isRead: false
  }
];

const DEFAULT_WEARABLE: WearableSyncData = {
  isConnected: true,
  provider: 'apple_health',
  lastSyncedAt: new Date().toISOString(),
  restingHeartRate: 51,
  activeCaloriesBurned: 685,
  sleepHours: 7.8,
  sleepQualityScore: 86,
  hrvMilliseconds: 64,
  stepCount: 12450
};

const DEFAULT_WEIGHT_HISTORY = [
  { date: '2026-08-15', weightLbs: 172.4 },
  { date: '2026-08-22', weightLbs: 171.8 },
  { date: '2026-08-29', weightLbs: 171.0 },
  { date: '2026-09-05', weightLbs: 170.2 },
  { date: '2026-09-12', weightLbs: 169.6 },
  { date: '2026-09-18', weightLbs: 169.1 }
];

const DEFAULT_NUTRITION_SETTINGS: NutritionUserSettings = {
  isEnabled: true,
  primaryGoal: 'endurance_fueling',
  dietaryPreference: 'omnivore',
  allergies: [],
  trackingComplexity: 'moderate',
  sweatRateLph: 1.25,
  manualDemandOverride: 'auto',
  onboardingCompleted: true
};

const DEFAULT_SWEAT_TESTS: SweatRateTestRecord[] = [
  {
    id: 'swt-1',
    testDate: '2026-09-08',
    preWeightLbs: 171.2,
    postWeightLbs: 168.6,
    fluidConsumedOz: 16,
    durationMinutes: 60,
    temperatureF: 74,
    sweatRateLph: 1.7,
    sweatRateOzPerHour: 57,
    dehydrationPercent: 1.52,
    sweatCategory: 'Heavy Sweater',
    notes: '60 min trail tempo with weighted vest. Salty white residue on hat.'
  }
];

function isClient(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

function getItem<T>(key: string, fallback: T): T {
  if (!isClient()) return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.error('Storage Read Error for key:', key, err);
    return fallback;
  }
}

function setItem<T>(key: string, val: T): void {
  if (!isClient()) return;
  try {
    localStorage.setItem(key, JSON.stringify(val));
    window.dispatchEvent(new CustomEvent('grit_storage_update', { detail: { key } }));
  } catch (err) {
    console.error('Storage Write Error for key:', key, err);
  }
}

export const athleteStorage = {
  // WORKOUT LOGS
  getWorkoutLogs(): CompletedWorkoutRecord[] {
    return getItem<CompletedWorkoutRecord[]>(KEYS.WORKOUT_LOGS, []);
  },

  saveWorkoutLog(log: Omit<CompletedWorkoutRecord, 'id' | 'completedAt'>): CompletedWorkoutRecord {
    const logs = this.getWorkoutLogs();
    const newRecord: CompletedWorkoutRecord = {
      ...log,
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      completedAt: new Date().toISOString()
    };
    const updated = [newRecord, ...logs];
    setItem(KEYS.WORKOUT_LOGS, updated);
    return newRecord;
  },

  // PERSONAL RECORDS
  getPersonalRecords(): PersonalRecordItem[] {
    return getItem<PersonalRecordItem[]>(KEYS.PRS, DEFAULT_PRS);
  },

  recordNewPR(item: Omit<PersonalRecordItem, 'id' | 'dateAchieved'>): PersonalRecordItem {
    const prs = this.getPersonalRecords();
    const existingIdx = prs.findIndex(p => p.exerciseName.toLowerCase() === item.exerciseName.toLowerCase());
    
    let updated: PersonalRecordItem[];
    const newPr: PersonalRecordItem = {
      ...item,
      id: `pr_${Date.now()}`,
      dateAchieved: new Date().toISOString().split('T')[0],
      previousValue: existingIdx >= 0 ? prs[existingIdx].metricValue : undefined
    };

    if (existingIdx >= 0) {
      updated = [...prs];
      updated[existingIdx] = newPr;
    } else {
      updated = [newPr, ...prs];
    }

    setItem(KEYS.PRS, updated);

    // Also auto-dispatch in-app notification
    this.addNotification({
      type: 'pr_achievement',
      title: `New PR: ${newPr.exerciseName}`,
      message: `Congratulations! You hit a new personal record: ${newPr.metricValue} ${newPr.metricUnit} (${newPr.badgeLabel}).`,
      badgeType: 'pr'
    });

    return newPr;
  },

  // EXPERIENCE TIERS (Basic | Intermediate | Advanced)
  getExperienceTier(): ExperienceTier {
    const directTier = getItem<ExperienceTier | null>(KEYS.EXPERIENCE_TIER, null);
    if (directTier && (directTier === 'basic' || directTier === 'intermediate' || directTier === 'advanced')) {
      return directTier;
    }
    const profile = this.getComprehensiveProfile();
    return profile.experienceTier || 'intermediate';
  },

  setExperienceTier(tier: ExperienceTier): ExperienceTier {
    setItem(KEYS.EXPERIENCE_TIER, tier);
    const profile = this.getComprehensiveProfile();
    if (profile.experienceTier !== tier) {
      this.saveComprehensiveProfile({ experienceTier: tier });
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('grit_experience_tier_changed', { detail: { tier } }));
      window.dispatchEvent(new CustomEvent('grit_athlete_data_changed'));
    }
    return tier;
  },

  // COMPREHENSIVE ATHLETE PROFILE
  getComprehensiveProfile(): ComprehensiveAthleteProfile {
    return getItem<ComprehensiveAthleteProfile>(KEYS.COMPREHENSIVE_PROFILE, DEFAULT_COMPREHENSIVE_PROFILE);
  },

  saveComprehensiveProfile(data: Partial<ComprehensiveAthleteProfile>): ComprehensiveAthleteProfile {
    const current = this.getComprehensiveProfile();
    const updated: ComprehensiveAthleteProfile = {
      ...current,
      ...data,
      lastAssessedAt: new Date().toISOString()
    };
    setItem(KEYS.COMPREHENSIVE_PROFILE, updated);
    if (data.experienceTier) {
      setItem(KEYS.EXPERIENCE_TIER, data.experienceTier);
    }
    return updated;
  },

  // BASELINE ASSESSMENT (Backwards compatibility)
  getAssessment(): BaselineAssessmentData {
    return getItem<BaselineAssessmentData>(KEYS.ASSESSMENT, DEFAULT_ASSESSMENT);
  },

  saveAssessment(data: Partial<BaselineAssessmentData>): BaselineAssessmentData {
    const current = this.getAssessment();
    const updated: BaselineAssessmentData = {
      ...current,
      ...data,
      assessedAt: new Date().toISOString()
    };
    setItem(KEYS.ASSESSMENT, updated);
    return updated;
  },

  // AUTOMATED ADAPTATIONS HISTORY
  getAdaptations(): AutomatedAdaptationRecord[] {
    return getItem<AutomatedAdaptationRecord[]>(KEYS.ADAPTATIONS, DEFAULT_ADAPTATIONS);
  },

  recordAdaptation(adaptation: Omit<AutomatedAdaptationRecord, 'id' | 'appliedAt'>): AutomatedAdaptationRecord {
    const list = this.getAdaptations();
    const newAdaptation: AutomatedAdaptationRecord = {
      ...adaptation,
      id: `adapt_${Date.now()}`,
      appliedAt: new Date().toISOString()
    };
    const updated = [newAdaptation, ...list];
    setItem(KEYS.ADAPTATIONS, updated);

    // Auto-create in-app notification
    this.addNotification({
      type: 'auto_adaptation',
      title: `AI Plan Adaptation: ${newAdaptation.sessionName}`,
      message: newAdaptation.plainLanguageExplanation,
      badgeType: 'ai'
    });

    return newAdaptation;
  },

  // AUTONOMOUS WEEKLY REVIEWS
  getWeeklyReviews(): AutonomousWeeklyReview[] {
    const initial = [generateAutonomousWeeklyReview(4, 5, 36800, 18.5, 2, ['Active Dead Hang (115s)', 'Farmer Carry (70 lbs/hand)'], 7.3, 1)];
    return getItem<AutonomousWeeklyReview[]>(KEYS.WEEKLY_REVIEWS, initial);
  },

  saveWeeklyReview(review: AutonomousWeeklyReview): void {
    const list = this.getWeeklyReviews();
    setItem(KEYS.WEEKLY_REVIEWS, [review, ...list]);
    this.addNotification({
      type: 'weekly_review',
      title: `Week ${review.weekNumber} Autonomous Review Ready`,
      message: `Completed ${review.adherencePercentage}% of scheduled volume. Tap to read AI coach insights.`,
      badgeType: 'ai'
    });
  },

  // AUTONOMOUS IN-APP NOTIFICATIONS
  getNotifications(): AutonomousNotification[] {
    return getItem<AutonomousNotification[]>(KEYS.NOTIFICATIONS, DEFAULT_NOTIFICATIONS);
  },

  addNotification(notif: Omit<AutonomousNotification, 'id' | 'timestamp' | 'isRead'>): AutonomousNotification {
    const list = this.getNotifications();
    const newNotif: AutonomousNotification = {
      ...notif,
      id: `notif_${Date.now()}`,
      timestamp: 'Just now',
      isRead: false
    };
    setItem(KEYS.NOTIFICATIONS, [newNotif, ...list]);
    return newNotif;
  },

  markNotificationRead(id: string): void {
    const list = this.getNotifications();
    const updated = list.map(n => n.id === id ? { ...n, isRead: true } : n);
    setItem(KEYS.NOTIFICATIONS, updated);
  },

  clearNotifications(): void {
    setItem(KEYS.NOTIFICATIONS, []);
  },

  // DAILY READINESS
  getDailyReadiness(): DailyReadinessAssessment {
    const fallback = calculateDailyReadiness(7.8, 8, 2, 2, 51, 64);
    return getItem<DailyReadinessAssessment>(KEYS.READINESS, fallback);
  },

  saveDailyReadiness(readiness: DailyReadinessAssessment): void {
    setItem(KEYS.READINESS, readiness);
  },

  // GOAL PATHWAYS
  getGoalPathways(): GoalPathwayMilestone[] {
    return getItem<GoalPathwayMilestone[]>(KEYS.GOAL_PATHWAYS, DEFAULT_GOAL_PATHWAYS);
  },

  updateGoalMilestone(pathwayId: string, milestoneValue: number, achieved: boolean): void {
    const pathways = this.getGoalPathways();
    const updated = pathways.map(p => {
      if (p.id !== pathwayId) return p;
      return {
        ...p,
        milestones: p.milestones.map(m => m.value === milestoneValue ? { ...m, isAchieved: achieved, achievedDate: achieved ? new Date().toISOString().split('T')[0] : undefined } : m)
      };
    });
    setItem(KEYS.GOAL_PATHWAYS, updated);
  },

  // COACH MESSAGES
  getMessages(): CoachChatMessage[] {
    return getItem<CoachChatMessage[]>(KEYS.CHAT, DEFAULT_MESSAGES);
  },

  sendMessage(text: string, sender: 'coach' | 'athlete' = 'athlete'): CoachChatMessage {
    const messages = this.getMessages();
    const newMsg: CoachChatMessage = {
      id: `msg_${Date.now()}`,
      sender,
      senderName: sender === 'athlete' ? 'Alex Morgan' : 'GRIT AI Performance Coach',
      messageText: text,
      sentAt: new Date().toISOString(),
      isRead: sender === 'athlete' ? true : false
    };
    setItem(KEYS.CHAT, [...messages, newMsg]);
    return newMsg;
  },

  // WEEKLY CHECK-INS
  getCheckIns(): WeeklyCheckInSubmission[] {
    return getItem<WeeklyCheckInSubmission[]>(KEYS.CHECKINS, []);
  },

  submitCheckIn(checkIn: Omit<WeeklyCheckInSubmission, 'id' | 'submittedAt' | 'status'>): WeeklyCheckInSubmission {
    const checkins = this.getCheckIns();
    const newCheckIn: WeeklyCheckInSubmission = {
      ...checkIn,
      id: `chk_${Date.now()}`,
      submittedAt: new Date().toISOString(),
      status: 'reviewed', // Automatically reviewed by AI immediately
      coachReviewedAt: new Date().toISOString(),
      coachFeedback: `AI Coach Assessment: Weekly adherence (${checkIn.weeklyAdherenceRate}%) and sleep (${checkIn.averageSleepHours} hrs) are within target parameters. Volume holds steady for next week with focus on grip strength endurance.`
    };
    setItem(KEYS.CHECKINS, [newCheckIn, ...checkins]);

    // Also trigger automated weekly review
    const autoReview = generateAutonomousWeeklyReview(
      Math.round((checkIn.weeklyAdherenceRate / 100) * 5),
      5,
      36800,
      18.5,
      2,
      ['Active Dead Hang (115s)', 'Farmer Carry (70 lbs/hand)'],
      7.2,
      checkins.length + 1
    );
    this.saveWeeklyReview(autoReview);

    return newCheckIn;
  },

  // NUTRITION USER SETTINGS (OPTIONAL CONTROL)
  getNutritionSettings(): NutritionUserSettings {
    return getItem<NutritionUserSettings>(KEYS.NUTRITION_SETTINGS, DEFAULT_NUTRITION_SETTINGS);
  },

  saveNutritionSettings(settings: Partial<NutritionUserSettings>): NutritionUserSettings {
    const current = this.getNutritionSettings();
    const updated: NutritionUserSettings = {
      ...current,
      ...settings
    };
    setItem(KEYS.NUTRITION_SETTINGS, updated);
    return updated;
  },

  toggleNutrition(enabled?: boolean): boolean {
    const current = this.getNutritionSettings();
    const newEnabled = enabled !== undefined ? enabled : !current.isEnabled;
    this.saveNutritionSettings({ isEnabled: newEnabled });
    return newEnabled;
  },

  // SWEAT RATE TESTS HISTORY
  getSweatRateTests(): SweatRateTestRecord[] {
    return getItem<SweatRateTestRecord[]>(KEYS.SWEAT_RATE_TESTS, DEFAULT_SWEAT_TESTS);
  },

  saveSweatRateTest(test: Omit<SweatRateTestRecord, 'id'>): SweatRateTestRecord {
    const tests = this.getSweatRateTests();
    const newRecord: SweatRateTestRecord = {
      ...test,
      id: `swt_${Date.now()}`
    };
    const updated = [newRecord, ...tests];
    setItem(KEYS.SWEAT_RATE_TESTS, updated);

    this.saveNutritionSettings({ sweatRateLph: test.sweatRateLph });
    return newRecord;
  },

  // NUTRITION & WATER DAILY LOG
  getTodayNutrition(): DailyNutritionLog {
    const today = new Date().toISOString().split('T')[0];
    const logs = getItem<Record<string, DailyNutritionLog>>(KEYS.NUTRITION, {});
    if (logs[today]) return logs[today];

    const defaultLog: DailyNutritionLog = {
      date: today,
      targetCalories: 2650,
      targetProteinGrams: 165,
      targetCarbsGrams: 320,
      targetFatGrams: 65,
      targetWaterOunces: 120,
      consumedCalories: 1840,
      consumedProteinGrams: 128,
      consumedCarbsGrams: 215,
      consumedFatGrams: 48,
      consumedWaterOunces: 88,
      preWorkoutFuelHit: true,
      postWorkoutFuelHit: false,
      hydrationTargetHit: false,
      proteinTargetHit: false,
      demandLevel: 'high'
    };
    logs[today] = defaultLog;
    setItem(KEYS.NUTRITION, logs);
    return defaultLog;
  },

  updateNutrition(updates: Partial<DailyNutritionLog>): DailyNutritionLog {
    const today = new Date().toISOString().split('T')[0];
    const logs = getItem<Record<string, DailyNutritionLog>>(KEYS.NUTRITION, {});
    const current = this.getTodayNutrition();
    const updated = { ...current, ...updates };
    logs[today] = updated;
    setItem(KEYS.NUTRITION, logs);
    return updated;
  },

  // WEARABLES & BIOMETRICS
  getWearableSync(): WearableSyncData {
    return getItem<WearableSyncData>(KEYS.WEARABLE, DEFAULT_WEARABLE);
  },

  syncWearableData(provider: 'apple_health' | 'garmin' | 'whoop' = 'apple_health'): WearableSyncData {
    const data: WearableSyncData = {
      isConnected: true,
      provider,
      lastSyncedAt: new Date().toISOString(),
      restingHeartRate: 50 + Math.floor(Math.random() * 4),
      activeCaloriesBurned: 620 + Math.floor(Math.random() * 120),
      sleepHours: 7.5 + parseFloat((Math.random() * 0.8).toFixed(1)),
      sleepQualityScore: 82 + Math.floor(Math.random() * 10),
      hrvMilliseconds: 60 + Math.floor(Math.random() * 12),
      stepCount: 11500 + Math.floor(Math.random() * 3000)
    };
    setItem(KEYS.WEARABLE, data);
    return data;
  },

  // BODY WEIGHT & COMPOSITION TRENDS
  getWeightHistory(): { date: string; weightLbs: number }[] {
    return getItem<{ date: string; weightLbs: number }[]>(KEYS.BODY_WEIGHT_HISTORY, DEFAULT_WEIGHT_HISTORY);
  },

  logWeight(weightLbs: number): void {
    const history = this.getWeightHistory();
    const today = new Date().toISOString().split('T')[0];
    const updated = [...history.filter(h => h.date !== today), { date: today, weightLbs }];
    updated.sort((a, b) => a.date.localeCompare(b.date));
    setItem(KEYS.BODY_WEIGHT_HISTORY, updated);
  }
};
