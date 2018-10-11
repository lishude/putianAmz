const fs = require('fs')
const axios = require('axios')
const path = require('path')
const download = require('download')
let QrCode = require('qrcode-reader')
let qr = new QrCode()
let Jimp = require("jimp")
let base32 = require('base32')
var speakeasy = require("speakeasy")
let AipOcrClient  = require("baidu-aip-sdk").ocr
let APP_ID = '14367105';
let API_KEY = 'VMVoDYreOU7lYU38GxFtLkGD';
let SECRET_KEY = 'CCEfRtjKmSh0GwBOnesNTruBwsygbR7C'
let client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY)
let qrcodeResult
const token = '008842456379622050a15c5948699b9371c61ca12601'
function getSms(mobile) {
    return axios.get(`http://api.fxhyd.cn/UserInterface.aspx?action=getsms&token=${token}&itemid=1136&mobile=${mobile}`)
}

function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}
function QrCallback(err, value) {
    if (err) {
        console.error(err);
        return
    }
    qrcodeResult = value.result
}
class CommonAmazon {
    constructor() {

    }
    async getQrCode(name) {
        let buffer = fs.readFileSync(`./${name}`)
        await Jimp.read(buffer).then(image => {
            qr.callback = QrCallback
            qr.decode(image.bitmap)
        })
        return qrcodeResult
    }
    async getToken(name) {
        let code = await this.getQrCode(name)
        let start = code.indexOf('=')
        let end = code.indexOf('&')
        let secret = code.substring(start + 1, end)
        return speakeasy.totp({ secret: secret, encoding: 'base32'})
    }
    deleteFile() {
        try {
            fs.unlinkSync(name);
        } catch (err) {

        }
    }
    async getPin(mobile) {
        let sms = 3001;
        while (sms === 3001) {
            sms = (await getSms(mobile)).data;
            await delay(1000)
        }
        return sms.replace(/[^0-9]/ig, "");
    }
    getMobile() {
        return axios.get(`http://api.fxhyd.cn/UserInterface.aspx?action=getmobile&token=${token}&itemid=1136`)
    }
    async getOcr(name) {
        let image = fs.readFileSync(`./${name}`).toString("base64")
        return client.generalBasic(image).then(function(result) {
            return result.words_result[0].words
        }).catch(function(err) {
            // 如果发生网络错误
        })
    }
    async getIdCard() {
        let image = fs.readFileSync(`./idCard.jpg`).toString("base64")
        let idCardSide = "front";
        // 调用身份证识别
        client.idcard(image, idCardSide).then(function(result) {
            let wordsResult = result.words_result
            console.log(`地址: ${wordsResult['住址'].words}`)
            console.log(`出生: ${wordsResult['出生'].words}`)
            console.log(`姓名: ${wordsResult['姓名'].words}`)
            console.log(`公民身份号码: ${wordsResult['公民身份号码'].words}`)
            console.log(`性别: ${wordsResult['性别'].words}`)
            console.log(`民族: ${wordsResult['民族'].words}`)
        }).catch(function(err) {
            // 如果发生网络错误
            console.log(err);
        });
    }
    async screenshot(page, name, clip) {
        page.screenshot(
            {
                path: name,
                type: 'jpeg',
                clip: clip
            });
    }

    async downloadFile() {
        let url = 'http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg';
        download(url).then(data => {
            fs.writeFileSync('foo.jpg', data);
        });
    }
    MathRand(count) {
        let num = ''
        for (let i = 0; i < count; i++) {
            num += Math.floor(Math.random() * 10)
        }
        return num
    }
}

module.exports = new CommonAmazon()