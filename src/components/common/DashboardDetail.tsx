import { X } from 'lucide-react'

export interface DetailField {
    label: string
    value: React.ReactNode
}

interface DashboardDetailProps {
    title: string
    subtitle?: string
    fields: DetailField[]
    onClose: () => void
}

const DashboardDetail = ({ title, subtitle, fields, onClose }: DashboardDetailProps) => {
    return (
        <>
            <div className="detail-panel-overlay" onClick={onClose} />
            <aside className="detail-panel">
                <div className="detail-panel-header">
                    <div className="detail-panel-title">
                        <div className="detail-panel-avatar">{title.charAt(0)}</div>
                        <div>
                            <strong>{title}</strong>
                            {subtitle && <span>{subtitle}</span>}
                        </div>
                    </div>
                    <button className="detail-panel-close" onClick={onClose} type="button">
                        <X size={18} />
                    </button>
                </div>

                <div className="detail-panel-body">
                    {fields.map((field) => (
                        <div key={field.label} className="detail-panel-field">
                            <span className="detail-panel-label">{field.label}</span>
                            <span className="detail-panel-value">{field.value}</span>
                        </div>
                    ))}
                </div>
            </aside>
        </>
    )
}

export default DashboardDetail
