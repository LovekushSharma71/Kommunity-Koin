import React, { useState, useEffect } from 'react';
import { ChakraProvider, Container, VStack } from '@chakra-ui/react';
import { ethers } from 'ethers';
import Navbar from './components/Navbar';
import Community from './components/Community';
import LoanForm from './components/LoanForm';
import LoanList from './components/LoanList';
import './App.css';

declare global {
  interface Window {
    ethereum?: any;
  }
}

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string>();
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = web3Provider.getSigner();
        const address = await signer.getAddress();
        
        setProvider(web3Provider);
        setAccount(address);
        setIsConnected(true);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      alert('Please install MetaMask');
    }
  };

  return (
    <ChakraProvider>
      <div className="App">
        <Navbar
          isConnected={isConnected}
          account={account}
          onConnect={connectWallet}
        />
        <Container maxW="container.xl" py={8}>
          <VStack spacing={8}>
            {isConnected ? (
              <>
                <Community
                  name="Test Community"
                  memberCount={10}
                  poolAmount="100"
                  onJoin={() => console.log('Joining community...')}
                />
                <LoanForm
                  onSubmit={(loanData) => console.log('Loan request:', loanData)}
                />
                <LoanList
                  loans={[
                    {
                      id: 1,
                      amount: '10',
                      status: 'PENDING',
                      approvalMethod: 'COMMUNITY_VOTE',
                      dueDate: '2024-12-31',
                    },
                  ]}
                  onVote={(loanId, approved) =>
                    console.log(`Voting ${approved ? 'yes' : 'no'} on loan ${loanId}`)
                  }
                  onContribute={(loanId) =>
                    console.log(`Contributing to loan ${loanId}`)
                  }
                />
              </>
            ) : (
              <VStack spacing={4}>
                <h1>Welcome to Kommunity Koin</h1>
                <p>Please connect your wallet to continue</p>
              </VStack>
            )}
          </VStack>
        </Container>
      </div>
    </ChakraProvider>
  );
}
          import React, { useState } from 'react';
import { ChakraProvider, Container, Box, Text, Heading } from '@chakra-ui/react';
import { ethers } from 'ethers';
import Navbar from './components/Navbar';
import Community from './components/Community';
import LoanForm from './components/LoanForm';
import LoanList from './components/LoanList';
import './App.css';

declare global {
  interface Window {
    ethereum?: any;
  }
}

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string>();
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = web3Provider.getSigner();
        const address = await signer.getAddress();
        
        setProvider(web3Provider);
        setAccount(address);
        setIsConnected(true);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      alert('Please install MetaMask');
    }
  };

  return (
    <ChakraProvider>
      <Box className="App">
        <Navbar
          isConnected={isConnected}
          account={account}
          onConnect={connectWallet}
        />
        <Container maxW="container.xl" py={8}>
          <Box spacing={8}>
            {isConnected ? (
              <>
                <Community
                  name="Test Community"
                  memberCount={10}
                  poolAmount="100"
                  onJoin={() => console.log('Joining community...')}
                />
                <Box mt={8}>
                  <LoanForm
                    onSubmit={(loanData) => console.log('Loan request:', loanData)}
                  />
                </Box>
                <Box mt={8}>
                  <LoanList
                    loans={[
                      {
                        id: 1,
                        amount: '10',
                        status: 'PENDING',
                        approvalMethod: 'COMMUNITY_VOTE',
                        dueDate: '2024-12-31',
                      },
                    ]}
                    onVote={(loanId, approved) =>
                      console.log(`Voting ${approved ? 'yes' : 'no'} on loan ${loanId}`)
                    }
                    onContribute={(loanId) =>
                      console.log(`Contributing to loan ${loanId}`)
                    }
                  />
                </Box>
              </>
            ) : (
              <Box textAlign="center" py={10}>
                <Heading as="h1" size="xl" mb={4}>
                  Welcome to Kommunity Koin
                </Heading>
                <Text fontSize="lg">
                  Please connect your wallet to continue
                </Text>
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
