import {createContext, useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
// Importar TensorFlow.js
import * as tf from '@tensorflow/tfjs';

export const Context = createContext();


export const ContexProvider = ({ children }) => {

// Definir los datos de entrenamiento
    const datosEntrenamiento = [
        { pH: 6.7, fecha: new Date('2023-07-01') },
        { pH: 7.2, fecha: new Date('2023-07-02') },
        { pH: 5.5, fecha: new Date('2023-07-03') },
        // Agrega más datos de entrenamiento aquí
    ];

// Obtener los valores máximos y mínimos de pH
    const minPh = 1;
    const maxPh = 14;

// Convertir los datos de entrenamiento en tensores
    const tensorDatosEntrenamiento = tf.tensor2d(
        datosEntrenamiento.map(d => [d.fecha.getTime(), d.pH]),
        [datosEntrenamiento.length, 2]
    );

// Normalizar los valores de pH entre 0 y 1
    const tensorDatosNormalizados = tensorDatosEntrenamiento
        .sub([0, minPh])
        .div([1, maxPh - minPh]);

// Separar los tensores normalizados en características (fechas) y etiquetas (valores de pH)
    const tensorFechas = tensorDatosNormalizados.slice([0, 0], [-1, 1]);
    const tensorPh = tensorDatosNormalizados.slice([0, 1], [-1, 1]);

// Crear el modelo
    const modelo = tf.sequential();
    modelo.add(tf.layers.dense({ units: 8, inputShape: [1], activation: 'relu' }));
    modelo.add(tf.layers.dense({ units: 1 }));

// Compilar el modelo
    modelo.compile({ loss: 'meanSquaredError', optimizer: 'adam' });

// Entrenar el modelo
    modelo.fit(tensorFechas, tensorPh, { epochs: 100 })
        .then(() => {
            // Hacer predicciones
            const datosPrediccion = [
                { pH: 6.9, fecha: new Date('2023-07-04') },
                { pH: 7.8, fecha: new Date('2023-07-05') },
                { pH: 5.1, fecha: new Date('2023-07-06') }
            ];

            const tensorDatosPrediccion = tf.tensor2d(
                datosPrediccion.map(d => [d.fecha.getTime()]),
                [datosPrediccion.length, 1]
            );

            const tensorDatosPrediccionNormalizados = tensorDatosPrediccion
                .sub([0])
                .div([1]);

            const prediccionesNormalizadas = modelo.predict(tensorDatosPrediccionNormalizados);

            const predicciones = Array.from(prediccionesNormalizadas.dataSync());

            console.log(predicciones);
        })
        .catch(err => console.error(err));




    const navigate = useNavigate();
    const [open, setOpen] = useState(false);


    const [order,setOrder] =useState({
        shippingId: 0 ,
        billId: 0 ,
        statusOrderId: 0
    })
    const [token, setToken] = useState(() => {
        try {
            const ProductsInLocalStorage = localStorage.getItem('token')
            return ProductsInLocalStorage ? JSON.parse(ProductsInLocalStorage) : ""
        } catch (error) {
            return "";
        }
    })

    //STATES FOR THE PRODUCTS
    const [products, setProducts] = useState([]);
    const [valores, setValores] = useState([]);
    //STATES FOR THE USERS

    //STATE FOR ALL USERS
    const [users, setUsers] = useState(
    )
    //STATE FOR THE USER IN SESION
    const [userR, setUserR] = useState(() => {
        try {
            const ProductsInLocalStorage = localStorage.getItem('LoginUserR')
            return ProductsInLocalStorage ? JSON.parse(ProductsInLocalStorage) : {}
        } catch (error) {
            return {};
        }
    })
    //STATE IF THE USER LOGIN IS TRUE?
    const [loginUser, setLoginUser] = useState(() => {
        try {
            const ProductsInLocalStorage = localStorage.getItem('LoginUser')
            return ProductsInLocalStorage ? JSON.parse(ProductsInLocalStorage) : false
        } catch (error) {
            return false;
        }
    })
    console.log(token)

    const instance = axios.create();
    instance.defaults.headers.common['Authorization'] = token;
    axios.defaults.headers.common['Authorization'] = token;


    //EJECUTE FOR THE REQUESTS
    useEffect(() =>{
        localStorage.setItem("LoginUser", JSON.stringify(loginUser))
    }, [loginUser]);

    useEffect(() =>{
        localStorage.setItem("LoginUserR", JSON.stringify(userR))
    }, [userR]);
    useEffect(() =>{
        localStorage.setItem("token", JSON.stringify(token))
    }, [token]);

    // REQUEST FOR THE USERS
    const login = async (user) => {
        const {email, password} = user
        await axios
            .post("http://3.16.48.171:8080/login", {email,password})
            .then( async(response) => {
                setToken(response.headers['authorization'])
                await axios({
                    method: 'get',
                    url: `http://3.16.48.171:8080/client/findByEmail?email=${email}`,
                    headers: {'Authorization': `${response.headers['authorization']}`}
                }).then(function (response) {
                    console.log(response.data.data)
                    setUserR(response.data.data);
                    setLoginUser(true)
                    navigate("/HappyWeb/HappyWeb")
                }).catch(function (error) {
                    console.log(error);
                });
            }).catch(function (error){
                setOpen(true)
            })
    }

    const getUser = async () => {
        await axios({
            method: 'get',
            url: `http://3.16.48.171:8080/client/findByEmail?email=${userR[0].email}`,
        }).then(function (response) {
            console.log(response.data.data)
            setUserR(response.data.data);
        }).catch(function (error) {
            console.log(error);
        });
    }


    const createUserPost= async(user) => {
        const { email, lastName, name, password,phone } = user;
        await axios.post("http://3.16.48.171:8080/client/register", { email ,lastName , name, password , phone });
        getUser();
        navigate("/HappyWeb/LogIn")
    }

    useEffect(() => {
        getPH();
    }, []);


    const getPH= async() => {
        await axios.get("http://3.16.51.196/watersample/get_sample_day/2023-07-15").then(
            function (response){
                console.log(response.data.data)
                setValores(response.data.data)
            }
        )
            .catch(function (error) {
                console.log(error)
            });
    }







    return (
        <Context.Provider
            value={{
                createUserPost,
                valores,
                setValores,
                setUserR,
                login,
                setLoginUser,
                userR,
                loginUser,
                users,
                token,
                setToken,
                setOpen,
                open
            }}>
            {children}
        </Context.Provider>
    );
};