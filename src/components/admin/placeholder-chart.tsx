import { MinimalCard } from "./brutal-card";

interface PlaceholderChartProps {
  type: "bar" | "line" | "pie" | "area";
  title: string;
  className?: string;
}

export function PlaceholderChart({ type, title, className = "" }: PlaceholderChartProps) {
  const renderChart = () => {
    switch (type) {
      case "bar":
        return (
          <div className="flex items-end gap-3 h-40 px-4">
            {[60, 85, 45, 75, 90, 55, 70].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md transition-all duration-500 hover:from-blue-600 hover:to-blue-500"
                  style={{ height: `${height}%` }}
                />
                <span className="text-[10px] text-slate-400">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                </span>
              </div>
            ))}
          </div>
        );

      case "line":
        return (
          <div className="h-40 flex items-center justify-center px-4">
            <svg viewBox="0 0 400 120" className="w-full h-full">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 0,80 Q 50,60 100,70 T 200,40 T 300,50 T 400,20"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M 0,80 Q 50,60 100,70 T 200,40 T 300,50 T 400,20 V 120 H 0 Z"
                fill="url(#lineGradient)"
              />
              {/* Data points */}
              {[[0, 80], [100, 70], [200, 40], [300, 50], [400, 20]].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="4" fill="#3b82f6" />
              ))}
            </svg>
          </div>
        );

      case "pie":
        return (
          <div className="h-40 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-32 h-32">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#dbeafe"
                strokeWidth="20"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#93c5fd"
                strokeWidth="20"
                strokeDasharray="100 151.4"
                strokeDashoffset="0"
                transform="rotate(-90 50 50)"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="20"
                strokeDasharray="75 176.4"
                strokeDashoffset="-100"
                transform="rotate(-90 50 50)"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#1e3a8a"
                strokeWidth="20"
                strokeDasharray="50 201.4"
                strokeDashoffset="-175"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="flex flex-col gap-2 ml-4">
              {[
                { color: "bg-blue-900", label: "Courses", value: "20%" },
                { color: "bg-blue-500", label: "Faculty", value: "30%" },
                { color: "bg-blue-300", label: "News", value: "25%" },
                { color: "bg-blue-100", label: "Gallery", value: "25%" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                  <span className="text-xs text-slate-500">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "area":
        return (
          <div className="h-40 flex items-center justify-center px-4">
            <svg viewBox="0 0 400 120" className="w-full h-full">
              <defs>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <path
                d="M 0,100 C 50,80 100,60 150,70 S 250,40 300,50 S 380,30 400,25 V 120 H 0 Z"
                fill="url(#areaGradient)"
              />
              <path
                d="M 0,100 C 50,80 100,60 150,70 S 250,40 300,50 S 380,30 400,25"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
              />
            </svg>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <MinimalCard variant="elevated" className={className}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Last 7 days</span>
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse-dot" />
        </div>
      </div>
      {renderChart()}
    </MinimalCard>
  );
}
