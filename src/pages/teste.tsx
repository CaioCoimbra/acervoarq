export default function ListaAdmins() {

  const divInputStyle = "flex flex-col gap-2"
  const inputStyle = "bg-zinc-200 rounded-lg pl-3 py-1 placeholder:text-zinc-400 text-black h-[32px]"


  return (
    <>
      <div className={divInputStyle}>
        <label htmlFor="">Área</label>
        <div>
          <input type="text" className={`${inputStyle} rounded-r-none`} placeholder="Ex: 1.500" />
          <select name="" id="" className={`${inputStyle} rounded-l-none py-1! px-0!`}>
            <option value="">m²</option>
            <option value="">km²</option>
          </select>
        </div>
      </div>
    </>
  );
}