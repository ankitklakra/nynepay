import React, { useState } from 'react';
import { Button, useToast, Box, Text, VStack } from '@chakra-ui/react';
import addDummyProducts from '../../Config/addDummyData';

const AddDummyData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');
  const toast = useToast();

  const handleAddDummyData = async () => {
    setIsLoading(true);
    setStatus('Starting data addition process...');
    
    try {
      await addDummyProducts();
      setStatus('Data added successfully!');
      toast({
        title: 'Success',
        description: 'Dummy data has been added to the database',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      setStatus('Error adding data');
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack spacing={4} align="stretch" p={4} bg="white" borderRadius="md" boxShadow="sm">
      <Text fontSize="lg" fontWeight="bold">Add Dummy Data</Text>
      <Text fontSize="sm" color="gray.600">
        This will add sample categories and products to your database. 
        This is useful for testing and demonstration purposes.
      </Text>
      <Button
        colorScheme="blue"
        onClick={handleAddDummyData}
        isLoading={isLoading}
        loadingText="Adding Data..."
      >
        Add Dummy Data
      </Button>
      {status && (
        <Text fontSize="sm" color={status.includes('Error') ? 'red.500' : 'green.500'}>
          {status}
        </Text>
      )}
    </VStack>
  );
};

export default AddDummyData; 