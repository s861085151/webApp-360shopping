


const ajaxRender = require('./models/ajax')
const indexTpl = require('./views/index.html')
const renderList = async() => {
    const indexData = await ajaxRender.get('/api/h5/index?_=1559658153442')
    console.log(indexData.data.loop.data[0].pic)
    const renderedInderTpl = template.render(indexTpl, {indexData})
    $('#page').html(renderedInderTpl);


    //banner轮播图
    let bannerTap = new Swiper('.swiper-container', {
        autoplay: true,//可选选项，自动滑动
        loop: true,
        pagination: {
        el: '.swiper-pagination'
        }
    })
}
renderList()