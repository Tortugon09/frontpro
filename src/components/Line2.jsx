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
            text: 'Electric conductivity',
        },
    },
    scales: {
        x: {
            grid: {
                color: false
            }
        },
        y: {
            grid: {
                color : '#3D3C41'
            }
        }
    }
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];





export function LineChart2() {
    const {valores} = useContext(Context);

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    const valoresCondu = valores.map((valor) => valor.condu)
    const valoresConduPred = valores.map((valor) => valor.condu + getRandomArbitrary(1, 30))
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
                label: 'Electric conductivity',
                data: valoresCondu, // Datos estáticos o personalizados
                backgroundColor: ["#A4C695", "#1F1F1F"],
                borderColor: "#5E5CE6",
            },
            {
                label: 'Electric conductivity',
                data: valoresConduPred, // Datos estáticos o personalizados
                backgroundColor: ["#c5983e", "#292929"],
                borderColor: "#3D3C41",
            },
        ],
    };

    return <Line options={options} data={data} />;
}