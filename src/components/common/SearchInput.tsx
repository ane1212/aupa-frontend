import { Search } from "lucide-react";

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const SearchInput = ({ value, onChange, placeholder = "Buscar..." }: SearchInputProps) => {
    return (
        <label className="dashboard-search">
            <Search size={16} />
            <input
                type="search"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
            />
        </label>
    );
};

export default SearchInput;
