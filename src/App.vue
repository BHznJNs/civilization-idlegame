<template>
    <data-bar v-once></data-bar>
    <event-bar v-once></event-bar>
    <main-interface v-once></main-interface>
    <tips-bar v-once></tips-bar>
</template>

<script>
    import DataBar from "./components/DataBar"
    import EventBar from "./components/EventBar"
    import MainInterface from "./components/MainInterface"
    import TipsBar from "./components/TipsBar"
    import DefaultData from "./DefaultData"

    // 需要存储的数据
    const dataArray = [
        "resourceData", "counter",
        "buildings", "division"
    ]
    // 读取数据
    let appData = {}
    for (let item of dataArray) {
        appData[item] = JSON.parse(localStorage.getItem(item))
    }

    export default {
        components: {
            DataBar,
            EventBar,
            MainInterface,
            TipsBar
        },
        data() {
            // 如果存在存储数据，使用存储数据；若无，使用默认数据
            let resourceData = appData.resourceData || DefaultData.resourceData
            let counter = appData.counter || DefaultData.counter
            let buildings = appData.buildings || DefaultData.buildings
            let division = appData.division || DefaultData.division

            return {
                resourceData,
                counter,
                buildings,
                division,
                event: [],
                showingInfo: []
            }
        },
        methods: {
            // 保存数据方法
            saveData() {
                for (let item of dataArray) {
                    localStorage.setItem(item, JSON.stringify(this[item]))
                }
            },
            // 移除退出时保存数据事件
            removeBeforeunload() {
                removeEventListener("beforeunload", this.saveData)
            }
        },
        mounted() {
            // 关闭或刷新界面时保存数据
            addEventListener("beforeunload", this.saveData)
        },
        provide() {
            return {
                buildings: this.buildings,
                counter: this.counter,
                division: this.division,
                event: this.event,
                resourceData: this.resourceData,
                showingInfo: this.showingInfo,
                saveData: this.saveData,
                removeBeforeunload: this.removeBeforeunload
            }
        }
    }
</script>