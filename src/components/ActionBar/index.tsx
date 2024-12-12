import './index.css';

function ActionBar({ filterKey, onInput, onClear }: FilterProps) {
  return (
    <div className="filter-bar">
      <span className="filter-bar__input-warp">
        <input
          aria-label="filterIpt"
          className="search-input"
          type="text"
          value={filterKey}
          onChange={() => {}}
          onInput={onInput}
        />
        <svg className="icon search-icon">
          <use href="#icon-search" />
        </svg>
        <svg className="icon clear-icon" onClick={onClear}>
          <use href="#icon-close" />
        </svg>
      </span>
    </div>
  );
}

export default ActionBar;
