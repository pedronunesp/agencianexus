import { useState } from "react";
import { Play, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";

interface MediaRendererProps {
  mediaUrl: string;
  mediaType: 'image' | 'video';
  videoUrl?: string;
  title: string;
  className?: string;
}

const getVideoEmbedUrl = (url: string) => {
  // YouTube
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const videoId = url.includes('youtu.be') 
      ? url.split('youtu.be/')[1]?.split('?')[0]
      : url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  
  // Google Drive
  if (url.includes('drive.google.com')) {
    const fileId = url.split('/d/')[1]?.split('/')[0];
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
  
  // Vimeo
  if (url.includes('vimeo.com')) {
    const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
    return `https://player.vimeo.com/video/${videoId}`;
  }
  
  // Default - assume direct video URL
  return url;
};

export default function MediaRenderer({ 
  mediaUrl, 
  mediaType, 
  videoUrl, 
  title, 
  className = "" 
}: MediaRendererProps) {
  const [showVideo, setShowVideo] = useState(false);
  
  if (mediaType === 'video' && videoUrl) {
    const embedUrl = getVideoEmbedUrl(videoUrl);
    
    return (
      <div className={`relative ${className}`}>
        {!showVideo ? (
          <div className="relative group cursor-pointer" onClick={() => setShowVideo(true)}>
            <img
              src={mediaUrl}
              alt={title}
              className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
            />
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
              src={embedUrl}
              className="w-full aspect-video rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button
              onClick={() => setShowVideo(false)}
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