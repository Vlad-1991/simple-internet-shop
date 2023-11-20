<template>
	<div v-if="hasProduct">
		<h1>{{ product.title }}</h1>
    <router-link :to="{ name: 'catalog'}">Back to products</router-link>
		<hr>
		<div class="alert alert-success">
			{{ product.price }}
		</div>
    <button v-if="inCart($route.params.id)" @click="remove($route.params.id)" type="button"
            :disabled="onLoading($route.params.id)" class="button-cart button-cart-remove">
      Remove
    </button>

    <button v-else @click="add($route.params.id)" type="button"  :disabled="onLoading($route.params.id)"
            class="button-cart button-cart-add">
      Add to cart
    </button>
	</div>
	<app-e-404 v-else />
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
	import AppE404 from './E404.vue'

	export default {
		components: {
			AppE404
		},
    methods: {
      ...mapActions('cart', [ 'remove', 'add' ]),
    },
		computed: {
			...mapGetters('products', { productById: 'one'}),
      ...mapGetters('cart', { onLoading: 'onLoading' , inCart: 'inCart'}),
			id(){
				return parseInt(this.$route.params.id);
			},
			validId(){
				return /^[1-9]+\d*$/.test(this.id);
			},
			product(){
				return this.productById(this.id);
			},
			hasProduct(){
				return this.validId && this.product !== undefined;
			}
		}
	}
</script>

<style lang="less">

@border: 1px;
@columns: 12;
@offset: 30px;
@offset_one_side: (@offset / 2);

.button-cart{
appearance: none;
border: @border;
border-radius: 5px;

color: #fff;
padding: 8px 16px;
font-size: 16px;
&:disabled{
opacity: 0.5;
}
}

.button-cart-add{
background: rgba(30, 141, 48, 0.94);
}

.button-cart-remove{
background: rgba(203, 46, 46, 0.96);
}

</style>