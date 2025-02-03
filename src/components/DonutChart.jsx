import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

export default function DonutChart() {
  const data = [
    { name: 'Tour', value: 31 },
    { name: 'Activity', value: 32 },
    { name: 'Attraction', value: 37 },
  ];

  const gradients = {
    Tour: { start: '#517897', end: '#006FFF' },
    Activity: { start: '#FF6A13', end: '#FFF82E' },
    Attraction: { start: '#4CAF50', end: '#00CA08' },
  };

  return (
    <div className="h-[27dvw] flex flex-col bg-white rounded-lg">
      <div className="text-center">
        <h2 className="text-lg font-semibold mt-0 text-gray-700">
          Total Keuntungan
        </h2>
        <span className="text-md font-bold text-green-600 block mt-1">
          + 1.200.000
        </span>
      </div>

      <div className="flex-grow -translate-y-5">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              {data.map((entry) => (
                <linearGradient
                  key={`gradient-${entry.name}`}
                  id={`gradient-${entry.name}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={gradients[entry.name].start} />
                  <stop offset="100%" stopColor={gradients[entry.name].end} />
                </linearGradient>
              ))}
            </defs>

            {/* Pie Chart */}
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="49%" // Diperbesar dari 50%
              outerRadius="77%" // Diperbesar dari 80%
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#gradient-${entry.name})`} // Gunakan gradien yang sesuai
                />
              ))}
            </Pie>

            {/* Tooltip dan Legend */}
            <Tooltip />
            <Legend
              verticalAlign="bottom"
              height={40}
              iconType="circle"
              iconSize={10}
              wrapperStyle={{
                paddingTop: '0',
              }}
              formatter={(value) => (
                <span style={{ color: '#333', fontSize: '12px' }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
