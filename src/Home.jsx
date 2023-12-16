import LinkedCard from "./components/LinkedCard"

const Home = () => {

  const options = [
    { title: "Ruta critica", url: "/critical-route" },
    { title: "Modelo de inventario", url: "/inventory-model" },
    { title: "Teoria de decisiones", url: "/decision-theory" },
  ]

  return (
    <div className="mx-auto max-w-5xl grid items-center justify-center min-h-screen">
      <div>
        <h1 className="font-extrabold text-3xl text-center">Investigación Operativa II</h1>
        <p className="text-center">By oscarchoq</p>

        <div className="grid md:grid-cols-3 gap-x-8 mt-10 px-2">
          {options.map((option, i) => (
            <LinkedCard
              key={i}
              title={option.title}
              url={option.url}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home