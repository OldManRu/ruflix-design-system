import "./VideoPlayer.css";

type VideoPlayerProps = {
  src: string;
  title: string;
  onClose: () => void;
};

export function VideoPlayer({ src, title, onClose }: VideoPlayerProps) {
  console.log("Video src:", src);

  return (
    <div className="video-overlay">
      <button onClick={onClose}>✕</button>

      <video
        className="video-player"
        src={src}
        controls
        autoPlay
      />

      <div className="video-title">{title}</div>
    </div>
  );
}