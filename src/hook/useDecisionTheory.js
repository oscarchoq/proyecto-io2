
const useDecisionTheory = () => {
  const processData = (data) => {
    const matrices = { principal: [], alternativas: [] }

    // Iterar sobre las claves del objeto
    Object.keys(data).forEach((key) => {
      const [type, row, col] = key.split("-")

      // Verificar si es principal o alternativa
      if (type.startsWith("principal")) {
        matrices.principal[row] = matrices.principal[row] || []
        matrices.principal[row][col] = parseInt(data[key], 10)
      } else if (type.startsWith("alternativa")) {
        matrices.alternativas[type] = matrices.alternativas[type] || []
        matrices.alternativas[type][row] = matrices.alternativas[type][row] || []
        matrices.alternativas[type][row][col] = parseInt(data[key], 10)
      }
    })

    return matrices
  }

  function sumaMatriz(matrix) {
    var sumaColumnas = [];
    for (let i = 0; i < matrix.length; i++) {
      sumaColumnas[i] = 0;
    }

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        sumaColumnas[j] += matrix[i][j];
      }
    }
    return sumaColumnas;
  }

  function promedioMatriz(promMatrix) {
    var promedio = [];
    for (let i = 0; i < promMatrix.length; i++) {
      promedio[i] = 0;
    }
    for (let i = 0; i < promMatrix.length; i++) {
      for (let j = 0; j < promMatrix.length; j++) {
        promedio[i] += promMatrix[i][j];
      }
      promedio[i] /= promMatrix.length;
    }
    return promedio;
  }

  // Normalizar y hallar el vector propio
  // divide los valores de la sumas por su sumacolumna
  function vectorPropio(matriz) {
    let aux = [];
    let divisor = sumaMatriz(matriz);
    for (let i = 0; i < matriz.length; i++) {
      aux[i] = [];
      for (let j = 0; j < matriz.length; j++) {
        aux[i][j] = matriz[i][j] / divisor[j];
      }
    }
    return promedioMatriz(aux);
  }

  function cal_decision_theory(matrices) {
    const { principal, alternativas } = matrices

    // Vecor propio de la matriz principal
    const vectorP = vectorPropio(principal)
    const vectorPrincipalFormato = vectorP.map((valor) => [valor])

    // Para almacenar los vectores propios de las alternativas
    const resultados = {}
    Object.entries(alternativas).forEach(([alternativa, matriz]) => {
      resultados[alternativa] = vectorPropio(matriz)
    })

    // Unir los vectores propios de las alternativas
    const indices = Object.keys(resultados.alternativa1)
    const matrizSolution = indices.map((indice) => {
      return Object.values(resultados).map((alternativa) => alternativa[indice])
    })

    // Multiplicar matrizSolution x vector propio principal
    const respuestaFinal = matrizSolution.map((fila) => {
      const sumaFila = fila.reduce((sumaParcial, valor, indice) => {
        return sumaParcial + valor * vectorPrincipalFormato[indice][0];
      }, 0)
      return sumaFila;
    })


    return {
      matrizSolution, 
      vectorPrincipalFormato,
      respuestaFinal,
      solucion: Math.max(...respuestaFinal)
    }

  }

  return {
    processData,
    cal_decision_theory
  }
}

export default useDecisionTheory