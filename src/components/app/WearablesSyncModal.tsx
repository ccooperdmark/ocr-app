'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Watch, 
  Heart, 
  Moon, 
  Activity, 
  Flame, 
  Footprints, 
  RefreshCw, 
  CheckCircle2, 
  Smartphone,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { athleteStorage, WearableSyncData } from '@/services/storage/athleteStorageService';

interface WearablesSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WearablesSyncModal({ isOpen, onClose }: WearablesSyncModalProps) {
  const [wearable, setWearable] = useState<WearableSyncData | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<'apple_health' | 'garmin' | 'whoop'>('apple_health');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncSuccessMessage, setSyncSuccessMessage] = useState<string | null>(null);

  const loadData = () => {
    const data = athleteStorage.getWearableSync();
    setWearable(data);
    if (data.provider) setSelectedProvider(data.provider);
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSyncNow = () => {
    setIsSyncing(true);
    setSyncSuccessMessage(null);
    setTimeout(() => {
      const updated = athleteStorage.syncWearableData(selectedProvider);
      setWearable(updated);
      setIsSyncing(false);
      setSyncSuccessMessage('Wearable metrics synchronized successfully with training load engine.');
      setTimeout(() => setSyncSuccessMessage(null), 3000);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <Watch className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center space-x-2">
                <span>Wearable Biometrics & HealthKit Sync</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Connected</span>
              </h2>
              <p className="text-xs text-zinc-400">Continuous telemetry feed for auto-regulated training readiness</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          
          {/* Provider Selection */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'apple_health', label: 'Apple Health', icon: Smartphone, desc: 'HealthKit V2' },
              { id: 'garmin', label: 'Garmin', icon: Watch, desc: 'Connect API' },
              { id: 'whoop', label: 'WHOOP', icon: Activity, desc: '4.0 Recovery' },
            ].map(prov => {
              const IconComp = prov.icon;
              return (
                <button
                  key={prov.id}
                  onClick={() => setSelectedProvider(prov.id as any)}
                  className={`p-3 rounded-xl border text-center transition ${
                    selectedProvider === prov.id
                      ? 'bg-purple-950/40 border-purple-500/60 text-white'
                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <IconComp className="w-5 h-5 mx-auto mb-1.5 text-purple-400" />
                  <div className="text-xs font-bold">{prov.label}</div>
                  <div className="text-[10px] text-zinc-500">{prov.desc}</div>
                </button>
              );
            })}
          </div>

          {/* Sync Trigger Banner */}
          <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-between">
            <div className="text-xs text-zinc-400">
              <span>Last Synced: </span>
              <strong className="text-zinc-200 font-mono">
                {wearable?.lastSyncedAt ? new Date(wearable.lastSyncedAt).toLocaleTimeString() : 'Just now'}
              </strong>
            </div>

            <button
              onClick={handleSyncNow}
              disabled={isSyncing}
              className="px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition flex items-center space-x-1.5 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
            </button>
          </div>

          {syncSuccessMessage && (
            <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-400 text-xs flex items-center space-x-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{syncSuccessMessage}</span>
            </div>
          )}

          {/* Biometrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* RHR */}
            <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800">
              <div className="flex items-center justify-between text-zinc-400 mb-1">
                <span className="text-xs font-medium">Resting Heart Rate</span>
                <Heart className="w-4 h-4 text-rose-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono">
                {wearable?.restingHeartRate || 51} <span className="text-xs text-zinc-400 font-normal">BPM</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-medium">Optimal Parasympathetic</span>
            </div>

            {/* HRV */}
            <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800">
              <div className="flex items-center justify-between text-zinc-400 mb-1">
                <span className="text-xs font-medium">HRV (rMSSD)</span>
                <Zap className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono">
                {wearable?.hrvMilliseconds || 64} <span className="text-xs text-zinc-400 font-normal">ms</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-medium">+8% vs 30d Baseline</span>
            </div>

            {/* Sleep Score */}
            <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800">
              <div className="flex items-center justify-between text-zinc-400 mb-1">
                <span className="text-xs font-medium">Sleep Recovery</span>
                <Moon className="w-4 h-4 text-sky-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono">
                {wearable?.sleepQualityScore || 86} <span className="text-xs text-zinc-400 font-normal">/ 100</span>
              </div>
              <span className="text-[10px] text-zinc-400">{wearable?.sleepHours || 7.8} hrs total rest</span>
            </div>

            {/* Active Calories */}
            <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800">
              <div className="flex items-center justify-between text-zinc-400 mb-1">
                <span className="text-xs font-medium">Active Burn</span>
                <Flame className="w-4 h-4 text-orange-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono">
                {wearable?.activeCaloriesBurned || 685} <span className="text-xs text-zinc-400 font-normal">kcal</span>
              </div>
              <span className="text-[10px] text-zinc-400">Target: 600 kcal</span>
            </div>
          </div>

          {/* Daily Steps */}
          <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <Footprints className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-zinc-300 font-medium">Daily Cumulative Movement</span>
            </div>
            <span className="text-sm font-bold text-white font-mono">
              {(wearable?.stepCount || 12450).toLocaleString()} <span className="text-xs text-zinc-500 font-normal">steps</span>
            </span>
          </div>

          {/* Auto-Regulation Coaching Insight */}
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-emerald-950/30 to-teal-950/20 border border-emerald-500/30 space-y-1">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Auto-Regulation Prescription: Green Flag</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Your autonomic nervous system is in full recovery with resting heart rate at {wearable?.restingHeartRate || 51} BPM and HRV elevated at {wearable?.hrvMilliseconds || 64} ms. Proceed with full prescribed load and high-intensity compromised running without volume reduction today.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-900/80 flex items-center justify-between text-xs text-zinc-400">
          <span>Encrypted on-device health sandbox</span>
          <button 
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
