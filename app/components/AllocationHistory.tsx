
"use client";

import type { AllocationRecord } from "../data/allocations";
import type { ConstituencyStatistics } from "../data/statistics";

interface AllocationHistoryProps {
  allocations: AllocationRecord[];
  statistics: ConstituencyStatistics;
}

function formatAmount(amount: number) {
  if (!Number.isFinite(amount)) {
    return "To be verified";
  }

  return `KSh ${amount.toLocaleString("en-KE", {
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

export default function AllocationHistory({
  allocations,
  statistics,
}: AllocationHistoryProps) {
  return (
    <section
      className="allocation-history-section"
      id="allocations"
    >
      <div className="allocation-history-inner">
        <div className="allocation-history-header">
          <div>
            <p className="section-kicker">03 / INVESTMENT</p>

            <h2>
              ALLOCATION
              <br />
              <span>HISTORY.</span>
            </h2>
          </div>

          <div className="allocation-history-intro">
            <p>
              A historical record of constituency allocations by
              financial year.
            </p>

            <div className="verified-label">
              <span />
              Allocation records · NGCDF Mwala Constituency
            </div>
          </div>
        </div>

        <div className="public-investment" id="current-allocation">
          <div className="financial-heading">
            <span>PUBLIC INVESTMENT</span>

            <span>FY {statistics.financialYear}</span>
          </div>

          <div className="financial-main">
            <div>
              <span>Total allocation</span>

              <strong>{statistics.totalAllocation}</strong>
            </div>

            <div className="financial-status">
              <span className="source-dot" />

              <p>
                Allocation figures confirmed with NGCDF Mwala
                Constituency.
              </p>
            </div>
          </div>
        </div>

        <div className="allocation-history-list">
          {allocations.length > 0 ? (
            allocations.map((record, index) => (
              <div
                className="allocation-row"
                key={record.financialYear}
              >
                <span className="allocation-index">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="allocation-year">
                  FY {record.financialYear}
                </span>

                <strong className="allocation-amount">
                  {formatAmount(record.amount)}
                </strong>
              </div>
            ))
          ) : (
            <p className="allocation-history-empty">
              No allocation records are currently available.
            </p>
          )}
        </div>

        <div className="allocation-history-source">
          <span className="source-dot" />

          <p>
            Allocation figures have been confirmed with NGCDF
            Mwala Constituency.
          </p>
        </div>
      </div>
    </section>
  );
}
