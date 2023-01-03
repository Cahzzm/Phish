from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Length, NumberRange, URL


class ProductForm(FlaskForm):
    name = StringField(
        "name",
        validators=[
            DataRequired(),
            Length(min=3, message="Please provide a name of at least 3 characters"),
        ],
    )
    description = StringField(
        "Description",
        validators=[
            DataRequired("Please Provide a description of at least 10 characters"),
            Length(
                min=10,
                message="Please Provide a description of at least 10 characters",
            ),
        ],
    )
    price = IntegerField("Price", validators=[DataRequired(), NumberRange(0)])
    preview_img_url = StringField(
        "Preview Image URL",
        validators=[
            DataRequired(),
            Length(
                min=0,
                max=2000,
                message="The image URL must be less than 2000 characters.",
            ),
            URL(message="Please enter a valid URL for your image."),
        ],
    )
    submit = SubmitField("Submit")


class ProductUpdateForm(FlaskForm):
    name = StringField(
        "name",
        validators=[
            DataRequired(),
            Length(min=3, message="A name of at least 3 characters would be better!"),
        ],
    )
    description = StringField(
        "Description",
        validators=[
            DataRequired("Please Provide a description of at least 10 characters"),
            Length(
                min=10,
                message="Please provide a description of at least 10 characters",
            ),
        ],
    )
    price = IntegerField("Price", validators=[DataRequired(), NumberRange(0)])
    submit = SubmitField("Submit")
