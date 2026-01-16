import React from "react";
import "../style/About.css";
import * as Constant from '../utility/constants'
function About() {
  return (
    <div className="aboutPage">
      <div className="aboutContainer">
        <header className="aboutHeader">
          <h1 className="title">About</h1>
          <p className="subtitle">
            An unofficial guide for University of Maryland Computer Science students.
          </p>
        </header>

        <section className="aboutPanel">
          <h2>Languages & Technologies</h2>
          <p>
            Information on what languages & technologies are covered in each course were 
            found from <a href="reddit.com/r/UMD/">Reddit</a>, <a href="https://planetterp.com/">PlanetTerp</a>, 
            the <a href="https://undergrad.cs.umd.edu/4xxinfo">UMD CS course catalog</a>,  Testudo, past syllabi, 
            previous experience, and asking other students. 
            That being said, some courses cover different topics depending on the professor, so keep that in mind 
            when choosing courses.

            If you have any information on what technologies are taught in different courses, PLEASE CONTACT ME :)
            @ <strong> mseelige@terpmail.umd.edu</strong>.
          </p>
        </section>

        <section className="aboutPanel">
          <h2>Difficulty Sorter</h2>
          <p>
            The Difficulty sorter is based on average GPA. However, there is a selection bias for who takes the course. For example,
            many 800 level courses have a high average GPA since it is (mostly) only graduate students taking the course. This does not
            necessarily mean it is an easy course. Overall, it is an imperfect system, and I am open to alternatives.

            Additionally, not all courses have past GPA data (e.g. newer courses), these are marked as "Unknown".
          </p>
        </section>

        <section className="aboutPanel">
          <h2>CS Track Filter</h2>
          <p>
            Track filtering currently applies only to required CS courses. Note that these are not the only courses
            you must take to fufill those requirements, full details on track requirements can be found on 
            
            the <a href="UMD CS website.">UMD CS website</a>.
          </p>
        </section>

        <section className="aboutPanel">
          <h2>GitHub</h2>
          <p>
            Found an issue or have a suggestion? Open an issue on <a href={Constant.GITHUB_LINK}>GitHub</a> or contact me @
            <strong> mseelige@terpmail.umd.edu</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}

export default About;
