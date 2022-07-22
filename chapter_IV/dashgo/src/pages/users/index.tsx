import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr, Text, useBreakpointValue, Spinner, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";
import { useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";


export default function UserList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error } =  useUsers(page)

  const isWiderVersion = useBreakpointValue({
    base:false,
    lg: true
  })

  async function handdlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`users/${userId}`)

      return response.data;
    }, {
      staleTime: 1000*60*10
    })
  }

  return (
      <Box>
        <Header />
          <Flex w="100%" my="6" maxW={1480} px="16">
            <Sidebar />

            <Box flex="1" p="6" bg="gray.800" borderRadius={8}>
              <Flex mb="8" justify="space-between" align="center">
                <Heading size="lg" fontWeight="bold">
                  Usuários

                  { !isLoading && isFetching && <Spinner size="sm" ml="4" color="gray.500"/>}
                </Heading>
                <NextLink href="/users/create" passHref>
                  <Button as="a" colorScheme="pink" leftIcon={<Icon as={RiAddLine} />}>
                    Criar novo
                  </Button>
                </NextLink>
                
              </Flex>

              { isLoading ? (
                <Flex justify="center">
                  <Spinner />
                </Flex>
              ) : error ? (
                <Flex justify="center">
                  <Text>Deu algo errado!</Text>
                </Flex>
              ) : (
                <>
                  <Table colorScheme="whiteAlpha">
                    <Thead>
                      <Tr>
                        <Th px={["4", "4", "6"]} color="gray.300" width="8">
                          <Checkbox colorScheme="pink"/>
                        </Th>
                        <Th>Usuários</Th>
                        {isWiderVersion && <Th>Data de cadastro</Th> }
                        <Th w="8"></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data.users.map(user => {
                        return (
                          <Tr key={user.id}>
                            <Td px={["4", "4", "6"]}>
                              <Checkbox colorScheme="pink"/>
                            </Td>
                            <Td>
                              <Box>
                                <Link color="purple.400" onMouseEnter={() => handdlePrefetchUser(user.id)}>
                                  <Text fontWeight="bold">{user.name}</Text>
                                </Link>
                                
                                <Text fontSize="sm" color="gray.300">{user.email}</Text>
                              </Box>
                            </Td>
                            {isWiderVersion && <Td>{user.createdAt}</Td>}
                            <Td>
                              <Button as="a" colorScheme="purple" fontSize="sm" leftIcon={<Icon as={RiPencilLine} fontSize="16"/>}>
                                {isWiderVersion ? 'Editar' : ''}
                              </Button>
                            </Td>
                          </Tr>
                        )
                      })}

                    </Tbody>
                  </Table>

                  <Pagination
                    totalCountOfRegisters={data.totalCount}
                    currentPage={page}
                    onPageChange={setPage}
                  />
                </>
              )}
            </Box>
          </Flex>

      </Box>
  );
}