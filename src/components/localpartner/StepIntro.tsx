import { LayoutList, Megaphone, BarChart3 } from 'lucide-react';
import PartnerLayout from './PartnerLayout';
import type { AppCopy } from '../../i18n/copy';

interface StepIntroProps {
    onNext: () => void;
    onBack: () => void;
    lp: AppCopy['localPartner'];
}

const StepIntro = ({ onNext, onBack, lp }: StepIntroProps) => {
    const benefits = [
        { Icon: LayoutList, title: lp.benefit1Title, desc: lp.benefit1Desc },
        { Icon: Megaphone, title: lp.benefit2Title, desc: lp.benefit2Desc },
        { Icon: BarChart3, title: lp.benefit3Title, desc: lp.benefit3Desc },
    ];
    return (
    <PartnerLayout onBack={onBack} onNext={onNext} btnLabel={lp.continue}>
        <h1 className="lp-title">{lp.introTitle}</h1>
        <p className="lp-subtitle">{lp.introSubtitle}</p>

        <ul className="lp-benefits">
            {benefits.map(({ Icon, title, desc }) => (
                <li key={title} className="lp-benefit">
                    <div className="lp-benefit-icon">
                        <Icon size={22} color="#000" />
                    </div>
                    <div className="lp-benefit-text">
                        <strong>{title}</strong>
                        <span>{desc}</span>
                    </div>
                </li>
            ))}
        </ul>
    </PartnerLayout>
    );
};

export default StepIntro;
