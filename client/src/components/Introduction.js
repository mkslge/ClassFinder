function Introduction() {
  return (
    <section className="panel introduction">
      <div className="panelHeader">
        <h2>About this tool</h2>
      </div>

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
            href="https://github.com/YOUR_REPO_HERE"
            target="_blank"
            rel="noopener noreferrer"
            className="linkAction"
          >
            Report an issue or suggest an improvement →
          </a>
        </div>
      </div>
    </section>
  );
}

export default Introduction;
