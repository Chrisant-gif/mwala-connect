import Link from "next/link";
import { notFound } from "next/navigation";

import WardRecord from "../../components/WardRecord";
import { wards } from "../../data/wards";

interface WardPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function WardPage({ params }: WardPageProps) {
  const { id } = await params;
  const ward = wards.find((item) => item.id === Number(id));

  if (!ward) {
    notFound();
  }

  return (
    <main>
      <header className="project-record-header">
        <div className="project-record-header-inner">
          <Link href="/#wards" className="project-record-back">
            ← Back to wards
          </Link>

          <span className="project-record-header-label">
            MWALA CONNECT
          </span>
        </div>
      </header>

      <WardRecord ward={ward} />
    </main>
  );
}