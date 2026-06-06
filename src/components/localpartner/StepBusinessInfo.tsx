import type { PartnerFormData } from './types';
import PartnerLayout from './PartnerLayout';
import type { AppCopy } from '../../i18n/copy';

interface StepBusinessInfoProps {
    data: Pick<PartnerFormData, 'businessName' | 'address' | 'phone' | 'website' | 'description'>;
    onChange: (field: keyof PartnerFormData) => (value: string) => void;
    onNext: () => void;
    onBack: () => void;
    disabled?: boolean;
    lp: AppCopy['localPartner'];
}

const StepBusinessInfo = ({ data, onChange, onNext, onBack, disabled, lp }: StepBusinessInfoProps) => {
    const fields: { key: keyof PartnerFormData; label: string; placeholder: string; multiline?: boolean }[] = [
        { key: 'businessName', label: lp.fieldName, placeholder: lp.fieldNamePlaceholder },
        { key: 'address', label: lp.fieldAddress, placeholder: lp.fieldAddressPlaceholder },
        { key: 'phone', label: lp.fieldPhone, placeholder: lp.fieldPhonePlaceholder },
        { key: 'website', label: lp.fieldWebsite, placeholder: lp.fieldWebsitePlaceholder },
        { key: 'description', label: lp.fieldDesc, placeholder: lp.fieldDescPlaceholder, multiline: true },
    ];
    return (
    <PartnerLayout onBack={onBack} onNext={onNext} disabled={disabled} btnLabel={lp.continue}>
        <h1 className="lp-title">{lp.infoTitle}</h1>
        <p className="lp-subtitle">{lp.infoSubtitle}</p>

        <div className="lp-form">
            {fields.map(({ key, label, placeholder, multiline }) => (
                <div key={key} className="lp-field">
                    <label className="lp-label">
                        {label} <span className="lp-required">*</span>
                    </label>
                    {multiline ? (
                        <textarea
                            className="lp-textarea"
                            placeholder={placeholder}
                            value={data[key as keyof typeof data]}
                            onChange={e => onChange(key)(e.target.value)}
                        />
                    ) : (
                        <input
                            className="lp-input"
                            type="text"
                            placeholder={placeholder}
                            value={data[key as keyof typeof data]}
                            onChange={e => onChange(key)(e.target.value)}
                        />
                    )}
                </div>
            ))}
        </div>
    </PartnerLayout>
    );
};

export default StepBusinessInfo;
