import PlaceholderImage from './PlaceholderImage';

interface Props {
    label: string;
    bg: string;
    onClick?: () => void;
}

const VibeCard = ({ label, bg, onClick }: Props) => (
    <button className="exp-vibe-card" style={{ backgroundColor: bg }} onClick={onClick}>
        <PlaceholderImage className="exp-vibe-img" />
        <span className="exp-vibe-label">{label}</span>
    </button>
);

export default VibeCard;
