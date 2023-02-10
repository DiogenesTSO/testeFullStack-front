<template>
  <div class="w-100 h-100">
    <div v-show="data.length" ref="chartDiv" class="hello" />
    <div v-show="!data.length" class="hello d-flex justify-center align-center">
      <v-row justify="center" align="center">
        <v-col cols="12" md="6" justify="center" align="center">
          <div style="width: 30%;">
            <svgs-nao-encontrado />
          </div>
          <h2 class="text-center primary--text text--lighten-1">
            Nenhum dado para ser exibido
          </h2>
          <p class="grey--text text--darken-1">
            Não foi encontrado nenhum resultado para esse gráfico.
          </p>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import colors from 'vuetify/lib/util/colors'

import * as am4Core from '@amcharts/amcharts4/core'
import * as am4Charts from '@amcharts/amcharts4/charts'
import am4ThemesAnimated from '@amcharts/amcharts4/themes/animated'
am4Core.useTheme(am4ThemesAnimated)
export default {
  name: 'Chart2',

  props: {
    type: {
      type: String,
      required: true,
    },

    data: {
      type: Array,
      default: () => [
        {
          color: 'green',
          value: 51.8,
          text: 'Exemplo',
        },
        {
          color: 'purple',
          value: 50,
          text: 'Exemplo2',
        },
      ],
    },

    options: {
      type: [Array, Object],
      default: () => {},
    },

    reset: {
      type: [Boolean, Number, String],
      default: false,
    },
    hover: {
      type: [Boolean, Number, String],
      default: false,
    },
    blur: {
      type: [Boolean, Number, String],
      default: false,
    },
  },

  data() {
    return {
      chart: '',
      chartData: [],
      vuetifyColors: colors,
      series: {},
      stackedKeys: [],
      created: false,
    }
  },

  watch: {
    reset() {
      if (this.created) {
        this.chart.dispose()
        this.created = false
        this.createChart()
      }
    },
    hover(newVal) {
      if (this.created && this.series.slices.getIndex(newVal)) {
        this.series.slices.getIndex(newVal).isHover = true
      }
    },
    blur(newVal) {
      if (this.created && this.series.slices.getIndex(newVal)) {
        this.series.slices.getIndex(newVal).isHover = false
      }
    },
    data: {
      handler() {
        if (this.created) {
          this.chart.dispose()
          this.created = false
          this.parseData()
          this.createChart()
        } else {
          this.parseData()
          this.createChart()
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.parseData()

    this.createChart()
  },

  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose()
    }
  },

  methods: {
    parseData() {
      if (!this.options?.stacked) {
        this.chartData = this.data.map((item) => {
          return {
            ...item,
            ...{
              color: item.color
                ? item.color.includes('rgb') || item.color.includes('#')
                  ? item.color
                  : this.vuetifyColors[item.color]?.base
                : '#fff',
            },
          }
        })
      } else {
        this.chartData = this.data.map((item) => {
          const parsedData = {
            data: {},
          }
          Object.keys(item.data).forEach((key, i) => {
            parsedData[key] = item.data[key].value
            parsedData.data[key] = {
              ...item.data[key],
              ...{
                color: item.data[key].color
                  ? item.data[key].color.includes('rgb') ||
                    item.data[key].color.includes('#')
                    ? item.data[key].color
                    : this.vuetifyColors[item.data[key].color]?.base
                  : '#fff',
              },
            }
          })
          return {
            ...item,
            ...parsedData,
          }
        })
      }
    },
    createChart() {
      if (this.type === 'column') {
        if (this.options?.stacked) {
          this.createColumnChartStacked(this.chartData)
        } else {
          this.createColumnChart(this.chartData)
        }
      } else if (this.type === 'pie') {
        this.createPieChart(this.chartData)
      } else if (this.type === 'line') {
        this.createLineChart(this.chartData)
      }
    },
    createColumnChart(data) {
      let chart = this.chart
      if (!this.created) {
        chart = am4Core.create(this.$refs.chartDiv, am4Charts.XYChart)
      }
      chart.numberFormatter.intlLocales = 'de-DE'

      chart.data = data
      chart.padding(40, 15, 0, 0)

      // CATEGORIAS (Eixo X / Label)
      const categoryAxis = chart.xAxes.push(new am4Charts.CategoryAxis())
      categoryAxis.renderer.grid.template.location = 0
      categoryAxis.dataFields.category = 'text'
      categoryAxis.renderer.minGridDistance = 60
      categoryAxis.renderer.inside = false
      categoryAxis.renderer.grid.template.disabled = true
      categoryAxis.renderer.labels.template.fill = am4Core.color(
        this.$vuetify.theme.currentTheme.normal,
      )

      // VALOR (eixo y)
      const valueAxis = chart.yAxes.push(new am4Charts.ValueAxis())
      valueAxis.min = 0
      valueAxis.extraMax = 0.1
      valueAxis.renderer.labels.template.fill = am4Core.color(
        this.$vuetify.theme.currentTheme.normal,
      )
      valueAxis.renderer.grid.template.stroke = am4Core.color(
        this.$vuetify.theme.currentTheme.normal,
      )

      // SERIES (series de valores)
      this.series = chart.series.push(new am4Charts.ColumnSeries())

      this.series.dataFields.categoryX = 'text'
      this.series.dataFields.valueY = 'value'
      this.series.columns.template.strokeOpacity = 0
      this.series.columns.template.column.cornerRadiusTopRight = 10
      this.series.columns.template.column.cornerRadiusTopLeft = 10

      this.series.columns.template.propertyFields.fill = 'color'
      this.series.columns.template.propertyFields.stroke = 'color'
      this.series.columns.template.propertyFields.fill = 'color'
      this.series.columns.template.propertyFields.stroke = 'color'
      this.series.columns.template.tooltipText =
        '{categoryX}: [bold]{valueY}[/b]'

      // LABEL DE CIMA
      const labelBullet = this.series.bullets.push(new am4Charts.LabelBullet())
      labelBullet.label.verticalCenter = 'bottom'
      labelBullet.label.fill = am4Core.color(
        this.$vuetify.theme.currentTheme.normal,
      )
      labelBullet.label.text = '{values.valueY.workingValue}'

      // OPTIONS
      chart.zoomOutButton.disabled = true

      // Colors

      // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set

      categoryAxis.sortBySeries = this.series
      this.chart = chart
      this.created = true
    },
    createLineChart(data) {
      let chart = this.chart
      if (!this.created) {
        chart = am4Core.create(this.$refs.chartDiv, am4Charts.XYChart)
      }
      chart.numberFormatter.intlLocales = 'de-DE'

      chart.data = data
      chart.padding(40, 15, 0, 0)

      // CATEGORIAS (Eixo X / Label)
      const categoryAxis = chart.xAxes.push(new am4Charts.CategoryAxis())
      categoryAxis.renderer.grid.template.location = 0
      categoryAxis.dataFields.category = 'text'
      // categoryAxis.renderer.minGridDistance = 60
      // categoryAxis.renderer.inside = false

      categoryAxis.renderer.labels.template.fill = am4Core.color(
        this.$vuetify.theme.currentTheme.normal,
      )

      // VALOR (eixo y)
      const valueAxis = chart.yAxes.push(new am4Charts.ValueAxis())
      valueAxis.min = 0
      valueAxis.extraMax = 0.1
      valueAxis.renderer.labels.template.fill = am4Core.color(
        this.$vuetify.theme.currentTheme.normal,
      )
      valueAxis.renderer.grid.template.stroke = am4Core.color(
        this.$vuetify.theme.currentTheme.normal,
      )

      // SERIES (series de valores)
      this.series = chart.series.push(new am4Charts.LineSeries())

      this.series.dataFields.categoryX = 'text'
      this.series.dataFields.valueY = 'value'
      this.series.fill = 'color'
      /*       this.series.columns.template.strokeOpacity = 0
      this.series.columns.template.column.cornerRadiusTopRight = 10
      this.series.columns.template.column.cornerRadiusTopLeft = 10

      this.series.columns.template.propertyFields.fill = 'color'
      this.series.columns.template.propertyFields.stroke = 'color'
      this.series.columns.template.propertyFields.fill = 'color'
      this.series.columns.template.propertyFields.stroke = 'color'
      this.series.columns.template.tooltipText =
        '{categoryX}: [bold]{valueY}[/b]' */

      // LABEL DE CIMA
      const labelBullet = this.series.bullets.push(new am4Charts.LabelBullet())
      labelBullet.label.verticalCenter = 'bottom'
      labelBullet.label.fill = am4Core.color(
        this.$vuetify.theme.currentTheme.normal,
      )
      labelBullet.label.text = '{values.valueY.workingValue}'

      // OPTIONS
      chart.zoomOutButton.disabled = true

      // Colors

      // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set

      categoryAxis.sortBySeries = this.series
      this.chart = chart
      this.created = true
    },
    createColumnChartStacked(data) {
      if (!data.length) {
        return
      }
      let chart = this.chart
      if (!this.created) {
        chart = am4Core.create(this.$refs.chartDiv, am4Charts.XYChart)
      }

      chart.numberFormatter.intlLocales = 'de-DE'

      chart.data = data
      // OPTIONS
      chart.padding(40, 15, 0, 0)
      chart.zoomOutButton.disabled = true

      // CATEGORIAS (Eixo X / Label)
      const categoryAxis = chart.xAxes.push(new am4Charts.CategoryAxis())
      categoryAxis.dataFields.category = 'text'
      categoryAxis.renderer.grid.template.location = 0
      categoryAxis.renderer.minGridDistance = 60
      categoryAxis.renderer.inside = false
      categoryAxis.renderer.grid.template.disabled = true
      categoryAxis.renderer.labels.template.fill = am4Core.color(
        this.$vuetify.theme.currentTheme.normal,
      )
      categoryAxis.renderer.cellStartLocation = 0.15
      categoryAxis.renderer.cellEndLocation = 0.85

      // VALOR (eixo y)
      const valueAxis = chart.yAxes.push(new am4Charts.ValueAxis())
      valueAxis.min = 0
      valueAxis.extraMax = 0.1
      valueAxis.renderer.labels.template.fill = am4Core.color(
        this.$vuetify.theme.currentTheme.normal,
      )
      valueAxis.renderer.grid.template.stroke = am4Core.color(
        this.$vuetify.theme.currentTheme.normal,
      )

      const dataKeys = Object.keys(data[0]).filter(
        item => !(item === 'text' || item === 'data'),
      )

      dataKeys.forEach((key, i) => {
        // SERIES (series de valores)
        this.series = chart.series.push(new am4Charts.ColumnSeries())
        this.series.name = data[0].data[key].text
        this.series.dataFields.categoryX = 'text'
        this.series.dataFields.valueY = key
        this.series.sequencedInterpolation = true

        this.series.columns.template.strokeOpacity = 0
        this.series.columns.template.fill = am4Core.color(
          data[0].data[key].color,
        )
        this.series.columns.template.width = am4Core.percent(90)
        this.series.stacked = false

        // Borda da coluna
        this.series.columns.template.column.cornerRadiusTopLeft = 10
        // dataKeys.length === i + 1 ? 10 : 0
        this.series.columns.template.column.cornerRadiusTopRight = 10
        // dataKeys.length === i + 1 ? 10 : 0

        this.series.columns.template.tooltipText = '{name}: [bold]{valueY}[/b]'

        // LABEL DE CIMA
        /*   const labelBullet = this.series.bullets.push(
          new am4Charts.LabelBullet(),
        )
        labelBullet.label.verticalCenter = 'top'
        labelBullet.label.fill = am4Core.color(
          this.$vuetify.theme.currentTheme.normal,
        )
        labelBullet.label.text = '[bold]{valueY}[/b]'
        labelBullet.locationY = 0.5 */
      })

      // Colors

      this.chart = chart
      this.created = true
    },
    createPieChart(data) {
      let chart = this.chart
      if (!this.created) {
        chart = am4Core.create(this.$refs.chartDiv, am4Charts.PieChart)
      }
      // Options
      chart.numberFormatter.intlLocales = 'de-DE'
      chart.numberFormatter.language = new am4Core.Language()
      chart.language.locale._decimalSeparator = ','
      chart.language.locale._thousandSeparator = '.'
      chart.data = data

      this.series = chart.series.push(new am4Charts.PieSeries())
      this.series.dataFields.value = 'value'
      this.series.dataFields.category = 'text'
      this.series.labels.template.disabled = true
      if (this.options.donut) {
        chart.innerRadius = am4Core.percent(50)
        if (this.options.label) {
          const label = chart.seriesContainer.createChild(am4Core.Label)
          label.text = 'Agosto'
          label.fill = am4Core.color(this.$vuetify.theme.currentTheme.normal)
          label.horizontalCenter = 'middle'
          label.verticalCenter = 'middle'
          label.fontSize = 50
        }
      }
      // Put a thick white border around each Slice

      this.series.slices.template.stroke = '#fff'
      this.series.slices.template.strokeOpacity = 0

      this.series.slices.template.propertyFields.fill = 'color'

      // change the cursor on hover to make it apparent the object can be interacted with
      /*  series.slices.template.cursorOverStyle = [
        {
          property: 'cursor',
          value: 'pointer',
        },
      ] */

      this.series.alignLabels = false
      // this.series.labels.template.bent = true
      this.series.labels.template.radius = 3
      this.series.labels.template.padding(0, 0, 0, 0)
      this.series.labels.template.fill = am4Core.color(
        this.$vuetify.theme.currentTheme.normal,
      )
      /* series.ticks.template.disabled = true

      // Create a base filter effect (as if it's not there) for the hover to return to
      const shadow = series.slices.template.filters.push(
        new am4Core.DropShadowFilter(),
      )
      shadow.opacity = 0

      // Create hover state
      const hoverState = series.slices.template.states.getKey('hover') // normally we have to create the hover state, in this case it already exists

      // Slightly shift the shadow and make it more prominent on hover
      const hoverShadow = hoverState.filters.push(
        new am4Core.DropShadowFilter(),
      )
      hoverShadow.opacity = 0.7
      hoverShadow.blur = 5
 */
      // Add a legend
      //  chart.legend = new am4Charts.Legend()

      this.chart = chart
      this.created = true
    },
  },
}
</script>

<style>
.chart-area {
  padding-right: 18px;
}
.chart-column {
  padding-right: 14px;
}
.chart-tooltip {
  background-color: #3b3b41 !important;
  padding: 0.5rem;
}
.apexcharts-tooltip.apexcharts-theme-light {
  border: none !important;
  background: none !important;
  box-shadow: none !important;
}

.hello {
  width: 100%;
  height: 100%;
}
[style='cursor: pointer;'] {
  display: none;
}
</style>
