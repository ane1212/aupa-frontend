import { Check } from 'lucide-react';

interface StepSuccessProps {
    onDone: () => void;
}

const StepSuccess = ({ onDone }: StepSuccessProps) => (
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

            <h1 className="lp-success-title">Application Submitted</h1>
            <p className="lp-success-desc">
                Thank you for applying to become an Aupa! partner.
            </p>
            <p className="lp-success-desc">
                We will review your information and notify you once your account has been approved.
            </p>
        </div>

        <div className="lp-bottom lp-bottom--success">
            <button className="lp-btn" onClick={onDone}>
                Back to Home
            </button>
        </div>
    </div>
);

export default StepSuccess;
