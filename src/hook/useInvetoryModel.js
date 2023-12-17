const useInvetoryModel = () => {

  const tiempo_ciclo = (dias_laborables, numero_ordenes_anual) => {
    return (dias_laborables / numero_ordenes_anual).toFixed(2)
  }

  const punto_reorden = (demanda_anual, dias_laborables, tiempo_espera) => {
    return (demanda_anual / dias_laborables) * tiempo_espera
  }

  const cantidad_economica_pedido = (costo_orden, demanda_anual, costo_retencion_unitario_anual) => {
    return Math.sqrt((2 * costo_orden * demanda_anual) / costo_retencion_unitario_anual)
  }

  const costo_anual_inventario = (cantidad_ordenar, costo_retencion_unitario_anual) => {
    return (cantidad_ordenar / 2) * costo_retencion_unitario_anual
  }

  const costo_anual_ordenar = (demanda_anual, cantidad_ordenar, costo_orden) => {
    return (demanda_anual / cantidad_ordenar) * costo_orden
  }

  const calc_inventory = (values) => {
    let costoOrden = values.costoOrden
    let demandaAnual = values.demandaAnual
    let tasaInventarioU = values.tasaInventarioU
    let costoInventarioU = values.costoInventarioU
    let diasLaborables = values.diasLaborables
    let diasEspera = values.diasEspera

    let cantidadOrdenar = cantidad_economica_pedido(costoOrden, demandaAnual, (tasaInventarioU / 100) * costoInventarioU).toFixed(0)
    let ordenesAnuales = (demandaAnual / cantidadOrdenar).toFixed(0)

    let costoAnualOrdenar = costo_anual_ordenar(demandaAnual, cantidadOrdenar, costoOrden).toFixed(2)
    let costosAnualInventario = costo_anual_inventario(demandaAnual, cantidadOrdenar, costoOrden).toFixed(2)

    return [
      { name: "Cantidad de unidades por pedido (en unidades)", value: cantidadOrdenar },
      { name: "Número de ordenes por año", value: ordenesAnuales },
      { name: "Tiempo de ciclo (días)", value: tiempo_ciclo(diasLaborables, ordenesAnuales) },
      { name: "Punto de reorden", value: punto_reorden(demandaAnual, diasLaborables, diasEspera).toFixed(2) },
      { name: "Costo anual de ordenar", value: costoAnualOrdenar },
      { name: "Costo anual de mantener el inventario", value: costosAnualInventario },
      { name: "Costo total anual", value: parseFloat(costoAnualOrdenar) + parseFloat(costosAnualInventario) }
    ]
  }

  return {
    calc_inventory
  }
}

export default useInvetoryModel