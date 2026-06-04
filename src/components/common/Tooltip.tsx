import { useState } from 'react'

interface TooltipProps {
    text: string
    children: React.ReactNode
}

const Tooltip = ({ text, children }: TooltipProps) => {
    const [visible, setVisible] = useState(false)

    return (
        <span
            className="tooltip-wrapper"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            {children}
            {visible && <span className="tooltip-box">{text}</span>}
        </span>
    )
}

export default Tooltip
