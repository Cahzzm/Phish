from .db import db, environment, SCHEMA, add_prefix_for_prod


class Cart(db.Model):
    __tablename__ = 'carts'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    total = db.Column(db.Float, nullable=False)

    cart_products = db.relationship('Product', back_populates='products_cart', cascade='all, delete')
    cart_user = db.relationship('User', back_populates='user_cart')


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'total': self.total,
            'cartProducts': {
                cart_product.to_dict()['id']: cart_product.to_dict() for cart_product in self.cart_products
            },
            'cartUser': self.cart_user.to_dict()
        }
