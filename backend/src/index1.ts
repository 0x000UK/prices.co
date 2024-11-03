import { chromium } from 'playwright';

async function searchAndLogData() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://amazon.in');

  // Enter "clothes" in the search bar and submit the search
  // await page.fill('#twotabsearchtextbox', 'clothes');
  await page.fill('#twotabsearchtextbox', 'resistance bands');
  await page.press('#twotabsearchtextbox', 'Enter');

  // Wait for search results to load
  await page.waitForSelector('.s-main-slot', { timeout: 10000 });
  await page.waitForTimeout(5000); // Additional delay to ensure everything loads

  let hasNextPage = true;
  const allCards = []

  while (hasNextPage) {
    const results = await page.evaluate(() => {
      const cardList = document.querySelectorAll(".s-asin > .sg-col-inner");
      const cards: Array<{ id: string; url: string; title: string;  brand: string; mainImage: string; rating: string; totalRating: string; }> = [];
  
      cardList.forEach((card, index) => {
        const mainImageElement = card.querySelector("img.s-image") as HTMLImageElement | null;
        const urlElement = card.querySelector("a.a-link-normal.s-no-outline") as HTMLAnchorElement | null;
        const titleElement = card.querySelector("span.a-text-normal") as HTMLElement | null;
        const brandElement = card.querySelector("span.a-size-base-plus") as HTMLElement | null;
        const ratingElement = card.querySelector("span.a-icon-alt") as HTMLElement || null;
        const totalRatingElement = card.querySelector("span.a-size-base.s-underline-text") as HTMLElement || null;
  
        let title = titleElement ? titleElement.innerHTML : 'null'
        let brand = brandElement ? brandElement.innerHTML : 'null'
        let rating = ratingElement ? ratingElement.innerHTML : 'null'
  
        if (brand === title) {
          const firstWord = title.split(' ')[0]
          brand = firstWord
        } 
  
        rating = rating.split(' ')[0]
        
  
        const cardData = {
          id: (index + 1).toString(),
          url: urlElement ? urlElement.href : 'null',
          title: title,
          brand: brand,
          mainImage: mainImageElement ? mainImageElement.src : 'null',
          rating: rating,
          totalRating: totalRatingElement ? totalRatingElement.innerHTML : 'null',
        };
  
        cards.push(cardData);
      });
  
      return cards;
    });

    allCards.push(...results)

    const nextButton = await page.$()
  }


  console.log("Cards:", results);

  await browser.close();
}

searchAndLogData();
