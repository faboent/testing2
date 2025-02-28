import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
} from '@chakra-ui/react';
import { Field } from 'formik';
import { useRef } from 'react';
import Autocomplete from 'react-google-autocomplete';

interface AddressInputProps {
  onAddressSelect?: (place: any) => void;
}

const AddressInput = ({ onAddressSelect }: AddressInputProps) => {
  const inputRef = useRef<any>(null);

  return (
    <Field name="address">
      {({ field, form }: any) => (
        <FormControl isInvalid={form.errors.address && form.touched.address}>
          <FormLabel color="#212429" fontWeight={400} fontSize={14} m={0}>
            Address
          </FormLabel>
          <Box position="relative">
            <Autocomplete
              ref={inputRef}
              apiKey="AIzaSyBCYbBd9q9KeBrwfgBb0PYwLFOHwxSQ058"
              onPlaceSelected={(place: any) => {
                if (!place.formatted_address) return;

                const formattedAddress = place.formatted_address;
                const lat = place.geometry?.location?.lat();
                const lng = place.geometry?.location?.lng();

                // Update the input value and form state
                if (inputRef.current) {
                  inputRef.current.value = formattedAddress;
                }

                form.setFieldValue('address', formattedAddress);
                form.setFieldValue('latitude', lat);
                form.setFieldValue('longitude', lng);
                form.setFieldTouched('address', true);

                // Call the onAddressSelect prop with the place data
                if (onAddressSelect) {
                  onAddressSelect(place);
                }
              }}
              style={{
                width: '100%',
                padding: '8px 16px',
                backgroundColor: '#F0F0F0F0',
                borderRadius: '5px',
                fontSize: '14px',
                color: '#212429',
                border:
                  form.errors.address && form.touched.address
                    ? '1px solid #E53E3E'
                    : '0px solid',
                outline: 'none',
              }}
              options={{
                types: ['address'],
                componentRestrictions: { country: 'NG' },
              }}
              defaultValue={field.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const { value } = e.target;
                form.setFieldValue('address', value);
              }}
              onBlur={() => {
                form.setFieldTouched('address', true);
              }}
              placeholder="Enter your address"
              className="google-places-autocomplete"
            />
          </Box>
          <FormErrorMessage
            color="red.500"
            fontWeight={400}
            fontSize={12}
            mt={1}
          >
            {form.errors.address}
          </FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default AddressInput;
