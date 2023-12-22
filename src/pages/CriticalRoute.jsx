import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Modal from "../components/Modal"
import useCriticalRoute from "../hook/useCriticalRoute"
import { Graphviz } from 'graphviz-react'

const CriticalRoute = () => {

  const { handleSubmit, register, watch, reset } = useForm()
  const [setting, setSetting] = useState()
  const { getActividad, activity_format, cal_critical_route, generate_diagram } = useCriticalRoute()

  const [showModal, setShowModal] = useState(false)
  const [result, setResult] = useState([])
  const [resultDot, setResultDot] = useState('')


  const onSubmit = handleSubmit(values => {
    const data = activity_format(values)
    const results = cal_critical_route(data)
    const dot = generate_diagram(results)
    // console.log("RESULTADO", results)
    // console.log("DOT", dot)
    setResult(results)
    setResultDot(dot)
  })

  useEffect(() => {
    reset()
  }, [setting])

  return (
    <>

      <div className="max-w-5xl mx-auto">
        <h1 className='font-bold text-3xl text-center my-8'>Ruta critica CPM/PERT</h1>

        <div className="my-5 p-5 flex justify-center mx-auto">

          <form onSubmit={onSubmit} className="overflow-auto">
            <button onClick={() => setShowModal(true)} className='bg-green-800 px-2.5 rounded font-bold text-white py-2 mb-5'>Settings</button>
            {setting && (
              <>

                <table className="bg-white">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr className="divide-x divide-gray-200 text-center">
                      <th className="tracking-wide p-2">Actividad</th>
                      <th className="tracking-wide p-2">Predecesor</th>
                      {setting?.tipo === '1' && <th className="tracking-wide p-2">Duracion</th>}
                      {setting?.tipo === '2' && (
                        <>
                          <th>Tiempo optimista</th>
                          <th>Tiempo medio</th>
                          <th>Tiempo pesimista</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {Array.from({ length: setting?.num_actividades }).map((_, index) => (
                      <tr
                        key={index}
                        className="divide-x divide-gray-200 hover:bg-gray-100"
                      >
                        <td className="whitespace-nowrap p-2 text-center">
                          <input
                            type="text"
                            className="px-2 text-center"
                            readOnly
                            value={`${getActividad(index + 1)}`}
                            {...register(`actividad${index + 1}`)}
                          />
                        </td>
                        <td className="whitespace-nowrap p-2 text-center">
                          <input
                            type="text"
                            className="px-2 text-center"
                            pattern="^([A-Za-z](,\s?[A-Za-z])*)?$"
                            {...register(`predecesor${index + 1}`, {
                              pattern: /^([A-Za-z](,\s?[A-Za-z])*)?$/
                            })} />
                        </td>
                        {setting?.tipo === '2' && (
                          <>
                            <td>
                              <input type="text" {...register(`tiempoOptimista${index + 1}`)} />
                            </td>
                            <td>
                              <input type="text" {...register(`tiempoMedio${index + 1}`)} />
                            </td>
                            <td>
                              <input type="text" {...register(`tiempoPesimista${index + 1}`)} />
                            </td>
                          </>
                        )}
                        {setting?.tipo === '1' && (
                          <td className="whitespace-nowrap p-2 text-center">
                            <input
                              type="text"
                              className="px-2 text-center"
                              {...register(`duracion${index + 1}`, { required: true })}
                            />
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* <p className="text-red-800 font-semibold}">Escribe bien tus predecesores</p> */}
                <button className='bg-green-800 my-5 px-2.5 rounded font-bold text-white py-2'>CALCULAR</button>
              </>
            )}
          </form>

        </div>

      </div>

      <div className="grid md:grid-cols-2 mb-16 max-w-6xl mx-auto justify-center items-center gap-x-3 gap-y-8">
        {
          result.length !== 0 && (
            <>
              <Graphviz
                dot={resultDot}
                options={{zoom: true}}
              />

              <div className="overflow-auto w-full">
                <table className="bg-white">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr className="divide-x divide-gray-200 text-center">
                      <th className="tracking-wide p-2">Actividad</th>
                      <th className="tracking-wide p-2">Duracion</th>
                      <th className="tracking-wide p-2">Early Start</th>
                      <th className="tracking-wide p-2">Early Finish</th>
                      <th className="tracking-wide p-2">Late Start</th>
                      <th className="tracking-wide p-2">Late Finish</th>
                      <th className="tracking-wide p-2">Stack</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {result.map((task, i) => (
                      <tr
                        key={i}
                        className="divide-x divide-gray-200 hover:bg-gray-100"
                      >
                        <td className={`whitespace-nowrap p-2 text-center ${task.isCriticalPath ? 'text-red-500' : ''}`}>
                          {task.name}
                        </td>
                        <td className="whitespace-nowrap p-2 text-center">
                          {task.duration}
                        </td>
                        <td className="whitespace-nowrap p-2 text-center">
                          {task.earlyStart}
                        </td>
                        <td className="whitespace-nowrap p-2 text-center">
                          {task.earlyFinish}
                        </td>
                        <td className="whitespace-nowrap p-2 text-center">
                          {task.lateStart}
                        </td>
                        <td className="whitespace-nowrap p-2 text-center">
                          {task.lateFinish}
                        </td>
                        <td className="whitespace-nowrap p-2 text-center">
                          {task.stack}
                        </td>
                      </tr>
                    ))}

                  </tbody>
                </table>
              </div>
            </>
          )
        }

      </div>



      {/* <div>
        <pre style={{ width: "400px" }}>{JSON.stringify(watch(), null, 2)}</pre>
      </div> */}


      <Modal isVisible={showModal} onClose={() => setShowModal(false)} className={"max-w-sm"}>
        <Settings onClose={() => setShowModal(false)} setSetting={setSetting} />
      </Modal>
    </>
  )
}

const Settings = ({ setSetting, onClose }) => {
  const { handleSubmit, register, formState: { errors } } = useForm()

  const onSubmit = handleSubmit(values => {
    setSetting(values)
    onClose()
  })

  return (
    <>
      <h1 className="font-bold text-lg text-center">Configuración</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mb-3">
          <label htmlFor="">Tipo</label>
          <select name="" id="" className="bg-gray-100 px-5 py-1.5"
            {...register("tipo")}
          >
            <option value="1">CPM</option>
            {/* <option value="2">PERT</option> */}
          </select>
        </div>
        <div className="flex flex-col mb-3">
          <label htmlFor="">Cantidad de actividades</label>
          <input type="number" className="bg-gray-100 px-5 py-1.5"
            {...register("num_actividades", {
              required: "Este campo no puede estar vacio",
              min: { message: "Valor no valido", value: 1 },
              max: { message: "Valor no valido", value: 25 }
            })}
          />
          {errors.num_actividades && <p className="text-red-500 text-sm">{errors.num_actividades.message}</p>}
        </div>
        <div className="flex">
          <button className='bg-green-800 px-4 rounded font-bold text-white py-1.5 mx-auto'>Guardar</button>
        </div>
      </form>
    </>
  )
}

export default CriticalRoute