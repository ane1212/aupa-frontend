interface LocalPickCardProps {
  name: string;
  category: string;
  distance: string;
}

const LocalPickCard = ({ name, category, distance }: LocalPickCardProps) => (
  <article className="local-pick-card">
    <div className="local-pick-image" aria-hidden="true" />
    <h3>{name}</h3>
    <p>
      {category} · {distance}
    </p>
  </article>
);

export default LocalPickCard;
