"use client";

import { useState, type KeyboardEvent } from "react";

type SongCardProps = {
  title: string;
  artist: string;
  embedUrl: string;
};

export default function SongCard({ title, artist, embedUrl }: SongCardProps) {
  const [loaded, setLoaded] = useState(false);

  const finalUrl = loaded
    ? `${embedUrl}${embedUrl.includes("?") ? "&" : "?"}autoplay=1`
    : embedUrl;

  function onKey(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setLoaded(true);
    }
  }

  return (
    <div className="song-card">
      <div className="song-card-inner">
        {loaded ? (
          <iframe
            src={finalUrl}
            title={`Listen to ${title} by ${artist}`}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <button
            type="button"
            className="song-embed-facade"
            aria-label={`Load and play ${title} by ${artist}`}
            onClick={() => setLoaded(true)}
            onKeyDown={onKey}
          >
            <span className="song-embed-facade-text">
              <span className="song-embed-facade-title">{title}</span>
              <span className="song-embed-facade-artist">{artist}</span>
            </span>
            <span className="song-embed-facade-play" aria-hidden="true">
              ▶
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
