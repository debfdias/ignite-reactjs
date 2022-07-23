import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [selectedUrlImage, setSelectedUrlImage] = useState('');

  const handleViewImage = (url: string): void => {
    setSelectedUrlImage(url);
    onOpen();
  };

  return (
    <>
      <SimpleGrid columns={3} columnGap="40px" rowGap="40px">
        {cards.map(card => (
          <Card key={card.id} data={card} viewImage={handleViewImage} />
        ))}
      </SimpleGrid>
      <ModalViewImage
        isOpen={isOpen}
        imgUrl={selectedUrlImage}
        onClose={onClose}
      />
    </>
  );
}
