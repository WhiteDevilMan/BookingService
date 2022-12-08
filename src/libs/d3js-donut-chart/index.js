import 'd3/dist/d3.min';

import './d3js-donut-chart.scss';

const d3 = require('d3');

// "start", "end" arcs colors pair per value
const greatColorStart = '#FFE39C';
const greatColorEnd = '#FFBA9C';
const goodColorStart = '#6FCF97';
const goodColorEnd = '#66D2EA';
const normalColorStart = '#BC9CFF';
const normalColorEnd = '#8BA4F9';
const badColorStart = '#919191';
const badColorEnd = '#3D4975';

class DonutChart {
  constructor(chartClassName) {
    this.donutChart = d3.select(chartClassName);
    this.width = this.donutChart.attr('width');
    this.height = this.donutChart.attr('height');
    this.indentBetweenArcs = 1;
    this.innerRadius = 5;
    this.colorSmooth = 100; /* smooth transition of colors (resolution) */

    this.percentsGreat = Number(this.donutChart.attr('data-great'));
    this.percentsGood = Number(this.donutChart.attr('data-good'));
    this.percentsNormal = Number(this.donutChart.attr('data-normal'));
    this.percentsBad = Number(this.donutChart.attr('data-bad'));
    this.innerScore = this.percentsGreat
      + this.percentsGood
      + this.percentsNormal
      + this.percentsBad;
    this.innerText = this.innerTextDefine(this.innerScore);
    this.initChart();
  }

  innerTextDefine(innerScore) {
    let innerText = null;
    switch (innerScore % 10) {
      case 1:
        innerText = 'голос';
        break;
      case 2:
      case 3:
      case 4:
        innerText = 'голоса';
        break;
      default:
        innerText = 'голосов';
    }

    return innerText;
  }

  initChart() {
    const g = (this.donutChart)
      .append('g')
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);

    const radius = d3.min([this.width, this.height]) / 2;

    const great = (this.colorSmooth / this.innerScore) * this.percentsGreat;
    const good = (this.colorSmooth / this.innerScore) * this.percentsGood + great;
    const normal = (this.colorSmooth / this.innerScore) * this.percentsNormal + good;
    const bad = (this.colorSmooth / this.innerScore) * this.percentsBad + normal;

    const dblpi = 2 * Math.PI;

    const color = d3
      .scaleLinear()
      .domain([0, great, great, good, good, normal, normal, bad])
      .range([
        greatColorStart,
        greatColorEnd,
        goodColorStart,
        goodColorEnd,
        normalColorStart,
        normalColorEnd,
        badColorStart,
        badColorEnd,
      ])
      .interpolate(d3.interpolateRgb);

    const color2 = d3
      .scaleThreshold()
      .domain([great, good, normal, bad])
      .range(d3.range(5));

    const arc = d3
      .arc()
      .innerRadius(radius - this.innerRadius)
      .outerRadius(radius)
      .padAngle((_, i) => (color2(i) === color2(i + this.indentBetweenArcs) ? 0 : 1))
      .startAngle((d) => d)
      .endAngle(
        (d) => d + (dblpi / this.colorSmooth) * 1.2,
      ); // 1.2 to block artifacts on the transitions

    g.selectAll('path')
      .data(d3.range(0, dblpi, dblpi / this.colorSmooth))
      .enter()
      .append('path')
      .attr('d', arc)
      .style('fill', (d, i) => color(i));

    g.append('text')
      .attr('class', 'd3js-donut-chart__innerScore')
      .attr('dy', '0em') // align the text to the center of the chart
      .attr('text-anchor', 'middle')
      .text(this.innerScore);

    g.append('text')
      .attr('class', 'd3js-donut-chart__innerText')
      .attr('dy', '1.2em')
      .attr('text-anchor', 'middle')
      .text(this.innerText);
  }
}

export default DonutChart;
