from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from webdriver_manager.chrome import ChromeDriverManager
import os
from dotenv import load_dotenv

def tw_scraper():

    load_dotenv()

    links = [
        'https://www.tenniswarehouse-europe.com/catpage-BABOLATRAC-EN.html',
        'https://www.tenniswarehouse-europe.com/catpage-WILSONRACS-EN.html',
        'https://www.tenniswarehouse-europe.com/catpage-HEADRAC-EN.html',
        'https://www.tenniswarehouse-europe.com/catpage-PRINCERAC-EN.html',
        'https://www.tenniswarehouse-europe.com/catpage-YONEXRAC-EN.html',
        'https://www.tenniswarehouse-europe.com/catpage-DUNLOPRAC-EN.html',
        'https://www.tenniswarehouse-europe.com/catpage-LRAC-EN.html',
        'https://www.tenniswarehouse-europe.com/catpage-PROKERAC-EN.html',
        'https://www.tenniswarehouse-europe.com/catpage-SOLRAC-EN.html',
        'https://www.tenniswarehouse-europe.com/catpage-TECRAC-EN.html',
        'https://www.tenniswarehouse-europe.com/catpage-VOLRAC-EN.html'
    ]

    products = []

    for link in links:

        service = Service(ChromeDriverManager().install())
        browserOptions = Options()

        browserArgument= os.getenv("BROWSER_ARGUMENT")
        browserOptions.add_argument(f"user-data-dir={browserArgument}")

        driver = webdriver.Chrome(service = service, options = browserOptions) 
        driver.get(link)

        try:
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            rackets = WebDriverWait(driver, 30).until(
                EC.visibility_of_all_elements_located((By.XPATH, '//div[contains(@class, "cattable-wrap-cell-tagline")]'))
            )
            for racket in rackets:
                racketInfo = racket.text.split('\n')
                if len(racketInfo) < 2:
                    continue
                string = racketInfo[1]
                brand, _, name = string.partition(' ') 
                if 'Learn' in name or '€' in name:
                    continue
                price = None
                for line in racketInfo:
                    if '€' in line:
                        price = line.split('€')[0] + '€'
                        break
                linkTag = racket.find_elements(By.XPATH, './/a[contains(@class, "cattable-wrap-cell-imgwrap-inner is-racquet")]')
                productLink = None
                imgUrl = None
                for item in linkTag:
                    productLink = item.get_attribute('href')
                    productImg = item.find_element(By.TAG_NAME, 'img')
                    imgUrl = productImg.get_attribute('src')
                    if 'blank.gif' in imgUrl:
                        ActionChains(driver).move_to_element(item).perform()
                        imgUrl = productImg.get_attribute('src')
                if name and brand and price and imgUrl and productLink:
                    products.append({
                        'name': name,
                        'brand': brand,
                        'price': price,
                        'img_url': imgUrl,
                        'link': productLink
                    })                  
        except Exception as error:
            print(f'No rackets found: {error}')
        finally:
            driver.quit()
    return products