import React from 'react';

export default function BtnMarketingWrapper({ children, position }) {
  return <div className={`btn-marketing-wrapper ${position}`}>{children}</div>;
}
