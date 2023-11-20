<template>
	<div>
		<h1>Cart</h1>
		<hr>
		<table>
			<thead>
				<tr>
					<th>Title</th>
					<th>Price</th>
					<th>Cnt</th>
					<th>Total</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="pr in products" :key="pr.id" style="text-align: center; vertical-align: baseline">
					<td>{{ pr.title }}</td>
					<td>{{ pr.price }}</td>
					<td>{{ pr.cnt }}</td>
					<td>{{ pr.price * pr.cnt }}</td>
					<td>
						<button class="button-minus" @click="setCnt({ id: pr.id, cnt: pr.cnt - 1 })">-1</button>
						<button class="button-plus" @click="setCnt({ id: pr.id, cnt: pr.cnt + 1 })">+1</button>
            <input style="margin: 4px" type="number" step="1" min="1" max="100" pattern="[0-9]{3}" :value="pr.cnt" @input="onInput($event.target.value, pr.id)">
            <button  @click="remove(pr.id)" type="button"
                     :disabled="onLoading(pr.id)"
                     class="button-cart button-cart-remove">
              Remove
            </button>
					</td>
				</tr>
			</tbody>
		</table>
		<hr>
		<router-link :to="{ name: 'checkout' }" class="button-cart button-cart-success">Checkout</router-link>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';

	export default {
		computed: {
			...mapGetters('cart', { products: 'itemsDetailed', onLoading: 'onLoading',  total: 'total'})
		},
		methods: {
			...mapActions('cart', [ 'setCnt', 'remove' ]),
      onInput(e, id){
        let cnt = e.replace(/[^+\d]/g, '');
        if(cnt == '0'){
          cnt = '1';
        }
        if(cnt.trim() !== ''){
          let payload = {id: id, cnt: cnt}
          this.$store.dispatch('cart/setCnt', payload);
        }
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

.button-plus{
  appearance: none;
  border: @border;
  border-radius: 5px;
  color: #fff;
  background: rgba(51, 134, 9, 0.96);
  align-self: baseline;
  padding: 8px 8px;
  font-size: 16px;
  margin: 3px;
}

.button-minus{
  appearance: none;
  border: @border;
  background: rgba(203, 159, 46, 0.96);
  border-radius: 5px;
  color: #fff;
  align-self: baseline;
  padding: 8px 8px;
  font-size: 16px;
  margin: 3px;
}

.button-cart-add{
  background: rgba(51, 134, 9, 0.96);
}

.button-cart-remove{
  background: rgba(203, 46, 46, 0.96);
}

.button-cart-success{
  background: rgba(51, 134, 9, 0.96);
  text-decoration: none;
  &:hover{
    color: #fff;
  }
}

table{
  width: 100%;
}

tr:nth-child(even) {background-color: #f2f2f2;}

th, td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #04AA6D;
  color: white;
}

</style>