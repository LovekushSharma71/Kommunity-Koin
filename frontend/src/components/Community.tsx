import React from 'react';
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';

interface CommunityProps {
  name: string;
  memberCount: number;
  poolAmount: string;
  onJoin: () => void;
}

const Community: React.FC<CommunityProps> = ({ name, memberCount, poolAmount, onJoin }) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
      <VStack align="start" spacing={3}>
        <Heading size="md">{name}</Heading>
        <Text>Members: {memberCount}</Text>
        <Text>Pool Amount: {poolAmount} ETH</Text>
        <Button colorScheme="blue" onClick={onJoin}>
          Join Community
        </Button>
      </VStack>
    </Box>
  );
};

export default Community;