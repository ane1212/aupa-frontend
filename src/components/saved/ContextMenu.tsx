interface ContextMenuProps {
    openMenuId: number;
    menuPos: { top: number; right: number };
    onDelete: (id: number) => void;
    onClose: () => void;
}

const ContextMenu = ({ openMenuId, menuPos, onDelete, onClose }: ContextMenuProps) => (
    <div
        className="sv-context-menu"
        style={{ top: menuPos.top, right: menuPos.right }}
        onClick={e => e.stopPropagation()}
    >
        <button className="sv-menu-item">View on maps</button>
        <button className="sv-menu-item sv-menu-danger" onClick={() => onDelete(openMenuId)}>Delete</button>
        <button className="sv-menu-item" onClick={onClose}>Move to Saved</button>
    </div>
);

export default ContextMenu;
