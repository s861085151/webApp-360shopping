module.exports = {
    list() {
        $.ajax({
            url: "/api/h5/index?_=1559560458264",
            success(data) {
                console.log(data)
            }
        })
    }
}