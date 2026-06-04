import { useRef } from 'react';
import { Upload } from 'lucide-react';
import PartnerLayout from './PartnerLayout';

interface StepVerifyProps {
    files: File[];
    onFilesChange: (files: File[]) => void;
    onNext: () => void;
    onBack: () => void;
    disabled?: boolean;
}

const StepVerify = ({ files, onFilesChange, onNext, onBack, disabled }: StepVerifyProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            onFilesChange([...files, ...Array.from(e.target.files)]);
        }
    };

    return (
        <PartnerLayout onBack={onBack} onNext={onNext} disabled={disabled}>
            <h1 className="lp-title">Verify your business</h1>
            <p className="lp-subtitle">
                Help us verify that you are the owner or representative of this business.
            </p>

            <p className="lp-upload-label">Upload proof of ownership</p>
            <div className="lp-upload-boxes">
                {[0, 1].map(i => (
                    <div
                        key={i}
                        className="lp-upload-box"
                        onClick={() => inputRef.current?.click()}
                        role="button"
                        tabIndex={0}
                        aria-label="Subir archivo"
                        onKeyDown={e => e.key === 'Enter' && inputRef.current?.click()}
                    >
                        {files[i]
                            ? <span className="lp-upload-filename">{files[i].name}</span>
                            : <Upload size={20} />
                        }
                    </div>
                ))}
            </div>
            <input
                ref={inputRef}
                type="file"
                accept="image/*,.pdf"
                multiple
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />

            <p className="lp-review-note">
                Your application will be reviewed within 2-3 business days.
            </p>
        </PartnerLayout>
    );
};

export default StepVerify;
