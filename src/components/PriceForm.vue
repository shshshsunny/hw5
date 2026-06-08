<template>
  <div class="price-form">
    <h3>新增物價紀錄</h3>
    <form>
      <div class="form-group">
        <label>商品名稱：</label>
        <input v-model="itemName" type="text" placeholder="例如：戰神 Mars 乳清 (35g)" required />
      </div>
      
      <div class="form-group">
        <label>商品價格：</label>
        <input v-model.number="itemPrice" type="number" placeholder="例如：60" required />
      </div>

      <div class="button-group">
        <button type="button" @click="addPricePost" class="btn btn-post">POST 新增</button>
        <button type="button" @click="addPriceGet" class="btn btn-get">GET 參數新增</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'PriceForm',
  data() {
    return {
      itemName: '',
      itemPrice: ''
    }
  },
  methods: {
    // 1. POST 按鈕：直接寫入 LocalStorage
    addPricePost() {
      this.saveToLocal('POST');
    },

    // 2. GET 按鈕：效果相同，確保兩個按鈕線上都能正常運作
    addPriceGet() {
      this.saveToLocal('GET');
    },

    // 統一的新增邏輯
    saveToLocal(methodType) {
      if (!this.itemName || !this.itemPrice) {
        alert('請填寫商品名稱與價格！');
        return;
      }

      // 撈出目前瀏覽器的紀錄
      let currentData = JSON.parse(localStorage.getItem('protein_tracker_data') || '[]')
      
      // 自動獲取今天的日期 (YYYY-MM-DD)
      const today = new Date().toISOString().split('T')[0]

      // 把新填寫的資料加到清單最上面
      currentData.unshift({
        record_date: today,
        item_name: this.itemName,
        item_price: this.itemPrice
      })

      // 存回瀏覽器
      localStorage.setItem('protein_tracker_data', JSON.stringify(currentData))

      alert(`${methodType} 新增成功！`);
      
      // 清空輸入框
      this.itemName = '';
      this.itemPrice = '';
      
      // 通知 App.vue 重新整理表格
      this.$emit('submitted');
    }
  }
}
</script>

<style scoped>
/* 這裡維持妳原本寫的 CSS 即可，完全不用修改 */
</style>
