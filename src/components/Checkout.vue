<template>

	<div v-if="!sendOrder">
		<h1>Order now</h1>
		<hr>
    <table>
      <thead>
      <tr>
        <th>Title</th>
        <th>Price</th>
        <th>Cnt</th>
        <th>Total</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="pr in products" :key="pr.id" style="text-align: center; vertical-align: baseline">
        <td>{{ pr.title }}</td>
        <td>{{ pr.price }}</td>
        <td>{{ pr.cnt }}</td>
        <td>{{ pr.price * pr.cnt }}</td>
      </tr>
      </tbody>
    </table>
    <hr>
    <div>Adress: <input type="text" v-model.lazy.trim="adress"></div>
    <div><b>Summary: {{$store.getters['cart/total']}}</b></div>
    <button class="button-cart button-cart-success" @click="order()">Order now</button>

    <vue-final-modal
        v-model="showModal"
        classes="modal-container"
        content-class="modal-content"
    >
      <span># Simple modal</span>
      <div align="center">
        <table>
          <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Cnt</th>
            <th>Total</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="pr in products" :key="pr.id" style="text-align: center; vertical-align: baseline">
            <td>{{ pr.title }}</td>
            <td>{{ pr.price }}</td>
            <td>{{ pr.cnt }}</td>
            <td>{{ pr.price * pr.cnt }}</td>
          </tr>
          </tbody>
        </table>
        <div style="text-align: left">
        <p>Adress: {{$store.getters['cart/adress']}}</p>
        <p>Total: {{$store.getters['cart/total']}}</p>
        <p>Process ordering 1-3 business days</p>
          <input type="checkbox" v-model="agree"><span style="margin-left: 3px">
          I agree to provide public information.....</span>
          </div>
        <button class="button-cart button-cart-success" :disabled="!agree" @click="formSend()">Ok</button>
        <button class="button-cart button-cart-cancel"
                @click="showModal = false">Cancel</button>
      </div>
    </vue-final-modal>
	</div>
  <div v-else style="margin: 100px auto">
    Order # received. Thanks for the shopping.
  </div>

</template>

<script>
	import {mapGetters} from "vuex";
  import { $vfm, VueFinalModal, ModalsContainer } from 'vue-final-modal'

  export default {
    components: { VueFinalModal,
      ModalsContainer},

    data: () => ({
      adress: '',
      showModal: false,
      agree: false,
      sendOrder: false
    }),
    computed: {
      ...mapGetters('cart', { products: 'itemsDetailed'})
    },
    methods: {
      order(){
        if(this.adress === ''){
          alert('please fill adress to order');
        }else{
          this.$store.dispatch('cart/addAdress', this.adress);
          this.showModal = true;
        }
      },
      formSend(){
        this.showModal = false;
        this.sendOrder = true;
      }
    }
	}
</script>

<style lang="less" scoped>


@border: 1px;
@columns: 12;
@offset: 30px;
@offset_one_side: (@offset / 2);


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

.button-cart{
  appearance: none;
  border: @border;
  border-radius: 5px;
  text-align: center;
  color: #fff;
  padding: 8px 16px;
  font-size: 16px;
  margin: 5px;
  &:disabled{
    opacity: 0.5;
  }
}


.button-cart-success{
  background: rgba(51, 134, 9, 0.96);
  text-decoration: none;
  &:hover{
    color: #fff;
  }
}

.button-cart-cancel{
  background: rgba(255, 0, 0, 0.66);
  text-decoration: none;

  &:hover{
    color: #fff;
  }
}
.btn-modal{
  display: inline-block;
  width: 10%;
  margin-left: 2px;
  margin-right: 2px;
}



</style>