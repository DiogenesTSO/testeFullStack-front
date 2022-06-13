<template>
  <v-row :key="'item-' + id" class="item">
    <v-col class="pa-1 align-self-center" cols="3">
      <v-img
        v-if="!renderAvatar"
        :rounded="true"
        max-width="200"
        height="60"
        :src="
          src
            ? src
            : $vuetify.theme.dark
              ? 'https://static.useimobia.com.br/sistema/nao_encontrada_dark.png'
              : 'https://static.useimobia.com.br/sistema/nao_encontrada.png'
        "
      />
      <div v-else class="text-center">
        <v-avatar :key="'avatar_' + id" :color="$help.color(title)" size="45">
          <img v-if="src" :src="src">
          <span v-else class="white--text">
            {{ $format.initials(title) }}
          </span>
        </v-avatar>
      </div>
    </v-col>
    <v-col class="align-self-center" cols="9">
      <strong>{{ id }} | {{ title }}</strong>
      <br>
      <span v-for="(line, i) in lines" :key="'line_' + i">
        {{ line !== 'null' ? line : '' }}
        <br v-if="line">
      </span>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'FloatInfoItem',

  props: {
    id: {
      type: [String, Number],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    renderAvatar: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    src: {
      type: String,
      required: false,
      default: () => '',
    },
    lines: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
}
</script>

<style lang="scss">
.v-image {
  .v-image__image {
    border-radius: 5px;
  }
}
</style>
