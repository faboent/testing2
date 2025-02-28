import { useMemo } from 'react';

import { useGetProuctsQuery } from '~/lib/redux/services/product.service';

interface ProductsByCategoryResult {
  computing: any[];
  electronics: any[];
  gaming: any[];
  musical: any[];
  officeElectronics: any[];
  phonesAndTablets: any[];
  wearables: any[];
  isLoading: boolean;
}

export const useProductsByCategory = (): ProductsByCategoryResult => {
  const { data: computingData, isLoading: computingLoading } =
    useGetProuctsQuery({ category: 'computing' });
  const { data: electronicsData, isLoading: electronicsLoading } =
    useGetProuctsQuery({ category: 'electronics' });
  const { data: gamingData, isLoading: gamingLoading } = useGetProuctsQuery({
    category: 'gaming',
  });
  const { data: musicalData, isLoading: musicalLoading } = useGetProuctsQuery({
    category: 'musical',
  });
  const { data: officeData, isLoading: officeLoading } = useGetProuctsQuery({
    category: 'office-electronics',
  });
  const { data: phonesData, isLoading: phonesLoading } = useGetProuctsQuery({
    category: 'phones-tablets',
  });
  const { data: wearablesData, isLoading: wearablesLoading } =
    useGetProuctsQuery({ category: 'wearables' });

  return useMemo(
    () => ({
      computing: computingData?.data ?? [],
      electronics: electronicsData?.data ?? [],
      gaming: gamingData?.data ?? [],
      musical: musicalData?.data ?? [],
      officeElectronics: officeData?.data ?? [],
      phonesAndTablets: phonesData?.data ?? [],
      wearables: wearablesData?.data ?? [],
      isLoading:
        computingLoading ||
        electronicsLoading ||
        gamingLoading ||
        musicalLoading ||
        officeLoading ||
        phonesLoading ||
        wearablesLoading,
    }),
    [
      computingData,
      electronicsData,
      gamingData,
      musicalData,
      officeData,
      phonesData,
      wearablesData,
      computingLoading,
      electronicsLoading,
      gamingLoading,
      musicalLoading,
      officeLoading,
      phonesLoading,
      wearablesLoading,
    ]
  );
};
