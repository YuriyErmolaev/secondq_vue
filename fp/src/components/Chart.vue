<script>
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: [
    'chartdata',
    'options'
  ],
  data: () => ({
    chartData: {
      labels: ['Food', 'Education', 'Sport', 'Entertaiment', 'Transport'],
      datasets: [
        {
          data: [0, 0, 0, 0, 0],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }
      ]
    }
  }),
  methods: {
    renderDChart () {
      this.chartData.datasets[0].data = this.chartdata
      console.log('this.chartdata', this.chartdata)
      this.renderChart(this.chartData, this.options)
    }
  },
  mounted () {
    this.renderDChart()
  },
  watch: {
    chartdata: {
      handler: function (dataChart, newDataChart) {
        this.chartData.datasets[0].data = newDataChart
        this.renderDChart()
      },
      deep: true
    }
  }
}
</script>

<style>
</style>
