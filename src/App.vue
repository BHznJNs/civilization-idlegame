<template>
    <data-bar></data-bar>
    <event-bar></event-bar>
    <main-interface></main-interface>
    <tips-bar></tips-bar>
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
                        price: {food: 200, wood: 200},
                        info: "温暖的小房子，每个房子可容纳 2 个人。"
                    },
                    field: {
                        resource: "food", name: "农田",
                        num: 0, price: {food: 100},
                        info: "普通的农田，每人每两秒可以生产 3 单位粮食。"
                    },
                    logging: {
                        resource: "wood", name: "伐木场",
                        num: 0, price: {food: 300},
                        info: "原始的伐木场，每人每两秒可以生产 2.4 单位木材"
                    },
                    quarry: {
                        resource: "stone", name: "采石场",
                        num: 0, price: {food: 200, wood: 400},
                        info: "原始的采石场，每人每两秒可以生产 2.4 单位石料和 2 单位煤炭"
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
                        increase: [
                            {resource: "stone", num: 2.4},
                            {resource: "coal", num: 2}
                        ]
                    }
                },
                event: [],
                resourceData: {
                    population: 2,
                    food: 20000, // default 200
                    wood: 1000, // default 100
                    stone: 0,
                    coal: 0
                },
                tips: {}
            }
        },
        provide() {
            return {
                buildings: this.buildings,
                division: this.division,
                event: this.event,
                resourceData: this.resourceData,
                tips: this.tips
            }
        }
    }
</script>