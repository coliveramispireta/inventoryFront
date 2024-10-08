import { useState } from 'react';
import { useRouter } from 'next/router';
import useUsuario from '@/hooks/useUsuario';
import styles from '../styles/navBar.module.css'
import axios from 'axios';

export default function Home({ BASE_URL }) {

  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [alerta, setAlerta] = useState('')

  const { setUsuario } = useUsuario();

  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const { data } = await axios.post(`${BASE_URL}/usuario/login`, { user, pass })

      if (data.msg) {
        setAlerta(data.msg)
        return
      }

      setUsuario(data)
      localStorage.setItem('user', JSON.stringify(data))
      router.push('/inicio')

    } catch (e) {
      const mensajeError = e?.response?.data?.msg || 'Ocurrió un error inesperado';
      setAlerta(mensajeError);
  }

  }

  return (

    <div className="min-w-screen min-h-screen w-screen h-screen bg-gradient-to-tl from-[#232A2F] to-[#2A353D] flex justify-center items-center overflow-auto">

      <div className="w-[90%] h-[60%] md:w-[50%] lg:w-[70%] xl:w-[50%] grid grid-cols-1 lg:grid-cols-2">

        <div className={`${styles.banner} hidden lg:block rounded-l-md`}></div>

        <div className="bg-[#f4f4f4] rounded-md lg:rounded-r-md lg:rounded-l-none px-11 py-20 flex justify-center lg:justify-start lg:pl-20 xl:pl-16 2xl:pl-20 items-center">
          <form
            onSubmit={handleLogin}
          >
          <div className="items-center">
              <img src="img/logo.JPG" alt="Descripción de la imagen" width="500" height="500" className="items-center h-auto pb-10 -mt-6 w-72" />
          </div>

            <h3 className="text-[#142241] text-xl mb-12">Iniciar Sesión</h3>

            {alerta &&
              <p className='p-3 mb-5 text-center text-white bg-red-500 rounded-md'>{alerta}</p>
            }

            <div className="mb-3">
              <label
                htmlFor="usuario"
                className="block mb-3 font-bold text-gray-600"
              >
                Usuario:
              </label>

              <input
                type="text"
                id="usuario"
                className="w-full p-2 bg-white border rounded-md shadow-lg outline-none shadow-gray-200"
                onChange={e => setUser(e.target.value)}
                value={user}
              />

            </div>

            <div className="mb-3">
              <label
                htmlFor="usuario"
                className="block mb-3 font-bold text-gray-600"
              >
                Contraseña:
              </label>

              <input
                type="password"
                id="usuario"
                className="w-full p-2 bg-white border rounded-md shadow-lg outline-none shadow-gray-200"
                onChange={e => setPass(e.target.value)}
                value={pass}
              />
            </div>

            <input
              type="submit"
              value="Entrar"
              className="bg-[#2291B9] text-white font-bold cursor-pointer px-3 py-2 rounded-md hover:bg-[#2F9CC4] mt-5"
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const BASE_URL = process.env.URL_BACK
  return { props: { BASE_URL } }
}
 