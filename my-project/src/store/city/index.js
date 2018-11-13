export default {
    namespaced: true,
    // 状态源
    state: {
        hot: [],
        //   全部城市的json数据
        cities: [],
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
        }
    },
    // 简化
    actions: {
        async AllCity({ commit, dispatch, state },arg) {
            let cities = await (await fetch("/Api/v1/cities?type=group")).json();
            let hot = await (await fetch("/Api/v1/cities?type=hot")).json();
            console.log(cities)
            console.log(hot)
            commit('Hot',hot)
            commit('AllCity', cities)
        }
    },
    mutations: {
        AllCity(state,arg) {
            state.cities = state.cities.concat(arg);
        },
        Hot(state,arg) {
            state.hot = state.hot.concat(arg);
        }
       
    }
    // 3、数据过滤 （缓存） ==> computed
    // getters: {
    //     CnodeGood(state) {
    //         // console.log(state)
    //         console.log(state.AllTopic);
    //         if (state.AllTopic.length) {
    //             return state.AllTopic[0].data.filter((item) => {
    //                 return item.good
    //             });
    //         } else {
    //             return []
    //         }

    //     }
    // }
}