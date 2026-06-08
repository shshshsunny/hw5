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

// 💡 ✨ 這裡也要改成跟上面一樣的 Render 雲端網址
const API_BASE_URL = 'https://妳的專案名稱.onrender.com';

export default {
  name: 'App',
  components: { HeaderComponent, PriceForm, PriceTable, FooterComponent },
  data() {
    return { 
      items: [] 
    }
  },
  methods: {
    // 更改為抓取雲端資料庫的歷史紀錄
    async loadPrices() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/prices`)
        if (!res.ok) throw new Error(res.status)
        this.items = await res.json()
      } catch (e) {
        console.error('撈取雲端資料失敗:', e)
      }
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
