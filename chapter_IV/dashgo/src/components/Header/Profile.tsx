import { Box, Text, Flex, Avatar } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex ml="auto" align="center">
      { showProfileData && (
        <Box mr="4" textAlign="right">
          <Text color="gray.200" fontWeight="bold">Debs Fortunato</Text>
          <Text color="gray.300" fontSize="small">debfdias@gmail.com</Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Débora Fortunato"
        src="https://github.com/debfdias.png"
      >
      </Avatar>
    </Flex>
    )
  }