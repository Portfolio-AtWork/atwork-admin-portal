import * as yup from 'yup';

export const createEmployeeValidationSchema = yup.object().shape({
  Nome: yup.string().required('Nome é obrigatório'),
  Login: yup.string().required('Login é obrigatório'),
  Senha: yup
    .string()
    .required('Senha é obrigatória')
    .min(6, 'Senha deve ter no mínimo 6 caracteres'),
  ConfirmarSenha: yup
    .string()
    .required('Confirmação de senha é obrigatória')
    .oneOf([yup.ref('Senha')], 'As senhas devem ser iguais'),
  ID_Grupo: yup.string().required('Grupo é obrigatório'),
  Email: yup.string().required('Email é obrigatório').email('Email inválido'),
});
