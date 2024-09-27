import useUsuario from "@/hooks/useUsuario"
import { ModalConsultarStock } from "./ModalConsultarStock";

export const ModalMostrarStock = ({ BASE_URL, stockFiltrado, setProductoState, setDescripcionProducto, setBusqueda }) => {

    const { changeModalStock } = useUsuario();

    return (
        <>
            <div className="px-5 py-10 border-b border-gray-300">
                <div className="text-center">
                    <button onClick={changeModalStock}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 p-1 bg-red-100 rounded-full hover:bg-red-600 hover:text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <span className="block text-2xl text-center">Stock</span>
            </div>

            <div className="bg-[#f5f7f8] py-6 px-6">

                <div
                    className="flex items-center w-full m-auto mb-5 bg-white rounded-md shadow shadow-gray-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-5 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>

                    <input
                        type="text"
                        className="w-full py-2 pl-2 pr-6 text-gray-800 placeholder-gray-400 rounded-md outline-none"
                        placeholder="Buscar: Ej. xxx-xxx-xxx"
                        onChange={e => setBusqueda(e.target.value)}
                    />
                </div>

                <div className='w-full overflow-auto'>
                    <table
                        className="w-full bg-white border"
                    >
                        <thead>
                            <tr className="border-b">
                                <th className="p-2 text-start lg:px-7 lg:py-5">Cod.</th>
                                <th className="p-2 text-start lg:px-7 lg:py-5">Nombre</th>
                                <th className="p-2 text-start lg:px-7 lg:py-5">Cant.</th>
                                <th className="p-2 text-start lg:px-7 lg:py-5">Pre. Uni.</th>
                                <th className="p-2 text-start lg:px-7 lg:py-5"></th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                stockFiltrado.map(stock => (
                                    <ModalConsultarStock
                                        key={stock._id}
                                        stock={stock}
                                        BASE_URL={BASE_URL}
                                        setProductoState={setProductoState}
                                        setDescripcionProducto={setDescripcionProducto}
                                    />
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
