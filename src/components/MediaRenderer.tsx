import { useState } from "react";
import { Play, ExternalLink } from "lucide-react";

interface MediaRendererProps {
  mediaUrl: string;
  videoUrl?: string;
  title: string;
  className?: string;
  showPreview?: boolean;
}

const isVideoUrl = (url: string) => {
  return url.includes('youtube.com') || 
         url.includes('youtu.be') || 
         url.includes('vimeo.com') || 
         url.includes('drive.google.com') ||
         url.includes('.mp4') ||
         url.includes('.webm') ||
         url.includes('.mov');
};

const getVideoEmbedUrl = (url: string, autoplay = false, muted = true) => {
  // YouTube
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const videoId = url.includes('youtu.be') 
      ? url.split('youtu.be/')[1]?.split('?')[0]
      : url.split('v=')[1]?.split('&')[0];
    const params = new URLSearchParams({
      autoplay: autoplay ? '1' : '0',
      mute: muted ? '1' : '0',
      controls: '0',
      loop: '1',
      playlist: videoId || ''
    });
    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  }
  
  // Vimeo
  if (url.includes('vimeo.com')) {
    const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
    const params = new URLSearchParams({
      autoplay: autoplay ? '1' : '0',
      muted: muted ? '1' : '0',
      loop: '1',
      controls: '0'
    });
    return `https://player.vimeo.com/video/${videoId}?${params.toString()}`;
  }
  
  // Google Drive (preview only, no autoplay control)
  if (url.includes('drive.google.com')) {
    const fileId = url.split('/d/')[1]?.split('/')[0];
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
  
  // Direct video URL
  return url;
};

const getThumbnailFromVideo = (url: string) => {
  // YouTube thumbnail
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const videoId = url.includes('youtu.be') 
      ? url.split('youtu.be/')[1]?.split('?')[0]
      : url.split('v=')[1]?.split('&')[0];
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }
  
  // For other video sources, return the provided thumbnail
  return null;
};

export default function MediaRenderer({ 
  mediaUrl, 
  videoUrl, 
  title, 
  className = "",
  showPreview = false 
}: MediaRendererProps) {
  const [showFullVideo, setShowFullVideo] = useState(false);
  
  // Determine if this is a video based on URLs
  const isVideo = videoUrl && isVideoUrl(videoUrl);
  const thumbnailUrl = isVideo ? (getThumbnailFromVideo(videoUrl) || mediaUrl) : mediaUrl;
  
  if (isVideo) {
    return (
      <div className={`relative ${className}`}>
        {!showFullVideo ? (
          <div className="relative group cursor-pointer" onClick={() => setShowFullVideo(true)}>
            {showPreview ? (
              // Show muted autoplay preview
              <iframe
                src={getVideoEmbedUrl(videoUrl, true, true)}
                className="w-full h-full object-cover rounded-lg pointer-events-none"
                allow="autoplay; encrypted-media"
                style={{ border: 'none' }}
              />
            ) : (
              // Show thumbnail image
              <img
                src={thumbnailUrl}
                alt={title}
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
            )}
            
            <div className="absolute inset-0 bg-dark-bg/40 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-neon-green text-dark-bg p-3 rounded-full">
                <Play className="w-6 h-6 fill-current" />
              </div>
            </div>
            
            <div className="absolute top-2 right-2 bg-neon-green/20 text-neon-green px-2 py-1 rounded text-xs font-bold">
              VÍDEO
            </div>
          </div>
        ) : (
          <div className="relative">
            <iframe
              src={getVideoEmbedUrl(videoUrl, true, false)}
              className="w-full aspect-video rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button
              onClick={() => setShowFullVideo(false)}
              className="absolute top-2 right-2 bg-dark-bg/80 text-neon-green p-2 rounded-full hover:bg-dark-bg"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    );
  }
  
  return (
    <img
      src={mediaUrl}
      alt={title}
      className={`w-full h-full object-cover rounded-lg ${className}`}
    />
  );
}