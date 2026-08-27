import { projects } from "../data/siteData";
import SectionHeading from "./SectionHeading";

export default function Portfolio() {
  return (
    <section id="projects" className="work">
      <SectionHeading eyebrow="SELECTED WORK">
        Made to make <em>an impression.</em>
      </SectionHeading>
      <div className="projects">
        {projects.map((project, index) => (
          <article key={project.name} className={`p p${index} ${project.variant || ""}`}>
            <div className="project-cover">
              <span className="project-number">0{index + 1}</span>
              {project.image ? (
                <img
                  src={project.image}
                  alt={`${project.name} project cover`}
                />
              ) : (
                <strong>
                  {project.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)}
                </strong>
              )}
              {project.link ? (
                <a
                  className="project-arrow"
                  href={project.link}
                  target={project.link.startsWith("http") ? "_blank" : undefined}
                  rel={project.link.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={`View ${project.name}`}
                >
                  <span>{project.ctaLabel || "Click here"}</span>
                  <i aria-hidden="true">↗</i>
                </a>
              ) : (
                <span className="project-arrow">↗</span>
              )}
            </div>
            <div className="project-details">
              <small>{project.category}</small>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
