function contactForm(message, statusMsg, contactForm, contactInput) {

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        sendData(contactForm, contactInput)
                .then(() => {
                    statusMsg.innerHTML = message.loading;
                })
                .then(() => {
                    statusMsg.innerHTML = message.success;
                })
                .catch(() => {
                    statusMsg.innerHTML = message.fail;
                });
    });

    function sendData(form, input) {

        return new Promise((resolve, reject) => {
            form.appendChild(statusMsg);

            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

            let formData = new FormData(form);
            let obj = {};

            formData.forEach((value, key) => {
                obj[key] = value;
            });

            let json = JSON.stringify(obj);
            request.send(json);

            request.addEventListener('readystatechange', () => {
                if (request.readyState < 4) {
                    resolve();
                } else if (request.readyState === 4 && request.status == 200) {
                    resolve();
                } else {
                    reject();
                }
            });

            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
        });
    }
}

module.exports = contactForm;