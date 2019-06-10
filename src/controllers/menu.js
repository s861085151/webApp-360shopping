const ajaxRender = require('../models/ajax')
const menuTpl = require('../views/menu.html')
const menuRIghtTpl = require('../views/menu-right.html')


const render = async() => {
    //分类模板
    const menuSideData = await ajaxRender.get('/menuSide/app/getAppCategory')
    const renderMenuSideTpl = template.render(menuTpl, {menuSideData})
    $('header').remove()
    $('main').html(renderMenuSideTpl)
    $('.sideItem').eq(0).addClass('active')
    const menuRightData = await ajaxRender.get(`/menuSide/app/getSecondaryCategory?_=12025&id=1`)
    const renderMenuRightTpl = template.render(menuRIghtTpl, {menuRightData})
    $('main .rightItem').html(renderMenuRightTpl)
    $('.sideItem').on('click', async function() {
      console.log($(this))
      $(this).addClass('active').siblings().removeClass('active')
      let dataId = $(this).attr('data-id')
      let ranNum = parseInt(Math.random()*10000+10000)
      const menuRightData = await ajaxRender.get(`/menuSide/app/getSecondaryCategory?_=${ranNum}&id=${dataId}`)
      const renderMenuRightTpl = template.render(menuRIghtTpl, {menuRightData})
      $('main .rightItem').html(renderMenuRightTpl)
    })

    
}
export default {
  render
}