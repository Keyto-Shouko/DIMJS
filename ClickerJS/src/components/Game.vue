<template>
<KeepAlive>
  <div id="clickerPage">
    <h2 id="money">Your money : {{money}} 🪙</h2>
    <div v-for="ore in oresInfo" :key="ore.id" :class="ore.type" :id="ore.name" v-on:click="mineOre(ore)">
    <h2>{{ore.name}} Reserves : {{ore.number}}</h2>
    <p id="imgs" ><img :src="ore.img" onerror="this.onerror=null; this.src='src/assets/images/noImage.png'" alt="" ></p>
     <button v-on:click="emitEvent" >Emit Event</button>
  </div>
  </div>
  </KeepAlive>
</template>

<script>

    

    function discoverOre(discover){
      console.log("discover",discover)
      discover.classList.add("ore")
      discover.setAttribute("id",discover)
      discover.style.display="inline-block"
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
        autoMine(){
            for(const [ore,detail] of Object.entries(this.oresInfo)){
                if(detail.mineNumber>0){
                detail.number += detail.mineNumber
                this.money+=detail.moneyValue
            }
            }
        },
        emitEvent() {
            this.eventBus.emit('money', this.money)
        },
        mineOre: function (index) {
            /*this.ore.number++;
            this.gameRessource.copper.totalNumber++;*/
            index.number++;
            index.totalNumber++;
            this.money += index.moneyValue + this.clickPower;
            if (index.name == "Copper" && index.totalNumber == 1) {
                discoverOre(Iron)
            } else if (index.name == "Iron" && index.totalNumber == 1) {
                discoverOre(Silver)
            } else if (index.name == "Silver" && index.totalNumber == 1) {
                discoverOre(Gold)
            } else if (index.name == "Gold" && index.totalNumber == 1) {
                discoverOre(Mithril)
            } else if (index.name == "Mithril" && index.totalNumber == 1) {
                discoverOre(Platinium)
            } else if (index.name == "Platinium" && index.totalNumber == 1) {
                discoverOre(Orichalcum)
            }

            //console.log(document.querySelector("#"+index.name/*+" > p:nth-child(2) > img:nth-child(1)"*/))
            //document.querySelector("#"+index.name+" > p:nth-child(2) > img:nth-child(1)").style.filter= "grayscale(100%)";

        },
    },
    mounted() {
        setInterval(this.autoMine,1000)
        this.eventBus.on('buy', (moneyLost) => {
            this.money -= moneyLost
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
}
#Copper{
  display: inline-block;
}
#clickerPage{
  display: inline-block;
  width: 100%;
}
#money{
    text-align: center;
    border: solid 1px aqua;
}
}
</style>
