from flask import Blueprint, jsonify
from app.models import Product


product_routes = Blueprint('product', __name__)


@product_routes.route('/')
def get_all_products():
    all_products = Product.query.all()
    return {'products': [one_product.to_dict() for one_product in all_products]}


@product_routes.route('/<int:id>')
def get_one_product(id):
    product = Product.query.get(id)
    one_product = product.to_dict()
    return {'product': one_product}
