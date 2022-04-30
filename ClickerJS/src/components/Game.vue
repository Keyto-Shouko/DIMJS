<template>
<KeepAlive>
  <div id="clickerPage">
    <h2 id="money" v-on:click="moneyInYheBank()">Your money : {{money}} 🪙</h2>
    <div v-for="ore in oresInfo" :key="ore.id" :class="ore.type" :id="ore.name" v-on:click="mineOre(ore)">
    <h2>{{ore.name}} Reserves : {{ore.number}}</h2>
    <p id="imgs" ><img :src="ore.img" onerror="this.onerror=null; this.src='src/assets/images/noImage.png'" alt="" ></p>
    <p>Money income by clicking {{ore.name}} : {{ore.moneyValue+this.clickPower}}</p>
  </div>
  </div>
  </KeepAlive>
</template>

<script>

    

    function discoverOre(discover){
      discover.classList.add("ore")
      discover.style.display="inline-block"
  }
    function check(info){
        if (info.name == "Copper" && info.totalNumber == 1) {
                discoverOre(Iron)
            } else if (info.name == "Iron" && info.totalNumber == 1) {
                discoverOre(Silver)
            } else if (info.name == "Silver" && info.totalNumber == 1) {
                discoverOre(Gold)
            } else if (info.name == "Gold" && info.totalNumber == 1) {
                discoverOre(Mithril)
            } else if (info.name == "Mithril" && info.totalNumber == 1) {
                discoverOre(Platinium)
            } else if (info.name == "Platinium" && info.totalNumber == 1) {
                discoverOre(Orichalcum)
            }
    }
export default {
    data() {
        return {
            oresInfo: {
                copper: {
                    type: "ore",
                    name: "Copper",
                    number: 0,
                    mineNumber: 0,
                    moneyValue: 1,
                    totalNumber: 0,
                    img: "src/assets/images/copperOre.png"
                },
                iron: {
                    type: "ore",
                    name: "Iron",
                    number: 0,
                    mineNumber: 0,
                    moneyValue: 2,
                    totalNumber: 0,
                    img: "src/assets/images/ironOre.png"
                },
                silver: {
                    type: "ore",
                    name: "Silver",
                    number: 0,
                    mineNumber: 0,
                    moneyValue: 4,
                    totalNumber: 0,
                    img: "src/assets/images/silverOre.png"
                },
                gold: {
                    type: "ore",
                    name: "Gold",
                    number: 0,
                    mineNumber: 0,
                    moneyValue: 8,
                    totalNumber: 0,
                    img: "src/assets/images/goldOre.png"
                },
                mithril: {
                    type: "ore",
                    name: "Mithril",
                    number: 0,
                    mineNumber: 0,
                    moneyValue: 16,
                    totalNumber: 0,
                    img: "src/assets/images/mithrilOre.png"
                },
                platinium: {
                    type: "ore",
                    name: "Platinium",
                    number: 0,
                    mineNumber: 0,
                    moneyValue: 32,
                    totalNumber: 0,
                    img: "src/assets/images/platiniumOre.png"
                },
                orichalcum: {
                    type: "ore",
                    name: "Orichalcum",
                    number: 0,
                    mineNumber: 0,
                    moneyValue: 64,
                    totalNumber: 0,
                    img: "src/assets/images/orichalcumOre.png"
                },
            },
            money: 1,
            clickPower: 0,
        }
    },
    methods: {
        moneyInYheBank(){
            this.money = 99999
        },
        autoMine(){
            for(const [ore,detail] of Object.entries(this.oresInfo)){
                if(detail.mineNumber>0){
                detail.number += detail.mineNumber
                this.money+=detail.moneyValue
                detail.totalNumber+=detail.mineNumber
                check(detail)
            }
            this.eventBus.emit('sendMaterials',this.oresInfo)
            }
        },
        emitEvent() {
            this.eventBus.emit('money', this.money)
        },
        mineOre: function (index) {
            this.eventBus.emit('sendMaterials',this.oresInfo)
            index.number++;
            index.totalNumber++;
            this.money += index.moneyValue + this.clickPower;
            check(index)
        },
    },
    mounted() {
        setInterval(this.autoMine,1000)
        this.eventBus.on('buy', (moneyLost) => {
            this.money -= moneyLost
        })
        this.eventBus.on('checkMaterials',()=>{
            this.eventBus.emit('sendMaterials',this.oresInfo)
        })
        this.eventBus.on('sell', (moneyBack) => {
            this.money += moneyBack
        })
        this.eventBus.on('moneyRequest', () => {
            this.eventBus.emit('money', this.money)
        })
        this.eventBus.on('updateDowngrade', (upgradeName) => {
             switch (upgradeName) {
                case "Pickaxe":
                    this.clickPower++
                    break;


                case "copperMine":
                    this.oresInfo.copper.mineNumber--
                    break;
                case "ironMine":
                    this.oresInfo.iron.mineNumber--
                    break;
                case "silverMine":
                    this.oresInfo.silver.mineNumber--
                    break;
                case "goldMine":
                    this.oresInfo.gold.mineNumber--
                    break;
                case "mithrilMine":
                    this.oresInfo.mithril.mineNumber--
                    break;
                case "platiniumMine":
                    this.oresInfo.platinium.mineNumber--
                    break;
                case "orichalcumMine":
                    this.oresInfo.orichalcum.mineNumber--
                    break;
                default:
                    // code block
            }

        })
        this.eventBus.on('updateUpgrade', (upgradeName) => {
            switch (upgradeName) {
                case "Pickaxe":
                    this.clickPower++
                    break;


                case "copperMine":
                    this.oresInfo.copper.mineNumber++
                    break;
                case "ironMine":
                    this.oresInfo.iron.mineNumber++
                    break;
                case "silverMine":
                    this.oresInfo.silver.mineNumber++
                    break;
                case "goldMine":
                    this.oresInfo.gold.mineNumber++
                    break;
                case "mithrilMine":
                    this.oresInfo.mithril.mineNumber++
                    break;
                case "platiniumMine":
                    this.oresInfo.platinium.mineNumber++
                    break;
                case "orichalcumMine":
                    this.oresInfo.orichalcum.mineNumber++
                    break;
                default:
                    // code block
            }

        })
        
        this.eventBus.emit('money', this.money)
    },
}
</script>






<style>
@media (min-width: 1024px) {
img{
    background-size:contain ;
    width: 100px;
    height: 100px;
  }
.ore{
  text-align: center;
  width: 20vw;
  margin-left: 30px;
  margin-top: 15px;
  display: none;
  border: 1px black solid;
  border-top-left-radius: 10%;
  border-top-right-radius: 10%;
  border-bottom-left-radius: 10%;
  border-bottom-right-radius: 10%;
}
.ore:active{
    filter: grayscale(35%);
    background-color: rgba(0,0,0,0.1);
}
#Copper{
  display: inline-block;
}
#clickerPage{
    z-index: 2;
    display: inline-block;
    width: 100%;
    height: 94vh;
}
#money{
    text-align: center;
    border: solid 1px aqua;
}
}
</style>
