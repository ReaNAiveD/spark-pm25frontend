<template>
    <div id="app">
        <ve-line :data="pmData" :setting="this.chartSettings"></ve-line>
    </div>
</template>

<script>

    export default {
        name: 'app',
        data: function (){
            this.chartSettings = {
                xAxisType : 'time',
                labelMap: {
                    'time': '时间',
                    'predict': '预测PM2.5',
                    'temperature':'气温',
                    'humidity':'舒适度',
                    'average pm2.5': '平均PM2.5'
                },
                scale : [true, true]
            };
            return {
                socketHost: "localhost",
                socketPort: "8090",
                pmData: {
                    columns: ['time', 'predict', 'temperature', 'humidity', 'PM', 'average pm2.5'],
                    rows: []
                }
            }
        },
        created(){
            this.initWebSocket();
        },
        methods: {
            initWebSocket(){
                this.websocket = new WebSocket("ws://" + this.socketHost + ":" + this.socketPort + "/pm/websocket");
                this.websocket.onmessage = (message) => {
                    // this.pmData.rows.push([message["time"], message["city name"], message["temperature"], message["humidity"], message["pm2.5"], message["average pm2.5"]]);
                    // eslint-disable-next-line no-console
                    console.log(JSON.parse(message.data));
                    this.pmData.rows.push(JSON.parse(message.data));
                }
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
