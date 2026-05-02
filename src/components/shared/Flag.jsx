import React, { useState } from 'react';

/**
 * Standardized Flag component for Almersal.
 * Uses FlagCDN for high-quality SVG flags with a fallback mechanism.
 * 
 * @param {{ 
 *   code: string, 
 *   size?: 'sm'|'md'|'lg'|'xl', 
 *   className?: string 
 * }} props
 */
export default function Flag({ code, size = 'md', className = '' }) {
  const [hasError, setHasError] = useState(false);
  
  const dimensions = {
    sm: 'w-10 h-6',
    md: 'w-16 h-10',
    lg: 'w-24 h-16',
    xl: 'w-36 h-24'
  };

  const normalizedCode = code?.toLowerCase() || '';
  const containerClass = `${dimensions[size] || dimensions.md} ${className} flex-shrink-0 overflow-hidden rounded-sm border border-gold/20 shadow-sm bg-navy-light/30 relative flex items-center justify-center`;

  if (!normalizedCode || hasError) {
    return (
      <div className={containerClass}>
        <span className="text-[10px] font-mono text-gold/50 uppercase">{code || '??'}</span>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <img
        src={`https://flagcdn.com/${normalizedCode}.svg`}
        alt={`${code} flag`}
        className="w-full h-full object-cover"
        onError={() => setHasError(true)}
        loading="lazy"
      />
    </div>
  );
}