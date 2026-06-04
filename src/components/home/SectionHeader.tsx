interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
}

const SectionHeader = ({ title, actionLabel }: SectionHeaderProps) => (
  <div className="section-header">
    <h2>{title}</h2>
    {actionLabel ? <button type="button">{actionLabel}</button> : null}
  </div>
);

export default SectionHeader;
