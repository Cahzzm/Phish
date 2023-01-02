from flask import Blueprint, jsonify, request, redirect, render_template
from flask_login import login_required
from app.models import db, Product, ProductImage
from app.forms import ImageForm
from .auth_routes import validation_errors_to_error_messages


images_routes = Blueprint("images", __name__)


# GET ALL IMAGES
@images_routes.route("")
def get_images():
    images = ProductImage.query.all()
    return {"Images": [image.to_dict() for image in images]}


# CREATE A NEW IMAGE:
@images_routes.route("/<int:product_id>/new", methods=["POST"])
def create_image(product_id):
    form = ImageForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data

        new_img = ProductImage(product_id=product_id, url=data["url"])

        db.session.add(new_img)
        db.session.commit()

        return new_img.to_dict(), 201
    print(validation_errors_to_error_messages(form.errors))
    return {"errors": validation_errors_to_error_messages(form.errors)}, 403

# UPDATE A SINGLE IMAGE URL:
@images_routes.route("<int:id>/update", methods=["PUT"])
@login_required
def update_product_image(id):
    product_image = ProductImage.query.get(id)
    product_image_dict = product_image.to_dict()

    form = ImageForm(url=product_image_dict["url"])

    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data

        setattr(product_image, "url", data["url"])

        db.session.commit()
        return product_image.to_dict()
    print(validation_errors_to_error_messages(form.errors))
    return {"errors": validation_errors_to_error_messages(form.errors)}, 403

# DELETE A SINGLE PRODUCT IMAGE:
@images_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_product_img(id):
    product_image = ProductImage.query.get(id)
    db.session.delete(product_image)
    db.session.commit()
    return {"message": "Successfully deleted", "status_code": 200}
