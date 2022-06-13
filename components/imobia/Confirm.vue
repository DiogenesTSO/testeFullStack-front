<template>
  <div>
    <v-dialog
      v-model="dialog"
      eager
      persistent
      max-width="400px"
      @input="teste()"
    >
      <v-card color="card">
        <!--       <v-toolbar dark color="primary">
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-spacer />
          <v-btn dark icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar> -->
        <v-card-title class="primary--text">
          <span v-html="title" />
        </v-card-title>
        <v-card-text class="pt-5">
          <span v-html="text" />
        </v-card-text>
        <v-card-actions>
          <v-btn ref="btnConfirmCancel" dark color="error" text>
            Cancelar
          </v-btn>
          <v-spacer />
          <v-btn ref="btnConfirmOk" dark :color="okColor">
            {{ okText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'Confirm',

  data() {
    return {
      dialog: false,
      title: 'Confirmar ação',
      okText: 'Continuar',
      okColor: 'success',
      text:
        'Esta ação irá alterar algumas coisas na sua imobiliária. Continuar?',
    }
  },

  mounted() {
    this.$nuxt.$on('confirm', (options = {}) => {
      this.dialog = true
      this.title = options.title || this.title
      this.text = options.text || this.text
      this.okText = options.okText || this.okText
      this.okColor = options.okColor || this.okColor
      const okButton = this.$refs.btnConfirmOk.$el
      const cancelButton = this.$refs.btnConfirmCancel.$el
      okButton.onclick = () => {
        options.done?.()
        this.dialog = false
      }
      cancelButton.onclick = () => {
        options.cancel?.()
        this.dialog = false
      }
    })
  },
  destroyed() {
    this.$nuxt.$off('confirm')
  },
}
</script>

<style></style>
