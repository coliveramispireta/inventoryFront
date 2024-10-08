import useUsuario from '@/hooks/useUsuario';
import { formatearFecha } from '@/helpers';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const Factura = ({ BASE_URL, factura }) => {

    const { _id, numeroFactura, subtotal, descuento, total, createdAt } = factura
    const { setIdFactura, changeModalDetalleFactura, usuario } = useUsuario()
    const [nameProducto, setNameProducto] = useState('')

    useEffect(() => {
        const contultData = async () => {

            const { data } = await axios.get(`${BASE_URL}/factura/listar-factura/${_id}/${usuario.token}`)
            console.log("res: ", data)
            setNameProducto( data.cuerpo[0].descripcionProducto)
        }
        contultData()                        
    }, []);

    const acciones = async () => {
        setIdFactura(_id)
        changeModalDetalleFactura()
    }

    return (
        <tr className="even:bg-[#F8F8F8] border-b last-of-type:border-none">
            <td className="p-2 text-start lg:px-7 lg:py-5">{numeroFactura}</td>
            <td className="p-2 text-start lg:px-7 lg:py-5"> {nameProducto}</td>
            <td className="p-2 text-start lg:px-7 lg:py-5">S/. {parseFloat(subtotal.$numberDecimal).toFixed(2)}</td>
            <td className="p-2 text-start lg:px-7 lg:py-5">S/. {parseFloat(descuento?.$numberDecimal).toFixed(2)}</td>
            <td className="p-2 text-start lg:px-7 lg:py-5">S/. {parseFloat(total.$numberDecimal).toFixed(2)}</td>
            <td className="p-2 text-start lg:px-7 lg:py-5">{formatearFecha(createdAt)}</td>
            <td className="p-2 text-start lg:px-7 lg:py-5">
                <button
                    className="ml-5 text-[#0C8AB7]"
                    onClick={acciones}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>
            </td>
        </tr>
    )
}
