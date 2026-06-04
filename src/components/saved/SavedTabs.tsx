import type { Tab } from './types';

interface SavedTabsProps {
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
}

const SavedTabs = ({ activeTab, onTabChange }: SavedTabsProps) => (
    <div className="sv-tabs">
        <button
            className={`sv-tab${activeTab === 'saved' ? ' active' : ''}`}
            onClick={() => onTabChange('saved')}
        >
            Saved
        </button>
        <button
            className={`sv-tab${activeTab === 'trip' ? ' active' : ''}`}
            onClick={() => onTabChange('trip')}
        >
            My Trip
        </button>
    </div>
);

export default SavedTabs;
