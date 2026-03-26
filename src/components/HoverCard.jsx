const CARD_WIDTH  = 300;
const CARD_HEIGHT = 160; // approximate — used for edge-avoidance only
const OFFSET_X    = 22;
const OFFSET_Y    = 22;

function computeStyle(x, y) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  let left = x + OFFSET_X;
  let top  = y - OFFSET_Y;

  if (left + CARD_WIDTH > vw - 10) left = x - CARD_WIDTH - OFFSET_X;
  if (top < 10) top = 10;
  if (top + CARD_HEIGHT > vh - 10) top = vh - CARD_HEIGHT - 10;

  return { left, top };
}

export default function HoverCard({ location, x, y }) {
  const style = computeStyle(x, y);

  return (
    <div className="hover-card" style={style}>
      <h3 className="card-name">{location.name}</h3>
      <p className="card-description">{location.description}</p>
    </div>
  );
}

