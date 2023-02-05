from flask import Blueprint, jsonify, render_template, request, redirect
from flask_login import login_required, current_user
from app.models import db, Product, ProductImage
from app.forms import ProductUpdateForm, ProductForm, ProductSearchForm
from .auth_routes import validation_errors_to_error_messages
import json
from sqlalchemy import or_


products_routes = Blueprint("products", __name__)


# GET ALL PRODUCTS
@products_routes.route("/")
def get_products():
    products = Product.query.all()
    return {"Products": [product.to_dict() for product in products]}


# GET A SINGLE PRODUCT
@products_routes.route("/<int:id>")
def get_one_product(id):
    product = Product.query.get(id)
    return product.to_dict()


# CREATE A NEW PRODUCT
@products_routes.route("/new", methods=["POST"])
@login_required
def post_product():
    form = ProductForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data
        # print('\\\\\\\\\\\\\\fordata////////////',data)

        new_product = Product(
            name=data["name"],
            description=data["description"],
            owner_id=current_user.get_id(),
            price=data["price"],
            # preview_img_id=0,
        )

        db.session.add(new_product)
        db.session.commit()
        # print('=======new product==========',new_product.product_images)

        new_preview_img = ProductImage(
            product_id=new_product.id,
            url=data["preview_img_url"]
        )

        db.session.add(new_preview_img)
        db.session.commit()
        # print('=======new image==========',new_preview_img.to_dict())


        # setattr(new_product, "preview_img_id", new_preview_img.to_dict()["id"])

        db.session.commit()

        return new_product.to_dict()
    print(validation_errors_to_error_messages(form.errors))
    return {"errors": validation_errors_to_error_messages(form.errors)}, 403


# UPDATE A SINGLE PRODUCT
@products_routes.route("/<int:id>/edit", methods=["PUT"])
@login_required
def update_product(id):
    product = Product.query.get(id)
    product_dict = product.to_dict()

    form = ProductUpdateForm(
        name=product_dict["name"],
        description=product_dict["description"],
        price=product_dict["price"],
    )

    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data

        setattr(product, "name", data["name"])
        setattr(product, "description", data["description"])
        setattr(product, "price", data["price"])

        db.session.commit()
        return product.to_dict()
    print(validation_errors_to_error_messages(form.errors))
    return {"errors": validation_errors_to_error_messages(form.errors)}, 403


# DELETE A SINGLE PRODUCT
@products_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_product(id):
    product = Product.query.get(id)
    db.session.delete(product)
    db.session.commit()
    return {"message": "Successfully deleted", "status_code": 200}


# GET SEARCHED PRODUCTS
@products_routes.route("/search", methods=["POST", "GET"])
def get_searched_products():
    form = ProductSearchForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    search = form.search.data
    search = f"%{search}%"

    products = Product.query.filter(
        Product.name.ilike(f"%{search}%")
    ).all()

    products_to_dict = [p.to_dict() for p in products]

    return {"products": products_to_dict}
