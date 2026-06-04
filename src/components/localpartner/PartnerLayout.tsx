import { ChevronLeft } from 'lucide-react';
import footer from '../../assets/redfooter.png';

interface PartnerLayoutProps {
    onBack: () => void;
    onNext: () => void;
    btnLabel?: string;
    disabled?: boolean;
    showCityFooter?: boolean;
    children: React.ReactNode;
}

const PartnerLayout = ({
    onBack,
    onNext,
    btnLabel = 'Continue',
    disabled = false,
    showCityFooter = true,
    children,
}: PartnerLayoutProps) => (
    <div className="lp-page">
        <div className="lp-scroll">
            <div className="lp-header">
                <button className="lp-back-btn" onClick={onBack} aria-label="Volver">
                    <ChevronLeft size={22} />
                </button>
            </div>
            {children}
        </div>

        <div className="lp-bottom">
            <button className="lp-btn" onClick={onNext} disabled={disabled}>
                {btnLabel}
            </button>
        </div>

        {showCityFooter && (
            <img className="footer" src={footer} alt="" aria-hidden="true" />
        )}
    </div>
);

export default PartnerLayout;
