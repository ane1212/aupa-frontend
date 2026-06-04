interface Props {
    className: string;
}

const PlaceholderImage = ({ className }: Props) => (
    <div className={className} aria-hidden="true" />
);

export default PlaceholderImage;
