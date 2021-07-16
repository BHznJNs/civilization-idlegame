<template>
    <div class="main-options">
        <div class="option-describe">
            虽然退出/刷新界面时可以自动保存数据，不过你还是可以手动保存以防万一的。
        </div>
        <button 
            class="btn waves-effect"
            @click="saveData"
        >
            保存数据
        </button>
        <div class="divider"></div>
        <div class="option-describe">
            一键删除所有数据！此操作不可逆，请三思而后行。
        </div>
        <button 
            class="btn waves-effect"
            @click="clearData"
        >
            清除数据
        </button>
    </div>
</template>

<script>
    export default {
        methods: {
            // 函数：清除数据
            clearData() {
                this.removeBeforeunload()
                localStorage.clear()
            }
        },
        inject: ["saveData", "removeBeforeunload"]
    }
</script>

<style scoped>
    .option-describe {
        width: 100%;
        font-size: 1.2rem;
        transition: .3s ease-out
    }

    .btn {
        margin: .6rem 1rem 1rem;
        background-color: #647279 !important
    }
    .btn:hover {
        filter: brightness(1.1)
    }
    
    .divider {
        margin: 0 0 1rem
    }

    /* 过渡动画 */
    .slide-enter-active .option-describe,
    .slide-leave-active .option-describe {
        opacity: 0
    }
    /* ---- */
</style>