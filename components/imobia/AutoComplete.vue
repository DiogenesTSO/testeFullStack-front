<template>
  <v-autocomplete
    ref="autocomplete"
    v-model="val"
    dense
    :required="required"
    :disabled="disabled"
    :rules="rules"
    outlined
    :loading="loadingCmp"
    :readonly="readonly"
    validate-on-blur
    hide-details="auto"
    :items="data"
    item-value="id"
    item-text="nome"
    :label="label"
    :no-data-text="
      textInside !== null && textInside.length > 3
        ? loadingCmp
          ? 'Buscando...'
          : 'Nenhum resultado encontrado'
        : 'Buscar...'
    "
    :return-object="returnObject"
    :chips="multiple"
    :clearable="multiple"
    :deletable-chips="multiple"
    :multiple="multiple"
    :small-chips="multiple"
    :search-input.sync="textInside"
    @change="multiple ? '' : $refs.autocomplete.blur()"
    @keydown="keyHandler()"
    @input="$emit('input', val)"
  >
    <template #item="data">
      <slot name="item" :data="data">
        <template v-if="(typeof data.item !== 'object')">
          <v-list-item-content v-text="data.item" />
        </template>
        <template v-else>
          <v-img
            v-if="imgField"
            max-height="40px"
            max-width="40px"
            aspect-ratio="1"
            class="rounded elevation-2 my-2 mr-4"
            :src="
              data.item.extra[imgField]
                ? data.item.extra[imgField]
                : '/ImobiaPlaceholder.svg'
            "
          />
          <v-list-item-content class="py-3">
            <v-list-item-title v-html="data.item.nome" />
            <v-list-item-subtitle v-if="subtitleField" v-html="data.item[subtitleField]" />
          </v-list-item-content>
        </template>
      </slot>
    </template>

    <template #append-outer>
      <slot name="append" />
    </template>
    <template #selection="{ item, index }">
      <span v-if="index === 0" class="text-truncate">{{ item.nome }}</span>

      <span v-if="index === 1" class="grey--text text-caption pl-1">
        (+{{ val.length - 1 }})
      </span>
    </template>
  </v-autocomplete>
</template>

<script>
import { debounce } from 'debounce'

export default {
  name: 'AutoComplete',

  props: {
    multiple: {
      type: [Boolean, Number, String],
      default: false,
    },
    value: {
      type: [Number, String, Boolean, Object, Array],
      default: () => { },
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    subtitleField: {
      type: String,
      default: '',
    },
    imgField: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    returnObject: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
    // define o nome da resource que será chamada ao começar a digitar
    module: {
      type: String,
      required: false,
      default: '',
    },
    extraQuery: {
      type: [Object, null],
      default: () => { },
    },
  },

  data() {
    return {
      val: this.value,
      data: [...this.items],
      textInside: '',
      loadingCmp: this.loading,
    }
  },
  computed: {
    rules() {
      return this.required
        ? this.returnObject
          ? [v => !!v?.id || 'Este campo é obrigatório']
          : [v => !!v || 'Este campo é obrigatório']
        : []
    },
  },
  watch: {
    textInside() {
      this.$emit('updateText', this.textInside)
    },
    loading() {
      this.loadingCmp = this.loading
    },
    value: {
      handler() {
        this.val = this.value
        if (this.multiple) {
          if (
            this.value?.length &&
            !this.value.reduce((acc, cur) => {
              if (!acc) {
                acc =
                  !!this.items.find(item => cur.id === item.id) ||
                  !!this.data.find(item => cur.id === item.id)
              }
              return acc
            }, false)
          ) {
            this.data.push(...this.value)
          }
        } else if (
          this.value?.id &&
          this.value.nome &&
          !this.data.find(item => item.id === this.value.id)
        ) {
          this.data.push(this.value)
        }
      },
      deep: true,
    },
    'items.length'() {
      this.data = this.items
    },
  },
  mounted() {
    if (this.module) {
      this.pesquisar()
    }
    if (
      this.multiple &&
      this.value?.length &&
      !this.value.reduce((acc, cur) => {
        if (!acc) {
          acc =
            !!this.items.find(item => cur.id === item.id) ||
            !!this.data.find(item => cur.id === item.id)
        }
        return acc
      }, false)
    ) {
      this.data.push(...this.value)
    } else if (
      this.value?.id &&
      this.value.nome &&
      !this.data.find(item => item.id === this.value.id)
    ) {
      this.data.push({ ...this.value })
    }
  },
  methods: {
    pesquisarDelay: debounce(function () {
      this.pesquisar()
    }, 300),
    pesquisar() {
      if (
        (this.textInside !== null && this.textInside.length > 2)
      ) {
        this.loadingCmp = true
        this.$store
          .dispatch('autocomplete/carregarOpcoes', {
            module: this.module,
            filter: this.textInside,
            extra: this.extraQuery,
          })
          .then((res) => {
            this.data = res

            if (
              this.multiple &&
              this.value?.length &&
              !this.value.reduce((acc, cur) => {
                if (!acc) {
                  acc =
                    !!this.items.find(item => cur.id === item.id) ||
                    !!this.data.find(item => cur.id === item.id)
                }
                return acc
              }, false)
            ) {
              this.data.push(...this.value)
            } else if (
              this.value?.id &&
              this.value.nome &&
              !this.data.find(item => item.id === this.value.id)
            ) {
              this.data.push({ ...this.value })
            }
          })
          .finally(() => {
            this.loadingCmp = false
          })
      }
    },
    keyHandler() {
      if (this.module) {
        this.pesquisarDelay()
      }
    },
  },
}
</script>

<style lang="css" scoped>

</style>
