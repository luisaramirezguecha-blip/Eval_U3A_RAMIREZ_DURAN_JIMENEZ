// Valida RUT chileno, retorna { valido: bool, mensaje: string }
export function validarRut(rut) {
  if (!rut || rut.trim() === '') {
    return { valido: false, mensaje: 'El RUT es obligatorio.' }
  }

  // Limpiar puntos y guión
  const rutLimpio = rut.replace(/\./g, '').replace(/-/g, '').trim().toUpperCase()

  if (rutLimpio.length < 2) {
    return { valido: false, mensaje: 'El RUT ingresado es demasiado corto.' }
  }

  const cuerpo = rutLimpio.slice(0, -1)
  const dv = rutLimpio.slice(-1)

  if (!/^\d+$/.test(cuerpo)) {
    return { valido: false, mensaje: 'El cuerpo del RUT solo debe contener números.' }
  }

  // Algoritmo modulo 11
  let suma = 0
  let multiplo = 2
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i]) * multiplo
    multiplo = multiplo === 7 ? 2 : multiplo + 1
  }
  const dvEsperado = 11 - (suma % 11)
  const dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : String(dvEsperado)

  if (dv !== dvCalculado) {
    return { valido: false, mensaje: `Dígito verificador incorrecto. Se esperaba: ${dvCalculado}.` }
  }

  return { valido: true, mensaje: '' }
}