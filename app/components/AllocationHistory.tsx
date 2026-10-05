"use client";

import { allocationHistory } from "../data/allocations";
import { constituencyStatistics } from "../data/statistics";

function formatAmount(amount: number) {
  return `KSh ${amount.toLocaleString("en-KE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export default function AllocationHistory() {
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

            <span>
              FY {constituencyStatistics.financialYear}
            </span>
          </div>

          <div className="financial-main">
            <div>
              <span>Total allocation</span>

              <strong>
                {constituencyStatistics.totalAllocation}
              </strong>
            </div>

            <div className="financial-status">
              <span className="source-dot" />

              <p>
                Official allocation for FY 2025 / 2026 as published
                by NGCDF Mwala Constituency.
              </p>
            </div>
          </div>
        </div>

        <div className="allocation-history-list">
          {allocationHistory.map((record, index) => (
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
          ))}
        </div>

        <div className="allocation-history-source">
          <span className="source-dot" />

          <p>
            Figures shown are based on the allocation records
            published by NGCDF Mwala Constituency.
          </p>
        </div>
      </div>
    </section>
  );
}