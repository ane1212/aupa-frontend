import type { Tab } from './types';

interface SavedTabsProps {
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
    labels: { saved: string; trip: string };
}

const SavedTabs = ({ activeTab, onTabChange, labels }: SavedTabsProps) => (
    <div className="sv-tabs">
        <button
            className={`sv-tab${activeTab === 'saved' ? ' active' : ''}`}
            onClick={() => onTabChange('saved')}
        >
            {labels.saved}
        </button>
        <button
            className={`sv-tab${activeTab === 'trip' ? ' active' : ''}`}
            onClick={() => onTabChange('trip')}
        >
            {labels.trip}
        </button>
    </div>
);

export default SavedTabs;
