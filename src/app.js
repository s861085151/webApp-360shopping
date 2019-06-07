


const ajaxRender = require('./models/ajax')
const indexTpl = require('./views/index.html')
const indexMoreTpl = require('./views/index-moreList.html')
const renderList = async() => {
    //首页模板
    const indexData = await ajaxRender.get('/indexApi/indexList')
    const renderedIndexTpl = template.render(indexTpl, {indexData})
    $('#page').html(renderedIndexTpl);
    
    
    //banner轮播图
    let bannerTap = new Swiper('.swiper-container', {
        autoplay: true,//可选选项，自动滑动
        loop: true,
        pagination: {
            el: '.swiper-pagination'
        }
    })
    
    //商城快报轮播
    //better-scroll 实例化
    new BScroll('main')

    //首页-更多商品模板
    const moreList = await ajaxRender.get('/moreApi/search/latest?q=*&size=20&page=0')
    const renderedIndexMoreTpl = template.render(indexMoreTpl, {moreList})
    $('#page main .content').append(renderedIndexMoreTpl);



}
renderList()