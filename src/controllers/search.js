const searchTpl = require('../views/search.html')
const ajaxRender = require('../models/ajax')

const render = async () => {
  //分类模板
  const searchData = await ajaxRender.get('/searchApi/search/q?searchautofocus=1&q=&_=1560241378097')
  console.log(searchData)
  const renderSearchTpl = template.render(searchTpl, {
    searchData
  })
  $('#page .container').html(renderSearchTpl)

  // let bScroll = new BScroll('.scroll', {
  //   probeType: 1,
  //   click: true
  // })

  if ($('.mainList').height()) {

  }

  //点击返回上一页
  $('.back').on('click', function () {
    window.history.go(-1)
  })
}

export default {
  render
}