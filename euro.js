const puppeteer = require('puppeteer');
const CONST = require('./const')
const COMMON = require('./common')
const ocrName = 'ocr.png'
const qrName = 'qr.png'
const WAIT_FOR = 5000
const amazonUk = {
    baseInfo: {
        apCustomerName: 'lishude',
        apEmail: '149@99999.com',
        apPassword: 'lsd123456'
    },
    nameInfo: {
        lnLegalNameFirstname: 'li',
        lnLegalNameLastname: 'shude'
    },
    addressInfo: {
        dateOfBirth: '10101984',
        documentNumber: '350182198410101231',
        chineseLastNameField: '李',
        chineseFirstNameField: '数得',
        pincode: '350001',
        addressLine: 'gulouqufushangmingju 1haolou 906',
        city: 'fuzhou',
        state: 'fujiang'
    },
    cardInfo: {
        addCreditCardNumber: '4929878796278512',
        ccExpirationMonth: '3',
        ccExpirationYear: '2',
        ccHolderName: 'EVAN GOODMAN'
    },
    shopInfo: {
        displayNameField: 'abc'
    },
    backupInfo: {
        backupMobile: '13635261234'
    }
}
async function stepNight(page) {
    try {
        await page.waitFor('#enable-mfa-form-submit')
        await page.waitFor(WAIT_FOR * 2)
        await page.click('#enable-mfa-form-submit')
    } catch (err) {
        let msg = `步骤九 | ${err}`
        throw new Error(msg)
    }

}
async function stepEight(page, sleep, ms, model) {
    try {
        await page.waitFor('#add-phone-form-submit')
        await page.waitFor(WAIT_FOR)
        await page.select('select#sia-add-phone-country-code', 'CN')
        await page.waitFor(sleep)
        await page.type('#sia-add-phone-form-input', model.backupMobile, {delay: ms})
        await page.click('#skip-verification-input')
        await page.waitFor(sleep)
        await page.click('#add-phone-form-submit')
    } catch (err) {
        let msg = `步骤八 | ${err}`
        throw new Error(msg)
    }

}
async function stepSeven(page, sleep, ms) {
    try {
        await page.waitFor('input#add-phone-form-submit');
        await page.waitFor(WAIT_FOR)
        await page.click('#sia-otp-accordion-totp-header > i')
        await page.waitFor(sleep)
        // 截图
        await COMMON.screenshot(page, qrName, {
            x: 649,
            y: 300,
            width: 145,
            height: 145
        });
        // 保证图片保存到本地
        await page.waitFor(WAIT_FOR);
        let token = await COMMON.getToken(qrName)
        await page.waitFor(WAIT_FOR * 2)
        await page.type('#ch-auth-app-code-input', token, {delay: ms})
        await page.click('#ch-auth-app-submit')
    } catch (err) {
        let msg = `步骤七 | ${err}`
        throw new Error(msg)
    }
}
async function stepSix(page) {
    try {
        await page.waitFor('button.primary')
        await page.waitFor(WAIT_FOR)
        await page.click('button.primary')
    } catch (err) {
        let msg = `步骤六 | ${err}`
        throw new Error(msg)
    }
}
async function stepFive(page, sleep, ms, model) {
    try {
        await page.waitFor('input[name=displayNameField]');
        await page.waitFor(WAIT_FOR)
        await page.type('input[name=displayNameField]', model.displayNameField, {delay: ms});
        let success = false
        while(!success) {
            await page.click('.a-row.euStep.stepContBlock.a-ws-row')
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
        await page.click('input[name=Submit]')
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
        const id = await page.evaluate(() => {
            return document.querySelector('.a-button.a-button-span12.a-button-primary.a-button-small').id
        })
        await page.click(`#${id} > span > input`);
        await page.waitForFunction('document.querySelector("input[name=Submit]").disabled !== true');
        await page.click('input[name=Submit]')
    } catch (err) {
        let msg = `步骤四 | ${err}`
        throw new Error(msg)
    }
}

async function stepThree(page, sleep, ms, model) {
    try {
        await page.waitFor('.navContentArea.aok-clearfix');
        await page.waitFor('select[name="languageSwitcher"');
        await page.select('select[name="languageSwitcher"]', 'zh_CN');
        await page.waitFor(WAIT_FOR);
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
        let mobile = ((await COMMON.getMobile()).data).split('|')[1];
        let mobileWithAreaCode = '86' + mobile;
        // 电话
        await page.type('input[name=phoneNumberInput]', mobileWithAreaCode, {delay: ms});
        await page.waitFor(sleep);
        await page.click('input[name=sendVerificationButton]');
        await page.waitFor('input[name=otpInput]');
        let pin = await COMMON.getPin(mobile);
        await page.type('input[name=otpInput]', pin, {delay: ms});
        await page.click('button[name=verifyOTPButton]');
        await page.waitFor('#Cvs_Phone_Verification_BC_fc2259f3-7972-4fea-9ded-9622b0181461 > div > form > div.a-box.a-alert-inline.a-alert-inline-success')
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
        await page.waitFor('input[name=Submit]');
        await page.select('select[name="embu-dropdown-field"]', 'CN');
        await page.waitFor(sleep);
        await page.select('select[name="business-type-dropdown-field"]', '4');
        await page.waitFor(sleep);
        await page.type('#ln_legal_name_first_name', model.lnLegalNameFirstname, {delay: ms})
        await page.type('#ln_legal_name_last_name', model.lnLegalNameLastname, {delay: ms})
        await page.waitFor(sleep);
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
    await page.type('#ap_password_check', model.apPassword, {delay: ms});
    let result = text.replace(/\ +/g, "").trim();
    await page.type('#auth-captcha-guess', result, {delay: ms})
    await page.waitFor(500);
    await page.click('#continue');
}

async function stepOne(page, ms, model) {
    try {
        // 删除文件
        await COMMON.deleteFile();
        // 创建账号按钮
        await page.click('#createAccountSubmit');
        // 等待验证图片出现
        let text = 'abc'
        while (text.length < 6) {
            await page.waitFor('img#auth-captcha-image')
            await page.waitForFunction('document.querySelector("img#auth-captcha-image").height > 20');
            // 截图
            await COMMON.screenshot(page, ocrName, {
                x: 860,
                y: 433,
                width: 220,
                height: 70
            });
            // 保证图片保存到本地
            await page.waitFor(500);
            text = await COMMON.getOcr(ocrName);
            if (text.length < 6) {
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
        let result = text.replace(/\ +/g, "").trim();
        await page.type('#auth-captcha-guess', result, {delay: ms})
        await page.waitFor(500);
        await page.click('#continue');
    }catch(err) {
        let msg = `步骤一 | ${err}`
        throw new Error(msg)
    }
}

async function createPage() {
    const browser = await puppeteer.launch({
        headless: true,
        //headless:false,
        // 屏幕最大化
        args: ['--start-maximized']
    });
    // Load the specified page
    const page = await browser.newPage({});

    await page.setViewport({width: 1920, height: 1080});

    await page.goto(CONST.UK_URL);

    return {page, browser};
}

class EuroAmazon {
    constructor() {

    }
    async createShop () {
        // 创建page
        let {page} = await createPage();
        try {
            await stepOne(page, 100, amazonUk.baseInfo);
            // 这边保证错误(只处理验证码错误)或者跳转
            while(true) {
                await Promise.race([
                    page.waitForNavigation({waitUntil: 'networkidle0'}),
                    page.waitForSelector('#auth-error-message-box')
                ])
                let error = await page.$('#auth-error-message-box')
                if (!error) {
                    break
                }
                await stepOneError(page, 100, amazonUk.baseInfo)
            }
            let sleep = 2000
            let delay = 100
            await stepTwo(page, sleep, 2 * delay, amazonUk.nameInfo);
            await stepThree(page, sleep, delay, amazonUk.addressInfo);
            await stepFour(page, sleep, delay, amazonUk.cardInfo)
            await stepFive(page, sleep, delay, amazonUk.shopInfo)
            await stepSix(page)
            await stepSeven(page, sleep, delay)
            await stepEight(page, sleep, delay, amazonUk.backupInfo)
            await stepNight(page)
            console.log('恭喜你，注册成功')
        } catch (err) {
            console.log(err)
        }
    }
}
module.exports = EuroAmazon