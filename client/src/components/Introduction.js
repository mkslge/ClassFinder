import { useState } from "react";

function Introduction() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section className="panel introduction">
      <div className="panelHeader">
        <h2>About this tool</h2>

        <button
          className="collapseToggle"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
        >
          <span className={`caret ${isOpen ? "open" : ""}`}>▸</span>
          <span className="toggleLabel">
            {isOpen ? "Collapse" : "Expand"}
          </span>
        </button>

      </div>

      {isOpen && (
        <div className="introductionBody">
          <p>
            This is an <strong>unofficial course explorer</strong> for University of Maryland
            Computer Science students. Use the filters below to explore courses by
            <strong> language</strong>, <strong>technology</strong>, and <strong>keywords</strong>.
          </p>

          <p>
            The hope is to make it easier to discover classes that match your interests and goals.
          </p>

          <div className="introductionActions">
            <a
              href="https://github.com/mkslge/ClassFinder"
              target="_blank"
              rel="noopener noreferrer"
              className="linkAction"
            >
              Report an issue or suggest an improvement →
            </a>
          </div>
        </div>
      )}
    </section>
  );
}

export default Introduction;
