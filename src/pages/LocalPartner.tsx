import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    StepIntro, StepCategory, StepBusinessInfo, StepVerify, StepSuccess,
} from '../components/localpartner';
import type { PartnerFormData, PartnerStep } from '../components/localpartner';
import { localService } from '../services/API';

const LocalPartner = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState<PartnerStep>(0);
    const [files, setFiles] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
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

    const next = async () => {
        if (step === 3) {
            setIsSubmitting(true);
            try {
                // 1. Send data to backend (Backend now handles the notification automatically)
                await localService.create({
                    name: formData.businessName,
                    address: formData.address,
                    description: formData.description,
                    phone: formData.phone,
                });

                setStep(4);
            } catch (err: any) {
                console.error("Error submitting form:", err);
                if (err?.status === 409 || err?.message === 'CONFLICT' || err?.error === 'CONFLICT') {
                    alert("Ya tienes un local registrado o pendiente de verificación.");
                } else {
                    alert("Hubo un error al enviar el formulario. Inténtalo de nuevo.");
                }
            } finally {
                setIsSubmitting(false);
            }
        } else {
            setStep(s => (s + 1) as PartnerStep);
        }
    };
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
            disabled={!isValid[3] || isSubmitting}
        />
    );
    return <StepSuccess onDone={() => navigate('/home')} />;
};

export default LocalPartner;
