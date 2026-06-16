"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Play, X } from "lucide-react";

interface Video {
  title: string;
  id: string;
}

function VideoModal({
  video,
  onClose,
}: {
  video: Video;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus trap
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;
    const focusable = modal.querySelectorAll<HTMLElement>(
      'button, iframe, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length > 0) focusable[0].focus();

    function trapFocus(e: KeyboardEvent) {
      if (e.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    modal.addEventListener("keydown", trapFocus);
    return () => modal.removeEventListener("keydown", trapFocus);
  }, []);

  // Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return createPortal(
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Now playing: ${video.title}`}
      className="fixed inset-0 flex items-center justify-center bg-blush/85 p-4 md:p-8"
      style={{ zIndex: 99999 }}
      onClick={onClose}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-5 right-5 text-suede hover:text-black transition-colors cursor-pointer p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
        style={{ zIndex: 100000 }}
        aria-label="Close video"
      >
        <X size={32} aria-hidden="true" />
      </button>

      <div
        className="w-full max-w-7xl aspect-video"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
          title={video.title}
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </div>,
    document.body
  );
}

export default function VideoGrid({ videos }: { videos: Video[] }) {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const closeModal = useCallback(() => {
    setActiveVideo(null);
    triggerRef.current?.focus();
  }, []);

  return (
    <>
      <div className="mx-auto max-w-[1150px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {videos.map((video) => (
          <button
            key={video.id}
            ref={(el) => {
              if (activeVideo?.id === video.id) triggerRef.current = el;
            }}
            onClick={() => setActiveVideo(video)}
            aria-label={`Play video: ${video.title}`}
            className="group block text-left cursor-pointer"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                alt={`Thumbnail for ${video.title}`}
                width={480}
                height={360}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                unoptimized
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40 px-4">
                <Play size={40} className="text-ivory/90 group-hover:text-ivory transition-colors mb-3" fill="currentColor" aria-hidden="true" />
                <p className="text-ivory text-sm uppercase tracking-wide text-center leading-snug">
                  {video.title}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {activeVideo && (
        <VideoModal video={activeVideo} onClose={closeModal} />
      )}
    </>
  );
}
