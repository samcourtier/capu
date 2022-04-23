from django.test import TestCase, Client

from .models import Post


class AppTest(TestCase):
    def test_index(self):
        self.posts = [
            Post.objects.create(
                title="Post 1 Title",
                subtitle="Post 1 Subtitle",
                body="Post 1 Body",
                display_priority=1,
            ),
            Post.objects.create(
                title="Post 2 Title - Hidden Post",
                subtitle="Post 2 Subtitle",
                body="Post 2 Body",
                display_priority=0,
            ),
        ]
        self.posts[0].attributes.create(
            name="PostAttribute 1 Name",
            value="PostAttribute 1 Value",
            display_priority=1,
        )
        self.posts[0].attributes.create(
            name="PostAttribute 2 Name - Hidden Attribute",
            value="PostAttribute 2 Value",
            display_priority=0,
        )
        client = Client()

        response = client.get("/")
        assert response.status_code == 200
        rendered_posts = response.context["posts"]
        assert rendered_posts.count() == 1
        assert rendered_posts.first().attributes.count() == 1
