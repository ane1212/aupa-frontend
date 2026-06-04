import { Search } from 'lucide-react';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => (
    <label className="nearby-search">
        <Search size={15} aria-hidden="true" />
        <input
            className="nearby-search-input"
            type="search"
            placeholder="Where do you want to go?"
            value={value}
            onChange={e => onChange(e.target.value)}
        />
    </label>
);

export default SearchBar;
