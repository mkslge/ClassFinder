import React from "react";

function ChipGrid({ filters, isActiveKey, onToggleKey }) {
  return (
    <ul className="chipGrid">
      {filters.map((f) => {
        const key = f.getKey();
        const active = isActiveKey(key);

        return (
          <li key={key}>
            <button
              className={`chip ${active ? "isActive" : ""}`}
              onClick={() => onToggleKey(key)}
              type="button"
            >
              {f.getName()}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default ChipGrid;
