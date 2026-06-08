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
    // 1. 處理 POST 新增按鈕 (改為直接存入 LocalStorage)
    addPricePost() {
      if (!this.itemName || !this.itemPrice) {
        alert('請填寫商品名稱與價格！');
        return;
      }

      // 抓取目前的紀錄
      let currentData = JSON.parse(localStorage.getItem('protein_tracker_data') || '[]')
      
      // 把新輸入的資料塞到最前面
      currentData.unshift({
        record_date: new Date().toISOString().split('T')[0], // 自動抓今天的日期
        item_name: this.itemName,
        item_price: this.itemPrice
      })

      // 存回瀏覽器
      localStorage.setItem('protein_tracker_data', JSON.stringify(currentData))

      alert('POST 新增成功！');
      this.itemName = '';
      this.itemPrice = '';
      this.$emit('submitted'); // 通知 App.vue 重新整理表格畫面
    },

    // 2. 處理 GET 新增按鈕 (在純前端模式下，功能與 POST 相同，確保兩個按鈕都能動)
    addPriceGet() {
      if (!this.itemName || !this.itemPrice) {
        alert('請填寫商品名稱與價格！');
        return;
      }

      let currentData = JSON.parse(localStorage.getItem('protein_tracker_data') || '[]')
      currentData.unshift({
        record_date: new Date().toISOString().split('T')[0],
        item_name: this.itemName,
        item_price: this.itemPrice
      })
      localStorage.setItem('protein_tracker_data', JSON.stringify(currentData))

      alert('GET 參數新增成功！');
      this.itemName = '';
      this.itemPrice = '';
      this.$emit('submitted'); // 通知 App.vue 重新整理表格畫面
    }
  }
}
</script>
