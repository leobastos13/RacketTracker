from tenniswarehouse import tw_scraper
from tennispoint import tp_scraper
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app import manage_db, app

def main():
   tw_products = tw_scraper()
   manage_db(tw_products, 'Tennis Warehouse', 'https://www.tenniswarehouse-europe.com/')

   tp_products = tp_scraper()
   manage_db(tp_products, 'Tennis Point', 'https://global.tennis-point.com/')

if __name__ == '__main__':
   with app.app_context():
      main()
   








