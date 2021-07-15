const DefaultData = {
    resourceData: {
        population: 2,
        science: 0,
        food: 400, wood: 400,
        stone: 0, coal: 0,
        copperMine: 0, copperIngot: 0,
        ironMine: 0, ironIngot: 0
    },
    counter: {
        producedResource: {
            population: 0,
            science: 0,
            food: 0, wood: 0,
            stone: 0, coal: 0,
            copperMine: 0, copperIngot: 0,
            ironMine: 0, ironIngot: 0
        }
    },
    buildings: {
        room: {
            num: 1, name: "房屋",
            price: {food: 200, wood: 240}
        },
        field: {
            num: 0, name: "农田",
            price: {food: 180}
        },
        logging: {
            num: 0, name: "伐木场",
            price: {food: 360, wood: 200}
        },
        quarry: {
            num: 0, name: "采石场",
            price: {food: 400, wood: 480}
        },
        altar: {
            num: 0, name: "祭坛",
            price: {food: 1200, stone: 1000}
        },
        coalMine: {
            num: 0, name: "煤矿",
            price: {food: 600, wood: 400, stone: 400}
        },
        stove: {
            num: 0, name: "熔炉",
            price: {food: 2000, stone: 1600, science: 600}
        },
        copperMine: {
            num: 0, name: "铜矿场",
            price: {food: 1000, stone: 1400, science: 1000}
        },
        ironMine: {
            num: 0, name: "铁矿场",
            price: {food: 1600, stone: 2400, science: 1800}
        }
    },
    division: {
        field: {
            num: 0, increase: {resource: "food", num: 2.4}
        },
        logging: {
            num: 0, increase: {resource: "wood", num: 2}
        },
        quarry: {
            num: 0, increase: {resource: "stone", num: 2}
        },
        altar: {
            num: 0, increase: {resource: "science", num: .8}
        },
        coalMine: {
            num: 0, increase: {resource: "coal", num: 1.4}
        },
        stove: {
            num: 0, increase: {resource: "", num: 1}
        },
        copperMine: {
            num: 0, increase: {resource: "copperMine", num: 1.2}
        },
        ironMine: {
            num: 0, increase: {resource: "ironMine", num: 1.2}
        }
    }
}
export default DefaultData