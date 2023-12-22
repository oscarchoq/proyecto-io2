import { useEffect, useState } from "react"
import Modal from "../components/Modal"
import { useForm } from "react-hook-form"
import useDecisionTheory from "../hook/useDecisionTheory"

const DecisionTheory = () => {

  const { register, handleSubmit, watch, reset } = useForm()
  const { processData, cal_decision_theory } = useDecisionTheory()


  const [showModal, setShowModal] = useState(false)
  const [settings, setSettings] = useState()
  const [result, setResult] = useState({})

  const onSubmit = handleSubmit(values => {
    const res = processData(values)
    const result = cal_decision_theory(res)
    setResult(result)
  })

  useEffect(() => {
    reset()
  }, [settings])

  return (
    <>

      <div>
        <h1 className='font-bold text-3xl text-center my-8'>Teoria de decisiones (AHP)</h1>

        <div className="max-w-6xl mx-auto px-8 justify-center items-center">
          <button onClick={() => setShowModal(true)} className='bg-green-800 px-2.5 rounded font-bold text-white py-2 mb-5'>Settings</button>


          {settings && (
            <form onSubmit={onSubmit}>

              <span className="font-bold">Matriz principal</span>

              <div className="grid">
                {Array.from({ length: settings?.num_criterios }).map((_, rowIndex) => (
                  <div key={rowIndex} className="flex flex-wrap">
                    {Array.from({ length: settings?.num_criterios }).map((_, colIndex) => (
                      <div key={colIndex} className="w-16 sm:w-20 h-8 border border-gray-300 flex items-center justify-center">
                        <input
                          type="number"
                          className="w-full h-full text-center"
                          min={0}
                          step={0.0001}
                          {...register(`principal1-${rowIndex}-${colIndex}`, { required: true, min: 0 })}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <span className="font-bold pt-5">Alternativas</span>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                {Array.from({ length: settings?.num_criterios }).map((_, i) => (
                  <div key={i} className="">
                    <span>Alternativa {i + 1}</span>
                    <div className="grid">
                      {Array.from({ length: settings?.num_criterios }).map((_, rowIndex) => (
                        <div key={rowIndex} className="flex flex-wrap">
                          {Array.from({ length: settings?.num_criterios }).map((_, colIndex) => (
                            <div key={colIndex} className="w-16 sm:w-20 h-8 border border-gray-300 flex items-center justify-center">
                              <input
                                type="number"
                                className="w-full h-full text-center"
                                min={0}
                                step={0.0001}
                                {...register(`alternativa${i + 1}-${rowIndex}-${colIndex}`, { required: true, min: 0 })}
                              />
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                ))}

              </div>


              <button className='bg-green-700 px-2.5 rounded font-bold text-white py-2 my-5'>Calcular</button>



            </form>
          )}

        </div>

        {result?.matrizSolution && (
          <>
            <h2 className="text-xl font-bold text-center">Resultados</h2>
            <div className="max-w-7xl mx-auto flex justify-center items-center text-lg">


              <div className="flex items-center mt-4">

                <div className="p-2 mb-4">
                  <h3 className="font-bold mb-2 text-center">Alternativas</h3>
                  {result?.matrizSolution.map((fila, rowIndex) => (
                    <div key={rowIndex} className="flex flex-wrap">
                      {fila.map((valor, colIndex) => (
                        <div key={colIndex} className="w-16 sm:w-20 h-8 border border-gray-300 flex items-center justify-center">
                          <span className="bg-white w-full h-full text-center p-1">
                            {valor.toFixed(3)}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Operador de multiplicación */}
                <div className="flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold">x</span>
                </div>

                {/* Matriz B (vectorPrincipalFormato) */}
                <div className="p-2 mb-4">
                  <h3 className="font-bold mb-2 text-center">Vector propio</h3>
                  {result?.vectorPrincipalFormato.map((fila, rowIndex) => (
                    <div key={rowIndex} className="flex flex-wrap">
                      {fila.map((valor, colIndex) => (
                        <div key={colIndex} className="w-16 sm:w-20 h-8 border border-gray-300 flex items-center justify-center">
                          <span className="bg-white w-full h-full text-center p-1">
                            {valor.toFixed(3)}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold">=</span>
                </div>

                <div className="p-2 mb-4">
                  <h3 className="font-bold mb-2 text-center">Resultado</h3>
                  {result?.respuestaFinal.map((valor, rowIndex) => (
                    <div key={rowIndex} className="w-16 sm:w-20 h-8 border border-gray-300 flex items-center justify-center">
                      <span className={`bg-white w-full h-full text-center p-1 ${result?.solucion === valor ? 'font-extrabold' : ''}`}>
                        {valor.toFixed(3)}
                      </span>
                    </div>
                  ))}

                </div>

              </div>
            </div>
          </>


        )}

      </div>


      <Modal isVisible={showModal} onClose={() => setShowModal(false)} className={"max-w-sm"}>
        <Settings onClose={() => setShowModal(false)} setSetting={setSettings} />
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
          <label htmlFor="">Cantidad de criterios</label>
          <input type="number" className="bg-gray-100 px-5 py-1.5"
            {...register("num_criterios", {
              required: "Este campo no puede estar vacio",
              min: { message: "Valor no valido", value: 1 },
            })}
          />
          {errors.num_criterios && <p className="text-red-500 text-sm">{errors.num_criterios.message}</p>}
        </div>
        <div className="flex">
          <button className='bg-green-700 px-4 rounded font-bold text-white py-1.5 mx-auto'>Guardar</button>
        </div>
      </form>
    </>
  )
}

export default DecisionTheory