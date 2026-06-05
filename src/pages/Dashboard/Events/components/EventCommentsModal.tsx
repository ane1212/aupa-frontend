import { useEffect, useState, useMemo } from 'react'
import { commentService } from '../../../../services/API'
import type { Comment, Event } from '../../../../services/models'
import { DataTable } from '../../../../components/common'
import type { DataTableColumn } from '../../../../components/common'
import { X } from 'lucide-react'

interface Props {
    event: Event
    onClose: () => void
}

const EventCommentsModal = ({ event, onClose }: Props) => {
    const [comments, setComments] = useState<Comment[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalItems, setTotalItems] = useState(0)

    useEffect(() => {
        setIsLoading(true)
        const params = { page: currentPage, limit: 5 }
        commentService.getByEvent(event.id, params)
            .then(res => {
                const data = res.data?.data || (Array.isArray(res.data) ? res.data : (Array.isArray(res) ? res : []))
                const total = res.data?.meta?.total ?? res.meta?.total ?? data.length
                setComments(data)
                setTotalItems(total)
            })
            .catch(err => console.error(err))
            .finally(() => setIsLoading(false))
    }, [event.id, currentPage])

    const columns = useMemo<DataTableColumn<Comment>[]>(() => [
        { key: "id", header: "ID", render: (c) => c.id.slice(0, 8) + '…' },
        { key: "userId", header: "Usuario ID", render: (c) => c.userId.slice(0, 8) + '…' },
        { key: "content", header: "Comentario", render: (c) => c.content },
        { key: "rating", header: "Puntuación", render: (c) => `${c.rating}/5` },
        { key: "date", header: "Fecha", render: (c) => c.createdAt ? new Date(c.createdAt).toLocaleDateString() : '—' }
    ], [])

    return (
        <>
            <div className="modal-overlay" onClick={onClose} />
            <div className="modal" style={{ maxWidth: '800px', width: '90%' }}>
                <div className="modal-header">
                    <strong>Comentarios: {event.title}</strong>
                    <button type="button" className="modal-close" onClick={onClose} aria-label="Cerrar modal">
                        <X size={18} />
                    </button>
                </div>
                <div className="modal-body" style={{ padding: '20px' }}>
                    <DataTable
                        columns={columns}
                        data={comments}
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

export default EventCommentsModal
