import { useRouter } from "next/router"
import { modificarTituloCategoria } from "@/helpers";
import useUsuario from "@/hooks/useUsuario";
import { useEffect, useState } from "react";

export const Header = () => {

    const router = useRouter();
    const { changeToggle, setNavbar, usuario } = useUsuario()
    const [firstLetter, setFirstLetter] = useState("");

    useEffect(() => {
        if (usuario) {
          const letter = firstLetterName(usuario?.name);
          setFirstLetter(letter);
        }
      }, [usuario]);

      const letterColors = {
        A: 'bg-red-500', B: 'bg-blue-500', C: 'bg-green-500', D: 'bg-yellow-500',
        E: 'bg-purple-500', F: 'bg-pink-500', G: 'bg-indigo-500', H: 'bg-teal-500',
        I: 'bg-orange-500', J: 'bg-cyan-500', K: 'bg-lime-500', L: 'bg-amber-500',
        M: 'bg-emerald-500', N: 'bg-violet-500', O: 'bg-fuchsia-500', P: 'bg-rose-500',
        Q: 'bg-sky-500', R: 'bg-blue-600', S: 'bg-red-600', T: 'bg-green-600',
        U: 'bg-yellow-600', V: 'bg-purple-600', W: 'bg-pink-600', X: 'bg-indigo-600',
        Y: 'bg-teal-600', Z: 'bg-orange-600'
      };
    
      const getColorByFirstLetter = (firstLetter) => {
        return letterColors[firstLetter] || 'bg-gray-500';
      };
    
      const firstLetterName = (name) => {
        if (name && name.trim() !== "") return name.trim().charAt(0).toUpperCase();
        else return `<i className="lni lni-user"></i>`;
      };

    return (
        <header
            className="w-full h-[74px] bg-[#4c4c4d] text-white px-7 md:px-16 py-[22px] xl:flex justify-between border-b border-gray-300"
        >

            <div className="flex items-center justify-between">
                <p className="text-xl font-bold">
                    {modificarTituloCategoria(router.pathname) === 'CATEGORIAS' ? 'CATEGORÍAS' : modificarTituloCategoria(router.pathname)}
                </p>

                <button
                    type="button"
                    className="block p-2 xl:hidden"
                    onClick={() => {
                        changeToggle()
                        setNavbar(true)
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                    </svg>
                </button>
            </div>
            <div className="flex items-center ">

            <p className="text-xl">Hola! {usuario?.name} &nbsp;</p>

            <div
            id="dropdownNavbarLink"
            className={`rounded-full w-12 h-12 flex items-center justify-center text-center font-[530] text-white ${usuario && getColorByFirstLetter(usuario?.name.charAt(0).toUpperCase())}`}
            >
            <p className="text-3xl pr-[1px]">{firstLetter}</p>
            </div>
            </div>

        </header>
    )
}
