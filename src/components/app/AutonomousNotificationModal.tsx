'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Bell, 
  Sparkles, 
  Trophy, 
  AlertTriangle, 
  Calendar, 
  Check, 
  Trash2, 
  ExternalLink,
  Zap,
  Activity
} from 'lucide-react';
import { athleteStorage } from '@/services/storage/athleteStorageService';
import { AutonomousNotification } from '@/services/trainingEngine/aiCoachEngineService';

interface AutonomousNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWeeklyReview?: () => void;
  onOpenLiveWorkout?: () => void;
  onOpenPrs?: () => void;
}

export default function AutonomousNotificationModal({
  isOpen,
  onClose,
  onOpenWeeklyReview,
  onOpenLiveWorkout,
  onOpenPrs
}: AutonomousNotificationModalProps) {
  const [notifications, setNotifications] = useState<AutonomousNotification[]>([]);
  const [filter, setFilter] = useState<'all' | 'ai' | 'pr' | 'alert'>('all');

  useEffect(() => {
    if (isOpen) {
      setNotifications(athleteStorage.getNotifications());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleMarkRead = (id: string) => {
    athleteStorage.markNotificationRead(id);
    setNotifications(athleteStorage.getNotifications());
  };

  const handleClearAll = () => {
    athleteStorage.clearNotifications();
    setNotifications([]);
  };

  const filtered = notifications.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'ai') return n.badgeType === 'ai';
    if (filter === 'pr') return n.badgeType === 'pr';
    if (filter === 'alert') return n.badgeType === 'alert' || n.badgeType === 'event';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0e1017] border-l-2 border-[#ff5500] h-full shadow-2xl flex flex-col">
        
        {/* HEADER */}
        <div className="p-4 bg-[#121520] border-b border-[#242838] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-sm bg-[#ff5500] flex items-center justify-center text-black font-black">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-black text-white uppercase font-sans">
                  Autonomous Notifications
                </h3>
                {unreadCount > 0 && (
                  <span className="px-1.5 py-0.2 bg-[#ff5500] text-black text-[9px] font-mono font-black rounded-sm">
                    {unreadCount} NEW
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#9ca3af] font-mono">
                Real-time AI adaptations, PRs & program events
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {notifications.length > 0 && (
              <button
                onClick={handleClearAll}
                className="p-1.5 text-[#9ca3af] hover:text-[#ff4444] rounded-sm transition"
                title="Clear All Notifications"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-[#9ca3af] hover:text-white rounded-sm transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="p-2.5 bg-[#0a0c10] border-b border-[#1c202d] flex items-center gap-1.5 text-[10px] font-mono shrink-0">
          {(['all', 'ai', 'pr', 'alert'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2.5 py-1 rounded-sm uppercase transition cursor-pointer ${
                filter === f
                  ? 'bg-[#ff5500] text-black font-black'
                  : 'bg-[#141724] text-[#9ca3af] hover:text-white'
              }`}
            >
              {f === 'all' ? 'All Alerts' : f === 'ai' ? 'AI Engine' : f === 'pr' ? 'PR Trophies' : 'Race / Safety'}
            </button>
          ))}
        </div>

        {/* NOTIFICATION STREAM */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5 text-xs">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-[#6b7280] font-mono space-y-2">
              <Bell className="w-8 h-8 mx-auto opacity-40" />
              <p>No new autonomous notifications.</p>
            </div>
          ) : (
            filtered.map((item) => {
              const isAi = item.badgeType === 'ai';
              const isPr = item.badgeType === 'pr';

              return (
                <div
                  key={item.id}
                  onClick={() => handleMarkRead(item.id)}
                  className={`p-3.5 rounded-sm border transition-all cursor-pointer ${
                    item.isRead
                      ? 'bg-[#0d1017] border-[#1d2332] opacity-75'
                      : 'bg-[#131724] border-[#29344c] shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-xs flex items-center justify-center ${
                        isAi 
                          ? 'bg-[#00e5ff]/20 text-[#00e5ff]' 
                          : isPr 
                            ? 'bg-[#ffaa00]/20 text-[#ffaa00]' 
                            : 'bg-[#ff5500]/20 text-[#ff5500]'
                      }`}>
                        {isAi ? <Sparkles className="w-3.5 h-3.5" /> : isPr ? <Trophy className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                      </div>
                      <span className="font-bold text-white text-xs">{item.title}</span>
                    </div>
                    <span className="text-[9px] font-mono text-[#6b7280] shrink-0">{item.timestamp}</span>
                  </div>

                  <p className="text-[11px] text-[#cbd5e1] leading-relaxed mt-2">
                    {item.message}
                  </p>

                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-[#1b2130]">
                    <span className="text-[9px] font-mono text-[#00e5ff] uppercase font-bold">
                      {item.type.replace('_', ' ')}
                    </span>

                    {item.type === 'weekly_review' && onOpenWeeklyReview && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onClose();
                          onOpenWeeklyReview();
                        }}
                        className="text-[10px] font-mono text-[#ccff00] hover:underline flex items-center gap-1 font-bold"
                      >
                        Inspect Review <ExternalLink className="w-3 h-3" />
                      </button>
                    )}

                    {item.type === 'pr_achievement' && onOpenPrs && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onClose();
                          onOpenPrs();
                        }}
                        className="text-[10px] font-mono text-[#ffaa00] hover:underline flex items-center gap-1 font-bold"
                      >
                        View Trophy Room <ExternalLink className="w-3 h-3" />
                      </button>
                    )}

                    {item.type === 'auto_adaptation' && onOpenLiveWorkout && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onClose();
                          onOpenLiveWorkout();
                        }}
                        className="text-[10px] font-mono text-[#00e5ff] hover:underline flex items-center gap-1 font-bold"
                      >
                        View Workout <ExternalLink className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}
