import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function SalesChart({ productType }) {
  const data = [
    { month: 'Jan', Tour: 700000, Activity: 400000, Attraction: 400000 },
    { month: 'Feb', Tour: 600000, Activity: 500000, Attraction: 500000 },
    { month: 'Mar', Tour: 800000, Activity: 700000, Attraction: 400000 },
    { month: 'Apr', Tour: 900000, Activity: 600000, Attraction: 700000 },
    { month: 'Mei', Tour: 700000, Activity: 500000, Attraction: 600000 },
    { month: 'Jun', Tour: 800000, Activity: 600000, Attraction: 800000 },
    { month: 'Jul', Tour: 900000, Activity: 700000, Attraction: 900000 },
    { month: 'Agu', Tour: 850000, Activity: 650000, Attraction: 750000 },
    { month: 'Sep', Tour: 950000, Activity: 800000, Attraction: 850000 },
    { month: 'Okt', Tour: 880000, Activity: 750000, Attraction: 800000 },
    { month: 'Nov', Tour: 920000, Activity: 820000, Attraction: 880000 },
    { month: 'Des', Tour: 980000, Activity: 900000, Attraction: 950000 },
  ];

  const gradients = {
    Tour: { start: '#517897', end: '#006FFF' },
    Activity: { start: '#FF6A13', end: '#FFF82E' },
    Attraction: { start: '#4CAF50', end: '#00CA08' },
  };

  return (
    <div className="pt-5 pb-3 rounded-lg ml-[-11px]">
      <div className="h-[27dvh]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            {/* Gradients */}
            <defs>
              {Object.keys(gradients).map((key) => (
                <linearGradient
                  key={key}
                  id={`gradient-${key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={gradients[key].start} />
                  <stop offset="100%" stopColor={gradients[key].end} />
                </linearGradient>
              ))}
            </defs>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis
              domain={[300000, 900000]}
              ticks={[300000, 500000, 700000, 900000, 1100000]}
              tickFormatter={(value) => `+${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip />
            <Bar
              dataKey={productType}
              fill={`url(#gradient-${productType})`}
              barSize={10}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
