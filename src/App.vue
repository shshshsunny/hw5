<template>
  <div class="app">
    <HeaderComponent />
    <main>
      <PriceForm @submitted="loadPrices" />
      <PriceTable :items="items" />
    </main>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue'
import PriceForm from './components/PriceForm.vue'
import PriceTable from './components/PriceTable.vue'
import FooterComponent from './components/FooterComponent.vue'

export default {
  name: 'App',
  components: { HeaderComponent, PriceForm, PriceTable, FooterComponent },
  data() {
    return { 
      items: [] 
    }
  },
  methods: {
    // 讀取資料的方法
    loadPrices() {
      // 從瀏覽器的儲存空間拿資料
      let localData = localStorage.getItem('protein_tracker_data')
      
      // 如果第一次打開，裡面空空的，就自動把妳的歷史紀錄載入進去
      if (!localData) {
        const defaultData = this.generateDefaultData()
        localStorage.setItem('protein_tracker_data', JSON.stringify(defaultData))
        this.items = defaultData
      } else {
        this.items = JSON.parse(localData)
      }
    },
    
    // 這裡放妳原本 reset_data.js 裡面的歷史物價紀錄
    generateDefaultData() {
      const years = [2016, 2018, 2020, 2022, 2024, 2026]
      const marsPrices = [25, 30, 35, 45, 50, 60]
      const chickenPrices = [45, 49, 55, 59, 69, 79]
      const sampleData = []
      
      // 倒序排列，讓最新的 2026 年排在最上面
      for (let i = years.length - 1; i >= 0; i--) {
        const date = `${years[i]}-05-08`
        sampleData.push({ record_date: date, item_name: '超商即食雞胸肉 (180g)', item_price: chickenPrices[i] })
        sampleData.push({ record_date: date, item_name: '戰神 Mars 乳清 (35g)', item_price: marsPrices[i] })
      }
      return sampleData
    }
  },
  mounted() {
    // 網頁一打開，立刻載入紀錄
    this.loadPrices()
  }
}
</script>

<style>
.app { font-family: system-ui, sans-serif; padding: 16px; }
</style>
