module.exports = {
    get(url) {
        return $.ajax({
            url,
            type: 'get',
            dataType: 'json',
            success(result) {
                return result;
            }
        });
    }
}