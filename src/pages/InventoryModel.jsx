import { useForm } from "react-hook-form"
import useInvetoryModel from "../hook/useInvetoryModel"
import { useState } from "react"

const InventoryModel = () => {

  const [result, setResult] = useState([])
  const { handleSubmit, register } = useForm()
  const { calc_inventory } = useInvetoryModel()

  const onSubmit = handleSubmit(values => {
    console.log(values)
    const res = calc_inventory(values)
    setResult(res)
  })

  return (
    <div>
      <h1 className='font-bold text-3xl text-center my-8'>Modelo de Inventario (EOQ)</h1>

      <div className='grid md:grid-cols-2 mx-2 md:mx-10 gap-6'>
        <form
          onSubmit={onSubmit}
          className="p-5 grid gap-y-5 bg-white shadow-lg rounded-lg">
          <span className="font-bold text-center">Datos</span>
          <div className="grid md:grid-cols-3">
            <label className="md:col-span-2" htmlFor="">Costo de una orden</label>
            <input type="text" className="bg-gray-100 py-1.5 px-2 rounded"
              {...register("costoOrden", { required: true })}
            />
          </div>
          <div className="grid md:grid-cols-3">
            <label className="md:col-span-2" htmlFor="">Demanda anual de productos</label>
            <input type="text" className="bg-gray-100 py-1.5 px-2 rounded"
              {...register("demandaAnual", { required: true })}
            />
          </div>
          <div className="grid md:grid-cols-3">
            <label className="md:col-span-2" htmlFor="">Tasa de mantener una unidad de inventario (%)</label>
            <input type="text" className="bg-gray-100 py-1.5 px-2 rounded"
              {...register("tasaInventarioU", { required: true })}
            />
          </div>
          <div className="grid md:grid-cols-3">
            <label className="md:col-span-2" htmlFor="">Costo de una unidad de inventario</label>
            <input type="text" className="bg-gray-100 py-1.5 px-2 rounded"
              {...register("costoInventarioU", { required: true })}
            />
          </div>
          <div className="grid md:grid-cols-3">
            <label className="md:col-span-2" htmlFor="">Tiempo laborable (anual) en dias</label>
            <input type="text" className="bg-gray-100 py-1.5 px-2 rounded"
              {...register("diasLaborables", { required: true })}
            />
          </div>
          <div className="grid md:grid-cols-3">
            <label className="md:col-span-2" htmlFor="">Tiempo de espera en dias</label>
            <input type="text" className="bg-gray-100 py-1.5 px-2 rounded"
              {...register("diasEspera", { required: true })}
            />
          </div>
          <button className="bg-blue-500 py-2 px-5 text-white font-bold text-lg my-3">Calcular</button>
        </form>
        <div className="bg-white shadow-lg grid p-5">
          <span className="font-bold text-center">Resultados</span>
          {result.map((data, i) => (
            <div key={i} className="grid grid-cols-3 gap-x-4">
              <p className="col-span-2">{data.name}</p>
              <span>= {data.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default InventoryModel