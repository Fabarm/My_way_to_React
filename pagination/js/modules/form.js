function form(){
    const postData = async (url, name, text) => {
        let res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name, text: text })
        });

        return await res.json();
    };

    let message = document.createElement('div');
    message.innerHTML = 'Все поля должны быть заполнены!';

    const form = document.querySelector('.form');

    bindPostData(form);
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = document.querySelector('.form-input'),
                textarea = document.querySelector('.form-textarea');

            if(!input.value || !textarea.value) {
                textarea.after(message);
            }else {
                postData('https://jordan.ashton.fashion/api/goods/30/comments', input.value, textarea.value)
                    .then(() => console.log('Ok'))
                    .catch(() => console.log('Error'))
                    .finally(() => {
                        form.reset();
                        message.remove();
                    });
            }

        });
    }
}

module.exports = form;