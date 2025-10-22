
import React from 'react';

/**
 * StarRating component
 * props:
 *  - value: number (rating, possibly fractional)
 * Rounds according to mathematical rules (Math.round)
 */
export default function StarRating({ value }) {
  const rounded = Math.round(Number(value) || 0);
  const fullStars = rounded;
  const stars = Array.from({length:5}, (_, i) => i < fullStars ? '★' : '☆');
  return (
    <div className="stars" aria-label={`Rating: ${rounded} out of 5`}>
      <span style={{fontSize:18}}>{stars.join(' ')}</span>
    </div>
  );
}
