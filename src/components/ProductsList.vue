<template>
	<div class="wrap-prod">
		<h1>Products</h1>
		<div class="flex-row">
			<div class="flex-col" v-for="pr in productList" :key="pr.id">
				<div class="card-flex">
					<div class="card-body-my">
						<h3>{{ pr.title }}</h3>
						<div>{{ pr.price }}</div>
						<router-link :to="{ name: 'product', params: { id: pr.id } }">Read more</router-link>
						<hr>
						<button v-if="inCart(pr.id)" @click="remove(pr.id)" type="button"
                    class="button-cart button-cart-remove"
                    :disabled="onLoading(pr.id)">
							Remove
						</button>
						<button v-else @click="add(pr.id)" type="button"
                    class="button-cart button-cart-add"
                    :disabled="onLoading(pr.id)">
							Add to cart
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	computed: {
		...mapGetters('products', { productList: 'all' }),
		...mapGetters('cart', [ 'inCart', 'onLoading' ])
	},

	methods: {
		...mapActions('cart', [ 'add', 'remove' ]),

	}
}

/* 
	...mapGetters('products', { productList: 'all' })

	productList(){
		return $this.store.getters['products/all']
	}

	<router-link :to="'/product/' + pr.id">Read more</router-link>
*/
</script>

<style lang="less" scoped>
@margin: 5px;
@border: 1px;
@columns: 12;
@offset: 30px;
@offset_one_side: (@offset / 2);

.size(@n){
  width: calc(100% / @columns * @n - @offset);
}

.size-md(@n){
  @media screen and (max-width: 860px){
    .size(@n);
  }
}

.size-xs(@n){
  @media screen and (max-width: 560px){
    .size(@n);
  }
}


.flex-row{
  //min-width: 800px;

  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: right;
  margin: 0 (-@offset_one_side);
}

.flex-col{
   .size(4);
   .size-md(6);
   .size-xs(12);

  margin: @offset_one_side;
  box-sizing: border-box;
}

.card-flex{

  border: 1px grey solid;
  border-radius: 7px;
}

.card-body-my{
  height: 250px;

  display: flex;
  flex-direction: column;
  h3, div, hr, a{
    margin: 10px;
  }
  button{
    margin: auto 10px 10px;
  }

}




  .wrap-prod{
    width: 100%;
  }

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