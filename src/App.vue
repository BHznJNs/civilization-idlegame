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

    export default {
        components: {
            DataBar,
            EventBar,
            MainInterface,
            TipsBar
        },
        data() {
            return {
                buildings: {
                    room: {
                        name: "房屋", num: 1,
                        price: {food: 200, wood: 200}
                    },
                    field: {
                        resource: "food", name: "农田",
                        num: 0, price: {food: 100}
                    },
                    logging: {
                        resource: "wood", name: "伐木场",
                        num: 0, price: {food: 200, wood: 200}
                    },
                    quarry: {
                        resource: "stone", name: "采石场",
                        num: 0, price: {food: 400, wood: 400}
                    }
                },
                division: {
                    field: {
                        num: 0, name: "农田",
                        increase: [{resource: "food", num: 3}]
                    },
                    logging: {
                        num: 0, name: "伐木场",
                        increase: [{resource: "wood", num: 2.4}]
                    },
                    quarry: {
                        num: 0, name: "采石场",
                        increase: [{resource: "stone", num: 2.4}]
                    }
                },
                event: [],
                resourceData: {
                    population: 2,
                    unemplyed: 2,
                    food: 5000, // default 200
                    wood: 1000, // default 400
                    stone: 0,
                    coal: 0,
                    copperMine: 0,
                    copperIngot: 0,
                    ironMine: 0,
                    ironIngot: 0
                },
                showingInfo: []
            }
        },
        provide() {
            return {
                buildings: this.buildings,
                division: this.division,
                event: this.event,
                resourceData: this.resourceData,
                showingInfo: this.showingInfo
            }
        }
    }
</script>