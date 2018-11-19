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
        nowCity: [],
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
        paiXu: [],
        pxiXuLate: []
    },
    // 简化
    actions: {
        // 城市界面
        async AllCity({ commit, dispatch, state }, arg) {
            let cities = await (await fetch("/Api/v1/cities?type=group")).json();
            let hot = await (await fetch("/Api/v1/cities?type=hot")).json();
            let nowCity = await (await fetch("/Api/v1/cities?type=guess")).json();
            // console.log(cities)
            // console.log(hot)
            commit('Hot', hot)
            commit('AllCity', cities)
            commit("NowCity", nowCity)
        },
        // 主页面的轮播图
        async Allimgs({ commit, dispatch, state }, arg) {
            let shopLun = await (await fetch(`/Lun/restapi/shopping/v2/banners?latitude=${arg.latitude}&longitude=${arg.longitude}`)).json();
            // console.log(shopLun);
            commit('Allimgs', shopLun);
        },
        // 排序方式
        async PaiXu({ commit, diapath, state }, arg) {
            let paixu = await (await fetch(`/Lun/pizza/shopping/restaurants/batch_filter?latitude=${arg.latitude}&longitude=${arg.longitude}`)).json();
            // console.log(paixu)
            commit('PaiXu', paixu.items);
        },
        async PaixuLate({ commit, diapath, state }, arg) {
            commit('PaixuLate', arg);

        }
    },
    mutations: {
        AllCity(state, arg) {
            state.cities = state.cities.concat(arg);
            // state.allCity = state.allCity.concat(arg);
        },
        Hot(state, arg) {
            state.hot = state.hot.concat(arg);
        },
        NowCity(state, arg) {
            state.nowCity = state.nowCity.concat(arg);
        },
        //    轮播图
        Allimgs(state, arg) {
            state.allImgs = state.allImgs.concat(arg);
        },
        //    排序
        PaiXu(state, arg) {
            state.paiXu = state.paiXu.concat(arg);
            state.pxiXuLate = state.paiXu.concat(arg)
        },
        PaixuLate(state, arg) {
            let a = state.paiXu;
            if (arg === 0) {
                // 综合排序
                state.paiXu = state.pxiXuLate;
            } else if (arg === 1) {
                let arr = a.sort((a, b) => {
                    // 好评优先
                    return b.restaurant.rating - a.restaurant.rating;
                })
                state.paiXu = arr;
            } else if (arg === 2) {
                let arr = a.sort((a, b) => {
                    // 销量最高
                    return b.restaurant.rating_count - a.restaurant.rating_count;
                })
                state.paiXu = arr;
            } else if (arg === 3) {
                let arr = a.sort((a, b) => {
                    // 起送价最低
                    return a.restaurant.piecewise_agent_fee.rules[0].price - b.restaurant.piecewise_agent_fee.rules[0].price;
                })
                state.paiXu = arr;
            } else if (arg === 4) {
                let arr = a.sort((a, b) => {
                    // 配送最快
                    return a.restaurant.distance - b.restaurant.distance;
                })
                state.paiXu = arr;
            } else if (arg === 5) {
                let arr = a.sort((a, b) => {
                    // 配送费最低
                    return a.restaurant.piecewise_agent_fee.rules[0].fee - b.restaurant.piecewise_agent_fee.rules[0].fee;
                })
                state.paiXu = arr;
            } else if (arg === 8) {
                let arr = a.sort((a, b) => {
                    // 距离最近
                    return a.restaurant.distance - b.restaurant.distance;
                })
                state.paiXu = arr;
            }

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