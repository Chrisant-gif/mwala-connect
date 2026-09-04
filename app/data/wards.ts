export type WardProjectStatus = "completed" | "ongoing" | "upcoming";

export interface WardProject {
  id: number;
  title: string;
  category: string;
  status: WardProjectStatus;
  description: string;
  keyDetail: string;
  source: string;
  lastVerified: string;
}

export interface Ward {
  id: number;
  name: string;
  description: string;
  projectCount: number;
  projects: WardProject[];
}

export const wards: Ward[] = [
  {
    id: 1,
    name: "Makutano/Mwala",
    description:
      "A ward forming part of Mwala Constituency's wider development network. Ward-level project information is being progressively documented.",
    projectCount: 0,
    projects: [],
  },
  {
    id: 2,
    name: "Masii",
    description:
      "A ward with development priorities including water access, infrastructure and community services.",
    projectCount: 0,
    projects: [],
  },
  {
    id: 3,
    name: "Muthetheni",
    description:
      "Development activity documented across water infrastructure and community connectivity, with further ward-level information being verified.",
    projectCount: 3,
    projects: [
      {
        id: 1,
        title: "Utithini Water Project",
        category: "Water infrastructure",
        status: "completed",
        description:
          "A completed water project serving the local community through improved access to water.",
        keyDetail:
          "The project is powered by solar energy, adding a clean-energy component to the water infrastructure.",
        source: "Field information",
        lastVerified: "To be verified",
      },
      {
        id: 2,
        title: "Kiluu Bridge",
        category: "Community infrastructure",
        status: "ongoing",
        description:
          "A bridge construction project intended to improve local community connectivity and movement.",
        keyDetail:
          "The project was recently flagged off for the local community.",
        source: "Field information",
        lastVerified: "To be verified",
      },
      {
        id: 3,
        title: "Matuu Water Project",
        category: "Water infrastructure",
        status: "upcoming",
        description:
          "A water project that has experienced a period of stalled activity and is expected to receive renewed support.",
        keyDetail:
          "Solar panels are expected to be introduced to provide power for the water project.",
        source: "Field information",
        lastVerified: "To be verified",
      },
    ],
  },
  {
    id: 4,
    name: "Wamunyu",
    description:
      "A ward forming part of the wider constituency development network, with information being organised by project and implementation status.",
    projectCount: 0,
    projects: [],
  },
  {
    id: 5,
    name: "Kibauni",
    description:
      "A ward whose development priorities and project information will be progressively documented on Mwala Connect.",
    projectCount: 0,
    projects: [],
  },
  {
    id: 6,
    name: "Mbiuni",
    description:
      "A ward within Mwala Constituency whose development information will be progressively documented through verified project records.",
    projectCount: 0,
    projects: [],
  },
];