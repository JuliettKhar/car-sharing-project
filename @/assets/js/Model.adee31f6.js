(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Model"],{"1d41":function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("aside",{staticClass:"order-form__aside"},[a("p",{staticClass:"aside__order"},[e._v(e._s(e.$translate("orderForm.aside.order")))]),e._l(e.orderItems,(function(t,r){return[a("div",{key:r,staticClass:"aside__item"},[a("span",[e._v(e._s(e.$translate("orderForm.aside."+r)))]),a("span"),a("span",[e._v(e._s(t))])])]})),a("div",{staticClass:"aside__amount"},[a("span",[e._v(e._s(e.$translate("orderForm.aside.price")))]),a("span",[e._v(e._s(e.$translate("orderForm.aside.amount")))])]),a("el-button",{class:[e.isFinishOrder?"aside__amount-finish-btn":""],attrs:{type:"success"},on:{click:e.getNextStep}},[e._v(" "+e._s(e.$translate("orderForm.aside.chooseModel")))])],2)},i=[],s=a("a6f4"),n={name:"OrderAside",props:{orderItems:{type:Object,default:function(){return{}}}},setup:function(e,t){var a=t.emit,r=t.root,i=Object(s["a"])((function(){return r.$route.path.includes("confirm-order")}));function n(){a("next")}return{getNextStep:n,isFinishOrder:i}}},l=n,o=(a("a7d7"),a("2877")),d=Object(o["a"])(l,r,i,!1,null,"02f7a6b5",null);t["a"]=d.exports},"1dfc":function(e,t,a){},4750:function(e,t,a){"use strict";a("d776")},5118:function(e,t,a){},"8f9d":function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-radio-group",{on:{change:e.updateFilters},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}},e._l(e.carFilterData,(function(t,r){return a("el-radio",{key:r,attrs:{label:e.translate("radioGroup."+t)}},[e._v(" "+e._s(e.$translate("radioGroup."+t))+" ")])})),1)},i=[],s=a("a6f4"),n=a("9923"),l={name:"RadioGroup",props:{carFilterData:{type:Array,required:!0},modelData:{type:String,required:!0}},setup:function(e,t){var a=t.emit,r=Object(n["b"])(),i=r.translate,l=Object(s["d"])(e.modelData);function o(e){a("update:modelData",e)}return{updateFilters:o,model:l,translate:i}}},o=l,d=(a("93ab"),a("2877")),c=Object(d["a"])(o,r,i,!1,null,"3d61f414",null);t["a"]=c.exports},"93ab":function(e,t,a){"use strict";a("1dfc")},a7d7:function(e,t,a){"use strict";a("5118")},b8a5:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"model"},[a("div",{staticClass:"model__wrapper"},[a("div",{staticClass:"model__filters"},[a("radio-group",{attrs:{"model-data":e.modelState.carFilter,"car-filter-data":e.modelState.filterModel},on:{"update:modelData":function(t){return e.$set(e.modelState,"carFilter",t)},"update:model-data":function(t){return e.$set(e.modelState,"carFilter",t)}}})],1),a("div",{staticClass:"model__cars"},e._l(e.carImages,(function(t,r){return a("div",{key:r,class:["model__cars-item",e.modelState.isActiveCar===r?"selected":""],on:{click:function(t){e.isActiveCar=r}}},[a("p",[e._v(e._s(t.title))]),a("p",[e._v(e._s(t.subtitle))]),a("img",{attrs:{src:"/images/"+t.name,alt:t.name}})])})),0)]),a("order-aside",{attrs:{"order-items":e.modelState.orderItems}})],1)},i=[],s=a("a6f4"),n=a("8f9d"),l=a("1d41"),o={name:"Model",components:{RadioGroup:n["a"],OrderAside:l["a"]},setup:function(){var e=["all","economy","premium"],t=Object(s["d"])("all"),a=Object(s["c"])({carFilter:"all",filterModel:["all","economy","premium"],orderItems:{city:"Ульяновск, Нариманова 42",model:"Hyndai, i30 N"},isActiveCar:0}),r=Object(s["d"])(0),i=[{name:"elantra.png",title:"ELANTRA",subtitle:"12 000 - 25 000 ₽"},{name:"i30n.png",title:"i30 N",subtitle:"10 000 - 32 000 ₽"},{name:"creta.png",title:"CRETA",subtitle:"12 000 - 25 000 ₽"},{name:"sonata.png",title:"SONATA",subtitle:"10 000 - 32 000 ₽"},{name:"i30n.png",title:"i30 N",subtitle:"10 000 - 32 000 ₽"},{name:"creta.png",title:"CRETA",subtitle:"12 000 - 25 000 ₽"}];return{carFilter:t,filterModel:e,carImages:i,isActiveCar:r,modelState:a}}},d=o,c=(a("4750"),a("2877")),u=Object(c["a"])(d,r,i,!1,null,"e1facdc2",null);t["default"]=u.exports},d776:function(e,t,a){}}]);
//# sourceMappingURL=Model.adee31f6.js.map