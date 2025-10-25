import React from 'react';
import { Box, Flex, Button, Text, useColorModeValue, useToast } from '@chakra-ui/react';
import { ethers } from 'ethers';

interface NavbarProps {
  isConnected: boolean;
  account?: string;
  onConnect: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isConnected, account, onConnect }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const toast = useToast();

  const handleConnect = async () => {
    try {
      await onConnect();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to connect wallet',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg={bgColor} px={4} shadow="sm">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold">
          Kommunity Koin
        </Text>

        <Flex alignItems="center">
          {isConnected && account ? (
            <Text>
              {account.substring(0, 6)}...{account.substring(account.length - 4)}
            </Text>
          ) : (
            <Button colorScheme="blue" onClick={handleConnect}>
              Connect Wallet
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;