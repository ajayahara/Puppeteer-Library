import puppeteer from "puppeteer";
const runScreenShot =async (url,path)=>{
    const browser=await puppeteer.launch({headless:false});
    const page =await browser.newPage()
    await page.goto(url,{waitUntil:'domcontentloaded'});
    await page.setViewport({width: 1080, height:1080});
    await page.screenshot({path,fullPage:true});
    await browser.close()
}
export {runScreenShot}
