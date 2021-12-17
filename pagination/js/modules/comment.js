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