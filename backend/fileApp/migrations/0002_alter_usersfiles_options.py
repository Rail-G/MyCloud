# Generated by Django 5.1.6 on 2025-03-13 14:35

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("fileApp", "0001_initial"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="usersfiles",
            options={
                "verbose_name": "Файл пользователя",
                "verbose_name_plural": "Файлы пользователей",
            },
        ),
    ]
