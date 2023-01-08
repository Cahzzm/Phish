from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(message='Please provide a username'), Length(min=3, max=25, message='Please make a username between 3 - 25 characters'), username_exists])
    email = StringField('email', validators=[DataRequired('Please provide an email'), user_exists])
    password = StringField('password', validators=[DataRequired('Please provide a password'), Length(min=5, max=16, message='please create a password between 5 - 16 characters')])
