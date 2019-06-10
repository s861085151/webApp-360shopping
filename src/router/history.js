const searchTpl = require('../views/search.html')

const router = {
    renderView() {
        let state = history.state || '/home'
        switch(state.path) {
            case '/home':
                $('main').html('home')
                break;
            case '/menu': 
                $('main').html('menu')
                break;
            case '/shopCart': 
                $('main').html('shopCart')
                break;
            case '/person': 
                $('main').html('person')
                break;
            case '/search':
                console.log($('#page .container'))
                $('#page .container').html(searchTpl)
                break;
        }
    },
    init() {
        let that = this
        $('footer a').on('click', function(e) {
            e.preventDefault()
            let path = $(this).attr('href')
            history.pushState({path}, null, path)
            that.renderView()
        })
        $('header .search').on('click', function(e) {
            e.preventDefault()
            let path = $(this).attr('href')
            history.pushState({path}, null, path)
            that.renderView()
        })
        window.addEventListener('popstate', this.renderView)
        window.addEventListener('load', this.renderView)
    }
}

export {
    router
}