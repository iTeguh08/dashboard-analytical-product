import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function SalesChart({ productType, products, orders }) {
  const getSalesData = (category) => {
    const salesData = orders
      .filter(order => order.status === 'Sukses' && products.some(product => product.nama === order.produk && product.kategori === category))
      .reduce((acc, order) => {
        const month = new Date(order.tanggal).toLocaleString('default', { month: 'short' });
        const product = products.find(p => p.nama === order.produk);
        const totalPrice = product ? product.harga * order.jumlah : 0;
        acc[month] = (acc[month] || 0) + totalPrice;
        return acc;
      }, {});

    const data = [];
    for (let i = 0; i < 12; i++) {
      const month = new Date(0, i).toLocaleString('default', { month: 'short' });
      data.push({ month, [category]: salesData[month] || 0 });
    }
    return data;
  };

  const data = getSalesData(productType);

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

