import json
from pathlib import Path
from django.core.management.base import BaseCommand
from comments.models import Comment


class Command(BaseCommand):
    help = 'Seed the database with comments from the provided JSON file'

    def handle(self, *args, **options):
        json_path = Path(__file__).resolve().parents[4] / 'Copy of comments.json'

        with open(json_path) as f:
            data = json.load(f)

        Comment.objects.all().delete()

        comments = [
            Comment(
                author=c['author'],
                text=c['text'],
                date=c['date'],
                likes=c['likes'],
                image=c.get('image', ''),
            )
            for c in data['comments']
        ]

        Comment.objects.bulk_create(comments)
        self.stdout.write(self.style.SUCCESS(f'Seeded {len(comments)} comments'))
