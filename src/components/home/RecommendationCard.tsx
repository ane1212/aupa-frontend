interface RecommendationCardProps {
  title: string;
  distance: string;
  score: number;
}

const RecommendationCard = ({ title, distance, score }: RecommendationCardProps) => (
  <article className="recommendation-card">
    <h3>{title}</h3>
    <div>
      <span>{distance}</span>
      <p>
        <strong>{score}</strong>
        Local Score
      </p>
    </div>
  </article>
);

export default RecommendationCard;
