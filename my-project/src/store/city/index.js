import { stat } from "fs";

export default {
    namespaced: true,
    // 状态源
    state: {
        // 热门城市
        hot: [],
        //   全部城市的json数据
        cities: [],
        // 当前定位城市
        nowCity:[],
        num: 0,
        arr: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'],
        rightCity: {
            "text-align": "center"
        },
        rightCityFixed: {
            "text-align": "center",
            position: "fixed",
            top: "300px",
            right: "20px"
        },
        // 主页面的轮播图
        allImgs: [],
        // 主页面排序选项
        paiXu: []
    },
    // 简化
    actions: {
        // 城市界面
        async AllCity({ commit, dispatch, state },arg) {
            let cities = await (await fetch("/Api/v1/cities?type=group")).json();
            let hot = await (await fetch("/Api/v1/cities?type=hot")).json();
            let nowCity=await (await fetch("/Api/v1/cities?type=guess")).json();
            // console.log(cities)
            // console.log(hot)
            commit('Hot',hot)
            commit('AllCity', cities)
            commit("NowCity",nowCity)
        },
        // 主页面的轮播图
        async Allimgs({commit,dispatch,state},arg) {
            let shopLun = await (await fetch(`/Lun/restapi/shopping/v2/banners?latitude=${arg.latitude}&longitude=${arg.longitude}`)).json();
            // console.log(shopLun);
            commit('Allimgs',shopLun);
        },
        // 排序方式
        async PaiXu({commit,diapath,state},arg) {
            let paixu = await (await fetch(`/Lun/pizza/shopping/restaurants/batch_filter?latitude=${arg.latitude}&longitude=${arg.longitude}`)).json();
            // console.log(paixu)
            commit('PaiXu',paixu);
        }
    },
    mutations: {
        AllCity(state,arg) {
            state.cities = state.cities.concat(arg);
            // state.allCity = state.allCity.concat(arg);
        },
        Hot(state,arg) {
            state.hot = state.hot.concat(arg);
        },
       NowCity(state,arg) {
           state.nowCity = state.nowCity.concat(arg);
       },
    //    轮播图
       Allimgs(state,arg) {
           state.allImgs = state.allImgs.concat(arg);
       },
    //    排序
       PaiXu(state,arg) {
           state.paiXu = state.paiXu.concat(arg);
       }
    }
    // 3、数据过滤 （缓存） ==> computed
    // getters: {
    //     FitterCity(state) {
    //         // console.log(state)
    //         console.log(state.allCity);
    //         if (state.allCity.length) {


    //             return state.AllTopic[0].data.filter((item) => {
    //                 return item.good
    //             });
    //         } else {
    //             return []
    //         }

    //     }
    // }
}