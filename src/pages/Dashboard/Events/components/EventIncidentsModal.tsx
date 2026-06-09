import { useEffect, useState, useMemo } from 'react'
import { incidentService } from '../../../../services/API'
import type { Incident, Event } from '../../../../services/models'
import { DataTable } from '../../../../components/common'
import type { DataTableColumn } from '../../../../components/common'
import { X } from 'lucide-react'

interface Props {
    event: Event
    onClose: () => void
}

const EventIncidentsModal = ({ event, onClose }: Props) => {
    const [incidents, setIncidents] = useState<Incident[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalItems, setTotalItems] = useState(0)

    useEffect(() => {
        setIsLoading(true)
        const params = { page: currentPage, limit: 5 }
        // Se hace la llamada, si el backend falla (404) lo capturamos
        incidentService.getByEvent(event.id, params)
            .then(res => {
                const data = Array.isArray(res) ? res : []
                const total = data.length
                setIncidents(data)
                setTotalItems(total)
            })
            .catch(err => {
                console.warn("Backend no soporta incidentes aún o hubo un error:", err)
                setIncidents([])
                setTotalItems(0)
            })
            .finally(() => setIsLoading(false))
    }, [event.id, currentPage])

    const columns = useMemo<DataTableColumn<Incident>[]>(() => [
        { key: "id", header: "ID", render: (i) => i.id.slice(0, 8) + '…' },
        { key: "userId", header: "Usuario ID", render: (i) => i.userId.slice(0, 8) + '…' },
        { key: "content", header: "Incidencia", render: (i) => i.content },
        {
            key: "status",
            header: "Estado",
            render: (i) => (
                <span className={`dashboard-badge dashboard-badge-role`}>
                    {i.status}
                </span>
            )
        },
        { key: "date", header: "Fecha", render: (i) => i.createdAt ? new Date(i.createdAt).toLocaleDateString() : '—' }
    ], [])

    return (
        <>
            <div className="modal-overlay" onClick={onClose} />
            <div className="modal" style={{ maxWidth: '800px', width: '90%' }}>
                <div className="modal-header">
                    <strong>Incidencias: {event.title}</strong>
                    <button type="button" className="modal-close" onClick={onClose} aria-label="Cerrar modal">
                        <X size={18} />
                    </button>
                </div>
                <div className="modal-body" style={{ padding: '20px' }}>
                    <DataTable
                        columns={columns}
                        data={incidents}
                        page={currentPage}
                        pageSize={5}
                        totalItems={totalItems}
                        onPageChange={setCurrentPage}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </>
    )
}

export default EventIncidentsModal
