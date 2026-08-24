export interface Ward {
  id: number;
  name: string;
  description: string;
  projectCount: number;
}

export const wards: Ward[] = [
  {
    id: 1,
    name: "Masii",
    description:
      "A ward with development priorities including water access, infrastructure and community services.",
    projectCount: 0,
  },
  {
    id: 2,
    name: "Matuu",
    description:
      "A growing urban and rural community with infrastructure and public service development needs.",
    projectCount: 0,
  },
  {
    id: 3,
    name: "Ekalakala",
    description:
      "Development priorities and constituency projects serving communities across the ward.",
    projectCount: 0,
  },
  {
    id: 4,
    name: "Kithimani",
    description:
      "A ward forming part of the wider Mwala Constituency development network.",
    projectCount: 0,
  },
  {
    id: 5,
    name: "Kyua",
    description:
      "A community-focused ward with ongoing infrastructure and public service priorities.",
    projectCount: 0,
  },
  {
    id: 6,
    name: "Ikombe",
    description:
      "A ward whose development information will be progressively documented on Mwala Connect.",
    projectCount: 0,
  },
];