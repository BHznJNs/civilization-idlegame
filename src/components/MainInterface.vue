<template>
    <div class="main-interface">
        <ul>
            <button class="btn waves-effect"
                    v-for="(value, name) in menuItems"
                    @click="changeShowingItem(name)"
                    :class="{ inactive: showingItem != name }"
                    :key="name">
                {{ value }}
            </button>
        </ul>
        <main-buildings v-show="showingItem == 'buildings'"></main-buildings>
        <main-division v-show="showingItem == 'division'"></main-division>
    </div>
</template>

<script>
    import MainBuildings from "./MainInterface/MainBuildings"
    import MainDivision from "./MainInterface/MainDivision"

    export default {
        components: {
            MainBuildings,
            MainDivision
        },
        data() {
            return {
                menuItems: {
                    buildings: "建筑",
                    division: "分工"
                },
                showingItem: "buildings"
            }
        },
        methods: {
            changeShowingItem(name) {
                if (name != this.showingItem) {
                    this.showingItem=name
                }
            }
        }
    }
</script>

<style scoped>
    .main-interface {
        display: flex;
        height: 80vh
    }
    @media screen and (max-width: 799px) {
        .main-interface {
            width: 70vw
        }
    }
    @media screen and (min-width: 800px) {
        .main-interface {
            width: calc(100vw - 240px)
        }
    }

    .main-buildings, .main-division {
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        justify-content: space-around;
        width: calc(100% - 4.4rem);
        height: 100%;
        padding: 2rem 1.6rem;
        border: solid 1px #e0e0e0
    }

    ul {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 5rem;
        margin: 0 -.6rem 0 0;
        border-bottom: solid 1px #e0e0e0
    }
    ul .btn {
        background-color: #424242;
        border-radius: 0 2px 2px 0
    }

    ul .btn.inactive {
        color: #424242;
        background-color: white;
        border: solid 1px #eee
    }
    ul .btn.inactive:hover {
        background-color: #eee
    }
</style>