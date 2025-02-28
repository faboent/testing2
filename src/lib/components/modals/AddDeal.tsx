import { VStack, HStack, Text, RadioGroup, Radio } from '@chakra-ui/react';
import moment from 'moment';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import Button from '../ui/Button';

const AddDeal = ({ onClose }: any) => {
  const [value, setValue] = useState<any>(new Date());

  const item = {
    slots: ['Monday', 'Tuesday'],
  };

  const availableTimes = [
    '09:00AM',
    '10:00AM',
    '11:00AM',
    '12:00PM',
    '01:00PM',
    '02:00PM',
    '03:00PM',
    '04:00PM',
  ];

  const isInspectionDay = (date: any) => {
    const dayName = date.toLocaleString('en-US', { weekday: 'long' });
    return item?.slots?.includes(dayName);
  };

  const tileDisabled = ({ date, view }: any) => {
    if (view === 'month') {
      return !isInspectionDay(date);
    }
    return false;
  };
  const handleChange = (date: any) => {
    const formattedDate = moment(date).format('YYYY/MM/DD');
    setValue(formattedDate);
  };
  return (
    <VStack mt={10}>
      <Text fontSize="md" color="#212429" fontWeight="600">
        Pick an Available Date and Time for Service
      </Text>

      <VStack w={{ base: '100%', md: '100%' }} spacing={2}>
        <VStack w={{ base: '100%', md: '100%' }} align="flex-start">
          <Text fontSize="14PX" color="#212429" fontWeight="500">
            Select Date
          </Text>
          <Calendar
            onChange={handleChange}
            value={value}
            tileDisabled={tileDisabled}
            showNeighboringMonth={false}
          />
        </VStack>

        <VStack w={{ base: '100%', md: '100%' }} align="flex-start">
          <Text fontSize="14PX" color="#212429" fontWeight="500">
            Select time
          </Text>
          <RadioGroup
            defaultValue="09:00AM"
            colorScheme="yellow"
            color="#212429"
            fontWeight="400"
            fontSize="12px"
            bg="white"
            p={2}
            borderRadius="5px"
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          >
            <HStack
              flexWrap={{ base: 'wrap', md: 'wrap' }}
              gap={{ base: 2, md: 2 }}
            >
              {availableTimes.map((time) => (
                <Radio key={time} value={time}>
                  {time}
                </Radio>
              ))}
            </HStack>
          </RadioGroup>
        </VStack>

        <VStack
          w={{ base: '100%', md: '100%' }}
          align="flex-start"
          mt={4}
          mb={2}
        >
          <Button text="Confirm" onClick={onClose} size="md" bg="brand.100" />
        </VStack>
      </VStack>
    </VStack>
  );
};

export default AddDeal;
