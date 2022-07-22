import { Flex, Icon, Input } from "@chakra-ui/react";
import { useRef } from "react";
import { RiSearchLine } from "react-icons/ri";

export function SearchBox() {
const searchInput = useRef<HTMLInputElement>(null);

  return(
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="6"
      maxWidth={400}
      alignSelf="center"
      position="relative"
      color="gray.200"
      borderRadius="full"
      bg="gray.700">
        
      <Input 
        color="gray.100"
        px="4"
        mr="4"
        variant="unstyled"
        placeholder="Buscar na plataforma"
        _placeholder= {{ color: 'gray.400 '}}
        ref={searchInput}
      />
      <Icon as={RiSearchLine} fontSize="20"/>
    </Flex>
  )
}