(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Confirm"],{1782:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("aside",{staticClass:"order-form__aside"},[n("p",{staticClass:"aside__order"},[e._v(e._s(e.$translate("orderForm.aside.order")))]),e._l(e.orderItems,(function(t,r){return[t?n("div",{key:r,staticClass:"aside__item"},[n("span",[e._v(e._s(e.$translate("orderForm.aside."+r)))]),n("span"),"rent"===r?n("span",[e.getDaysCount(t.from,t.to)?[e._v(" "+e._s(e.getDaysCount(t.from,t.to))+" д ")]:e._e(),e.getHoursCount(t.from,t.to)?[e._v(" "+e._s(e.getHoursCount(t.from,t.to))+" ч ")]:e._e()],2):n("span",[e._v(e._s(t))])]):e._e()]})),e.price&&!e.loading?n("div",{staticClass:"aside__amount"},[n("span",[e._v(e._s(e.$translate("orderForm.aside.price")))]),n("span",[e._v(e._s(e.price)+" ₽")])]):e.loading?n("i",{staticClass:"el-icon-loading",staticStyle:{margin:"10px auto"}}):e._e(),n("el-button",{class:[e.isFinishOrder?"aside__amount-finish-btn":""],attrs:{type:"success",disabled:e.isDisabled},on:{click:e.getNextStep}},[e._v(" "+e._s(e.$translate("orderForm.aside."+e.getLocaleKey(e.$route.name)))+" ")])],2)},a=[],o=n("a6f4"),i={name:"OrderAside",props:{orderItems:{type:Object,default:function(){return{}}},isDisabled:{type:Boolean,default:!0},price:{type:String|Number,default:null},loading:{type:Boolean,default:!1}},setup:function(e,t){var n=t.emit,r=t.root,a=Object(o["a"])((function(){return r.$route.path.includes("confirm-order")})),i={location:"chooseModel",model:"extra",extra:"amountOptions",amount:"buy",confirm:"cancel"},s=function(e){return i[e.toLowerCase()]};function c(){a.value?n("cancel"):n("next")}return{getNextStep:c,isFinishOrder:a,getLocaleKey:s}},methods:{getDaysCount:function(e,t){var n=new Date(t)-new Date(e);return n?Math.floor(+n/1e3/60/60/24):0},getHoursCount:function(e,t){return new Date(t).getHours()-new Date(e).getHours()}}},s=i,c=(n("cde1"),n("2877")),u=Object(c["a"])(s,r,a,!1,null,"71fbfa41",null);t["a"]=u.exports},"398c":function(e,t,n){},"6c71":function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"amount-options__wrapper"},[e.title?n("p",{staticClass:"amount-options__title"},[e._v("Ваш заказ подтверждён")]):e._e(),e.loading?n("i",{staticClass:"el-icon-loading",staticStyle:{transform:"translateX(-50%)",position:"absolute",left:"50%"}}):[n("div",{staticClass:"amount-options__info"},[n("p",[e._v(e._s(e.items.model))]),n("p",[e._v(e._s(e.items.number))]),n("p",[e._v(" "+e._s(e.$translate("orderForm.content.amount.fuel"))+" "),n("span",[e._v(e._s(e.items.tank))])]),n("p",[e._v(" "+e._s(e.$translate("orderForm.content.amount.available"))+" "),n("span",[e._v(e._s(e.items.available))])])]),n("div",{staticClass:"amount__info"},[n("img",{attrs:{src:e.items.image.path,alt:e.items.image.name},on:{error:function(e){return e.target.src="images/car-stub.png"}}})])]],2)},a=[],o=n("a6f4"),i={name:"AmountListOptions",props:{orderOptions:{type:Object,default:function(){return{}}},title:{type:Boolean,required:!1},loading:{type:Boolean,default:!1}},setup:function(e){var t=Object(o["a"])((function(){return e.orderOptions}));return{items:t}}},s=i,c=(n("9a9d"),n("2877")),u=Object(c["a"])(s,r,a,!1,null,"b15a300e",null);t["a"]=u.exports},"72af":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"confirm-order"},[n("amount-list-options",{attrs:{title:"","order-options":e.orderOptions,loading:e.isLoading}}),n("order-aside",{attrs:{"order-items":e.orderItems,"is-disabled":!1,loading:e.isLoading,price:e.finalPrice},on:{cancel:e.cancelOrder}})],1)},a=[],o=n("1782"),i=n("6c71"),s=n("a6f4"),c=n("365c");function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){d(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function f(e,t,n,r,a,o,i){try{var s=e[o](i),c=s.value}catch(u){return void n(u)}s.done?t(c):Promise.resolve(c).then(r,a)}function p(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var o=e.apply(t,n);function i(e){f(o,r,a,i,s,"next",e)}function s(e){f(o,r,a,i,s,"throw",e)}i(void 0)}))}}var m={name:"ConfirmOrder",components:{OrderAside:o["a"],AmountListOptions:i["a"]},setup:function(e,t){var n=t.root,r=Object(s["e"])({city:"",model:"",color:"",rent:{},tariff:"",tank:""}),a=Object(s["f"])({model:"",number:"",tank:"",available:""}),o=n.$route.query.id,i=Object(s["f"])(!0),u=Object(s["f"])(0);function d(){return f.apply(this,arguments)}function f(){return f=p(regeneratorRuntime.mark((function e(){var t,n,i,s,d,f,p,m,v,_,b,g,O;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(c["f"])(o);case 2:t=e.sent,n=t.data,i=n.data,s=i.cityId,d=i.pointId,f=i.carId,p=i.color,m=i.dateFrom,v=i.dateTo,_=i.isFullTank,b=i.isNeedChildChair,g=i.isRightWheel,O=i.price,r.city="".concat(s.name,", ").concat(d.address),r.model=f.name,r.color=p,r.rent=v-m,r.tank=_?"Да":"",r.child=b?"Да":"",r.rightDrive=g?"Да":"",r.rent={to:v,from:m},a.value.number=f.number,a.value.tank=_?"100%":"",a.value.model=f.name,a.value.available="".concat(new Date(m).toLocaleDateString()," ").concat(new Date(m).getHours(),":").concat(new Date(m).getMinutes()),a.value.image=l(l({},f.thumbnail),{},{name:f.name}),u.value=O;case 19:case"end":return e.stop()}}),e)}))),f.apply(this,arguments)}return Object(s["d"])((function(){return d().then((function(){return i.value=!1}))})),{orderItems:r,orderOptions:a,orderId:o,isLoading:i,finalPrice:u}},methods:{cancelOrder:function(){var e=this;return p(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(c["a"])(e.orderId);case 3:return t.next=5,e.$router.push({name:"Home"});case 5:t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](0),console.log(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))()}}},v=m,_=(n("ae51"),n("2877")),b=Object(_["a"])(v,r,a,!1,null,"11090a93",null);t["default"]=b.exports},"9a9d":function(e,t,n){"use strict";n("398c")},ae51:function(e,t,n){"use strict";n("c516")},b1f5:function(e,t,n){},c516:function(e,t,n){},cde1:function(e,t,n){"use strict";n("b1f5")}}]);
//# sourceMappingURL=Confirm.aa939830.js.map