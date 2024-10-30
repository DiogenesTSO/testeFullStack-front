import axios from 'axios'
import qs from 'qs'

const instance = axios.create({
  baseURL: process.env.backendUrl + 'api/',

  headers: {
    'Content-Type': 'application/json',
  },

  paramsSerializer(params) {
    return qs.stringify(params, { arrayFormat: 'brackets' })
  },
})

instance.interceptors.response.use(
  function (response) {
    // Do something with response data
    if (response.data.message) {
      window.$nuxt.$emit('notify', {
        type: response.data.message.type,
        message: response.data.message.text,
        id: response.data?.data?.id,
      })
    }
    return response
  },
  function (error) {
    // Do something with response error,

    if (error.response) {
      if (error.response && error.response.status === 401) {
        window.$nuxt.$emit('notify', {
          type: error.response.data.message.type,
          message: error.response.data.message.text,
        })

        window.$nuxt.$store.dispatch('auth/logout')
      } else if (error.response && error.response.status === 403) {
        window.$nuxt.$emit('notify', {
          type: 'error',
          message:
            'Você não tem autorização para realizar esta tarefa. <br> Para atualizar suas permissões, entre em contato com o administrador desta imobiliária.',
        })
      } else if (error.response && error.response.status === 500) {
        window.$nuxt.$emit('notify', {
          type: 'error',
          message:
            'Ocorreu um erro em nossos servidores. Por favor, tente novamente.',
        })
        let errorLog = localStorage.getItem('errorLog') || '[]'
        errorLog = JSON.parse(errorLog)
        errorLog.push({
          error: {
            ...error?.response,
            ...{
              data: {
                ...error?.response?.data,
                ...{ trace: error?.response?.data?.trace?.[0] },
              },
            },
          },
        })
        if (errorLog.length > 40) {
          errorLog.shift()
        }
        localStorage.setItem('errorLog', JSON.stringify(errorLog))
      } else if (error.response && error.response.status === 503) {
        window.$nuxt.$store.$router.push({ name: 'manutencao' })
      } else if (error.response.data.errors && error.response.status === 422) {
        const messagesArray = Object.values(error.response.data.errors)
        messagesArray.forEach((messages) => {
          messages.forEach?.((message) => {
            window.$nuxt.$emit('notify', {
              type: 'error',
              message,
            })
          })
        })
      } else if (error.response.data.message) {
        window.$nuxt.$emit('notify', {
          type: error.response.data.message.type,
          message: error.response.data.message.text,
          redirect: error.response.data.message.redirect,
          action: error.response.data.message.action,
          id: error.response.data?.data?.id,
        })
      }
    }

    return Promise.reject(error)
  },
)

export default instance
