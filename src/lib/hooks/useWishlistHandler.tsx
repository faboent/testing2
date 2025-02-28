import { useToast } from '@chakra-ui/react';

import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from '~/lib/redux/services/product.service';
import { useAppSelector } from '~/lib/redux/store';

export const useWishlistHandler = () => {
  const toast = useToast();
  const { userInfo } = useAppSelector((state) => state.app.auth);
  const user = userInfo?.user;

  const [addToWishlist, { isLoading: loadingAddToWishList }] =
    useAddToWishlistMutation();
  const [removeFromWishlist, { isLoading: loadingRemoveFromWishList }] =
    useRemoveFromWishlistMutation();

  const handleLike = async (item: {
    item_code: string;
    is_favourite: number;
  }) => {
    if (!userInfo?.user) {
      toast({
        title: 'Please login to add to wishlist',
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      return;
    }

    try {
      if (item.is_favourite) {
        await removeFromWishlist({
          user_id: user?.user_id,
          item_code: item?.item_code,
          is_favourite: 0,
        })
          .unwrap()
          .then((message) => {
            toast({
              title:
                message?.message?.body?.message ?? 'Item removed from wishlist',
              status: 'success',
              duration: 3000,
              isClosable: true,
              position: 'top-right',
            });
          })
          .catch((err) => {
            toast({
              title: err?.data?.message ?? 'Error removing item from wishlist',
              status: 'error',
              duration: 3000,
              isClosable: true,
              position: 'top-right',
            });
          });
      } else {
        await addToWishlist({
          user_id: user?.user_id,
          item_code: item?.item_code,
          is_favourite: 1,
        })
          .unwrap()
          .then((message) => {
            toast({
              title:
                message?.message?.body?.message ?? 'Item added to wishlist',
              status: 'success',
              duration: 3000,
              isClosable: true,
              position: 'top-right',
            });
          })
          .catch((err) => {
            toast({
              title: err?.data?.message ?? 'Error adding item to wishlist',
              status: 'error',
              duration: 3000,
              isClosable: true,
              position: 'top-right',
            });
          });
      }
    } catch (err: any) {
      toast({
        title:
          err?.data?.message ??
          `Error ${item.is_favourite ? 'removing' : 'adding'} item`,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  return { handleLike, loadingAddToWishList, loadingRemoveFromWishList };
};
