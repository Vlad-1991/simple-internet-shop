<template>
    <div class="header">
		<header  >
			<div class="header-div">
						<h1>Site</h1>
					<div  class="cart-header">
						<div>
              <router-link :to="{ name: 'cart' }" class="incart">
              <div><b>In Cart: {{ $store.getters['cart/length'] }}</b></div>
              </router-link>
							<div><b>Total: {{ $store.getters['cart/total'] }}</b></div>
						</div>
					</div>
				<hr>
			</div>
		</header>
    </div>

			<div class="wrapper">
				<div class="flex-row">
					<div class="flex-col-menu">
						<ul class="menu-list">
							<li :class="activeClass(item.route)" v-for="item in menu" :key="item.route"
              >
								<router-link :to="{ name: item.route }" class="router">
									{{ item.text }}
								</router-link>
							</li>
						</ul>
					</div>
          <div class="flex-col-prod">
              <router-view />
            </div>
				</div>
			</div>


</template>

<script>
import { $vfm, VueFinalModal, ModalsContainer } from 'vue-final-modal';
	export default {
    components: {VueFinalModal,
      ModalsContainer},
		data: () => ({
			menu: [
				{ route: 'catalog', text: 'Products' },
				{ route: 'cart', text: 'Cart' },
				{ route: 'checkout', text: 'Order' }
			],
      showModal: false
		}),
    computed: {

    },
    methods: {


      activeClass(route){

          if(this.$route.name !== '' && this.$route.name == route){
             return this.$route.name;
          }

      }

    }
		// $route, $router
	}
</script>

<style lang="less">
  @border: 1px;
  @offset: 30px;
  @offset_one_side: (@offset / 2);



  .wrapper{
    max-width: 1100px;
    margin: 150px 0 auto;
  }

  .header{
    overflow: hidden;
    background: url("./img/cart.jpg");
    position: fixed;
    top: 0;

    width: 100%;
  }

  .header-div{
    display: block;
  }
  .incart{
    color: black;
    &:hover{
      color: #ff4d00;
    }
  }

  .cart-header{
  text-align: right;
  }


  .flex-row{
    display: flex;
    flex-wrap: nowrap;
    margin: 0 (-@offset_one_side);
  }

  .flex-col-menu{
    margin: @offset_one_side;
    width: calc(20% - @offset_one_side);
    box-sizing: border-box;
    align-content: center;
    min-width: 200px;
  }

  .flex-col-prod{
    margin: @offset_one_side;


    width: calc(80% - @offset_one_side);

    box-sizing: border-box;
  }


  .menu-list{
    position: fixed;
    min-width: 184px;
    margin: 0px;
    padding: 0px;
  }

  li{
    background-color:#5597b4;
    list-style-type: none;
    font-weight:bold;
    font-size:16px;
    text-decoration:none;
    line-height:1;
    text-transform: uppercase;


    -webkit-transition:background-color 0.25s;
    -moz-transition:background-color 0.25s;
    transition:background-color 0.25s;
  }

  .router{
    color:#fff;
    text-decoration:none;
    padding: 18px 30px;
    display: block;
  }
  .router:hover{
    text-decoration:none;
    color: #fff
  }

  .checkout, .cart, .catalog{
    background-color:#e35885;
  }



  .modal-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
  }
  .modal-content {
    position: relative;
    width: 50%;
    max-height: 400px;
    padding: 16px;
    overflow: auto;
    background-color: #fff;
    border-radius: 4px;
  }
  .modal-close {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    margin: 8px 8px 0 0;
    cursor: pointer;
  }
  .modal-close::hover {
    color: gray;
  }

</style>