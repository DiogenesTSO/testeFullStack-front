import Vue from 'vue'
import moment from 'moment'
moment.locale('pt-br')
const functions = {
  initials(string) {
    return string
      ?.split(' ')
      ?.map(item =>
        item.length > 3 || string.length <= 3
          ? item.charAt(0).toUpperCase()
          : '',
      )
      ?.join('')
      ?.slice(0, 2)
  },

  userType(value) {
    if (value) {
      value = value.charAt(0).toUpperCase() + value.slice(1)
      value = value.split('_').join(' ')
    }
    return value || 'Sem permissões'
  },

  capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  },
  mask(value, mask = 'default') {
    let val = value
    const options = {
      default: '',
      cpf: '###.###.###-##',
      cnpj: '##.###.###/####-##',
      celular: '(##) #####-####',
      telefone: '(##) ####-####',
      cep: '#####-###',
    }

    function insertChar(char, index, val) {
      // checa se o caractere ja foi inserido na string (evitar duplicações principalmente na hora de apagar)
      if (val[index] === char) {
        return val
      }
      // insere o caractere no index escolhido
      return val.slice(0, index) + char + val.slice(index)
    }
    const charLocations = []
    let i
    for (i = 0; i < options[mask].length; i++) {
      if (options[mask][i] !== '#') {
        charLocations.push(i)
      }
    }
    charLocations.forEach((location) => {
      // se for possível colcar o caractere, colocar
      if (location < val?.length) {
        // aqui passamos  o caractere a ser inserido, o index da string que ele deve ser inserido e a string na qual será adicionado
        // o slice serve para respeitar o tamanho máximo da string
        val = insertChar(options[mask][location], location, val)
      }
    })
    return val?.slice?.(0, options[mask].length) || value
  },

  money(value) {
    return value
      ? Number.parseFloat(value)
        .toFixed(2)
        .split('.')
        .join(',')
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      : '0,00'
  }, 

  date(value, format) {
    return moment(value).format(format)
  },
  dateFromNow(value, format) {
    return moment(value).fromNow()
  },
  endereco(enderecoObj) {
    let endereco = ''
    const logradouro = []

    if (enderecoObj) {
      ;['endereco', 'rua', 'numero', 'bairro'].forEach((item) => {
        if (enderecoObj[item]) {
          logradouro.push(enderecoObj[item])
        }
      })

      if (logradouro.length) {
        endereco += logradouro.join(', ')
      }

      if (enderecoObj.cidade && enderecoObj.cidade.nome) {
        endereco += ' - ' + enderecoObj.cidade.nome
        if (enderecoObj.cidade?.uf) {
          endereco += ', ' + enderecoObj.cidade.uf
        }
      } else if (enderecoObj.cidade && typeof enderecoObj.cidade !== 'object') {
        endereco += ' - ' + enderecoObj.cidade
        if (enderecoObj.estado) {
          endereco += ', ' + enderecoObj.estado
        }
      }
    }
    return endereco || ''
  },
  bytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return '0 Bytes'
    }

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
  },
}
Vue.prototype.$format = functions

export default ({ app }, inject) => {
  inject('format', functions)
}
