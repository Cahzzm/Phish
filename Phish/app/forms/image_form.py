from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, URL


class ImageForm(FlaskForm):
    url = StringField(
        "Image URL",
        validators=[
            DataRequired(),
            URL(message="Please enter a valid URL for your image."),
        ],
    )
    submit = SubmitField("Submit")
