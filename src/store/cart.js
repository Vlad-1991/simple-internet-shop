const BASEURL = 'http://faceprog.ru/reactcourseapi/cart/';

export default {
	namespaced: true,
	state: {
		items: [],
		inProcess: [],
		token: null,
		adress: ''
	},
	getters: {
		adress: state => state.adress,
		all: state => state.items,
		inCart: state => id => state.items.some(item => item.id == id),
		onLoading:  state => id => state.inProcess.some(item => item == id),
		itemsDetailed: (state, getters, rootState, rootGetters) => {
			return state.items.map(item => {
				if(item.id == 100){
					console.log(rootGetters['products/one'](item.id));
				}
				let product = rootGetters['products/one'](item.id);
				return { ...product, cnt: item.cnt };
			})
		},
		length: state => state.items.length,
		total: (state, getters) => getters.itemsDetailed.reduce((t, i) => t + i.price * i.cnt, 0)
	},
	mutations: {
		load(state, { cart, token }){
			state.items = cart;
			state.token = token;
		},
		add(state, id){
			state.items.push({ id, cnt: 1 });
		},
		remove(state, id){
			state.items = state.items.filter(item => item.id != id);
		},
		setCnt(state, { id, cnt }){
			let item = state.items.find(item => item.id == id);
			item.cnt = cnt;
		},
		addAdress(state, adress){
			state.adress = adress;
		},
		addInProcess(state, id) {
			state.inProcess.push(id);
		},
		removeInProcess(state, id) {
			state.inProcess = state.inProcess.filter(item => item != id);
		},
	},
	actions: {
		async load({ commit }){
			let oldToken = localStorage.getItem('CART__TOKEN');
			let response = await fetch(`${BASEURL}load.php?token=${oldToken}`);
			let { cart, token, needUpdate } = await response.json();
			
			if(needUpdate){
				localStorage.setItem('CART__TOKEN', token);
			}

			commit('load', { cart, token });
		},
		async add({ commit, getters, state }, id){
			if(!getters.inCart(id)){
				commit('addInProcess', id);

				let response = await fetch(`${BASEURL}add.php?token=${state.token}&id=${id}`);
				let res = await response.json();

				if(res){
					commit('add', id);
					commit('removeInProcess', id);
				}
			}
		},
		async remove({ commit, getters, state }, id){
			if(getters.inCart(id)){
				commit('addInProcess', id);
				let response = await fetch(`${BASEURL}remove.php?token=${state.token}&id=${id}`);
				let res = await response.json();

				if(res){
					commit('remove', id);
					commit('removeInProcess', id);
				}
			}
		},
		setCnt({ commit, getters }, { id, cnt }){
			if(getters.inCart(id)){
				let item = getters.itemsDetailed.find(item => item.id == id);
				let validCnt = Math.min(Math.max(cnt, 1), item.rest);
				commit('setCnt', { id, cnt: validCnt });
			}
		},
		addAdress({commit}, adress){
			commit('addAdress', adress);
		}
	}
}
