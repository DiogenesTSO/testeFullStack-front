<template>
  <div>
    <div class="text-h6 w-100 mb-2">
      {{ label }}
    </div>
    <v-responsive
      class="w-100"
      aspect-ratio="1"
      style="overflow: visible; position: relative;"
      :disabled="disabled"
      @drop="dropHandler"
      @dragenter="enterHandler"
      @dragleave="leaveHandler"
      @dragover="overHandler"
    >
      <input
        ref="inputFile"
        type="file"
        :accept="accept"
        style="display: none;"
        @change="createImage($event.target.files[0])"
      >
      <v-btn
        v-show="image && !disabled && removable"
        dark
        absolute
        color="red"
        small
        elevation="2"
        fab
        class="btn-remove-image"
        @click="$emit('remove')"
      >
        <v-icon :small="$vuetify.breakpoint.mdAndDown">
          mdi-delete
        </v-icon>
      </v-btn>
      <v-scale-transition origin="center center 0" style="display: absolute;">
        <v-btn
          v-show="image && !disabled"
          dark
          absolute
          :color="color"
          :small="$vuetify.breakpoint.mdAndDown"
          elevation="2"
          fab
          class="btn-change-image"
          @click="openFilePicker"
        >
          <v-icon :small="$vuetify.breakpoint.mdAndDown">
            mdi-camera-flip
          </v-icon>
        </v-btn>
      </v-scale-transition>
      <v-avatar
        v-ripple
        color="card lighten-1"
        width="100%"
        height="100%"
        @click="openOrUpload()"
      >
        <v-img
          contain
          class="rounded elevation-2"
          :aspect-ratio="1"
          style="position: absolute;"
          width="100%"
          :src="image"
          :lazy-src="image ? '/ImobiaPlaceholder.svg' : ''"
          @loadstart="error = false"
          @error="error = true"
          @load="loadingImage = false"
        >
          <template #placeholder>
            <div class="h-100 d-flex flex-column justify-center align-center">
              <div class="d-flex">
                <v-icon
                  v-if="$vuetify.breakpoint.lgAndUp"
                  color="normal"
                  size="4em"
                >
                  mdi-plus
                </v-icon>
                <v-icon v-else color="normal" size="3em">
                  mdi-camera-plus
                </v-icon>
              </div>
              <span
                v-if="$vuetify.breakpoint.lgAndUp"
                class="normal--text text-center text-subtitle-2 px-4 pb-3"
              >
                Clique ou arraste para enviar um arquivo
              </span>
            </div>
          </template>
        </v-img>
      </v-avatar>

      <v-expand-transition>
        <v-alert v-if="showAlert" class="mt-2" dense type="error">
          {{ alertMessage }}
        </v-alert>
      </v-expand-transition>
    </v-responsive>
    <imobia-modal v-model="showPreview" clean>
      <v-img contain width="100%" :src="image" />
    </imobia-modal>
  </div>
</template>

<script>
export default {
  name: 'ImageUpload',
  transition: 'slide-y-transition',
  props: {
    value: {
      type: [String, Object, File, Blob],
      default: '',
    },
    accept: {
      type: String,
      default: 'image/*',
    },
    label: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'primary',
    },
    // define o tamanho máximo do arquivo
    maxSize: {
      type: [String, Number],
      default: 5,
    },

    loading: {
      type: [Boolean, String, Number],
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    removable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      error: false,
      image: '',
      dropzone: {},
      loadingImage: true,
      isDragging: false,
      alertMessage: '',
      showAlert: false,
      showPreview: false,
    }
  },
  watch: {
    value: {
      handler() {
        this.createImage(this.value)
      },
      deep: true,
    },
  },
  mounted() {
    this.dropzone = this.$el
    if (this.value) {
      this.createImage(this.value)
    }
  },
  methods: {
    openOrUpload() {
      if (this.image) {
        this.showPreview = true
      } else if (this.disabled) {
        this.$emit('click')
      } else {
        this.openFilePicker()
      }
    },
    openFilePicker() {
      this.$refs.inputFile.click()
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
      if (this.disabled) {
        return
      }

      if (!ev.dataTransfer.files.length) {
        return
      }
      if (
        ev.dataTransfer.files[0].name.includes('.exe') ||
        ev.dataTransfer.files[0].name.includes('.php')
      ) {
        this.showError('Esse tipo de arquivo não é suportado')
        return
      } else if (
        ev.dataTransfer.files[0].size > parseFloat(this.maxSize + '000000')
      ) {
        this.showError('O tamanho máximo é ' + this.maxSize + 'MB')
        return
      }
      this.createImage(ev.dataTransfer.files[0])
    },
    createImage(file) {
      if (!file) {
        this.image = null
        this.$emit('input', null)
        return
      }
      // const image = new Image()
      if (typeof file !== 'string') {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.$emit('dropped', {
            src: e.target.result,
            name: file.name,
            size: file.size,
            type: file.type,
            loading: false,
          })
          this.loadingImage = true

          this.image = e.target.result
          this.$emit('input', file)
        }
        reader.readAsDataURL(file)
      } else {
        this.image = file
        this.$emit('input', file)
      }
    },
    showError(message) {
      this.showAlert = true
      this.alertMessage = message

      setTimeout(() => {
        this.showAlert = false
      }, 3000)
    },
    deleteImage(index) {
      const deleted = this.image
      this.image = ''

      this.$emit('delete', deleted)
    },
  },
}
</script>

<style lang="scss">
.btn-change-image {
  bottom: 0;
  right: 0;
}
.btn-remove-image {
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
}

.theme--dark .image-menu {
  position: absolute;
  bottom: 0;
  right: 0;
  backdrop-filter: blur(4px);
  background-color: #273033cc;
}
.theme--light .image-menu {
  position: absolute;
  bottom: 0;
  right: 0;
  backdrop-filter: blur(4px);
  background-color: #d4d4d4aa;
}
.image-text {
  display: block;
}
.document-icon {
  position: absolute;
  z-index: 2;
  width: 100%;
}
.dropzone-card {
  transition: 0.6s;
}
.sending-image {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
