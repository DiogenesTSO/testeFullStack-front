import Vue from 'vue'

const functions = {
  // VUETIFY
  color(nome) {
    let hash = 0
    if (!nome || nome.length === 0) {
      return 'primary'
    }
    for (let i = 0; i < nome.length; i++) {
      hash = nome.charCodeAt(i) + ((hash << 5) - hash)
      hash = hash & hash
    }
    let color = '#'
    for (let x = 0; x < 3; x++) {
      const valor = (hash >> (x * 8)) & 255
      color += ('00' + valor.toString(16)).substr(-2)
    }
    return color
  },
  // JAVASCRIPT GERAL
  chunks(arr, n) {
    const result = []
    for (let i = 0; i < n; i++) {
      result.push([])
    }
    const wordsPerLine = Math.ceil(arr.length / n)

    for (let line = 0; line < n; line++) {
      for (let i = 0; i < wordsPerLine; i++) {
        const value = arr[i + line * wordsPerLine]
        if (value) {
          result[line].push(value)
        }
      }
    }
    return result
  },
  removeDuplicates(arr) {
    const newArray = arr.filter((item, pos) => {
      return arr.indexOf(item) === pos
    })
    return newArray
  },
  removeEmpty(obj) {
    /* object from entries pega um array de "arrays de 2 posições" e transforma respectivamente em
    chave e valor */
    const objectFilled = Object.entries(obj)
      // filtra as váriaveis não nulas
      .filter(([key, val]) => val != null && val !== '')
    return objectFilled.length
      ? Object.fromEntries(
        // pega as entradas dos objetos [nome_da_variavel, valor]

        objectFilled
          .map(([key, val]) => [
            key,
            val === Object(val) ? this.removeEmpty(val) : val,
          ])
          .filter(([key, val]) => val != null && val !== ''),
      )
      : null
  },
  objectEquals(obj1, obj2) {
    const entries1 = Object.entries(obj1)
    const entries2 = Object.entries(obj2)
    const isEqual = entries1.every((entry1) => {
      const entry2 = entries2.find(e => e[0] === entry1[0])
      if (entry1[1] && entry2?.[1] && typeof entry1[1] === 'object') {
        if (Array.isArray(entry1[1])) {
          return this.arrayEquals(entry1[1], entry2[1])
        } else {
          return this.objectEquals(entry1[1], entry2[1])
        }
      } else {
        return entry2 && entry2[1] === entry1[1]
      }
    })
    return isEqual
  },
  arrayEquals(arr1, arr2) {
    // funcao incompleta, falta verificar cada posição do array => reduce
    if (arr1 === arr2) {
      return true
    }
    if (arr1 == null || arr2 == null) {
      return false
    }
    if (arr1.length !== arr2.length) {
      return false
    }
    const isEqual = arr1.every((item, i) => {
      if (item && arr2[i] && typeof item === 'object') {
        if (Array.isArray(item)) {
          return this.arrayEquals(item, arr2[i])
        } else {
          return this.objectEquals(item, arr2[i])
        }
      } else if (item !== arr2[i]) {
        return false
      }
      return true
    })
    return isEqual
  },
  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
  },
  hslToRgb(h, s, l) {
    const a = s * Math.min(l, 1 - l)
    const f = (n, k = (n + h / 30) % 12) =>
      l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return [f(0) * 255, f(8) * 255, f(4) * 255]
  },
  rotateImage(img, deg, callback) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    const image = new Image()
    image.src = img.src
    image.crossOrigin = 'anonymous'
    return (image.onload = () => {
      console.log(image)
      canvas.width = deg % 180 === 0 ? image.width : image.height
      canvas.height = deg % 180 === 0 ? image.height : image.width

      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.rotate((deg * Math.PI) / 180)
      ctx.drawImage(image, image.width / -2, image.height / -2)
      canvas.toBlob((blob) => {
        console.log(blob)
        const data = {
          ...img,
          ...{
            file: new File([blob], img.name || 'Imagem', {
              type: blob.type,
            }),
            src: canvas.toDataURL(),
          },
        }
        callback(data)
      })
    })
  },
  // IMOBIA
  checkPermission(obj, user) {
    if (obj.permissions?.length) {
      const valid = obj.permissions.reduce((acc, cur) => {
        if (acc) {
          acc = user?.can?.(cur) ?? 1
        }
        return acc
      }, true)
      return valid
    }
    return true
  },

  filtrarFormasPagamentos(tipo, caixa, tiposArray) {
    const tipos = tiposArray.filter((item) => {
      if (item.conta_tipo !== null) {
        return item.conta_tipo === tipo && item.caixa_tipo === caixa.tipo
      } else {
        return item.caixa_tipo === caixa.tipo
      }
    })

    return tipos
  },
  downloadErrorLog() {
    const errorLog = localStorage.getItem('errorLog') || '[]'
    const element = document.createElement('a')
    element.setAttribute(
      'href',
      'data:application/json,' + encodeURIComponent(errorLog),
    )
    element.setAttribute('download', 'ImobiaErrorLog')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  },
  deepClone(objArr) {
    if (Array.isArray(objArr)) {
      return objArr.map(val =>
        val === Object(val) ? this.deepClone(val) : val,
      )
    } else {
      const objectFilled = Object.entries(objArr)
      return Object.fromEntries(
        objectFilled.map(([key, val]) => [
          key,
          val === Object(val) ? this.deepClone(val) : val,
        ]),
      )
    }
  },
}
Vue.prototype.$help = functions

export default ({ app }, inject) => {
  inject('help', functions)
}
