const searchTpl = require('../views/search.html')
const menuTpl = require('../views/menu.html')
const indexTpl = require('../views/index.html')

const router = {
    renderView() {
        let hash = location.hash || '#home'
        switch (hash) {
            case '#home':
                const indexData = ajaxRender.get('/indexApi/indexList')
                const renderedIndexTpl = template.render(indexTpl, {indexData})
                $('#page').html(indexTpl)
                break;
            case '#menu':
                $('#page header').remove()
                $('#page main').html(menuTpl)
                break;
            case '#shopCart':
                $('main').html('shopCart')
                break;
            case '#person':
                $('main').html('person')
                break;
            case '#search':
                $('#page .container').html(searchTpl)
                break;
        }
    },
    init() {
        window.addEventListener('load', this.renderView)
        window.addEventListener('hashchange', this.renderView)
    }
}

export {
    router
}