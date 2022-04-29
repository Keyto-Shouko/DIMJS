<template>
  <main>
    <div id="shopDescription">
      <p>Welcome to the Shop !</p>
      <p>Here you can buy stuff to upgrade your clicking income with pickaxes</p>
      <p>Or you can buy automatic mines that will mine ores for you !</p>
    </div>
    <div id="shop">
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

export default {
    data(){
        return {
      upgrades:{
    pickaxe:{type:"upgrade", name:"Pickaxe", initialPrice:5, inflation : 2, sellPrice : 1,totalNumber : 0, img : "src/assets/images/pickaxe.png"},
    copperMine:{type:"upgrade", name:"copperMine", initialPrice:0, inflation : 2, sellPrice : 1,totalNumber : 0, img : "src/assets/images/pickaxe.png"},
    ironMine:{type:"upgrade", name:"ironMine", initialPrice:100, inflation : 2, sellPrice : 1,totalNumber : 0, img : "src/assets/images/pickaxe.png"},
    silverMine:{type:"upgrade", name:"silverMine", initialPrice:250, inflation : 2, sellPrice : 1,totalNumber : 0, img : "src/assets/images/pickaxe.png"},
    goldMine:{type:"upgrade", name:"goldMine", initialPrice:500, inflation : 2, sellPrice : 1,totalNumber : 0, img : "src/assets/images/pickaxe.png"},
    mithrilMine:{type:"upgrade", name:"mithrilMine", initialPrice:1000, inflation : 2, sellPrice : 1,totalNumber : 0, img : "src/assets/images/pickaxe.png"},
    platiniumMine:{type:"upgrade", name:"platiniumMine", initialPrice:2500, inflation : 2, sellPrice : 1,totalNumber : 0, img : "src/assets/images/pickaxe.png"},
    orichalcumMine:{type:"upgrade", name:"orichalcumMine", initialPrice:5000, inflation : 2, sellPrice : 1,totalNumber : 0, img : "src/assets/images/pickaxe.png"},
  },
  money : 0,
    }
    },
    methods: {
    buy(upgrade){
        this.eventBus.emit('moneyRequest')
        let price = /*Math.ceil(*/upgrade.initialPrice + upgrade.inflation//*upgrade.totalNumber*0.2)
        console.log("price/upInitial/upInflation/upInflationNumber",price,upgrade.initialPrice,upgrade.inflation,Math.ceil(upgrade.inflation+upgrade.totalNumber*0.2)+1)
        console.log(this.money)
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
  },
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
  display: inherit;
}
#shop{
  display: inline-block;
  width: 100%;
}
</style>