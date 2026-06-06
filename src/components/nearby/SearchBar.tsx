import { Search } from 'lucide-react';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const SearchBar = ({ value, onChange, placeholder = 'Where do you want to go?' }: SearchBarProps) => (
    <label className="nearby-search">
        <Search size={15} aria-hidden="true" />
        <input
            className="nearby-search-input"
            type="search"
            placeholder={placeholder}
            value={value}
            onChange={e => onChange(e.target.value)}
        />
    </label>
);

export default SearchBar;
