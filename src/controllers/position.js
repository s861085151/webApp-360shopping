const ajaxRender = require('../models/ajax')
const indexTpl = require('../views/index.html')
const indexMoreTpl = require('../views/index-moreList.html')
const render = async() => {
    //首页模板
    const indexData = await ajaxRender.get('/indexApi/indexList')
    const renderIndexTpl = template.render(indexTpl, {indexData})
    $('#page').html(renderIndexTpl);
    
    //banner轮播图
    let bannerTap = new Swiper('.bannerTap', {
        autoplay: true,//可选选项，自动滑动
        loop: true,
        pagination: {
            el: '.swiper-pagination'
        }
    })
    
    //商城快报轮播
    let newsTap = new Swiper('.toutiao', {
        direction : 'vertical',
        autoplay: true,//可选选项，自动滑动
        loop: true,
    })

    //better-scroll 实例化
    let bScroll = new BScroll('main', {
        probeType: 1,
        click: true
    })
    //首页-更多商品模板
    let currentPage = 0
    bScroll.on('scroll', async function() {
        if(this.maxScrollY-this.y >= 0 && currentPage < 4) {
            $('.moreGoods').show();
            const moreList = await ajaxRender.get(`/moreApi/search/latest?q=*&size=20&page=${currentPage}`)
            const renderedIndexMoreTpl = template.render(indexMoreTpl, {moreList})
            $('#page main .content .moreGoods .goodList').append(renderedIndexMoreTpl);
            this.refresh()
            ++currentPage
            if(currentPage == 4) {
                $('.helpContents').show()
            }
        }
    })
    //悬浮小图标
    // const floatPicData = await ajaxRender.get('/floatPic/h5/getMallIcon')
    // const aaa = template.render(indexTpl, {floatPicData})
    // $('#page').append(renderedfloatPicDataTpl);

}

export default{
    render
}