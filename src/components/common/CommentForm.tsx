import { useState } from 'react';
import { Star } from 'lucide-react';
import { commentService } from '../../services/API';
import { getAppCopy } from '../../i18n/copy';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const toUUID = (str: string): string => {
    if (UUID_RE.test(str)) return str;
    let h = 0;
    for (let i = 0; i < str.length; i++) h = Math.imul(31, h) + str.charCodeAt(i) | 0;
    const hex = (Math.abs(h) >>> 0).toString(16).padStart(8, '0').repeat(4);
    return `${hex.slice(0,8)}-${hex.slice(8,12)}-4${hex.slice(13,16)}-8${hex.slice(16,19)}-${hex.slice(20,32)}`;
};

interface Props {
    eventId: string;
    lang?: string;
    onAdded: (comment: { id: string; userId: string; eventId: string; content: string; rating: number; createdAt?: string }) => void;
}

const CommentForm = ({ eventId, lang, onAdded }: Props) => {
    const d = getAppCopy(lang).detail;
    const [rating, setRating] = useState(0);
    const [hovered, setHovered] = useState(0);
    const [text, setText] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0 || !text.trim()) { setError(d.reviewRatingError); return; }
        setError('');
        setSubmitting(true);
        try {
            const created = await commentService.create({ eventId: toUUID(eventId), content: text.trim(), rating });
            onAdded(created);
            setRating(0);
            setText('');
        } catch {
            setError(d.sendError);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form className="comment-form" onSubmit={handleSubmit}>
            <div className="comment-form-stars">
                {[1, 2, 3, 4, 5].map(n => (
                    <button
                        key={n}
                        type="button"
                        className="comment-form-star-btn"
                        onClick={() => setRating(n)}
                        onMouseEnter={() => setHovered(n)}
                        onMouseLeave={() => setHovered(0)}
                    >
                        <Star
                            size={22}
                            fill={(hovered || rating) >= n ? '#f59e0b' : 'none'}
                            color={(hovered || rating) >= n ? '#f59e0b' : '#ccc'}
                        />
                    </button>
                ))}
            </div>
            <textarea
                className="comment-form-textarea"
                placeholder={d.reviewPlaceholder}
                value={text}
                onChange={e => setText(e.target.value)}
                rows={3}
                maxLength={500}
            />
            {error && <p className="comment-form-error">{error}</p>}
            <button className="comment-form-submit" type="submit" disabled={submitting}>
                {submitting ? d.sending : d.reviewSubmit}
            </button>
        </form>
    );
};

export default CommentForm;
