from flask.cli import AppGroup
from .users import seed_users, undo_users
from .carts import seed_carts, undo_carts
from .cart_items import seed_cart_items, undo_cart_items
from .product_images import seed_product_images, undo_product_images
from .products import seed_products, undo_products


from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_product_images()
        undo_cart_items()
        undo_carts()
        undo_products()
        undo_users()
    seed_users()
    seed_products()
    seed_carts()
    seed_cart_items()
    seed_product_images()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_product_images()
    undo_cart_items()
    undo_carts()
    undo_products()
    undo_users()
    # Add other undo functions here
