import { Check } from 'lucide-react';
import type { AppCopy } from '../../i18n/copy';

interface StepSuccessProps {
    onDone: () => void;
    lp: AppCopy['localPartner'];
}

const StepSuccess = ({ onDone, lp }: StepSuccessProps) => (
    <div className="lp-page">
        <div className="lp-success">
            <div className="lp-success-icon-wrap">
                <div className="lp-confetti" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                </div>
                <div className="lp-success-check">
                    <Check size={44} strokeWidth={2.5} />
                </div>
            </div>

            <h1 className="lp-success-title">{lp.successTitle}</h1>
            <p className="lp-success-desc">{lp.successDesc1}</p>
            <p className="lp-success-desc">{lp.successDesc2}</p>
        </div>

        <div className="lp-bottom lp-bottom--success">
            <button className="lp-btn" onClick={onDone}>
                {lp.successBackHome}
            </button>
        </div>
    </div>
);

export default StepSuccess;
