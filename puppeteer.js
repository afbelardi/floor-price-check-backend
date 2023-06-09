const puppeteer = require('puppeteer');
const express = require('express');
const cors = require('cors');
const searchRouter = express.Router();
require('dotenv').config();


searchRouter.get('/search', async (req, res ) => {
    res.send('search route working')
})

searchRouter.post('/search', async (req, res) => {
    const browser = await puppeteer.launch({
        args: [
            '--disable-setuid-sandbox',
            '--no-sandbox', 
            '--single-process',
            '--no-zygote',
        ],
        // headless: false
        executablePath: process.env.NODE_ENV === "production" ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath(),
    });
    try {
        const searchTerm = req.body.searchTerm;

    const searchElement = 'div.NavSearch--mobile-search-input input[role="searchbox"]';
    const collectionElement = 'a[class*="sc-1f719d57-0 fKAlPV sc-29427738-0 sc-630fc9ab-0 sc-396bc2e1-0 hyHTWC jSPhMX gslsVL sc-581b878c-0 jPMaKh"]'
    

    const page = await browser.newPage();
    await page.setViewport({width: 1920, height: 1080});
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36')
    await page.goto('https://www.opensea.io/', {waitUntil: 'load', timeout: 0 });
    console.log('made it this far')
    await page.waitForSelector(searchElement);
    console.log('searchElement found')
    await page.focus(searchElement);
    await page.type(searchElement, searchTerm);


    await new Promise(r => setTimeout(r, 4000));

    
    await page.waitForSelector(collectionElement);
    console.log('collectionElement found')
    const link = await page.$(collectionElement);
  
    await link.click();

    await new Promise(r => setTimeout(r, 1000));
    await page.waitForSelector('.sc-29427738-0.sc-d58c749b-1.ILliQ.jsHA-dC')

    const h1Element = await page.$('h1');
    const h1Text = await page.evaluate(h1 => h1.textContent, h1Element);
   
    
    const firstChild = await page.$$('.sc-29427738-0.sc-d58c749b-1.ILliQ.jsHA-dC');
    const firstChildTest = firstChild[1]
    const firstChildText = await (await firstChildTest.getProperty('textContent')).jsonValue();
    const [value, currency] = firstChildText.split(/([a-zA-Z]+)/);


    const nftImage = await page.$eval('img.sc-6d5b054-0.jhsaBJ[src]', img => img.src);


    const result = {
       floorPrice: `${value} ${currency}`,
       collectionName: h1Text,
       nftImage: nftImage
    }

    res.send(result)
    
    } catch (error) {
        console.error(error)
    } finally {
        
        await browser.close();  
    }
})

module.exports = searchRouter;
