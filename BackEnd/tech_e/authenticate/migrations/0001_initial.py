# Generated by Django 4.1.3 on 2022-12-19 02:48

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='user_profile', serialize=False, to=settings.AUTH_USER_MODEL)),
                ('is_seller', models.BooleanField(blank=True, default=False)),
                ('gender', models.BooleanField(blank=True, null=True)),
                ('birthday', models.DateField(blank=True, null=True)),
                ('phone', models.CharField(blank=True, max_length=10, null=True)),
                ('address', models.CharField(blank=True, max_length=100, null=True)),
                ('account_no', models.CharField(blank=True, max_length=100, null=True)),
                ('cart_count', models.IntegerField(blank=True, default=0)),
                ('avt', models.ImageField(blank=True, max_length=255, null=True, upload_to='pictures/avt/')),
            ],
        ),
        migrations.CreateModel(
            name='Seller',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='authenticate.userprofile')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('modified_at', models.DateTimeField(auto_now=True)),
                ('account_no', models.CharField(blank=True, max_length=255)),
                ('name_store', models.CharField(max_length=100)),
                ('facebook', models.URLField(blank=True, max_length=256, null=True)),
                ('product_count', models.FloatField(blank=True, default=0)),
                ('follower_count', models.IntegerField(blank=True, default=0)),
                ('rating_average', models.FloatField(blank=True, default=0)),
                ('response_rate', models.FloatField(blank=True, default=0)),
                ('logo', models.ImageField(blank=True, max_length=255, upload_to='pictures/logo/')),
            ],
        ),
    ]
