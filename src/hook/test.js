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
    promedio[i] /= n;
  }
  return promedio;
}

function mostrarDatos(data) {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length; j++) {
      console.log(data[i][j]);
    }
    console.log("---")
  }
}

// divide los valores de la sumas por su sumacolumna
function matrizMinima(matriz) {
  let aux = [];
  let mPromedio = [];
  let divisor = sumaMatriz(matriz);
  for (let i = 0; i < n; i++) {
    aux[i] = [];
    for (let j = 0; j < n; j++) {
      aux[i][j] = matriz[i][j] / divisor[j];
    }
  }
  return mPromedio = promedioMatriz(aux);
}

function matrizSolucion(matrizProceso) {
  let sol = [];
  for (let i = 0; i < matrizProceso.length; i++) {
    sol[i] = [];
    for (let j = 0; j < matrizProceso.length; j++) {
      sol[i][j] = matrizProceso[j + 1][i];
    }
  }
  return sol;

}

/**
 * MAIN
 */
const matriz1 = [
  [1, 0.2, 0.2, 5],
  [5, 1, 3, 9],
  [5, 0.33, 1, 9],
  [0.2, 0.11, 0.11, 1],
];

const matriz2 = [
  [1, 0.33, 3, 3],
  [3, 1, 5, 5],
  [0.33, 0.2, 1, 1],
  [0.33, 0.2, 1, 1],
];

const matriz3 = [
  [1, 7, 0.2, 3],
  [0.14, 1, 0.11, 0.2],
  [5, 9, 1, 7],
  [0.33, 5, 0.14, 1],
];
const matriz4 = [
  [1, 9, 5, 3],
  [0.11, 1, 0.14, 0.14],
  [0.2, 7, 1, 0.33],
  [0.33, 7, 3, 1],
];

const n = 4;
const Principal = [];
Principal.push(matrizMinima(matriz1))
Principal.push(matrizMinima(matriz2))
Principal.push(matrizMinima(matriz3))
Principal.push(matrizMinima(matriz4))
const solucion = matrizSolucion(Principal);
const vpropio = Principal[0];
console.log(vpropio)
const resultante = [];

for (let i = 0; i < Principal.length - 1; i++) {
  resultante[i] = [0]
}

for (let i = 0; i < solucion.length; i++) {
  for (let j = 0; j < solucion[0].length; j++) {
    resultante[i][0] += solucion[i][j] * vpropio[j];

  }
}

console.log(resultante)