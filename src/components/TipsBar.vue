<template>
    <div class="tips-bar">
        <div id="tip-box" class="waves-effect"
             @click="changeTip">
            {{ showingTip }}
        </div>
    </div>
</template>

<script>
    const tips = [
        "粮食、木材、石料是全时期的通用资源。",
        "不许炼铜，你这个 Hentai！",
        "你知咩，iron(铁)有熨斗的意思。",
        "粮食是最重要的资源，粮食缺乏会导致除农业外的产业瘫痪。",
        "你知咩，铜曾被称为“亦金”。"
    ]
    let interval
    export default {
        data() {
            return {
                showingTip: ""
            }
        },
        methods: {
            changeTip() {
                clearInterval(interval)
                let tipBox = document.querySelector("#tip-box")
                tipBox.classList.add("tip-box-disabled")
                setTimeout(() => {
                    let randomNum = Math.floor(Math.random() * tips.length)
                    this.showingTip = tips[randomNum]
                    tipBox.classList.remove("tip-box-disabled")

                    this.setIntervalFunc()
                }, 600)
            },
            setIntervalFunc() {
                let tipBox = document.querySelector("#tip-box")
                interval = setInterval(() => {
                    tipBox.click()
                }, 12000)
            }
        },
        mounted() {
            let randomNum = Math.floor(Math.random() * tips.length)
            this.showingTip = tips[randomNum]
            
            this.setIntervalFunc()
        },
        inject: ["tips"]
    }
</script>

<style scoped>
    .tips-bar {
        display: flex;
        justify-content: center;
        height: 20vh
    }
    @media screen and (max-width: 799px) {
        .tips-bar {
            width: 70vw
        }
    }
    @media screen and (min-width: 800px) {
        .tips-bar {
            width: calc(100vw - 240px)
        }
    }

    #tip-box {
        width: 40%;
        height: 16vh;
        margin: 2vh auto;
        padding: .4rem .6rem;
        background-color: #fafafa;
        border-radius: 4px;
        text-indent: 2rem;
        transition: .3s
    }
    #tip-box:hover {
        background-color: #eee
    }
    .tip-box-disabled {
        color: transparent;
        background-color: #f5f5f5 !important;
        text-shadow: 2px 2px 4px #9e9e9e;
        pointer-events: none
    }
</style>