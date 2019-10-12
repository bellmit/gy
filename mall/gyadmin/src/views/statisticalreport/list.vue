<template>
    <div class="commodity-main">
        <div id="main" style="width:1500px;height: 400px;"></div>
    </div>
</template>
<script>
    import echarts from 'echarts';
    export default {
        data () {
            return {

            };
        },
        components: {

        },
        mounted () {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('main'));
            // 绘制图表
            myChart.setOption({
                title: {
                    text: ''
                },
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [41100010, 411000, 411000.000000, 10, 10, 20]
                }]
            });
        },
        created () {

        },
        methods: {

        }
    };
</script>
