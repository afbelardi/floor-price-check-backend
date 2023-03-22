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
        await page.goto('https://www.opensea.io/');
        await page.focus(searchElement);
        await page.$eval(searchElement, el => el.value = '');
        await page.type(searchElement, searchTerm);
        // await Promise.all([
        //     page.waitForNavigation(),
        //     page.keyboard.press('Enter'),
        // ]);

        await new Promise(r => setTimeout(r, 4000));

        await page.waitForSelector('.sc-29427738-0.dVNeWL');
        await page.click('.sc-29427738-0.dVNeWL')

    
    } catch (error) {
        console.error(error)
    }
    
    
})

module.exports = searchRouter;
