let hotel = document.querySelector('#hID');
let suites = document.querySelector('#sID');
let price = document.querySelector('#price');
let startDate = document.querySelector('#startDate');
let endDate = document.querySelector('#endDate');
let nPrice = document.querySelector('#nPrice');
let endListener = document.querySelectorAll('.endListener');
let iBtn = document.querySelector('#iBtn');
let okBtn = document.querySelector('#okBtn');
let sDate;
let eDate;
okBtn.disabled = true;
iBtn.style.display = 'none';
suites.style.display = 'none';

let localUrl = window.location.href;
let prefillFields = localUrl.includes("/neww");

if (!prefillFields) {
    axiosSuitesRequest();
} else {
   //get ids by url
    let hid = localUrl.substr(localUrl.indexOf('/new') + 12, 3)
    let suiteId = localUrl.substr(localUrl.length - 3, 3);
    let indexOfId = hid.indexOf('/');
    if (indexOfId !== (-1)) {
        hid = hid.replace('/', '')
    }
    let indexOfSId = suiteId.indexOf('/');
    if (indexOfId !== (-1)) {
        suiteId = suiteId.replace('/', '');
    }
    let url = "/reservation/getsuite/" + hid;
    axios.get(url).then(function (response) {
        const suiteList = response.data.suites;
        suites.style.display = 'inline-block';
        suites.innerHTML = '';
        let sOpt = document.createElement('option');
        sOpt.innerHTML = 'Suite'
        suites.appendChild(sOpt);

        suiteList.forEach(e => {
            let opt = document.createElement('option');
            opt.className = e.price;
            opt.value = e.id;
            opt.id = e.id;
            opt.innerHTML = e.name;
//select suite by id
            if(e.id == suiteId){
                opt.defaultSelected = true;

            }

            suites.appendChild(opt);
        })
    })
    //select hotel by id
    for(let i = 0 ; i<hotel.options.length; i++ ){
        if(hotel[i].value == hid){
            hotel[i].defaultSelected=true;
        }
    }
    axiosSuitesRequest();
}

endListener.forEach(item => {
    item.addEventListener('change', function (event) {
        sDate = new Date(startDate.value);
        eDate = new Date(endDate.value);
        const diffTime = Math.abs(eDate - sDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        let priceOf = parseInt(suites.children[suites.selectedIndex].className)
        if (!isNaN(diffDays) && (sDate <= eDate)) {

            let sId = suites.children[suites.selectedIndex].id;
            let url = '/reservation/getdispo/' + sId;
            axios.post(url, {
                'startDate': sDate,
                'endDate': eDate,
                'suiteId': sId
            }).then(function (response) {
                let data = response.data;
                let isAvailable = data.isAvailable;
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
            }).catch(function (err) {
                console.log(err);
            })

            price.textContent = priceOf * diffDays + '$ ';

        } else {
            price.textContent = 'Vous devez remplir correctement les dates '
        }
        nPrice.textContent = priceOf + '$';
    })


})

function axiosSuitesRequest() {
    hotel.addEventListener('change', function (event) {
        event.preventDefault();
        if (typeof hid == 'undefined') {
            let hid = 0;
        }
        hid = hotel.value;
        let url = "/reservation/getsuite/" + hid;
        axios.get(url).then(function (response) {
            const suiteList = response.data.suites;
            suites.style.display = 'inline-block';
            suites.innerHTML = '';
            let sOpt = document.createElement('option');
            sOpt.innerHTML = 'Suite';
            suites.appendChild(sOpt);
            suiteList.forEach(e => {

                let opt = document.createElement('option');
                opt.className = e.price;
                opt.value = e.id;
                opt.id = e.id;
                opt.innerHTML = e.name;
                suites.appendChild(opt);
            })

        })
    });

}