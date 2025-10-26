from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Community, Member, Loan, Vote, LendingSyndicate, SyndicateContribution
from .serializers import (
    CommunitySerializer,
    MemberSerializer,
    LoanSerializer,
    VoteSerializer,
    LendingSyndicateSerializer,
    SyndicateContributionSerializer,
)

class CommunityViewSet(viewsets.ModelViewSet):
    queryset = Community.objects.all()
    serializer_class = CommunitySerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(admin=self.request.user)

    @action(detail=True, methods=['post'])
    def join(self, request, pk=None):
        community = self.get_object()
        user = request.user
        
        if Member.objects.filter(user=user, community=community).exists():
            return Response(
                {'detail': 'Already a member of this community'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        Member.objects.create(user=user, community=community)
        return Response({'detail': 'Successfully joined the community'})

class LoanViewSet(viewsets.ModelViewSet):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Loan.objects.filter(borrower__user=self.request.user)

    @action(detail=True, methods=['post'])
    def vote(self, request, pk=None):
        loan = self.get_object()
        user = request.user
        approved = request.data.get('approved', False)
        
        if loan.approval_method != Loan.ApprovalMethod.COMMUNITY_VOTE:
            return Response(
                {'detail': 'This loan does not require community voting'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        member = get_object_or_404(Member, user=user, community=loan.borrower.community)
        vote, created = Vote.objects.get_or_create(
            loan=loan,
            voter=member,
            defaults={'approved': approved}
        )
        
        if not created:
            vote.approved = approved
            vote.save()
        
        return Response({'detail': 'Vote recorded successfully'})

class LendingSyndicateViewSet(viewsets.ModelViewSet):
    queryset = LendingSyndicate.objects.all()
    serializer_class = LendingSyndicateSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=['post'])
    def contribute(self, request, pk=None):
        syndicate = self.get_object()
        user = request.user
        amount = request.data.get('amount')
        
        if not amount:
            return Response(
                {'detail': 'Amount is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        member = get_object_or_404(
            Member,
            user=user,
            community=syndicate.loan.borrower.community
        )
        
        contribution = SyndicateContribution.objects.create(
            syndicate=syndicate,
            contributor=member,
            amount=amount
        )
        
        syndicate.total_pledged += amount
        syndicate.save()
        
        return Response({
            'detail': 'Contribution recorded successfully',
            'total_pledged': syndicate.total_pledged
        })
