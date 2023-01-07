from app.models import db, ProductImage, environment, SCHEMA


def seed_product_images():
    product_image1 = ProductImage(
        product_id=1,
        url='https://canary.contestimg.wish.com/api/webimage/5ce279b9b9f1107a394fd3cd-normal.jpg?cache_buster=49404b7afcd428f6fec381d66ba0eee9',
    )

    product_image2 = ProductImage(
        product_id=2,
        url='https://canary.contestimg.wish.com/api/webimage/60ae12ec6d4f8b53d3bcbd19-normal.jpg?cache_buster=fabab68dfa0b9d825783874dc59b0535',
    )
    product_image3 = ProductImage(
        product_id=3,
        url='https://canary.contestimg.wish.com/api/webimage/626f7ca067ea96ea8992bd91-normal.jpg?cache_buster=50b10bd0e8aa696629695334c303f50d',
    )
    product_image4 = ProductImage(
        product_id=4,
        url='https://canary.contestimg.wish.com/api/webimage/5dea888213241d0f3c9bbd17-normal.jpg?cache_buster=84153a7cf689fbc2b8e8dc3381bc73cd',
    )
    product_image5 = ProductImage(
        product_id=5,
        url='https://canary.contestimg.wish.com/api/webimage/5e031387c9bf0903f5ad0309-normal.jpg?cache_buster=e0f304c5099d29c3a4e0f9e3d1d8b96c',
    )
    product_image6 = ProductImage(
        product_id=6,
        url='https://canary.contestimg.wish.com/api/webimage/61691ba9c8db92e87964c784-normal.jpg?cache_buster=ddf583631982e389761bb691b832c036',
    )
    product_image7 = ProductImage(
        product_id=7,
        url='https://canary.contestimg.wish.com/api/webimage/61b1d54ed5c11040f426cb43-normal.jpg?cache_buster=4dd337ff393b3e23cfacc9ce96c71189',
    )
    product_image8 = ProductImage(
        product_id=8,
        url='https://canary.contestimg.wish.com/api/webimage/61dfa40b19935c53aecd981b-normal.jpg?cache_buster=dbd18c73c2fdaa88e0c0900bf55f1965',
    )
    product_image9 = ProductImage(
        product_id=9,
        url='https://canary.contestimg.wish.com/api/webimage/60b618d367fd8d0504bec00f-normal.jpg?cache_buster=26f7414039f8647f3c5c59155560e6f9',
    )
    product_image10 = ProductImage(
        product_id=10,
        url='https://canary.contestimg.wish.com/api/webimage/5bb0acf4dbffed46292cd0ce-normal.jpg?cache_buster=e168969e8f735f7cd0d53e0dc5021b2c',
    )
    product_image11= ProductImage(
        product_id=11,
        url='https://canary.contestimg.wish.com/api/webimage/61b2fd9a1929542c101d518c-normal.jpg?cache_buster=750e39f798d75f68d4fde6d85a47d3f7',
    )
    product_image12= ProductImage(
        product_id=12,
        url='https://canary.contestimg.wish.com/api/webimage/605d7452cd9b97fd33cf3add-normal.jpg?cache_buster=79312e0f21f41d6064a085efff483c6f',
    )
    product_image13= ProductImage(
        product_id=13,
        url='https://canary.contestimg.wish.com/api/webimage/61a8caea9c5a82ad58f3a7f7-normal.jpg?cache_buster=42f3796aeff6181cdda1c56b224e4ca2',
    )
    product_image14= ProductImage(
        product_id=14,
        url='https://canary.contestimg.wish.com/api/webimage/61ea67776758adb248decd9e-normal.jpg?cache_buster=7278078b17afa489376b249def1d5a35',
    )
    product_image15= ProductImage(
        product_id=15,
        url='https://canary.contestimg.wish.com/api/webimage/5fd97d36ad2ede90ff1358e1-normal.jpg?cache_buster=fb9bd8de1431f3d229db6f92a683b680',
    )
    product_image16= ProductImage(
        product_id=16,
        url='https://canary.contestimg.wish.com/api/webimage/619899ad9df7da120d6f4f87-normal.jpg?cache_buster=a058008b581c8d2b4fc5a84e24edba88',
    )
    product_image17= ProductImage(
        product_id=17,
        url='https://canary.contestimg.wish.com/api/webimage/61810e1fdc96060c4df8959e-normal.jpg?cache_buster=eab6a6e2b491df9fe49c7d1594842184',
    )
    product_image18= ProductImage(
        product_id=18,
        url='https://canary.contestimg.wish.com/api/webimage/5e8ec43efc800305a688039d-normal.jpg?cache_buster=c94924cbbb2f526849f2ee3c83ae2f78',
    )
    product_image19= ProductImage(
        product_id=19,
        url='https://canary.contestimg.wish.com/api/webimage/5eb3aaee9dd6ca2a52b11595-normal.jpg?cache_buster=41c5d24da840658bf805e50ae049903b',
    )
    product_image20= ProductImage(
        product_id=20,
        url='https://canary.contestimg.wish.com/api/webimage/5a6061e66cecb95716a706b1-normal.jpg?cache_buster=48b2b7ad0b33fdf57fbfa950a105debb',
    )
    product_image21= ProductImage(
        product_id=21,
        url='https://canary.contestimg.wish.com/api/webimage/6073f4284034c2b623d9f33c-normal.jpg?cache_buster=4886b0620742145eddfd3ca5a70968a9',
    )
    product_image22= ProductImage(
        product_id=22,
        url='https://canary.contestimg.wish.com/api/webimage/5e62f3bb01ecd406bee88644-normal.jpg?cache_buster=3eec3e88e88260710a0c84c95bae7289',
    )

    db.session.add(product_image1)
    db.session.add(product_image2)
    db.session.add(product_image3)
    db.session.add(product_image4)
    db.session.add(product_image5)
    db.session.add(product_image6)
    db.session.add(product_image7)
    db.session.add(product_image8)
    db.session.add(product_image9)
    db.session.add(product_image10)
    db.session.add(product_image11)
    db.session.add(product_image12)
    db.session.add(product_image13)
    db.session.add(product_image14)
    db.session.add(product_image15)
    db.session.add(product_image16)
    db.session.add(product_image17)
    db.session.add(product_image18)
    db.session.add(product_image19)
    db.session.add(product_image20)
    db.session.add(product_image21)
    db.session.add(product_image22)

    db.session.commit()


def undo_product_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM product_images")

    db.session.commit()
