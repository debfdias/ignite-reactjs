import { Box, Button, Divider, Flex, Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import Link from "next/link";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useRouter } from "next/router";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório.'),
  email: yup.string().email('E-mail inválido.').required('E-mail obrigatório.'),
  password: yup
    .string()
    .min(6, 'No minimo 6 caracteres.')
    .required('Senha obrigatória.'),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais.'),
});

export default function CreateUser() {
  const router = useRouter();

  const createUser = useMutation(
    async (user: CreateUserFormData) => {
      const response = await api.post('users', {
        user: {
          ...user,
          created_at: new Date(),
        },
      });

      return response.data.user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
      },
    },
  );

  const {
    register,
    handleSubmit,
    formState,
    reset,
  } = useForm<CreateUserFormData>({
    resolver: yupResolver(createUserFormSchema),
  });

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async data => {
    await createUser.mutateAsync(data);

    reset();

    router.push('/users');
  };

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} px="16">
        <Sidebar />
      
        <Box as="form" flex="1" p="6" bg="gray.800" borderRadius={8} onSubmit={handleSubmit(handleCreateUser)}>
          <Heading size="lg" fontWeight="normal">Criar usuário</Heading>
          <Divider my="6" borderColor="gray.700"/>

          <Stack direction="column" spacing={["6", "8"]}>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input name="name" label="Nome completo" error={formState.errors.name} {...register('name')}/>
              <Input name="email" label="E-mail" type="email" error={formState.errors.email} {...register('email')}/>
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input name="password" type="password" label="Senha" error={formState.errors.password}{...register('password')}/>
              <Input name="password_confrimation" type="password" label="Confirmar senha" error={formState.errors.password_confirmation} {...register('password_confirmation')}/>
            </SimpleGrid>
          </Stack>

          <Flex mt="8" justify="flex-end">
            <Stack direction="row" spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button type="submit" colorScheme="pink" isLoading={formState.isSubmitting}>Salvar</Button>
            </Stack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}