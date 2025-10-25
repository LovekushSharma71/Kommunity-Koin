import React from 'react';
import { Box, Heading, Text, VStack, Badge, Button } from '@chakra-ui/react';

interface Loan {
  id: number;
  amount: string;
  status: string;
  approvalMethod: string;
  dueDate: string;
}

interface LoanListProps {
  loans: Loan[];
  onVote?: (loanId: number, approved: boolean) => void;
  onContribute?: (loanId: number) => void;
}

const LoanList: React.FC<LoanListProps> = ({ loans, onVote, onContribute }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'green';
      case 'PENDING':
        return 'yellow';
      case 'REJECTED':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <Heading size="md">Active Loans</Heading>
      {loans.map((loan) => (
        <Box key={loan.id} p={4} shadow="md" borderWidth="1px" borderRadius="md">
          <VStack align="start" spacing={2}>
            <Text fontWeight="bold">
              Amount: {loan.amount} ETH
              <Badge ml={2} colorScheme={getStatusColor(loan.status)}>
                {loan.status}
              </Badge>
            </Text>
            <Text>Approval Method: {loan.approvalMethod}</Text>
            <Text>Due Date: {loan.dueDate}</Text>
            
            {loan.status === 'PENDING' && loan.approvalMethod === 'COMMUNITY_VOTE' && onVote && (
              <Box mt={2}>
                <Button size="sm" colorScheme="green" mr={2} onClick={() => onVote(loan.id, true)}>
                  Approve
                </Button>
                <Button size="sm" colorScheme="red" onClick={() => onVote(loan.id, false)}>
                  Reject
                </Button>
              </Box>
            )}

            {loan.status === 'PENDING' && loan.approvalMethod === 'LENDING_SYNDICATE' && onContribute && (
              <Button
                size="sm"
                colorScheme="blue"
                onClick={() => onContribute(loan.id)}
                mt={2}
              >
                Contribute
              </Button>
            )}
          </VStack>
        </Box>
      ))}
    </VStack>
  );
};

export default LoanList;