interface ContextMenuProps {
    openMenuId: number;
    menuPos: { top: number; right: number };
    onViewOnMaps: (id: number) => void;
    onDelete: (id: number) => void;
    onMoveToSaved: (id: number) => void;
    labels: { viewOnMaps: string; delete: string; moveToSaved: string };
}

const ContextMenu = ({ openMenuId, menuPos, onViewOnMaps, onDelete, onMoveToSaved, labels }: ContextMenuProps) => (
    <div
        className="sv-context-menu"
        style={{ top: menuPos.top, right: menuPos.right }}
        onClick={e => e.stopPropagation()}
    >
        <button className="sv-menu-item" onClick={() => onViewOnMaps(openMenuId)}>{labels.viewOnMaps}</button>
        <button className="sv-menu-item sv-menu-danger" onClick={() => onDelete(openMenuId)}>{labels.delete}</button>
        <button className="sv-menu-item" onClick={() => onMoveToSaved(openMenuId)}>{labels.moveToSaved}</button>
    </div>
);

export default ContextMenu;
