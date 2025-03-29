from flask import Flask, jsonify, request
import json
from flask_cors import CORS

products = Flask(__name__)


CORS(products)

products_list = [
    { "id": 1, "name": "Wireless Headphones", "category": "Electronics", "price": 79.99, "stock": 25, "description": "Bluetooth noise-canceling headphones with 30-hour battery life." },
    { "id": 2, "name": "Smartphone Stand", "category": "Accessories", "price": 12.99, "stock": 100, "description": "Adjustable aluminum stand compatible with all smartphones and tablets." },
    { "id": 3, "name": "Mechanical Keyboard", "category": "Electronics", "price": 99.99, "stock": 15, "description": "RGB backlit mechanical keyboard with customizable keys." },
    { "id": 4, "name": "Gaming Mouse", "category": "Accessories", "price": 49.99, "stock": 30, "description": "Ergonomic gaming mouse with programmable buttons and RGB lighting." },
    { "id": 5, "name": "Laptop Backpack", "category": "Bags", "price": 39.99, "stock": 50, "description": "Water-resistant backpack with padded laptop compartment (up to 17 inches)." },
    { "id": 6, "name": "Smartwatch", "category": "Wearables", "price": 129.99, "stock": 20, "description": "Fitness tracking smartwatch with heart rate monitor and GPS." },
    { "id": 7, "name": "Portable Power Bank", "category": "Accessories", "price": 29.99, "stock": 75, "description": "10000mAh fast-charging power bank with dual USB ports." },
    { "id": 8, "name": "External Hard Drive", "category": "Storage", "price": 89.99, "stock": 40, "description": "1TB external hard drive with USB 3.0 support." },
    { "id": 9, "name": "LED Desk Lamp", "category": "Home Office", "price": 24.99, "stock": 60, "description": "Dimmable LED desk lamp with adjustable brightness and USB charging port." },
    { "id": 10, "name": "Wireless Charger", "category": "Accessories", "price": 19.99, "stock": 80, "description": "Qi-certified wireless charging pad for iPhone and Android devices." }

]

@products.errorhandler(404)
def not_found(error):
    return jsonify({
        "error":"resource not found",
        "status": 404,
        "message": " The endpoint you're accessing in not valid."
    }),404
    
    
@products.route('/')
def home():
    return jsonify({"Message": "Welcome to product Page!"})

## GET /products → Returns a list of products.
@products.route('/products', methods=['GET'])
def display_all_products():
    return jsonify(products_list)

## GET /products/<product_id> → Returns a single product by ID
@products.route('/products/<int:product_id>', methods=['GET'])
def Get_product_by_id(product_id):
    product = next((prod for prod in products_list if prod['id'] == product_id), None)
    if product:
        return jsonify(product)
    return jsonify({"error": "Product not found"}), 404

## POST /products → Adds a new product
@products.route('/products', methods=['POST'])
def add_new_product():
    required_fields = ['name', 'category', 'price', 'stock', 'description']
    
    # Extract request body data
    data = request.get_json()
    
    # Check if all required fields exist
    missing_fields = set(required_fields) - data.keys()
    if missing_fields:
        return jsonify({"error": f"Missing fields: {', '.join(missing_fields)}"}), 400
    
    # Generate new product ID
    new_id = max(prod['id'] for prod in products_list) + 1 if products_list else 1
    
    # Create new product dictionary
    new_product = {
        "id": new_id,
        "name": data['name'],
        "category": data["category"],
        "price": data["price"],
        "stock": data["stock"],
        "description": data["description"]
    }
    
    # Add new product to list
    products_list.append(new_product)
    
    # Return success response
    return jsonify({"message": "Product was added successfully", "product": new_product}), 201

if __name__ == '__main__':
    products.run(debug=True)