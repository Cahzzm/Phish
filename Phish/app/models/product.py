from .db import db, environment, SCHEMA, add_prefix_for_prod


class Product(db.Model):
    __tablename__ = 'products'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(300), nullable=False)
    price = db.Column(db.Float, nullable=False)

    products_cart = db.relationship('Cart', back_populates='cart_products')
    product_images = db.relationship('ProductImage', back_populates='images_product', cascade='all, delete')
    product_owner = db.relationship('User', back_populates='user_products')


    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.owner_id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'productImages': {
                product_image.to_dict()['id']: product_image.to_dict() for product_image in self.product_images
            }
        }


class ProductImage(db.Model):
    __tablename__ = 'product_images'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    preview = db.Column(db.Boolean, nullable=False)

    images_product = db.relationship('Product', back_populates='product_images')


    def to_dict(self):
        return {
            'id': self.id,
            'productId': self.product_id,
            'url': self.url,
            'preview': self.preview
        }
