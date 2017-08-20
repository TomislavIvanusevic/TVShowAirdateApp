var app = new Vue({
  el:'#app',
  data:{
    showSearch:'',
    showEpName:'',
    showPlot:'',
    showLastAir:''
  },
  watch:{
    showSearch: function () {
      this.getShow();
    }

  },
  methods:{
    getShow:
      function(){
        var slug = app.showSearch.replace(/\ /g,"-"); //change spaces to dashes for slug
        var axiosConf = { //load up axios and connect to API
          headers: {'Content-Type': 'application/json'},
          headers: {'trakt-api-version': '2'},
          headers: {'trakt-api-key': '862b6e05841b41574a41fcb6af6672aa387fcba0d5049cecf15046f12ca7b7ed'}
        };
        //GET request and fill out response data
        axios.get('https://api-staging.trakt.tv/shows/'+ slug +'/last_episode?extended=full',axiosConf)
        .then(function(response){
          app.showEpName = response.data.title;
          app.showPlot = response.data.overview;
          app.showLastAir = response.data.first_aired;
        })
      }
  },
  filters: {
    //Convert the response time data format to something more readable.
    timeFix: function(value){
      value = value.toString();
      value = new Date(value);
      return value.toDateString();
    }

  }
});
