<template>
  <div class="stack-avatar">
    <v-avatar
      v-for="(item, i) in items"
      :key="'avatar_' + item.id + i"
      :color="!item.foto ? $help.color(item.nome) : null"
      size="30"
    >
      <img v-if="item.foto" :src="item.foto">
      <span v-else class="white--text">
        {{ $format.initials(item.nome) }}
      </span>
    </v-avatar>
    <v-avatar v-if="data.length > limit" color="primary" size="27">
      <span class="white--text">+{{ data.length - limit }}</span>
    </v-avatar>
  </div>
</template>

<script>
export default {
  name: 'VAvatarStack',

  props: {
    data: {
      type: Array,
      required: true,
    },
    limit: {
      type: Number,
      required: false,
      default: 3,
    },
  },

  computed: {
    items() {
      return this.data && this.data.length > 0
        ? this.data.slice(0, this.limit)
        : null
    },
  }
}
</script>

<style lang="scss">
.stack-avatar {
  .v-avatar {
    &:not(:first-child) {
      margin-left: -6px;
    }
    &:last-child {
      margin-left: -9px;
    }
  }
}
</style>
