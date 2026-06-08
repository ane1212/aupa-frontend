import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { incidentService } from '../../services/API';
import { toUUID } from './CommentForm';

interface Props {
    eventId: string;
    onSent?: () => void;
}

const IncidentForm = ({ eventId, onSent }: Props) => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) { setError('Escribe una descripción del problema.'); return; }
        setError('');
        setSubmitting(true);
        try {
            await incidentService.create({ eventId: toUUID(eventId), content: text.trim() });
            setSent(true);
            setText('');
            setOpen(false);
            onSent?.();
        } catch {
            setError('No se pudo enviar. Inténtalo de nuevo.');
        } finally {
            setSubmitting(false);
        }
    };

    if (sent) {
        return (
            <p className="comment-form-error" style={{ color: '#16a34a' }}>
                Incidencia enviada. Gracias por tu reporte.
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
                {open ? 'Cancelar' : 'Reportar un problema'}
            </button>
            {open && (
                <form className="comment-form" onSubmit={handleSubmit}>
                    <textarea
                        className="comment-form-textarea"
                        placeholder="Describe el problema (información incorrecta, lugar cerrado, etc.)…"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        rows={3}
                        maxLength={600}
                    />
                    {error && <p className="comment-form-error">{error}</p>}
                    <button className="comment-form-submit" type="submit" disabled={submitting}>
                        {submitting ? 'Enviando…' : 'Enviar reporte'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default IncidentForm;
