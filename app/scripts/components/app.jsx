var React = require('react');
var MenuCollection = require('../models/menu').MenuCollection;
var CartCollection = require('../models/cart').CartCollection;
var CartItem = require('../models/cart').CartItem;

var Cart = React.createClass({
  render: function(){
    var self = this;
    var collection = this.props.cartItems;

    var cartItemList = collection.map(function(model){
      return (
        <li key={model.cid}>
          {model.get('title')} {model.displayPrice()}
          <button onClick={function(){self.props.handleRemoveFromCart(model)}}>Remove From Cart</button>
        </li>
      )
    });

    return (
      <div>
        <ul>
          {cartItemList}
        </ul>

        Cart Total: {collection.getCartTotal()}
      </div>
    );
  }
});

var Menu = React.createClass({
  render: function(){
    var self = this;

    var menuItemList = this.props.menuItems.map(function(model){
      return (
        <li key={model.cid}>
          {model.get('title')} {model.displayPrice()}
          <button onClick={function(){self.props.handleAddToCart(model)}}>Add To Cart</button>
        </li>
      )
    });

    return (
      <ul>
        {menuItemList}
      </ul>
    );
  }
});

var AppContainer = React.createClass({
  getInitialState: function(){
    return {
      menuItems: [],
      cartItems: []
    }
  },
  componentWillMount: function(){
    var menuItems = new MenuCollection();
    var cartItems = new CartCollection();

    menuItems.add([
      {title: 'Pad Thai', price: 800},
      {title: 'Green Curry', price: 650},
    ]);

    this.setState({
      'menuItems': menuItems,
      'cartItems': cartItems
    });
  },
  handleAddToCart: function(model){
    // var cartItem = new CartItem();
    // cartItem.set('title', model.get('title'));
    // cartItem.set('price', model.get('price'));
    // cartItem.set('menu_id', model.get('_id'));
    // this.state.cartItems.add(cartItem);

    this.state.cartItems.add(model);
    this.forceUpdate();
  },
  handleRemoveFromCart: function(model){
    this.state.cartItems.remove(model);
    this.forceUpdate();
  },
  render: function(){
    return (
      <div>
        <Menu handleAddToCart={this.handleAddToCart} menuItems={this.state.menuItems}/>
        <Cart handleRemoveFromCart={this.handleRemoveFromCart} cartItems={this.state.cartItems}/>
      </div>
    );
  }
});

module.exports = AppContainer;
