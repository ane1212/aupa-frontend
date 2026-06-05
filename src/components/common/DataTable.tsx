import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface DataTableColumn<T> {
    key: string;
    header: string;
    render: (row: T) => ReactNode;
}

interface DataTableProps<T> {
    columns: DataTableColumn<T>[];
    data: T[];
    page: number;
    pageSize: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    isLoading?: boolean;
}

const DataTable = <T,>({
    columns,
    data,
    page,
    pageSize,
    totalItems,
    onPageChange,
    isLoading = false,
}: DataTableProps<T>) => {
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    const firstItem = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
    const lastItem = Math.min(page * pageSize, totalItems);

    return (
        <section className="dashboard-table-card">
            <div className="dashboard-table-wrap">
                <table className="dashboard-table">
                    <thead>
                        <tr>
                            {columns.map((column) => (
                                <th key={column.key}>{column.header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={columns.length} className="dashboard-table-loading">
                                    Cargando...
                                </td>
                            </tr>
                        ) : data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="dashboard-table-empty">
                                    No hay resultados
                                </td>
                            </tr>
                        ) : data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((column) => (
                                    <td key={column.key}>{column.render(row)}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <footer className="dashboard-table-footer">
                <span>
                    Mostrando {firstItem}-{lastItem} de {totalItems} registros
                </span>
                <div className="dashboard-pagination">
                    <button
                        type="button"
                        onClick={() => onPageChange(page - 1)}
                        disabled={page <= 1}
                        aria-label="Pagina anterior"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <span className="dashboard-pagination-current">{page}</span>
                    <span>de {totalPages}</span>
                    <button
                        type="button"
                        onClick={() => onPageChange(page + 1)}
                        disabled={page >= totalPages}
                        aria-label="Pagina siguiente"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </footer>
        </section>
    );
};

export default DataTable;
