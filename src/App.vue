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
    loadPrices() {
      // 1. 直接讀取瀏覽器儲存空間
      let localData = localStorage.getItem('protein_tracker_data')
      
      // 2. 如果是第一次打開，就把所有的歷史紀錄預載進去！
      if (!localData) {
        const defaultData = this.generateDefaultData()
        localStorage.setItem('protein_tracker_data', JSON.stringify(defaultData))
        this.items = defaultData
      } else {
        this.items = JSON.parse(localData)
      }
    },
    
    // 🎯 這裡完整還原了妳最後一張截圖的所有資料庫內容
    generateDefaultData() {
      return [
        { record_date: '2026-05-12', item_name: 'aaaa', item_price: 77 },
        { record_date: '2026-05-08', item_name: '戰神 Mars 乳清 (35g)', item_price: 60 },
        { record_date: '2026-05-08', item_name: '超商即食雞胸肉 (180g)', item_price: 79 },
        { record_date: '2026-05-08', item_name: '能量棒', item_price: 45 },
        { record_date: '2026-05-05', item_name: 'fff', item_price: 66 },
        { record_date: '2024-05-08', item_name: '戰神 Mars 乳清 (35g)', item_price: 50 },
        { record_date: '2024-05-08', item_name: '超商即食雞胸肉 (180g)', item_price: 69 },
        { record_date: '2022-05-08', item_name: '戰神 Mars 乳清 (35g)', item_price: 45 },
        { record_date: '2022-05-08', item_name: '超商即食雞胸肉 (180g)', item_price: 59 },
        { record_date: '2020-05-08', item_name: '戰神 Mars 乳清 (35g)', item_price: 35 },
        { record_date: '2020-05-08', item_name: '超商即食雞胸肉 (180g)', item_price: 55 },
        { record_date: '2018-05-08', item_name: '戰神 Mars 乳清 (35g)', item_price: 30 },
        { record_date: '2018-05-08', item_name: '超商即食雞胸肉 (180g)', item_price: 49 },
        { record_date: '2016-05-08', item_name: '戰神 Mars 乳清 (35g)', item_price: 25 },
        { record_date: '2016-05-08', item_name: '超商即食雞胸肉 (180g)', item_price: 45 }
      ]
    }
  },
  mounted() {
    this.loadPrices()
  }
}
</script>

<style>
.app { font-family: system-ui, sans-serif; padding: 16px; }
</style>
