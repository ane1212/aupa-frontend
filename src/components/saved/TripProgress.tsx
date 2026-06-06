interface TripProgressProps {
    completedCount: number;
    total: number;
    pct: number;
    title: string;
    completedTemplate: string;
}

const TripProgress = ({ completedCount, total, pct, title, completedTemplate }: TripProgressProps) => (
    <div className="sv-progress-card">
        <p className="sv-progress-title">{title}</p>
        <p className="sv-progress-sub">{completedTemplate.replace('{count}', String(completedCount)).replace('{total}', String(total))}</p>
        <div className="sv-progress-row">
            <div className="sv-progress-track">
                <div className="sv-progress-fill" style={{ width: `${pct}%` }} />
            </div>
            <span className="sv-progress-pct">{pct}%</span>
        </div>
    </div>
);

export default TripProgress;
