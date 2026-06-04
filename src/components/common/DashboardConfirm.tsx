import { useState } from 'react'
import { Trash2 } from 'lucide-react'

interface DashboardConfirmProps {
    title: string
    description: string
    onConfirm: () => Promise<void>
    onClose: () => void
}

const DashboardConfirm = ({ title, description, onConfirm, onClose }: DashboardConfirmProps) => {
    const [isLoading, setIsLoading] = useState(false)

    const handleConfirm = async () => {
        setIsLoading(true)
        try {
            await onConfirm()
            onClose()
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className="modal-overlay" onClick={onClose} />
            <div className="modal modal-confirm">
                <div className="modal-confirm-icon">
                    <Trash2 size={22} />
                </div>
                <strong className="modal-confirm-title">{title}</strong>
                <p className="modal-confirm-desc">{description}</p>
                <div className="modal-footer">
                    <button type="button" className="modal-btn-cancel" onClick={onClose}>
                        Cancelar
                    </button>
                    <button type="button" className="modal-btn-delete" onClick={handleConfirm} disabled={isLoading}>
                        {isLoading ? 'Eliminando...' : 'Eliminar'}
                    </button>
                </div>
            </div>
        </>
    )
}

export default DashboardConfirm
