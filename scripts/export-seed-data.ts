import { writeFileSync } from "node:fs";
import { allocationHistory } from "../app/data/allocations";
import { engagements } from "../app/data/engagements";
import { projectMedia } from "../app/data/project-media";
import { projects } from "../app/data/projects";
import { constituencyStatistics } from "../app/data/statistics";
import { visits } from "../app/data/visits";
import { wards } from "../app/data/wards";

const data = {
  wards,
  projects,
  allocationHistory,
  visits,
  engagements,
  projectMedia,
  constituencyStatistics,
};

writeFileSync(
  "./scripts/mwala-connect-seed-data.json",
  JSON.stringify(data, null, 2),
  "utf8"
);

console.log("Export created: scripts/mwala-connect-seed-data.json");
console.log({
  wards: wards.length,
  projects: projects.length,
  allocations: allocationHistory.length,
  visits: visits.length,
  engagements: engagements.length,
  projectMedia: projectMedia.length,
});
