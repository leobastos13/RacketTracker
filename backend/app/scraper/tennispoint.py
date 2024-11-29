from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import os
from dotenv import load_dotenv

def tp_scraper():

    load_dotenv()

    links = [
        'https://global.tennis-point.com/tennis-rackets/babolat/?srule=New-Styles',
        'https://global.tennis-point.com/tennis-rackets/wilson/?srule=New-Styles',
        'https://global.tennis-point.com/tennis-rackets/head/?srule=New-Styles',
        'https://global.tennis-point.com/tennis-rackets/prince/?srule=New-Styles',
        'https://global.tennis-point.com/tennis-rackets/yonex/?srule=New-Styles',
        'https://global.tennis-point.com/tennis-rackets/dunlop/?srule=New-Styles',
        'https://global.tennis-point.com/tennis-rackets/lacoste/?srule=New-Styles',
        'https://global.tennis-point.com/tennis-rackets/prokennex/?srule=New-Styles',
        'https://global.tennis-point.com/tennis-rackets/tecnifibre/?srule=New-Styles',
        'https://global.tennis-point.com/tennis-rackets/racket-roots/?srule=New-Styles'
    ]

    products = []

    for link in links:

        service = Service(ChromeDriverManager().install())
        browserOptions = Options()

        browserArgument= os.getenv("BROWSER_ARGUMENT")
        browserOptions.add_argument(f"user-data-dir={browserArgument}")

        driver = webdriver.Chrome(service = service, options = browserOptions) 
        driver.get(link)
        driver.refresh()

        try:
            while True:
                driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
                rackets = WebDriverWait(driver, 30).until(
                    EC.visibility_of_all_elements_located((By.XPATH, '//div[contains(@class, "row rackets-container")]'))
                )
                for racket in rackets:
                    driver.execute_script("arguments[0].scrollIntoView();", racket)
                    racketInfo = racket.text.split('\n')
                    if racketInfo[0].startswith('-') or racketInfo[0].startswith('Sale') or racketInfo[0].startswith('New') or racketInfo[0].startswith('Exclusive') or racketInfo[0].startswith('Deal'):
                        name = racketInfo[2]
                        if len(racketInfo) > 4 and '€' in racketInfo[4]:
                            priceCleaned = racketInfo[4].replace('€', '').strip()
                            price = f'{priceCleaned} €'
                        else:
                            priceCleaned = racketInfo[3].replace('€', '').strip()
                            price = f'{priceCleaned} €'
                    else:
                        name = racketInfo[1]
                        if len(racketInfo) > 3 and '€' in racketInfo[3]:
                            priceCleaned = racketInfo[3].replace('€', '').strip()
                            price = f'{priceCleaned} €'
                        else:
                            priceCleaned = racketInfo[2].replace('€', '').strip()
                            price = f'{priceCleaned} €'
                    brandDiv = racket.find_elements(By.XPATH, './/div[contains(@class, "brand-icon-container")]/img')
                    brand = None
                    for item in brandDiv:
                        brand = item.get_attribute('alt')
                    linkTag = racket.find_elements(By.XPATH, './/div[contains(@class, "product-main-image")]/a')
                    productLink = None
                    imgUrl = None
                    for item in linkTag:
                        productLink = item.get_attribute('href')
                        productPicture = item.find_element(By.XPATH, './/picture')
                        driver.execute_script("arguments[0].scrollIntoView();", productPicture)
                        productSource = productPicture.find_elements(By.XPATH, './source')
                        for source in productSource:
                            imgUrl = source.get_attribute('srcset')
                            if imgUrl:
                                break
                        if not imgUrl:
                            productImg = productPicture.find_element(By.XPATH, './img')
                            WebDriverWait(driver, 10).until(
                                lambda d: productImg.get_attribute('src')
                            )
                            imgUrl = productImg.get_attribute('src')
                            if imgUrl:
                                break
                    if name and brand and price and imgUrl and productLink:
                        products.append({
                            'name': name,
                            'brand': brand,
                            'price': price,
                            'img_url': imgUrl,
                            'link': productLink
                        })
                try:
                    nextPage = driver.find_element(By.XPATH, '//li[contains(@class, "page-item icon next")]/a')
                    if nextPage:
                        nextPage.click()
                        WebDriverWait(driver, 10).until(EC.staleness_of(rackets[0]))
                    else:
                        break
                except Exception:
                    break
        except Exception as error:
            print(f'No rackets found: {error}')
        finally:
            driver.quit()
    return products