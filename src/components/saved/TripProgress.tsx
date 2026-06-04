interface TripProgressProps {
    completedCount: number;
    total: number;
    pct: number;
}

const TripProgress = ({ completedCount, total, pct }: TripProgressProps) => (
    <div className="sv-progress-card">
        <p className="sv-progress-title">Your Trip Progress</p>
        <p className="sv-progress-sub">{completedCount} of {total} completed</p>
        <div className="sv-progress-row">
            <div className="sv-progress-track">
                <div className="sv-progress-fill" style={{ width: `${pct}%` }} />
            </div>
            <span className="sv-progress-pct">{pct}%</span>
        </div>
    </div>
);

export default TripProgress;
