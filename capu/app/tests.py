from django.contrib.admin import AdminSite
from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from django.test import Client, RequestFactory, TestCase

from .admin import PostAdmin
from .models import Post

POST_PATH = "/admin/app/post"


class AppTest(TestCase):
    def setUp(self):
        # N.B. This cache isn't automatically cleared between tests; it causes
        # foreign key constraint violation errors on the "django_admin_log"
        # tables, making it look like the tests have failed.
        ContentType.objects.clear_cache()

        self.client = Client()
        self._add_posts_via_admin()

    def _add_posts_via_admin(self):
        superuser = User.objects.create_superuser(username="capu", password="capu")
        self.client.force_login(superuser)

        self.assertEqual(Post.objects.count(), 0)
        response = self.client.post(
            POST_PATH + "/add/",  # N.B.: The trailing / is required.
            {
                "title": "Post 1 Title",
                "subtitle": "Post 1 Subtitle",
                "body": "Post 1 Body",
                "display_priority": "1",
                "attributes-TOTAL_FORMS": "2",
                "attributes-INITIAL_FORMS": "0",
                "attributes-MIN_NUM_FORMS": "0",
                "attributes-MAX_NUM_FORMS": "1000",
                "attributes-0-id": "",
                "attributes-0-post": "",
                "attributes-0-name": "Post 1 Attribute 1 Name",
                "attributes-0-value": "Post 1 Attribute 1 Value",
                "attributes-0-display_priority": "1",
                "attributes-1-id": "",
                "attributes-1-post": "",
                "attributes-1-name": "Post 1 Attribute 2 (hidden) Name",
                "attributes-1-value": "Post 1 Attribute 2 (hidden) Value",
                "attributes-1-display_priority": "0",
                "_save": "Save",
            },
        )
        self.assertEqual(response.status_code, 302)

        response = self.client.post(
            POST_PATH + "/add/",
            {
                "title": "Post 2 (hidden) Title",
                "subtitle": "Post 2 (hidden) Subtitle",
                "body": "Post 2 (hidden) Body",
                "display_priority": "0",
                "attributes-TOTAL_FORMS": "0",
                "attributes-INITIAL_FORMS": "0",
                "attributes-MIN_NUM_FORMS": "0",
                "attributes-MAX_NUM_FORMS": "1000",
                "_save": "Save",
            },
        )
        self.assertEqual(response.status_code, 302)

        self.client.logout()

    def test_posts_can_be_added_via_admin(self):
        self.assertEqual(Post.objects.count(), 2)
        self.assertEqual(Post.objects.get(display_priority=1).attributes.count(), 2)

    def test_initial_display_priority_is_current_highest_plus_one(self):
        post_admin = PostAdmin(model=Post, admin_site=AdminSite())
        initial_data = post_admin.get_changeform_initial_data(
            request=RequestFactory().request()
        )
        self.assertEqual(initial_data["display_priority"], 2)

    def test_index_renders_nonzero_priority_posts(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)

        rendered_posts = response.context["posts"]
        self.assertEqual(rendered_posts.count(), 1)
        self.assertEqual(rendered_posts.first().attributes.count(), 1)
