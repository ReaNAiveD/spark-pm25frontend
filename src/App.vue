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
                    'other': '其他'
                },
                scale : [true, true]
            };
            return {
                socketHost: "localhost",
                socketPort: "8080",
                pmData: {
                    columns: ['time', 'PM2.5', 'other'],
                    rows: []
                }
            }
        },
        created(){
            this.initWebSocket();
        },
        methods: {
            initWebSocket(){
                this.websocket = new WebSocket(this.socketHost + ":" + this.socketPort + "/pm/websocket");
                this.websocket.onmessage = function (message) {
                    this.pmData.rows.push(message);
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
