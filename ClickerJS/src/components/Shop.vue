<template>
  <main>
    <div id="shopButton" v-on:click="toggleShop()">SHOP</div>
      <div id="shop">
    <div id="shopDescription">
      <p>Welcome to the Shop !</p>
      <p>Here you can buy stuff to upgrade your clicking income with pickaxes</p>
      <p>Or you can buy automatic mines that will mine ores for you !</p>
    </div>
    <div v-for="upgrade in upgrades" :key="upgrade.id" :id="upgrade.name" :class="upgrade.type">
        <p>Number of {{upgrade.name}} : {{upgrade.totalNumber}}</p>
        <p id="imgs" ><img :src="upgrade.img" onerror="this.onerror=null; this.src='src/assets/images/noImage.png'" alt="" ></p>
        <p>Price : {{upgrade.initialPrice+upgrade.inflation}}</p>
        <button v-on:click="buy(upgrade)" >Buy 1 {{upgrade.name}}</button>
        <button v-on:click="sell(upgrade)" >Sell 1  {{upgrade.name}}</button>
    
    </div>
    </div>
  </main>
</template>

<script>
//This function will display the next upgrade depending on your progression
//discover corresponds to the name of te upgrade we need to display
  function discoverUpgrade(discover){
      discover.classList.add("upgrade")
      discover.style.display="inline-block"
  }
  //This function checks if you have enough materials, if so it will display the next upgrade
  //info corresponds to oresInfo from the game
  function check(info) {
    if (info.copper.totalNumber >= 1) {
      discoverUpgrade(ironMine)
    }
    if (info.iron.totalNumber >= 1) {
      discoverUpgrade(silverMine)
    }
    if (info.silver.totalNumber >= 1) {
      discoverUpgrade(goldMine)
    }
    if (info.gold.totalNumber >= 1) {
      discoverUpgrade(mithrilMine)
    }
    if (info.mithril.totalNumber >= 1) {
      discoverUpgrade(platiniumMine)
    }
    if (info.platinium.totalNumber >= 1) {
      discoverUpgrade(orichalcumMine)
    }
  }
export default {
    data(){
        return {
      upgrades:{
    pickaxe:{type:"upgrade", name:"Pickaxe", minimumMaterial:10, initialPrice:5, inflation : 0, sellPrice : 1,totalNumber : 0, img : "src/assets/images/pickaxe.png"},
    copperMine:{type:"upgrade", name:"copperMine", minimumMaterial:10, initialPrice:0, inflation : 0, sellPrice : 1,totalNumber : 0, img : "src/assets/images/pickaxe.png"},
    ironMine:{type:"upgrade", name:"ironMine", minimumMaterial:10, initialPrice:100, inflation : 0, sellPrice : 1,totalNumber : 0, img : "src/assets/images/pickaxe.png"},
    silverMine:{type:"upgrade", name:"silverMine", minimumMaterial:10, initialPrice:250, inflation : 0, sellPrice : 1,totalNumber : 0, img : "src/assets/images/pickaxe.png"},
    goldMine:{type:"upgrade", name:"goldMine", minimumMaterial:10, initialPrice:500, inflation : 0, sellPrice : 1,totalNumber : 0, img : "src/assets/images/pickaxe.png"},
    mithrilMine:{type:"upgrade", name:"mithrilMine", minimumMaterial:10, initialPrice:1000, inflation : 0, sellPrice : 1,totalNumber : 0, img : "src/assets/images/pickaxe.png"},
    platiniumMine:{type:"upgrade", name:"platiniumMine", minimumMaterial:10, initialPrice:2500, inflation : 0, sellPrice : 1,totalNumber : 0, img : "src/assets/images/pickaxe.png"},
    orichalcumMine:{type:"upgrade", name:"orichalcumMine", minimumMaterial:10, initialPrice:5000, inflation : 0, sellPrice : 1,totalNumber : 0, img : "src/assets/images/pickaxe.png"},
  },
  money : 0,
    }
    },
    methods: {
      //this method will emit a msg to the game to receive your material info
      checkMaterials(upgrade)
      {
        this.eventBus.emit("checkMaterials")
        this.eventBus.on('sendMaterials',(materialsInfo)=>
        {
          check(materialsInfo) 
        })
      },
      //display or hide the shop
      toggleShop(){
        let shop = document.querySelector("#shop")
        let displayProperty = shop.style.display
        if(displayProperty!="none"){
          shop.style.display="none";
        }
        else{
          shop.style.display="inline-block";
        }
      },
      //check if you have enough money to buy, then buy upgrade
    buy(upgrade){
        this.eventBus.emit('moneyRequest')
        let price = /*Math.ceil(*/upgrade.initialPrice + upgrade.inflation//*upgrade.totalNumber*0.2)
        this.checkMaterials(upgrade)
        if(this.money>=price){
            upgrade.totalNumber++
            this.eventBus.emit('buy',price)
            this.eventBus.emit('updateUpgrade',upgrade.name)
            upgrade.initialPrice = Math.ceil(upgrade.initialPrice + upgrade.inflation*upgrade.totalNumber*0.2)+1
        }
        else{
            alert("you need "+""+(price-this.money)+" more money to buy it")
        }
    },
    //sell an upgrade, even though you don't need it because upgrades are important
    sell(upgrade){
        if(upgrade.totalNumber>=1){
            upgrade.totalNumber--
            this.eventBus.emit('sell',upgrade.initialPrice)
            this.eventBus.emit('updateDowngrade',upgrade.name)
        }
        
    },
    },
  mounted () {
      var self = this;
    this.eventBus.on('money', (money) => {
      self.money = money
    })
    this.eventBus.on('sendMaterials',(materialsInfo)=>
        {
          check(materialsInfo)
        })
      }
  }

</script>

<style>
img{
    background-size:contain ;
    width: 100px;
    height: 100px;
  }
.upgrade{
  text-align: center;
  width: 20vw;
  margin-left: 30px;
  margin-top: 15px;
  border: 1px black solid;
  display: none;
  border-top-left-radius: 10%;
  border-top-right-radius: 10%;
  border-bottom-left-radius: 10%;
  border-bottom-right-radius: 10%;
}
#Pickaxe{
  display: inline-block;
}
#copperMine{
  display: inline-block;
}
#shop{
  width: 100%;
  background-color: bisque;
  display: inline-block;
}
#shopButton{
  margin-bottom: 0px;
  background-color: black;
  text-align: center;
  color:white;
  height: 5vh;
}
</style>