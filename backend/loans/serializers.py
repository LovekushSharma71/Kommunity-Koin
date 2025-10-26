from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Community, Member, Loan, Vote, LendingSyndicate, SyndicateContribution

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class CommunitySerializer(serializers.ModelSerializer):
    admin = UserSerializer(read_only=True)
    
    class Meta:
        model = Community
        fields = '__all__'

class MemberSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    community = CommunitySerializer(read_only=True)
    
    class Meta:
        model = Member
        fields = '__all__'

class LoanSerializer(serializers.ModelSerializer):
    borrower = MemberSerializer(read_only=True)
    
    class Meta:
        model = Loan
        fields = '__all__'

class VoteSerializer(serializers.ModelSerializer):
    voter = MemberSerializer(read_only=True)
    
    class Meta:
        model = Vote
        fields = '__all__'

class LendingSyndicateSerializer(serializers.ModelSerializer):
    loan = LoanSerializer(read_only=True)
    
    class Meta:
        model = LendingSyndicate
        fields = '__all__'

class SyndicateContributionSerializer(serializers.ModelSerializer):
    contributor = MemberSerializer(read_only=True)
    syndicate = LendingSyndicateSerializer(read_only=True)
    
    class Meta:
        model = SyndicateContribution
        fields = '__all__'