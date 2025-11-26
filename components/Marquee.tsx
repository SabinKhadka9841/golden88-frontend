'use client';

import React from 'react';

export default function Marquee() {
  const text = "Welcome to GOLDEN88! Service is Our Priority · Earn Extra Income Just Click SHARE · Commission is Cash On Hand! · Your Golden Gateway to Big Wins!";

  return (
    <div className="marquee-container">
      <div className="marquee-content">
        <span className="marquee-text">{text}</span>
        <span className="marquee-text">{text}</span>
      </div>
    </div>
  );
}
