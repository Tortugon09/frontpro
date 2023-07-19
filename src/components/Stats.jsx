import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid'

const stats = [
    { name: 'PH Esperado', stat: '8 PH', previousStat: '9', change: '11.11111111111111%', changeType: 'decrease', type: "pred" },
    { name: 'Moda PH', stat: '7 PH', previousStat: '8', change: '10.0%', changeType: 'increase', type: "medida" },
    { name: 'Media PH', stat: '7.81 PH', previousStat: '8.11', change: '3.69%', changeType: 'decrease', type: "medida" },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Stats() {
    return (
        <div className="mb-10">
            <h3 className="text-lg font-medium leading-6 text-white">Last 30 days</h3>
            <dl className="mt-5 grid grid-cols-1 divide-y divide-text2 overflow-hidden rounded-lg bg-bgcolor2 shadow md:grid-cols-3 md:divide-y-0 md:divide-x">
                {stats.map((item) => (
                    <div key={item.name} className="px-4 py-5 sm:p-6">
                        <dt className="text-base font-normal text-white">{item.name}</dt>
                        <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                            <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                                {item.stat}
                                <span className="ml-2 text-sm font-medium text-gray-500">{item.type == "pred" ? `PH esperado ${item.previousStat}` : `PH anterior ${item.previousStat}` }</span>
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