from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import Product
from app.forms import product_form


products_routes = Blueprint('product', __name__)


@products_routes.route('/')
def get_all_products():
    all_products = Product.query.all()
    return {'products': [one_product.to_dict() for one_product in all_products]}


@products_routes.route('/<int:id>')
def get_one_product(id):
    product = Product.query.get(id)
    one_product = product.to_dict()
    return {'product': one_product}


@products_routes.route('/', methods=['POST'])
@login_required
def create_product():
    form = ProductForm()
    owner = current_user.to_dict()
    all_products = Product.query.all()
    form['csrf_token'].data = request.cookies['csrf_token']
    new_product = Product(
        owner_id=owner.id,
        name=form.name.data,
        description=form.description.data,
        price=form.price.data
    )

    all_products.append(new_product)
    db.session.add(new_product)
    db.session.commit()

    return {'product': new_product.to_dict()}
