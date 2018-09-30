const puppeteer = require('puppeteer');
const path = require('path');
const ocrSpaceApi = require('ocr-space-api');
const download = require('download');
const axios = require('axios');
const fs = require('fs');
const token = '00884245aebe08321659859f9842d6e9b07e0799'
const name = 'ocr.png';
const amazonUk = {
    stepOne: {
        apCustomerName: 'lishude',
        apEmail: '11@99999.com',
        apPassword: 'lsd123456',
        apPasswordCheck: 'lsd123456'
    },
    stepTwo: {
        lnLegalNameFirstname: 'li',
        lnLegalNameLastname: 'shude'
    },
    stepThree: {
        dateOfBirth: '10101984',
        documentNumber: '350182198410101231',
        chineseLastNameField: '李',
        chineseFirstNameField: '数得',
        pincode: '350001',
        addressLine: 'gulouqufushangmingju 1haolou 906',
        city: 'fuzhou',
        state: 'fujiang'
    },
    stepFour: {
        addCreditCardNumber: '4929878796278512',
        ccExpirationMonth: '3',
        ccExpirationYear: '2',
        ccHolderName: 'EVAN GOODMAN'
    },
    stepFive: {
        addCreditCardNumber: '4929878796278512',
        ccExpirationMonth: '3',
        ccExpirationYear: '2',
        ccHolderName: 'EVAN GOODMAN'
    }
}
let url = 'https://sellercentral.amazon.co.uk/ap/signin?openid.return_to=https%3A%2F%2Fsellercentral.amazon.co.uk%2Fsw%2FSSR%2FSignUp%2Fstep%2FSignUp%3F_encoding%3DUTF8%26language%3Dzh_CN%26marketplaceId%3DA1F83G8C2ARO7P%26passthrough%252Faccount%3Dfba_soa%26passthrough%252FinitialSessionID%3D260-5567462-8664710%26passthrough%252Fld%3DASGSAGSDirect_ASCNAGSSignupneweu%26passthrough%252FmarketplaceID%3DA1F83G8C2ARO7P%26passthrough%252FrootMarketplaceID%3D%26passthrough%252FsimplifiedLogin%3D%26passthrough%252FsuperSource%3DOAR%26productTier%3DFBA%253ASILVER%26productType%3DFulfillmentByAmazon%253ASellOnAmazon%26ref%3Das_cn_ags_signup_new_cta_eu%26redirectAP%3D1&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=amzn_sw_signup_uk&openid.mode=checkid_setup&marketPlaceId=A1F83G8C2ARO7P&language=zh_CN&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&ssoResponse=eyJ6aXAiOiJERUYiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiQTI1NktXIn0.RYUu0tqUVSFzhONn9LdPM4xevqvngpXzm78gyPcbmsxGqWnAN3VOEA.3V6Y0i2qLSQ12Yvi.lkl3ct40CagD-GIp0PqE4YHvT-PkkKOViarUG57Txo8O8NbxRHyMsEBZM2TNK0jNW2-tYG956bnOQWCj5aWwV2ZILCJSrEkfC_V-dXaaEITsbmlmzwuiZPC77e_P_fa7i_NvprYmg7kNLJFjZwHAkcv2S7j_Tj7VJXkMRkXUJv6iJP6jnm0vbkgnHh6QXQdAjIm5HkusI24jlvKv4WwpB3NWiTr7LAi4x18seyjZDuBtpe2JRI22K-q6v3Z744AX6jHeZQ.LH69QbUNlnkxAzszyru0Fw'
setupShop();
let options = {
    apikey: '89ddfd071e88957',
    language: 'eng', // Português
    imageFormat: 'image/png', // Image Type (Only png ou gif is acceptable at the moment i wrote this)
    isOverlayRequired: true
};

async function getOcr() {
    return ocrSpaceApi.parseImageFromLocalFile(name, options)
        .then(function (parsedResult) {
            return parsedResult.parsedText
        }).catch(function (err) {
            console.log('ERROR:', err);
        });
}

async function deleteFile() {
    try {
        fs.unlinkSync(name);
    } catch (err) {

    }
}

async function stepFour(page, sleep, ms, model) {
    await page.waitFor('input[name=addCreditCardNumber]');
    await page.type('input[name=addCreditCardNumber]', model.addCreditCardNumber, {delay: ms});
    await page.waitFor('select[name=ccExpirationMonth]');
    await page.select('select[name="ccExpirationMonth"]', model.ccExpirationMonth);
    await page.waitFor(sleep);
    await page.waitFor('select[name=ccExpirationYear]');
    await page.select('select[name="ccExpirationYear"]', model.ccExpirationYear);
    await page.waitFor(sleep);
    await page.type('input[name=ccHolderName]', model.ccHolderName, {delay: ms});
    await page.click('#a-autoid-0 > span > input');
    await page.waitForFunction('document.querySelector("input[name=Submit]").disabled !== true');
    await page.click('input[name=Submit]')
}

async function stepThree(page, sleep, ms, model) {
    await page.waitFor('.navContentArea.aok-clearfix');
    await page.waitFor('select[name="languageSwitcher"');
    await page.select('select[name="languageSwitcher"]', 'zh_CN');
    await page.waitFor(sleep);
    await page.waitFor('select[name="CountryOfCitizenship"]');
    // 国籍
    await page.select('#POC_BC_81406134d-5752-433f-99a8-af6c69181cdd > div > form > div:nth-child(3) > div.a-row.a-spacing-top-mini.a-ws-row > div > div:nth-child(2) > div > span > select', '中国')
    await page.waitFor(sleep);
    // 出生地
    await page.select('#POC_BC_81406134d-5752-433f-99a8-af6c69181cdd > div > form > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div > span > select', '中国')
    await page.waitFor(sleep);
    // 出生日期
    await page.type('#POC_BC_81406134d-5752-433f-99a8-af6c69181cdd > div > form > div:nth-child(3) > div:nth-child(2) > div.a-column.a-span12.a-spacing-top-small.a-ws-span6.a-ws-span-last > div:nth-child(2) > div > input', model.dateOfBirth, {delay: ms})
    // 身份证件
    await page.type('#POC_BC_81406134d-5752-433f-99a8-af6c69181cdd > div > form > div:nth-child(3) > div:nth-child(3) > div:nth-child(2) > div.a-row.kycEntityGroupWrapper > div.a-column.a-span6.a-span-last > input', model.documentNumber, {delay: ms})
    // 姓
    await page.type('#POC_BC_81406134d-5752-433f-99a8-af6c69181cdd > div > form > div:nth-child(3) > div:nth-child(6) > div:nth-child(2) > div:nth-child(1) > div > input', model.chineseLastNameField, {delay: ms})
    // 名
    await page.type('#POC_BC_81406134d-5752-433f-99a8-af6c69181cdd > div > form > div:nth-child(3) > div:nth-child(6) > div:nth-child(2) > div.a-column.a-span12.a-spacing-top-small.a-ws-span6.a-ws-span-last > div > input', model.chineseFirstNameField, {delay: ms})
    // 居住地
    await page.select('#SuggestedAddress > div.a-section.ng-scope > div:nth-child(1) > div:nth-child(1) > div > div.a-section.a-spacing-none.pincode-textbox-small.reg-dropdown > select', '中国')
    await page.waitFor(sleep);
    // 邮编
    await page.type('input[name=pincode]', model.pincode, {delay: ms});
    // 地址
    await page.type('input[name=address_line1]', model.addressLine, {delay: ms});
    // 市
    await page.type('input[name=city]', model.city, {delay: ms});
    // 省
    await page.type('input[name=state]', model.state, {delay: ms});
    await page.waitFor(ms);
    await page.waitFor('input[name=phoneNumberInput]');
    await page.click('input[name=phoneNumberInput]')
    for (let i = 0; i < 3; ++i) {
        await page.keyboard.down('Backspace');
    }
    let mobile = ((await getMobile()).data).split('|')[1];
    let mobileWithAreaCode = '86' + mobile;
    // 电话
    await page.type('input[name=phoneNumberInput]', mobileWithAreaCode, {delay: ms});
    await page.waitFor(sleep);
    await page.click('input[name=sendVerificationButton]');
    await page.waitFor('input[name=otpInput]');
    let pin = await getPin(mobile);
    await page.type('input[name=otpInput]', pin, {delay: ms});
    await page.click('button[name=verifyOTPButton]');
    await page.waitFor('#Cvs_Phone_Verification_BC_fc2259f3-7972-4fea-9ded-9622b0181461 > div > form > div.a-box.a-alert-inline.a-alert-inline-success')
    await page.waitFor(sleep);
    await page.click('input[name=Submit]')

}

async function stepTwo(page, sleep, ms, model) {
    await page.waitFor('input[name=Submit]');
    await page.select('select[name="embu-dropdown-field"]', 'CN');
    await page.waitFor(sleep);
    await page.select('select[name="business-type-dropdown-field"]', '4');
    await page.waitFor(sleep);
    await page.type('#ln_legal_name_first_name', model.lnLegalNameFirstname, {delay: ms})
    await page.type('#ln_legal_name_last_name', model.lnLegalNameLastname, {delay: ms})
    await page.waitFor(sleep);
    await page.click('input[name=Submit]');
}

async function stepOne(page, ms, model) {
    // 创建账号按钮
    await page.click('#createAccountSubmit');
    // 等待验证图片出现
//  await page.waitFor(3000)
    await page.waitFor('img#auth-captcha-image')
    await page.waitForFunction('document.querySelector("img#auth-captcha-image").height > 20');
    // 截图
    await screenshot(page, name);
    // 保证图片保存到本地
    await page.waitFor(500);

    let text = getOcr(name);

    // 用户名
    await page.type('#ap_customer_name', model.apCustomerName, {delay: ms});
    // 邮箱地址
    await page.type('#ap_email', model.apEmail, {delay: ms});
    // 密码
    await page.type('#ap_password', model.apPassword, {delay: ms});
    // 确认密码
    await page.type('#ap_password_check', model.apPasswordCheck, {delay: ms});

    await text.then(res => {
        let result = res.replace(/\ +/g, "");
        page.type('#auth-captcha-guess', result.trim())
    });
    await page.waitFor(500);
    await page.click('#continue');
}

async function createPage() {
    const browser = await puppeteer.launch({
        headless: false,
        //headless:false,
        // 屏幕最大化
        args: ['--start-maximized']
    });
    // Load the specified page
    const page = await browser.newPage({});


    await page.setViewport({width: 1920, height: 1080});

    await page.goto(url);

    return page;
}

async function screenshot(page) {
    page.screenshot(
        {
            path: name,
            type: 'jpeg',
            clip: {
                x: 860,
                y: 433,
                width: 220,
                height: 70
            }
        });
}

async function getPin(mobile) {
    let sms = 3001;
    while (sms === 3001) {
        sms = (await getSms(mobile)).data;
        await delay(1000)
    }
    let pin = sms.replace(/[^0-9]/ig, "");
    return pin
}

function getMobile() {
    return axios.get(`http://api.fxhyd.cn/UserInterface.aspx?action=getmobile&token=${token}&itemid=1136`)
}

function getSms(mobile) {
    return axios.get(`http://api.fxhyd.cn/UserInterface.aspx?action=getsms&token=${token}&itemid=1136&mobile=${mobile}`)
}

function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}


async function setupShop() {
    // 删除文件
    deleteFile();
    // 创建page
    let page = await createPage();
    await stepOne(page, 100, amazonUk.stepOne);
    await stepTwo(page, 1500, 200, amazonUk.stepTwo);
    await stepThree(page, 2000, 100, amazonUk.stepThree);
    await stepFour(page, 1000, 100, amazonUk.stepFour)
}

async function uploadFile() {
    let page = await createPage();
    const filePath = path.relative(process.cwd(), __dirname + '/ocr.png');
    const input = await page.$('#fileupload');
    await input.uploadFile(filePath);
    // 等待按钮可以点击
    await page.waitForFunction('document.querySelector("#MainContent_btnOCRConvert").disabled === false');
    await page.click('#MainContent_btnOCRConvert')

}

async function downloadFile() {

    let url = 'http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg';
    download(url).then(data => {
        fs.writeFileSync('foo.jpg', data);
    });
}