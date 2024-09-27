import { useState } from "react"
import useUsuario from "@/hooks/useUsuario";
import axios from "axios"

export const ModalConsultarStock = ({ BASE_URL, stock, setProductoState, setDescripcionProducto }) => {

    const [alerta, setAlerta] = useState(false);

    const {
        changeModalStock,
        usuario
    } = useUsuario()

    const consultarStock = async (id) => {
        try {
            const { data } = await axios.post(`${BASE_URL}/factura/comprobar-stock/${id}/${usuario.token}`)

            if (data.msg) {
                setAlerta(true)

                setTimeout(() => {
                    setAlerta(false)
                }, 2000);
                return
            }

            changeModalStock()
            setProductoState(data)
            setDescripcionProducto(data)
             console.log("data: ", data); 

        } catch (error) { console.log(error) }
    }

    return (
        <tr
            className="even:bg-[#F8F8F8] border-b last-of-type:border-none"
        >
            <td className="p-2 text-start lg:px-7 lg:py-5">
                {stock.codigo}
            </td>
            <td className="p-2 text-start lg:px-7 lg:py-5">
                {stock.nombre}
            </td>
            <td className="p-2 text-start lg:px-7 lg:py-5">
                {stock.cantidad}
            </td>
            <td className="p-2 text-start lg:px-7 lg:py-5">
                S/. {stock.precioUnitario.$numberDecimal}
            </td>
            <td className="relative p-2 text-start lg:px-7 lg:py-5">
                <button
                    type="button"
                    className="bg-[#51B1D3] hover:bg-[#238DB4] p-2 md:p-2 rounded-full"
                    onClick={() => consultarStock(stock._id)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-7 md:h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>

                <span
                    className={`${alerta ? 'block' : 'hidden'} bg-red-500 rounded-md p-1 text-sm absolute left-[-85px] top-[20%] md:left-[-65px] md:top-[35%]`}
                >
                    Sin Unidades
                </span>
            </td>
        </tr>
    )
}
