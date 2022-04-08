(self["webpackChunk"] = self["webpackChunk"] || []).push([["deleteOrModifyReservations"],{

/***/ "./assets/js/deleteOrModifyReservations.js":
/*!*************************************************!*\
  !*** ./assets/js/deleteOrModifyReservations.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");

__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");

var canIChange = document.querySelectorAll('.canIChange');
var sorry = document.querySelector('.sorry');
sorry.style.display = 'none';
canIChange.forEach(function (item) {
  item.disabled = true;
});
var rid = document.querySelectorAll('.rId');
rid.forEach(function (item) {
  var hostname = window.location.hostname;
  var protocol = window.location.protocol;
  var id = item.textContent; // dont forget to add local url if dont works
  //local exemple
  //  let urltorequest = protocol + '//' + hostname + ":8000/reservation/candelete/" + id;
  // online , we dont have the port online

  var urltorequest = protocol + '//' + hostname + "/reservation/candelete/" + id;
  axios.get(urltorequest).then(function (response) {
    var canDelete = response.data.canDelete;

    if (canDelete) {
      canIChange.forEach(function (item) {
        item.disabled = false;
      });
    } else {
      sorry.style.display = 'inline-block';
    }
  });
});
canIChange.forEach(function (item) {
  item.addEventListener('click', function (event) {});
});

/***/ }),

/***/ "./node_modules/core-js/internals/array-for-each.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/array-for-each.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $forEach = (__webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js/internals/array-iteration.js").forEach);
var arrayMethodIsStrict = __webpack_require__(/*! ../internals/array-method-is-strict */ "./node_modules/core-js/internals/array-method-is-strict.js");

var STRICT_METHOD = arrayMethodIsStrict('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach
module.exports = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
} : [].forEach;


/***/ }),

/***/ "./node_modules/core-js/internals/array-method-is-strict.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/array-method-is-strict.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call -- required for testing
    method.call(null, argument || function () { return 1; }, 1);
  });
};


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.for-each.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.for-each.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var forEach = __webpack_require__(/*! ../internals/array-for-each */ "./node_modules/core-js/internals/array-for-each.js");

// `Array.prototype.forEach` method
// https://tc39.es/ecma262/#sec-array.prototype.foreach
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
$({ target: 'Array', proto: true, forced: [].forEach != forEach }, {
  forEach: forEach
});


/***/ }),

/***/ "./node_modules/core-js/modules/web.dom-collections.for-each.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/web.dom-collections.for-each.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var DOMIterables = __webpack_require__(/*! ../internals/dom-iterables */ "./node_modules/core-js/internals/dom-iterables.js");
var DOMTokenListPrototype = __webpack_require__(/*! ../internals/dom-token-list-prototype */ "./node_modules/core-js/internals/dom-token-list-prototype.js");
var forEach = __webpack_require__(/*! ../internals/array-for-each */ "./node_modules/core-js/internals/array-for-each.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");

var handlePrototype = function (CollectionPrototype) {
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  if (DOMIterables[COLLECTION_NAME]) {
    handlePrototype(global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype);
  }
}

handlePrototype(DOMTokenListPrototype);


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_internals_array-iteration_js-node_modules_core-js_internals_dom--711a0d"], () => (__webpack_exec__("./assets/js/deleteOrModifyReservations.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlT3JNb2RpZnlSZXNlcnZhdGlvbnMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxVQUFVLEdBQUdDLFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsYUFBMUIsQ0FBakI7QUFDQSxJQUFJQyxLQUFLLEdBQUdGLFFBQVEsQ0FBQ0csYUFBVCxDQUF1QixRQUF2QixDQUFaO0FBQ0FELEtBQUssQ0FBQ0UsS0FBTixDQUFZQyxPQUFaLEdBQXNCLE1BQXRCO0FBQ0FOLFVBQVUsQ0FBQ08sT0FBWCxDQUFtQixVQUFBQyxJQUFJLEVBQUk7QUFDdkJBLEVBQUFBLElBQUksQ0FBQ0MsUUFBTCxHQUFnQixJQUFoQjtBQUNILENBRkQ7QUFHQSxJQUFJQyxHQUFHLEdBQUdULFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsTUFBMUIsQ0FBVjtBQUNBUSxHQUFHLENBQUNILE9BQUosQ0FBWSxVQUFBQyxJQUFJLEVBQUk7QUFFaEIsTUFBSUcsUUFBUSxHQUFHQyxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JGLFFBQS9CO0FBQ0EsTUFBSUcsUUFBUSxHQUFHRixNQUFNLENBQUNDLFFBQVAsQ0FBZ0JDLFFBQS9CO0FBQ0EsTUFBSUMsRUFBRSxHQUFHUCxJQUFJLENBQUNRLFdBQWQsQ0FKZ0IsQ0FLaEI7QUFFQTtBQUNBO0FBRUE7O0FBQ0EsTUFBSUMsWUFBWSxHQUFHSCxRQUFRLEdBQUcsSUFBWCxHQUFrQkgsUUFBbEIsR0FBNkIseUJBQTdCLEdBQXlESSxFQUE1RTtBQUVBRyxFQUFBQSxLQUFLLENBQUNDLEdBQU4sQ0FBVUYsWUFBVixFQUF3QkcsSUFBeEIsQ0FBNkIsVUFBVUMsUUFBVixFQUFvQjtBQUM3QyxRQUFNQyxTQUFTLEdBQUdELFFBQVEsQ0FBQ0UsSUFBVCxDQUFjRCxTQUFoQzs7QUFDQSxRQUFJQSxTQUFKLEVBQWU7QUFDWHRCLE1BQUFBLFVBQVUsQ0FBQ08sT0FBWCxDQUFtQixVQUFBQyxJQUFJLEVBQUk7QUFDdkJBLFFBQUFBLElBQUksQ0FBQ0MsUUFBTCxHQUFnQixLQUFoQjtBQUNILE9BRkQ7QUFHSCxLQUpELE1BSU87QUFDSE4sTUFBQUEsS0FBSyxDQUFDRSxLQUFOLENBQVlDLE9BQVosR0FBc0IsY0FBdEI7QUFDSDtBQUVKLEdBVkQ7QUFXSCxDQXhCRDtBQTBCQU4sVUFBVSxDQUFDTyxPQUFYLENBQW1CLFVBQUFDLElBQUksRUFBSTtBQUN2QkEsRUFBQUEsSUFBSSxDQUFDZ0IsZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0IsVUFBVUMsS0FBVixFQUFpQixDQUcvQyxDQUhEO0FBSUgsQ0FMRDs7Ozs7Ozs7Ozs7QUNqQ2E7QUFDYixlQUFlLHdIQUErQztBQUM5RCwwQkFBMEIsbUJBQU8sQ0FBQyx1R0FBcUM7O0FBRXZFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOzs7Ozs7Ozs7Ozs7QUNYVztBQUNiLFlBQVksbUJBQU8sQ0FBQyxxRUFBb0I7O0FBRXhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELFdBQVc7QUFDM0QsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7QUNUYTtBQUNiLFFBQVEsbUJBQU8sQ0FBQyx1RUFBcUI7QUFDckMsY0FBYyxtQkFBTyxDQUFDLHVGQUE2Qjs7QUFFbkQ7QUFDQTtBQUNBO0FBQ0EsSUFBSSw2REFBNkQ7QUFDakU7QUFDQSxDQUFDOzs7Ozs7Ozs7OztBQ1RELGFBQWEsbUJBQU8sQ0FBQyx1RUFBcUI7QUFDMUMsbUJBQW1CLG1CQUFPLENBQUMscUZBQTRCO0FBQ3ZELDRCQUE0QixtQkFBTyxDQUFDLDJHQUF1QztBQUMzRSxjQUFjLG1CQUFPLENBQUMsdUZBQTZCO0FBQ25ELGtDQUFrQyxtQkFBTyxDQUFDLHVIQUE2Qzs7QUFFdkY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvZGVsZXRlT3JNb2RpZnlSZXNlcnZhdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LWZvci1lYWNoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1tZXRob2QtaXMtc3RyaWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuZm9yLWVhY2guanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIuZG9tLWNvbGxlY3Rpb25zLmZvci1lYWNoLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImxldCBjYW5JQ2hhbmdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhbklDaGFuZ2UnKTtcclxubGV0IHNvcnJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNvcnJ5Jyk7XHJcbnNvcnJ5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbmNhbklDaGFuZ2UuZm9yRWFjaChpdGVtID0+IHtcclxuICAgIGl0ZW0uZGlzYWJsZWQgPSB0cnVlXHJcbn0pXHJcbmxldCByaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucklkJylcclxucmlkLmZvckVhY2goaXRlbSA9PiB7XHJcblxyXG4gICAgbGV0IGhvc3RuYW1lID0gd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lXHJcbiAgICBsZXQgcHJvdG9jb2wgPSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2xcclxuICAgIGxldCBpZCA9IGl0ZW0udGV4dENvbnRlbnQ7XHJcbiAgICAvLyBkb250IGZvcmdldCB0byBhZGQgbG9jYWwgdXJsIGlmIGRvbnQgd29ya3NcclxuXHJcbiAgICAvL2xvY2FsIGV4ZW1wbGVcclxuICAgIC8vICBsZXQgdXJsdG9yZXF1ZXN0ID0gcHJvdG9jb2wgKyAnLy8nICsgaG9zdG5hbWUgKyBcIjo4MDAwL3Jlc2VydmF0aW9uL2NhbmRlbGV0ZS9cIiArIGlkO1xyXG5cclxuICAgIC8vIG9ubGluZSAsIHdlIGRvbnQgaGF2ZSB0aGUgcG9ydCBvbmxpbmVcclxuICAgIGxldCB1cmx0b3JlcXVlc3QgPSBwcm90b2NvbCArICcvLycgKyBob3N0bmFtZSArIFwiL3Jlc2VydmF0aW9uL2NhbmRlbGV0ZS9cIiArIGlkO1xyXG5cclxuICAgIGF4aW9zLmdldCh1cmx0b3JlcXVlc3QpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgY29uc3QgY2FuRGVsZXRlID0gcmVzcG9uc2UuZGF0YS5jYW5EZWxldGU7XHJcbiAgICAgICAgaWYgKGNhbkRlbGV0ZSkge1xyXG4gICAgICAgICAgICBjYW5JQ2hhbmdlLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmRpc2FibGVkID0gZmFsc2VcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzb3JyeS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pXHJcbn0pXHJcblxyXG5jYW5JQ2hhbmdlLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG5cclxuICAgIH0pXHJcbn0pIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRmb3JFYWNoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbicpLmZvckVhY2g7XG52YXIgYXJyYXlNZXRob2RJc1N0cmljdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaXMtc3RyaWN0Jyk7XG5cbnZhciBTVFJJQ1RfTUVUSE9EID0gYXJyYXlNZXRob2RJc1N0cmljdCgnZm9yRWFjaCcpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmZvckVhY2hgIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZm9yZWFjaFxubW9kdWxlLmV4cG9ydHMgPSAhU1RSSUNUX01FVEhPRCA/IGZ1bmN0aW9uIGZvckVhY2goY2FsbGJhY2tmbiAvKiAsIHRoaXNBcmcgKi8pIHtcbiAgcmV0dXJuICRmb3JFYWNoKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1hcnJheS1wcm90b3R5cGUtZm9yZWFjaCAtLSBzYWZlXG59IDogW10uZm9yRWFjaDtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChNRVRIT0RfTkFNRSwgYXJndW1lbnQpIHtcbiAgdmFyIG1ldGhvZCA9IFtdW01FVEhPRF9OQU1FXTtcbiAgcmV0dXJuICEhbWV0aG9kICYmIGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlbGVzcy1jYWxsIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gICAgbWV0aG9kLmNhbGwobnVsbCwgYXJndW1lbnQgfHwgZnVuY3Rpb24gKCkgeyByZXR1cm4gMTsgfSwgMSk7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGZvckVhY2ggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktZm9yLWVhY2gnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5mb3JFYWNoYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZvcmVhY2hcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1hcnJheS1wcm90b3R5cGUtZm9yZWFjaCAtLSBzYWZlXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBbXS5mb3JFYWNoICE9IGZvckVhY2ggfSwge1xuICBmb3JFYWNoOiBmb3JFYWNoXG59KTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgRE9NSXRlcmFibGVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RvbS1pdGVyYWJsZXMnKTtcbnZhciBET01Ub2tlbkxpc3RQcm90b3R5cGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9tLXRva2VuLWxpc3QtcHJvdG90eXBlJyk7XG52YXIgZm9yRWFjaCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1mb3ItZWFjaCcpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcblxudmFyIGhhbmRsZVByb3RvdHlwZSA9IGZ1bmN0aW9uIChDb2xsZWN0aW9uUHJvdG90eXBlKSB7XG4gIC8vIHNvbWUgQ2hyb21lIHZlcnNpb25zIGhhdmUgbm9uLWNvbmZpZ3VyYWJsZSBtZXRob2RzIG9uIERPTVRva2VuTGlzdFxuICBpZiAoQ29sbGVjdGlvblByb3RvdHlwZSAmJiBDb2xsZWN0aW9uUHJvdG90eXBlLmZvckVhY2ggIT09IGZvckVhY2gpIHRyeSB7XG4gICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KENvbGxlY3Rpb25Qcm90b3R5cGUsICdmb3JFYWNoJywgZm9yRWFjaCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgQ29sbGVjdGlvblByb3RvdHlwZS5mb3JFYWNoID0gZm9yRWFjaDtcbiAgfVxufTtcblxuZm9yICh2YXIgQ09MTEVDVElPTl9OQU1FIGluIERPTUl0ZXJhYmxlcykge1xuICBpZiAoRE9NSXRlcmFibGVzW0NPTExFQ1RJT05fTkFNRV0pIHtcbiAgICBoYW5kbGVQcm90b3R5cGUoZ2xvYmFsW0NPTExFQ1RJT05fTkFNRV0gJiYgZ2xvYmFsW0NPTExFQ1RJT05fTkFNRV0ucHJvdG90eXBlKTtcbiAgfVxufVxuXG5oYW5kbGVQcm90b3R5cGUoRE9NVG9rZW5MaXN0UHJvdG90eXBlKTtcbiJdLCJuYW1lcyI6WyJjYW5JQ2hhbmdlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwic29ycnkiLCJxdWVyeVNlbGVjdG9yIiwic3R5bGUiLCJkaXNwbGF5IiwiZm9yRWFjaCIsIml0ZW0iLCJkaXNhYmxlZCIsInJpZCIsImhvc3RuYW1lIiwid2luZG93IiwibG9jYXRpb24iLCJwcm90b2NvbCIsImlkIiwidGV4dENvbnRlbnQiLCJ1cmx0b3JlcXVlc3QiLCJheGlvcyIsImdldCIsInRoZW4iLCJyZXNwb25zZSIsImNhbkRlbGV0ZSIsImRhdGEiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiXSwic291cmNlUm9vdCI6IiJ9