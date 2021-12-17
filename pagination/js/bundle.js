/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/comment.js":
/*!*******************************!*\
  !*** ./js/modules/comment.js ***!
  \*******************************/
/***/ ((module) => {

function comment() {

    let btn = document.querySelector('.comment-btn'),
        list = document.querySelector('.comment_list'),
        box = document.querySelector('.comments_box');

    function addCard(name, text){
        let card = document.createElement('div');
        card.classList.add('card')
        card.innerHTML = `
        <p>${name}</p>
        <p>${text}</p>
    `
        box.append(card);
    }


    function showFirstPage(num = 1){
        fetch('https://jordan.ashton.fashion/api/goods/30/comments?page=' + num)
            .then(data => data.json())
            .then(res => {
                res.data.forEach(item => {
                    addCard(item.name, item.text);
                });
                addPag(num);
            })
    }
    showFirstPage();

    function showPage(num = 1){
        fetch('https://jordan.ashton.fashion/api/goods/30/comments?page=' + num)
            .then(data => data.json())
            .then(res => {
                box.innerHTML = '';
                res.data.forEach(item => {
                    addCard(item.name, item.text);
                });
            })
    }

    function removeClass(){
        document.querySelectorAll('.pagination_num').forEach(item=>{
            item.classList.remove('active')
        })
    }

    function addPag(num){
        removeClass();
        let pag = document.createElement('div');
        pag.classList.add('pagination_num', 'active')
        pag.innerHTML = num;

        list.append(pag);
    }

    // list.addEventListener('click', (e) => {
    //     console.log(e)
    //     if(!e.target.classList.contains('active')){
    //         removeClass()
    //         e.target.classList.add('active');
    //     }else{
    //         removeClass()
    //         e.target.classList.add('active');
    //     }
    //     showPage(e.target.innerHTML);
    // })
    list.addEventListener('click', (e) => {
        if(e.target.classList.contains('pagination_num')){
            document.querySelectorAll('.pagination_num').forEach(item => {
                item.classList.remove('active')
            })
            e.target.classList.add('active');
            console.log('Target:' + e.target);
        }
        
        showPage(e.target.innerHTML);
    
    })

    let counter = 2;
    btn.addEventListener('click', async ()=>{
        await fetch('https://jordan.ashton.fashion/api/goods/30/comments?page=' + counter)
            .then(data => data.json())
            .then(res => {
                box.innerHTML = ''
                res.data.forEach(item => {
                    addCard(item.name, item.text);
                })
                if(res.last_page == counter){
                    btn.style.display = 'none'
                }
            }).catch(()=>{
                console.log('ERROR')
            }).finally(()=> {
                addPag(counter);
                counter++;
            })
    })

}

module.exports = comment;

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((module) => {

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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener('DOMContentLoaded', function() {
    const comment = __webpack_require__(/*! ./modules/comment */ "./js/modules/comment.js"),
        form = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");

    comment();
    form();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map