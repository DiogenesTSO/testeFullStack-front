<template>
  <div>
    <tinymce
      id="editor-texto"
      v-model="val"
      :other_options="options"
      @input="$emit('input', val)"
    />
  </div>
</template>

<script>
import tinymce from 'vue-tinymce-editor'

export default {
  name: 'ImobiaTextEditor',

  components: {
    tinymce,
  },

  props: {
    value: {
      type: [Number, String, Boolean, Object],
      default: '',
    },
  },

  data() {
    return {
      val: this.value,

      options: {
        language_url: '/tinymce/pt_BR.js',
        content_css: '/tinymce/content.min.css',
        height: '600',
        menubar: false,
        toolbar1:
          'undo redo bold italic underline strikethrough fontselect fontsizeselect formatselect alignleft aligncenter alignright alignjustify outdent indent ltr rtl numlist bullist removeformat image print',
      },
    }
  },

  watch: {
    value() {
      this.val = this.value
    },
  },
}
</script>

<style lang="scss">
.mce-statusbar.mce-container.mce-panel.mce-stack-layout-item.mce-last {
  display: none;
}

.mce-container-body,
.mce-stack-layout-item {
  border-radius: 10px;
}

.mce-panel,
.mce-container * {
  border-radius: 10px;
  color: var(--v-normal-base);
}

.mce-menu,
.mce-menu-item:hover,
.mce-menu-item:focus {
  background: var(--v-card-base);
  border: 0 solid var(--v-card-base);
  color: var(--v-normal-base) !important;
}

.mce-menu-item:not(.mce-active):hover .mce-text {
  color: var(--v-primary-base) !important;
}

.mce-menu-item.mce-active.mce-menu-item-normal {
  background: var(--v-primary-base);
  color: #fff !important;
}

.mce-menu-item {
  border-left: 0;
}

.mce-btn.mce-active,
.mce-active {
  background: var(--v-primary-base) !important;
  border-bottom: 0 !important;

  * {
    background: var(--v-primary-base) !important;
  }
}

.mce-menu-item:hover .mce-ico {
  color: var(--v-primary-base);
}

.mce-text {
  color: var(--v-normal-base);
}

.mce-active.mce-text {
  color: #fff !important;
}

.mce-menu-item.mce-selected {
  background: inherit;
}

.mce-menu-item.mce-disabled,
.mce-menu-item.mce-disabled:hover {
  background: inherit;
  opacity: 0.6;
}

.mce-window {
  background: var(--v-card-base);
  border: 0;
  overflow: hidden;

  input {
    background: var(--v-background-base);
    border: 1px solid var(--v-background-base);
  }

  .mce-label {
    text-shadow: none !important;
  }

  .mce-window-head {
    border-bottom: 0;
  }

  .mce-container-body {
    background: var(--v-card-base);
    border-radius: 0;
  }
  .mce-window-head {
    background: var(--v-card-base);
    border-radius: 10px 10px 0 0;
  }
  .mce-foot {
    border-top: 0;

    .mce-container-body {
      border-radius: 0 !important;
    }
  }
}

.v-application.theme--dark {
  .mce-panel {
    border: 0 solid var(--v-background-base);
    background: var(--v-background-base);
  }

  .mce-container * {
    background: var(--v-background-base);
  }

  .mce-btn button,
  .mce-ico {
    color: #fff !important;
  }
}
</style>
