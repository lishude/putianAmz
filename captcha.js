var rest 	 = require('restler'),
    fs   	 = require('fs'),
    filename = 'captcha.png';
async function getCaptcha() {
    let size = fs.statSync(filename).size
    rest.post('http://api.ruokuai.com/create.json', {
        multipart: true,
        data: {
            'username': 'lishude2018',
            'password': 'lsd8632901',
            'typeid':'3060',
            'softid': '1',
            'softkey': 'b40ffbee5c1cf4e38028c197eb2fc751',
            'image': rest.file(filename, null, size, null, 'image/png') // filename: 抓取回来的码证码文件
        },
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0',
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    }).on('complete', function(data) {
        let captcha = JSON.parse(data);
        console.log('Captcha Encoded.');
        console.log(captcha);
    });
}

module.exports = getCaptcha


