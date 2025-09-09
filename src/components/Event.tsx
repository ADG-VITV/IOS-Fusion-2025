interface EventProps {
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  event: string,
  time: string, 
  venue: string
}

export default function Event({ className, onClick, style, event, time, venue}: EventProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl lg:w-[23rem] text-white px-3 py-2 lg:px-5 lg:py-3 font-bold ${className}`}
      style={{
        transition: "background-color 0.3s ease-in-out", 
      }}
    >
      <h1 className="text-sm sm:text-base">{event}</h1>
      <p className="text-xs text-[#9f82f1]">{time}</p>
      <p className="text-xs text-gray-400">{venue}</p>
    </div>
  );
}