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

__webpack_require__(/*! core-js/modules/es.parse-int.js */ "./node_modules/core-js/modules/es.parse-int.js");

__webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");

__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");

__webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");

__webpack_require__(/*! core-js/modules/es.date.to-string.js */ "./node_modules/core-js/modules/es.date.to-string.js");

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

  suiteId = parseInt(suiteId);
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
      opt.innerHTML = e.name; //select suite by id

      if (e.id === suiteId) {
        opt.defaultSelected = true;
      }

      suites.appendChild(opt);
    });
  }); //select hotel by id

  for (var i = 0; i < hotel.options.length; i++) {
    if (hotel[i].value === _hid) {
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

        if (!data.isAvailable) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TixDQUFVRixHQUFWLEVBQWVHLElBQWYsQ0FBb0IsVUFBVUMsUUFBVixFQUFvQjtBQUNwQyxVQUFNQyxTQUFTLEdBQUdELFFBQVEsQ0FBQ0UsSUFBVCxDQUFjcEMsTUFBaEM7QUFDQUEsTUFBQUEsTUFBTSxDQUFDWSxLQUFQLENBQWFDLE9BQWIsR0FBdUIsY0FBdkI7QUFDQWIsTUFBQUEsTUFBTSxDQUFDcUMsU0FBUCxHQUFtQixFQUFuQjtBQUNBLFVBQUlDLElBQUksR0FBR3hDLFFBQVEsQ0FBQ3lDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBWDtBQUNBRCxNQUFBQSxJQUFJLENBQUNELFNBQUwsR0FBaUIsT0FBakI7QUFDQXJDLE1BQUFBLE1BQU0sQ0FBQ3dDLFdBQVAsQ0FBbUJGLElBQW5CO0FBQ0FILE1BQUFBLFNBQVMsQ0FBQ00sT0FBVixDQUFrQixVQUFBQyxDQUFDLEVBQUk7QUFFbkIsWUFBSUMsR0FBRyxHQUFHN0MsUUFBUSxDQUFDeUMsYUFBVCxDQUF1QixRQUF2QixDQUFWO0FBQ0FJLFFBQUFBLEdBQUcsQ0FBQ0MsU0FBSixHQUFnQkYsQ0FBQyxDQUFDekMsS0FBbEI7QUFDQTBDLFFBQUFBLEdBQUcsQ0FBQ0UsS0FBSixHQUFZSCxDQUFDLENBQUNJLEVBQWQ7QUFDQUgsUUFBQUEsR0FBRyxDQUFDRyxFQUFKLEdBQVNKLENBQUMsQ0FBQ0ksRUFBWDtBQUNBSCxRQUFBQSxHQUFHLENBQUNOLFNBQUosR0FBZ0JLLENBQUMsQ0FBQ0ssSUFBbEI7QUFDQS9DLFFBQUFBLE1BQU0sQ0FBQ3dDLFdBQVAsQ0FBbUJHLEdBQW5CO0FBQ0gsT0FSRDtBQVVILEtBakJEO0FBa0JILEdBekJEO0FBMkJIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3Jlc2VydmF0aW9uc2FqYXguanMiXSwic291cmNlc0NvbnRlbnQiOlsibGV0IGhvdGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hJRCcpO1xyXG5sZXQgc3VpdGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NJRCcpO1xyXG5sZXQgcHJpY2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJpY2UnKTtcclxubGV0IHN0YXJ0RGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdGFydERhdGUnKTtcclxubGV0IGVuZERhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW5kRGF0ZScpO1xyXG5sZXQgblByaWNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25QcmljZScpO1xyXG5sZXQgZW5kTGlzdGVuZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZW5kTGlzdGVuZXInKTtcclxubGV0IGlCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaUJ0bicpO1xyXG5sZXQgb2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb2tCdG4nKTtcclxubGV0IHNEYXRlO1xyXG5sZXQgZURhdGU7XHJcbm9rQnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuaUJ0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5zdWl0ZXMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHJcbmxldCBsb2NhbFVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xyXG5sZXQgcHJlZmlsbEZpZWxkcyA9IGxvY2FsVXJsLmluY2x1ZGVzKFwiL25ld3dcIik7XHJcblxyXG5pZiAoIXByZWZpbGxGaWVsZHMpIHtcclxuICAgIGF4aW9zU3VpdGVzUmVxdWVzdCgpO1xyXG59IGVsc2Uge1xyXG4gICAvL2dldCBpZHMgYnkgdXJsXHJcbiAgICBsZXQgaGlkID0gbG9jYWxVcmwuc3Vic3RyKGxvY2FsVXJsLmluZGV4T2YoJy9uZXcnKSArIDEyLCAzKVxyXG4gICAgbGV0IHN1aXRlSWQgPSBsb2NhbFVybC5zdWJzdHIobG9jYWxVcmwubGVuZ3RoIC0gMywgMyk7XHJcbiAgICBsZXQgaW5kZXhPZklkID0gaGlkLmluZGV4T2YoJy8nKTtcclxuICAgIGlmIChpbmRleE9mSWQgIT09ICgtMSkpIHtcclxuICAgICAgICBoaWQgPSBoaWQucmVwbGFjZSgnLycsICcnKVxyXG4gICAgfVxyXG4gICAgbGV0IGluZGV4T2ZTSWQgPSBzdWl0ZUlkLmluZGV4T2YoJy8nKTtcclxuICAgIGlmIChpbmRleE9mSWQgIT09ICgtMSkpIHtcclxuICAgICAgICBzdWl0ZUlkID0gc3VpdGVJZC5yZXBsYWNlKCcvJywgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIHN1aXRlSWQ9cGFyc2VJbnQoc3VpdGVJZCk7XHJcbiAgICBsZXQgdXJsID0gXCIvcmVzZXJ2YXRpb24vZ2V0c3VpdGUvXCIgKyBoaWQ7XHJcbiAgICBheGlvcy5nZXQodXJsKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgIGNvbnN0IHN1aXRlTGlzdCA9IHJlc3BvbnNlLmRhdGEuc3VpdGVzO1xyXG4gICAgICAgIHN1aXRlcy5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XHJcbiAgICAgICAgc3VpdGVzLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIGxldCBzT3B0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XHJcbiAgICAgICAgc09wdC5pbm5lckhUTUwgPSAnU3VpdGUnXHJcbiAgICAgICAgc3VpdGVzLmFwcGVuZENoaWxkKHNPcHQpO1xyXG5cclxuICAgICAgICBzdWl0ZUxpc3QuZm9yRWFjaChlID0+IHtcclxuICAgICAgICAgICAgbGV0IG9wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xyXG4gICAgICAgICAgICBvcHQuY2xhc3NOYW1lID0gZS5wcmljZTtcclxuICAgICAgICAgICAgb3B0LnZhbHVlID0gZS5pZDtcclxuICAgICAgICAgICAgb3B0LmlkID0gZS5pZDtcclxuICAgICAgICAgICAgb3B0LmlubmVySFRNTCA9IGUubmFtZTtcclxuLy9zZWxlY3Qgc3VpdGUgYnkgaWRcclxuICAgICAgICAgICAgaWYoZS5pZCA9PT0gc3VpdGVJZCl7XHJcbiAgICAgICAgICAgICAgICBvcHQuZGVmYXVsdFNlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc3VpdGVzLmFwcGVuZENoaWxkKG9wdCk7XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbiAgICAvL3NlbGVjdCBob3RlbCBieSBpZFxyXG5cclxuICAgIGZvcihsZXQgaSA9IDAgOyBpPGhvdGVsLm9wdGlvbnMubGVuZ3RoOyBpKysgKXtcclxuICAgICAgICBpZihob3RlbFtpXS52YWx1ZSA9PT0gaGlkKXtcclxuICAgICAgICAgICAgaG90ZWxbaV0uZGVmYXVsdFNlbGVjdGVkPXRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYXhpb3NTdWl0ZXNSZXF1ZXN0KCk7XHJcbn1cclxuXHJcbmVuZExpc3RlbmVyLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHNEYXRlID0gbmV3IERhdGUoc3RhcnREYXRlLnZhbHVlKTtcclxuICAgICAgICBlRGF0ZSA9IG5ldyBEYXRlKGVuZERhdGUudmFsdWUpO1xyXG4gICAgICAgIGNvbnN0IGRpZmZUaW1lID0gTWF0aC5hYnMoZURhdGUgLSBzRGF0ZSk7XHJcbiAgICAgICAgY29uc3QgZGlmZkRheXMgPSBNYXRoLmNlaWwoZGlmZlRpbWUgLyAoMTAwMCAqIDYwICogNjAgKiAyNCkpO1xyXG4gICAgICAgIGxldCBwcmljZU9mID0gcGFyc2VJbnQoc3VpdGVzLmNoaWxkcmVuW3N1aXRlcy5zZWxlY3RlZEluZGV4XS5jbGFzc05hbWUpXHJcbiAgICAgICAgaWYgKCFpc05hTihkaWZmRGF5cykgJiYgKHNEYXRlIDw9IGVEYXRlKSkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHNJZCA9IHN1aXRlcy5jaGlsZHJlbltzdWl0ZXMuc2VsZWN0ZWRJbmRleF0uaWQ7XHJcbiAgICAgICAgICAgIGxldCB1cmwgPSAnL3Jlc2VydmF0aW9uL2dldGRpc3BvLycgKyBzSWQ7XHJcbiAgICAgICAgICAgIGF4aW9zLnBvc3QodXJsLCB7XHJcbiAgICAgICAgICAgICAgICAnc3RhcnREYXRlJzogc0RhdGUsXHJcbiAgICAgICAgICAgICAgICAnZW5kRGF0ZSc6IGVEYXRlLFxyXG4gICAgICAgICAgICAgICAgJ3N1aXRlSWQnOiBzSWRcclxuICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICAgICAgICAgIGlmICghZGF0YS5pc0F2YWlsYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9rQnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBva0J0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgICAgIGlCdG4uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlCdG4uc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBva0J0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIG9rQnRuLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcclxuICAgICAgICAgICAgICAgICAgICBpQnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBwcmljZS50ZXh0Q29udGVudCA9IHByaWNlT2YgKiBkaWZmRGF5cyArICckICc7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHByaWNlLnRleHRDb250ZW50ID0gJ1ZvdXMgZGV2ZXogcmVtcGxpciBjb3JyZWN0ZW1lbnQgbGVzIGRhdGVzICdcclxuICAgICAgICB9XHJcbiAgICAgICAgblByaWNlLnRleHRDb250ZW50ID0gcHJpY2VPZiArICckJztcclxuICAgIH0pXHJcblxyXG5cclxufSlcclxuXHJcbmZ1bmN0aW9uIGF4aW9zU3VpdGVzUmVxdWVzdCgpIHtcclxuICAgIGhvdGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBoaWQgPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgbGV0IGhpZCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGhpZCA9IGhvdGVsLnZhbHVlO1xyXG4gICAgICAgIGxldCB1cmwgPSBcIi9yZXNlcnZhdGlvbi9nZXRzdWl0ZS9cIiArIGhpZDtcclxuICAgICAgICBheGlvcy5nZXQodXJsKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICBjb25zdCBzdWl0ZUxpc3QgPSByZXNwb25zZS5kYXRhLnN1aXRlcztcclxuICAgICAgICAgICAgc3VpdGVzLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcclxuICAgICAgICAgICAgc3VpdGVzLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICBsZXQgc09wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xyXG4gICAgICAgICAgICBzT3B0LmlubmVySFRNTCA9ICdTdWl0ZSc7XHJcbiAgICAgICAgICAgIHN1aXRlcy5hcHBlbmRDaGlsZChzT3B0KTtcclxuICAgICAgICAgICAgc3VpdGVMaXN0LmZvckVhY2goZSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG9wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xyXG4gICAgICAgICAgICAgICAgb3B0LmNsYXNzTmFtZSA9IGUucHJpY2U7XHJcbiAgICAgICAgICAgICAgICBvcHQudmFsdWUgPSBlLmlkO1xyXG4gICAgICAgICAgICAgICAgb3B0LmlkID0gZS5pZDtcclxuICAgICAgICAgICAgICAgIG9wdC5pbm5lckhUTUwgPSBlLm5hbWU7XHJcbiAgICAgICAgICAgICAgICBzdWl0ZXMuYXBwZW5kQ2hpbGQob3B0KTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG5cclxufSJdLCJuYW1lcyI6WyJob3RlbCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInN1aXRlcyIsInByaWNlIiwic3RhcnREYXRlIiwiZW5kRGF0ZSIsIm5QcmljZSIsImVuZExpc3RlbmVyIiwicXVlcnlTZWxlY3RvckFsbCIsImlCdG4iLCJva0J0biIsInNEYXRlIiwiZURhdGUiLCJkaXNhYmxlZCIsInN0eWxlIiwiZGlzcGxheSIsImxvY2FsVXJsIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwicHJlZmlsbEZpZWxkcyIsImluY2x1ZGVzIiwiYXhpb3NTdWl0ZXNSZXF1ZXN0IiwiaGlkIiwic3Vic3RyIiwiaW5kZXhPZiIsInN1aXRlSWQiLCJsZW5ndGgiLCJpbmRleE9mSWQiLCJyZXBsYWNlIiwiaW5kZXhPZlNJZCIsInBhcnNlSW50IiwidXJsIiwiYXhpb3MiLCJnZXQiLCJ0aGVuIiwicmVzcG9uc2UiLCJzdWl0ZUxpc3QiLCJkYXRhIiwiaW5uZXJIVE1MIiwic09wdCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImZvckVhY2giLCJlIiwib3B0IiwiY2xhc3NOYW1lIiwidmFsdWUiLCJpZCIsIm5hbWUiLCJkZWZhdWx0U2VsZWN0ZWQiLCJpIiwib3B0aW9ucyIsIml0ZW0iLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJEYXRlIiwiZGlmZlRpbWUiLCJNYXRoIiwiYWJzIiwiZGlmZkRheXMiLCJjZWlsIiwicHJpY2VPZiIsImNoaWxkcmVuIiwic2VsZWN0ZWRJbmRleCIsImlzTmFOIiwic0lkIiwicG9zdCIsImlzQXZhaWxhYmxlIiwiZXJyIiwiY29uc29sZSIsImxvZyIsInRleHRDb250ZW50IiwicHJldmVudERlZmF1bHQiXSwic291cmNlUm9vdCI6IiJ9