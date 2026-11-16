import React from 'react';
import { ArtistConfig } from '../types/artist';
import { Calendar, MapPin, ArrowRight, Ticket } from 'lucide-react';

interface LiveTabProps {
  config: ArtistConfig;
}

export const LiveTab: React.FC<LiveTabProps> = ({ config }) => {
  const events = config.tabs.live.events || [];
  const hasEvents = events.length > 0;

  return (
    <div className="py-16 sm:py-28 animate-in fade-in duration-500 bg-black text-white min-h-[70vh] flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 space-y-10">
        
        <div className="text-left sm:text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 block">
            / TOUR & LIVE SHOWS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-sans">
            UPCOMING SHOWS
          </h2>
        </div>

        {hasEvents ? (
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 sm:p-8 bg-zinc-900/40 border border-white/15 hover:border-white/50 transition-all duration-300 gap-6"
              >
                {/* Date Column */}
                <div className="space-y-1 min-w-[150px]">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-300 font-bold">
                    <Calendar className="w-4 h-4 text-zinc-400" />
                    <span>{event.date}</span>
                  </div>
                  {event.doors && (
                    <span className="text-[11px] font-mono text-zinc-500 block pl-6">
                      Doors {event.doors}
                    </span>
                  )}
                </div>

                {/* Venue & Lineup Column */}
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-zinc-400 shrink-0" />
                    <h3 className="text-lg sm:text-xl font-black uppercase text-white tracking-wide">
                      {event.venue} — <span className="text-zinc-400 font-medium">{event.city}</span>
                    </h3>
                  </div>
                  {event.lineup && (
                    <p className="text-xs text-zinc-400 tracking-wider">
                      {event.lineup}
                    </p>
                  )}
                </div>

                {/* Action CTA */}
                <div className="w-full sm:w-auto">
                  <a
                    href={event.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-3 px-6 py-3.5 bg-white text-black font-black text-xs uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all shadow-xl active:scale-95 group-hover:scale-105"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>GET TICKETS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 bg-zinc-900/40 border border-white/15 space-y-6 flex flex-col items-center justify-center text-center">
            <Calendar className="w-12 h-12 text-zinc-400" />
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-sans">
              SHOWS COMING SOON
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 tracking-wider max-w-md">
              Follow on social platforms or check back soon for upcoming tour dates and live performance announcements.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
