<template>
  <div>
    <v-card
      :color="isDragging ? 'card lighten-1' : 'card'"
      class="d-flex flex-column dz-card"
      :disabled="disabled || loading"
      @drop="dropHandler"
      @dragenter="enterHandler"
      @dragleave="leaveHandler"
      @dragover="overHandler"
    >
      <input
        ref="inputFile"
        type="file"
        :accept="accept"
        multiple
        style="display: none;"
        @change="createImage($event.target.files)"
      >

      <v-card-text class="grow d-flex align-center">
        <draggable
          v-model="images"
          draggable=".drag-image"
          class="h-100 row align-center"
          @change="$emit('input', images)"
        >
          <v-col
            v-for="(img, i) in images"
            :key="'image_' + i"
            class="drag-image"
            :cols="size.cols"
            :sm="size.sm"
            :md="size.md"
            :lg="size.lg"
          >
            <div class="dz-top-right">
              <slot :img="img" :i="i" name="topRight" />
            </div>
            <v-img
              class="rounded elevation-2"
              :aspect-ratio="1"
              width="100%"
              :src="img.src"
              @click.native="clickHandler(img, i)"
            >
              <template #placeholder>
                <v-row
                  class="fill-height w-100 ma-0"
                  align="center"
                  justify="center"
                >
                  <div v-if="img.loading">
                    <v-progress-circular indeterminate color="primary" />
                  </div>
                  <div v-else>
                    <v-icon
                      v-if="img.type.includes('pdf')"
                      size="7.5em"
                      color="red"
                    >
                      mdi-file-pdf-box
                    </v-icon>
                    <v-icon
                      v-else-if="img.type.includes('wordprocessingml')"
                      size="7.5em"
                      color="blue"
                    >
                      mdi-microsoft-word
                    </v-icon>
                    <v-icon v-else size="7.5em" color="primary">
                      mdi-text-box
                    </v-icon>
                  </div>
                </v-row>
              </template>

              <div
                class="d-flex w-100 dz-image-menu pa-2 justify-space-between align-center"
              >
                <div class="dz-image-text text-truncate">
                  <div :title="img.name" class="text-h6 lh-1">
                    {{ img.name }}
                  </div>
                  <div v-show="img.size" class="text-caption">
                    {{ $format.bytes(img.size) }}
                  </div>
                </div>
                <div class="pl-2 d-flex flex-column">
                  <v-menu top auto offset-y>
                    <template #activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        icon
                        small
                        color="primary"
                        v-on="on"
                      >
                        <v-icon>
                          mdi-dots-vertical
                        </v-icon>
                      </v-btn>
                    </template>
                    <v-list dense>
                      <v-list-item v-if="rename" @click="$emit('rename', img)">
                        <v-icon dense class="align-self-center mr-2">
                          mdi-pencil
                        </v-icon>
                        <v-list-item-title>Renomear</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="deleteImage(i)">
                        <v-icon
                          dense
                          class="align-self-center mr-2"
                          color="error"
                        >
                          mdi-delete
                        </v-icon>

                        <v-list-item-title class="error--text">
                          Remover
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </div>
            </v-img>
          </v-col>
          <v-col
            :cols="size.cols"
            :sm="size.sm"
            :md="size.md"
            :lg="size.lg"
            class=""
          >
            <v-responsive
              v-ripple
              aspect-ratio="1"
              :class="'cursor-pointer select-none  rounded '"
              width="100%"
              @click="openFilePicker"
            >
              <div
                v-if="!disabled"
                class="h-100 d-flex flex-column justify-center align-center"
              >
                <v-icon color="normal" size="4.5em">
                  mdi-plus
                </v-icon>
                <span class="normal--text text-center text-subtitle-2 px-2">
                  Clique ou arraste para enviar um arquivo
                </span>
              </div>
            </v-responsive>
          </v-col>
        </draggable>
      </v-card-text>

      <v-card v-if="loading" class="dz-sending-image px-4 py-2" color="card">
        <div class="d-flex justify-center align-center">
          <v-progress-circular
            size="20"
            indeterminate
            color="primary"
            class="mr-2"
          />
          Enviando arquivo
        </div>
      </v-card>
    </v-card>
    <v-expand-transition>
      <v-alert v-if="showAlert" class="mt-2" dense type="error">
        {{ alertMessage }}
      </v-alert>
    </v-expand-transition>
    <imobia-modal v-model="showPreview" clean>
      <v-btn
        v-if="images.length > 1"
        dark
        color="rgba(0,0,0,0.35)"
        class="dz-previous-button"
        fab
        absolute
        left
        @click="previousImage()"
      >
        <v-icon>
          mdi-chevron-left
        </v-icon>
      </v-btn>
      <v-btn
        v-if="images.length > 1"
        dark
        color="rgba(0,0,0,0.35)"
        class="dz-next-button"
        fab
        absolute
        right
        @click="nextImage()"
      >
        <v-icon>
          mdi-chevron-right
        </v-icon>
      </v-btn>
      <v-img max-height="100%" contain width="100%" :src="selectedImage" />
    </imobia-modal>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import moment from 'moment'
export default {
  name: 'DropZone',
  components: {
    draggable,
  },
  transition: 'slide-y-transition',
  props: {
    rename: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [Array, Object],
      default: () => [],
    },
    accept: {
      type: String,
      default: 'image/*',
    },
    // define o tamanho máximo do arquivo
    maxSize: {
      type: [String, Number],
      default: 5,
    },
    maxLength: {
      type: [String, Number],
      default: 40,
    },
    loading: {
      type: [Boolean, String, Number],
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    // define o tamanho das colunas
    size: {
      type: Object,
      default: () => ({
        cols: '6',
        sm: '4',
        md: '3',
        lg: '2',
      }),
    },
    defaultFields: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      images: this.value.map((val) => {
        return { ...val, ...{ loading: true } }
      }),
      selectedImage: {},
      selectedIndex: -1,
      showPreview: false,
      dropzone: {},
      isDragging: false,
      alertMessage: '',
      showAlert: false,
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
  },
  watch: {
    value: {
      handler() {
        this.images = this.value
      },
      deep: true,
    },
    images: {
      handler() {
        this.$emit('input', this.images)
      },
      deep: true,
    },
  },
  mounted() {
    this.dropzone = this.$el
  },
  methods: {
    previousImage() {
      if (this.selectedIndex) {
        this.selectedIndex -= 1
        this.selectedImage = this.images[this.selectedIndex].src
      } else {
        this.selectedIndex = this.images.length - 1
        this.selectedImage = this.images[this.selectedIndex].src
      }
    },
    nextImage() {
      if (this.selectedIndex !== this.images.length - 1) {
        this.selectedIndex += 1
        this.selectedImage = this.images[this.selectedIndex].src
      } else {
        this.selectedIndex = 0
        this.selectedImage = this.images[this.selectedIndex].src
      }
    },

    openFilePicker() {
      this.$refs.inputFile.click()
    },
    clickHandler(img, i) {
      this.selectedImage = img.src
      this.selectedIndex = i
      this.showPreview = true
    },
    enterHandler(ev) {
      ev.preventDefault()
      this.isDragging = true
    },
    leaveHandler(ev) {
      ev.preventDefault()
      this.isDragging = false
    },
    overHandler(ev) {
      ev.preventDefault()
      this.isDragging = true
    },

    dropHandler(ev) {
      ev.preventDefault()
      this.isDragging = false

      this.createImage(ev.dataTransfer.files)
    },
    createImage(files = []) {
      if (!files.length) {
        return
      }
      if (
        Array.from(files).reduce((acc, cur) => {
          if (cur.name.includes('.exe')) {
            acc = true
          }
          return acc
        }, false) ||
        Array.from(files).reduce((acc, cur) => {
          if (cur.name.includes('.php')) {
            acc = true
          }
          return acc
        }, false)
      ) {
        this.showError('Esse tipo de arquivo não é suportado')
        return
      } else if (
        Array.from(files).reduce((acc, cur) => {
          if (cur.size > parseFloat(this.maxSize + '000000')) {
            acc = true
          }
          return acc
        }, false)
      ) {
        this.showError('O tamanho máximo é ' + this.maxSize + 'MB')
        return
      }
      // const image = new Image()
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.$emit('dropped', {
            ...{
              src: e.target.result,
              file,
              name: file.name,
              size: file.size,
              type: file.type,
              loading: false,
            },
            ...this.defaultFields,
          })
          if (this.images.length <= this.maxLength) {
            this.images.push({
              ...{
                src: e.target.result,
                file,
                name: file.name,
                size: file.size,
                type: file.type,
                loading: false,
              },
              ...this.defaultFields,
            })
          } else {
            this.$root.$emit('notify', {
              type: 'warning',
              message: `Máximo de ${this.maxLength} arquivos.`,
            })
          }

          this.$emit('input', this.images)
        }
        reader.readAsDataURL(file)
      })
    },
    downloadImage(src) {
      const link = document.createElement('a')
      link.href = src
      link.download =
        this.user?.empresa?.nome + moment().format('DD-MM-YYYY hh:mm:ss')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    showError(message) {
      this.showAlert = true
      this.alertMessage = message

      setTimeout(() => {
        this.showAlert = false
      }, 3000)
    },
    deleteImage(index) {
      const deleted = this.images.splice(index, 1)

      this.$emit('delete', deleted)
    },
  },
}
</script>
