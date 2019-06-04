module.exports = {
    list() {
        $.ajax({
            url: "/json/result",
            type: 'post',
            data: {
                "id": "590867822",
                "positionName": "高级销售（贵阳）2",
                "city": "杭州2",
                "createTime": "今天 15:09",
                "salary": "115k-125k",
                "companyId": "3205702",
                "companyLogo": "i/image2/M01/AF/2A/CgoB5lv3unmANwz0AAAG-i-dV_I198.png22",
                "companyName": "校宝在线222",
                "companyFullName": "校宝在线（杭州）科技股份有限公司222"
            },
            success(data) {
                console.log(data)
            }
        })
    }
}