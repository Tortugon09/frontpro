import React, {useContext} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {Context} from "../context/context.jsx";
import {math} from "@tensorflow/tfjs";
// import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
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
            text: 'Chart.js Line Chart',
        },
    },
};

export function LineChart() {
    const {valores} = useContext(Context);
    const valoresPH = valores.map((valor) => valor.ph)
    const valoresPHPred = valores.map((valor) => valor.ph + Math.random())
    const labels = valores.map((valor) => {
        const fecha = new Date(valor.timestamp)
        const dia = fecha.getDate();
        const mes = fecha.getMonth() + 1; // Los meses en JavaScript son base 0, por lo que se suma 1
        const ano = fecha.getFullYear();
        const representacionFecha = `${dia}/${mes}/${ano}`;
        return (representacionFecha)
    });

    const data = {
        labels,
        datasets: [
            {
                label: 'PH',
                data: valoresPH, // Datos estáticos o personalizados
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'PH Predicho',
                data: valoresPHPred, // Datos estáticos o personalizados
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return <Line options={options} data={data} />;
}