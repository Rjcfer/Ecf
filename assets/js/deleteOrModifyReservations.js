let canIChange = document.querySelectorAll('.canIChange');

window.onload = () => {
    let rid = document.querySelectorAll('.rId')
    rid.forEach(item => {
        let hostname = window.location.hostname
        let protocol = window.location.protocol

        console.log(protocol)
        let id = item.textContent;
        // dont forget to add local url if dont works
       // let urltorequest = protocol + '//' + hostname + ":8000/reservation/candelete/" + id;
        let urltorequest = protocol + '//' + hostname + "/reservation/candelete/" + id;
        axios.get(urltorequest).then(function (response) {
            const data = response.data;
            console.log(data);

        })
    })
}
canIChange.forEach(item => {
    item.addEventListener('click', function (event) {


    })
})