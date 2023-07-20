import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid'
import {useContext} from "react";
import {Context} from "../context/context.jsx";



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Stats({moda = 10, media = 10, moda1 = 10, media1= 10, tittle = 10}) {
    function calcularPorcentajeDiferencia(valorAnterior, valorNuevo, precision = 2) {
        if (typeof valorAnterior !== 'number' || typeof valorNuevo !== 'number') {
            return 0;
        }

        if (valorAnterior === valorNuevo) {
            return 0; // Si los valores son iguales, el porcentaje de diferencia es 0.
        }

        const diferencia = valorNuevo - valorAnterior;
        const porcentaje = (diferencia / Math.abs(valorAnterior)) * 100;

        return parseFloat(porcentaje.toFixed(precision));
    }

    const porcentajeDiferencia1 = calcularPorcentajeDiferencia(moda, moda1);
    const porcentajeDiferencia2 = calcularPorcentajeDiferencia(media, media1);
    const porcentajeDiferencia3 = calcularPorcentajeDiferencia(media, media1);



    function decresed (valor) {
        if (valor < 0 ) return 'decrease'
        else return 'increase'
    }

    const type1 = decresed(porcentajeDiferencia1)
    const type2 = decresed(porcentajeDiferencia2)
    const type3 = decresed(porcentajeDiferencia3)

    const moda2 = () => {
        if (!moda1) {
            return 0
        } else {
            return moda1.toFixed(2)
        }
    }
    const moda3 = () => {
        if (!moda) {
            return 0
        } else {
            return moda.toFixed(2)
        }
    }

    const media2 = () => {
        if (!media) {
            return 0
        } else {
            return media.toFixed(2)
        }
    }
    const media3 = () => {
        if (!media1) {
            return 0
        } else {
            return media1.toFixed(2)
        }
    }


    const stats = [
        { name: 'Moda', stat: `${moda3()} ${tittle}`, previousStat: moda2(), change: `${porcentajeDiferencia1}%`, changeType: type1, type: "medida" },
        { name: 'Media', stat: `${media2()} ${tittle}`, previousStat: media3(), change: `${porcentajeDiferencia2}%`, changeType: 'decrease', type: type2 },
    ]



    return (
        <div className="mb-10">
            <h3 className="text-lg font-medium leading-6 text-white">Last 30 days</h3>
            <dl className="mt-5 grid grid-cols-1 divide-y divide-text2 overflow-hidden rounded-lg bg-bgcolor2 shadow md:grid-cols-2 md:divide-y-0 md:divide-x">
                {stats.map((item) => (
                    <div key={item.name} className="px-4 py-5 sm:p-6">
                        <dt className="text-base font-normal text-white">{item.name}</dt>
                        <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                            <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                                {item.stat}
                                <span className="ml-2 text-sm font-medium text-gray-500">{item.type == "pred" ? `PH esperado ${item.previousStat}` : `${tittle} PREDICTION ${item.previousStat}` }</span>
                            </div>

                            <div
                                className={classNames(
                                    item.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                                    'inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0'
                                )}
                            >
                                {item.changeType === 'increase' ? (
                                    <ArrowUpIcon
                                        className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                                        aria-hidden="true"
                                    />
                                ) : (
                                    <ArrowDownIcon
                                        className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
                                        aria-hidden="true"
                                    />
                                )}

                                <span className="sr-only"> {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
                                {item.change}
                            </div>
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    )
}
