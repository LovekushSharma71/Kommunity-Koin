import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

interface LoanFormProps {
  onSubmit: (loanData: {
    amount: number;
    duration: number;
    approvalMethod: string;
  }) => void;
}

const LoanForm: React.FC<LoanFormProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState<number>(0);
  const [duration, setDuration] = useState<number>(30); // Duration in days
  const [approvalMethod, setApprovalMethod] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      amount,
      duration,
      approvalMethod,
    });
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={5} shadow="md" borderWidth="1px" borderRadius="md">
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Loan Amount (ETH)</FormLabel>
          <NumberInput min={0} onChange={(_, value) => setAmount(value)}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Duration (Days)</FormLabel>
          <NumberInput min={1} max={365} value={duration} onChange={(_, value) => setDuration(value)}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Approval Method</FormLabel>
          <Select
            placeholder="Select approval method"
            value={approvalMethod}
            onChange={(e) => setApprovalMethod(e.target.value)}
          >
            <option value="ALGORITHMIC">Algorithmic</option>
            <option value="COMMUNITY_VOTE">Community Vote</option>
            <option value="LENDING_SYNDICATE">Lending Syndicate</option>
          </Select>
        </FormControl>

        <Button type="submit" colorScheme="blue" width="full">
          Submit Loan Request
        </Button>
      </VStack>
    </Box>
  );
};

export default LoanForm;