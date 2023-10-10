<script>
export default {
  name: 'Redirect',

  mounted() {
    this.$router.replace({
      name: 'empresas-id-geral',
      params: { id: this.$route.params.id },
    })
  },
}
</script>
