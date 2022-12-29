from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import Product
from app.forms import ProductForm, UpdateProductForm


products_routes = Blueprint('products', __name__)


# GET ALL PRODUCTS
@products_routes.route('/')
def get_all_products():

    all_products = Product.query.all()
    return {'products': [one_product.to_dict() for one_product in all_products]}


# GET ONE PRODUCT
@products_routes.route('/<int:id>')
def get_one_product(id):

    one_product = Product.query.get(id)
    return one_product.to_dict()


# ADD PRODUCT
@products_routes.route('/', methods=['POST'])
@login_required
def create_product():
    # print("ami in the route?????????????????????????????????????????????????")
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validat_on_submit():
        owner = current_user
        # all_products = Product.query.all()
        new_product = Product(
            owner_id=owner.id,
            name=form.data['name'],
            description=form.data['description'],
            price=form.data['price']
        )

        # all_products.append(new_product)
        db.session.add(new_product)
        db.session.commit()

        return new_product.to_dict()
    print(validation_errors_to_error_messages(form.errors))
    return {'errors': validation_errors_to_error_messages(form.errors)}, 403


# UPDATE PRODUCT
@products_routes.route('/<int:id>/edit', methohds=['PUT'])
@login_required
def update_product(id):
    product = Product.query.get(id)
    product_edit = product.to_dict()

    form = UpdateProductForm(
        name=product_edit['name']
        description=product_edit['description']
        price=product_edit['price']
    )
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        setattr(product, 'name', form.data['title'])
        setattr(product, 'description', form.data['description'])
        setattr(product, 'price', form.data['price'])

        db.session.commit()
        return product.to_dict()
    print(validation_errors_to_error_messages(form.errors))
    return {'errors': validation_errors_to_error_messages(form.errors)}, 403


# DELETE A PRODUCT
@products_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_product(id):
    product = Product.query.get(id)
    db.session.delete(product)
    db.session.commit()
    return {'message': 'Successfully deleted'}, 200
