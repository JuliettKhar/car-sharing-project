(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Amount"],{"05f1":function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"amount-options__wrapper"},[t.title?n("p",{staticClass:"amount-options__title"},[t._v("Ваш заказ подтверждён")]):t._e(),n("div",{staticClass:"amount-options__info"},[n("p",[t._v(t._s(t.items.model))]),n("p",[t._v(t._s(t.items.number))]),n("p",[t._v(" "+t._s(t.$translate("orderForm.content.amount.fuel"))+" "),n("span",[t._v(t._s(t.items.tank))])]),n("p",[t._v(" "+t._s(t.$translate("orderForm.content.amount.available"))+" "),n("span",[t._v(t._s(t.items.available))])])]),n("div",{staticClass:"amount__info"},[n("img",{attrs:{src:"/images/i30n.png",alt:""}})])])},r=[],a=n("a6f4"),i={name:"AmountListOptions",props:{orderOptions:{type:Object,default:function(){return{}}},title:{type:Boolean,required:!1}},setup:function(t){var e=Object(a["a"])((function(){return t.orderOptions}));return{items:e}}},o=i,u=(n("7292"),n("2877")),c=Object(u["a"])(o,s,r,!1,null,"13549675",null);e["a"]=c.exports},"1a16":function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"amount"},[n("amount-list-options",{attrs:{"order-options":t.orderOptions}}),n("order-aside",{attrs:{"order-items":t.orderItems},on:{next:t.finishOrder}})],1)},r=[],a=n("1d41"),i=n("05f1"),o=n("a6f4"),u=n("a18c"),c={name:"Amount",components:{OrderAside:a["a"],AmountListOptions:i["a"]},setup:function(){var t=Object(o["c"])({city:"Ульяновск, Нариманова 42",model:"Hyndai, i30 N",color:"Голубой",rent:"1д 2ч",tariff:"На сутки",tank:"Да"}),e=Object(o["c"])({model:"Hyndai, i30 N",number:"K 761 HA 73",tank:"100%",available:"12.06.2019 12:00"}),n=Object(u["b"])(),s=n.router;function r(){s.push({name:"Confirm"})}return{orderItems:t,orderOptions:e,finishOrder:r}}},d=c,l=(n("5aa0"),n("2877")),m=Object(l["a"])(d,s,r,!1,null,"c0deca30",null);e["default"]=m.exports},"1d41":function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("aside",{staticClass:"order-form__aside"},[n("p",{staticClass:"aside__order"},[t._v(t._s(t.$translate("orderForm.aside.order")))]),t._l(t.orderItems,(function(e,s){return[n("div",{key:s,staticClass:"aside__item"},[n("span",[t._v(t._s(t.$translate("orderForm.aside."+s)))]),n("span"),n("span",[t._v(t._s(e))])])]})),n("div",{staticClass:"aside__amount"},[n("span",[t._v(t._s(t.$translate("orderForm.aside.price")))]),n("span",[t._v(t._s(t.$translate("orderForm.aside.amount")))])]),n("el-button",{class:[t.isFinishOrder?"aside__amount-finish-btn":""],attrs:{type:"success"},on:{click:t.getNextStep}},[t._v(" "+t._s(t.$translate("orderForm.aside.chooseModel")))])],2)},r=[],a=n("a6f4"),i={name:"OrderAside",props:{orderItems:{type:Object,default:function(){return{}}}},setup:function(t,e){var n=e.emit,s=e.root,r=Object(a["a"])((function(){return s.$route.path.includes("confirm-order")}));function i(){n("next")}return{getNextStep:i,isFinishOrder:r}}},o=i,u=(n("a7d7"),n("2877")),c=Object(u["a"])(o,s,r,!1,null,"02f7a6b5",null);e["a"]=c.exports},5118:function(t,e,n){},"5aa0":function(t,e,n){"use strict";n("e4f5")},7292:function(t,e,n){"use strict";n("932b")},"932b":function(t,e,n){},a7d7:function(t,e,n){"use strict";n("5118")},e4f5:function(t,e,n){}}]);
//# sourceMappingURL=Amount.a4ed850c.js.map