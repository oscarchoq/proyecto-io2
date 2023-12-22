
const useCriticalRoute = () => {

  const getActividad = (cant) => {
    let letraInicial = "A"
    let codigoASCII = letraInicial.charCodeAt()
    return String.fromCharCode(codigoASCII - 1 + cant)
  }

  const activity_format = (inputForm) => {
    const tasks = []

    for (let i = 1; i <= Object.keys(inputForm).length / 3; i++) {
      const name = inputForm[`actividad${i}`]
      const duration = inputForm[`duracion${i}`] !== "" ? parseInt(inputForm[`duracion${i}`]) : 0
      const predecessors = inputForm[`predecesor${i}`].split(',').map(dep => dep.trim().toUpperCase())

      // Predecesrores vacios
      const dependencies = predecessors.filter(dep => dep !== "")

      // Add tasks
      tasks.push({ name, duration, dependencies })
    }

    return tasks
  }

  const cal_critical_route = (tasks) => {
    // Early time
    const earlyStart = {}
    const earlyFinish = {}

    tasks.forEach(task => {
      earlyStart[task.name] = 0
      earlyFinish[task.name] = 0
    })

    tasks.forEach(task => {
      const predecessorsTime = task.dependencies.map(dep => earlyFinish[dep] || 0)
      earlyStart[task.name] = predecessorsTime.length !== 0 ? Math.max(...predecessorsTime) : 0
      earlyFinish[task.name] = earlyStart[task.name] + task.duration
    })

    const projectDuration = Math.max(...tasks.map(task => earlyFinish[task.name]))

    // Identificar actividades finales
    const usedAsPredecessor = new Set();
    tasks.forEach(task => {
      task.dependencies.forEach(dep => usedAsPredecessor.add(dep))
    })

    // Late Time
    const reverseTasks = tasks.slice().reverse()
    const lateStart = {}
    const lateFinish = {}

    reverseTasks.forEach(task => {
      lateStart[task.name] = 0
      lateFinish[task.name] = 0
    })

    reverseTasks.forEach((task, index) => {
      if (index === 0 || !usedAsPredecessor.has(task.name)) {
        lateFinish[task.name] = projectDuration
        lateStart[task.name] = lateFinish[task.name] - task.duration
        return
      }

      // Actualización para las tareas con dependencias
      const successors = tasks.filter(t => t.dependencies.includes(task.name))
      lateFinish[task.name] = Math.min(...successors.map(s => lateStart[s.name]))
      lateStart[task.name] = lateFinish[task.name] - task.duration

    })

    const results = tasks.map(task => {
      return {
        name: task.name,
        duration: task.duration,
        dependencies: task.dependencies,
        earlyStart: earlyStart[task.name],
        earlyFinish: earlyFinish[task.name],
        lateStart: lateStart[task.name],
        lateFinish: lateFinish[task.name],
        stack: lateFinish[task.name] - earlyFinish[task.name],
        isCriticalPath: earlyFinish[task.name] === lateFinish[task.name]
      }
    })

    return results

  }


  return {
    getActividad,
    activity_format,
    cal_critical_route
  }
}

export default useCriticalRoute