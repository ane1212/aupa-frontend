interface ContextMenuProps {
    openMenuId: number;
    menuPos: { top: number; right: number };
    onViewOnMaps: (id: number) => void;
    onDelete: (id: number) => void;
    onMoveToSaved: (id: number) => void;
}

const ContextMenu = ({ openMenuId, menuPos, onViewOnMaps, onDelete, onMoveToSaved }: ContextMenuProps) => (
    <div
        className="sv-context-menu"
        style={{ top: menuPos.top, right: menuPos.right }}
        onClick={e => e.stopPropagation()}
    >
        <button className="sv-menu-item" onClick={() => onViewOnMaps(openMenuId)}>View on maps</button>
        <button className="sv-menu-item sv-menu-danger" onClick={() => onDelete(openMenuId)}>Delete</button>
        <button className="sv-menu-item" onClick={() => onMoveToSaved(openMenuId)}>Move to Saved</button>
    </div>
);

export default ContextMenu;
