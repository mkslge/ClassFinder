import React from "react";
import ChipGrid from "./ChipGrid.js";

function FilterPanel({ title, loading, count, filters, isActiveKey, onToggleKey, footer }) {
  return (
    <section className="panel">
      <div className="panelHeader">
        <h2>{title}</h2>
        <span className="meta">{loading ? "Loading…" : `${count} available`}</span>
      </div>

      <ChipGrid
        filters={filters}
        isActiveKey={isActiveKey}
        onToggleKey={onToggleKey}
      />

      {footer}
    </section>
  );
}

export default FilterPanel;
