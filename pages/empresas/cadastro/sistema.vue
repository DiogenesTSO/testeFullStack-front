<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col cols="12" md="4">
          <imobia-input
            label="Nome do administrador"
          />
        </v-col>
        <v-col cols="12" md="4">
          <imobia-input
            module="cidades"
            label="E-mail do administrador"
          />
        </v-col>
        <v-col cols="12" md="4">
          <imobia-input label="Valor da taxa de cobrança" />
        </v-col>
        <v-col cols="12" md="8" lg="6">
          <imobia-select label="Tipo de acesso" />
        </v-col>
        <v-col cols="6" md="4" lg="2">
          <v-checkbox label="suporte" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {

}
</script>

<style>

</style>
