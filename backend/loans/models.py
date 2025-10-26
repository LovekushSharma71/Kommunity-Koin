from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator

class Community(models.Model):
    name = models.CharField(max_length=100)
    admin = models.ForeignKey(User, on_delete=models.CASCADE, related_name='administered_communities')
    membership_fee = models.DecimalField(max_digits=18, decimal_places=8)
    quorum = models.IntegerField(validators=[MinValueValidator(1)])
    voting_duration = models.IntegerField(help_text='Voting duration in seconds')
    community_pool = models.DecimalField(max_digits=18, decimal_places=8, default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Member(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    community = models.ForeignKey(Community, on_delete=models.CASCADE)
    reputation_score = models.IntegerField(default=100)
    last_loan_timestamp = models.DateTimeField(null=True, blank=True)
    total_loans_repaid = models.IntegerField(default=0)
    total_defaulted = models.IntegerField(default=0)
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'community')

    def __str__(self):
        return f"{self.user.username} in {self.community.name}"

class Loan(models.Model):
    class LoanTier(models.TextChoices):
        MICRO = 'MICRO', 'Micro'
        SMALL = 'SMALL', 'Small'
        MEDIUM = 'MEDIUM', 'Medium'
        LARGE = 'LARGE', 'Large'

    class ApprovalMethod(models.TextChoices):
        ALGORITHMIC = 'ALGORITHMIC', 'Algorithmic'
        COMMUNITY_VOTE = 'COMMUNITY_VOTE', 'Community Vote'
        LENDING_SYNDICATE = 'LENDING_SYNDICATE', 'Lending Syndicate'

    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        APPROVED = 'APPROVED', 'Approved'
        REJECTED = 'REJECTED', 'Rejected'
        ACTIVE = 'ACTIVE', 'Active'
        REPAID = 'REPAID', 'Repaid'
        DEFAULTED = 'DEFAULTED', 'Defaulted'

    borrower = models.ForeignKey(Member, on_delete=models.CASCADE, related_name='loans')
    amount = models.DecimalField(max_digits=18, decimal_places=8)
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2)
    duration = models.IntegerField(help_text='Loan duration in seconds')
    tier = models.CharField(max_length=10, choices=LoanTier.choices)
    approval_method = models.CharField(max_length=20, choices=ApprovalMethod.choices)
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.PENDING)
    due_date = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Loan {self.id} - {self.borrower.user.username}"

class Vote(models.Model):
    loan = models.ForeignKey(Loan, on_delete=models.CASCADE, related_name='votes')
    voter = models.ForeignKey(Member, on_delete=models.CASCADE)
    approved = models.BooleanField()
    voted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('loan', 'voter')

    def __str__(self):
        return f"Vote on Loan {self.loan.id} by {self.voter.user.username}"

class LendingSyndicate(models.Model):
    loan = models.OneToOneField(Loan, on_delete=models.CASCADE, related_name='syndicate')
    min_contribution = models.DecimalField(max_digits=18, decimal_places=8)
    max_contribution = models.DecimalField(max_digits=18, decimal_places=8)
    total_pledged = models.DecimalField(max_digits=18, decimal_places=8, default=0)
    deadline = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Syndicate for Loan {self.loan.id}"

class SyndicateContribution(models.Model):
    syndicate = models.ForeignKey(LendingSyndicate, on_delete=models.CASCADE, related_name='contributions')
    contributor = models.ForeignKey(Member, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=18, decimal_places=8)
    contributed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Contribution to Loan {self.syndicate.loan.id} by {self.contributor.user.username}"
