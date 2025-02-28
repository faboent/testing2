import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
} from '@chakra-ui/react';

import type { ModalType } from '~/lib/interfaces/ui.interface';

const ModalComponent = ({
  isOpen,
  onClose,
  title,
  body,
  footer,
  fontWeight,
  fontSize = 18,
  textAlign = 'left',
  color = 'black',
  size = 'md',
  p,
}: ModalType) => {
  return (
    <Modal blockScrollOnMount isOpen={isOpen} onClose={onClose} size={size}>
      <ModalOverlay />
      <ModalContent width="100%">
        {title && (
          <ModalHeader>
            <Text
              fontSize={fontSize}
              fontWeight={fontWeight || 800}
              color={color}
              textAlign={textAlign}
            >
              {title}
            </Text>
          </ModalHeader>
        )}
        <ModalCloseButton color={p === 0 ? 'white' : 'black'} />
        <ModalBody p={p}>{body}</ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;
