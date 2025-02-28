import { HStack, VStack, Image, Text, Badge } from '@chakra-ui/react';
import ReactStars from 'react-stars';

type MerchantRatingCardProps = {
  item: {
    name: string;
    rating: number;
    review: string;
    location: string;
    date: string;
  };
};

const RatingCard = ({ item }: MerchantRatingCardProps) => {
  return (
    <VStack
      alignItems="flex-start"
      w="100%"
      h="auto"
      borderRadius="5px"
      bg="white"
      p="4"
      spacing="0"
    >
      <HStack align="flex-start" spacing="2">
        <Image src="/images/review-avatar.svg" alt="rating" boxSize="30px" />
        <VStack alignItems="flex-start" spacing="1">
          <ReactStars
            count={5}
            size={20}
            color2="#FFD700"
            value={item.rating}
            edit={false}
          />
          <Text fontSize="10px" fontWeight="400" color="#343434">
            {item.review}
          </Text>

          <HStack>
            <Badge
              bg="#F0F0F0"
              fontSize="10px"
              color="#21242980"
              fontWeight="400"
              textTransform="capitalize"
            >
              <HStack>
                <Text>{item.location}</Text>
                <Image src="/images/red-location.svg" alt="location" />
              </HStack>
            </Badge>
            <Text fontSize="10px" fontWeight="400" color="#34343480">
              {item.date}
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default RatingCard;
