export const Dots = ({ index, count }) => {
  return (
    <div className="slider__dots">
      {new Array(count).fill('').map((item, i) => (
        <div
          className="slider__dots__item">
          <span className={cn(
            'wrapper',
            { active: index === i },
          )}>
          </span>
          <span />
        </div>
      ))}
    </div>
  );
}