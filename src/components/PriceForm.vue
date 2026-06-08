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
// 💡 ✨ 關鍵：部署好 Render 後，把這裡換成妳的 Render 雲端網址（結尾不要加斜線）
const API_BASE_URL = 'https://妳的專案名稱.onrender.com';

export default {
  name: 'PriceForm',
  data() {
    return {
      itemName: '',
      itemPrice: ''
    }
  },
  methods: {
    // 1. 妳原本的 POST 新增方法，改連到雲端
    async addPricePost() {
      if (!this.itemName || !this.itemPrice) {
        alert('請填寫商品名稱與價格！');
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/api/prices`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            item_name: this.itemName,
            item_price: this.itemPrice
          })
        });

        if (!res.ok) throw new Error('新增失敗');

        alert('POST 新增成功！');
        this.itemName = '';
        this.itemPrice = '';
        this.$emit('submitted'); // 觸發 App.vue 重新整理列表
      } catch (error) {
        console.error(error);
        alert('POST 連線失敗，請檢查後端是否正常運作');
      }
    },

    // 2. 妳原本的 GET 新增方法，改連到雲端
    async addPriceGet() {
      if (!this.itemName || !this.itemPrice) {
        alert('請填寫商品名稱與價格！');
        return;
      }

      // 根據妳原本的 GET 路由設計組裝網址
      const url = `${API_BASE_URL}/api/prices/add?item_name=${encodeURIComponent(this.itemName)}&item_price=${this.itemPrice}`;

      try {
        const res = await fetch(url, { method: 'GET' });
        if (!res.ok) throw new Error('新增失敗');

        alert('GET 新增成功！');
        this.itemName = '';
        this.itemPrice = '';
        this.$emit('submitted'); // 觸發 App.vue 重新整理列表
      } catch (error) {
        console.error(error);
        alert('GET 連線失敗，請檢查後端是否正常運作');
      }
    }
  }
}
</script>

<style scoped>
/* 這裡保留妳原本寫的 CSS 樣式即可，完全不用動 */
</style>
