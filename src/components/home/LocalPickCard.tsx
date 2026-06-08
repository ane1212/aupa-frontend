
interface LocalPickCardProps {
  name: string;
  category: string;
  distance: string;
  image?: string;
}

export const LocalPickCard = ({ name, category, distance, image }: LocalPickCardProps) => {
  return (
    <div className="local-pick-card">
      {image && (
        <img className="local-pick-image" src={image} alt={name} />
      )}
      <h3>{name}</h3>
      <p>{category}</p>
      <span>{distance}</span>
    </div>
  );
};