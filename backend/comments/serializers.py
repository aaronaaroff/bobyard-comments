from rest_framework import serializers
from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

    def get_replies(self, obj):
        if obj.parent is not None:
            self.get_replies(obj.parent)
        replies = obj.replies.all()
        return CommentSerializer(replies, many=False).data
