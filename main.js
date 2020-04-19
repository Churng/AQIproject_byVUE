var vm = new Vue ({
    el:'#wrap',
    data:{
      data:[],
      AQIDatas: {},
      selectData: {},
      ChangeCity:'高雄市',
      newData:[],
      countyItem:{},
      newTime:'',
      newSitename:'',
      newAQI:''
    },
    //  //:https://opendata.epa.gov.tw/api/v1/AQI?%24skip=0&%24top=1000&%24format=json&token=KJ8o24ff+0CVfaLmQPtcEw
    methods:{
      //當選取下拉選單的內容會執行 ChangeCity
      test(ChangeCity) {
        console.log(this.selectData, '123123');
        // const selectCity = this.newData.filter(item=>{
        //   return item.County === this.ChangeCity;
          
        // })
        //  [this.selectData] = selectCity;
        //  console.log(selectCityData);

      },
      //  拿取api數據
      getData(){
        let api ='https://opendata.epa.gov.tw/api/v1/AQI?%24skip=0&%24top=1000&%24format=json&token=KkWoJESBrUaCIhCCx0Q0Fw'
        let vm = this;
        console.log(api)
        fetch(api)
          .then(res=>{
              return res.json();
      
        }).then(jsonData=>{
          // console.log(jsonData, '全部資料');
          jsonData.forEach(data => {
            const county = data.County
            if (!this.AQIDatas[county]) {
              this.$set(this.AQIDatas, county, [data])
            } else {
              this.AQIDatas[county].push(data)
           
            }
          })
          console.log(this.AQIDatas)
          vm.data= jsonData;
          // console.log(this.AQIDatas)
          this.newTime = this.AQIDatas['高雄市'][0].PublishTime
          // console.log(this.newTime)
          this.newData = this.AQIDatas[this.ChangeCity]
          this.newSitename = this.AQIDatas['高雄市'][0].SiteName
          this.newAQI = this.AQIDatas['高雄市'][0].AQI
          this.countyItem = this.AQIDatas[this.ChangeCity][0]
          // this.newdist = this.AQIDatas['高雄市'][0]
          // [this.countyItem] = this.AQIDatas
          // const selectAlldata = vm.data.filter(item=>{
          //   return item.County == this.ChangeCity;
          // })
          //    this.newData = selectAlldata;
        })
      },
      //ＡＱＩ 的內容會因為 ’‘  更改class顏色
      bgColor(aqisite) {
        // console.log(aqisite.Status)
        switch (aqisite.Status) {
          case '良好':
            return 'box-1';
            break;
          case '普通':
            return 'box-2';
            break;
          case '對敏感族群不健康':
            return 'box-3';
            break;
          case '對所有族群不健康':
            return 'box-4';
            break;
          case '非常不健康':
            return 'box-5';
            break;
          case '危害':
            return 'box-6';
            break;
        }
      },
      //選取篩選出來的地區，製作點擊方法
      //將數據傳入左邊數據
      changeCountyItem(aqisite){
        this.countyItem = aqisite
        console.log(this.countyItem)
      }
    },
    // 監聽下拉選單的選取值，監聽 AQIDatas 中的內容 {...}
    watch:{
      ChangeCity(newVal,oldVal){
        console.log(newVal,oldVal)
        let data = this.AQIDatas[newVal]
        console.log(data)
        this.newData = data;
        console.log(this.newData)
        this.countyItem = this.AQIDatas[this.ChangeCity][0]
      }
    },
    created(){
      let vm = this;
      vm.getData();
    }
})


// AQIDatas:{縣市名稱：（...）}
// newData : 篩選出好的地區
