import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { ModalCabecera } from '@/components/ModalCabecera';
import { Cabecera } from '@/components/Cabecera';
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

export default function Cabeceras({ BASE_URL }) {

    const { changeModalCabecera, modalCabecera, noAcces, usuario } = useUsuario();
    const [busqueda, setBusqueda] = useState('')

    const fetcher = () => axios(`${BASE_URL}/factura/listar-cabecera-facturas/${usuario.token}`).then(datos => datos.data)
    const { data, error, isLoading } = useSWR(`${BASE_URL}/factura/listar-cabecera-facturas/${usuario.token}`, fetcher, { refreshInterval: 100 })

    const cabeceraFiltrada = busqueda === ''
        ? data
        : data.filter(cabecera => cabecera.direccion.toLowerCase().includes(busqueda.toLowerCase()))

    return (
        <Layout>
            {error?.response?.data?.msg ?

                <p className='text-xl text-center'>{noAcces}</p>
                :
                <>
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
                                placeholder="Buscar: Ej. Av. Amazonas"
                                onChange={e => setBusqueda(e.target.value)}
                            />
                        </div>

                        <button
                            className="flex items-center gap-3 px-3 py-2 mt-3 md:mt-0 hover:bg-gray-300 rounded-xl"
                            onClick={changeModalCabecera}
                        >
                            Agregar
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    </div>

                    {
                        data && data.length ?
                            <div className='overflow-auto'>
                                <table
                                    className={`w-full bg-white border mt-6 ${isLoading ? 'hidden' : 'table'}`}
                                >
                                    <thead>
                                        <tr className="border-b">
                                            <th className="p-2 text-start lg:px-7 lg:py-5">Razón Social</th>
                                            <th className="p-2 text-start lg:px-7 lg:py-5">Sucursal</th>
                                            <th className="p-2 text-start lg:px-7 lg:py-5">Dirección</th>
                                            <th className="p-2 text-start lg:px-7 lg:py-5"></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            cabeceraFiltrada.map(cabecera =>
                                                <Cabecera
                                                    key={cabecera._id}
                                                    cabecera={cabecera}
                                                    BASE_URL={BASE_URL}
                                                />
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                            :
                            <p className='mt-10 text-xl text-center uppercase'>Sin Cabeceras</p>
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
                        isOpen={modalCabecera}
                        style={customStyles}
                    >
                        <ModalCabecera
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