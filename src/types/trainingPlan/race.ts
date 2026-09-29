export type RaceOrganization =
  | 'spartan'
  | 'tough_mudder'
  | 'savage_race'
  | 'rugged_maniac'
  | 'ocrwc'
  | 'custom';

export type RaceDistanceCategory = 
  | 'short'    // 3K - 6K (e.g. Spartan Sprint, Stadium, Rugged)
  | 'medium'   // 10K - 14K (e.g. Spartan Super, Tough Mudder Classic)
  | 'long'     // 20K - 25K (e.g. Spartan Beast)
  | 'ultra';   // 45K - 60K+ (e.g. Spartan Ultra, World's Toughest Mudder)

export type CompetitiveCategory =
  | 'open_fun'
  | 'age_group_competitive'
  | 'elite_pro'
  | 'podium_contender';

export type AthleteRaceGoal =
  | 'complete_first_ocr'
  | 'finish_comfortably'
  | 'complete_every_obstacle_zero_penalties'
  | 'improve_previous_time'
  | 'competitive_age_group_top_10'
  | 'elite_competition_podium'
  | 'ultra_endurance_completion';

export type TerrainType =
  | 'flat_grass_and_dirt'
  | 'rolling_trail_hills'
  | 'mud_trenches_and_swamps'
  | 'steep_technical_mountain'
  | 'rocky_scree_and_boulders'
  | 'stadium_stairs_and_concrete';

export interface RaceProfile {
  id: string;
  organization: RaceOrganization;
  name: string;
  date: string; // ISO date string YYYY-MM-DD
  weeksUntilRace: number;
  
  // Course Specifications
  distanceCategory: RaceDistanceCategory;
  distanceKm: number;
  expectedDurationMinutes: number;
  numberOfObstacles: number;
  featuredObstacleTypes: string[]; // ['multi_rig', 'olympus', 'rope_climb', 'heavy_sandbag', 'twister']
  
  elevationGainMeters: number;
  terrain: TerrainType;
  technicalDifficultyRating: number; // 1 to 5 scale
  carryRequirementLevel: 'none' | 'light' | 'standard' | 'extreme_mountain';

  // Environmental Demands
  expectedTemperatureCelsius: number;
  expectedHumidityPercent: number;
  altitudeMeters: number;
  isWaterSubmersionExpected: boolean;

  // Competitive Intent
  competitiveCategory: CompetitiveCategory;
  athleteGoal: AthleteRaceGoal;
}
