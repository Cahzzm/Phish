from flask import Blueprint, jsonify
from app.models import Product


product_routes = Blueprint('product', __name__)


@product_routes('/')
def get_all_products():
    all_products = Product.query.all()
    return {'products': [one_product.to_dict() for one_product in all_product]}
