import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { ModalStock } from '@/components/ModalStock';
import { StockComponent } from '@/components/StockComponent';
import useUsuario from "@/hooks/useUsuario";
import Modal from 'react-modal';
import useSWR from 'swr'
import axios from 'axios';
import styles from '../styles/sppiner.module.css'

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(6, 6, 6, 0.45)',
        height: '100vh',
        width: '100vw'
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: '#fff',
        padding: '0',
        maxWidth: '90%',
        maxHeight: '90%',
        overflow: 'hidden',
        overflow: 'auto',
    },
};

Modal.setAppElement('#__next');

export default function Stock({ BASE_URL }) {

    const { changeModalStockOrigin, modalStockOrigin, noAcces, usuario } = useUsuario();
    const [busqueda, setBusqueda] = useState('')
    const [filtrarInsumos, setFiltrarInsumos] = useState(null);// Nuevo estado para el filtro de Insumos

    const fetcher = () => axios(`${BASE_URL}/stock/listar-stock/${usuario.token}`).then(datos => datos.data)
    const { data, error, isLoading } = useSWR(`${BASE_URL}/stock/listar-stock/${usuario.token}`, fetcher, { refreshInterval: 100 })

    // Filtrar por búsqueda
    const stockFiltrado = data 
    ? data.filter(stock => 
        stock.codigo?.toLowerCase()?.includes(busqueda.toLowerCase() || '')
      )
    : [];

    // Aplicar el filtro de Insumos o Productos
    const stockFinal = filtrarInsumos !== null
        ? stockFiltrado.filter(stock => stock.insumo === filtrarInsumos)
        : stockFiltrado;

    return (
        <Layout>

            {error?.response?.data?.msg ?

                <p className='text-xl text-center'>{noAcces}</p>
                :
                <>
   {/* Input de búsqueda */}
                    <div className="text-gray-800 md:flex md:justify-between md:items-center">
                        <div
                            className="flex items-center bg-white rounded-md shadow shadow-gray-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-5 text-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>

                            <input
                                type="text"
                                className="w-full py-2 pl-2 pr-6 text-gray-800 placeholder-gray-400 rounded-md outline-none md:w-96"
                                placeholder="Buscar: Ej. xx-xx"
                                onChange={e => setBusqueda(e.target.value)}
                            />
                        </div>
 {/* Botón Agregar */}
 <button
                            className="flex items-center gap-3 px-3 py-2 mt-3 md:mt-0 hover:bg-gray-300 rounded-xl"
                            onClick={changeModalStockOrigin}
                        >
                            Agregar
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    </div>
 {/* Botones de Filtro */}
 <div className='flex gap-4 mt-3'>
                        <button
                            className={`flex items-center gap-3 px-3 py-2 hover:bg-gray-300 rounded-xl ${filtrarInsumos === null ? 'bg-gray-200' : ''}`}
                            onClick={() => setFiltrarInsumos(null)}
                        >
                            Todo
                        </button>
                        <button
                            className={`flex items-center gap-3 px-3 py-2 hover:bg-gray-300 rounded-xl ${filtrarInsumos === true ? 'bg-gray-200' : ''}`}
                            onClick={() => setFiltrarInsumos(true)}
                        >
                            Insumos
                        </button>
                        <button
                            className={`flex items-center gap-3 px-3 py-2 hover:bg-gray-300 rounded-xl ${filtrarInsumos === false ? 'bg-gray-200' : ''}`}
                            onClick={() => setFiltrarInsumos(false)}
                        >
                            Productos
                        </button>
                    </div>
  {/* Tabla de Stock */}
                    {
                        data && data.length ?
                            <div className='overflow-auto'>
                                <table
                                    className={`w-full bg-white border mt-6 ${isLoading ? 'hidden' : 'table'}`}
                                >
                                    <thead>
                                        <tr className="border-b">
                                            <th className="p-2 text-start lg:px-7 lg:py-5">Código</th>
                                            <th className="p-2 text-start lg:px-7 lg:py-5">Nombre</th>
                                            <th className="p-2 text-start lg:px-7 lg:py-5">Cantidad</th>
                                            <th className="p-2 text-start lg:px-7 lg:py-5">Costo (und)</th>
                                            <th className="p-2 text-start lg:px-7 lg:py-5">Venta (und)</th>
                                            <th className="p-2 text-start lg:px-7 lg:py-5">Estado</th>
                                            <th className="p-2 text-start lg:px-7 lg:py-5"></th>
                                        </tr>
                                    </thead>
 
                                    <tbody>
                                        {
                                            stockFinal.map(stock =>
                                                <StockComponent
                                                    key={stock._id}
                                                    stock={stock}
                                                    BASE_URL={BASE_URL}
                                                />
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                            :
                            <p className='mt-10 text-xl text-center uppercase'>Sin Stock</p>
                    }

                    <div className={`${styles.skchase} ${isLoading ? 'block' : 'hidden'} my-16 m-auto`}>
                        <div className={`${styles.skchasedot}`}></div>
                        <div className={`${styles.skchasedot}`}></div>
                        <div className={`${styles.skchasedot}`}></div>
                        <div className={`${styles.skchasedot}`}></div>
                        <div className={`${styles.skchasedot}`}></div>
                        <div className={`${styles.skchasedot}`}></div>
                    </div>

                    <Modal
                        isOpen={modalStockOrigin}
                        style={customStyles}
                    >
                        <ModalStock
                            BASE_URL={BASE_URL}
                        />
                    </Modal>
                </>
            }
        </Layout>
    )
}

export async function getStaticProps() {
    const BASE_URL = process.env.URL_BACK
    return { props: { BASE_URL } }
}