import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Conjunto de datos 1',
            data: [100, 200, 300, 400, 500, 600, 700], // Datos estáticos o personalizados
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Conjunto de datos 2',
            data: [200, 300, 400, 500, 600, 700, 800], // Datos estáticos o personalizados
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};


export function Chart() {
    return <Bar options={options} data={data} />;
}
