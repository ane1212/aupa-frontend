import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { incidentService } from '../../services/API';
import { getAppCopy } from '../../i18n/copy';

interface Props {
    eventId: string;
    lang?: string;
    onSent?: () => void;
}

const IncidentForm = ({ eventId, lang, onSent }: Props) => {
    const d = getAppCopy(lang).detail;
    const [open, setOpen] = useState(false);
    const [text, setText] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) { setError(d.reportDescError); return; }
        setError('');
        setSubmitting(true);
        try {
            await incidentService.create({ eventId, content: text.trim() });
            setSent(true);
            setText('');
            setOpen(false);
            onSent?.();
        } catch {
            setError(d.sendError);
        } finally {
            setSubmitting(false);
        }
    };

    if (sent) {
        return (
            <p className="comment-form-error" style={{ color: '#16a34a' }}>
                {d.reportSent}
            </p>
        );
    }

    return (
        <div className="incident-form-wrap">
            <button
                type="button"
                className="incident-form-toggle"
                onClick={() => setOpen(v => !v)}
            >
                <AlertTriangle size={15} />
                {open ? d.reportCancel : d.reportProblem}
            </button>
            {open && (
                <form className="comment-form" onSubmit={handleSubmit}>
                    <textarea
                        className="comment-form-textarea"
                        placeholder={d.reportPlaceholder}
                        value={text}
                        onChange={e => setText(e.target.value)}
                        rows={3}
                        maxLength={600}
                    />
                    {error && <p className="comment-form-error">{error}</p>}
                    <button className="comment-form-submit" type="submit" disabled={submitting}>
                        {submitting ? d.sending : d.reportSend}
                    </button>
                </form>
            )}
        </div>
    );
};

export default IncidentForm;
