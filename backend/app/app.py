from flask import Flask, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
from dotenv import load_dotenv
import subprocess

load_dotenv()

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv('SQLALCHEMY_DATABASE_URI')
db = SQLAlchemy(app)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(300), nullable=False)
    brand = db.Column(db.String(50), nullable=False)
    img_url = db.Column(db.String(200), nullable=False)
    link = db.Column(db.String(200), nullable=False)
    prices = db.relationship('Price', backref='product', lazy=True)

class Source(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    url = db.Column(db.String(200))
    prices = db.relationship('Price', backref='source', lazy=True)

class Price(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    source_id = db.Column(db.Integer, db.ForeignKey('source.id'), nullable=False)
    price = db.Column(db.String(20), nullable=False)

def manage_db(products, sourceName, sourceUrl):
    source = Source.query.filter_by(name=sourceName).first()
    if not source:
        source = Source(name=sourceName, url=sourceUrl)
        db.session.add(source)
        db.session.commit()
    for product in products:
        existingProduct = Product.query.filter_by(name=product['name']).first()
        if not existingProduct:
            newProduct = Product(name=product['name'], brand=product['brand'], img_url=product['img_url'], link=product['link'])
            db.session.add(newProduct)
            db.session.commit()
            productId = newProduct.id
        else:
            productId = existingProduct.id
        priceEntry = Price.query.filter_by(product_id=productId, source_id=source.id).first()
        if not priceEntry:
            priceEntry = Price(
                product_id=productId,
                source_id=source.id,
                price=product['price']
            )
            db.session.add(priceEntry)
        else:
            priceEntry.price = product['price']
        db.session.commit()

@app.route("/products", methods=['GET'])
def get_products():
    product_data = db.session.query(Product, Price, Source).join(Price, Product.id == Price.product_id).join(Source, Price.source_id == Source.id).all()
    products_dict = {}

    for product, price, source in product_data:
        if product.name not in products_dict:
            products_dict[product.name] = {
                'name': product.name,
                'brand': product.brand,
                'sources': []
            }
        
        products_dict[product.name]['sources'].append({
            'price': price.price,
            'source': source.name,
            'source_url': source.url,
            'img_url': product.img_url,
            'link': product.link
        })

    combined_products = list(products_dict.values())
    if combined_products:
        return jsonify(combined_products)
    else:
        return jsonify({'error': 'No products found'}), 404

@app.route("/locales/<path:filename>")
def translations(filename):
    dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "locales")
    return send_from_directory(dir, filename)

@app.route("/run-scraper", methods=["POST"])
def run_scraper():
    command = ["python", "main.py"]
    app_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), 'scraper'))
    try:
        subprocess.Popen(command, shell=True, cwd=app_dir)
        return "Scraper started successfully", 200
    except Exception as e:
        return f"Failed to start scraper: {e}", 500

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
