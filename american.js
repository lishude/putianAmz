const puppeteer = require('puppeteer');
const CONST = require('./const')
const COMMON = require('./common')
const ocrName = 'ocr.png'
const WAIT_FOR = 5000
const amazonUs = {
    baseInfo: {
        apCustomerName: 'lishude',
        apEmail: '@99999.com',
        apPassword: 'lsd123456'
    },
    nameInfo: {
        lnLegalName: 'lishude',
    },
    addressInfo: {
        addressLine: 'gulouqufushangmingju 1haolou 906',
        city: 'fuzhou',
        state: 'fujiang',
        pincode: '350001',
        displayNameField: 'abc16854'
    },
    cardInfo: {
        addCreditCardNumber: '4929878796278512',
        ccExpirationMonth: '3',
        ccExpirationYear: '2',
        ccHolderName: 'EVAN GOODMAN',
        accountHolderName: 'EVAN GOODMAN',
        routingNumber: '254074170',
        accountNumber: '4929878796278512'
    },
    taxInfo: {
        individualPersonName: 'lishude',
        nonUSPermAddress: 'gulouqufushangmingju 1haolou 906',
        nonUSPermCity: 'fuzhou',
        nonUSPermStateTextbox: 'fujiang',
        nonUSPermPC: '350001',
        electronicSignatureW8BenName: 'lishude'
    },
    idInfo: {
        docNumber: '350182198410101231',
        docExpiryDate: '10052036',
        firstName: 'li',
        lastName: 'shude',
        dateOfBirth: '10101984'
    },
    imageInfo: {
        idImage: 'ocr.png',
        addressImage: 'ocr.png'
    }
}
async function stepEleven (page, sleep, model) {
    try {
        await page.waitFor('input[name=Submit]')
        await page.waitFor(WAIT_FOR * 4)
        await page.click('#a-autoid-1 > span > input')
        await page.waitFor(sleep)
        await page.click('#a-autoid-7 > span > input')
        await page.waitFor(sleep)
        const fileUploads = await page.$$('input[type=file]')
        await fileUploads[0].uploadFile(`./${model.idImage}`)
        await page.waitFor(sleep);
        await page.click('#a-autoid-15 > span > input')
        await page.waitFor(sleep)
        await page.click('#a-autoid-19 > span > input')
        await page.waitFor(sleep)
        await fileUploads[2].uploadFile(`./${model.addressImage}`);
        await page.waitFor(sleep);
        await page.click('input[name=Submit]')
    } catch (err) {
        let msg = `步骤十一 | ${err}`
        throw new Error(msg)
    }
}
async function stepTen(page, sleep, ms, model) {
    try {
        await page.waitFor('#a-autoid-20 > span > input')
        await page.waitFor(WAIT_FOR)
        await page.type('body > div.ng-scope.swipe_BROWSER.a-ws > div > div.a-row.ng-scope > div.a-section.a-spacing-base.a-spacing-top-base.ng-scope > div > div.a-column.a-span10.a-ws-span4 > div:nth-child(10) > div > div > form > div:nth-child(1) > div.a-section.a-spacing-top-micro.stepContBlock > div:nth-child(5) > div > div.a-row.a-spacing-top-mini.kycEntityGroupWrapper.a-ws-row > div.a-column.a-span12.a-ws-span6.a-span-last > input', model.docNumber, {delay: ms})
        await page.type('body > div.ng-scope.swipe_BROWSER.a-ws > div > div.a-row.ng-scope > div.a-section.a-spacing-base.a-spacing-top-base.ng-scope > div > div.a-column.a-span10.a-ws-span4 > div:nth-child(10) > div > div > form > div:nth-child(1) > div.a-section.a-spacing-top-micro.stepContBlock > div:nth-child(5) > div > div:nth-child(5) > div:nth-child(1) > div:nth-child(1) > input', model.docExpiryDate, {delay: ms})
        await page.select('body > div.ng-scope.swipe_BROWSER.a-ws > div > div.a-row.ng-scope > div.a-section.a-spacing-base.a-spacing-top-base.ng-scope > div > div.a-column.a-span10.a-ws-span4 > div:nth-child(10) > div > div > form > div:nth-child(1) > div.a-section.a-spacing-top-micro.stepContBlock > div:nth-child(5) > div > div:nth-child(5) > div.a-column.a-span12.a-spacing-top-small.a-ws-span6.a-ws-span-last > div:nth-child(1) > span > select', '中国')
        await page.type('input[name=firstName]', model.firstName, {delay: ms})
        await page.type('input[name=lastName]', model.lastName, {delay: ms})
        await page.type('input[name=dateOfBirth]', model.dateOfBirth, {delay: ms})
        await page.waitFor(sleep)
        await page.click('#a-autoid-20 > span > input')
    } catch (err) {
        let msg = `步骤十 | ${err}`
        throw new Error(msg)
    }
}
async function stepNight(page, sleep) {
    try {
        await page.waitFor('#a-autoid-0 > span > input')
        await page.waitFor('body > div.ng-scope.swipe_BROWSER.a-ws > div > div.a-row.ng-scope > div.a-section.a-spacing-base.a-spacing-top-base > div > div.a-column.a-span10.a-ws-span4 > div.a-section.a-spacing-base.a-spacing-top-base > div > div.a-row.a-spacing-block.a-spacing-top-small.a-ws-row > div.a-column.a-span12.a-ws-span8 > div:nth-child(1) > div > label > input')
        await page.waitFor(WAIT_FOR)
        await page.click('body > div.ng-scope.swipe_BROWSER.a-ws > div > div.a-row.ng-scope > div.a-section.a-spacing-base.a-spacing-top-base > div > div.a-column.a-span10.a-ws-span4 > div.a-section.a-spacing-base.a-spacing-top-base > div > div.a-row.a-spacing-block.a-spacing-top-small.a-ws-row > div.a-column.a-span12.a-ws-span8 > div:nth-child(1) > div > label > input')
        await page.waitFor(sleep)
        await page.click('#a-autoid-0 > span > input')
    } catch (err) {
        let msg = `步骤九 | ${err}`
        throw new Error(msg)
    }
}
async function stepEight(page) {
    try {
        await page.waitFor('#a-autoid-0 > span > input')
        await page.waitFor(WAIT_FOR)
        await page.click('body > div.ng-scope.swipe_BROWSER.a-ws > div > div.a-row.ng-scope > div.singleColumnLayout > div.a-row.a-spacing-none.a-ws-row > div > div.a-column.a-span10.a-ws-span6 > div > div > div > div > div.a-section > div > div > div > a')
    } catch (err) {
        let msg = `步骤八 | ${err}`
        throw new Error(msg)
    }
}
async function stepSeven(page, sleep) {
    try {
        await page.waitFor('#a-autoid-2 > span > input')
        await page.waitFor(WAIT_FOR)
        await page.click('#productInterviewMain > div:nth-child(2) > div > div:nth-child(5) > div:nth-child(2) > div > label > i')
        await page.waitFor(sleep)
        await page.click('#productInterviewMain > div:nth-child(3) > div > div:nth-child(5) > div:nth-child(2) > div > label > i')
        await page.waitFor(sleep * 2)
        await page.click('#productInterviewMain > div:nth-child(4) > div > div:nth-child(5) > div:nth-child(2) > div > label > i')
        await page.waitFor(sleep * 2)
        await page.click('#productInterviewMain > div:nth-child(5) > div > div.ng-scope > div:nth-child(4) > div > label > i')
        await page.waitFor(sleep)
        await page.click('#a-autoid-2 > span > input')
    } catch (err) {
        let msg = `步骤七 | ${err}`
        throw new Error(msg)
    }
}
async function stepSix(page, sleep, ms, model) {
    try {
        await page.waitFor('#toggleButtonGroupId_IndividualOrBusiness')
        await page.waitFor(WAIT_FOR)
        await page.click('#toggleButtonId_IsUSPerson_false > span > input')
        await page.waitFor(sleep)
        await page.type('input[name=IndividualPersonName]', model.individualPersonName, {delay: ms})
        await page.select('select#CountryOfCitizenshipCode', 'CN')
        await page.waitFor(sleep)
        await page.select('select#NonUSPermCountryCode', 'CN')
        await page.waitFor(sleep)
        await page.type('input[name=NonUSPermAddress1]', model.nonUSPermAddress, {delay: ms})
        await page.type('input[name=NonUSPermCity]', model.nonUSPermCity, {delay: ms})
        await page.type('input[name=NonUSPermStateTextbox]', model.nonUSPermStateTextbox, {delay: ms})
        await page.type('input[name=NonUSPermPC]', model.nonUSPermPC, {delay: ms})
        await page.waitFor(sleep)
        await page.click('#a-autoid-27-announce')
        await page.waitFor(sleep)
        await page.type('input[name=ElectronicSignatureW8BenName]', model.electronicSignatureW8BenName, {delay: ms})
        await page.waitFor(sleep)
        await page.click('#a-autoid-29-announce')
        await page.waitFor(sleep)
        await page.waitFor('#button_SubmitButton > span > span > span > button')
        await page.click('#button_SubmitButton > span > span > span > button')
        await page.waitFor(sleep)
        await page.waitFor('#exit-button-id')
        await page.click('#exit-button-id')
    } catch (err) {
        let msg = `步骤六 | ${err}`
        throw new Error(msg)
    }
}
async function stepFive(page) {
    try {
        await page.waitFor('#a-autoid-0 > span > input');
        await page.waitFor(WAIT_FOR)
        await page.click('#a-autoid-0 > span > input');
    } catch (err) {
        let msg = `步骤五 | ${err}`
        throw new Error(msg)
    }

}
async function stepFour(page, sleep, ms, model) {
    try {
        await page.waitFor('input[name=addCreditCardNumber]');
        await page.waitFor(WAIT_FOR)
        await page.type('input[name=addCreditCardNumber]', model.addCreditCardNumber, {delay: ms});
        await page.waitFor('select[name=ccExpirationMonth]');
        await page.select('select[name="ccExpirationMonth"]', model.ccExpirationMonth);
        await page.waitFor(sleep);
        await page.waitFor('select[name=ccExpirationYear]');
        await page.select('select[name="ccExpirationYear"]', model.ccExpirationYear);
        await page.waitFor(sleep);
        await page.type('input[name=ccHolderName]', model.ccHolderName, {delay: ms});
        await page.waitFor(sleep);
        await page.type('input[name=accountHolderName]', model.accountHolderName, {delay: ms});
        await page.waitFor(sleep);
        await page.type('input[name=routingNumber]', model.routingNumber, {delay: ms});
        await page.waitFor(sleep);
        await page.type('input[name=accountNumber]', model.accountNumber, {delay: ms});
        await page.waitFor(sleep);
        await page.type('input[name=accountNumberReEnter]', model.accountNumber, {delay: ms});
        await page.waitFor(sleep);
        await page.click('input[name=Submit]')
    } catch (err) {
        let msg = `步骤四 | ${err}`
        throw new Error(msg)
    }
}

async function stepThree(page, sleep, ms, model) {
    try {
        await page.waitFor('.navContentArea.aok-clearfix');
        await page.waitFor('input[name=address_line1]');
        await page.waitFor(WAIT_FOR);
        // 地址
        await page.type('input[name=address_line1]', model.addressLine, {delay: ms});
        // 市
        await page.type('input[name=city]', model.city, {delay: ms});
        // 省
        await page.type('input[name=state]', model.state, {delay: ms});
        // 国家
        await page.select('select.reg-dropdown-select.ng-pristine.ng-valid.ng-valid-required', '中国')
        // 邮编
        await page.type('input[name=pincode]', model.pincode, {delay: ms});
        // 店铺名称
        await page.type('input[name=displayNameField]', model.displayNameField, {delay: ms});
        let success = false
        while(!success) {
            await page.click('.a-column.a-span12.a-ws-span6.dn_messageDivV2.a-ws-span-last')
            await page.waitFor(sleep)
            // 如果店铺名已经存在，则随机生成3位数字
            const eval = await page.evaluate(() => {
                let result = document.querySelector('.a-box.a-alert-inline.a-alert-inline-success.ng-scope')
                if (result !== null)
                    return 1;
                return 0;
            })
            if (eval === 1) {
                success = true
            } else {
                let numberStr = COMMON.MathRand(3).toString()
                await page.type('input[name=displayNameField]', numberStr, {delay: ms});
            }
        }
        await page.waitFor(sleep);
        await page.waitFor('input[name=phoneNumberInput]');
        await page.click('input[name=phoneNumberInput]')
        for (let i = 0; i < 3; ++i) {
            await page.keyboard.down('Backspace');
        }
        let mobile = ((await COMMON.getMobile()).data).split('|')[1];
        let mobileWithAreaCode = '86' + mobile;
        // 电话
        await page.type('input[name=phoneNumberInput]', mobileWithAreaCode, {delay: ms});
        await page.waitFor(sleep);
        await page.click('button#a-autoid-2-announce');
        await page.waitFor('input[name=otpInput]');
        let pin = await COMMON.getPin(mobile);
        await page.type('input[name=otpInput]', pin, {delay: ms});
        await page.click('button[name=verifyOTPButton]');
        await page.waitFor('#captchaid > div.a-section.a-spacing-none.ng-scope > form > div.a-section.a-spacing-medium.pv_mainScreen > div.a-box.a-alert-inline.a-alert-inline-success')
        await page.waitFor(sleep * 2);
        await page.waitFor('input[name=Submit]')
        await page.click('input[name=Submit]')
    } catch (err) {
        let msg = `步骤三 | ${err}`
        throw new Error(msg)
    }
}

async function stepTwo(page, sleep, ms, model) {
    try {
        await page.waitFor('#ln_legal_name')
        await page.waitFor(WAIT_FOR)
        await page.type('#ln_legal_name', model.lnLegalName, {delay: ms});
        await page.click('.a-icon.a-icon-checkbox');
        await page.waitFor(sleep)
        await page.click('input[name=Submit]');
    } catch (err) {
        let msg = `步骤二 | ${err}`
        throw new Error(msg)
    }

}
async function stepOneError(page, ms, model) {
    // 等待验证图片出现
    let text = 'abc'
    while (text.length < 6) {
        await page.waitFor('img#auth-captcha-image')
        await page.waitForFunction('document.querySelector("img#auth-captcha-image").height > 20');
        // 截图
        await COMMON.screenshot(page, ocrName, {
            x: 860,
            y: 520,
            width: 220,
            height: 70
        });
        // 保证图片保存到本地
        await page.waitFor(500);
        text = await COMMON.getOcr(ocrName);
        if (!text || text.length < 6) {
            await page.click('#auth-captcha-refresh-link')
            while (true) {
                // 这边如果没有加载图片，这表示已经刷新完成
                let selector = await page.$('.a-section.a-text-center.a-lazy-loaded')
                if (!selector) {
                    break
                }
            }
        }
    }
    // 密码
    await page.type('#ap_password', model.apPassword, {delay: ms});
    // 确认密码
    await page.type('#ap_password_check', model.apPasswordCheck, {delay: ms});
    let result = text.replace(/\ +/g, "").trim();
    await page.type('#auth-captcha-guess', result, {delay: ms})
    await page.waitFor(500);
    await page.click('#continue');
}

async function stepOne(page, sleep, ms, model) {
    try {
        // 删除文件
        await COMMON.deleteFile();
        // 创建账号按钮
        await page.click('#createAccountSubmit');
        await page.waitFor(WAIT_FOR)
        await page.waitFor('#ap_customer_name')
        // 用户名
        await page.type('#ap_customer_name', model.apCustomerName, {delay: ms});
        // 邮箱地址
        // 这边用来测试 到时候要删掉
        let num = COMMON.MathRand(6).toString()
        let apEmail = num + model.apEmail
        await page.type('#ap_email', apEmail, {delay: ms});
        // 密码
        await page.type('#ap_password', model.apPassword, {delay: ms});
        // 确认密码
        await page.type('#ap_password_check', model.apPassword, {delay: ms});
        await page.waitFor(500);
        await page.click('#continue');
    }catch (err) {
        let msg = `步骤一 | ${err}`
        throw new Error(msg)
    }
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

    await page.goto(CONST.US_URL);

    return {page: page,browser: browser};
}

class UsAmazon {
    constructor() {

    }
    async createShop () {
        // 创建page
        let {page} = await createPage();
        let sleep = 2000
        let delay = 100
        try {
            await stepOne(page, sleep, delay, amazonUs.baseInfo);
            await stepTwo(page, sleep, delay * 2, amazonUs.nameInfo);
            await stepThree(page, sleep, delay, amazonUs.addressInfo);
            await stepFour(page, sleep, delay, amazonUs.cardInfo)
            await stepFive(page)
            await stepSix(page, sleep, delay, amazonUs.taxInfo)
            await stepSeven(page, sleep)
            await stepEight(page)
            await stepNight(page, sleep)
            await stepTen(page, sleep, delay, amazonUs.idInfo)
            await stepEleven(page, sleep, amazonUs.imageInfo)
            console.log('恭喜你，注册成功')
        } catch (e) {
            console.log(e)
        }

    }
}
module.exports = UsAmazon