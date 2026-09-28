import { projects, type Project } from "./projects";

export interface Ward {
  id: number;
  name: string;
  description: string;
  projectCount: number;
  projects: Project[];
}

const getWardProjects = (wardName: string) =>
  projects.filter((project) => project.ward === wardName);

export const wards: Ward[] = [
  {
    id: 1,
    name: "Makutano/Mwala",
    description:
      "A ward forming part of Mwala Constituency's wider development network. Ward-level project information is being progressively documented.",
    projects: getWardProjects("Makutano/Mwala"),
    projectCount: getWardProjects("Makutano/Mwala").length,
  },

  {
    id: 2,
    name: "Masii",
    description:
      "A ward with development priorities including water access, infrastructure and community services.",
    projects: getWardProjects("Masii"),
    projectCount: getWardProjects("Masii").length,
  },

  {
    id: 3,
    name: "Muthetheni",
    description:
      "Development activity documented across water infrastructure and community connectivity, with further ward-level information being verified.",
    projects: getWardProjects("Muthetheni"),
    projectCount: getWardProjects("Muthetheni").length,
  },

  {
    id: 4,
    name: "Wamunyu",
    description:
      "A ward forming part of the wider constituency development network, with information being organised by project and implementation status.",
    projects: getWardProjects("Wamunyu"),
    projectCount: getWardProjects("Wamunyu").length,
  },

  {
    id: 5,
    name: "Kibauni",
    description:
      "A ward whose development priorities and project information will be progressively documented on Mwala Connect.",
    projects: getWardProjects("Kibauni"),
    projectCount: getWardProjects("Kibauni").length,
  },

  {
    id: 6,
    name: "Mbiuni",
    description:
      "A ward within Mwala Constituency whose development information will be progressively documented through verified project records.",
    projects: getWardProjects("Mbiuni"),
    projectCount: getWardProjects("Mbiuni").length,
  },
];