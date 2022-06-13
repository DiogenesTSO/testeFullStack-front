<template>
  <svg
    id="Logo"
    class="logo"
    data-name="Logo"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 810.87 754.5"
  >
    <path
      class="cls-1"
      d="M499.57,877.32C276,877.32,94.13,695.44,94.13,471.9a58.23,58.23,0,1,1,116.45,0c0,159.34,129.63,289,289,289s289-129.63,289-289a58.23,58.23,0,1,1,116.45,0C905,695.44,723.12,877.32,499.57,877.32Z"
      transform="translate(-94.13 -122.82)"
    />
    <path
      class="cls-2"
      d="M798,303,642.34,137.26A45.76,45.76,0,0,0,580.19,133l-79.58,64.38-56.47-60.13a45.78,45.78,0,0,0-32-14.42,46.3,46.3,0,0,0-32.82,12.52L203,302.32a45.77,45.77,0,0,0,63,66.46L408.87,233.42,533.06,365.66A45.77,45.77,0,0,0,599.79,303L563.45,264.3l41.27-33.39L731.26,365.66A45.78,45.78,0,0,0,798,303Z"
      transform="translate(-94.13 -122.82)"
    />
  </svg>
</template>

<script lang="ts">
export default {
  props: {},
}
</script>

<style lang="scss" scoped>
.cls-1 {
  fill: #e84e24;
}

.theme--dark .cls-2 {
  fill: var(--v-primary-base);
}

.theme--light .cls-2 {
  fill: #1e3260;
}

.logo {
  width: 100%;
  -webkit-filter: drop-shadow(0px 3px 2px rgb(0 0 0 / 25%));
  filter: drop-shadow(0px 3px 2px rgb(0 0 0 / 25%));
}
</style>
