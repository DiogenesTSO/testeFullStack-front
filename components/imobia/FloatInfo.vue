<template>
  <v-menu open-on-hover offset-y auto transition="slide-x-transition">
    <template #activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on">
        <slot name="ativador" />
      </div>
    </template>

    <div v-if="type === 'imoveis'" class="conteudo data">
      <v-row class="item item-heading">
        <h3 class="primary--text mx-2 mt-2">
          {{ data.length > 1 ? 'Imóveis' : 'Imóvel' }}
        </h3>
      </v-row>
      <imobia-float-info-item
        v-for="(item, i) in data"
        :id="item.codigo"
        :key="'imo_' + i"
        :title="item.tipo.nome"
        :src="
          item.foto || item.foto_capa
            ? item.foto_capa
              ? item.foto_capa
              : item.foto.url
            : null
        "
        :lines="[
          (item.endereco.rua ? item.endereco.rua : 'Endereço não informado') +
            (item.endereco.numero ? ', ' + item.endereco.numero : ''),
          (item.endereco.bairro
            ? item.endereco.bairro
            : 'Bairro não informado') +
            (item.endereco.cidade
              ? ' - ' + item.endereco.cidade.nome
              : 'Cidade não informada'),
        ]"
      />
    </div>

    <div
      v-if="
        type === 'pessoas' || type === 'proprietarios' || type === 'inquilinos'
      "
      class="conteudo data"
    >
      <v-row class="item item-heading">
        <h3 class="primary--text mx-2 mt-2">
          {{ optionsType[type] }}
        </h3>
      </v-row>
      <imobia-float-info-item
        v-for="(item, i) in data"
        :id="item.cliente ? item.cliente.id : item.id"
        :key="'cli_' + i"
        :title="item.cliente ? item.cliente.nome : item.nome"
        :lines="[item.celular, item.email_01]"
      />
    </div>

    <div v-if="type === 'clientes_vendas'" class="conteudo data">
      <v-row class="item item-heading">
        <h3 class="green--text mx-2 mt-2">
          Compradores
        </h3>
      </v-row>
      <imobia-float-info-item
        v-for="(item, i) in data.compradores"
        :id="item.id"
        :key="'comp_' + i"
        :title="item.nome"
        :lines="[item.celular, item.email_01]"
      />
      <v-row class="item item-heading">
        <h3 class="red--text mx-2 mt-2">
          Vendedores
        </h3>
      </v-row>
      <imobia-float-info-item
        v-for="(item, i) in data.vendedores"
        :id="item.id"
        :key="'vend_' + i"
        :title="item.nome"
        :lines="[item.celular, item.email_01]"
      />
    </div>

    <div v-if="type === 'corretores'" class="conteudo data">
      <v-row class="item item-heading">
        <h3 class="primary--text mx-2 mt-2">
          Corretores
        </h3>
      </v-row>
      <imobia-float-info-item
        v-for="(item, i) in data"
        :id="item.id"
        :key="'corr_' + i"
        :title="item.nome"
        :src="item.foto ? item.foto.url : null"
        :lines="['Corretor ' + item.tipo.nome]"
        render-avatar
      />
    </div>
  </v-menu>
</template>

<script>
export default {
  name: 'FloatInfo',

  props: {
    data: {
      type: [Array, Object],
      required: true,
      default: () => [],
    },
    type: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      optionsType: {
        pessoas: 'Pessoas',
        proprietarios: 'Proprietários',
        inquilinos: 'Inquilinos',
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.conteudo {
  min-width: 400px;
  background-color: var(--v-background2-base);

  &.data {
    .item {
      margin: 0;
      font-size: 12px;

      &:not(:last-child) {
        border-bottom: 1px solid var(--v-background2border-base);
      }

      &.item-heading {
        text-transform: uppercase;
        border-bottom: 0;
      }

      .v-avatar {
        border-radius: 4px;
      }

      strong,
      span {
        white-space: nowrap;
        text-overflow: ellipsis;
        display: block;
        overflow: hidden;
      }
    }
  }
}
</style>
