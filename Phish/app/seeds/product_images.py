from app.models import db, ProductImage, environment, SCHEMA


def seed_product_images():
    product_image1 = ProductImage(
        product_id=1,
        url='https://canary.contestimg.wish.com/api/webimage/5ce279b9b9f1107a394fd3cd-normal.jpg?cache_buster=49404b7afcd428f6fec381d66ba0eee9',
        preview=True
    )

    product_image2 = ProductImage(
        product_id=2,
        url='https://canary.contestimg.wish.com/api/webimage/60ae12ec6d4f8b53d3bcbd19-normal.jpg?cache_buster=fabab68dfa0b9d825783874dc59b0535',
        preview=True
    )

    db.session.add(product_image1)
    db.session.add(product_image2)
    db.session.commit()


def undo_product_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM product_images")

    db.session.commit()
