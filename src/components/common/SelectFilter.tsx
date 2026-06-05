import { ChevronDown } from "lucide-react";

interface SelectFilterOption {
    label: string;
    value: string;
}

interface SelectFilterProps {
    label: string;
    value: string;
    options: SelectFilterOption[];
    onChange: (value: string) => void;
}

const SelectFilter = ({ label, value, options, onChange }: SelectFilterProps) => {
    return (
        <label className="dashboard-filter">
            <span>{label}</span>
            <div className="dashboard-filter-control">
                <select value={value} onChange={(event) => onChange(event.target.value)}>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <ChevronDown size={14} />
            </div>
        </label>
    );
};

export default SelectFilter;
