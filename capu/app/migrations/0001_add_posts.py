from pathlib import Path
from django.db import migrations


MIGRATIONS = Path("app", "migrations")


class Migration(migrations.Migration):
    initial = True
    dependencies = []
    operations = [
        migrations.RunSQL(
            sql=open(MIGRATIONS / "0001F_add_posts.sql").read(),
            reverse_sql=open(MIGRATIONS / "0001R_remove_posts.sql").read(),
        )
    ]
