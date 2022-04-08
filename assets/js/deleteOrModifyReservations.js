let canIChange = document.querySelectorAll('.canIChange');
let sorry = document.querySelector('.sorry');
sorry.style.display = 'none';
canIChange.forEach(item => {
    item.disabled = true
})
let rid = document.querySelectorAll('.rId')
rid.forEach(item => {

    let hostname = window.location.hostname
    let protocol = window.location.protocol
    let id = item.textContent;
    // dont forget to add local url if dont works

    //local exemple
    //  let urltorequest = protocol + '//' + hostname + ":8000/reservation/candelete/" + id;

    // online , we dont have the port online
    let urltorequest = protocol + '//' + hostname + "/reservation/candelete/" + id;

    console.log(urltorequest);

    axios.get(urltorequest).then(function (response) {
        const canDelete = response.data.canDelete;
        console.log(response.data);
        console.log(canIChange);
        if (canDelete) {
            canIChange.forEach(item => {
                item.disabled = false
            })
        } else {
            sorry.style.display = 'inline-block';
        }

    })
})

canIChange.forEach(item => {
    item.addEventListener('click', function (event) {


    })
})