<template>
  <div id="clickerPage">
    <h1>This is the clicker Page</h1>
    <h2>Ore Reserves : {{ore1}}</h2>
    <p id="imgs" v-on:click="mineOre"><img :src="imgCopper" alt=""></p>
    <button v-on:click="mineOre">Mine(Craft ^^)</button>
  </div>
</template>

<script>

  let gameRessource={
    copper:{numberOfCopper : 0,numberOfMineCopper : 0, totalNumberOfCopper : 0, imgCopper : "src/assets/images/copperOre.png"},
    iron:{numberOfIron : 0,numberOfMineIron : 0, totalNumberOfIron : 0, imgIron : ""},
    silver:{numberOfSilver : 0,numberOfMineSilver : 0, totalNumberOfSilver : 0, imgSilver : ""},
    gold:{numberOfGold : 0,numberOfMineGold : 0, totalNumberOfGold : 0, imgGold : "src/assets/images/goldOre.png"},
    mithril:{numberOfMithril : 0,numberOfMineMithril : 0, totalNumberOfMithril : 0, imgMithril : ""},
    platinium:{numberOfPlatinium : 0,numberOfMinePlatinium : 0, totalNumberOfPlatinium : 0, imgPlatinium : "src/assets/images/platiniumOre.png"},
    orichalcum:{numberOfOrichalcum : 0,numberOfMineOrichalcum : 0, totalNumberOfOrichalcum : 0, imgOrichalcum : "src/assets/images/orichalcumOre.png"},
  }

  //console.log(gameRessource.ore1.imgOre1)

  function autoSave(){
    //console.log("saved")
    window.localStorage.setItem("gameRessource",JSON.stringify(gameRessource))
    console.log("gameRessource",gameRessource)
  }

  function loadGame(){
    if(window.localStorage.getItem("gameRessource")!=null){
      let test = JSON.parse(window.localStorage.getItem("gameRessource"))
      console.log("test",test)
    }
  }


export default {
  data () {
    return {
      ore1 : gameRessource.copper.numberOfCopper,
      imgCopper : gameRessource.copper.imgCopper
    }
  },
  methods: {
  mineOre: function() {
    this.ore1++;
    gameRessource.copper.totalNumberOfCopper++;
  }
},
  mounted(){
    loadGame()
    autoSave()
    setInterval(autoSave,10000)
  }
}
</script>






<style>
@media (min-width: 1024px) {
  .clickerPage {
    min-height: 100vh;
    display: flex;
  }
}
img{
    background-size: cover ;
    width: 100px;
    height: 100px;
  }
</style>
