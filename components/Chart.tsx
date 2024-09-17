import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CoinChart = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart',
          {
            params: {
              vs_currency: 'usd',
              days: 7,
            },
          }
        );

        const prices = data.prices.map((price: number[]) => ({
          x: new Date(price[0]).toLocaleDateString(),
          y: price[1],
        }));

        setChartData({
          labels: prices.map(price => price.x),
          datasets: [
            {
            //   label: 'Bitcoin Price (USD)',
              data: prices.map(price => price.y),
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 0.25,
              fill: true,
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? <p>Loading...</p> : <Line data={chartData} />}
    </div>
  );
};

export default CoinChart;
