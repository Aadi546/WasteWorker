import React from 'react';
import Icon from '../AppIcon';

const Star = ({ filled, onClick, onMouseEnter, onMouseLeave, size = 18 }) => (
  <button
    type="button"
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className="p-0.5 text-warning hover:scale-105 transition-transform"
    aria-label={filled ? 'Filled star' : 'Empty star'}
 >
    <Icon name={filled ? 'Star' : 'Star'} size={size} className={filled ? 'fill-warning text-warning' : 'text-muted-foreground'} />
  </button>
);

const RatingStars = ({ value = 0, onChange, max = 5, size = 18, readOnly = false, className = '' }) => {
  const [hover, setHover] = React.useState(0);
  const stars = [];
  for (let i = 1; i <= max; i++) {
    const filled = (hover || value) >= i;
    stars.push(
      <Star
        key={i}
        filled={filled}
        size={size}
        onClick={readOnly ? undefined : () => onChange?.(i)}
        onMouseEnter={readOnly ? undefined : () => setHover(i)}
        onMouseLeave={readOnly ? undefined : () => setHover(0)}
      />
    );
  }

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {stars}
      {!readOnly && (
        <span className="ml-2 text-sm text-muted-foreground">{value ? `${value}/${max}` : 'Rate'}</span>
      )}
    </div>
  );
};

export default RatingStars;


