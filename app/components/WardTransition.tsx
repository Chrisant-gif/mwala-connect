"use client";

import { useEffect, useState } from "react";

interface WardTransitionProps {
  wardNumber: number;
  wardName: string;
}

export default function WardTransition({
  wardNumber,
  wardName,
}: WardTransitionProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 700);

    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="ward-transition" aria-hidden="true">
      <div className="ward-transition-top">
        <span>MWALA CONNECT</span>
        <span>DEVELOPMENT RECORDS</span>
      </div>

      <div className="ward-transition-center">
        <span className="ward-transition-number">
          WARD {String(wardNumber).padStart(2, "0")}
        </span>

        <h2>{wardName}</h2>

        <div className="ward-transition-loader">
          <span />
        </div>

        <span className="ward-transition-status">
          LOADING DEVELOPMENT RECORD
        </span>
      </div>

      <div className="ward-transition-bottom">
        <span>MWALA CONSTITUENCY · KENYA</span>
        <span>01 / 01</span>
      </div>
    </div>
  );
}