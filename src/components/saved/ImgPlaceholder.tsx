const ImgPlaceholder = ({ small = false }: { small?: boolean }) => (
    <div className={`sv-img-placeholder${small ? ' small' : ''}`} aria-hidden="true" />
);

export default ImgPlaceholder;
