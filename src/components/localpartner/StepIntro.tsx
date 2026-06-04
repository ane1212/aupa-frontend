import { benefits } from './data';
import PartnerLayout from './PartnerLayout';

interface StepIntroProps {
    onNext: () => void;
    onBack: () => void;
}

const StepIntro = ({ onNext, onBack }: StepIntroProps) => (
    <PartnerLayout onBack={onBack} onNext={onNext}>
        <h1 className="lp-title">Why become a Local Partner?</h1>
        <p className="lp-subtitle">Join Aupa Partners and unlock tools to grow your business.</p>

        <ul className="lp-benefits">
            {benefits.map(({ icon: Icon, title, description }) => (
                <li key={title} className="lp-benefit">
                    <div className="lp-benefit-icon">
                        <Icon size={22} color="#000" />
                    </div>
                    <div className="lp-benefit-text">
                        <strong>{title}</strong>
                        <span>{description}</span>
                    </div>
                </li>
            ))}
        </ul>
    </PartnerLayout>
);

export default StepIntro;
