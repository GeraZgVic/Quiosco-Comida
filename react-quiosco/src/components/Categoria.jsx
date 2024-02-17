import useQuiosco from "../hooks/useQuiosco";
export default function Categoria({categoria}) {

    const {handleClickCategoria,categoriaActual} = useQuiosco();

    const {icono,id,nombre} = categoria;

  return (
    <div className={`${categoriaActual.id === id ? 'bg-amber-400' : 'bg-white'} flex items-cente gap-4 border w-full p-3 transition duration-300 ease-in-out hover:bg-amber-400 cursor-pointer`}>
        <img 
            src={`/img/icono_${icono}.svg`} 
            alt="imagen icono" 
            className="w-12"
        
        />

        <button 
          type="button"
          className="font-bold text-lg cursor-pointer truncate w-full flex"
          onClick={() => handleClickCategoria(id)}
          >
            {nombre}
        </button>

    </div>
  )
}
