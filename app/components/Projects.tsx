"use client";

import { useMemo, useState } from "react";

import {
  projects,
  type Project,
  type ProjectStatus,
} from "../data/projects";

const filters: Array<{
  label: string;
  value: "all" | ProjectStatus;
}> = [
  {
    label: "All projects",
    value: "all",
  },
  {
    label: "Ongoing",
    value: "ongoing",
  },
  {
    label: "Completed",
    value: "completed",
  },
  {
    label: "Pending",
    value: "pending",
  },
];

function getStatusLabel(status: ProjectStatus) {
  switch (status) {
    case "ongoing":
      return "Ongoing";

    case "completed":
      return "Completed";

    case "pending":
      return "Pending";

    default:
      return status;
  }
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<
    "all" | ProjectStatus
  >("all");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") {
      return projects;
    }

    return projects.filter(
      (project) => project.status === activeFilter,
    );
  }, [activeFilter]);

  return (
    <>
      {/* Development Introduction */}
      <section className="development-intro">
        <div>
          <p className="section-kicker">02 / DEVELOPMENT</p>

          <h2>
            PROJECTS
            <br />
            <span>IN MOTION.</span>
          </h2>
        </div>

        <div className="development-intro-copy">
          <p>
            Explore development initiatives across Mwala Constituency.
            Projects are organised according to their current implementation
            status so residents can quickly understand what is happening.
          </p>

          <div className="verified-label">
            <span />
            Project information · Verification in progress
          </div>
        </div>
      </section>

      {/* Project Directory */}
      <section className="project-section" id="projects">
        <div className="project-section-header">
          <div>
            <span className="section-label">PROJECT DIRECTORY</span>

            <p>
              {filteredProjects.length}{" "}
              {filteredProjects.length === 1
                ? "project"
                : "projects"}{" "}
              currently displayed
            </p>
          </div>

          <div className="project-filter">
            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                className={
                  activeFilter === filter.value ? "active" : ""
                }
                onClick={() => setActiveFilter(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="project-grid">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                featured={project.featured || index === 0}
              />
            ))
          ) : (
            <div className="empty-projects">
              <span>NO PROJECTS IN THIS CATEGORY</span>

              <h3>Nothing here yet.</h3>

              <p>
                As verified project information is added to Mwala Connect,
                this section will automatically update.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

function ProjectCard({
  project,
  featured = false,
}: ProjectCardProps) {
  return (
    <article
      className={`project-card ${
        featured ? "project-card-featured" : ""
      }`}
    >
      <div className="project-top">
        <span>
          PROJECT {String(project.id).padStart(2, "0")}
        </span>

        <span
          className={`project-status ${
            project.status === "ongoing"
              ? "status-live"
              : ""
          }`}
        >
          <span />
          {getStatusLabel(project.status)}
        </span>
      </div>

      <div className="project-main">
        <p className="project-location">
          {project.location} · {project.ward}
        </p>

        <h3>{project.title}</h3>

        <p className="project-description">
          {project.description}
        </p>
      </div>

      <div className="project-bottom">
        <div className="project-record">
          <span>Budget</span>

          <strong>{project.budget}</strong>
        </div>

        <div className="progress-block">
          <div className="progress-heading">
            <span>Implementation</span>

            <strong>{project.progress}%</strong>
          </div>

          <div
            className="progress-track"
            aria-label={`Project progress: ${project.progress}%`}
          >
            <span
              style={{
                width: `${project.progress}%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="project-meta">
        <div>
          <span>Start</span>
          <strong>{project.startDate}</strong>
        </div>

        <div>
          <span>Expected completion</span>
          <strong>{project.expectedCompletion}</strong>
        </div>
      </div>

      <div className="project-footer">
        <span>{project.source}</span>

        <button type="button" className="project-link">
          View project record
          <span>↗</span>
        </button>
      </div>
    </article>
  );
}