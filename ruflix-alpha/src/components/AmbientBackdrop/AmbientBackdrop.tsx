type AmbientBackdropProps = {
  imageUrl?: string;
};

export function AmbientBackdrop({ imageUrl }: AmbientBackdropProps) {
  return (
    <div className="ambient-backdrop" aria-hidden="true">
      {imageUrl ? (
        <div
          className="ambient-backdrop__image"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      ) : null}
    </div>
  );
}