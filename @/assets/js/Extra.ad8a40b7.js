(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Extra"],{"07d7":function(e,t,r){"use strict";r("0bd3")},"0bd3":function(e,t,r){},1782:function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("aside",{staticClass:"order-form__aside"},[r("p",{staticClass:"aside__order"},[e._v(e._s(e.$translate("orderForm.aside.order")))]),e._l(e.orderItems,(function(t,a){return[t?r("div",{key:a,staticClass:"aside__item"},[r("span",[e._v(e._s(e.$translate("orderForm.aside."+a)))]),r("span"),"rent"===a?r("span",[e.getDaysCount(t.from,t.to)?[e._v(" "+e._s(e.getDaysCount(t.from,t.to))+" д ")]:e._e(),e.getHoursCount(t.from,t.to)?[e._v(" "+e._s(e.getHoursCount(t.from,t.to))+" ч ")]:e._e()],2):r("span",[e._v(e._s(t))])]):e._e()]})),e.price&&!e.loading?r("div",{staticClass:"aside__amount"},[r("span",[e._v(e._s(e.$translate("orderForm.aside.price")))]),r("span",[e._v(e._s(e.price)+" ₽")])]):e.loading?r("i",{staticClass:"el-icon-loading",staticStyle:{margin:"10px auto"}}):e._e(),r("el-button",{class:[e.isFinishOrder?"aside__amount-finish-btn":""],attrs:{type:"success",disabled:e.isDisabled},on:{click:e.getNextStep}},[e._v(" "+e._s(e.$translate("orderForm.aside."+e.getLocaleKey(e.$route.name)))+" ")])],2)},n=[],o=r("a6f4"),i={name:"OrderAside",props:{orderItems:{type:Object,default:function(){return{}}},isDisabled:{type:Boolean,default:!0},price:{type:String|Number,default:null},loading:{type:Boolean,default:!1}},setup:function(e,t){var r=t.emit,a=t.root,n=Object(o["a"])((function(){return a.$route.path.includes("confirm-order")})),i={location:"chooseModel",model:"extra",extra:"amountOptions",amount:"buy",confirm:"cancel"},c=function(e){return i[e.toLowerCase()]};function s(){n.value?r("cancel"):r("next")}return{getNextStep:s,isFinishOrder:n,getLocaleKey:c}},methods:{getDaysCount:function(e,t){var r=new Date(t)-new Date(e);return r?Math.floor(+r/1e3/60/60/24):0},getHoursCount:function(e,t){return new Date(t).getHours()-new Date(e).getHours()}}},c=i,s=(r("cde1"),r("2877")),l=Object(s["a"])(c,a,n,!1,null,"71fbfa41",null);t["a"]=l.exports},2891:function(e,t,r){},5107:function(e,t,r){"use strict";r("6ae2")},"6ae2":function(e,t,r){},"9a74":function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-radio-group",{on:{change:e.updateFilters},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}},[e._l(e.carFilterData,(function(t,a){return[t.name?r("el-radio",{key:a,attrs:{label:t.id},on:{change:function(r){return e.changeValue(t)}}},[e._v(" "+e._s(t.name)+" ")]):r("el-radio",{key:a,attrs:{label:t},on:{change:function(r){return e.changeValue(t)}}},[e._v(" "+e._s(t)+" ")])]}))],2)},n=[],o=r("a6f4"),i={name:"RadioGroup",props:{carFilterData:{type:Array,required:!0},modelData:{type:String|Object,required:!0}},setup:function(e){var t=Object(o["g"])(e),r=t.modelData,a=Object(o["f"])("");return Object(o["h"])(r,(function(e){return a.value=e})),{model:a}},methods:{changeValue:function(e){this.$emit("change",e)},updateFilters:function(e){this.$emit("update:modelData",e)}}},c=i,s=(r("9e7a"),r("2877")),l=Object(s["a"])(c,a,n,!1,null,"aee6fec4",null);t["a"]=l.exports},"9e7a":function(e,t,r){"use strict";r("2891")},b1f5:function(e,t,r){},cde1:function(e,t,r){"use strict";r("b1f5")},d6a5:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"extra"},[r("div",{staticClass:"extra__wrapper"},[r("div",{staticClass:"extra__color"},[r("p",[e._v(e._s(e.$translate("orderForm.content.extra.color")))]),r("radio-group",{attrs:{"model-data":e.extraState.colorFilter,"car-filter-data":e.extraState.colorModel},on:{"update:modelData":function(t){return e.$set(e.extraState,"colorFilter",t)},"update:model-data":function(t){return e.$set(e.extraState,"colorFilter",t)},change:e.selectColor}})],1),r("div",{staticClass:"extra__picker"},[r("p",[e._v(e._s(e.$translate("orderForm.content.extra.date")))]),r("div",[r("span",[e._v(e._s(e.$translate("orderForm.content.extra.from")))]),r("el-date-picker",{attrs:{type:"datetime",editable:"","clear-icon":"el-icon-close",clearable:!0,placeholder:e.translate("orderForm.content.extra.placeholder"),"picker-options":e.extraState.pickerOptionsFrom,format:"dd-MM-yyyy HH:mm"},model:{value:e.extraState.from,callback:function(t){e.$set(e.extraState,"from",t)},expression:"extraState.from"}})],1),r("div",[r("span",[e._v(e._s(e.$translate("orderForm.content.extra.to")))]),r("el-date-picker",{attrs:{type:"datetime",editable:"","clear-icon":"el-icon-close",clearable:!0,"picker-options":e.extraState.pickerOptionsTo,placeholder:e.translate("orderForm.content.extra.placeholder"),format:"dd-MM-yyyy HH:mm"},model:{value:e.extraState.to,callback:function(t){e.$set(e.extraState,"to",t)},expression:"extraState.to"}})],1)]),r("div",{staticClass:"extra__tariff"},[r("p",[e._v(e._s(e.$translate("orderForm.content.extra.tariff")))]),r("radio-group",{attrs:{"model-data":e.extraState.tariffFilter,"car-filter-data":e.extraState.tariffModel},on:{"update:modelData":function(t){return e.$set(e.extraState,"tariffFilter",t)},"update:model-data":function(t){return e.$set(e.extraState,"tariffFilter",t)},change:e.addTariff}})],1),r("div",{staticClass:"extra__options"},[r("p",[e._v(e._s(e.$translate("orderForm.content.extra.extraOpts")))]),r("checkbox-group",{attrs:{"checkbox-filter-data":e.extraOptionsData,"checkbox-model-data":e.extraState.extraOptions},on:{"update:checkboxModelData":function(t){return e.$set(e.extraState,"extraOptions",t)},"update:checkbox-model-data":function(t){return e.$set(e.extraState,"extraOptions",t)},change:e.addExtraOptions}})],1)]),r("order-aside",{attrs:{"order-items":e.orderItems,"is-disabled":e.isDisabledButton,price:e.priceRange,loading:e.extraState.isLoading},on:{next:e.updateCurrentOrder}})],1)},n=[],o=r("a6f4"),i=r("9a74"),c=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-checkbox-group",{on:{change:e.updateFilters},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}},[e._l(e.checkboxFilterData,(function(t,a){return[t.name?r("el-checkbox",{key:a,attrs:{label:t.name},on:{change:function(r){return e.changeValue(t,a)}}},[e._v(" "+e._s(e.$translate("checkboxGroup."+t.name))+" ")]):r("el-checkbox",{key:a,attrs:{label:t},on:{change:function(r){return e.changeValue(t,a)}}},[e._v(" "+e._s(e.$translate("checkboxGroup."+t))+" ")])]}))],2)},s=[],l={name:"CheckboxGroup",props:{checkboxFilterData:{type:Array,required:!0},checkboxModelData:{type:Array,required:!0}},setup:function(e){var t=Object(o["g"])(e),r=t.checkboxModelData,a=Object(o["f"])([]);return Object(o["h"])(r,(function(e){return a.value=e})),{model:a}},methods:{changeValue:function(e,t){this.$emit("change",{item:e,index:t})},updateFilters:function(e){this.$emit("update:checkboxModelData",e)}}},u=l,d=(r("07d7"),r("2877")),f=Object(d["a"])(u,c,s,!1,null,"4f41eaa1",null),p=f.exports,h=r("1782"),m=r("9923"),x=r("365c");function b(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function v(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?b(Object(r),!0).forEach((function(t){g(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):b(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function g(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function y(e){return D(e)||S(e)||_(e)||O()}function O(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _(e,t){if(e){if("string"===typeof e)return w(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?w(e,t):void 0}}function S(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function D(e){if(Array.isArray(e))return w(e)}function w(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,a=new Array(t);r<t;r++)a[r]=e[r];return a}function k(e,t,r,a,n,o,i){try{var c=e[o](i),s=c.value}catch(l){return void r(l)}c.done?t(s):Promise.resolve(s).then(a,n)}function F(e){return function(){var t=this,r=arguments;return new Promise((function(a,n){var o=e.apply(t,r);function i(e){k(o,a,n,i,c,"next",e)}function c(e){k(o,a,n,i,c,"throw",e)}i(void 0)}))}}var j={name:"Extra",components:{RadioGroup:i["a"],CheckboxGroup:p,OrderAside:h["a"]},setup:function(e,t){var r=t.root,a=Object(m["b"])(),n=a.translate,i=Object(o["e"])({colorFilter:"",colorModel:[],tariffFilter:"",tariffModel:[],extraOptions:[],extraOptionsData:[],from:new Date,to:new Date,priceMin:"",priceMax:"",extraPrice:0,pickerOptionsFrom:{disabledDate:function(e){return e>new Date}},pickerOptionsTo:{disabledDate:function(e){return e<new Date}},isLoading:!0}),c=Object(o["a"])((function(){return{to:i.to,from:i.from}})),s=Object(o["f"])({city:"",model:"",color:"",rent:c,tariff:"",child:"",rightDrive:"",full:""}),l=[{name:"На сутки, 1999 ₽/сутки",value:"day"},{name:"Поминутно, 7₽/мин",value:"minute"}],u=[{name:"full",value:500},{name:"child",value:200},{name:"rightDrive",value:1600}],d=r.$route.query.id,f=Object(o["f"])({}),p=Object(o["f"])(0);function h(e){var t=[];return e.forEach((function(e){e.isFullTank?t.push("full"):e.isNeedChildChair?t.push("child"):e.isRightWheel&&t.push("rightDrive")})),t}function b(){return g.apply(this,arguments)}function g(){return g=F(regeneratorRuntime.mark((function e(){var t,r,a,n,o,c,l,u,m,b,v,g,O,_,S;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(x["f"])(d);case 2:a=e.sent,n=a.data,o=n.data,c=o.cityId,l=o.pointId,u=o.carId,m=o.dateFrom,b=o.dateTo,v=o.color,g=o.isFullTank,O=o.isNeedChildChair,_=o.isRightWheel,S=o.rateId,f.value=n.data,i.priceMin=u.priceMin,i.priceMax=u.priceMax,i.to=b||new Date,i.from=m||new Date,i.colorFilter=v||"Любой",i.tariffFilter=(null===S||void 0===S?void 0:S.id)||"",(t=i.extraOptions).push.apply(t,y(h([{isFullTank:g},{isNeedChildChair:O},{isRightWheel:_}]))),s.value.city="".concat(c.name,", ").concat(l.address),s.value.model=u.name,s.value.color=v||"Любой",s.value.tariff=(null===S||void 0===S?void 0:S.rateTypeId.name)||"",u.colors.length?(r=i.colorModel).push.apply(r,y(u.colors)):i.colorModel.push("Любой"),p.value=u.priceMin;case 19:case"end":return e.stop()}}),e)}))),g.apply(this,arguments)}function O(){return _.apply(this,arguments)}function _(){return _=F(regeneratorRuntime.mark((function e(){var t,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(x["h"])();case 2:t=e.sent,r=t.data,i.tariffModel=r.data.map((function(e){var t=e.rateTypeId,r=t.id,a=t.unit,n=t.name;return v(v({},e),{},{rateTypeId:r,name:n,unit:a})}));case 5:case"end":return e.stop()}}),e)}))),_.apply(this,arguments)}return Object(o["d"])((function(){return Promise.all([O(),b()]).then((function(){return i.isLoading=!1}))})),{extraState:i,tariffModel:l,extraOptionsData:u,translate:n,orderItems:s,priceRange:p,currentOrder:f,orderId:d}},computed:{isRentAccepted:function(){var e=new Date(this.extraState.to).getDate(),t=new Date(this.extraState.to).getMonth(),r=new Date(this.extraState.to).getHours(),a=new Date(this.extraState.to).getMinutes(),n=new Date(this.extraState.from).getDate(),o=new Date(this.extraState.from).getMonth(),i=new Date(this.extraState.from).getHours(),c=new Date(this.extraState.from).getMinutes();return e===n&&t===o&&r===i&&a===c},isDisabledButton:function(){return Boolean(!this.orderItems.color||this.isRentAccepted||!this.orderItems.tariff)||!1}},methods:{selectColor:function(e){this.orderItems.color=e},addExtraOptions:function(e){var t=e.item;this.orderItems[t.name]?(this.orderItems[t.name]="",this.getPriceWithExtraOptions(-t.value)):(this.orderItems[t.name]="Да",this.getPriceWithExtraOptions(t.value))},getPriceWithExtraOptions:function(e){this.extraState.extraPrice+=e,this.priceRange+=e},addTariff:function(e){this.orderItems.tariff=e.name,this.priceRange=this.getPriceByTariff(e,this.extraState.priceMin)+this.extraState.extraPrice},getPriceByTariff:function(e,t){var r=new Date(this.extraState.to)-new Date(this.extraState.from);if("сутки"===e.unit){var a=r?Math.floor(7*(+r/1e3/60/60-24)*60):0;return t+e.price+a}return"мин"===e.unit?Math.floor(+r/1e3/60/60)*e.price*60+t:"7 дней"===e.unit?t+e.price:void 0},updateCurrentOrder:function(){var e=this,t=this.currentOrder,r=t.orderStatusId,a=t.cityId,n=t.pointId,o=t.id,i=t.createdAt,c=t.carId,s={orderStatusId:r,cityId:a,pointId:n,id:o,carId:c,createdAt:i,color:this.extraState.colorFilter,dateFrom:+this.extraState.from,dateTo:+this.extraState.to,rateId:this.extraState.tariffModel.filter((function(t){return t.id===e.extraState.tariffFilter}))[0],price:this.priceRange,isFullTank:this.extraState.extraOptions.includes("full"),isNeedChildChair:this.extraState.extraOptions.includes("child"),isRightWheel:this.extraState.extraOptions.includes("rightDrive")};Object(x["i"])(this.orderId,s),this.$router.push({name:"Amount",query:{id:o}})}}},M=j,C=(r("5107"),Object(d["a"])(M,a,n,!1,null,"7e1ed0b4",null));t["default"]=C.exports}}]);
//# sourceMappingURL=Extra.ad8a40b7.js.map