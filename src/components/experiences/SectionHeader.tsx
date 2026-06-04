import { ChevronDown } from 'lucide-react';

interface Props {
    title: string;
    actionLabel?: string;
    onAction?: () => void;
    className?: string;
}

const SectionHeader = ({ title, actionLabel = 'View all', onAction, className }: Props) => (
    <div className={`exp-row-head${className ? ` ${className}` : ''}`}>
        <h2 className="exp-title">{title}</h2>
        {onAction && (
            <button className="exp-view-all" onClick={onAction}>
                {actionLabel} <ChevronDown size={14} />
            </button>
        )}
    </div>
);

export default SectionHeader;
