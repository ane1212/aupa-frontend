import { useState } from 'react'
import { X } from 'lucide-react'

export interface FormField {
    key: string
    label: string
    type: 'text' | 'email' | 'password' | 'number' | 'select' | 'date' | 'textarea'
    placeholder?: string
    required?: boolean
    options?: { label: string; value: string }[]
}

interface DashboardFormProps {
    title: string
    fields: FormField[]
    initialValues?: Record<string, string>
    onSubmit: (data: Record<string, string>) => Promise<void>
    onClose: () => void
}

const DashboardForm = ({ title, fields, initialValues, onSubmit, onClose }: DashboardFormProps) => {
    const [values, setValues] = useState<Record<string, string>>(
        Object.fromEntries(fields.map(f => [f.key, initialValues?.[f.key] ?? '']))
    )
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleChange = (key: string, value: string) => {
        setValues(prev => ({ ...prev, [key]: value }))
        setError(null)
    }

    const handleSubmit = async (e: { preventDefault(): void }) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
        try {
            await onSubmit(values)
            onClose()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ha ocurrido un error. Inténtalo de nuevo.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className="modal-overlay" onClick={onClose} />
            <div className="modal">
                <div className="modal-header">
                    <strong>{title}</strong>
                    <button className="modal-close" onClick={onClose} type="button">
                        <X size={18} />
                    </button>
                </div>

                <form className="modal-body" onSubmit={handleSubmit}>
                    {fields.map(field => (
                        <div key={field.key} className="modal-field">
                            <label className="modal-label">
                                {field.label}
                                {field.required && <span className="modal-required">*</span>}
                            </label>

                            {field.type === 'select' ? (
                                <select
                                    className="modal-input"
                                    value={values[field.key]}
                                    onChange={e => handleChange(field.key, e.target.value)}
                                    required={field.required}
                                >
                                    <option value="">Seleccionar...</option>
                                    {field.options?.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            ) : field.type === 'textarea' ? (
                                <textarea
                                    className="modal-input modal-textarea"
                                    placeholder={field.placeholder}
                                    value={values[field.key]}
                                    onChange={e => handleChange(field.key, e.target.value)}
                                    required={field.required}
                                />
                            ) : (
                                <input
                                    className="modal-input"
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    value={values[field.key]}
                                    onChange={e => handleChange(field.key, e.target.value)}
                                    required={field.required}
                                />
                            )}
                        </div>
                    ))}

                    {error && <p className="modal-error">{error}</p>}

                    <div className="modal-footer">
                        <button type="button" className="modal-btn-cancel" onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="submit" className="modal-btn-submit" disabled={isLoading}>
                            {isLoading ? 'Guardando...' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default DashboardForm
