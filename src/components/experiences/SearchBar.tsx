import { Search } from 'lucide-react';

interface Props {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const SearchBar = ({ value, onChange, placeholder = 'Search' }: Props) => (
    <label className="exp-search">
        <Search size={15} aria-hidden="true" />
        <input
            className="exp-search-input"
            type="search"
            placeholder={placeholder}
            value={value}
            onChange={e => onChange(e.target.value)}
        />
    </label>
);

export default SearchBar;
