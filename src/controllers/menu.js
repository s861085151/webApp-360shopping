const ajaxRender = require('../models/ajax')
const menuTpl = require('../views/menu.html')
const menuRIghtTpl = require('../views/menu-right.html')
const qs = require('querystring')

const render = async () => {
  //分类模板
  const menuSideData = await ajaxRender.get('/menuSide/app/getAppCategory')
  const renderMenuSideTpl = template.render(menuTpl, {
    menuSideData
  })
  $('header').remove()
  $('main').html(renderMenuSideTpl)
  //页面刷新，默认样式
  $('.sideItem').eq(0).addClass('active')
  const menuRightData = await ajaxRender.get(`/menuSide/app/getSecondaryCategory?_=12025&id=1`)
  const renderMenuRightTpl = template.render(menuRIghtTpl, {
    menuRightData
  })
  $('main .rightItem').html(renderMenuRightTpl)
  $('.rightItem .topImg').append(`<img src=${menuRightData.data.spread[0].pic} alt="">`)
  //点击侧边栏，显示对应的内容
  $('.sideItem').on('click', async function () {
    //点击侧边导航，高亮
    $(this).addClass('active').siblings().removeClass('active')
    //右边数据渲染
    let dataId = $(this).attr('data-id')
    let ranNum = parseInt(Math.random() * 10000 + 10000)
    const menuRightData = await ajaxRender.get(`/menuSide/app/getSecondaryCategory?_=${ranNum}&id=${dataId}`)
    const renderMenuRightTpl = template.render(menuRIghtTpl, {
      menuRightData
    })
    $('main .rightItem').html(renderMenuRightTpl)
    //如果数据中没有banner图
    if (menuRightData.data.spread.length >= 1) {
      $('.rightItem .topImg').append(`<img src=${menuRightData.data.spread[0].pic} alt="">`)
    } else {
      $('.rightItem .topImg').css('height', 0)
    }
  })

  //点击跳转详情页
  $('.detailsGo').on('click', function () {
    let url = $(this).attr('href')
    let urlID = qs.parse(url, '?', "=")
    $(this).attr('href', `#/details?id=${urlID.item_id}`)
  })
}
export default {
  render
}