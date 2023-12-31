import {Fragment, useContext, useState} from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {Bars3BottomLeftIcon, HomeIcon, XMarkIcon, BeakerIcon, BoltIcon, FireIcon, CubeIcon} from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import {Link, Route, Routes} from "react-router-dom";
import logo from "../assets/logo.jpg"
import jak from "../assets/logojak1.svg"
import {LineChart} from "./Line.jsx";
import {LineChart2} from "./Line2";
import {LineChart3} from "./Line3";
import {Context} from "../context/context.jsx";
import Stats from "./Stats.jsx";
import {LineChart4} from "./Line4.jsx";

const navigation = [
    { name: 'Home', href: '/home', icon: HomeIcon, current: true },
    { name: 'PH', href: '/home', icon: BeakerIcon, current: true },
    { name: 'Electric conductivity', href: '/home/CE', icon: BoltIcon, current: true },
    { name: 'Termopar', href: '/home/Temp', icon: FireIcon, current: true },
    { name: 'Ultrasonic', href: '/home/NA', icon: CubeIcon, current: true },

]

const userNavigation = [
    { name: 'Sign out', href: '/' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function SideBar() {
    const {login,token, setToken, setUserR,userR,setOpen, valores} = useContext(Context);

    function calcularMedia(arregloDatos) {
        if (!Array.isArray(arregloDatos) || arregloDatos.length === 0) {
            return 0; // Si el arreglo está vacío o no es un arreglo, retornamos 0 como valor predeterminado.
        }

        const suma = arregloDatos.reduce((acc, num) => acc + num, 0);
        const media = suma / arregloDatos.length;
        return media;
    }

    function calcularModa(arregloDatos) {
        if (!Array.isArray(arregloDatos) || arregloDatos.length === 0) {
            return null; // Si el arreglo está vacío o no es un arreglo, retornamos null.
        }

        const contador = new Map();
        let moda = null;
        let maxRepeticiones = 0;

        arregloDatos.forEach((valor) => {
            if (contador.has(valor)) {
                contador.set(valor, contador.get(valor) + 1);
            } else {
                contador.set(valor, 1);
            }

            if (contador.get(valor) > maxRepeticiones) {
                moda = valor;
                maxRepeticiones = contador.get(valor);
            }
        });

        return moda;
    }
    const valoresPH = valores.map((valor) => valor.ph)
    const valoresPHPred = valores.map((valor) => valor.ph + Math.random())
    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    const valoresCondu = valores.map((valor) => valor.condu)
    const valoresConduPred = valores.map((valor) => valor.condu + getRandomArbitrary(1, 30))
    const valoresTemp = valores.map((valor) => valor.termo)
    const valoresTempPred = valores.map((valor) => valor.termo + getRandomArbitrary(1, 30))
    const valoresUS = valores.map((valor) => valor.otroSensor)
    const valoresUSPred = valores.map((valor) => valor.otroSensor + getRandomArbitrary(1, 30))

    const PhMedia = calcularMedia(valoresPH)
    const PhModa = calcularModa(valoresPH)
    const PhMedia1 = calcularMedia(valoresPHPred)
    const PhModa1 = calcularModa(valoresPHPred)
    const CEMedia = calcularMedia(valoresCondu)
    const CEModa1 = calcularModa(valoresCondu)
    const CEMedia1 = calcularMedia(valoresConduPred)
    const CEModa = calcularModa(valoresConduPred)
    const TPMedia = calcularMedia(valoresTemp)
    const TPModa = calcularModa(valoresTemp)
    const TPMedia1 = calcularMedia(valoresTempPred)
    const TPModa1 = calcularModa(valoresTempPred)
    const USMedia = calcularMedia(valoresTemp)
    const USModa = calcularModa(valoresTemp)
    const USMedia1 = calcularMedia(valoresUSPred)
    const USModa1 = calcularModa(valoresUSPred)
    console.log(valores)

    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <>
            <div className="h-screen bg-bgcolor">
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-bgcolor pt-5 pb-4">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                                            <button
                                                type="button"
                                                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                                onClick={() => setSidebarOpen(false)}
                                            >
                                                <span className="sr-only">Close sidebar</span>
                                                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="flex flex-shrink-0 items-center px-4">
                                        <img
                                            className="h-8 w-auto"
                                            src={logo}
                                            alt="Your Company"
                                        />
                                    </div>
                                    <div className="mt-5 h-0 flex-1 overflow-y-auto">
                                        <nav className="space-y-1 px-2">
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    to={item.href}
                                                    className={classNames(
                                                        item.current ? 'bg-transparent text-gris-text' : 'text-indigo-100 hover:bg-indigo-600',
                                                        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                                    )}
                                                >
                                                    <item.icon className="mr-4 h-6 w-6 flex-shrink-0 text-gris-text" aria-hidden="true" />
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </nav>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                            <div className="w-14 flex-shrink-0" aria-hidden="true">
                                {/* Dummy element to force sidebar to shrink to fit close icon */}
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex flex-grow flex-col overflow-y-auto bg-bgcolor pt-5 border-r-2 border-black">
                        <div className="flex justify-center items-center px-4">
                            <img
                                className="h-10 w-auto"
                                src={jak}
                                alt="Your Company"
                            />
                        </div>
                        <div className="mt-5 flex flex-1 flex-col">
                            <nav className="flex-1 space-y-1 px-2 pb-4">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                            item.current ? 'bg-transparent text-gray-100' : 'text-indigo-100 hover:bg-indigo-600',
                                            'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                        )}
                                    >
                                        <item.icon className="mr-3 h-6 w-6 flex-shrink-0 text-gris-color" aria-hidden="true" />
                                        {item.name}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 flex-col md:pl-64">
                    <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-bgcolor shadow border-b-2 border-black">
                        <button
                            type="button"
                            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                        <div className="flex flex-1 justify-between px-4">
                            <div className="flex flex-1">
                            </div>
                            <div className="ml-4 flex items-center md:ml-6">
                                <h2 className="flex justify-center items-center text-center text-m font-bold text-white">
                                    <img
                                        className="mx-3 h-4 w-auto"
                                        src={jak}
                                        alt="mabe logo"
                                    />
                                    Advanced Analytics
                                </h2>
                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                alt=""
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            {userNavigation.map((item) => (
                                                <Menu.Item key={item.name}>
                                                    {({ active }) => (
                                                        <Link
                                                            to={item.href}
                                                            className={classNames(
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm text-gray-700'
                                                            )}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <main>
                        <div className="py-6 bg-bgcolor h-full">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                                <a href={"http://18.117.225.35/admin"} className="text-2xl font-semibold text-text">Dashboard</a>
                            </div>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                                <div className="py-4">
                                    <Routes>
                                        <Route path={"/"} element={ <><Stats tittle={"PH"} moda={PhModa} media={PhMedia} moda1={PhModa1} media1={PhMedia1}/><LineChart/> </> }/>
                                        <Route path={"/CE"} element={<><Stats tittle={"Electric conductivity"} moda={CEModa} media={CEMedia} moda1={CEModa1} media1={CEMedia1}/><LineChart2/> </>}/>
                                        <Route path={"/Temp"} element={<><Stats tittle={"Temp"} moda={TPModa} media={TPMedia} moda1={TPModa1} media1={TPMedia1}/><LineChart3/> </>}/>
                                        <Route path={"/NA"} element={<><Stats tittle={"Ultrasonic"} moda={USModa} media={USMedia} moda1={USModa1} media1={USMedia1}/><LineChart4/> </>}/>
                                    </Routes>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}