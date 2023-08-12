const runScrapeData =async ()=>{
    try {
        const browser=await puppeteer.launch({headless:false});
    const page =await browser.newPage()
    await page.goto("http://books.toscrape.com/",{waitUntil: "domcontentloaded"});
    await page.setViewport({width: 1080, height:1080});
    const scrapeData= await page.evaluate(()=>{
        const titleNodes=document.querySelectorAll('ol.row>li>article>h3>a');
        const imageNodes=document.querySelectorAll('ol.row>li>article>.image_container>a>img');
        const priceNodes=document.querySelectorAll('ol.row>li> article> div.product_price> p.price_color');
        return {
            titles:Array.from(titleNodes).map((el)=>el.innerText),
            imgages:Array.from(imageNodes).map((el)=>el.src),
            prices:Array.from(priceNodes).map((el)=>el.innerText)
        }
    });
    await fs.writeFile('./text.txt',JSON.stringify(scrapeData))
    await browser.close()
    } catch (error) {
        console.log(error)
    }
}
export {runScrapeData}