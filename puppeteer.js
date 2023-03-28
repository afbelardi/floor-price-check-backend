const puppeteer = require('puppeteer');
const express = require('express');
const searchRouter = express.Router();

searchRouter.post('/search', async (req, res) => {
      try {
        const searchTerm = req.body.searchTerm;

        const searchElement = 'div.NavSearch--mobile-search-input input[role="searchbox"]';
    
        const browser = await puppeteer.launch({
            headless: false
        });
        const page = await browser.newPage();
        await page.setViewport({width: 1920, height: 1080});

        await page.goto('https://www.opensea.io/');
        await page.focus(searchElement);
        await page.type(searchElement, searchTerm);
  

        await new Promise(r => setTimeout(r, 4000));

        const collectionElement = 'a[class*="sc-1f719d57-0 fKAlPV sc-29427738-0 sc-630fc9ab-0 sc-a8df1259-0 hyHTWC jSPhMX eGZhwM"]'
        const link = await page.$(collectionElement);
        await link.click();

        await new Promise(r => setTimeout(r, 4000));

        const h1Element = await page.$('h1');
        const h1Text = await page.evaluate(h1 => h1.textContent, h1Element);
       
        const firstChild = await page.$$('.sc-29427738-0.sc-d58c749b-1.ILliQ.jsHA-dC');
        const firstChildTest = firstChild[1]
        const firstChildText = await (await firstChildTest.getProperty('textContent')).jsonValue();
        const [value, currency] = firstChildText.split(/([a-zA-Z]+)/);
        const result = {
           floorPrice: `${value} ${currency}`,
           collectionName: h1Text
        }

        res.send(result)
        await browser.close();
    
    } catch (error) {
        console.error(error)
    }
})

module.exports = searchRouter;
