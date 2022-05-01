from pathlib import Path

from django.db import migrations


MIGRATIONS = Path(__file__).resolve().parent


class Migration(migrations.Migration):
    dependencies = [("app", "0001_add_posts")]
    operations = [
        migrations.RunSQL(
            sql=open(MIGRATIONS / "0002F_add_planned_rides.sql").read(),
            reverse_sql=open(MIGRATIONS / "0002R_remove_planned_rides.sql").read(),
        ),
    ]
