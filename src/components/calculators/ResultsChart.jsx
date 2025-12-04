import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const ResultsChart = ({ data, fireNumber }) => {
    const labels = data.map(d => d.year);
    const corpusData = data.map(d => d.corpus);
    const fireTargetData = data.map(() => fireNumber);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Net Worth',
                data: corpusData,
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 3,
            },
            {
                label: 'FIRE Target',
                data: fireTargetData,
                borderColor: 'rgb(239, 68, 68)',
                borderDash: [10, 5],
                borderWidth: 2,
                fill: false,
                pointRadius: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
                    font: {
                        size: 12,
                        weight: 'bold'
                    }
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        label += '$' + Math.round(context.parsed.y).toLocaleString();
                        return label;
                    }
                }
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Year',
                    color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
                    font: {
                        weight: 'bold'
                    }
                },
                ticks: {
                    color: document.documentElement.classList.contains('dark') ? '#9ca3af' : '#4b5563',
                },
                grid: {
                    color: document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb',
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Amount ($)',
                    color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
                    font: {
                        weight: 'bold'
                    }
                },
                ticks: {
                    color: document.documentElement.classList.contains('dark') ? '#9ca3af' : '#4b5563',
                    callback: function (value) {
                        return '$' + (value / 1000).toFixed(0) + 'K';
                    }
                },
                grid: {
                    color: document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb',
                }
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default ResultsChart;
