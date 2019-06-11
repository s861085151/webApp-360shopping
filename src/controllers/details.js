const ajaxRender = require('../models/ajax')
const qs = require('querystring')
const detailsTpl = require('../views/details.html')

const render = async() => {
    //获取地址栏上的地址
    let item_id = qs.parse(location.hash,'?','=')
    console.log(item_id)
    const detailsData = await ajaxRender.get(`/detailsApi/shop/itemApi?item_id=${item_id.id}`)
    console.log(detailsData)
    const renderDetailTpl = template.render(detailsTpl, {detailsData})
    $('#page .container').html(renderDetailTpl)
    let imgData = detailsData.data.main_item.content
    $('.infoImg').append(imgData)
    
    //商品banner轮播
    var mySwiper = new Swiper('.detail-banner', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
        }
    })

    //点击返回按钮返回上一页
    $('.back').on('click', function() {
        window.history.go(-1)
    })
}
export default {
  render
}