import json
from pathlib import Path
from django.core.management.base import BaseCommand
from comments.models import Comment


class Command(BaseCommand):
    help = 'Seed the database with comments from the provided JSON file'

    def handle(self, *args, **options):
        json_path = Path(__file__).resolve().parents[4] / 'comments_threaded.json'

        with open(json_path) as f:
            data = json.load(f)

        Comment.objects.all().delete()

        id_map = {}
        for c in data['comments']:
            obj = Comment.objects.create(
                parent=id_map.get(c['parent']),
                author=c['author'],
                text=c['text'],
                date=c['date'],
                likes=c['likes'],
                image=c.get('image', ''),
            )
            id_map[c['id']] = obj

        self.stdout.write(self.style.SUCCESS(f'Seeded {len(id_map)} comments'))
