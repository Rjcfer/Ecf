(self["webpackChunk"] = self["webpackChunk"] || []).push([["reservationsajax"],{

/***/ "./assets/js/reservationsajax.js":
/*!***************************************!*\
  !*** ./assets/js/reservationsajax.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! core-js/modules/es.array.includes.js */ "./node_modules/core-js/modules/es.array.includes.js");

__webpack_require__(/*! core-js/modules/es.string.includes.js */ "./node_modules/core-js/modules/es.string.includes.js");

__webpack_require__(/*! core-js/modules/es.array.index-of.js */ "./node_modules/core-js/modules/es.array.index-of.js");

__webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");

__webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");

__webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");

__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");

__webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");

__webpack_require__(/*! core-js/modules/es.date.to-string.js */ "./node_modules/core-js/modules/es.date.to-string.js");

__webpack_require__(/*! core-js/modules/es.parse-int.js */ "./node_modules/core-js/modules/es.parse-int.js");

var hotel = document.querySelector('#hID');
var suites = document.querySelector('#sID');
var price = document.querySelector('#price');
var startDate = document.querySelector('#startDate');
var endDate = document.querySelector('#endDate');
var nPrice = document.querySelector('#nPrice');
var endListener = document.querySelectorAll('.endListener');
var iBtn = document.querySelector('#iBtn');
var okBtn = document.querySelector('#okBtn');
var sDate;
var eDate;
okBtn.disabled = true;
iBtn.style.display = 'none';
suites.style.display = 'none';
var localUrl = window.location.href;
var prefillFields = localUrl.includes("/neww");

if (!prefillFields) {
  axiosSuitesRequest();
} else {
  //get ids by url
  var _hid = localUrl.substr(localUrl.indexOf('/new') + 12, 3);

  var suiteId = localUrl.substr(localUrl.length - 3, 3);

  var indexOfId = _hid.indexOf('/');

  if (indexOfId !== -1) {
    _hid = _hid.replace('/', '');
  }

  var indexOfSId = suiteId.indexOf('/');

  if (indexOfId !== -1) {
    suiteId = suiteId.replace('/', '');
  }

  var url = "/reservation/getsuite/" + _hid;
  axios.get(url).then(function (response) {
    var suiteList = response.data.suites;
    suites.style.display = 'inline-block';
    suites.innerHTML = '';
    var sOpt = document.createElement('option');
    sOpt.innerHTML = 'Suite';
    suites.appendChild(sOpt);
    suiteList.forEach(function (e) {
      var opt = document.createElement('option');
      opt.className = e.price;
      opt.value = e.id;
      opt.id = e.id;
      opt.innerHTML = e.name;

      if (e.id == suiteId) {
        opt.defaultSelected = true;
      }

      suites.appendChild(opt);
    });
  });

  for (var i = 0; i < hotel.options.length; i++) {
    if (hotel[i].value == _hid) {
      hotel[i].defaultSelected = true;
    }
  }

  axiosSuitesRequest();
}

endListener.forEach(function (item) {
  item.addEventListener('change', function (event) {
    sDate = new Date(startDate.value);
    eDate = new Date(endDate.value);
    var diffTime = Math.abs(eDate - sDate);
    var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    var priceOf = parseInt(suites.children[suites.selectedIndex].className);

    if (!isNaN(diffDays) && sDate <= eDate) {
      var sId = suites.children[suites.selectedIndex].id;

      var _url = '/reservation/getdispo/' + sId;

      axios.post(_url, {
        'startDate': sDate,
        'endDate': eDate,
        'suiteId': sId
      }).then(function (response) {
        var data = response.data;
        var isAvailable = data.isAvailable;

        if (!isAvailable) {
          okBtn.disabled = true;
          okBtn.style.display = 'none';
          iBtn.disabled = true;
          iBtn.style.display = 'inline-block';
        } else {
          okBtn.disabled = false;
          okBtn.style.display = 'inline-block';
          iBtn.style.display = 'none';
        }
      })["catch"](function (err) {
        console.log(err);
      });
      price.textContent = priceOf * diffDays + '$ ';
    } else {
      price.textContent = 'Vous devez remplir correctement les dates ';
    }

    nPrice.textContent = priceOf + '$';
  });
});

function axiosSuitesRequest() {
  hotel.addEventListener('change', function (event) {
    event.preventDefault();

    if (typeof hid == 'undefined') {
      var _hid2 = 0;
    }

    hid = hotel.value;
    var url = "/reservation/getsuite/" + hid;
    axios.get(url).then(function (response) {
      var suiteList = response.data.suites;
      suites.style.display = 'inline-block';
      suites.innerHTML = '';
      var sOpt = document.createElement('option');
      sOpt.innerHTML = 'Suite';
      suites.appendChild(sOpt);
      suiteList.forEach(function (e) {
        var opt = document.createElement('option');
        opt.className = e.price;
        opt.value = e.id;
        opt.id = e.id;
        opt.innerHTML = e.name;
        suites.appendChild(opt);
      });
    });
  });
}

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_internals_array-iteration_js-node_modules_core-js_internals_dom--711a0d","vendors-node_modules_core-js_modules_es_array_for-each_js-node_modules_core-js_modules_es_arr-f2c345"], () => (__webpack_exec__("./assets/js/reservationsajax.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQW9CO0FBQ3BDLFVBQU1DLFNBQVMsR0FBR0QsUUFBUSxDQUFDRSxJQUFULENBQWNuQyxNQUFoQztBQUNBQSxNQUFBQSxNQUFNLENBQUNZLEtBQVAsQ0FBYUMsT0FBYixHQUF1QixjQUF2QjtBQUNBYixNQUFBQSxNQUFNLENBQUNvQyxTQUFQLEdBQW1CLEVBQW5CO0FBQ0EsVUFBSUMsSUFBSSxHQUFHdkMsUUFBUSxDQUFDd0MsYUFBVCxDQUF1QixRQUF2QixDQUFYO0FBQ0FELE1BQUFBLElBQUksQ0FBQ0QsU0FBTCxHQUFpQixPQUFqQjtBQUNBcEMsTUFBQUEsTUFBTSxDQUFDdUMsV0FBUCxDQUFtQkYsSUFBbkI7QUFDQUgsTUFBQUEsU0FBUyxDQUFDTSxPQUFWLENBQWtCLFVBQUFDLENBQUMsRUFBSTtBQUVuQixZQUFJQyxHQUFHLEdBQUc1QyxRQUFRLENBQUN3QyxhQUFULENBQXVCLFFBQXZCLENBQVY7QUFDQUksUUFBQUEsR0FBRyxDQUFDQyxTQUFKLEdBQWdCRixDQUFDLENBQUN4QyxLQUFsQjtBQUNBeUMsUUFBQUEsR0FBRyxDQUFDRSxLQUFKLEdBQVlILENBQUMsQ0FBQ0ksRUFBZDtBQUNBSCxRQUFBQSxHQUFHLENBQUNHLEVBQUosR0FBU0osQ0FBQyxDQUFDSSxFQUFYO0FBQ0FILFFBQUFBLEdBQUcsQ0FBQ04sU0FBSixHQUFnQkssQ0FBQyxDQUFDSyxJQUFsQjtBQUNBOUMsUUFBQUEsTUFBTSxDQUFDdUMsV0FBUCxDQUFtQkcsR0FBbkI7QUFDSCxPQVJEO0FBVUgsS0FqQkQ7QUFrQkgsR0F6QkQ7QUEyQkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvcmVzZXJ2YXRpb25zYWpheC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgaG90ZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaElEJyk7XHJcbmxldCBzdWl0ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc0lEJyk7XHJcbmxldCBwcmljZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmljZScpO1xyXG5sZXQgc3RhcnREYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0YXJ0RGF0ZScpO1xyXG5sZXQgZW5kRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbmREYXRlJyk7XHJcbmxldCBuUHJpY2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjblByaWNlJyk7XHJcbmxldCBlbmRMaXN0ZW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5lbmRMaXN0ZW5lcicpO1xyXG5sZXQgaUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpQnRuJyk7XHJcbmxldCBva0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNva0J0bicpO1xyXG5sZXQgc0RhdGU7XHJcbmxldCBlRGF0ZTtcclxub2tCdG4uZGlzYWJsZWQgPSB0cnVlO1xyXG5pQnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbnN1aXRlcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cclxubGV0IGxvY2FsVXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcbmxldCBwcmVmaWxsRmllbGRzID0gbG9jYWxVcmwuaW5jbHVkZXMoXCIvbmV3d1wiKTtcclxuXHJcbmlmICghcHJlZmlsbEZpZWxkcykge1xyXG4gICAgYXhpb3NTdWl0ZXNSZXF1ZXN0KCk7XHJcbn0gZWxzZSB7XHJcbiAgIC8vZ2V0IGlkcyBieSB1cmxcclxuICAgIGxldCBoaWQgPSBsb2NhbFVybC5zdWJzdHIobG9jYWxVcmwuaW5kZXhPZignL25ldycpICsgMTIsIDMpXHJcbiAgICBsZXQgc3VpdGVJZCA9IGxvY2FsVXJsLnN1YnN0cihsb2NhbFVybC5sZW5ndGggLSAzLCAzKTtcclxuICAgIGxldCBpbmRleE9mSWQgPSBoaWQuaW5kZXhPZignLycpO1xyXG4gICAgaWYgKGluZGV4T2ZJZCAhPT0gKC0xKSkge1xyXG4gICAgICAgIGhpZCA9IGhpZC5yZXBsYWNlKCcvJywgJycpXHJcbiAgICB9XHJcbiAgICBsZXQgaW5kZXhPZlNJZCA9IHN1aXRlSWQuaW5kZXhPZignLycpO1xyXG4gICAgaWYgKGluZGV4T2ZJZCAhPT0gKC0xKSkge1xyXG4gICAgICAgIHN1aXRlSWQgPSBzdWl0ZUlkLnJlcGxhY2UoJy8nLCAnJyk7XHJcbiAgICB9XHJcbiAgICBsZXQgdXJsID0gXCIvcmVzZXJ2YXRpb24vZ2V0c3VpdGUvXCIgKyBoaWQ7XHJcbiAgICBheGlvcy5nZXQodXJsKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgIGNvbnN0IHN1aXRlTGlzdCA9IHJlc3BvbnNlLmRhdGEuc3VpdGVzO1xyXG4gICAgICAgIHN1aXRlcy5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XHJcbiAgICAgICAgc3VpdGVzLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIGxldCBzT3B0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XHJcbiAgICAgICAgc09wdC5pbm5lckhUTUwgPSAnU3VpdGUnXHJcbiAgICAgICAgc3VpdGVzLmFwcGVuZENoaWxkKHNPcHQpO1xyXG4gICAgICAgIHN1aXRlTGlzdC5mb3JFYWNoKGUgPT4ge1xyXG4gICAgICAgICAgICBsZXQgb3B0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XHJcbiAgICAgICAgICAgIG9wdC5jbGFzc05hbWUgPSBlLnByaWNlO1xyXG4gICAgICAgICAgICBvcHQudmFsdWUgPSBlLmlkO1xyXG4gICAgICAgICAgICBvcHQuaWQgPSBlLmlkO1xyXG4gICAgICAgICAgICBvcHQuaW5uZXJIVE1MID0gZS5uYW1lO1xyXG4gICAgICAgICAgICBpZihlLmlkID09IHN1aXRlSWQpe1xyXG4gICAgICAgICAgICAgICAgb3B0LmRlZmF1bHRTZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3VpdGVzLmFwcGVuZENoaWxkKG9wdCk7XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbiAgICBmb3IobGV0IGkgPSAwIDsgaTxob3RlbC5vcHRpb25zLmxlbmd0aDsgaSsrICl7XHJcbiAgICAgICAgaWYoaG90ZWxbaV0udmFsdWUgPT0gaGlkKXtcclxuICAgICAgICAgICAgaG90ZWxbaV0uZGVmYXVsdFNlbGVjdGVkPXRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYXhpb3NTdWl0ZXNSZXF1ZXN0KCk7XHJcbn1cclxuXHJcbmVuZExpc3RlbmVyLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHNEYXRlID0gbmV3IERhdGUoc3RhcnREYXRlLnZhbHVlKTtcclxuICAgICAgICBlRGF0ZSA9IG5ldyBEYXRlKGVuZERhdGUudmFsdWUpO1xyXG4gICAgICAgIGNvbnN0IGRpZmZUaW1lID0gTWF0aC5hYnMoZURhdGUgLSBzRGF0ZSk7XHJcbiAgICAgICAgY29uc3QgZGlmZkRheXMgPSBNYXRoLmNlaWwoZGlmZlRpbWUgLyAoMTAwMCAqIDYwICogNjAgKiAyNCkpO1xyXG4gICAgICAgIGxldCBwcmljZU9mID0gcGFyc2VJbnQoc3VpdGVzLmNoaWxkcmVuW3N1aXRlcy5zZWxlY3RlZEluZGV4XS5jbGFzc05hbWUpXHJcbiAgICAgICAgaWYgKCFpc05hTihkaWZmRGF5cykgJiYgKHNEYXRlIDw9IGVEYXRlKSkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHNJZCA9IHN1aXRlcy5jaGlsZHJlbltzdWl0ZXMuc2VsZWN0ZWRJbmRleF0uaWQ7XHJcbiAgICAgICAgICAgIGxldCB1cmwgPSAnL3Jlc2VydmF0aW9uL2dldGRpc3BvLycgKyBzSWQ7XHJcbiAgICAgICAgICAgIGF4aW9zLnBvc3QodXJsLCB7XHJcbiAgICAgICAgICAgICAgICAnc3RhcnREYXRlJzogc0RhdGUsXHJcbiAgICAgICAgICAgICAgICAnZW5kRGF0ZSc6IGVEYXRlLFxyXG4gICAgICAgICAgICAgICAgJ3N1aXRlSWQnOiBzSWRcclxuICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICAgICAgICAgIGxldCBpc0F2YWlsYWJsZSA9IGRhdGEuaXNBdmFpbGFibGU7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzQXZhaWxhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2tCdG4uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIG9rQnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgaUJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaUJ0bi5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG9rQnRuLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgb2tCdG4uc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xyXG4gICAgICAgICAgICAgICAgICAgIGlCdG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHByaWNlLnRleHRDb250ZW50ID0gcHJpY2VPZiAqIGRpZmZEYXlzICsgJyQgJztcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcHJpY2UudGV4dENvbnRlbnQgPSAnVm91cyBkZXZleiByZW1wbGlyIGNvcnJlY3RlbWVudCBsZXMgZGF0ZXMgJ1xyXG4gICAgICAgIH1cclxuICAgICAgICBuUHJpY2UudGV4dENvbnRlbnQgPSBwcmljZU9mICsgJyQnO1xyXG4gICAgfSlcclxuXHJcblxyXG59KVxyXG5cclxuZnVuY3Rpb24gYXhpb3NTdWl0ZXNSZXF1ZXN0KCkge1xyXG4gICAgaG90ZWwuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBpZiAodHlwZW9mIGhpZCA9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBsZXQgaGlkID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaGlkID0gaG90ZWwudmFsdWU7XHJcbiAgICAgICAgbGV0IHVybCA9IFwiL3Jlc2VydmF0aW9uL2dldHN1aXRlL1wiICsgaGlkO1xyXG4gICAgICAgIGF4aW9zLmdldCh1cmwpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1aXRlTGlzdCA9IHJlc3BvbnNlLmRhdGEuc3VpdGVzO1xyXG4gICAgICAgICAgICBzdWl0ZXMuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xyXG4gICAgICAgICAgICBzdWl0ZXMuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgICAgIGxldCBzT3B0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XHJcbiAgICAgICAgICAgIHNPcHQuaW5uZXJIVE1MID0gJ1N1aXRlJztcclxuICAgICAgICAgICAgc3VpdGVzLmFwcGVuZENoaWxkKHNPcHQpO1xyXG4gICAgICAgICAgICBzdWl0ZUxpc3QuZm9yRWFjaChlID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgb3B0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XHJcbiAgICAgICAgICAgICAgICBvcHQuY2xhc3NOYW1lID0gZS5wcmljZTtcclxuICAgICAgICAgICAgICAgIG9wdC52YWx1ZSA9IGUuaWQ7XHJcbiAgICAgICAgICAgICAgICBvcHQuaWQgPSBlLmlkO1xyXG4gICAgICAgICAgICAgICAgb3B0LmlubmVySFRNTCA9IGUubmFtZTtcclxuICAgICAgICAgICAgICAgIHN1aXRlcy5hcHBlbmRDaGlsZChvcHQpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcblxyXG59Il0sIm5hbWVzIjpbImhvdGVsIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwic3VpdGVzIiwicHJpY2UiLCJzdGFydERhdGUiLCJlbmREYXRlIiwiblByaWNlIiwiZW5kTGlzdGVuZXIiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaUJ0biIsIm9rQnRuIiwic0RhdGUiLCJlRGF0ZSIsImRpc2FibGVkIiwic3R5bGUiLCJkaXNwbGF5IiwibG9jYWxVcmwiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJwcmVmaWxsRmllbGRzIiwiaW5jbHVkZXMiLCJheGlvc1N1aXRlc1JlcXVlc3QiLCJoaWQiLCJzdWJzdHIiLCJpbmRleE9mIiwic3VpdGVJZCIsImxlbmd0aCIsImluZGV4T2ZJZCIsInJlcGxhY2UiLCJpbmRleE9mU0lkIiwidXJsIiwiYXhpb3MiLCJnZXQiLCJ0aGVuIiwicmVzcG9uc2UiLCJzdWl0ZUxpc3QiLCJkYXRhIiwiaW5uZXJIVE1MIiwic09wdCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImZvckVhY2giLCJlIiwib3B0IiwiY2xhc3NOYW1lIiwidmFsdWUiLCJpZCIsIm5hbWUiLCJkZWZhdWx0U2VsZWN0ZWQiLCJpIiwib3B0aW9ucyIsIml0ZW0iLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJEYXRlIiwiZGlmZlRpbWUiLCJNYXRoIiwiYWJzIiwiZGlmZkRheXMiLCJjZWlsIiwicHJpY2VPZiIsInBhcnNlSW50IiwiY2hpbGRyZW4iLCJzZWxlY3RlZEluZGV4IiwiaXNOYU4iLCJzSWQiLCJwb3N0IiwiaXNBdmFpbGFibGUiLCJlcnIiLCJjb25zb2xlIiwibG9nIiwidGV4dENvbnRlbnQiLCJwcmV2ZW50RGVmYXVsdCJdLCJzb3VyY2VSb290IjoiIn0=