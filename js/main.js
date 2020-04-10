axios.defaults.baseURL = 'https://autumnfish.cn';

new Vue({
    el: '#player',
    data:{
        // 搜索框
        query:"过又嘉",
        // 歌单
        musicList:[],
        // 歌曲地址
        musicUrl:"",
        // 歌曲封面
        musicCover:"",
        // 专辑名
        musicAlbum:"",
        // 歌曲名
        musicName:"",
        // 歌手名
        musicSinger:"",
        // 是否暂停旋转封面
        isPlaying: false
    },
    methods:{
        searchMusic(){
            axios.get("/search?keywords="+this.query)
            .then( (response)=>{
                this.musicList = response.data.result.songs;
                // console.log(response.data.result.songs)
            },(err)=>{
                console.log("err")
            })
        },
        playMusic(musicId){
            axios.get("/song/url?id="+musicId)
            .then( (response)=>{
                // 歌曲地址
                this.musicUrl = response.data.data[0].url
            },(err)=>{} )

            axios.get("/song/detail?ids="+musicId)
            .then( (response)=>{
                console.log(response.data.songs[0]);
                // 歌曲封面
                this.musicCover = response.data.songs[0].al.picUrl;
                // 专辑名
                this.musicAlbum = '专辑：' + response.data.songs[0].al.name;
                // 歌曲名
                this.musicName = response.data.songs[0].name;
                // 歌手名
                this.musicSinger = '歌手：' + response.data.songs[0].ar[0].name;
            },(err)=>{} )
        },
        play() {
            this.isPlaying = true
            // 清空mv的信息
            this.mvUrl = ''
        },
          // audio的pause事件
        pause() {
            this.isPlaying = false
        }
    }
})