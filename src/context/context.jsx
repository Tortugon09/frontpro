import {createContext, useState, useEffect, useReducer} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


export const Context = createContext();


export const ContexProvider = ({ children }) => {


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





    return (
        <Context.Provider
            value={{
                createUserPost,
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