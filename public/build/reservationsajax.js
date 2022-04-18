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
      opt.innerHTML = e.name; //select suite by id

      if (e.id == suiteId) {
        opt.defaultSelected = true;
      }

      suites.appendChild(opt);
    });
  }); //select hotel by id

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LElBQWYsQ0FBb0IsVUFBVUMsUUFBVixFQUFvQjtBQUNwQyxVQUFNQyxTQUFTLEdBQUdELFFBQVEsQ0FBQ0UsSUFBVCxDQUFjbkMsTUFBaEM7QUFDQUEsTUFBQUEsTUFBTSxDQUFDWSxLQUFQLENBQWFDLE9BQWIsR0FBdUIsY0FBdkI7QUFDQWIsTUFBQUEsTUFBTSxDQUFDb0MsU0FBUCxHQUFtQixFQUFuQjtBQUNBLFVBQUlDLElBQUksR0FBR3ZDLFFBQVEsQ0FBQ3dDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBWDtBQUNBRCxNQUFBQSxJQUFJLENBQUNELFNBQUwsR0FBaUIsT0FBakI7QUFDQXBDLE1BQUFBLE1BQU0sQ0FBQ3VDLFdBQVAsQ0FBbUJGLElBQW5CO0FBQ0FILE1BQUFBLFNBQVMsQ0FBQ00sT0FBVixDQUFrQixVQUFBQyxDQUFDLEVBQUk7QUFFbkIsWUFBSUMsR0FBRyxHQUFHNUMsUUFBUSxDQUFDd0MsYUFBVCxDQUF1QixRQUF2QixDQUFWO0FBQ0FJLFFBQUFBLEdBQUcsQ0FBQ0MsU0FBSixHQUFnQkYsQ0FBQyxDQUFDeEMsS0FBbEI7QUFDQXlDLFFBQUFBLEdBQUcsQ0FBQ0UsS0FBSixHQUFZSCxDQUFDLENBQUNJLEVBQWQ7QUFDQUgsUUFBQUEsR0FBRyxDQUFDRyxFQUFKLEdBQVNKLENBQUMsQ0FBQ0ksRUFBWDtBQUNBSCxRQUFBQSxHQUFHLENBQUNOLFNBQUosR0FBZ0JLLENBQUMsQ0FBQ0ssSUFBbEI7QUFDQTlDLFFBQUFBLE1BQU0sQ0FBQ3VDLFdBQVAsQ0FBbUJHLEdBQW5CO0FBQ0gsT0FSRDtBQVVILEtBakJEO0FBa0JILEdBekJEO0FBMkJIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3Jlc2VydmF0aW9uc2FqYXguanMiXSwic291cmNlc0NvbnRlbnQiOlsibGV0IGhvdGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hJRCcpO1xyXG5sZXQgc3VpdGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NJRCcpO1xyXG5sZXQgcHJpY2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJpY2UnKTtcclxubGV0IHN0YXJ0RGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdGFydERhdGUnKTtcclxubGV0IGVuZERhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW5kRGF0ZScpO1xyXG5sZXQgblByaWNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25QcmljZScpO1xyXG5sZXQgZW5kTGlzdGVuZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZW5kTGlzdGVuZXInKTtcclxubGV0IGlCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaUJ0bicpO1xyXG5sZXQgb2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb2tCdG4nKTtcclxubGV0IHNEYXRlO1xyXG5sZXQgZURhdGU7XHJcbm9rQnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuaUJ0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5zdWl0ZXMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHJcbmxldCBsb2NhbFVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xyXG5sZXQgcHJlZmlsbEZpZWxkcyA9IGxvY2FsVXJsLmluY2x1ZGVzKFwiL25ld3dcIik7XHJcblxyXG5pZiAoIXByZWZpbGxGaWVsZHMpIHtcclxuICAgIGF4aW9zU3VpdGVzUmVxdWVzdCgpO1xyXG59IGVsc2Uge1xyXG4gICAvL2dldCBpZHMgYnkgdXJsXHJcbiAgICBsZXQgaGlkID0gbG9jYWxVcmwuc3Vic3RyKGxvY2FsVXJsLmluZGV4T2YoJy9uZXcnKSArIDEyLCAzKVxyXG4gICAgbGV0IHN1aXRlSWQgPSBsb2NhbFVybC5zdWJzdHIobG9jYWxVcmwubGVuZ3RoIC0gMywgMyk7XHJcbiAgICBsZXQgaW5kZXhPZklkID0gaGlkLmluZGV4T2YoJy8nKTtcclxuICAgIGlmIChpbmRleE9mSWQgIT09ICgtMSkpIHtcclxuICAgICAgICBoaWQgPSBoaWQucmVwbGFjZSgnLycsICcnKVxyXG4gICAgfVxyXG4gICAgbGV0IGluZGV4T2ZTSWQgPSBzdWl0ZUlkLmluZGV4T2YoJy8nKTtcclxuICAgIGlmIChpbmRleE9mSWQgIT09ICgtMSkpIHtcclxuICAgICAgICBzdWl0ZUlkID0gc3VpdGVJZC5yZXBsYWNlKCcvJywgJycpO1xyXG4gICAgfVxyXG4gICAgbGV0IHVybCA9IFwiL3Jlc2VydmF0aW9uL2dldHN1aXRlL1wiICsgaGlkO1xyXG4gICAgYXhpb3MuZ2V0KHVybCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICBjb25zdCBzdWl0ZUxpc3QgPSByZXNwb25zZS5kYXRhLnN1aXRlcztcclxuICAgICAgICBzdWl0ZXMuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xyXG4gICAgICAgIHN1aXRlcy5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICBsZXQgc09wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xyXG4gICAgICAgIHNPcHQuaW5uZXJIVE1MID0gJ1N1aXRlJ1xyXG4gICAgICAgIHN1aXRlcy5hcHBlbmRDaGlsZChzT3B0KTtcclxuXHJcbiAgICAgICAgc3VpdGVMaXN0LmZvckVhY2goZSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcclxuICAgICAgICAgICAgb3B0LmNsYXNzTmFtZSA9IGUucHJpY2U7XHJcbiAgICAgICAgICAgIG9wdC52YWx1ZSA9IGUuaWQ7XHJcbiAgICAgICAgICAgIG9wdC5pZCA9IGUuaWQ7XHJcbiAgICAgICAgICAgIG9wdC5pbm5lckhUTUwgPSBlLm5hbWU7XHJcbi8vc2VsZWN0IHN1aXRlIGJ5IGlkXHJcbiAgICAgICAgICAgIGlmKGUuaWQgPT0gc3VpdGVJZCl7XHJcbiAgICAgICAgICAgICAgICBvcHQuZGVmYXVsdFNlbGVjdGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHN1aXRlcy5hcHBlbmRDaGlsZChvcHQpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG4gICAgLy9zZWxlY3QgaG90ZWwgYnkgaWRcclxuICAgIGZvcihsZXQgaSA9IDAgOyBpPGhvdGVsLm9wdGlvbnMubGVuZ3RoOyBpKysgKXtcclxuICAgICAgICBpZihob3RlbFtpXS52YWx1ZSA9PSBoaWQpe1xyXG4gICAgICAgICAgICBob3RlbFtpXS5kZWZhdWx0U2VsZWN0ZWQ9dHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBheGlvc1N1aXRlc1JlcXVlc3QoKTtcclxufVxyXG5cclxuZW5kTGlzdGVuZXIuZm9yRWFjaChpdGVtID0+IHtcclxuICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgc0RhdGUgPSBuZXcgRGF0ZShzdGFydERhdGUudmFsdWUpO1xyXG4gICAgICAgIGVEYXRlID0gbmV3IERhdGUoZW5kRGF0ZS52YWx1ZSk7XHJcbiAgICAgICAgY29uc3QgZGlmZlRpbWUgPSBNYXRoLmFicyhlRGF0ZSAtIHNEYXRlKTtcclxuICAgICAgICBjb25zdCBkaWZmRGF5cyA9IE1hdGguY2VpbChkaWZmVGltZSAvICgxMDAwICogNjAgKiA2MCAqIDI0KSk7XHJcbiAgICAgICAgbGV0IHByaWNlT2YgPSBwYXJzZUludChzdWl0ZXMuY2hpbGRyZW5bc3VpdGVzLnNlbGVjdGVkSW5kZXhdLmNsYXNzTmFtZSlcclxuICAgICAgICBpZiAoIWlzTmFOKGRpZmZEYXlzKSAmJiAoc0RhdGUgPD0gZURhdGUpKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgc0lkID0gc3VpdGVzLmNoaWxkcmVuW3N1aXRlcy5zZWxlY3RlZEluZGV4XS5pZDtcclxuICAgICAgICAgICAgbGV0IHVybCA9ICcvcmVzZXJ2YXRpb24vZ2V0ZGlzcG8vJyArIHNJZDtcclxuICAgICAgICAgICAgYXhpb3MucG9zdCh1cmwsIHtcclxuICAgICAgICAgICAgICAgICdzdGFydERhdGUnOiBzRGF0ZSxcclxuICAgICAgICAgICAgICAgICdlbmREYXRlJzogZURhdGUsXHJcbiAgICAgICAgICAgICAgICAnc3VpdGVJZCc6IHNJZFxyXG4gICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgbGV0IGlzQXZhaWxhYmxlID0gZGF0YS5pc0F2YWlsYWJsZTtcclxuICAgICAgICAgICAgICAgIGlmICghaXNBdmFpbGFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBva0J0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgb2tCdG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgICAgICBpQnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpQnRuLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2tCdG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBva0J0bi5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XHJcbiAgICAgICAgICAgICAgICAgICAgaUJ0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgcHJpY2UudGV4dENvbnRlbnQgPSBwcmljZU9mICogZGlmZkRheXMgKyAnJCAnO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwcmljZS50ZXh0Q29udGVudCA9ICdWb3VzIGRldmV6IHJlbXBsaXIgY29ycmVjdGVtZW50IGxlcyBkYXRlcyAnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5QcmljZS50ZXh0Q29udGVudCA9IHByaWNlT2YgKyAnJCc7XHJcbiAgICB9KVxyXG5cclxuXHJcbn0pXHJcblxyXG5mdW5jdGlvbiBheGlvc1N1aXRlc1JlcXVlc3QoKSB7XHJcbiAgICBob3RlbC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgaGlkID09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGxldCBoaWQgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBoaWQgPSBob3RlbC52YWx1ZTtcclxuICAgICAgICBsZXQgdXJsID0gXCIvcmVzZXJ2YXRpb24vZ2V0c3VpdGUvXCIgKyBoaWQ7XHJcbiAgICAgICAgYXhpb3MuZ2V0KHVybCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3VpdGVMaXN0ID0gcmVzcG9uc2UuZGF0YS5zdWl0ZXM7XHJcbiAgICAgICAgICAgIHN1aXRlcy5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XHJcbiAgICAgICAgICAgIHN1aXRlcy5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgbGV0IHNPcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcclxuICAgICAgICAgICAgc09wdC5pbm5lckhUTUwgPSAnU3VpdGUnO1xyXG4gICAgICAgICAgICBzdWl0ZXMuYXBwZW5kQ2hpbGQoc09wdCk7XHJcbiAgICAgICAgICAgIHN1aXRlTGlzdC5mb3JFYWNoKGUgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcclxuICAgICAgICAgICAgICAgIG9wdC5jbGFzc05hbWUgPSBlLnByaWNlO1xyXG4gICAgICAgICAgICAgICAgb3B0LnZhbHVlID0gZS5pZDtcclxuICAgICAgICAgICAgICAgIG9wdC5pZCA9IGUuaWQ7XHJcbiAgICAgICAgICAgICAgICBvcHQuaW5uZXJIVE1MID0gZS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgc3VpdGVzLmFwcGVuZENoaWxkKG9wdCk7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH0pXHJcbiAgICB9KTtcclxuXHJcbn0iXSwibmFtZXMiOlsiaG90ZWwiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJzdWl0ZXMiLCJwcmljZSIsInN0YXJ0RGF0ZSIsImVuZERhdGUiLCJuUHJpY2UiLCJlbmRMaXN0ZW5lciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpQnRuIiwib2tCdG4iLCJzRGF0ZSIsImVEYXRlIiwiZGlzYWJsZWQiLCJzdHlsZSIsImRpc3BsYXkiLCJsb2NhbFVybCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsInByZWZpbGxGaWVsZHMiLCJpbmNsdWRlcyIsImF4aW9zU3VpdGVzUmVxdWVzdCIsImhpZCIsInN1YnN0ciIsImluZGV4T2YiLCJzdWl0ZUlkIiwibGVuZ3RoIiwiaW5kZXhPZklkIiwicmVwbGFjZSIsImluZGV4T2ZTSWQiLCJ1cmwiLCJheGlvcyIsImdldCIsInRoZW4iLCJyZXNwb25zZSIsInN1aXRlTGlzdCIsImRhdGEiLCJpbm5lckhUTUwiLCJzT3B0IiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiZm9yRWFjaCIsImUiLCJvcHQiLCJjbGFzc05hbWUiLCJ2YWx1ZSIsImlkIiwibmFtZSIsImRlZmF1bHRTZWxlY3RlZCIsImkiLCJvcHRpb25zIiwiaXRlbSIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsIkRhdGUiLCJkaWZmVGltZSIsIk1hdGgiLCJhYnMiLCJkaWZmRGF5cyIsImNlaWwiLCJwcmljZU9mIiwicGFyc2VJbnQiLCJjaGlsZHJlbiIsInNlbGVjdGVkSW5kZXgiLCJpc05hTiIsInNJZCIsInBvc3QiLCJpc0F2YWlsYWJsZSIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJ0ZXh0Q29udGVudCIsInByZXZlbnREZWZhdWx0Il0sInNvdXJjZVJvb3QiOiIifQ==