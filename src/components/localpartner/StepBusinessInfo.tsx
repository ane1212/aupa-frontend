import type { PartnerFormData } from './types';
import PartnerLayout from './PartnerLayout';

interface StepBusinessInfoProps {
    data: Pick<PartnerFormData, 'businessName' | 'address' | 'phone' | 'website' | 'description'>;
    onChange: (field: keyof PartnerFormData) => (value: string) => void;
    onNext: () => void;
    onBack: () => void;
    disabled?: boolean;
}

const fields: { key: keyof PartnerFormData; label: string; placeholder: string; multiline?: boolean }[] = [
    { key: 'businessName', label: 'Business name', placeholder: 'Bar El Globo' },
    { key: 'address', label: 'Address', placeholder: 'Casco Viejo, Bilbao' },
    { key: 'phone', label: 'Phone number', placeholder: '+ 34 600 968 685' },
    { key: 'website', label: 'Website', placeholder: 'www.barelglobo.com' },
    { key: 'description', label: 'Short description', placeholder: 'Describe your business…', multiline: true },
];

const StepBusinessInfo = ({ data, onChange, onNext, onBack, disabled }: StepBusinessInfoProps) => (
    <PartnerLayout onBack={onBack} onNext={onNext} disabled={disabled}>
        <h1 className="lp-title">Tell us about your business</h1>
        <p className="lp-subtitle">This information will appear on your partner profile.</p>

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

export default StepBusinessInfo;
