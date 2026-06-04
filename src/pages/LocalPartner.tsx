import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    StepIntro, StepCategory, StepBusinessInfo, StepVerify, StepSuccess,
} from '../components/localpartner';
import type { PartnerFormData, PartnerStep } from '../components/localpartner';

const LocalPartner = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState<PartnerStep>(0);
    const [files, setFiles] = useState<File[]>([]);
    const [formData, setFormData] = useState<PartnerFormData>({
        category: '',
        customCategory: '',
        businessName: '',
        address: '',
        phone: '',
        website: '',
        description: '',
    });

    const update = (field: keyof PartnerFormData) => (value: string) =>
        setFormData(prev => ({ ...prev, [field]: value }));

    const next = () => setStep(s => (s + 1) as PartnerStep);
    const back = () => step === 0 ? navigate(-1) : setStep(s => (s - 1) as PartnerStep);

    const isValid: Record<PartnerStep, boolean> = {
        0: true,
        1: formData.category !== '' && (formData.category !== 'other' || formData.customCategory.trim() !== ''),
        2: ['businessName', 'address', 'phone', 'website', 'description'].every(
            f => formData[f as keyof PartnerFormData].trim() !== ''
        ),
        3: files.length > 0,
        4: true,
    };

    if (step === 0) return <StepIntro onNext={next} onBack={back} />;
    if (step === 1) return (
        <StepCategory
            value={formData.category}
            customValue={formData.customCategory}
            onChange={update('category')}
            onCustomChange={update('customCategory')}
            onNext={next}
            onBack={back}
            disabled={!isValid[1]}
        />
    );
    if (step === 2) return (
        <StepBusinessInfo
            data={formData}
            onChange={update}
            onNext={next}
            onBack={back}
            disabled={!isValid[2]}
        />
    );
    if (step === 3) return (
        <StepVerify
            files={files}
            onFilesChange={setFiles}
            onNext={next}
            onBack={back}
            disabled={!isValid[3]}
        />
    );
    return <StepSuccess onDone={() => navigate('/home')} />;
};

export default LocalPartner;
